---
name: funcoes-sistema
description: Card de funcionalidade do ERP — mockup fotorrealista (mão + iPhone / laptop) com tela do ERP + overlays Remotion (título, balões, número, badge, watermark). Base gerada via nanobanana. Modelos POST 127/201/207/248/266/273. Use quando o usuário pedir "card de funcionalidade", "mockup do ERP", "feature do sistema".
---

# Funções do Sistema

**Componente:** `../../../../templates/components/funcoes-sistema/FuncoesSistema.tsx` (flexível com slots opcionais)
**Ficha:** `../../../../knowledge-base/padroes/funcoes-sistema.md`

## Padrão visual
- **Base fotorrealista** (mão + iPhone com tela do ERP, OU laptop com dashboard) gerada via **`scripts/nanobanana-generate.py`** (embutido no plugin; key no `.env` da raiz) a partir da tela do ERP extraída do modelo → salva em `public/oficial/_func<NNN>-base.png`. ⚠️ Tela de sistema: compor o screenshot ORIGINAL por cima com `scripts/compose-screen-mockup.py` (Gemini re-renderiza texto com typos — live-rule 2026-07-16).
- **Overlays Remotion** crispos por cima (texto SEMPRE vetorial, nunca baked na imagem):
  - `watermark` "DOMa" branca topo (CSS mask).
  - `logoTopo` / `logoRodape` (LogoDoma grafite).
  - `bigNumero` (estatística gigante).
  - `tituloTopo` (frase de funcionalidade).
  - `corpo`, `balões`, `badge`.

## Componente — slots opcionais
```ts
type Props = {
  base: string;                    // obrigatório
  watermark?: boolean;
  logoTopo?: boolean;
  logoRodape?: boolean;
  bigNumero?: {texto, left, top, fontSize};
  tituloTopo?: {texto, left, top, width, fontSize, align};
  // + corpo, balões, badge — ver props completas no componente
};
```

## Voz
- Explicativa direta: "Com a Doma, você...", "Em 3 cliques", "Sem planilha", "Tempo real".
- Vocabulário Doma: controle, completo, prático, ágil.

## Quando usar
- Lançar feature, evidenciar capacidade do produto.

## Anti-padrões
- ❌ Mockup 3D recriado em CSS pobre (sempre nanobanana ou imagem real).
- ❌ Texto baked na imagem (perde editabilidade + crispness).

## Próximos passos
1. Gerar base nanobanana com tela nova do ERP (`scripts/nanobanana-generate.py` + `scripts/compose-screen-mockup.py`).
2. Combinar com SPIN (slide CTA pode usar este padrão).
3. Variar device (celular ↔ laptop).
