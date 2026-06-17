# INSTALAÇÃO — passo-a-passo para pessoa do marketing (sem precisar saber programar)

> Este guia é para quem **nunca usou terminal** ou **nunca rodou IA**. Siga em ordem; se travar em algum passo, peça ajuda ao dev/Patrick.

---

## ✅ O que você vai instalar

1. **Claude Code** — a IA da Anthropic (CLI no terminal).
2. **Node.js** — necessário pro Remotion (a "máquina" que gera as artes).
3. **Python 3** — pra medições automáticas (compare render vs modelo).
4. **O projeto Doma** — esse repositório, com o plugin já dentro.

Depois é só rodar 1 comando e estar pronto para criar posts.

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

## 4. Baixar o projeto Doma

```bash
mkdir -p ~/projetos-doma
cd ~/projetos-doma
git clone <URL-do-repositorio-que-o-patrick-mandar> patrick
cd patrick
```
*Se você não tem `git`, instale primeiro:*
- macOS: já vem.
- Linux: `sudo apt install -y git`
- Windows: https://git-scm.com

---

## 5. Instalar o plugin globalmente

Rode 1 vez (script idempotente — pode rodar de novo se reinstalar):
```bash
bash .claude/plugins/marketing-doma/scripts/install-globally.sh
```

O que faz:
- Cria symlink `~/.claude/plugins/marketing-doma` → este diretório do plugin.
- Registra em `~/.claude/plugins/known_marketplaces.json` e `installed_plugins.json`.

**Edições no plugin (em qualquer caminho) refletem em todos os projetos automaticamente** (symlink).

Reinicie o Claude Code (saia + entre):
```bash
exit
claude
```

Comandos `/marketing-doma`, `/marketing-doma-setup`, `/new-post`, etc. agora estão disponíveis.

## 6. Rodar o setup do projeto Remotion

No Claude Code, digite:
```
/marketing-doma-setup
```
A IA vai:
1. Instalar o Remotion automaticamente.
2. Instalar dependências do Python (Pillow, numpy, scipy).
3. Criar o **hook de auto-start** — toda vez que abrir o Claude no projeto, o studio do Remotion já liga sozinho.
4. Validar tudo e mostrar ✅ ou ❌.

Aguarde finalizar (pode levar 2-5 min na primeira vez).

---

## 6. Criar seu primeiro post

Dentro do Claude Code, digite:
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
- **Planos de cada post:** `doma-brand/PADROES/POST-<nome>-plano.md` (a IA cria)
- **Regras aprendidas:** `.claude/plugins/marketing-doma/knowledge-base/live-rules/` (a IA grava sozinha quando descobre algo novo)

---

## ❓ Problemas comuns

### "comando não encontrado: claude"
Feche e abra o terminal de novo. Se persistir: pergunte ao Patrick.

### "Cannot find module 'remotion'"
Rode `/marketing-doma-setup` de novo.

### "min-release-age" bloqueando instalação
Já está resolvido — tem `.npmrc` local no `remotion-doma/`. Se aparecer mesmo assim: avise o Patrick.

### Render demora muito
Normal na primeira vez (compila a fonte). Próximos renders são rápidos (~5 s/slide).

---

## 🆘 Suporte

Trave em qualquer passo → fale com o Patrick. Manda **prints do erro** + qual passo estava.
