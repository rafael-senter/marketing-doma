# Plano — POST inadimplencia

> Categoria: funcoes-sistema (modelos POST 127/201/207/248/266/273)
> Criado: 2026-07-16
> Componente: `templates/components/funcoes-sistema/FuncoesSistema.tsx` (flexível com slots opcionais)

## 1. Funcionalidade do ERP a destacar
**Feature:** Painel de Inadimplência (Dashboard Financeiro) — ranking de inadimplentes, tempo de atraso, total inadimplente em tempo real.
**Vertical:** indústria (print real da conta Doma Indústria)

## 2. Base — print real do sistema (sem nanobanana)
- Nanobanana indisponível (cota Gemini zero, sem billing) → RULES §6 alternativa: **construir mockup em código caprichado**.
- Print real fornecido pelo Patrick: `/home/rafael/Downloads/Inadimplência.png` (tela Inadimplência do ERP, 1897×966).
- Barra do Chrome cortada (48px topo) → salvo em `remotion-doma/public/oficial/_funcinadimplencia-tela.png` (1897×918).
- Mockup: frame de browser minimalista em código (barra superior com 3 dots + cantos arredondados + sombra), tela = print real.

## 3. Overlays Remotion (slots ligados)
- Fundo: amarelo manga `#F4BB35` (padrão Doma).
- `watermark`: padrão MEDIDO da categoria funcoes-sistema = "DOMa" BRANCA no TOPO, faixa única full-width (slot `watermark` do componente, 6 modelos medidos). Validador corrigiu chute anterior.
- `tituloTopo`: **"Você sabe quanto do seu faturamento… já não é mais seu?"** — 2-3 linhas, corpo regular 400, destaque bold em "já não é mais seu?".
- Mockup browser central com a tela de Inadimplência (leve rotação sutil OU reto — validar no render).
- `bigNumero`/badge: destacar **"R$ 96.596,90 inadimplentes em 180 dias"** OU **"37 clientes inadimplentes"** — balão/badge apontando pro card do print.
- Selo: **`selo-14anos-1.png`** (= `SELO 14 ANOS-12` do ZIP oficial 2026-07-16, hash idêntico; badge manga + glifo grafite). Confirmado EM USO 2026 pelo Patrick. Canto inferior.
- `logoRodape`: wordmark oficial rodapé.

## 4. Voz
- Tom provocativo (pergunta 2ª pessoa) + explicativo no apoio.
- Copy título (dada pelo Patrick): "Você sabe quanto do seu faturamento… já não é mais seu?"
- Apoio/CTA curto: "Com a Doma, você enxerga cada centavo em atraso — em tempo real."
- Sem julgar, sem sarcasmo, vocabulário próprio (controle, faturamento, tempo real).

## 5. Validação + render
- [ ] `validador-marca`.
- [ ] `bash remotion-doma/render-still.sh inadimplencia`.
