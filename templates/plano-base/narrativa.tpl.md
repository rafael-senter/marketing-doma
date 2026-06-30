# Plano — POST {{NOME}}

> Categoria: narrativa (modelos POST 265 = foto+card; 272 = foto+moedas 3D rembg)
> Criado: {{DATA}}
> Componente: `templates/components/narrativa/Narrativa.tsx` ou `Narrativa272.tsx`

## 1. Sub-tipo
- [ ] **265** — foto + card amber translúcido + frase forte com bold em contraste.
- [ ] **272** — foto + objeto 3D (moedas/produto) extraído via rembg.

## 2. Conteúdo (265)
- **Foto**: `oficial/_<nome>-foto.jpg`
- **Frase principal**: "X cheio **e Y vazio?**" (estrutura contraintuitiva)

## 2. Conteúdo (272)
- Componente hard-coded (clonar pra variar objeto 3D).

## 3. Voz
- Provocativa contraintuitiva. Quebra de expectativa em 1 frase.

## 4. Props (265)
```ts
{foto: string; principal: string}
```

## 5. Validação + render
- [ ] `validador-marca`.
- [ ] `node remotion-doma/render-still.mjs {{NOME}}`.
