# Plano — POST rede-lojas

> Categoria: spin (modelos POST 243/251)
> Criado: 2026-07-16
> Componente: `templates/components/spin/Spin.tsx`
> Sub-componentes: `SpinCapa`, `SpinMiolo`, `SpinCta`
> ⚠️ Live-rule 2026-07-16: TODA peça = feed (1080×1350) + story (1080×1920). 12 Stills: `rede-lojas-1..6` + `rede-lojas-1..6-story`.

## 1. Tema central
**Tema:** gestão de rede de lojas sem visão unificada de dados (multiloja). Setor da capa: **Móveis e Eletro** (setores-atendidos.md).

## 2. Foto da capa
- `assets/fotos/_spin-moveis-foto.png` — dono de loja de móveis (38-45, camisa social, tablet, showroom) gerada via `scripts/nanobanana-generate.py` seguindo `persona-imagens.md` (catálogo ✗ → internet sem garantia de persona → nanobanana ✓).

## 3. Estrutura SPIN (6 slides, copy do Patrick — ajustada à voz)

| # | Tipo | Função | Conteúdo |
|---|---|---|---|
| 1 | SpinCapa | Hook | Título: "O **crescimento** da sua rede de lojas está sendo acompanhado por **dados**?" + foto loja de móveis |
| 2 | SpinMiolo | Situação | → Você consegue enxergar o desempenho de todas as suas lojas com clareza?\n\n→ Ou precisa juntar informação de vários lugares pra entender o que está acontecendo?\n\n→ Você sabe qual unidade vende mais? |
| 3 | SpinMiolo | Problema | → Você sabe quais vendedores realmente entregam resultado?\n\n→ Consegue dizer quais produtos são responsáveis pelo seu faturamento?\n\n→ E seus clientes… você sabe quem mais compra na sua rede? |
| 4 | SpinMiolo | Implicação | → E se você estiver tomando decisões olhando só uma parte da operação?\n\n→ Quantas oportunidades você pode estar perdendo por não ter uma visão completa? |
| 5 | SpinMiolo (cardClaro) | Necessidade | **E se você tivesse tudo isso em um só lugar:**\n→ Relatórios avançados de vendas\n→ Desempenho detalhado por vendedor\n→ Ranking de clientes e produtos\n→ Curva ABC\n→ DRE simples e detalhado\n→ Visão completa da sua rede\n\n**Você ainda gerenciaria do mesmo jeito?** |
| 6 | SpinCta | Doma resolve | Texto: "Com a Doma, você entende sua rede como um todo — e não loja por loja isolada. Domine o seu negócio antes que ele domine você." + Destaque: "Teste agora e veja sua operação com clareza de verdade." |

## 4. Regra crítica
- **Doma NÃO aparece nos slides 1-5** — só no slide 6. ✓ (copy respeita)
- Slides 1-5 = 100% dor do empresário, perguntas em 2ª pessoa. ✓
- Slide 6: "Doma" em prosa (inicial maiúscula, sem destaque) + selo/logo = asset oficial.
- Bordão incluído no CTA: "Domine o seu negócio antes que ele domine você." ✓

## 5. Cores (ficha spin.md, medidas nos POST 243/251)
- manga `#F4BB35` · soft `#F8DD6B` · grafite `#1F1F1F` · preto seta `#212121` · branco `#FFFFFF`
- Capa: bloco título manga + bloco texto soft + foto full-bleed central + faixa inferior manga
- Miolos 2-4: fundo soft, card manga, fonte 44 · Slide 5: cardClaro invertido, fonte 37
- CTA: fundo manga + card claro + selo grafite Ø176 + sub-card destaque manga

## 6. Story (live-rule 2026-07-16)
- 6 Stills extras `rede-lojas-N-story` 1080×1920 — mesmo conteúdo, layout redistribuído 9:16.

## 7. Validação + render
- [ ] `validador-marca`.
- [ ] Render lote: feed 6 + story 6.
- [ ] Compare visual com POST 243/251.
