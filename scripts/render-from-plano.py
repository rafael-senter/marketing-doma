#!/usr/bin/env python3
"""
render-from-plano.py — parse um plano .md e gera + renderiza carrossel completo.

Espera plano no formato `templates/planos/POST-<nome>-plano.md` com tabela:
  | # | Tipo | Título | Corpo |
  | 1 | capa | ... | ... |
  | 2 | miolo 01 | ... | ... |
  ...

Saída:
  1. Inserir Stills em remotion-doma/src/Root.tsx (no marcador "// AUTO-GERADO").
  2. Sync components plugin → host.
  3. Renderizar via render-batch.sh.
  4. Audit (opcional) via compare-all.

Uso:
  python render-from-plano.py templates/planos/POST-meu-plano.md
  python render-from-plano.py POST-meu-plano.md --dry-run  (só parseia, não escreve)
  python render-from-plano.py POST-meu-plano.md --skip-render  (escreve mas não renderiza)
"""
import argparse, sys, re, subprocess
from pathlib import Path

PLUGIN = Path(__file__).resolve().parent.parent
PROJECT = PLUGIN.parent.parent.parent
HOST = PROJECT / "remotion-doma"
ROOT_TSX = HOST / "src" / "Root.tsx"

CATEGORIAS = {
    "dicas-carrossel": ("DicasCapa", "DicasMiolo", "DicasCta"),
    "spin": ("SpinCapa", "SpinMiolo", "SpinCta"),
    "doma-carrossel-clientes": ("ClientesCapa", "ClientesMiolo", "ClientesFecho"),
}


def parse_plano(md_path):
    """Extrai: categoria, nome, slides[]"""
    txt = md_path.read_text()
    nome_m = re.search(r"^# Plano — POST [`]?([^`\s]+)[`]?", txt, re.M)
    cat_m = re.search(r"Categoria(?:\s+base)?:?\s*[*`]*([a-z0-9-]+)", txt, re.I)
    if not nome_m or not cat_m:
        raise ValueError("Plano sem header nome/categoria")
    nome = nome_m.group(1).strip("`")
    categoria_raw = cat_m.group(1).lower()
    # Map nomes longos pra slugs
    cat_map = {
        "dicas": "dicas-carrossel",
        "spin": "spin",
        "clientes": "doma-carrossel-clientes",
    }
    categoria = cat_map.get(categoria_raw, categoria_raw)
    if categoria not in CATEGORIAS:
        # Tentar match parcial
        for k in CATEGORIAS:
            if k in categoria_raw or categoria_raw in k:
                categoria = k
                break

    # Encontrar tabela slide-a-slide
    slides = []
    in_table = False
    for line in txt.splitlines():
        if re.match(r"^\|\s*#\s*\|", line):
            in_table = True
            continue
        if in_table:
            if not line.startswith("|"):
                in_table = False
                continue
            # Pular separador
            if re.match(r"^\|[\s\-:]+\|", line):
                continue
            cells = [c.strip() for c in line.strip("|").split("|")]
            if len(cells) >= 4:
                slides.append({
                    "num": cells[0],
                    "tipo": cells[1],
                    "titulo": cells[2].replace("\\n", "\n"),
                    "corpo": cells[3].replace("\\n", "\n")
                })
    return {"nome": nome, "categoria": categoria, "slides": slides}


def gerar_stills(plano):
    """Gera snippet de Stills baseado na categoria + slides."""
    cat = plano["categoria"]
    nome = plano["nome"]
    triple = CATEGORIAS.get(cat)
    if not triple:
        raise ValueError(f"Categoria '{cat}' não suportada (use: {list(CATEGORIAS.keys())})")
    Capa, Miolo, Cta = triple

    out = [f"\n      {{/* ── AUTO-GERADO — {nome} ({cat}) ── */}}"]
    for i, s in enumerate(plano["slides"], 1):
        sid = f"{nome}-{i}"
        if "capa" in s["tipo"].lower() or i == 1:
            out.append(f'      <Still id="{sid}" component={{{Capa} as never}}')
            out.append(f"        width={{vertical.largura}} height={{vertical.altura}}")
            out.append(f"        defaultProps={{{{titulo: {repr(s['titulo'])}, subtitulo: [], icones: 'oficial/_dicas246-icones.png'}}}} />")
        elif "cta" in s["tipo"].lower() or i == len(plano["slides"]):
            out.append(f'      <Still id="{sid}" component={{{Cta} as never}}')
            out.append(f"        width={{vertical.largura}} height={{vertical.altura}}")
            out.append(f"        defaultProps={{{{texto: {repr(s['corpo'] or s['titulo'])}}}}} />")
        else:
            num = s.get("num") or str(i - 1).zfill(2)
            num = num if num.isdigit() and len(num) == 2 else str(i - 1).zfill(2)
            out.append(f'      <Still id="{sid}" component={{{Miolo} as never}}')
            out.append(f"        width={{vertical.largura}} height={{vertical.altura}}")
            out.append(f"        defaultProps={{{{numero: '{num}', titulo: {repr(s['titulo'])}, corpo: {repr(s['corpo'])}}}}}/>")
    return "\n".join(out)


def inserir_no_root(snippet):
    """Insere snippet antes do </> final do Root.tsx."""
    txt = ROOT_TSX.read_text()
    # Achar último </> antes do export default fim
    marker = "    </>"
    idx = txt.rfind(marker)
    if idx == -1:
        raise ValueError("Marker '    </>' não encontrado em Root.tsx")
    new_txt = txt[:idx] + snippet + "\n\n" + txt[idx:]
    ROOT_TSX.write_text(new_txt)
    return True


def render_batch(plano):
    """Roda render-still.sh pra cada ID."""
    ids = [f"{plano['nome']}-{i}" for i in range(1, len(plano["slides"]) + 1)]
    print(f"\n==> Rendering {len(ids)} slides…")
    fail = []
    for sid in ids:
        r = subprocess.run(
            ["bash", str(HOST / "render-still.sh"), sid],
            cwd=HOST, capture_output=True, text=True
        )
        if r.returncode == 0 and "✓" in r.stdout:
            print(f"  ✓ {sid}")
        else:
            print(f"  ❌ {sid}: {r.stderr[:100]}")
            fail.append(sid)
    return fail


def main():
    p = argparse.ArgumentParser()
    p.add_argument("plano", help="path do plano .md")
    p.add_argument("--dry-run", action="store_true", help="só parseia, não escreve nem renderiza")
    p.add_argument("--skip-render", action="store_true", help="escreve Stills mas não renderiza")
    args = p.parse_args()

    plano_path = Path(args.plano)
    if not plano_path.exists():
        # Tentar relativo a templates/planos/
        cand = PLUGIN / "templates" / "planos" / plano_path.name
        if cand.exists():
            plano_path = cand
        else:
            print(f"[ERRO] plano não existe: {args.plano}", file=sys.stderr); sys.exit(1)

    print(f"==> Parse {plano_path}")
    plano = parse_plano(plano_path)
    print(f"    nome: {plano['nome']}")
    print(f"    categoria: {plano['categoria']}")
    print(f"    slides: {len(plano['slides'])}")

    if args.dry_run:
        print("\n[DRY RUN] snippet que seria inserido:")
        print(gerar_stills(plano))
        return

    snippet = gerar_stills(plano)
    inserir_no_root(snippet)
    print(f"✅ Stills inseridos em {ROOT_TSX}")

    # Sync
    print("\n==> sync-components")
    subprocess.run(["bash", str(PLUGIN / "scripts" / "sync-components.sh")], capture_output=True)

    if args.skip_render:
        print("(--skip-render) — pulando render.")
        return

    failed = render_batch(plano)
    if failed:
        print(f"\n❌ {len(failed)} slides falharam: {failed}")
        sys.exit(1)
    else:
        print(f"\n🎉 Carrossel {plano['nome']} renderizado completo.")
        print(f"   PNGs em: {HOST}/out/{plano['nome']}-*.png")


if __name__ == "__main__":
    main()
