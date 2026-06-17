# Plano — POST {{NOME}}

> Categoria: frase-pilulas (modelo DWO5_TLDG1w — PADRÃO-OURO)
> Criado: {{DATA}}
> Componente: `templates/components/frase-em-pilulas/FrasePilulas.tsx`

## 1. Tema
**Frase única** dividida em 4-5 trechos curtos (1 por pílula).

## 2. Cores
- Fundo manga `#F4BB35`.
- Pílulas soft `#F8DD6B`.
- Texto grafite `#1F1F1F` bold em cada pílula.
- Watermark "DOMa" repetida em coluna com gap medido (não grudar).

## 3. Rotação (zigue-zague)
- ±2-6° alternando sinal — medir do modelo se reusar.

## 4. z-index (NÃO linear)
`z = [6, 2, 3, 4, 5]` — 1ª por cima, depois a de baixo cobre a de cima.

## 5. Conteúdo
Trecho 1: "..."
Trecho 2: "..."
Trecho 3: "..."
Trecho 4: "..."
Trecho 5: "..." (opcional)

## 6. Voz
- Provocativa, frase única curta (15-30 palavras totais).
- Negrito seletivo na palavra-chave de cada pílula.

## 7. Validação + render
- [ ] `validador-marca`.
- [ ] `bash render-still.sh {{NOME}}`.
