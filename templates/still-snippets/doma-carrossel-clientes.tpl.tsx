{/* ── CARROSSEL CLIENTES — {{NOME}} (plugin marketing-doma) ── */}
<Still id="{{NOME}}-1" component={ClientesCapa as never}
  width={vertical.largura} height={vertical.altura} />
<Still id="{{NOME}}-2" component={ClientesMiolo as never}
  width={vertical.largura} height={vertical.altura}
  defaultProps={{
    card: 'oficial/_205-card<cliente1>.png',
    texto: 'A **<Cliente1>** faz parte do time de clientes da **DOMa**.\n\n<Frase curta sobre o cliente>.'
  }} />
{/* repetir <Still> p/ cada cliente */}
<Still id="{{NOME}}-N" component={ClientesFecho as never}
  width={vertical.largura} height={vertical.altura} />
