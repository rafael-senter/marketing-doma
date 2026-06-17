#!/usr/bin/env python3
"""
extract-paleta.py — extrai paleta dominante de um logo/imagem.

Retorna 3-5 cores HEX mais usadas + sugere a "cor de fundo do card" (cor mais
saturada e MENOS clara — assume que é a cor da marca, não o fundo branco).

Uso:
  python extract-paleta.py --input logo.png
  python extract-paleta.py --input logo.png --n 5 --json
"""
import argparse, sys, json
from collections import Counter
from pathlib import Path

try:
    from PIL import Image
    import numpy as np
except ImportError:
    print("[ERRO] pip install Pillow numpy", file=sys.stderr); sys.exit(1)


def extract_palette(image_path, n=5, ignore_white=True, ignore_black=False):
    """Retorna lista de tuplas (hex, count, score) ordenada por score."""
    im = Image.open(image_path).convert("RGBA")
    arr = np.array(im)

    # filtrar pixels com alpha > 200 (visíveis) E não-fundo
    visible = arr[..., 3] > 200
    rgb = arr[visible][:, :3]
    if len(rgb) == 0:
        return []

    # Quantize: round to nearest 16 (reduce variety)
    quantized = (rgb // 16) * 16

    # Filtrar pixels muito claros (quase branco) — assume fundo
    if ignore_white:
        not_white = ~((quantized[:, 0] > 240) & (quantized[:, 1] > 240) & (quantized[:, 2] > 240))
        quantized = quantized[not_white]
    if ignore_black:
        not_black = ~((quantized[:, 0] < 20) & (quantized[:, 1] < 20) & (quantized[:, 2] < 20))
        quantized = quantized[not_black]

    # Counter por cor
    tuples = [tuple(p) for p in quantized.tolist()]
    counts = Counter(tuples)
    total = sum(counts.values())

    # Score = freq × saturação (HSV) — favorece cores de marca, não cinza
    def score(rgb_tuple, count):
        r, g, b = rgb_tuple
        mx, mn = max(rgb_tuple), min(rgb_tuple)
        sat = (mx - mn) / 255 if mx > 0 else 0
        light = (r + g + b) / 3 / 255
        # bonus se não é cinza/branco/preto
        non_neutral = 1.0 if sat > 0.15 else 0.3
        return count * (sat + 0.1) * non_neutral / max(total, 1)

    top = sorted(counts.items(), key=lambda x: -score(x[0], x[1]))[:n]
    return [
        {
            "hex": f"#{r:02X}{g:02X}{b:02X}",
            "rgb": [int(r), int(g), int(b)],
            "count": int(c),
            "pct": round(c / total * 100, 1),
            "score": round(score((r, g, b), c), 4)
        }
        for (r, g, b), c in top
    ]


def suggest_card_bg(palette):
    """Sugere cor pra fundo do card de cliente — cor saturada + não muito clara."""
    if not palette:
        return "#F4BB35"  # fallback manga Doma
    # Pegar a 1ª (já ordenada por score com favorecimento de saturação)
    return palette[0]["hex"]


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--input", required=True, help="path da imagem (logo)")
    p.add_argument("--n", type=int, default=5, help="quantas cores top (default 5)")
    p.add_argument("--json", action="store_true", help="output JSON em vez de markdown")
    p.add_argument("--ignore-black", action="store_true", help="ignorar preto também")
    args = p.parse_args()

    if not Path(args.input).exists():
        print(f"[ERRO] arquivo não existe: {args.input}", file=sys.stderr); sys.exit(1)

    palette = extract_palette(args.input, n=args.n, ignore_black=args.ignore_black)
    suggested = suggest_card_bg(palette)

    if args.json:
        print(json.dumps({
            "input": args.input,
            "palette": palette,
            "suggested_card_bg": suggested
        }, indent=2))
    else:
        print(f"# Paleta de {Path(args.input).name}\n")
        print(f"**Sugestão pra `--cor` no wizard-cliente:** `{suggested}`\n")
        print(f"| # | Hex | RGB | % | Score |")
        print(f"|---|---|---|---|---|")
        for i, c in enumerate(palette, 1):
            print(f"| {i} | `{c['hex']}` | rgb({c['rgb'][0]},{c['rgb'][1]},{c['rgb'][2]}) | {c['pct']}% | {c['score']} |")
        print(f"\nUsar no wizard:\n```\npython scripts/wizard-cliente.py --logo {args.input} --cor {suggested} ...\n```")


if __name__ == "__main__":
    main()
