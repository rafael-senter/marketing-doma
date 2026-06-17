import React, {useState, useEffect, useMemo} from 'react';

// Lista PNGs em remotion-doma/out/. Path absoluto via fs.allow (vite.config).
// Como Vite não consegue listar diretório, geramos um índice no startup do server
// OU buscamos via fetch num endpoint (sem servidor, então usamos lista hard-coded
// + fetch HEAD pra confirmar existência).

const KNOWN_RENDERS = [
  // POST 246 — Dicas margem
  ...Array.from({length: 9}, (_, i) => `dicas-246-${i + 1}`),
  // Gestão financeira (carrossel novo)
  ...Array.from({length: 9}, (_, i) => `gestao-financeira-${i + 1}`),
  // Otica 133
  ...Array.from({length: 9}, (_, i) => `otica-133-${i + 1}`),
  // Trento 193
  ...Array.from({length: 8}, (_, i) => `trento-193-${i + 1}`),
  // Clientes 205
  ...Array.from({length: 8}, (_, i) => `clientes-205-${i + 1}`),
  // SPIN 243 + 251
  ...Array.from({length: 6}, (_, i) => `spin-243-${i + 1}`),
  ...Array.from({length: 6}, (_, i) => `spin-251-${i + 1}`),
  // Cards únicos
  'padrao-frase-pilulas', 'padrao-mapa-clientes',
  'padrao-certoerrado-247', 'padrao-certoerrado-256',
  'padrao-clientes', 'padrao-clientes-2',
  'padrao-motiva-242', 'padrao-motiva-250',
  'padrao-inimigo-244', 'padrao-inimigo-252',
  'padrao-narrativa-265', 'padrao-narrativa-272',
  'padrao-produtividade-270', 'padrao-produtividade-277', 'padrao-produtividade-254',
];

// Path do host (assumindo plugin em <projeto>/.claude/plugins/marketing-doma/)
// e renders em <projeto>/remotion-doma/out/
const HOST_OUT = '/@fs/' + '/home/rafael/projetos/projetos-doma/patrick/remotion-doma/out';

export default function RenderPreview() {
  const [available, setAvailable] = useState({});
  const [q, setQ] = useState('');
  const [zoomed, setZoomed] = useState(null);

  // Check existência de cada render via fetch HEAD
  useEffect(() => {
    KNOWN_RENDERS.forEach(id => {
      fetch(`${HOST_OUT}/${id}.png`, {method: 'HEAD'})
        .then(r => setAvailable(av => ({...av, [id]: r.ok})))
        .catch(() => setAvailable(av => ({...av, [id]: false})));
    });
  }, []);

  const filtered = useMemo(() => {
    const arr = KNOWN_RENDERS.filter(id => available[id]);
    if (!q) return arr;
    return arr.filter(id => id.toLowerCase().includes(q.toLowerCase()));
  }, [available, q]);

  const totalKnown = KNOWN_RENDERS.length;
  const totalAvailable = Object.values(available).filter(Boolean).length;

  return (
    <div className="render-preview">
      <div className="rp-toolbar">
        <h3>Renders em <code>remotion-doma/out/</code></h3>
        <input className="rp-search" placeholder="🔍 filtrar por ID…" value={q}
               onChange={e => setQ(e.target.value)} />
        <div className="rp-stats">{totalAvailable}/{totalKnown} disponíveis</div>
      </div>

      <div className="rp-grid">
        {filtered.map(id => (
          <div key={id} className="rp-card" onClick={() => setZoomed(id)}>
            <img src={`${HOST_OUT}/${id}.png`} alt={id} loading="lazy" />
            <div className="rp-id">{id}</div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty">
          {totalAvailable === 0
            ? '⏳ Verificando renders disponíveis… ou nenhum render foi gerado ainda.'
            : `Nenhum render bate "${q}"`}
        </div>
      )}

      {zoomed && (
        <div className="rp-zoom" onClick={() => setZoomed(null)}>
          <div className="rp-zoom-content" onClick={e => e.stopPropagation()}>
            <img src={`${HOST_OUT}/${zoomed}.png`} alt={zoomed} />
            <div className="rp-zoom-meta">
              <strong>{zoomed}.png</strong>
              <button onClick={() => setZoomed(null)}>✕ fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
