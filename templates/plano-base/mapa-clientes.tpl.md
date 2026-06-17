# Plano — POST {{NOME}}

> Categoria: mapa-clientes (modelo DSdIG_FkuI4_2)
> Criado: {{DATA}}
> Componente: `templates/components/mapa-de-clientes/MapaClientes.tsx`

## 1. Conteúdo
- **% de clientes** (selo): X%
- **Texto do selo**: "+ X% DE CLIENTES"
- **Legenda abaixo** (institucional): "<frase>"

## 2. Cores
- Fundo amber `#F4BB35` + watermark sutil.
- Card branco com mapa.
- Estados soft `#F8DD6B`, DF cinza.

## 3. Mapa SVG
- 27 estados via `@svg-maps/brazil` (paths em `mapaBrasil.ts`).
- Rótulos: PE/AL/ES/RJ deslocados FORA do contorno (medir do modelo).
- Cap-height + letterSpacing separados (RULES §17).

## 4. Voz
- Institucional, prova social. Sem julgar. Sem comparar concorrente.

## 5. Validação + render
- [ ] `validador-marca`.
- [ ] `bash remotion-doma/render-still.sh {{NOME}}`.
- [ ] Compare com `padrao-mapa-clientes` (referência).
