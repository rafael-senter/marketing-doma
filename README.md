# marketing-doma

Plugin do Marketing da Doma para [Claude Code](https://claude.com/claude-code) — geração de posts, carrosséis e stories no Remotion seguindo o **design system real** da marca, **voz institucional @sigadoma** e **regras de marca** rigorosas (logo DOMa, watermark tom-sobre-tom medida, paleta amber, TT Lakes).

## O que esse plugin faz

- **Skill master `/marketing-doma`** — fluxo guiado passo-a-passo: leigo em Claude Code escolhe tipo de post, dá conteúdo (ou pede brainstorm), o plugin monta o plano medido, renderiza, audita vs modelo, e ajuda a publicar.
- **14 sub-skills** — uma por tipo de post (Dicas, SPIN, Doma Motiva, Inimigo em Comum, Funções do Sistema, Carrossel de Clientes, etc.) + brand-rules + protocolo de post novo.
- **4 agentes especialistas** — ghostwriter (voz Doma), validador de marca, editor de conteúdo, render orchestrator.
- **Templates Remotion validados** — componentes `.tsx` prontos, copiados dos validados em produção.
- **Auto-melhoria** — toda regra/padrão novo descoberto em runtime vira arquivo em `knowledge-base/live-rules/`.
- **Setup automático** — `/marketing-doma-setup` instala Remotion + deps + hook auto-start do studio.

## Instalação (via npm)

```bash
# 1× só — instala o CLI global:
npm install -g marketing-doma-cli

# Instala o plugin (verifica + instala deps faltantes + clone GitHub + registra no Claude Code):
marketing-doma install

# Atualizar quando sair versão nova:
marketing-doma update

# Status (versões + pré-requisitos):
marketing-doma status

# Exportar edições/melhorias pro dev (tarball pra pendrive):
marketing-doma export
```

**Windows**: rode no **PowerShell** ou **CMD** normal. CLI cuida do resto (instala Git for Windows internamente se faltar, usa bash.exe sem você precisar abrir terminal diferente).

## Como usar `marketing-doma export` (enviar melhorias pro dev)

Quando o cliente (marketing) usa o plugin, gera melhorias em runtime: live-rules novas, planos de posts, edits em componentes, fotos novas de clientes. **Essas melhorias ficam só na máquina do cliente** — pra integrar de volta ao GitHub, o dev precisa exportá-las.

### No computador do cliente

Abrir terminal **em qualquer pasta** (ex: Desktop ou Downloads) e rodar:

```bash
marketing-doma export
```

CLI gera um arquivo `marketing-doma-export-YYYY-MM-DD.tar.gz` **na pasta onde você está no terminal** (o "current working directory").

Exemplo Windows (PowerShell):
```powershell
cd $env:USERPROFILE\Desktop
marketing-doma export
# Arquivo criado em C:\Users\<seu-user>\Desktop\marketing-doma-export-...tar.gz
```

Exemplo Linux/macOS:
```bash
cd ~/Desktop
marketing-doma export
# Arquivo criado em ~/Desktop/marketing-doma-export-...tar.gz
```

### Levar pro dev

Opção A — pendrive:
1. Plugar pendrive.
2. **Copiar** o `marketing-doma-export-*.tar.gz` da Desktop pro pendrive (arrastando no explorer normal).
3. Levar pro dev.

Opção B — direto no pendrive (pula a etapa de copiar):
```bash
# Linux/macOS:
cd /media/usuario/PENDRIVE
marketing-doma export

# Windows:
cd E:\         # ou letra do pendrive
marketing-doma export
```

CLI gera o tarball direto no pendrive.

Opção C — sem pendrive, via WhatsApp/Email/Drive:
- Tarball costuma ser pequeno (poucos KB a MBs). Manda anexado.

### No computador do dev (você)

```bash
cd /home/rafael/projetos/projetos-doma/patrick/.claude/plugins/marketing-doma
tar -xzf ~/Downloads/marketing-doma-export-XXX.tar.gz
git status   # ver o que o cliente mudou
# revisar + integrar + commit + git push origin main vX.Y.Z
```

Depois o cliente roda `marketing-doma update` pra receber a versão revisada.

## Pré-requisitos

| Item | Versão mínima | Verifica |
|---|---|---|
| **Claude Code CLI** | qualquer atual | `claude --version` |
| **Node.js** | 18 LTS (recomendado 20+) | `node --version` |
| **npm** | 9+ | `npm --version` |
| **Python** | 3.10 (recomendado 3.11+) | `python3 --version` |
| **git** | 2.30+ | `git --version` |
| **bash** | 4+ | `bash --version` |

**Sistema**: Linux / macOS / Windows nativo (PowerShell, CMD, ou Git Bash — CLI usa internamente o `bash.exe` do Git for Windows, instalado automaticamente se faltar).
**Disco por projeto**: ~800 MB (plugin ~30 MB + Remotion `node_modules` ~600 MB + venv Python ~150 MB).
**⚠️ Path do projeto SEM espaços**: webpack do Remotion quebra com espaços no caminho. Use `meu-projeto/` em vez de `meu projeto/`. Setup bloqueia com mensagem clara se detectar.

### Instalação — 1 instrução, qualquer OS

```bash
npm install -g marketing-doma-cli
marketing-doma install
```

Pronto. `marketing-doma install` detecta o que falta, pergunta confirmação, e instala via `apt` / `dnf` / `pacman` / `brew` / `winget` conforme o OS. Vai pedir senha de admin (sudo no Linux/mac, UAC no Windows).

**Único passo manual** (1×): ter **Node.js** instalado pra ter o `npm` (que vai instalar o CLI). Resto o CLI cuida.

- Linux Ubuntu/Debian: `curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo bash - && sudo apt install -y nodejs`
- macOS: `brew install node` (ou baixar de https://nodejs.org)
- Windows: baixar instalador de https://nodejs.org → versão LTS → next-next-finish

### Windows: PowerShell funciona normal

Abra **PowerShell** ou **CMD** e rode os comandos. CLI detecta que falta bash (vem com Git for Windows) e instala via `winget install Git.Git` automaticamente. **Não precisa abrir Git Bash** — CLI usa o `bash.exe` direto do path interno do Git for Windows.

### Conferir o que está instalado

```bash
marketing-doma status
```

Mostra todas as versões + o que falta. Útil pra debugar se algo der errado.

Detalhes passo-a-passo em [INSTALL.md](INSTALL.md).

## Uso

Em **qualquer pasta** que vai criar posts:

```bash
cd ~/minha-pasta-de-trabalho
claude
```

No Claude Code:

```
/marketing-doma:marketing-doma-setup   # 1ª vez no projeto — instala Remotion + venv
/marketing-doma                         # cria peça nova (fluxo guiado)
```

## Comandos disponíveis

| Comando | Função |
|---|---|
| `/marketing-doma` | Fluxo guiado — escolher tipo, conteúdo, renderizar |
| `/marketing-doma-setup` | Instalar dependências + criar hook auto-start |
| `/new-post` | Atalho: criar post novo (sem fluxo guiado) |
| `/new-carrossel` | Atalho: criar carrossel novo |
| `/brainstorm` | Pauta + 3 ângulos na voz Doma |
| `/render` | Renderizar 1 ou N stills |
| `/audit-post` | Comparar render vs modelo |
| `/publish-checklist` | Check-list final pré-publicar |

## Documentação

- **[INSTALL.md](INSTALL.md)** — instalação passo-a-passo + pré-requisitos + modo dev (clone manual).
- **[SETUP.md](SETUP.md)** — setup técnico (dev).
- **[CLAUDE.md](CLAUDE.md)** — regras de marca + protocolo + auto-melhoria.
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — diagrama de fluxo completo + camadas.
- **[knowledge-base/](knowledge-base/)** — voz Doma + design system + RULES + 17 fichas + asset-index + live-rules.
- **[cli/README.md](cli/README.md)** — referência do CLI Node.js.

## Para quem é

- **Pessoa de marketing leiga em Claude Code** → usa só comandos `/marketing-doma` e `/marketing-doma-setup`.
- **Patrick / dev** → mantém e evolui sub-skills, regras e templates.

## Para o dev (release futuro)

Existem **2 camadas versionáveis** independentes:

| O que mudou | Comando | Quem propaga |
|---|---|---|
| **Plugin** (`templates/`, `knowledge-base/`, `agents/`, `commands/`, `skills/`, `assets/`, `scripts/`) | bump em `plugin.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` + commit + `git push origin main vX.Y.Z` | Equipe roda `marketing-doma update` → `git pull` puxa. **Não republicar npm.** |
| **CLI** (`cli/bin/marketing-doma.js`, `cli/package.json`, `cli/README.md`) | bump em `cli/package.json` + commit + `git push` + `bash scripts/publish-cli.sh` | Equipe roda `npm install -g marketing-doma-cli@latest` (raro). |

### Atalho pra release de plugin (mais comum)

```bash
cd ~/.local/share/marketing-doma   # ou pasta clonada
# editar arquivos
sed -i 's/"version": "0.1.X"/"version": "0.1.Y"/g' plugin.json .claude-plugin/plugin.json .claude-plugin/marketplace.json
bash scripts/check-all.sh
git add -A
git commit -m "feat(v0.1.Y): <mudanças>"
git tag -a v0.1.Y -m "Release v0.1.Y"
git push origin main v0.1.Y
```

Pronto. Equipe roda `marketing-doma update` e tem v0.1.Y.

### Atalho pra release de CLI (raro)

Quando mudar `cli/bin/marketing-doma.js` (lógica de install/update/status):

```bash
cd ~/.local/share/marketing-doma
# editar cli/
sed -i 's/"version": "0.1.X"/"version": "0.1.Y"/g' cli/package.json
git add -A && git commit -m "feat(cli v0.1.Y): <mudanças>" && git tag v0.1.Y && git push origin main v0.1.Y
bash scripts/publish-cli.sh    # publica no npm (requer NPM token granular com Bypass 2FA)
```

Detalhes em [cli/README.md](cli/README.md). Token npm em `.env` do projeto host (`npm_key="npm_..."`).

## Visão estrutural

```
.claude/plugins/marketing-doma/
├── plugin.json                   manifest
├── CLAUDE.md                     regras + auto-melhoria
├── cli/                          CLI Node.js (publicado no npm)
├── commands/                     slash commands
├── agents/                       subagentes
├── skills/marketing-doma/        master + 15 subskills
├── scripts/                      utilitários bash
├── templates/                    components .tsx + planos .md
├── knowledge-base/               voz/design/padroes/live-rules
└── assets/                       logos, ícones, fontes
```

## Licença

MIT.
