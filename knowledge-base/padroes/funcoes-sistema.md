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
