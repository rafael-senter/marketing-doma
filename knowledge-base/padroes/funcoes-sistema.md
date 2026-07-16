# Padrão de Post — "Funções do Sistema" (Doma)

> ✅ **POST 127, 201, 207, 248, 266, 273 RECRIADOS (6/6)** — componente flexível
> `../../templates/components/funcoes-sistema/FuncoesSistema.tsx`.
> Modelos: `tipos-de-posts/.../Doma/Funções do sistema/POST *.png`.

Cards de feature do ERP. Canvas 1080×1350. Cores: manga `#F4BB35` · soft `#F7DC6B` ·
grafite `#202020` · branco `#FFF`.

## Pipeline (RULES §6)
- **Base fotorrealista** (mão+iPhone OU laptop com a TELA DO ERP) gerada via **nanobanana** a partir da
  tela do ERP extraída do modelo → `public/oficial/_func<NNN>-base.png`. Elemento 3D/device complexo NÃO
  se aproxima em código — gera via nanobanana ou extrai (RULES §6).
- **Overlays crispos no Remotion** por cima da base (texto sempre vetorial, nunca baked na imagem).

## Componente `FuncoesSistema` — slots opcionais (cada post acende só o que usa)
- `base` (path PNG fotorrealista) — obrigatório.
- `watermark?` — "DOMa" branca topo (full-width, CSS mask).
- `logoTopo?` / `logoRodape?` — logo DOMa grafite centralizado.
- `bigNumero?` `{texto,left,top,fontSize}` — número grande.
- `tituloTopo?` `{texto,left,top,width,fontSize,align}`.
- (+ corpo, balões, badge — ver props do componente).

## Reaproveitável
- **Componente de slots opcionais** = 1 layout flexível cobre 6 posts variando só os slots ligados
  (melhor que 6 componentes hard-coded).
- **Base nanobanana + overlays Remotion**: device/mockup 3D pela IA, texto sempre vetorial em cima
  (crispo, editável, sem franja). Ver [[funcoes-sistema-pipeline]] + [[nanobanana-gemini]] na memória.

## 🆕 MODELO func-inadimplencia (2026-07-16) — notebook + pergunta provocativa [APROVADO]
Aprovado pelo Patrick como MODELO reutilizável da categoria (par post + story). Props EXATAS abaixo — copiar e trocar só conteúdo/print.

### Comum aos dois formatos
- **Fundo**: manga `#F4BB35` liso (sem base full-bleed).
- **Watermark cor**: tom de branco fraco `#F6C554` (~18% branco sobre manga) — default `watermarkCor`. NUNCA escura, NUNCA branca 100%.
- **Título**: pergunta provocativa 2ª pessoa, bold só no fecho.
- **Imagem**: slot `imagem` com base notebook TRANSP (gerar via image-sourcer/nanobanana + recorte flood-fill; SEMPRE 2 versões amber+transp em `bases-nanobanana*/`).
- **Selo 14 anos**: `selo-14anos-4.png` (17: badge grafite+glifo branco) sobre fundo amber; `selo-14anos-1.png` (12: badge manga) APENAS sobre imagem/foto.
- **Logo rodapé**: wordmark grafite.

### POST 1080×1350 (`func-inadimplencia`)
```
watermark: true (horizontal topo), logoRodape: true (bottom 5% default)
tituloTopo: {top: '19%', width: '88%', align: 'center', fontSize: 54}
imagem:     {left: '5%', top: '32%', width: '90%'}
corpo:      {left: '6%', top: '83%', width: '62%', fontSize: 34}
selo:       {left: '75%', top: '81%', width: '17%'}
```

### STORY 1080×1920 (`func-inadimplencia-story`) — zonas seguras (padroes/instagram-zonas-seguras.md)
```
watermarkVertical: true (DO/Ma empilhada, top 3%, width 100% — encosta nas laterais, sem corte)
logoRodape: true, logoRodapeBottom: '14%'  (5% cairia na zona morta)
tituloTopo: {top: '16.5%', width: '88%', align: 'center', fontSize: 70}
imagem:     {left: '2%', top: '37%', width: '96%'}
corpo:      {left: '7%', top: '73.5%', width: '64%', fontSize: 40}
selo:       {left: '73%', top: '72%', width: '19%'}
```

- **Stills de referência** no Root.tsx do host. Renders aprovados: `out/func-inadimplencia.png` + `out/func-inadimplencia-story.png`.
- **Regra par post+story**: live-rule `2026-07-16-post-sempre-com-story.md`. Story NÃO é resize do post — redistribuir pelas zonas seguras.
