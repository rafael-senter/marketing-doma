# Fontes oficiais Doma

Em `../../assets/fontes/` (sincronizadas pro host via `sync-components.sh`).

## TT Lakes (primária — display + corpo)

- Família geométrica, arredondada, "techy".
- Pesos disponíveis (verificar arquivos):
  - 400 Regular
  - 600 SemiBold (kicker)
  - 700 Bold (palavra-chave)
  - 800 Heavy (título grande)

### Uso por bloco
- **Título grande** (fontSize 78+): 700 Bold caixa alta OU baixa.
- **Subtítulo**: 400 Regular ou 700 Bold seletivo.
- **Corpo**: 400 Regular. SÓ palavra-chave em 700/800 bold.
- **Kicker** (legenda pequena): 600 SemiBold (NÃO 700 — fica pesada demais).
- **Logo**: assim como `LogoDoma` (PNG oficial), NÃO fonte.

## Kanit (secundária)

- Aproximação humanista da TT Lakes para o digital.
- Usar quando: fallback ou contexto requer fonte com mais legibilidade em foto.

## Configuração no Remotion

```ts
// theme.ts
export const brand = {
  fontes: {
    titulo: 'TT Lakes',    // primária
    corpo: 'TT Lakes',     // mesma
    alt: 'Kanit'
  }
};
```

Loaded via `loadFont()` de `@remotion/google-fonts` OU CSS `@font-face` em `public/fontes/`.

## Anti-padrões

- ❌ Fallback do sistema (Arial, Helvetica) — fonte fica errada.
- ❌ Corpo todo em bold ("tudo bold" anula contraste).
- ❌ Kicker em 700 (modelo usa 600).
- ❌ Aumentar `fontSize` quando largura não bate altura. Use `letterSpacing` (RULES §17).

## Medição de cap-height (RULES §17)

Pra ajustar `fontSize` corretamente:
1. Medir altura de uma maiúscula isolada no modelo (ex: "E" inicial).
2. `cap-height ≈ 0.7 × fontSize` (TT Lakes).
3. Se largura não bate mas altura sim → `letterSpacing` (não aumentar fontSize).

## TextoRico (markup)

Componente em `templates/components/_base/components.tsx`:
- `**bold**` → fontWeight 800
- `==highlight==` → background soft amber
- `//italic//` → fontStyle italic
- `\n` → quebra de linha forçada

Uso:
```tsx
<TextoRico style={{fontSize: 40, fontWeight: 400}}>
  {'Texto regular com **palavra-chave** em bold.\n\nNova linha com ==destaque==.'}
</TextoRico>
```
