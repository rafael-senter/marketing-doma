#!/usr/bin/env python3
"""
nanobanana-generate.py — geração/edição de imagem via Google Gemini, EMBUTIDO no plugin.

A equipe de marketing não precisa da skill nanobanana do host: este script é
auto-contido. A API key é lida nesta ordem:
  1. `.env` na raiz do plugin (GEMINI_API_KEY=...) — recomendado pra equipe
  2. `~/.nanobanana.env` (compat com a skill do host)
  3. variável de ambiente GEMINI_API_KEY

Uso:
  # gerar
  python3 scripts/nanobanana-generate.py --prompt "descrição" --output out.png

  # editar / compor (mockup de device com screenshot)
  python3 scripts/nanobanana-generate.py --prompt "instruções" \
      --input screenshot.png --output mockup.png --size 1152x896 --resolution 2K

⚠️ Mockup com tela de sistema: o Gemini re-renderiza o texto da tela com typos.
   Depois de gerar a moldura, SEMPRE compor o screenshot original por cima com
   scripts/compose-screen-mockup.py (live-rule 2026-07-16-nanobanana-tela-composta).

Dependências: google-genai, python-dotenv, Pillow
  python3 -m pip install google-genai python-dotenv Pillow
"""
import os
import sys
import uuid
import argparse

try:
    from dotenv import load_dotenv
    from google import genai
    from google.genai import types
    from PIL import Image
except ImportError as e:
    print(f"[ERRO] Dependência faltando ({e.name}). Rode:\n"
          "  python3 -m pip install google-genai python-dotenv Pillow", file=sys.stderr)
    sys.exit(1)

PLUGIN_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# ordem: .env do plugin → ~/.nanobanana.env → ambiente
load_dotenv(os.path.join(PLUGIN_ROOT, ".env"))
load_dotenv(os.path.expanduser("~/.nanobanana.env"))

api_key = os.getenv("GEMINI_API_KEY") or ""
if not api_key:
    print("[ERRO] GEMINI_API_KEY não encontrada.\n"
          f"  Copie {PLUGIN_ROOT}/.env.example pra {PLUGIN_ROOT}/.env e preencha a key.\n"
          "  Key em: https://aistudio.google.com/apikey (precisa billing pra imagem).",
          file=sys.stderr)
    sys.exit(1)

client = genai.Client(api_key=api_key)

ASPECT_RATIO_MAP = {
    "1024x1024": "1:1",
    "832x1248": "2:3",
    "1248x832": "3:2",
    "864x1184": "3:4",
    "1184x864": "4:3",
    "896x1152": "4:5",
    "1152x896": "5:4",
    "768x1344": "9:16",
    "1344x768": "16:9",
    "1536x672": "21:9",
}


def main():
    parser = argparse.ArgumentParser(description="Gerar/editar imagem via Gemini (embutido no plugin)")
    parser.add_argument("--prompt", required=True)
    parser.add_argument("--input", nargs="*", help="imagem(ns) de entrada pra edição/composição")
    parser.add_argument("--output", help="arquivo de saída (default: uuid.png)")
    parser.add_argument("--size", default="768x1344", choices=list(ASPECT_RATIO_MAP.keys()))
    parser.add_argument("--model", default="gemini-3-pro-image-preview",
                        choices=["gemini-3-pro-image-preview", "gemini-2.5-flash-image"])
    parser.add_argument("--resolution", default="1K", choices=["1K", "2K", "4K"])
    args = parser.parse_args()

    aspect_ratio = ASPECT_RATIO_MAP[args.size]
    contents = [args.prompt]
    if args.input:
        print(f"Editando com {len(args.input)} imagem(ns) de entrada…")
        for p in args.input:
            contents.append(Image.open(p))
    print(f"Modelo: {args.model} | AR: {aspect_ratio} | Res: {args.resolution}")

    response = client.models.generate_content(
        model=args.model,
        contents=contents,
        config=types.GenerateContentConfig(
            response_modalities=["TEXT", "IMAGE"],
            image_config=types.ImageConfig(
                aspect_ratio=aspect_ratio,
                image_size=args.resolution,
            ),
        ),
    )

    if not response.candidates:
        print("[ERRO] Sem resposta do modelo (cota? billing? prompt bloqueado?).", file=sys.stderr)
        sys.exit(1)

    out_path = args.output or f"{uuid.uuid4().hex}.png"
    saved = False
    for part in response.candidates[0].content.parts:
        if getattr(part, "inline_data", None) and part.inline_data.data:
            from io import BytesIO
            Image.open(BytesIO(part.inline_data.data)).save(out_path)
            saved = True
        elif getattr(part, "text", None):
            print(part.text)
    if not saved:
        print("[ERRO] Modelo não retornou imagem (só texto acima).", file=sys.stderr)
        sys.exit(1)
    print(f"Image saved to: {out_path}")


if __name__ == "__main__":
    main()
