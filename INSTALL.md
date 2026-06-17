# INSTALAÇÃO — passo-a-passo (sem precisar saber programar)

> Guia para quem **nunca usou terminal**. Siga em ordem; se travar, peça ajuda ao dev.

---

## Resumo do que vai acontecer

1. Instalar **Node.js** (única coisa manual — 1 minuto).
2. Rodar **2 comandos** no terminal. CLI cuida do resto (Claude Code, git, Python, plugin, tudo).
3. Pronto pra criar posts.

---

## 1. Instalar Node.js

### macOS

```bash
brew install node
```
*(se não tem Homebrew: https://brew.sh)*

Ou baixar instalador: https://nodejs.org → versão **LTS** → instalar com defaults.

### Linux (Ubuntu/Debian)

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo bash -
sudo apt install -y nodejs
```

### Windows

Baixar instalador: https://nodejs.org → versão **LTS** → next-next-finish.

### Verificar

Abrir terminal (PowerShell no Windows, Terminal no Mac/Linux):

```bash
node --version
```

Deve mostrar `v18.x.x` ou maior.

---

## 2. Instalar o plugin (2 comandos)

No mesmo terminal:

```bash
npm install -g marketing-doma-cli
marketing-doma install
```

`marketing-doma install` vai:

1. Detectar tudo que falta (Claude Code, git, bash via Git for Windows, Python).
2. Perguntar: **"Instalar automaticamente? [Y/n]"** — responda `y` (ou só enter).
3. Instalar tudo via `apt` / `brew` / `winget` conforme seu OS. Vai pedir senha de admin algumas vezes.
4. Baixar o plugin do GitHub e registrar no Claude Code.

### Conferir tudo

```bash
marketing-doma status
```

Mostra ✓ pra cada coisa instalada e versão.

---

## Windows: PowerShell ou CMD funcionam normal

**Você NÃO precisa abrir "Git Bash"** — abre PowerShell ou CMD direto. CLI usa `bash.exe` internamente (do Git for Windows, que ele mesmo instala via `winget install Git.Git`).

WSL2 também funciona se já tem instalado. Em PCs fracos (≤8 GB RAM), nativo é mais leve.

---

## 3. Rodar o setup do projeto Remotion (1× por pasta de trabalho)

Em **qualquer pasta** onde vai criar posts:

```bash
cd ~/minha-pasta-de-trabalho     # Linux/Mac
# ou no Windows PowerShell:
cd $env:USERPROFILE\Desktop\minha-pasta
```

⚠️ **Pasta SEM espaços** no nome (use `minha-pasta` em vez de `minha pasta`).

Abrir Claude Code:

```bash
claude
```

Dentro do Claude Code, digitar:

```
/marketing-doma:marketing-doma-setup
```

CLI vai:

1. Instalar Remotion (~600 MB de dependências, ~3 min na 1ª vez).
2. Criar venv Python com Pillow/numpy/scipy.
3. Configurar hook auto-start do studio Remotion.
4. Smoke test render pra validar.

Pronto.

---

## 4. Criar primeiro post

Dentro do Claude Code:

```
/marketing-doma
```

Responde perguntas em português:
1. Que tipo de post? (Dicas, SPIN, Doma Motiva, Inimigo em Comum, etc — 14 tipos).
2. Já tem o conteúdo, ou quer brainstorm?
3. Slide por slide: título, corpo, CTA.

CLI renderiza e mostra os PNGs em `remotion-doma/out/<id>.png`.

---

## 5. Atualizar quando sair versão nova

```bash
marketing-doma update
```

Sobrescreve com versão nova do GitHub, **preservando suas live-rules e planos**.

---

## 6. Enviar melhorias pro dev (export)

Quando o dev pedir, rode em qualquer pasta:

```bash
cd ~/Desktop     # ou onde quiser
marketing-doma export
```

Gera arquivo `marketing-doma-export-YYYY-MM-DD.tar.gz` na pasta atual. Pega esse arquivo e:
- Copia pro pendrive,
- Manda por WhatsApp/Email/Drive,
- Ou roda direto dentro da pasta do pendrive: `cd /caminho/pendrive && marketing-doma export`.

Dev pega, integra, publica nova versão. Cliente roda `marketing-doma update` pra receber.

---

## ❓ Problemas comuns

### "comando não encontrado: claude"

CLI deveria ter instalado. Se não:
```bash
marketing-doma install-deps
```

Ou manual: `curl -fsSL https://claude.ai/install.sh | sh`

### "comando não encontrado: marketing-doma"

`npm install -g` falhou ou PATH não foi atualizado. Reinicie o terminal. Se persistir:
```bash
npm install -g marketing-doma-cli --force
```

### "Cannot find module 'remotion'"

Rode `/marketing-doma:marketing-doma-setup` de novo na pasta do projeto.

### `min-release-age` bloqueando instalação

Se você tem `~/.npmrc` com `min-release-age=7` (proteção de segurança), versões muito novas do CLI são bloqueadas. Força:
```bash
npm install -g marketing-doma-cli --min-release-age=0
```

### Studio Remotion em branco em http://localhost:3010

Provável: pasta tem espaços no caminho. Renomeie e rode setup de novo.

### Render demora muito

Normal na 1ª vez (compila a fonte). Próximos renders ~5 s/slide.

---

## Modo dev (clone direto do GitHub)

Se você é **dev** e quer mexer no source:

```bash
git clone https://github.com/rafael-senter/marketing-doma.git ~/plugins/marketing-doma
cd ~/plugins/marketing-doma
bash install.sh
```

Edições no clone refletem instantaneamente (symlink no Claude Code global). Pra atualizar: `git pull` na pasta clonada.

Flags:
```bash
bash install.sh --dry-run    # mostra o que faria
bash install.sh --uninstall  # remove tudo
```

---

## 🆘 Suporte

Trave em qualquer passo → fale com o dev. Manda **prints do erro** + qual passo estava.
