# Plano — POST financas-bagunca

> Categoria: inimigo-em-comum (modelos POST 244/252)
> Criado: 2026-06-17
> Componente: `templates/components/inimigo-em-comum/InimigoComum.tsx`

## 1. Tema
Inimigo = desorganização financeira da PME (conta pessoal misturada, lucro no achismo).
**Frase clichê do empresário:** "Tá tudo na minha cabeça. Eu sei de cor quanto a minha empresa lucra de verdade." (card branco)
**Consequência/reflexão:** Quando a conta pessoal e a da empresa viram uma só, o lucro se perde no meio do caminho. (card soft)

## 2. Cores (fixas)
- Fundo: `#F4BB35` manga
- Watermark "DOMa" GIGANTE topo (175% width, sangra canto sup-esq): `#F2B02C` (mais ESCURA que fundo — tom-sobre-tom, conforme componente).
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
principal: '"Tá tudo na minha cabeça.\nEu sei de cor quanto a minha\nempresa **lucra de verdade.**"'
secundario: 'Quando a conta pessoal e a da\nempresa viram uma só, o lucro\nse perde no meio do caminho.'
```

## 6. Voz
- Provocativa. Aspas = frase clichê. Card soft = consequência sem julgar.

## 7. Validação + render + audit
- [ ] `validador-marca`.
- [ ] Snippet colado.
- [ ] `node render-still.mjs financas-bagunca`.
- [ ] Compare contra POST 244 ou 252.
