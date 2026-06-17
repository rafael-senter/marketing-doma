{/* ── FUNÇÕES DO SISTEMA — {{NOME}} (plugin marketing-doma) ── */}
<Still id="func-{{NOME}}" component={FuncoesSistema as never}
  width={vertical.largura} height={vertical.altura}
  defaultProps={{
    base: 'oficial/_func{{NOME}}-base.png',
    watermark: true,
    logoRodape: true,
    tituloTopo: {
      texto: 'Frase de feature\n**em bold seletivo.**',
      top: '8%', width: '80%', align: 'center', fontSize: 54
    },
    bigNumero: {texto: '95%', left: '8%', top: '40%', fontSize: 220}
    /* (+ corpo, balões, badge — ver props do componente) */
  }} />
