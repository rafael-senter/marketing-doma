# Mockup de tela via nanobanana → SEMPRE compor screenshot original por cima

**Data:** 2026-07-16
**Descoberto em:** base `_funcinadimplencia` (mockup notebook do painel de Inadimplência)
**Sintoma:** Gemini re-renderiza o conteúdo da tela e introduz typos/alucinações sutis: "Marceio Vergani" (era Marcelo), "29/04/2029" (era 2026), "Dariei" (era Darlei), "Felto em Santa Catarina" (era Feito), "Inicio"/"INDUSTRIA" sem acento, valores alterados (R$ 54.637,30 vs 54.657,50). Em peça B2B, texto errado da tela do ERP = reprovação.
**Medição:** bbox da tela no mockup medida via numpy (barra do browser escura #202124 como âncora): L,T,R,B = 237,388,2067,1462 (mockup 2304×1856). Ratio da tela gerada (1.70) ≠ ratio do screenshot (1.96) — Gemini estica.
**Regra:** ao gerar mockup de device com tela de sistema via nanobanana:
1. Usar o render do Gemini SÓ como moldura (device + fundo + sombra).
2. Medir bbox da área de tela via numpy (âncora: barra do browser ou bezel).
3. Compor o screenshot ORIGINAL por cima: fit na largura, âncora no topo; gap vertical preenchido replicando uma LINHA LIMPA do fundo da página (linha sem pixel escuro <150 — senão texto vira listras); footer original recolocado no rodapé da área.
4. Transparente via rembg depois da composição.
**Aplicar em:** funcoes-sistema e qualquer base nanobanana com tela de ERP/browser/app.
