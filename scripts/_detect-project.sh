#!/usr/bin/env bash
# _detect-project.sh — helper SOURCEABLE. Detecta PROJECT_ROOT.
#
# Regra: PROJECT_ROOT = CWD do usuário (onde ele tá rodando o comando).
# Sem subir cadeia, sem assumir estrutura projetos-doma/patrick. Direto.
#
# Overrides (ordem):
#   1. $MARKETING_DOMA_PROJECT env var.
#   2. --project /path argumento.
#   3. CWD (default).
#
# install-deps.sh CRIA remotion-doma/ se não existir no CWD (não exige projeto pré).

detect_project_root() {
  # 1. ENV
  if [ -n "${MARKETING_DOMA_PROJECT:-}" ] && [ -d "$MARKETING_DOMA_PROJECT" ]; then
    PROJECT_ROOT="$MARKETING_DOMA_PROJECT"
    HOST_REMOTION="$PROJECT_ROOT/remotion-doma"
    return 0
  fi

  # 2. --project flag
  local prev=""
  for arg in "$@"; do
    if [ "$prev" = "--project" ] && [ -d "$arg" ]; then
      PROJECT_ROOT="$(cd "$arg" && pwd)"
      HOST_REMOTION="$PROJECT_ROOT/remotion-doma"
      return 0
    fi
    prev="$arg"
  done

  # 3. CWD direto (default)
  PROJECT_ROOT="$(pwd)"
  HOST_REMOTION="$PROJECT_ROOT/remotion-doma"
  return 0
}

# Verifica se host Remotion está montado. Usar em scripts que dependem dele
# (sync, render, compare). install-deps pode CRIAR o host, então não checa.
require_host_remotion() {
  if [ ! -d "$HOST_REMOTION" ]; then
    cat >&2 <<EOF
[ERRO] remotion-doma/ não existe em $PROJECT_ROOT.

Rode primeiro o setup para criar:
  /marketing-doma:marketing-doma-setup

OU manualmente:
  bash <plugin>/scripts/install-deps.sh
EOF
    return 1
  fi
  return 0
}
