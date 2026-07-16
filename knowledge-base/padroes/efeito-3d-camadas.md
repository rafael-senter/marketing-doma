# Efeito 3D por camadas (sanduíche) — padrão transversal

> Recurso OPCIONAL, disponível pra qualquer categoria. Skill: `subskills/efeito-3d-camadas`. Criado 2026-07-16 a pedido do Patrick (exemplo: cabeça do empresário por cima do bloco amarelo).

## Resumo da técnica
1. Imagem-base completa (foto real ou gerada via image-sourcer/nanobanana).
2. Objeto gráfico por cima (bloco, faixa, card, texto).
3. Duplicata da base SEM FUNDO (rembg local; fallback flood-fill scipy p/ fundo sólido), recortada só na região que "salta", empilhada por cima do objeto — alinhada por pixel com a base.
4. Overlays normais acima.

## Z-order canônico
`z0 base → z1-2 objeto gráfico → z3 recorte-salto → z4+ título/selo/logo`

## Regras
- NÃO é regra usar — decisão ESTRATÉGICA por peça (herói em destaque sim; peça densa/informativa não; sujeito pequeno não; máx. 1 truque visual por peça).
- Recorte-salto vira asset catalogado: `bases-nanobanana-transparente/_<peca>-salto-transp.png` (via asset-ingester/build-catalog).
- Alinhamento por pixel — desalinhou = fantasma duplo, refaz.
- Registrar no plano da peça: por quê, qual região salta, qual objeto atravessa.
- Precedentes no projeto: POST 272 (moedas 3D), técnica corpo+cabeça (memória doma-efeito-3d-pessoa).


## 🆕 Regra de decisão (2026-07-16, POST motiva-controla)
- **Avaliar caso a caso ANTES de criar**: usar 3D só quando a composição da foto tem elemento (cabeça/objeto) que invade NATURALMENTE a área do card/bloco. Sem essa interação → peça SEM 3D. Não é regra usar sempre.
- Implementação de referência: prop `recorte3d {src,left,top,width}` no `DomaMotiva.tsx` (camada zIndex 5 acima do card).
- rembg: usar API python do `.venv-instagram` (`from rembg import remove`) — o CLI global quebra (gradio ausente).
- Pré-compor a foto no canvas exato (PIL cover crop) ANTES do rembg/crop — assim as coords do recorte = coords do canvas e a emenda fica invisível.
- Story tem coords próprias (cover corta diferente) — gerar base + recorte separados por formato.
