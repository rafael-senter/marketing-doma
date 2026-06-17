---
name: doma-institucional
description: Cards institucionais da marca — 2 sub-tipos. (a) Tipográficos code-only (frame grafite + ícone SVG, sem device) — POST 178/271. (b) Com base nanobanana (phone+menu, notas R$) — POST 115/257. Use quando o usuário pedir "card institucional", "manifesto Doma", "post de marca", "tipográfico".
---

# Doma Institucional

**Componente:** `../../../../templates/components/doma-institucional/DomaInstitucional.tsx`
**Variantes:** `Doma178`, `Doma271`, `Doma115`, `Doma257`
**Ficha:** `../../../../knowledge-base/padroes/doma-institucional.md`

## Sub-tipos

### Tipográficos code-only (178/271)
- Frame grafite L20-78% T18-82%.
- Ícone branco em balão (SVG "gráfico subindo" — barras grafite + seta manga).
- Texto puro vetorial.
- **Sem device, sem foto, sem nanobanana.**

### Com base nanobanana (115/257)
- Base fotorrealista (phone+menu OU notas R$) — mesmo pipeline de `funcoes-sistema`.
- Overlays Remotion por cima.

## Voz
- **Institucional manifesto.** "Domine seu negócio", "A gente pega junto", "Conte com a gente".
- Bordões oficiais (ver `knowledge-base/identidade/voz-sigadoma.md` — banco completo).

## Quando usar
- Aniversário da marca, virada de ano, lançamento, conquista institucional.

## Anti-padrões
- ❌ Misturar tipográfico com foto (escolher um sub-tipo).
- ❌ Watermark cinza (institucional usa `#EAAD32` mais visível).

## Próximos passos
1. Carrossel manifesto (5 cards tipográficos sequenciais).
2. Combinar com `mapa-clientes` (institucional + prova).
