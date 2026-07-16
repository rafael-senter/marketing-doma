# sync-components.sh — rodar SEMPRE da raiz do projeto host

**Data:** 2026-07-16
**Descoberto em:** POST rede-lojas
**Sintoma:** rodei `sync-components.sh` com CWD dentro de `remotion-doma/` → sync não aplicou (detector de projeto não achou o host) e os renders saíram com componente VELHO silenciosamente. Diagnóstico só veio ao grepar o componente do host e ver que a mudança não estava lá.
**Regra:** `bash .claude/plugins/marketing-doma/scripts/sync-components.sh` SEMPRE com CWD = raiz do projeto host. Após sync, validar: `grep <string-nova> remotion-doma/src/v2/categorias/<cat>/<Comp>.tsx` antes de renderizar.
**Aplicar em:** todo fluxo editar-componente → sync → render.
