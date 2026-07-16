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
    "selo-preto-solido": {"tipo": "selo-circular", "cor": "círculo preto sólido #1F1F1F + escritas brancas", "usar_sobre": ["amarelo", "foto", "claro"], "evitar_sobre": ["grafite"], "uso": "Selo achatado (círculo+escritas em 1 png, glifo 72%) p/ usos fora do Remotion. NO Remotion preferir 2 camadas: div círculo preto + selo-branco.png por cima (borda ajustável) — cf doma-motiva.md v3."},
    # Selo 14 anos — 8 variantes mapeadas (ZIP oficial do Patrick, 2026-07-16; confirmado EM USO em 2026)
    # 4 com badge (balão arredondado com 1 canto reto):
    "selo-14anos-1": {"tipo": "selo-aniversario", "cor": "badge amarelo manga #F7BE35 + glifo grafite", "usar_sobre": ["imagem/foto (uso canônico)", "grafite", "branco"], "evitar_sobre": ["amarelo (usar a -4 no lugar)"], "uso": "Selo 14 anos COM badge manga (= SELO 14 ANOS-12 do ZIP). USO CANÔNICO: sobre IMAGENS/FOTOS. Sobre fundo amber usar selo-14anos-4. Confirmado em uso 2026."},
    "selo-14anos-2": {"tipo": "selo-aniversario", "cor": "badge grafite + glifo amarelo manga", "usar_sobre": ["amarelo", "soft", "branco"], "evitar_sobre": ["grafite"], "uso": "Selo COM badge grafite, número manga (= SELO 14 ANOS-13). P/ fundo amber/claro."},
    "selo-14anos-3": {"tipo": "selo-aniversario", "cor": "badge grafite + glifo amarelo soft", "usar_sobre": ["amarelo", "branco"], "evitar_sobre": ["grafite"], "uso": "Badge grafite, número soft (= SELO 14 ANOS-14)."},
    "selo-14anos-4": {"tipo": "selo-aniversario", "cor": "badge grafite + glifo branco", "usar_sobre": ["amarelo", "soft", "foto"], "evitar_sobre": ["grafite", "branco"], "uso": "Badge grafite, número branco (= SELO 14 ANOS-17). USO CANÔNICO sobre fundo AMBER (padrão do projeto, correção Patrick 2026-07-16)."},
    # 4 SEM fundo (só o glifo '14 anos' transparente) — casos específicos onde badge não cabe:
    "selo-14anos-transp-grafite": {"tipo": "selo-aniversario-transp", "cor": "grafite (sem fundo)", "usar_sobre": ["amarelo", "soft", "branco", "claro"], "evitar_sobre": ["grafite", "foto escura"], "uso": "Glifo 14 anos grafite transparente (= Prancheta cópia 4). Direto sobre fundo amber/claro."},
    "selo-14anos-transp-manga": {"tipo": "selo-aniversario-transp", "cor": "amarelo manga (sem fundo)", "usar_sobre": ["grafite", "branco", "foto escura"], "evitar_sobre": ["amarelo"], "uso": "Glifo manga transparente (= Prancheta cópia 5). Sobre fundo escuro/branco."},
    "selo-14anos-transp-soft": {"tipo": "selo-aniversario-transp", "cor": "amarelo soft (sem fundo)", "usar_sobre": ["grafite", "foto escura"], "evitar_sobre": ["amarelo", "branco"], "uso": "Glifo soft transparente (= Prancheta cópia 6). Sobre fundo escuro."},
    "selo-14anos-transp-branco": {"tipo": "selo-aniversario-transp", "cor": "branco (sem fundo)", "usar_sobre": ["grafite", "foto escura"], "evitar_sobre": ["branco", "amarelo claro"], "uso": "Glifo branco transparente (= Prancheta cópia 7). Sobre fundo escuro/foto."},
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

# ─── Bases nanobanana — base fotorrealista de cada POST 127/201/207/248/266/273/115/257 ──

BASES_NANOBANANA_META = {
    "_func127-base": {
        "post": "POST 127", "categoria": "funcoes-sistema",
        "device": "mão+iPhone", "tela": "dashboard ERP Doma",
        "uso": "Base fotorrealista do POST 127 — feature de dashboard mobile. Reusar clonando p/ feature similar.",
        "reusar_em": "outras peças com tema 'mobile ERP'"
    },
    "_func201-base": {
        "post": "POST 201", "categoria": "funcoes-sistema",
        "device": "mão+iPhone", "tela": "WhatsApp + ERP",
        "uso": "Base do POST 201 — atendimento via WhatsApp integrado. Visual de chat sobreposto.",
        "reusar_em": "peças sobre integração WhatsApp/atendimento"
    },
    "_func207-base": {
        "post": "POST 207", "categoria": "funcoes-sistema",
        "device": "mão+iPhone", "tela": "tela ERP",
        "uso": "Base do POST 207 — feature mobile genérica.",
        "reusar_em": "peças mobile ERP"
    },
    "_func248-base": {
        "post": "POST 248", "categoria": "funcoes-sistema",
        "device": "laptop", "tela": "dashboard financeiro",
        "uso": "Base do POST 248 — feature desktop. Laptop 3D.",
        "reusar_em": "peças desktop/dashboard"
    },
    "_func266-base": {
        "post": "POST 266", "categoria": "funcoes-sistema",
        "device": "mão+iPhone", "tela": "tela ERP",
        "uso": "Base do POST 266.",
        "reusar_em": "peças mobile ERP"
    },
    "_func273-base": {
        "post": "POST 273", "categoria": "funcoes-sistema",
        "device": "laptop", "tela": "dashboard ERP",
        "uso": "Base do POST 273 — laptop com dashboard.",
        "reusar_em": "peças desktop ERP"
    },
    "_funcinadimplencia-base": {
        "post": "POST inadimplencia (2026-07-16)", "categoria": "funcoes-sistema",
        "device": "notebook (MacBook-like)", "tela": "Painel de Inadimplência (Dashboard Financeiro, ERP Doma Indústria)",
        "uso": "Base notebook com tela real de Inadimplência. Moldura via nanobanana + screenshot ORIGINAL composto pixel-perfect na tela (Gemini re-renderiza texto com typos — nunca usar tela crua do Gemini); transp via rembg.",
        "reusar_em": "peças desktop ERP financeiro/inadimplência"
    },
    "_doma115-base": {
        "post": "POST 115", "categoria": "doma-institucional",
        "device": "phone", "tela": "menu Doma (institucional)",
        "uso": "Base do POST 115 — institucional com phone + menu app Doma.",
        "reusar_em": "peças institucionais mobile"
    },
    "_doma257-base": {
        "post": "POST 257", "categoria": "doma-institucional",
        "device": "notas R$", "tela": "notas de dinheiro fotorrealistas",
        "uso": "Base do POST 257 — institucional com notas R$ (tema financeiro). Sem device.",
        "reusar_em": "peças com tema dinheiro/lucro/financeiro"
    },
}

# ─── Builder ─────────────────────────────────────────────────────────────

def get_dims(path):
    try:
        with Image.open(path) as im:
            return {"w": im.size[0], "h": im.size[1]}
    except Exception:
        return None

def build():
    catalog = {"oficial": [], "icones": [], "fontes": [], "bases-nanobanana": [], "bases-nanobanana-transparente": [], "bases-nanobanana-soft": [], "bases-nanobanana-grafite": [], "fotos": [], "grafismos": [], "cards-clientes": []}

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

    # BASES NANOBANANA
    bases_dir = ASSETS / "bases-nanobanana"
    if bases_dir.exists():
        for f in sorted(bases_dir.iterdir()):
            if f.suffix != ".png": continue
            slug = f.stem
            meta = BASES_NANOBANANA_META.get(slug, {"post": "?", "categoria": "?", "uso": "(adicionar em BASES_NANOBANANA_META)"})
            item = {
                "arquivo": f.name,
                "slug": slug,
                "dims": get_dims(f),
                "size_kb": round(f.stat().st_size / 1024, 1),
                "path_plugin": f"assets/bases-nanobanana/{f.name}",
                "path_host": f"oficial/{f.name}",  # vai pra public/oficial/ no host
                **meta
            }
            catalog["bases-nanobanana"].append(item)

    # BASES NANOBANANA TRANSPARENTE (rembg) — pareadas com bases-nanobanana
    transp_dir = ASSETS / "bases-nanobanana-transparente"
    if transp_dir.exists():
        for f in sorted(transp_dir.iterdir()):
            if f.suffix != ".png": continue
            slug = f.stem  # ex: _func127-base-transp
            base_slug = slug.replace("-transp", "")
            meta = BASES_NANOBANANA_META.get(base_slug, {"post": "?", "categoria": "?"})
            item = {
                "arquivo": f.name,
                "slug": slug,
                "dims": get_dims(f),
                "size_kb": round(f.stat().st_size / 1024, 1),
                "path_plugin": f"assets/bases-nanobanana-transparente/{f.name}",
                "path_host": f"oficial/{f.name}",
                "post": meta.get("post"),
                "categoria": meta.get("categoria"),
                "device": meta.get("device"),
                "tela": meta.get("tela"),
                "uso": f"Versão TRANSPARENTE de _{base_slug}.png (rembg). Use sobre fundo diferente de amber.",
                "fundo": "transparente",
                "par_com": f"{base_slug}.png"
            }
            catalog["bases-nanobanana-transparente"].append(item)

    # BASES NANOBANANA SOFT + GRAFITE (variantes de BG)
    for bg_variant, color_hex in [("soft", "#F8DD6B"), ("grafite", "#1F1F1F")]:
        bg_dir = ASSETS / f"bases-nanobanana-{bg_variant}"
        if bg_dir.exists():
            for f in sorted(bg_dir.iterdir()):
                if f.suffix != ".png": continue
                slug = f.stem
                base_slug = slug.replace(f"-{bg_variant}", "")
                meta = BASES_NANOBANANA_META.get(base_slug, {"post": "?", "categoria": "?"})
                catalog[f"bases-nanobanana-{bg_variant}"].append({
                    "arquivo": f.name, "slug": slug,
                    "dims": get_dims(f), "size_kb": round(f.stat().st_size / 1024, 1),
                    "path_plugin": f"assets/bases-nanobanana-{bg_variant}/{f.name}",
                    "path_host": f"oficial/{f.name}",
                    "post": meta.get("post"), "categoria": meta.get("categoria"),
                    "device": meta.get("device"), "tela": meta.get("tela"),
                    "fundo": f"{bg_variant} ({color_hex})",
                    "uso": f"Versão BG {bg_variant} de _{base_slug}.png. Use sobre fundo {bg_variant} ou peças não-padrão.",
                    "par_com": f"{base_slug}.png"
                })

    # FOTOS reutilizáveis
    fotos_dir = ASSETS / "fotos"
    fotos_meta = {
        "_teste-foto-cliente": {"tema": "loja-cliente", "uso": "Foto vitrine/fachada de loja Flairar (Teixeira de Freitas/BA). REUSAR pra peças cliente novo."},
        "_teste-foto-cliente2": {"tema": "loja-cliente", "uso": "Foto Essence Glamour (Jaraguá do Sul/SC). REUSAR pra peças cliente novo."},
        "_prod-industria-foto": {"tema": "industria", "uso": "Gestor de indústria (40-48, camisa social + capacete/óculos, tablet, operários com EPIs ao fundo) — nanobanana cf persona-imagens.md. REUSAR pra peças do setor Indústria e Produção."},
        "_spin-moveis-foto": {"tema": "loja-moveis", "uso": "Dono de loja de móveis (38-45, camisa social, tablet, showroom) — nanobanana cf persona-imagens.md. REUSAR pra peças do setor Móveis e Eletro."},
        "_teste-motiva-242": {"tema": "motivacional-242", "uso": "Foto motivacional POST 242 — pessoa/cena de trabalho."},
        "_teste-motiva-250": {"tema": "motivacional-250", "uso": "Foto motivacional POST 250 — virada/crescimento."},
        "_teste-narr-265": {"tema": "narrativa-estoque", "uso": "Foto narrativa POST 265 — estoque cheio/loja."},
        "_teste-prod-270": {"tema": "fabrica", "uso": "Foto fábrica POST 270 — operação industrial. Reusar pra peças indústria."},
        "_teste-prod-277": {"tema": "fabrica-2", "uso": "Foto fábrica POST 277 — variante."},
        "_teste-spin-foto": {"tema": "spin-243", "uso": "Foto capa SPIN POST 243 — empresário/gestor."},
        "_teste-spin251-foto": {"tema": "spin-251", "uso": "Foto capa SPIN POST 251."},
        "_prod254-foto": {"tema": "fabrica-3", "uso": "Foto POST 254 — operário (nanobanana + SENAI)."},
        "_prod270-foto": {"tema": "fabrica-card", "uso": "Foto card POST 270 — versão re-extraída com pílula 'tempo parado.'"},
    }
    if fotos_dir.exists():
        for f in sorted(fotos_dir.iterdir()):
            if f.suffix not in (".jpg", ".png"): continue
            slug = f.stem
            meta = fotos_meta.get(slug, {"tema": "?", "uso": "(adicionar em fotos_meta)"})
            catalog["fotos"].append({
                "arquivo": f.name, "slug": slug,
                "dims": get_dims(f), "size_kb": round(f.stat().st_size / 1024, 1),
                "path_plugin": f"assets/fotos/{f.name}", "path_host": f"oficial/{f.name}",
                **meta
            })

    # FOTOS DE SEGMENTOS (fundos trocáveis da categoria "segmentos")
    seg_dir = ASSETS / "fotos-segmentos"
    seg_meta = {
        "loja-produtos-naturais": {"tema": "segmento-naturais-v1", "uso": "Loja de produtos naturais CLEAN (placa 'PRODUTOS NATURAIS - ORGÂNICOS'). Fundo do segmento-naturais v1."},
        "loja-produtos-naturais-v2": {"tema": "segmento-naturais-v2", "uso": "Loja de produtos naturais VISÃO DO DONO (granéis com R$/kg, PDV, balança, 'Promoção do Dia'). Regra: foto de segmento = visão do dono, cf segmentos.md."},
    }
    if seg_dir.exists():
        catalog.setdefault("fotos-segmentos", [])
        for f in sorted(seg_dir.iterdir()):
            if f.suffix not in (".jpg", ".png"): continue
            slug = f.stem
            meta = seg_meta.get(slug, {"tema": "?", "uso": "(adicionar em seg_meta)"})
            catalog["fotos-segmentos"].append({
                "arquivo": f.name, "slug": slug,
                "dims": get_dims(f), "size_kb": round(f.stat().st_size / 1024, 1),
                "path_plugin": f"assets/fotos-segmentos/{f.name}", "path_host": f"segmentos/{f.name}",
                **meta
            })

    # GRAFISMOS extraídos
    graf_dir = ASSETS / "grafismos"
    graf_meta = {
        "_193-bg": {"tipo": "watermark-bg", "uso": "Watermark 'DOMa' tom-sobre-tom extraído de slide puro-texto do POST 193 (Trento). Background full-bleed reusable pra qualquer carrossel com fundo amber + watermark."},
        "_205-graf1": {"tipo": "grafismo-capa", "uso": "Grafismo capa POST 205 — soft amber-on-amber decorativo. Pode reusar como capa institucional."},
        "_205-graf8": {"tipo": "grafismo-fecho", "uso": "Grafismo fecho POST 205 — decorativo p/ slide final."},
        "_narr272-fg": {"tipo": "produto-cutout", "uso": "Moedas 3D em foreground (rembg) do POST 272 narrativa. REUSAR em peças tema dinheiro/lucro/$."},
        "_dicas246-icones": {"tipo": "icones-tema", "uso": "Cifrão + gráfico cadente line-art (extraído POST 246 margem de lucro). Reusar em capas Dicas com tema financeiro/margem/gestão (já usado em gestao-financeira)."},
        "simbolo-m-amarelo": {"tipo": "simbolo-m", "uso": "Símbolo M isolado extraído do manual pg 18 — grafismo derivado do M do logotipo (perna direita cortada = seta de crescimento). Cor amarelo manga. Usar em watermark gigante, app icon, marca d'água em peças com fundo escuro/branco."},
        "simbolo-m-grafite": {"tipo": "simbolo-m", "uso": "Símbolo M grafite (variante recolorida do amarelo). Usar sobre fundo amarelo/branco/soft."},
        "simbolo-m-branco": {"tipo": "simbolo-m", "uso": "Símbolo M branco (uso como CSS mask). Tingir com backgroundColor + WebkitMaskImage pra qualquer cor."},
    }
    if graf_dir.exists():
        for f in sorted(graf_dir.iterdir()):
            if f.suffix not in (".png", ".jpg"): continue
            slug = f.stem
            meta = graf_meta.get(slug, {"tipo": "?", "uso": "(adicionar em graf_meta)"})
            catalog["grafismos"].append({
                "arquivo": f.name, "slug": slug,
                "dims": get_dims(f), "size_kb": round(f.stat().st_size / 1024, 1),
                "path_plugin": f"assets/grafismos/{f.name}", "path_host": f"oficial/{f.name}",
                **meta
            })

    # CARDS de cliente baked (POST 205)
    cards_dir = ASSETS / "cards-clientes"
    if cards_dir.exists():
        for f in sorted(cards_dir.iterdir()):
            if f.suffix != ".png": continue
            slug = f.stem
            # extrair número do card (cardN)
            num = slug.replace("_205-card", "")
            catalog["cards-clientes"].append({
                "arquivo": f.name, "slug": slug,
                "dims": get_dims(f), "size_kb": round(f.stat().st_size / 1024, 1),
                "path_plugin": f"assets/cards-clientes/{f.name}", "path_host": f"oficial/{f.name}",
                "post": "POST 205", "card_num": num,
                "uso": f"Card cliente #{num} recortado do POST 205 (logo+cor+cantos baked). NÃO reutilizar para OUTROS clientes — cada cliente tem cor própria.",
                "warning": "específico por cliente — recortar do modelo do cliente próprio."
            })

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

    # README bases-nanobanana
    if catalog["bases-nanobanana"]:
        md = ["# Catálogo — `assets/bases-nanobanana/`\n",
              "Bases fotorrealistas geradas via [nanobanana-skill](../../knowledge-base/) (Gemini Imagen).\n",
              "Cada base = device (mão+iPhone / laptop / produto) + tela do ERP Doma. Overlays Remotion vetoriais por cima (texto nunca baked).\n\n",
              "**Reuso:** clonar pra peça similar trocando overlays — base NÃO é editável trivialmente (regerar via nanobanana se precisar mudar device/tela).\n\n",
              "| Arquivo | POST | Categoria | Device | Tela | Dims | Tamanho | Reusar em |",
              "|---|---|---|---|---|---|---|---|"]
        for it in catalog["bases-nanobanana"]:
            dims = f"{it['dims']['w']}×{it['dims']['h']}" if it.get('dims') else '?'
            md.append(f"| `{it['arquivo']}` | {it.get('post','?')} | {it.get('categoria','?')} | {it.get('device','?')} | {it.get('tela','?')} | {dims} | {it['size_kb']} KB | {it.get('reusar_em','?')} |")
        md.append("\n## Como usar\n")
        md.append("Em `FuncoesSistemaProps` (ou `Doma115`/`Doma257`):\n")
        md.append("```tsx\n<FuncoesSistema base='oficial/_func127-base.png' ... />\n```\n")
        md.append("Sync via `scripts/sync-components.sh` copia plugin → host (`remotion-doma/public/oficial/`).\n")
        (bases_dir / "README.md").write_text("\n".join(md) + "\n")
        print(f"✅ assets/bases-nanobanana/README.md")

if __name__ == "__main__":
    build()
