{/* ── CLIENTE NOVO — {{NOME}} (plugin marketing-doma) ── */}
<Still id="cliente-{{NOME}}" component={Clientes as never}
  width={vertical.largura} height={vertical.altura}
  defaultProps={{
    foto: 'oficial/_{{NOME}}-loja.jpg',
    nome: '<NomeDoCliente>',
    cidade: '<Cidade>/<UF>'
  }} />
