# Live Rules — regras descobertas em runtime

Pasta de **auto-melhoria** do plugin. Toda vez que o Claude descobre um padrão novo durante uma sessão (cor errada detectada, voz ajustada, header desproporcional, watermark invertida, etc.), **grava aqui** ANTES de continuar.

## Formato

Um arquivo por regra:
```
YYYY-MM-DD-<topic-slug>.md
```

Exemplo: `2026-06-17-watermark-mais-escura.md`

## Estrutura do arquivo

```markdown
# <Título da regra>

**Data:** YYYY-MM-DD
**Descoberto em:** <peça/categoria — ex: gestao-financeira capa>
**Sintoma:** <o que estava errado>
**Medição:** <número/cor/posição medida — provar com pixel exato se possível>
**Regra nova:** <a regra que evita o erro no futuro>
**Aplicar em:** <quais categorias/componentes essa regra afeta>
**Status:** novo | promovido para RULES principais | obsoleto
```

## Workflow

1. Claude descobre erro/padrão em runtime.
2. Grava arquivo aqui na hora.
3. Atualiza ficha da categoria afetada em `../padroes/<categoria>.md`.
4. Periodicamente (semanal/mensal), dev revisa as live-rules e **promove** as estáveis para `../padroes/RULES-recriacao.md`, marcando como `promovido`.
5. Live-rules antigas e já promovidas podem ficar como histórico (com `Status: promovido`).

## Exemplos de regras live

Tipos de descoberta que viram live-rule:
- **Cor errada hard-coded** num componente (ex: watermark `#F5C24A` clara, deveria ser `#F2B02C` escura).
- **Voz julgadora** que escapou no copy ("X é luxo de quem não Y").
- **Faixa de navegação** com seta em peso errado.
- **Header desproporcional** quando o conteúdo é mais curto que o template.
- **Bullet** errado (`–` vs `›` por categoria).
- **Logo escrita em prosa** com case errado (`DOMa` em vez de `Doma` em frase corrida).
- **Quebra de linha** que não bate com o modelo (texto centrado).
- **Render scale 1** gerando franja.

## Quem grava
- **Claude** (automaticamente quando detectar).
- **Dev/Patrick** (manualmente quando achar regra nova durante revisão).
