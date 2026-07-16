# SPIN — rodapé com bloco branco separado + alternância de modos

**Data:** 2026-07-16
**Descoberto em:** POST rede-lojas (correção do Patrick)
**Sintoma:** (a) rodapé recriado como faixa full-width + círculo branco flutuante — errado; (b) miolos todos no mesmo modo de cor — errado.
**Medição (POST 243 2, 1080×1350):**
- Faixa colorida: x 0→**82.4%**, topo 87%, arredondada APENAS no canto **superior direito** (raio ~60). Esquerda/baixo full-bleed.
- Bloco BRANCO **SEPARADO** (não é círculo): x **82.5%→100%**, y **87%→100%**; raios ~**80 em TL/TR/BR**; canto **inferior-esquerdo RETO**. Acima dele aparece o fundo do slide.
- Seta preta ~68px centrada no bloco.
**Regra 1 (rodapé):** capa e miolos SPIN usam esse rodapé de 2 peças (`RodapeSeta` no componente). Nunca círculo flutuante.
**Regra 2 (alternância de modos):** miolos ALTERNAM cor a cada slide — slide 2 = modo 1 (fundo soft + card manga), 3 = modo 2 (fundo manga + card soft), 4 = modo 1, 5 = modo 2… `cardClaro` não é só "slide denso": é o modo 2 da alternância (fs continua 44; reduzir só se denso).
**Aplicar em:** spin; conferir se outras categorias com faixa+seta (dicas-carrossel etc.) têm o mesmo rodapé de 2 peças.
