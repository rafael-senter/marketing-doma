# Plano — POST {{NOME}}

> Categoria: doma-carrossel-clientes (modelo POST 205)
> Criado: {{DATA}}
> Componente: `templates/components/doma-carrossel-clientes/CarrosselClientes.tsx`

## 1. N clientes do carrossel
- Slide 1 = ClientesCapa (institucional).
- Slides 2 a N+1 = ClientesMiolo, 1 cliente cada.
- Slide N+2 = ClientesFecho.

## 2. Para cada cliente
- **Card recortado do modelo** (logo + cor de fundo + cantos baked):
  salvar em `remotion-doma/public/oficial/_205-card<nome>.png`.
- **Texto** com bold no nome E na palavra "DOMa" (`<LogoDoma>` no JSX).

## 3. ⚠️ Logo do cliente
**NUNCA recriar** em fonte/SVG. SEMPRE recortar do modelo do cliente:
- Receita "recorte = colocação": rect % medido no modelo → mesma % no Remotion.
- Cor de cada card é própria do cliente.

## 4. Voz (capa + fecho)
- Institucional. "X faz parte do time", "Doma cresce com vocês".
- Bordão Doma no fecho.

## 5. Validação + render
- [ ] Cada logo recortado validado.
- [ ] `validador-marca`.
- [ ] Render lote: `node render-batch.mjs {{NOME}} <N+2>`.
