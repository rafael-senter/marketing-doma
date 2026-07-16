# Persona em imagens — regras obrigatórias

> Definido por Patrick (2026-07-16). Vale pra TODA imagem de pessoa usada em peça Doma — buscada na internet OU gerada via nanobanana.

## Quem é a pessoa na imagem

A pessoa deve **aparentar ser o dono/dona (ou funcionário-chave) do negócio da empresa CLIENTE da Doma**, coerente com o setor retratado (lista completa em `setores-atendidos.md`).

### Regras fixas
1. **Idade aparente: 30-50 anos** (público-alvo Doma).
2. **Executivo(a) bem cuidado(a)**: camisa social (ou vestimenta profissional do setor), aparência cuidada, postura de quem comanda o negócio.
3. **Coerência com o setor**: a pessoa deve "parecer do ramo".
   - Loja de roupas → pessoa que aparenta ser lojista de moda (camisa social, ambiente de loja, araras/provador ao fundo se houver cenário).
   - Metalúrgica → funcionário cortando metal **usando EPIs corretamente** (óculos, luvas, protetor auricular, avental — todos os EPIs devidos).
   - Ótica → pessoa atendendo/ajustando óculos em balcão de ótica.
   - Mercado → dono no corredor/caixa, uniforme limpo.
4. **Ação com propósito**: a pessoa está FAZENDO algo com objetivo claro (atendendo, conferindo estoque, operando máquina, analisando relatório) — nunca pose genérica de banco de imagem "sorrindo pro nada".
5. **Diversidade natural**: alternar gênero/etnia entre peças; não repetir sempre o mesmo perfil.

### Setor industrial — EPIs obrigatórios
Em qualquer cena de indústria/produção, EPIs corretos e completos para a atividade retratada. Errar EPI = peça reprovada (público B2B percebe).

## Pipeline de obtenção (sub-skill `image-sourcer`)

1. **Catálogo primeiro**: checar `assets/fotos/` + `assets/bases-nanobanana*/` via `CATALOGO.json` — reusar se já existe base adequada.
2. **Buscar na internet**: fontes com licença livre (Unsplash, Pexels, Pixabay). Validar licença antes de usar. Imagem deve passar nas regras de persona acima.
3. **Fallback nanobanana**: se não encontrar, GERAR via `nanobanana-skill` (Gemini) — prompt deve descrever setor + regras de persona + ação com propósito. Pode gerar pessoa **sem fundo** direto no prompt, ou remover com `rembg`.

## 2 versões obrigatórias (regra existente do plugin)

Toda imagem final (buscada ou gerada):
- **(a)** fundo amarelo manga `#F4BB35` → `assets/bases-nanobanana/_X-base.png`
- **(b)** transparente → `assets/bases-nanobanana-transparente/_X-base-transp.png` (via `rembg`)
- Catalogar ambas em `scripts/build-catalog.py` + sync pro host.

## Anti-padrões

- ❌ Pessoa jovem demais (<30 aparente) ou aposentada (>50 aparente).
- ❌ Stock photo genérica: terno de executivo de banco pra dono de pet shop.
- ❌ Industrial sem EPI ou com EPI incompleto/errado.
- ❌ Pose sem contexto (sorrindo pra câmera sem ação).
- ❌ Usar imagem da internet sem verificar licença.
- ❌ Salvar só 1 versão (sempre amber + transparente).
