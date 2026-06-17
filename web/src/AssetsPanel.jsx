import React, {useState, useEffect, useMemo} from 'react';

export default function AssetsPanel() {
  const [catalog, setCatalog] = useState(null);
  const [sub, setSub] = useState('oficial');
  const [q, setQ] = useState('');

  useEffect(() => {
    fetch('@plugin/assets/CATALOGO.json')
      .then(r => r.json())
      .then(setCatalog)
      .catch(() => setCatalog({oficial: [], icones: [], fontes: []}));
  }, []);

  const items = useMemo(() => {
    if (!catalog) return [];
    const all = catalog[sub] || [];
    if (!q) return all;
    const qL = q.toLowerCase();
    return all.filter(it =>
      it.arquivo.toLowerCase().includes(qL) ||
      (it.uso || '').toLowerCase().includes(qL) ||
      (it.tipo || '').toLowerCase().includes(qL)
    );
  }, [catalog, sub, q]);

  if (!catalog) return <div className="empty">Carregando catálogo…</div>;

  return (
    <div className="assets-panel">
      <div className="assets-toolbar">
        <div className="assets-tabs">
          {['oficial', 'icones', 'fontes'].map(s => (
            <button key={s} className={sub === s ? 'on' : ''} onClick={() => setSub(s)}>
              {s} ({catalog[s]?.length || 0})
            </button>
          ))}
        </div>
        <input className="assets-search" placeholder="🔍 buscar por nome, uso, tipo…" value={q}
               onChange={e => setQ(e.target.value)} />
      </div>

      <div className="assets-grid">
        {items.map(it => (
          <div key={it.slug} className={`asset-card asset-${sub}`}>
            {sub !== 'fontes' && (
              <div className="asset-preview">
                <img src={`@plugin/${it.path_plugin}`} alt={it.slug}
                     onError={e => e.target.style.opacity = 0.3} />
              </div>
            )}
            {sub === 'fontes' && (
              <div className="asset-preview asset-preview-font" style={{fontWeight: it.peso}}>
                <span>Aa</span>
                <small>peso {it.peso}</small>
              </div>
            )}
            <div className="asset-meta">
              <div className="asset-name">{it.arquivo}</div>
              {it.tipo && <span className="asset-tag">{it.tipo}</span>}
              {it.cor && <span className="asset-cor">{it.cor}</span>}
              {it.dims && <small>{it.dims.w}×{it.dims.h}</small>}
              {it.size_kb && <small>{it.size_kb} KB</small>}
              <p className="asset-uso">{it.uso}</p>
              {it.usar_sobre && it.usar_sobre.length > 0 && (
                <div className="asset-fundos"><strong>Usar sobre:</strong> {it.usar_sobre.join(', ')}</div>
              )}
              {it.evitar_sobre && it.evitar_sobre.length > 0 && (
                <div className="asset-fundos asset-evitar"><strong>Evitar:</strong> {it.evitar_sobre.join(', ')}</div>
              )}
              <code className="asset-path">{it.path_host || it.path_plugin}</code>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && <div className="empty">Nenhum asset bate "{q}"</div>}
    </div>
  );
}
