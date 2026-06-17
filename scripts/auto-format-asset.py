#!/usr/bin/env python3
"""
auto-format-asset.py — pré-processa asset crú (PNG/JPG) aplicando formatação Doma.

Tipos suportados:
  - logo-cliente: redimensiona logo + bg cor cliente + cantos arredondados → card baked
  - foto-loja: recorta + redimensiona + raio + (opcional) overlay watermark
  - mockup: alpha cleanup + raio + opcional shadow
  - icone-tema: mantém aspecto, fundo transparente, normaliza dim

Uso:
  python auto-format-asset.py --tipo logo-cliente --input logo.png --cor "#FF6B35" \\
                              --nome rentauto --output assets/cards-clientes/_205-card_rentauto.png

  python auto-format-asset.py --tipo foto-loja --input foto.jpg --output assets/fotos/_loja.jpg

Dimensões padrão:
  - logo-cliente: 1080×600 (proporção POST 205 card, raio 40 baked)
  - foto-loja: 1080×1080 (quadrado, sem raio — raio aplica no componente)
  - mockup: original com alpha (sem mexer)
  - icone-tema: 512×512 fit
"""
import argparse, os, sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFilter, ImageOps
except ImportError:
    print("[ERRO] pip install Pillow", file=sys.stderr); sys.exit(1)


def format_logo_cliente(input_path, cor_hex, output_path,
                        canvas=(1080, 600), raio=40, padding=80):
    """Logo cliente sobre fundo cor própria, cantos arredondados baked."""
    logo = Image.open(input_path).convert("RGBA")
    W, H = canvas
    bg_color = hex_to_rgb(cor_hex)

    # 1. Canvas com bg cor
    canvas_img = Image.new("RGB", (W, H), bg_color)

    # 2. Redimensionar logo proporcional (fit dentro de W-2pad × H-2pad)
    avail_w = W - 2 * padding
    avail_h = H - 2 * padding
    logo_w, logo_h = logo.size
    scale = min(avail_w / logo_w, avail_h / logo_h)
    new_w = int(logo_w * scale)
    new_h = int(logo_h * scale)
    logo_resized = logo.resize((new_w, new_h), Image.LANCZOS)

    # 3. Centralizar
    x = (W - new_w) // 2
    y = (H - new_h) // 2
    canvas_img.paste(logo_resized, (x, y), logo_resized if logo_resized.mode == "RGBA" else None)

    # 4. Aplicar cantos arredondados (mask)
    canvas_rgba = canvas_img.convert("RGBA")
    mask = Image.new("L", (W, H), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([(0, 0), (W, H)], radius=raio, fill=255)
    out = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    out.paste(canvas_rgba, (0, 0), mask)
    out.save(output_path)
    return out.size


def format_foto_loja(input_path, output_path, target=(1080, 1080)):
    """Foto loja: ajusta pra quadrado/retangulo, qualidade alta. SEM raio (componente aplica)."""
    foto = Image.open(input_path).convert("RGB")
    # Center crop pra target ratio
    foto_resized = ImageOps.fit(foto, target, Image.LANCZOS)
    foto_resized.save(output_path, quality=92, optimize=True)
    return foto_resized.size


def format_mockup(input_path, output_path):
    """Mockup: passa direto (PIL salva PNG com alpha). Se JPG, converte pra RGB."""
    im = Image.open(input_path)
    if im.mode in ("RGBA", "LA"):
        im.save(output_path)
    else:
        im.convert("RGB").save(output_path, quality=92, optimize=True)
    return im.size


def format_icone_tema(input_path, output_path, target=(512, 512)):
    """Ícone temático: fit em 512×512 com alpha, fundo transparente."""
    icon = Image.open(input_path).convert("RGBA")
    icon.thumbnail(target, Image.LANCZOS)
    # Centralizar em canvas 512×512
    canvas = Image.new("RGBA", target, (0, 0, 0, 0))
    x = (target[0] - icon.width) // 2
    y = (target[1] - icon.height) // 2
    canvas.paste(icon, (x, y), icon)
    canvas.save(output_path)
    return canvas.size


def hex_to_rgb(hex_str):
    s = hex_str.lstrip("#")
    if len(s) == 3:
        s = "".join(c * 2 for c in s)
    return tuple(int(s[i:i+2], 16) for i in (0, 2, 4))


HANDLERS = {
    "logo-cliente": format_logo_cliente,
    "foto-loja": format_foto_loja,
    "mockup": format_mockup,
    "icone-tema": format_icone_tema,
}


def main():
    p = argparse.ArgumentParser(description="Auto-formata asset crú pro padrão Doma")
    p.add_argument("--tipo", required=True, choices=list(HANDLERS.keys()))
    p.add_argument("--input", required=True)
    p.add_argument("--output", required=True)
    p.add_argument("--cor", help="cor hex pra logo-cliente (ex: #FF6B35)")
    p.add_argument("--nome", help="slug pra naming (opcional)")
    args = p.parse_args()

    if not Path(args.input).exists():
        print(f"[ERRO] input não existe: {args.input}", file=sys.stderr)
        sys.exit(1)
    Path(args.output).parent.mkdir(parents=True, exist_ok=True)

    handler = HANDLERS[args.tipo]
    kwargs = {}
    if args.tipo == "logo-cliente":
        if not args.cor:
            print("[ERRO] logo-cliente precisa --cor", file=sys.stderr); sys.exit(1)
        kwargs["cor_hex"] = args.cor

    size = handler(args.input, **kwargs, output_path=args.output) if args.tipo == "logo-cliente" \
           else handler(args.input, output_path=args.output, **kwargs)

    print(f"✅ {args.output}")
    print(f"   tipo: {args.tipo}")
    print(f"   size: {size}")
    if args.tipo == "logo-cliente":
        print(f"   bg: {args.cor}")
        print(f"   Pronto pra usar em CarrosselClientes (ClientesMiolo card prop).")

if __name__ == "__main__":
    main()
