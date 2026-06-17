#!/usr/bin/env python3
"""
wizard-cliente.py — wizard interativo pra adicionar cliente novo ao plugin.

Fluxo:
  1. Receber logo (path local OU URL OU @<instagram>).
  2. Pergunta: nome, cidade/UF, cor de fundo do card (#hex), tema (opcional).
  3. Gera _205-card<slug>.png baked via auto-format-asset.py (logo-cliente).
  4. Salva em assets/cards-clientes/.
  5. Atualiza CATALOGO.json (entrada nova).
  6. Gera snippet de Still pra colar no Root.tsx.

Uso:
  python wizard-cliente.py
  python wizard-cliente.py --logo /tmp/rentauto.png --nome rentauto --cidade "Curitiba/PR" --cor "#FF6B35"
"""
import argparse, sys, subprocess, shutil
from pathlib import Path

PLUGIN = Path(__file__).resolve().parent.parent
AUTO_FORMAT = PLUGIN / "scripts" / "auto-format-asset.py"

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--logo", help="path do logo (PNG transparente preferido)")
    p.add_argument("--nome", help="slug do cliente (kebab-case)")
    p.add_argument("--cidade", help="Cidade/UF (ex: Curitiba/PR)")
    p.add_argument("--cor", help="cor de fundo do card (#hex)")
    p.add_argument("--tema", help="tema/frase (opcional)")
    args = p.parse_args()

    # Modo interativo se faltar args
    logo = args.logo or input("Path do logo (PNG): ").strip()
    nome = args.nome or input("Slug do cliente (kebab-case): ").strip().lower().replace(" ", "-")
    cidade = args.cidade or input("Cidade/UF (ex: Curitiba/PR): ").strip()
    cor = args.cor or input("Cor de fundo do card (#hex, ex #FF6B35): ").strip()

    if not Path(logo).exists():
        print(f"[ERRO] logo não existe: {logo}", file=sys.stderr); sys.exit(1)
    if not nome or not cidade or not cor:
        print("[ERRO] campos obrigatórios faltando", file=sys.stderr); sys.exit(1)

    if not cor.startswith("#"):
        cor = "#" + cor

    # 1. Gerar card baked
    out_card = PLUGIN / "assets" / "cards-clientes" / f"_205-card_{nome}.png"
    print(f"\n==> Gerando card baked em {out_card}…")
    r = subprocess.run([
        sys.executable, str(AUTO_FORMAT),
        "--tipo", "logo-cliente",
        "--input", logo,
        "--cor", cor,
        "--output", str(out_card)
    ], capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stderr, file=sys.stderr); sys.exit(1)
    print(r.stdout)

    # 2. Snippet Still
    snippet = f"""<Still id="cliente-{nome}" component={{ClientesMiolo as never}}
  width={{vertical.largura}} height={{vertical.altura}}
  defaultProps={{{{
    card: 'oficial/_205-card_{nome}.png',
    texto: 'A **<NomeReal>** ({cidade}) faz parte do time de clientes da **DOMa**.'
  }}}} />"""
    print("\n📋 Snippet pra colar em remotion-doma/src/Root.tsx:")
    print(snippet)

    # 3. Próximos passos
    print(f"""
✅ Cliente '{nome}' configurado!

Próximos passos:
1. Conferir visualmente: {out_card}
2. Adicionar entrada em scripts/build-catalog.py se quiser metadata extra.
3. Rebuild catalog: python scripts/build-catalog.py
4. Sync pro host: bash scripts/sync-components.sh
5. Colar snippet acima em remotion-doma/src/Root.tsx
6. Render: bash remotion-doma/render-still.sh cliente-{nome}
""")

if __name__ == "__main__":
    main()
