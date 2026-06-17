# Grafismos da marca Doma

Elementos gráficos recorrentes do design system (vivem em `../../assets/oficial/` ou são gerados em código).

## Origem do grafismo
O **corte diagonal ~45°** presente em quase todos os templates VEM da perna diagonal do M do logo. Constante visual da marca:
- Divisor entre seções.
- Máscara de foto (corte diagonal sobre imagem).
- Faixa tom-sobre-tom.
- Abertura de bloco de cor.

## Complementos (PNG)

| Arquivo | Uso |
|---|---|
| `complemento-fundo-amarelo.png` | grafismo decorativo sobre fundo amber |
| `complemento-fundo-grafite.png` | grafismo sobre fundo escuro (Semanaço, promo) |
| `complemento-principal-cor.png` | grafismo amber sobre fundo grafite |
| `complemento-principal-grafite.png` | grafismo grafite sobre fundo claro |
| `complemento-principal-branco.png` | branco sobre grafite |

## Grafismos extraídos por post (em `assets/oficial/_<XXX>-graf*.png`)

Cada post pode ter grafismos PRÓPRIOS extraídos do modelo (technique RULES §9):
- Pintar conteúdo (cards/logo/texto) com cor amber → sobra só a decoração de fundo.
- Vira `_<XXX>-graf1.png` (capa) e `_<XXX>-graf8.png` (fecho), reusados como bg full-bleed.

Exemplos:
- `_205-graf1.png` — grafismo capa do POST 205 (carrossel clientes).
- `_205-graf8.png` — grafismo fecho.
- `_193-bg.png` — watermark "DOMa" tom-sobre-tom extraída de slide puro-texto (POST 193 Trento).

## Watermark "DOMa" gigante (técnica CSS mask)

Não é asset separado — usa o `logotipo-principal-branco.png` como máscara + `backgroundColor` na cor medida.

```tsx
<div style={{
  position: 'absolute', top: '4%', width: '100%', aspectRatio: '1767 / 322',
  backgroundColor: '#F2B02C',
  WebkitMaskImage: `url(${staticFile('oficial/logotipo-principal-branco.png')})`,
  maskImage: `url(${staticFile('oficial/logotipo-principal-branco.png')})`,
  WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
  WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat'
}} />
```

## Watermark vertical "DO/MA"

Para peças tipo Certo e Errado (POST 247/256) — usa `logotipo-vertical-branco.png` no lugar.

## Watermark OUTLINE (vazado)

POST Cliente Novo (LAYOUT CLIENTE NOVO) — 2 CSS masks empilhadas:
- Camada base: cor do contorno (`#F6C85D`).
- Camada top: cor do FUNDO, `inset` reduzido (ex `inset: '6px 4px'`) — come o interior.

Resultado: só borda visível = outline. Ver RULES §18.

## Pílulas / pílulas tortas

Tomam rotação medida do modelo (±2-6°, alternando sinal — zigue-zague).

## Cards arredondados (raio)

- Pílula: raio 999 (fully round).
- Card padrão: raio 30-40.
- Card grande: raio 36-48.
- Card faixa "ARRASTA": só cantos superiores 40 (base toca a borda).

## Selos circulares

- `selo-grafite.png` (sup-dir do CTA — Dicas) — texto curvo "DOMINE A GESTÃO DO SEU NEGÓCIO".
- `selo-amarelo.png`, `selo-branco.png` — variantes.

## Anti-padrões

- ❌ Grafismo recriado em CSS sem comparar com modelo.
- ❌ Corte diagonal genérico (45°) sem origem no M do logo.
- ❌ Watermark sem aspect-ratio correto (logo estica errado).
