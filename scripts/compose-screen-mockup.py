#!/usr/bin/env python3
"""
compose-screen-mockup.py — compõe screenshot ORIGINAL pixel-perfect na tela de um
mockup de device gerado via nanobanana (que re-renderiza texto com typos).

Pipeline (live-rule 2026-07-16-nanobanana-tela-composta):
  1. Detecta bbox da área de tela no mockup (âncora: barra escura do browser).
  2. Cola o screenshot original: fit na largura, âncora no topo.
  3. Gap vertical: replica uma LINHA LIMPA do fundo da página (sem pixel escuro).
  4. Footer original recolocado no rodapé da área de tela.
  5. Opcional: gera versão transparente via rembg.

Uso:
  python3 compose-screen-mockup.py \
    --mockup mockup-nanobanana.png \
    --screenshot screenshot-original.png \
    --output base-final.png \
    [--transparent base-final-transp.png] \
    [--bbox L,T,R,B]   # pula detecção automática

Requisitos: Pillow, numpy. Transparente: rembg + onnxruntime.
O screenshot deve conter a barra escura do browser no topo (detecção automática).
"""
import argparse
import sys

try:
    import numpy as np
    from PIL import Image
except ImportError:
    print("[ERRO] Faltam dependências. Rode: python3 -m pip install Pillow numpy", file=sys.stderr)
    sys.exit(1)


def detect_screen_bbox(mock_arr):
    """Acha a área de tela usando a barra escura do browser (~#202124) como âncora."""
    h, w, _ = mock_arr.shape
    r, g, b = (mock_arr[:, :, i].astype(int) for i in range(3))
    dark = (abs(r - 32) < 25) & (abs(g - 33) < 25) & (abs(b - 36) < 25)
    rows = dark.sum(axis=1)
    cand = np.where(rows > w * 0.5)[0]
    if len(cand) == 0:
        raise SystemExit(
            "[ERRO] Barra do browser não detectada no mockup. "
            "Passe o bbox manualmente: --bbox L,T,R,B"
        )
    top = int(cand.min())
    row = dark[top + 5]
    cols = np.where(row)[0]
    left, right = int(cols.min()), int(cols.max())
    # bottom: último pixel branco (conteúdo da página) na coluna central abaixo da barra
    col = mock_arr[:, (left + right) // 2]
    white = (col[:, 0] > 200) & (col[:, 1] > 200) & (col[:, 2] > 200)
    ys = np.where(white)[0]
    ys = ys[ys > top]
    if len(ys) == 0:
        raise SystemExit("[ERRO] Não achei o fim da área de tela. Use --bbox L,T,R,B")
    bottom = int(ys.max())
    return left, top, right, bottom


def find_clean_row(arr, above_y, search_px=150):
    """Linha sem pixel escuro (<150) pra replicar como fundo — evita texto virar listras."""
    for y in range(above_y - 1, max(0, above_y - search_px), -1):
        if arr[y].min() > 150:
            return y
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--mockup", required=True)
    ap.add_argument("--screenshot", required=True)
    ap.add_argument("--output", required=True)
    ap.add_argument("--transparent", help="também salvar versão sem fundo (rembg)")
    ap.add_argument("--bbox", help="L,T,R,B manual (pula detecção)")
    ap.add_argument("--footer-px", type=int, default=35,
                    help="altura do footer do screenshot (px pós-escala, default 35)")
    args = ap.parse_args()

    mock = Image.open(args.mockup).convert("RGB")
    shot = Image.open(args.screenshot).convert("RGB")
    mock_arr = np.array(mock)

    if args.bbox:
        L, T, R, B = (int(v) for v in args.bbox.split(","))
    else:
        L, T, R, B = detect_screen_bbox(mock_arr)
    W, H = R - L + 1, B - T + 1
    print(f"[ok] área de tela: L={L} T={T} R={R} B={B} ({W}x{H})")

    ow, oh = shot.size
    scaled = np.array(shot.resize((W, round(oh * W / ow)), Image.LANCZOS))
    sh = scaled.shape[0]

    if sh >= H:
        # screenshot mais alto que a área: corta embaixo (mantém topo)
        screen = scaled[:H]
        print(f"[ok] screenshot cortado de {sh} pra {H}px de altura")
    else:
        foot = args.footer_px
        clean = find_clean_row(scaled, sh - foot)
        if clean is None:
            raise SystemExit("[ERRO] Sem linha limpa pro fill. Ajuste --footer-px.")
        gap = H - sh
        fill = np.repeat(scaled[clean][None], gap, axis=0)
        screen = np.vstack([scaled[: sh - foot], fill, scaled[sh - foot:]])
        print(f"[ok] gap de {gap}px preenchido com linha limpa y={clean} + footer recolocado")

    out = mock_arr.copy()
    out[T: B + 1, L: R + 1] = screen
    Image.fromarray(out).save(args.output)
    print(f"[ok] salvo: {args.output}")

    if args.transparent:
        try:
            from rembg import remove
        except ImportError:
            print("[AVISO] rembg não instalado — pulei transparente. "
                  "Rode: python3 -m pip install rembg onnxruntime", file=sys.stderr)
            return
        transp = remove(Image.open(args.output))
        transp.save(args.transparent)
        print(f"[ok] transparente: {args.transparent}")


if __name__ == "__main__":
    main()
