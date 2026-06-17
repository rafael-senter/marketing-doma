# Plano — POST inimigo-financeiro

> Categoria: inimigo-em-comum (modelos POST 244/252)
> Criado: 2026-06-17
> Componente: `templates/components/inimigo-em-comum/InimigoComum.tsx`

## 1. Tema
**Inimigo nomeado (card branco principal):** "O maior inimigo do seu negócio não é a concorrência. É o **descontrole financeiro.**"
**Consequência/reflexão (card soft secundário):** Não é falta de venda — é falta de controle. Quem não controla, vira refém.

## 2. Cores (fixas)
- Fundo: `#F4BB35` manga
- Watermark "DOMa" GIGANTE topo (175% width, sangra canto sup-esq): `#F2B02C` (tom-sobre-tom MAIS ESCURA que o fundo — `#F5C24A` é mais clara = invisível, proibida).
- Card branco: `#FFFFFF`
- Badge circular preto: `#1F1F1F`
- Card soft: `#F8DD6B`

## 3. Estrutura (slide único — card)
- **Card branco** L9% T22.2% W81.9% H24.2% raio 34 — frase entre aspas curvas, **bold no remate**.
- **Badge circular preto** Ø119 centro L26.2% T52.9% — seta ↘ SVG strokeWidth 6.5.
- **Card soft** L16% T54% W68% H24% raio 30 — texto secundário centralizado.
- **Logo DOMa** rodapé T87% centralizado.

## 4. Quebras de linha (HARDCODED)
Texto centralizado é frágil — usar `\n` explícito:
- `principal`: 3+3 linhas (regular + bold)
- `secundario`: 3 linhas regular

## 5. Conteúdo

```ts
principal: '"O maior inimigo do seu negócio\nnão é a concorrência.\nÉ o **descontrole financeiro."**'
secundario: 'Não é falta de venda —\né falta de controle.\nQuem não controla, vira refém.'
```

## 6. Voz
- Provocativa. Aspas = frase clichê. Card soft = consequência sem julgar.

## 7. Validação + render + audit
- [ ] `validador-marca`.
- [ ] Snippet colado.
- [ ] `bash render-still.sh inimigo-financeiro`.
- [ ] Compare contra POST 244 ou 252.
