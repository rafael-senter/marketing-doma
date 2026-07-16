---
name: efeito-3d-camadas
description: Efeito 3D "sanduíche" de camadas — sujeito da foto atravessa um objeto gráfico (cabeça por cima do bloco amarelo, moedas por cima do card, etc). Duplica a imagem-base, remove o fundo da duplicata, e empilha base → objeto gráfico → recorte sem fundo. Use quando a peça pedir profundidade/destaque 3D do sujeito, ou quando outra sub-skill quiser "pessoa saltando do card/faixa/bloco". NÃO é regra usar — é recurso opcional, sempre com decisão ESTRATÉGICA.
---

# Efeito 3D por camadas (sanduíche)

**Ideia:** o sujeito (cabeça, mão, produto, moedas) parece SAIR de dentro do objeto gráfico porque uma cópia SEM FUNDO dele é re-empilhada por cima do objeto.

```
z0  ─ imagem-base COMPLETA (foto/base nanobanana com fundo)
z1  ─ objeto gráfico (bloco amarelo, faixa, card, pílula, texto grande…)
z2  ─ DUPLICATA da imagem sem fundo, RECORTADA só na região que salta
      (alinhada 1:1 com a base → o resto fica invisível atrás do objeto)
z3+ ─ overlays normais (título, selo, logo, watermark…)
```

Exemplo real: foto do empresário na loja (z0) + faixa amarela no topo (z1) + cabeça dele sem fundo por cima da faixa (z2) → cabeça "fura" a faixa. Mesmo princípio do POST 272 (moedas 3D) e da técnica corpo+cabeça da memória do projeto.

## Pipeline (5 passos)

### 1. Obter imagem-base
- Foto real do catálogo (`assets/fotos/`) OU gerar via `subskills/image-sourcer` (nanobanana). Regras de persona/setor da image-sourcer valem.
- Se gerada: regra das 2 versões (amber + transp) continua obrigatória.

### 2. Duplicar + remover fundo da duplicata
- **rembg local** (rápido, ~0,7s): `python -c "from rembg import remove; ..."` — melhor p/ pessoa/objeto orgânico.
- **Fallback flood-fill** (fundo sólido): scipy `ndimage.label` a partir das bordas — melhor p/ fundo chapado (mesma técnica do recorte do notebook).
- NUNCA apagar o fundo "no olho"/retângulo — borda tem que ser o contorno real.

### 3. Recortar a REGIÃO que salta (decisão estratégica — ver §Estratégia)
- Crop da duplicata-sem-fundo APENAS na área que deve atravessar o objeto (ex.: da testa ao queixo + folga).
- Salvar como asset próprio: `assets/bases-nanobanana-transparente/_<peca>-salto-transp.png` (catalogar no `build-catalog.py`).

### 4. Empilhar no Remotion
- Componente da categoria usa slots em z-order: base (`zIndex 0`) → objeto (`zIndex 1-2`) → recorte (`zIndex 3`, MESMA posição/escala da base — left/top/width idênticos aos da base + offset do crop).
- Alinhamento é POR PIXEL: se o recorte desalinha 2px, o efeito quebra (fantasma duplo). Validar com render + zoom.

### 5. Render + validação
- `render-still.sh` (scale 2 → Lanczos) sempre.
- Checar: borda do recorte limpa (sem halo do fundo antigo), sombra coerente, objeto não decapita o sujeito em posição estranha.

## §Estratégia — quando usar (e quando NÃO)

USAR quando:
- O sujeito é o HERÓI da peça e precisa de profundidade (capa, story de impacto).
- O objeto gráfico cortaria o rosto/produto de forma feia — o salto resolve E vira recurso visual.
- Peça está "flat" demais e o conteúdo permite ousadia.

NÃO usar quando:
- A peça é informativa/densa (dashboards, carrossel de dados) — o efeito rouba atenção.
- O sujeito está pequeno na foto (< ~25% da altura) — salto imperceptível, só suja.
- O corte natural do sujeito não coincide com a borda do objeto (ex.: objeto no meio da testa) — reposicionar objeto ANTES de desistir.
- Já há 2+ elementos chamativos (número gigante + selo + balão) — limite de 1 truque por peça.

Regra de ouro: **o efeito serve à mensagem, não o contrário.** Se tirar o efeito e a peça não perder nada, tire.

## Interligação com outras sub-skills

- QUALQUER sub-skill de categoria (narrativa, doma-motiva, produtividade, funcoes-sistema, capa de carrossel…) pode invocar esta: ao montar o plano, se decidir pelo efeito, referenciar esta skill e seguir o pipeline.
- `image-sourcer` = passo 1 quando não há foto.
- `asset-ingester` = catalogar os recortes gerados (passo 3).
- Validação de marca continua com `validador-marca` (o efeito não altera regras de logo/cor/voz).
- No PLANO da peça (`templates/planos/POST-*.md`), registrar: por que o efeito foi escolhido + qual região salta + qual objeto é atravessado.

## Snippet de referência (recorte sem fundo com rembg + crop)

```python
from rembg import remove
from PIL import Image
im = Image.open('base.png')
sem_fundo = remove(im)                      # duplicata sem fundo
regiao = sem_fundo.crop((x1, y1, x2, y2))   # só a área que salta (ex.: cabeça + folga)
regiao.save('_<peca>-salto-transp.png')
# No Remotion: <Img> do recorte com left/top calculados = posição da base + (x1, y1) em %
```

Fallback sem rembg (fundo sólido): flood-fill de borda com scipy (ver `knowledge-base/padroes/funcoes-sistema.md`, recorte do notebook).
