# Padrão de Post — "Diversas" (categoria nova, 2026-07-16)

> ✅ **CRIADO do modelo POST 178** ("O nosso negócio é ver o seu prosperar.") — `../../templates/components/diversas/Diversas.tsx`.
> Peças de referência: `controla-numero` / `controla-numero-story`.
> ⚠️ Re-medido pixel a pixel: o Doma178 antigo (doma-institucional) tinha fontes MUITO menores que o modelo real — esta ficha é a fonte da verdade.

Template tipográfico: frase em frame outline + fecho gigante. Props `{texto, fecho, story}` — só o texto varia.

## Estrutura medida (feed 1080×1350)
| Elemento | Medida |
|---|---|
| Fundo | manga `#F4BB35` |
| Watermark DOMa `#F1A625` | CSS mask, **SANGRADA**: `width 113.3%, left −6.7%, top 8.7%` (letras cortadas nas DUAS laterais). **zIndex NA FRENTE do frame** (frame some atrás das letras — ajuste Patrick) |
| Frame outline grafite | `L22.9% T18% W54.3% H63.9%`, `2px solid #1F1F1F`, **radius 65** |
| Badge gota branca | `L74.5% T33.2% W12.8%` (Ø~138), `borderRadius '50% 50% 50% 8%'`, glow `0 0 46px 10px #FFFFFF55`, ícone barras grafite + seta manga (SVG) |
| Texto | fs **98** (story 104), mix `**bold**`/regular INLINE, lineHeight 1.18, alinhado à esquerda com `paddingLeft 55` (recuo 53px da borda do frame) |
| Fecho | fs **140** (story 148), **weight 700** (800 rejeitado — grosso demais), lineHeight 1.05 |

## Regras de composição (aprendidas na criação)
1. **Bloco de texto CENTRADO VERTICALMENTE no frame** (medido: centro do bloco 673.5 vs frame 674.5) — container = as MESMAS coords do frame com `flex column justify-content center`. Funciona pra qualquer nº de linhas (modelo tinha 3+fecho; peça nova pode ter 4+fecho).
2. **Fecho vaza o frame SIMÉTRICO** (modelo x212–867 vs frame 247–833): wrapper `width 100%` + `display flex; justifyContent center` + span `nowrap`. ❌ `textAlign: center` NÃO serve — overflow de inline vaza só pra direita.
3. **Linha do frame NUNCA passa atrás do texto**: span do fecho com `backgroundColor: manga` + `padding '0 16px'` — "corta" as linhas verticais na faixa do texto.
4. **1ª linha do texto deve ser CURTA** (ex. "Quem") — linhas 1-2 não podem passar de x~805 (colidem com o badge).
5. Sem logo rodapé — watermark é a marca.

## Story (prop `story: true`, 1080×1920) — centralizado no canvas
- wm `top 18%`, frame `T28% H52%` (termina 80% < zona segura 1670px), badge `top 38%`.
- Conjunto no centro óptico (~y960). fs texto 104 / fecho 148.

## Copy pattern
- Linhas curtas com bold nas palavras-chave + fecho de UMA palavra forte ("prosperar.", "resultado.").
- Ex.: `texto: 'Quem\n**controla o**\n**número,**\ncontrola o'`, `fecho: 'resultado.'`.
