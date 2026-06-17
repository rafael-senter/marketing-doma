#!/usr/bin/env python3
"""
build-catalog.py — gera assets/CATALOGO.json (estruturado) + README detalhados
por pasta (oficial/, icones/, fontes/) a partir de descrições curadas + dims reais.

Roda 1x quando adiciona/remove asset. Re-gera tudo.

Output:
  - assets/CATALOGO.json (consumido pelo Web UI)
  - assets/oficial/README.md
  - assets/icones/README.md
  - assets/fontes/README.md
"""
import os, json, sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("[ERRO] PIL não instalado. Rode: pip install Pillow")
    sys.exit(1)

PLUGIN = Path(__file__).resolve().parent.parent
ASSETS = PLUGIN / "assets"

# ─── Descrições curadas (mantidas à mão — espelha doma-brand/manual) ──────

OFICIAL_META = {
    # Wordmark horizontal
    "logotipo-principal-cor": {
        "tipo": "wordmark-horizontal",
        "cor": "amarelo manga (#F4BB35)",
        "usar_sobre": ["grafite", "branco"],
        "evitar_sobre": ["amarelo", "soft"],
        "uso": "Logo principal sobre fundo escuro/branco. NÃO usar sobre amarelo (some)."
    },
    "logotipo-principal-grafite": {
        "tipo": "wordmark-horizontal",
        "cor": "grafite #1F1F1F",
        "usar_sobre": ["manga", "soft", "branco", "claro"],
        "evitar_sobre": ["grafite"],
        "uso": "Logo principal sobre fundo amarelo/branco. Versão MAIS COMUM em peças Doma."
    },
    "logotipo-principal-branco": {
        "tipo": "wordmark-horizontal-mask",
        "cor": "branco (uso como CSS mask)",
        "usar_sobre": ["qualquer cor via backgroundColor"],
        "evitar_sobre": [],
        "uso": "Máscara alpha. Tingir com cor medida via CSS mask + backgroundColor (técnica watermark + RULES §9)."
    },
    # Wordmark vertical
    "logotipo-vertical-cor": {"tipo": "wordmark-vertical", "cor": "amarelo", "usar_sobre": ["grafite", "branco"], "evitar_sobre": ["amarelo"], "uso": "Vertical empilhada DO/M.a — pra story/lockup vertical."},
    "logotipo-vertical-grafite": {"tipo": "wordmark-vertical", "cor": "grafite", "usar_sobre": ["amarelo", "branco"], "evitar_sobre": ["grafite"], "uso": "Vertical grafite — story 9:16, lockup."},
    "logotipo-vertical-branco": {"tipo": "wordmark-vertical-mask", "cor": "branco (mask)", "usar_sobre": ["qualquer via tingimento"], "evitar_sobre": [], "uso": "Máscara vertical — usado em watermark DO/MA (Certo e Errado POST 247/256)."},
    # Selo circular
    "selo-cor": {"tipo": "selo-circular", "cor": "amarelo", "usar_sobre": ["grafite"], "evitar_sobre": ["amarelo"], "uso": "Selo redondo c/ 'DOMINE A GESTÃO DO SEU NEGÓCIO · SOFTWARE PARA GESTÃO' em texto curvo. Sobre fundo escuro."},
    "selo-grafite": {"tipo": "selo-circular", "cor": "grafite", "usar_sobre": ["amarelo", "soft", "branco", "claro"], "evitar_sobre": ["grafite"], "uso": "Mais comum. Selo grafite no canto sup-dir de CTAs (Dicas Carrossel slide 9)."},
    "selo-branco": {"tipo": "selo-circular", "cor": "branco", "usar_sobre": ["grafite"], "evitar_sobre": ["branco"], "uso": "Selo branco sobre fundo escuro."},
    # Selo 14 anos
    "selo-14anos-1": {"tipo": "selo-aniversario", "cor": "amarelo + grafite", "usar_sobre": ["grafite", "branco"], "evitar_sobre": [], "uso": "Selo de 14 anos da marca (variante 1). USO TEMPORAL — só durante 2024/2025."},
    "selo-14anos-2": {"tipo": "selo-aniversario", "cor": "amarelo + grafite", "usar_sobre": ["grafite", "branco"], "evitar_sobre": [], "uso": "Variante 2."},
    "selo-14anos-3": {"tipo": "selo-aniversario", "cor": "amarelo + grafite", "usar_sobre": ["grafite", "branco"], "evitar_sobre": [], "uso": "Variante 3."},
    "selo-14anos-4": {"tipo": "selo-aniversario", "cor": "amarelo + grafite", "usar_sobre": ["grafite", "branco"], "evitar_sobre": [], "uso": "Variante 4."},
    # Complementos (grafismos decorativos)
    "complemento-fundo-amarelo": {"tipo": "grafismo-fundo", "cor": "amarelo", "usar_sobre": ["preto/grafite"], "evitar_sobre": ["amarelo"], "uso": "Grafismo decorativo de fundo sobre escuro."},
    "complemento-fundo-grafite": {"tipo": "grafismo-fundo", "cor": "grafite", "usar_sobre": ["amarelo", "branco"], "evitar_sobre": ["grafite"], "uso": "Grafismo de fundo sobre amarelo/branco."},
    "complemento-principal-cor": {"tipo": "grafismo", "cor": "amarelo", "usar_sobre": ["grafite"], "evitar_sobre": ["amarelo"], "uso": "Grafismo amber — uso decorativo."},
    "complemento-principal-grafite": {"tipo": "grafismo", "cor": "grafite", "usar_sobre": ["amarelo", "branco"], "evitar_sobre": ["grafite"], "uso": "Grafismo grafite — bordas/divisores."},
    "complemento-principal-branco": {"tipo": "grafismo-mask", "cor": "branco (mask)", "usar_sobre": ["qualquer via tingimento"], "evitar_sobre": [], "uso": "Grafismo como máscara — tingir conforme contexto."},
    # Sub-marcas
    "submarca-industria": {"tipo": "submarca", "cor": "varia (PNG e SVG)", "usar_sobre": ["amarelo", "grafite"], "evitar_sobre": [], "uso": "Lockup vertical 'INDÚSTRIA MOBILE' — bottom-bar de cards de vertical Indústria."},
    "submarca-moda": {"tipo": "submarca", "cor": "varia", "usar_sobre": ["amarelo", "grafite"], "evitar_sobre": [], "uso": "Lockup 'MODA MANAGER' — bottom-bar Moda."},
    "submarca-pdv": {"tipo": "submarca", "cor": "varia", "usar_sobre": ["amarelo", "grafite"], "evitar_sobre": [], "uso": "Lockup 'PDV ECOMMERCE'."},
    "submarca-textil": {"tipo": "submarca", "cor": "varia", "usar_sobre": ["amarelo", "grafite"], "evitar_sobre": [], "uso": "Lockup 'TÊXTIL'."},
    "submarca-varejo": {"tipo": "submarca", "cor": "varia", "usar_sobre": ["amarelo", "grafite"], "evitar_sobre": [], "uso": "Lockup 'VAREJO TÊXTIL' — bottom-bar Varejo."},
    # Taglines
    "tagline-horizontal-cor": {"tipo": "tagline", "cor": "amarelo + grafite", "usar_sobre": ["branco", "grafite"], "evitar_sobre": ["amarelo"], "uso": "Tagline horizontal — embaixo da logo principal."},
    "tagline-principal-cor": {"tipo": "tagline", "cor": "amarelo + grafite", "usar_sobre": ["branco", "grafite"], "evitar_sobre": ["amarelo"], "uso": "Tagline ao lado da logo."},
    "tagline-vertical-cor": {"tipo": "tagline", "cor": "amarelo + grafite", "usar_sobre": ["branco", "grafite"], "evitar_sobre": ["amarelo"], "uso": "Tagline empilhada — story 9:16."},
}

# ─── 50 ícones — descrições resumidas (já vem nomeado no arquivo) ────────

ICONES_META = {
    "icone-01-relogio":             "Relógio analógico — uso: tempo, prazo, urgência.",
    "icone-02-cracha":              "Crachá ID — uso: identificação, equipe, funcionário.",
    "icone-03-maleta":               "Maleta de negócios — uso: empresa, profissional, executivo.",
    "icone-04-banco":               "Prédio banco — uso: financeiro, banco, instituição.",
    "icone-05-arquivo":             "Arquivo/pasta — uso: documentos, armazenamento.",
    "icone-06-prancheta-check":     "Prancheta com check — uso: tarefa concluída, validação.",
    "icone-07-calculadora":         "Calculadora — uso: cálculo, contas, finanças.",
    "icone-08-luminaria":           "Lâmpada/luminária — uso: ideia, inovação, insight.",
    "icone-09-megafone":            "Megafone — uso: anúncio, comunicação, marketing.",
    "icone-10-podio-trofeu":        "Pódio + troféu — uso: ranking, conquista, top performance.",
    "icone-11-grafico-linha":       "Gráfico de linha (neutro) — uso: tendência, métrica.",
    "icone-12-grafico-linha-subindo": "Gráfico de linha SUBINDO — uso: crescimento, lucro.",
    "icone-13-grafico-linha-caindo":  "Gráfico de linha CAINDO — uso: queda, prejuízo (cuidado: voz Doma não atacar).",
    "icone-14-barras-seta-cima":      "Barras + seta pra cima — uso: alta, crescimento.",
    "icone-15-xadrez-cavalo":         "Cavalo de xadrez — uso: estratégia, plano.",
    "icone-16-documento-cifrao":      "Documento com cifrão — uso: nota fiscal, fatura.",
    "icone-17-prancheta-cifrao":      "Prancheta + cifrão — uso: orçamento, custo.",
    "icone-18-etiqueta-preco":        "Etiqueta de preço — uso: precificação, promo.",
    "icone-19-chat":                  "Balão de chat — uso: atendimento, conversa, suporte.",
    "icone-20-documento-busca":       "Documento + lupa — uso: análise documental, auditoria.",
    "icone-21-alvo-flecha":           "Alvo + flecha — uso: meta, objetivo, foco.",
    "icone-22-cartao-credito":        "Cartão de crédito — uso: pagamento, taxa, financeiro.",
    "icone-23-check-circulo":         "Check em círculo — uso: ok, validado, aprovado.",
    "icone-24-bandeira-montanha":     "Bandeira no topo da montanha — uso: meta atingida.",
    "icone-25-pessoa-balao":          "Pessoa com balão de fala — uso: cliente, opinião.",
    "icone-26-globo":                 "Globo terrestre — uso: alcance, nacional, internet.",
    "icone-27-maleta-negocios":       "Maleta + crescimento — uso: negócio, empresa.",
    "icone-28-organograma":           "Organograma — uso: estrutura, hierarquia, equipe.",
    "icone-29-apresentacao":          "Tela de apresentação — uso: pitch, treinamento.",
    "icone-30-documento":             "Documento simples — uso: relatório, papel.",
    "icone-31-gravata":               "Gravata — uso: profissional, formal (cuidado: público B2B).",
    "icone-32-lampada-cifrao":        "Lâmpada + cifrão — uso: ideia que gera dinheiro.",
    "icone-33-pessoa-apresentando":   "Pessoa apresentando — uso: palestra, treinamento.",
    "icone-34-barras-crescimento":    "Barras crescentes — uso: receita subindo, evolução.",
    "icone-35-barras-queda":          "Barras descendo — uso: queda (idem 13: cuidado).",
    "icone-36-planta-broto":          "Planta/broto — uso: crescimento orgânico, nascendo.",
    "icone-37-escudo-cifrao":         "Escudo com cifrão — uso: segurança financeira.",
    "icone-38-megafone-anuncio":      "Megafone variante — uso: divulgação.",
    "icone-39-projetor":              "Projetor — uso: projeção, planejamento.",
    "icone-40-barras-pequeno":        "Barras pequenas — uso: dado/indicador genérico.",
    "icone-41-trofeu":                "Troféu — uso: prêmio, conquista.",
    "icone-42-alvo-publico":          "Alvo com pessoa — uso: público-alvo, persona.",
    "icone-43-lupa-analise":          "Lupa de análise — uso: investigação, pesquisa.",
    "icone-44-calendario":            "Calendário — uso: data, prazo, agendamento.",
    "icone-45-cursor-clique":         "Cursor com clique — uso: ação digital, e-commerce.",
    "icone-46-compartilhar":          "Ícone compartilhar — uso: redes sociais, share.",
    "icone-47-binoculos":             "Binóculos — uso: visão, futuro, prospecção.",
    "icone-48-guarda-chuva":          "Guarda-chuva — uso: proteção, seguro, prevenção.",
    "icone-49-grafico-linha-ponto":   "Gráfico de pontos — uso: dado, série temporal.",
    "icone-50-jornal":                "Jornal/notícia — uso: notícia, comunicado, divulgação.",
}

# ─── Fontes ──────────────────────────────────────────────────────────────

FONTES_META = {
    "TTLakes-Regular": {"peso": 400, "uso": "Corpo de texto — DEFAULT. Sem bold."},
    "TTLakes-Medium": {"peso": 500, "uso": "Variante média — raramente usada."},
    "TTLakes-DemiBold": {"peso": 600, "uso": "Kicker / legenda pequena. NÃO usar como bold em corpo (vira pesado demais)."},
    "TTLakes-Bold": {"peso": 700, "uso": "Palavra-chave dentro de frase, badge, sub-card."},
    "TTLakes-ExtraBold": {"peso": 800, "uso": "Título principal, palavra-chave de impacto."},
    "TTLakes-Black": {"peso": 900, "uso": "Título gigante (fontSize 78+), número grande de header."},
}

# ─── Builder ─────────────────────────────────────────────────────────────

def get_dims(path):
    try:
        with Image.open(path) as im:
            return {"w": im.size[0], "h": im.size[1]}
    except Exception:
        return None

def build():
    catalog = {"oficial": [], "icones": [], "fontes": []}

    # OFICIAL
    for f in sorted((ASSETS / "oficial").iterdir()):
        if f.suffix not in (".png", ".svg"): continue
        slug = f.stem
        meta = OFICIAL_META.get(slug, {"tipo": "?", "cor": "?", "uso": "(sem descrição — adicionar em OFICIAL_META)"})
        item = {
            "arquivo": f.name,
            "slug": slug,
            "ext": f.suffix[1:],
            "size_kb": round(f.stat().st_size / 1024, 1),
            "dims": get_dims(f) if f.suffix == ".png" else None,
            "path_plugin": f"assets/oficial/{f.name}",
            "path_host": f"oficial/{f.name}",  # staticFile() do Remotion
            **meta
        }
        catalog["oficial"].append(item)

    # ICONES
    for f in sorted((ASSETS / "icones").iterdir()):
        if f.suffix != ".png": continue
        slug = f.stem
        item = {
            "arquivo": f.name,
            "slug": slug,
            "dims": get_dims(f),
            "size_kb": round(f.stat().st_size / 1024, 1),
            "path_plugin": f"assets/icones/{f.name}",
            "path_host": f"icones/{f.name}",
            "uso": ICONES_META.get(slug, "(adicionar em ICONES_META)")
        }
        catalog["icones"].append(item)

    # FONTES
    for f in sorted((ASSETS / "fontes").iterdir()):
        if f.suffix not in (".ttf", ".otf"): continue
        slug = f.stem
        meta = FONTES_META.get(slug, {"peso": "?", "uso": "?"})
        item = {
            "arquivo": f.name,
            "slug": slug,
            "size_kb": round(f.stat().st_size / 1024, 1),
            "path_plugin": f"assets/fontes/{f.name}",
            **meta
        }
        catalog["fontes"].append(item)

    # Salvar JSON
    out = ASSETS / "CATALOGO.json"
    out.write_text(json.dumps(catalog, ensure_ascii=False, indent=2))
    print(f"✅ {out} gerado ({sum(len(v) for v in catalog.values())} itens)")

    # README oficial
    md = ["# Catálogo — `assets/oficial/`\n", "Logos, selos, sub-marcas, complementos e taglines oficiais da Doma.\n"]
    md.append(f"\n**Total:** {len(catalog['oficial'])} arquivos.\n\n")
    md.append("| Arquivo | Tipo | Cor | Dimensões | Tamanho | Uso |")
    md.append("|---|---|---|---|---|---|")
    for it in catalog["oficial"]:
        dims = f"{it['dims']['w']}×{it['dims']['h']}" if it.get('dims') else 'SVG'
        md.append(f"| `{it['arquivo']}` | {it.get('tipo','?')} | {it.get('cor','?')} | {dims} | {it['size_kb']} KB | {it.get('uso','?')} |")
    (ASSETS / "oficial" / "README.md").write_text("\n".join(md) + "\n")
    print(f"✅ assets/oficial/README.md")

    # README icones
    md = ["# Catálogo — `assets/icones/`\n", "50 ícones bicolores oficiais da Doma (grade 5×10 do manual).\n\n",
          "**Estilo:** line icons two-tone (grafite + amarelo).\n",
          "**⚠️ Sobre fundo amarelo:** parte amarela do ícone bicolor SOME. Use variante monocromática OU chip de contraste.\n\n"]
    md.append("| Arquivo | Dimensões | Tamanho | Uso |")
    md.append("|---|---|---|---|")
    for it in catalog["icones"]:
        dims = f"{it['dims']['w']}×{it['dims']['h']}" if it.get('dims') else '?'
        md.append(f"| `{it['arquivo']}` | {dims} | {it['size_kb']} KB | {it['uso']} |")
    (ASSETS / "icones" / "README.md").write_text("\n".join(md) + "\n")
    print(f"✅ assets/icones/README.md")

    # README fontes
    md = ["# Catálogo — `assets/fontes/`\n", "TT Lakes (oficial da marca). Carregada via `@font-face` em `remotion-doma/public/fontes/`.\n\n"]
    md.append("| Arquivo | Peso | Uso |")
    md.append("|---|---|---|")
    for it in catalog["fontes"]:
        md.append(f"| `{it['arquivo']}` | {it.get('peso','?')} | {it.get('uso','?')} |")
    md.append("\n## Configuração Remotion (em theme.ts)\n")
    md.append("```ts\nexport const brand = { fontes: { titulo: 'TT Lakes', corpo: 'TT Lakes' } };\n```\n")
    md.append("\n## Anti-padrões\n")
    md.append("- ❌ Fallback do sistema (Arial/Helvetica) — fonte fica errada.\n")
    md.append("- ❌ Corpo todo em bold ('tudo bold' anula contraste).\n")
    md.append("- ❌ Kicker em 700 (manual diz 600 SemiBold).\n")
    (ASSETS / "fontes" / "README.md").write_text("\n".join(md) + "\n")
    print(f"✅ assets/fontes/README.md")

if __name__ == "__main__":
    build()
