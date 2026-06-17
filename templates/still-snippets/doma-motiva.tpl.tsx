{/* ── DOMA MOTIVA — {{NOME}} (plugin marketing-doma) ── */}
<Still id="motiva-{{NOME}}" component={DomaMotiva as never}
  width={vertical.largura} height={vertical.altura}
  defaultProps={{
    foto: 'oficial/_{{NOME}}-foto.jpg',
    blocos: [
      'Frase 1 com **bold** seletivo.',
      'Frase 2 motivacional.'
    ],
    card: {left: '10.2%', top: '17.6%', width: '46.8%', height: '32.4%'},
    seloCanto: 'sup-dir',
    watermark: 'topo'
  }} />
