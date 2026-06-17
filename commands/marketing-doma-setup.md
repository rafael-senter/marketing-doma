---
description: "Setup inicial do plugin marketing-doma — instala Remotion, deps Python (Pillow/numpy/scipy), cria hook auto-start do studio em .claude/settings.json LOCAL, valida ambiente e mostra checklist."
---

# `/marketing-doma-setup` — instalação inicial

Comando que prepara o ambiente para usar o plugin `marketing-doma`. Pode ser rodado em projeto novo OU em projeto existente (idempotente — verifica antes de instalar).

## O que faz

### 1. Verifica deps base
- `node --version` (≥ 20.x)
- `python3 --version` (≥ 3.10)
- `claude --version`
- Se faltar algo → mostrar mensagem clara para o usuário leigo e parar.

### 2. Instala Remotion (se ainda não está)
```bash
# Se projeto Remotion não existe:
if [ ! -d remotion-doma ]; then
  npx create-video@latest remotion-doma --template=blank
fi

# Garantir .npmrc local (override min-release-age global Shai-Hulud):
cat > remotion-doma/.npmrc <<'EOF'
min-release-age=0
EOF

# Instalar/atualizar deps:
cd remotion-doma
npm i --no-fund --no-audit
```

### 3. Cria venv Python para medições
```bash
if [ ! -d .venv-instagram ]; then
  python3 -m venv .venv-instagram
fi
.venv-instagram/bin/pip install --quiet Pillow numpy scipy
```

### 3.5. Sincroniza componentes plugin → host
```bash
bash .claude/plugins/marketing-doma/scripts/sync-components.sh
```
Copia (cp -u — idempotente):
- `templates/components/*/<Componente>.tsx` → `remotion-doma/src/v2/categorias/<cat>/`
- `templates/components/_base/{theme.ts, components.tsx}` → `remotion-doma/src/`
- `assets/oficial|icones|fontes/*` → `remotion-doma/public/`
- Garante `.npmrc` local com `min-release-age=0`.

⚠️ **Fonte de verdade é o PLUGIN.** Toda edição vai no plugin; sync propaga pro host. Editar direto no host = perde no próximo sync.

### 4. Cria/atualiza `.claude/settings.json` LOCAL com hook auto-start
> ⚠️ Local do projeto (`.claude/settings.json`), NÃO global (`~/.claude/settings.json`).

Conteúdo a mesclar/criar:
```json
{
  "hooks": {
    "SessionStart": [{
      "type": "command",
      "command": "bash .claude/plugins/marketing-doma/scripts/start-remotion.sh &"
    }]
  }
}
```

⚠️ Se `.claude/settings.json` já existe com outros hooks → MESCLAR (não sobrescrever). Mostrar diff antes de aplicar.

### 5. Validar (smoke test)
- Renderizar um still simples (`bash remotion-doma/render-still.sh padrao-frase-pilulas` — ou outra peça já existente).
- Conferir que `remotion-doma/out/<id>.png` foi criado.
- Conferir que studio sobe em http://localhost:3010.

### 6. Mostrar checklist final ao usuário
```
✅ Claude Code instalado
✅ Node.js v20.x
✅ Python 3.11
✅ Remotion 4.0.479
✅ Python venv (Pillow + numpy + scipy)
✅ Hook auto-start criado em .claude/settings.json
✅ Studio Remotion: http://localhost:3010
✅ Smoke test: <id>.png renderizado

🎉 Tudo pronto! Agora rode: /marketing-doma
```

## Erros comuns + tratamento

| Erro | Causa | Fix |
|---|---|---|
| `min-release-age` bloqueando | `~/.npmrc` global (Shai-Hulud) | Já criamos `.npmrc` local. Se persistir: avisar Patrick. |
| Porta 3010 ocupada | Studio já está rodando | OK, não é erro. |
| `command not found: claude` | PATH não atualizado | Pedir pra fechar/abrir terminal. |
| `pip install` falha | venv quebrado | `rm -rf .venv-instagram && python3 -m venv .venv-instagram` |

## Princípios
- **Idempotente**: rodar 2x não estraga nada.
- **Não-destrutivo**: nunca sobrescrever `.claude/settings.json` sem mostrar diff + confirmar.
- **Logs claros**: cada passo printar `[OK]`, `[SKIP]` ou `[INSTALL]` com cor.

## Invocação
```
/marketing-doma-setup
```

## Backend
Implementação principal: `scripts/install-deps.sh`. O comando aqui é a interface conversacional + orquestração.
