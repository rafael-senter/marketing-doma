{/* ── SPIN — {{NOME}} (plugin marketing-doma) ── */}
<Still id="{{NOME}}-1" component={SpinCapa as never}
  width={vertical.largura} height={vertical.altura}
  defaultProps={{
    titulo: 'Hook **forte**\nem pílulas\nde 4 linhas.',
    texto: 'Texto explicativo\ndo hook em 4-5\nlinhas regular.',
    foto: 'oficial/_{{NOME}}-foto.jpg'
  }} />
<Still id="{{NOME}}-2" component={SpinMiolo as never}
  width={vertical.largura} height={vertical.altura}
  defaultProps={{perguntas: '→ Pergunta de Situação 1?\n\n→ Pergunta de Situação 2?\n\n→ Pergunta de Situação 3?'}} />
<Still id="{{NOME}}-3" component={SpinMiolo as never}
  width={vertical.largura} height={vertical.altura}
  defaultProps={{perguntas: '→ Pergunta de Problema 1?\n\n→ Pergunta de Problema 2?'}} />
<Still id="{{NOME}}-4" component={SpinMiolo as never}
  width={vertical.largura} height={vertical.altura}
  defaultProps={{cardClaro: true, perguntas: '→ Pergunta de Implicação 1?\n\n→ Pergunta de Implicação 2?\n\n→ Pergunta de Implicação 3?'}} />
<Still id="{{NOME}}-5" component={SpinMiolo as never}
  width={vertical.largura} height={vertical.altura}
  defaultProps={{perguntas: '→ Pergunta de Necessidade 1?\n\n→ Pergunta de Necessidade 2?'}} />
<Still id="{{NOME}}-6" component={SpinCta as never}
  width={vertical.largura} height={vertical.altura}
  defaultProps={{
    texto: 'Com a **Doma**, <proposta em 2-3 linhas>.\n\nMais controle, menos dor.',
    destaque: 'Domine seu negócio\nem um **único lugar.**'
  }} />
