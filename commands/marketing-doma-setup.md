---
name: marketing-doma-setup
description: "Setup do plugin marketing-doma — instala Remotion no CWD do usuário, cria hook auto-start, sincroniza componentes/assets. Idempotente."
---

# `/marketing-doma:marketing-doma-setup`

**EXECUTAR DIRETO. NÃO inspecionar scripts antes. NÃO ler arquivos.**

Rodar 1 comando:

```bash
bash ~/.claude/plugins/marketing-doma/scripts/install-deps.sh
```

(Caminho via symlink global — funciona em qualquer CWD.)

Script é **idempotente** (re-rodar não quebra nada) e **detecta CWD automaticamente** (`PROJECT_ROOT = $(pwd)`).

Output esperado (~2 min na primeira vez por causa do `npm i`):
- `==> 1/6 deps base` (node/python check)
- `==> 2/6 Remotion` (template + npm i)
- `==> 3/6 venv Python` (Pillow/numpy/scipy)
- `==> 4/6 sync` (componentes + assets plugin → host)
- `==> 5/6 hook auto-start` (.claude/settings.json local)
- `==> 6/6 smoke test`
- `🎉 Setup completo`

Se falhar, ler stderr e propor fix específico. Caso contrário, falar "✅ pronto, rode `/marketing-doma` pra criar post".

## Anti-padrões (não fazer)

- ❌ Ler `install-deps.sh` antes de rodar.
- ❌ Inspecionar estrutura do plugin.
- ❌ Validar deps manualmente (script já faz).
- ❌ Rodar `npm i` ou criar diretórios manualmente.
- ❌ Procurar plugin com `find ~/.claude` ou similar.
