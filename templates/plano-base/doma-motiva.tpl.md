# Plano — POST {{NOME}}

> Categoria: doma-motiva (modelos POST 242/250)
> Criado: {{DATA}}
> Componente: `templates/components/doma-motiva/DomaMotiva.tsx`

## 1. Conteúdo
- **Foto** (do banco da Doma OU stock): `oficial/_<nome>-foto.jpg`
- **Blocos** (frases motivacionais com bold seletivo): array de strings
- **Posição do card** (left/top/width/height %): medir do modelo de referência
- **Selo**: canto `sup-dir` ou `inf-dir`
- **Watermark**: `topo` ou `base`

## 2. Cores
- Fundo amber (parte do canvas SEM foto) ou foto full-bleed.
- Card soft `#F8DD6B`.

## 3. Voz
- Motivacional com pés no chão. "Desafios existem pra crescer", "Mente forte enxerga oportunidades".
- ❌ Utopia, ❌ promessa atalho.

## 4. Props
```ts
{
  foto: string;
  blocos: string[];           // cada string = 1 frase
  card: {left, top, width, height};
  seloCanto: 'sup-dir' | 'inf-dir';
  watermark: 'topo' | 'base';
}
```

## 5. Validação + render
- [ ] `validador-marca`.
- [ ] `node remotion-doma/render-still.mjs {{NOME}}`.
