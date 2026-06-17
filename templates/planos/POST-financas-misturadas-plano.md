# Plano — POST financas-misturadas

> Categoria: inimigo-em-comum (modelos POST 244/252)
> Criado: 2026-06-17
> Componente: `templates/components/inimigo-em-comum/InimigoComum.tsx`

## 1. Tema
**Frase-inimigo (card branco principal):** "Quando o dinheiro da empresa e o seu viram um só, **o lucro deixa de existir.**"
**Consequência/reflexão (card soft secundário):** Conta misturada esconde o resultado real do seu negócio.
**Bordão/legenda (fora da arte):** Quem não controla o próprio negócio vira refém dele.

## 2. Cores (RE-MEDIDAS POST 244 + 252 em ponto limpo — específicas desta categoria)
- **Fundo: `#F4BB35`** (manga padrão, mais ESCURO).
- **Watermark "DOMa" GIGANTE** topo (175% width, sangra canto sup-esq): `#F5C24A` (MAIS CLARA que o fundo desta categoria).
- Card branco: `#FFFFFF`
- Badge circular preto: `#1F1F1F`
- Card soft: `#F8DD6B`

⚠️ Inimigo em Comum INVERTE o padrão "watermark mais escura": aqui a watermark é MAIS CLARA que o fundo (medido nos 2 modelos oficiais). Exceção documentada a RULES §9 só para esta categoria. NÃO confundir com paleta de Dicas/SPIN.

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
principal: '"Quando o dinheiro da\nempresa e o seu viram\num só, **o lucro deixa\nde existir.**"'
secundario: 'Conta misturada esconde\no resultado real\ndo seu negócio.'
```

## 6. Voz
- Provocativa. Aspas = frase clichê. Card soft = consequência sem julgar.

## 7. Validação + render + audit
- [ ] `validador-marca`.
- [ ] Snippet colado.
- [ ] `bash render-still.sh financas-misturadas`.
- [ ] Compare contra POST 244 ou 252.
