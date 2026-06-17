# Plano — POST {{NOME}}

> Categoria: funcoes-sistema (modelos POST 127/201/207/248/266/273)
> Criado: {{DATA}}
> Componente: `templates/components/funcoes-sistema/FuncoesSistema.tsx` (flexível com slots opcionais)

## 1. Funcionalidade do ERP a destacar
**Feature:** <ex: "Vender em 3 cliques no PDV">
**Vertical:** varejo / indústria / moda / pdv

## 2. Base nanobanana
- Gerar via `nanobanana-skill`:
  - Mão + iPhone com tela do ERP (PDV / dashboard / financeiro)
  - OU laptop 3D com a tela.
- Tela do ERP: extrair print real do sistema (pedir ao Patrick).
- Salvar em `remotion-doma/public/oficial/_func{{NOME}}-base.png`.

## 3. Overlays Remotion (ligar slots que usa)
- `watermark` (boolean) — "DOMa" branca topo.
- `logoTopo` / `logoRodape` — LogoDoma grafite.
- `bigNumero` — estatística gigante {texto, left, top, fontSize}.
- `tituloTopo` — frase de feature {texto, left, top, width, fontSize, align}.
- (+ corpo, balões, badge — ver props completas do componente).

## 4. Voz
- Explicativa direta. "Com a Doma, você...", "Em N cliques", "Tempo real".

## 5. Validação + render
- [ ] `validador-marca`.
- [ ] `bash remotion-doma/render-still.sh {{NOME}}`.
