---
name: produtividade
description: Cards "produtividade" — foto + título topo + sub-card escuro EMBUTIDO na foto com frase ("tempo parado", "operação enxuta"). Modelos POST 254/270/277. Use quando o usuário pedir "card produtividade", "foto + sub-card escuro", "tempo parado".
---

# Produtividade

**Componentes:**
- `Produtividade270.tsx` — foto-card + sub-card baked (modelo principal)
- `Produtividade277.tsx`, `Produtividade254.tsx` — variantes (selo, operário nanobanana)

**Ficha:** `../../../knowledge-base/padroes/produtividade.md`

## Padrão visual (270)
- Fundo manga + watermark sutil.
- Título 2 linhas topo ("O **maior custo** da sua fábrica").
- **Foto card** L12.4% T27.5% W78.2% H51.7% raio 28 — foto + sub-card grafite baked dentro (com frase "pode ser o tempo parado.").
- Logo DOMa rodapé T90% centralizado.

⚠️ **Pílula baked DENTRO da foto** — recortar a foto inteira (com a pílula) do modelo. Não tentar separar.

## Voz
- Direta, didática. Cifrão implícito ("custo", "tempo", "desperdício").

## Quando usar
- Educativo sobre eficiência operacional.
- Carrossel slide solo.

## Anti-padrões
- ❌ Sub-card recriado em CSS sobre a foto (perde alinhamento). Extrair junto.
- ❌ Foto sem o ponto final do sub-card (clipping baked errado — re-extrair com bbox correto).

## Próximos passos
1. Variar tema (custo invisível, retrabalho, ociosidade).
2. Combinar com SPIN (capa).
