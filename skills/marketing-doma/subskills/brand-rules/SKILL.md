---
name: brand-rules
description: Regras transversais de marca da Doma — logo (DOMa, Doma, DOMA), watermark tom-sobre-tom medida, paleta amber, TT Lakes oficial, regras de voz. Use quando o usuário pedir "regras de marca", "como usar o logo", "qual cor", "voz Doma", "manual", ou quando outra sub-skill precisar consultar regra transversal.
---

# Brand Rules — regras transversais

Carrega/centraliza tudo que TODA peça deve respeitar, independente da categoria. Outras sub-skills devem **consultar** esta antes de codar.

## ⚠️ Logo

- Marca é **DOMa** — D-O-M maiúsculos + "a" minúsculo na mesma altura. O "ponto" entre M e "a" é a **perna do M cortada** (NÃO pontuação).
- 🛑 **NUNCA digitar** como assinatura/título: `DOMa`, `DOM.a`, `DOMA`, `Doma` — em peça, SEMPRE arquivo de logo (`../../../assets/logos/`).
- **`DOM.a` NÃO EXISTE** — em lugar nenhum.
- **Em prosa / texto corrido** (citar a empresa numa frase): escrever **"Doma"** (inicial maiúscula, resto minúsculo). Sem bold/destaque.
- **Caixa-alta "DOMA"**: SÓ em lockup visual de arte ("SEMANAÇO DOMA"), NUNCA em prosa.

## Versões do logo (escolher pela peça)
- **Wordmark horizontal** — `logotipo-principal-cor.png` / `-grafite.png` / `-branco.png`.
- **Vertical** — `logotipo-vertical-*` (DO em cima, M.a embaixo).
- **Selo circular** — `selo-grafite.png` / `selo-amarelo.png` ("DOMINE A GESTÃO DO SEU NEGÓCIO" texto curvo na borda).
- **Símbolo M** — `simbolo-m-*` (só o M, app icon, watermark grande).

## Watermark de fundo

- **SEMPRE LOGO oficial** (não texto digitado — vira "JM/UM/PONO").
- **Cor MAIS ESCURA tom-sobre-tom** (NÃO mais clara). Erro recorrente: usar `#F5C24A` clara → invisível. Correto: `#F2B02C` (~5-7% mais escura que `#F4BB35`).
- **Técnica**: `<div>` com `backgroundColor: <cor medida>` + `WebkitMaskImage: url(logotipo-principal-branco.png)` + `maskSize: 100% 100%`.
- ❌ NÃO usar: logo `-cor` (some), `mixBlendMode: multiply` (distorce D), grafite com opacity (sai cinza).
- **Posição/quantidade**: medir no modelo (muitas vezes só 4 repetições no meio, topo/base limpos).

## Paleta (medir cada peça — cores VARIAM entre peças)

| Token | HEX | Uso típico |
|---|---|---|
| manga | `#F4BB35` | fundo dominante |
| soft | `#F8DD6B` | cards secundários, highlight, faixa "ARRASTA" |
| watermark | `#F2B02C` | tom-sobre-tom (MAIS ESCURO que manga) |
| grafite | `#1F1F1F` / `#212121` | texto, logo, badge |
| branco | `#FFFFFF` | cards de destaque, mockup |
| soft-claro | `#EFEFEE` | card claro institucional |

⚠️ **NÃO reusar cor de outra peça** — amostrar pixel do modelo específico (RULES §0.1).

## Fonte

- **TT Lakes oficial** — fonte de verdade em `../../../assets/fontes/` (sincronizada pro host via `scripts/sync-components.sh`).
- Corpo regular (400). Palavra-chave bold (700-800). Kicker SemiBold (600), não 700.
- Cap-height medida do modelo → ajustar `fontSize` (não chutar).
- Quando largura não bate mas altura sim → adicionar **letterSpacing**, NÃO aumentar fontSize.

## Render anti-franja

- SEMPRE via `bash remotion-doma/render-still.sh <id>` (scale 2 → Lanczos).
- Container do componente:
  ```ts
  WebkitFontSmoothing: 'antialiased'
  MozOsxFontSmoothing: 'grayscale'
  textRendering: 'geometricPrecision'
  ```
- Render scale 1 = franja sub-pixel = "texto torto/tremido".

## Voz (resumo — ver `../../knowledge-base/identidade/voz-sigadoma.md` completo)

**3 tons:** provocativo (perguntas 2ª pessoa), explicativo (didático), motivacional (pés no chão).

**Bordões oficiais (usar em CTAs):**
- "Domine o seu negócio antes que ele domine você."
- "Quem domina a gestão, alcança mais resultados."
- "Domine seu negócio em um único lugar."
- "Assuma as rédeas do seu negócio."
- "O nosso negócio é ver o seu prosperar."

**Vocabulário próprio:** dominar/doma, controle, lucro, resultados, vendas, crescimento, completo, robusto, ágil, simples, prático.

**Frases proibidas:**
- ❌ Julgar ("luxo de quem não X", "preguiça", "burrice").
- ❌ Atacar concorrente.
- ❌ Anglicismo corporativo (traduzir o técnico).
- ❌ Promessa atalho/hack mágico.
- ❌ Humor sarcástico.
- ❌ Mencionar serviço puro (clínicas, salões, restaurantes) — só produto físico.

## Z-index, sobreposição, rotação

- Medir ordem na zona de contato (RULES §12).
- Pode NÃO ser linear (ex: pílulas — z=[6,2,3,4,5]).
- Tortos: medir ângulo (sutil, ±2-6°, alterna sinal).

## Anti-padrões transversais

- ❌ "DOM.a" escrito.
- ❌ Logo recriado em fonte/SVG.
- ❌ Watermark clara em vez de escura.
- ❌ Render scale 1.
- ❌ Voz julgadora.
- ❌ Cores chutadas (sempre medir).
