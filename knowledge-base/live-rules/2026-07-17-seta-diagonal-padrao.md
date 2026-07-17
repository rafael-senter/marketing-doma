# Seta diagonal ↘ PADRÃO (SetaDoma) — transversal a todas as categorias

**Data:** 2026-07-17
**Descoberto em:** inimigo-em-comum (post `inimigo-crescimento`)
**Sintoma:** cada categoria desenhava sua própria seta ↘ (colchete reto, arredondada, etc.) — inconsistente.
**Regra:** existe UMA seta oficial Doma. Componente compartilhado `SetaDoma` em `templates/components/_base/components.tsx`. TODO post que usar flecha DIRECIONAL (↘ em badge) reusa esse componente — nunca redesenhar à mão.

## Geometria oficial (aprovada Patrick, iterada por print + medição pixel)
- viewBox `0 0 100 100`, traço `strokeWidth 13`.
- Arestas: `strokeLinecap="butt"` (pontas RETAS, não arredondadas) + `strokeLinejoin="miter"` `strokeMiterlimit="10"` (ponta PONTUDA, bico).
- **ORDEM DE DESENHO IMPORTA**: haste PRIMEIRO (fica atrás), riscas laterais DEPOIS (por cima). Assim a cabeça cobre a ponta da haste — sem "nó"/furo pra frente.
- Haste central reta: `M22 22 L76 76` (tip em 76, NÃO 78 — encaixa no "V" e tuck sob a cabeça).
- Riscas laterais curvas compridas: `M24 78 Q53 72 78 78 Q72 53 78 24` (convergem na ponta 78,78; côncavas).
- Props: `cor` (default `#fff`), `size` (default 74).
- Medição de validação: ink no viewBox x[17.6,85.1] y[17.6,85.1] (simétrico no eixo diagonal = centrado).

## Uso
```tsx
import {SetaDoma} from '../../../components';
<SetaDoma />                       // branca, badge escuro (inimigo-em-comum)
<SetaDoma cor={C.grafite} size={96} />  // grafite, badge claro/soft (doma-institucional 271)
```

**Aplicar em:** inimigo-em-comum ✅, doma-institucional ✅. Qualquer categoria nova/existente com flecha direcional ↘.
**NÃO se aplica a:** flechas de navegação horizontais "ARRASTA PRO LADO →" (spin/carrosséis — elemento diferente) e ícones de gráfico/crescimento (barras + seta subindo — outro desenho).
