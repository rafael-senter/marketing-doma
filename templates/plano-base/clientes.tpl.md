# Plano — POST {{NOME}}

> Categoria: clientes (modelo LAYOUT CLIENTE NOVO)
> Criado: {{DATA}}
> Componente: `templates/components/clientes/Clientes.tsx`

## 1. Conteúdo
- **Foto** da loja do cliente: `oficial/_<nome>-loja.jpg` (JPG full-bleed, recorte da fachada/vitrine).
- **Nome** do cliente: "<Nome>"
- **Cidade/UF**: "<Cidade>/<UF>"

## 2. Cores
- Fundo manga + watermark "DOMa" outline (2 CSS masks, RULES §18).
- Pílula localização: grafite + pin SVG branco.

## 3. Voz
- Acolhedora factual. "A <Nome> agora faz parte do time de clientes da DOMa."

## 4. Props
```ts
{foto: string; nome: string; cidade: string}
```

## 5. Asset da foto
- Recortar da foto enviada pelo cliente.
- Salvar em `remotion-doma/public/oficial/_<nome>-loja.jpg` (qualidade ≥ 90%).

## 6. Validação + render
- [ ] `validador-marca`.
- [ ] `node remotion-doma/render-still.mjs {{NOME}}`.
- [ ] Compare com `padrao-clientes`.
