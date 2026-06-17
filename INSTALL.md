# INSTALAÇÃO — passo-a-passo para pessoa do marketing (sem precisar saber programar)

> Este guia é para quem **nunca usou terminal** ou **nunca rodou IA**. Siga em ordem; se travar em algum passo, peça ajuda ao dev/Patrick.

---

## ✅ O que você vai instalar

1. **Claude Code** — a IA da Anthropic (CLI no terminal).
2. **Node.js** — necessário pro Remotion (a "máquina" que gera as artes).
3. **Python 3** — pra medições automáticas (compare render vs modelo).
4. **CLI `marketing-doma`** — instala o plugin no Claude Code com 1 comando.

Depois é só rodar `/marketing-doma-setup` em cada projeto e estar pronto para criar posts.

---

## 1. Instalar Claude Code

### macOS / Linux
1. Abra o **Terminal** (no Mac: Cmd+Espaço → "Terminal"; no Linux: já sabe).
2. Cole o comando:
   ```bash
   curl -fsSL https://claude.ai/install.sh | sh
   ```
3. Quando terminar, feche e abra o Terminal de novo.
4. Teste digitando:
   ```bash
   claude --version
   ```
   Deve aparecer um número (ex.: `1.0.x`).

### Windows
Siga as instruções em https://docs.claude.com/claude-code — tem versão para Windows também.

### Faça login
Rode:
```bash
claude
```
Vai abrir o navegador e pedir login na Anthropic. Faça login com a conta que o Patrick mandou.

---

## 2. Instalar Node.js (versão LTS)

### macOS
```bash
brew install node
```
*(se não tem Homebrew, instale primeiro: https://brew.sh)*

### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo bash -
sudo apt install -y nodejs
```

### Windows
Baixe o instalador em https://nodejs.org → versão **LTS**.

Teste:
```bash
node --version
```
Deve mostrar `v20.x.x` ou maior.

---

## 3. Instalar Python 3.10+

### macOS
```bash
brew install python@3.11
```

### Linux
```bash
sudo apt install -y python3 python3-venv python3-pip
```

### Windows
https://www.python.org/downloads/ → versão 3.11 ou maior. **Marque "Add to PATH"** na instalação.

Teste:
```bash
python3 --version
```

---

## 4. Instalar o plugin (via npm — 1 comando)

```bash
npm install -g marketing-doma-cli
marketing-doma install
```

O `marketing-doma install` baixa o plugin direto do GitHub/GitLab + registra automaticamente no Claude Code.

### Atualizar quando sair versão nova

```bash
marketing-doma update
```

### Ver versão instalada / status

```bash
marketing-doma status
```

### Outros comandos do CLI

| Comando | O que faz |
|---|---|
| `marketing-doma install` | Instala plugin pela 1ª vez. |
| `marketing-doma update` | Atualiza para última versão. |
| `marketing-doma status` | Mostra versão local + remota + saúde. |
| `marketing-doma uninstall` | Remove plugin (mantém CLI). |
| `marketing-doma help` | Ajuda. |

---

## 5. Rodar o setup do projeto Remotion (1× por pasta de trabalho)

Em **qualquer pasta** onde vai criar posts:

```bash
cd ~/minha-pasta-de-trabalho
claude
```

No Claude Code:
```
/marketing-doma:marketing-doma-setup
```

A IA vai:
1. Instalar o Remotion automaticamente.
2. Instalar dependências do Python (Pillow, numpy, scipy).
3. Criar o **hook de auto-start** — toda vez que abrir o Claude no projeto, o studio do Remotion já liga sozinho.
4. Validar tudo e mostrar ✅ ou ❌.

Aguarde finalizar (pode levar 2-5 min na primeira vez).

---

## 6. Criar seu primeiro post

Dentro do Claude Code:
```
/marketing-doma
```

A IA vai te perguntar:
1. **Que tipo de post?** (menu com 14 tipos — Dicas, SPIN, Doma Motiva, etc.)
2. **Você já tem o conteúdo, ou quer fazer brainstorm?**
3. **Cada slide** — título, corpo, CTA — ela pergunta um por um.
4. Renderiza e mostra os PNGs em `remotion-doma/out/`.
5. Pergunta se aprova ou se quer ajustar algo.

**Não precisa saber programação.** Você só responde perguntas em português.

---

## 7. Onde ficam os arquivos prontos

- **PNGs renderizados:** `remotion-doma/out/<id>.png`
- **Planos de cada post:** `templates/planos/POST-<nome>-plano.md` (a IA cria)
- **Regras aprendidas:** `knowledge-base/live-rules/` dentro do plugin (a IA grava sozinha quando descobre algo novo)

---

## ❓ Problemas comuns

### "comando não encontrado: claude"
Feche e abra o terminal de novo. Se persistir: pergunte ao Patrick.

### "comando não encontrado: marketing-doma"
O `npm install -g` falhou ou o PATH não foi atualizado. Reinicie o terminal. Se persistir:
```bash
npm install -g marketing-doma-cli --force
```

### "Cannot find module 'remotion'"
Rode `/marketing-doma-setup` de novo na pasta do projeto.

### `min-release-age` bloqueando instalação do CLI
Se você tem `~/.npmrc` com `min-release-age=7` (proteção Shai-Hulud), versões muito novas do CLI são bloqueadas. Força:
```bash
npm install -g marketing-doma-cli --min-release-age=0
```

### Render demora muito
Normal na primeira vez (compila a fonte). Próximos renders são rápidos (~5 s/slide).

---

## 🛠️ Modo dev (clone + install.sh)

Se você é **dev** e quer mexer no plugin (alterar componentes, regras, scripts), instale via clone direto:

```bash
git clone <URL-do-repositório> ~/plugins/marketing-doma
cd ~/plugins/marketing-doma
bash install.sh
```

O `install.sh`:
- Cria symlink `~/.claude/plugins/marketing-doma` → fonte clonada.
- Registra em `~/.claude/plugins/installed_plugins.json` + `known_marketplaces.json`.
- Habilita em `~/.claude/settings.json`.

Edições no clone refletem instantaneamente (symlink). Pra atualizar: `git pull` na pasta clonada.

Flags:
```bash
bash install.sh --dry-run    # mostra o que faria
bash install.sh --uninstall  # remove tudo
```

---

## 🆘 Suporte

Trave em qualquer passo → fale com o Patrick. Manda **prints do erro** + qual passo estava.
