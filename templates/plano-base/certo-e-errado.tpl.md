# Plano — POST {{NOME}}

> Categoria: certo-e-errado (modelos POST 247/256)
> Criado: {{DATA}}
> Componente: `templates/components/certo-e-errado/CertoErrado.tsx`

## 1. Conteúdo
- **Errado** (clichê do empresário): "<frase>" (markdown `**bold**` permitido)
- **Certo** (mindset Doma): "<frase>"

## 2. Cores (medir)
- Fundo manga + watermark vertical "DO/MA".
- Badge X (errado): grafite ou vermelho — medir no modelo.
- Badge ✓ (certo): grafite ou verde.
- Long-shadow: cópias deslocadas 45°, opacity no grupo (RULES §16).

## 3. Voz
- Provocativa. Erro = clichê comum. Certo = forma Doma de fazer.

## 4. Props
```ts
{errado: string; certo: string}  // ** suportado
```

## 5. Validação + render
- [ ] `validador-marca`.
- [ ] `node remotion-doma/render-still.mjs {{NOME}}`.
- [ ] Compare com POST 247 ou 256.
