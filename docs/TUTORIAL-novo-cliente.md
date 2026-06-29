# Tutorial — adicionar cliente novo (passo-a-passo p/ marketing leigo em Claude Code)

> 5 minutos. 1 comando final. Sem mexer em código.

## 0. Pré-requisitos (1 vez)
- Claude Code instalado.
- Plugin `marketing-doma` configurado (rodou `/marketing-doma-setup`).
- Estar dentro do diretório do projeto Doma.

## 1. Receba o material do cliente
- **Logo** (PNG transparente preferido, OU JPG, OU SVG).
- **Nome real** do cliente (ex: "Rentauto Aluguel de Carros").
- **Cidade/UF** (ex: "Curitiba/PR").
- **Cor da marca** do cliente (hex — `#FF6B35`, OU nome — "laranja vibrante" → procurar hex).

Salve o logo em algum lugar fácil. Ex: `~/Downloads/rentauto-logo.png`.

## 2. Abrir Claude Code no projeto
```bash
cd ~/projetos-doma/patrick
claude
```

## 3. Rodar o wizard
Cole no Claude Code:
```
! python .claude/skills/marketing-doma/scripts/wizard-cliente.py \
    --logo ~/Downloads/rentauto-logo.png \
    --nome rentauto \
    --cidade "Curitiba/PR" \
    --cor "#FF6B35"
```

(O `!` no início roda direto no terminal sem precisar abrir outro.)

**Slug** (`--nome`): kebab-case sem espaço/acento. "Rentauto Aluguel" → `rentauto-aluguel`.

## 4. Wizard executa automaticamente:
1. Gera `assets/cards-clientes/_205-card_rentauto.png` (1080×600, bg laranja, logo centralizado, cantos arredondados).
2. Mostra o **snippet de Still** pronto pra colar no carrossel.
3. Mostra próximos passos.

## 5. Conferir visualmente
Abrir o arquivo gerado:
```
~/projetos-doma/patrick/.claude/skills/marketing-doma/assets/cards-clientes/_205-card_rentauto.png
```

Se ficou bom → segue. Se não → recomeça com cor ou padding ajustado.

## 6. Catalogar + sync
```
! python .claude/skills/marketing-doma/scripts/build-catalog.py
! bash .claude/skills/marketing-doma/scripts/sync-components.sh
```

Cada um leva ~5 segundos.

## 7. Adicionar ao carrossel (se for carrossel de clientes)
Editar `remotion-doma/src/Root.tsx`, **colar o snippet** que o wizard mostrou — antes da última linha de `<Still>` do carrossel.

Snippet exemplo:
```jsx
<Still id="cliente-rentauto" component={ClientesMiolo as never}
  width={vertical.largura} height={vertical.altura}
  defaultProps={{
    card: 'oficial/_205-card_rentauto.png',
    texto: 'A **Rentauto Aluguel de Carros** (Curitiba/PR) faz parte do time de clientes da **DOMa**.'
  }} />
```

## 8. Renderizar
```
! bash remotion-doma/render-still.sh cliente-rentauto
```

Output em `remotion-doma/out/cliente-rentauto.png`.

## 9. Publicar
- PNG está em `remotion-doma/out/`.
- Subir pro Instagram via app/celular.

---

## Problemas comuns

| Problema | Solução |
|---|---|
| Logo ficou pixelado | Pedir logo em alta resolução (≥ 1000px no lado maior). |
| Cor não bate com a marca | Pedir o hex correto da marca. Hex amarelo Doma é `#F4BB35`. |
| Logo ficou centralizado errado | Logo tem espaço branco em volta no PNG — recortar antes (Photoshop/Preview crop). |
| `_205-card_<slug>.png` não aparece em Root.tsx | Rodou `sync-components.sh`? |
| `cliente-X` não renderiza | Snippet colado em Root.tsx? Salvou o arquivo? |

## Se errar e quiser refazer
```
! rm ~/projetos-doma/patrick/.claude/skills/marketing-doma/assets/cards-clientes/_205-card_rentauto.png
! python ...wizard-cliente.py --logo ... --cor "#cor-nova" ...
```

## Em modo guiado (sem comando)
Se não lembra os argumentos:
```
! python .claude/skills/marketing-doma/scripts/wizard-cliente.py
```
Wizard pergunta cada coisa interativamente.

---

**Dúvida?** Pergunta no Claude Code: "como adiciono cliente novo?"
Ele lê este tutorial e te guia.
