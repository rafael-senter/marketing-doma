import React, {useState, useMemo} from 'react';
import {lintCopy} from './lintCopy.js';

// Categorias-template suportadas (espelha templates/plano-base/)
const CATEGORIAS = [
  {id: 'dicas-carrossel',         label: 'Dicas Carrossel (numerado, 9 slides)', slides: 9},
  {id: 'spin',                    label: 'SPIN (6 slides)', slides: 6},
  {id: 'doma-carrossel-clientes', label: 'Carrossel de Clientes (8 slides)', slides: 8},
  {id: 'frase-pilulas',           label: 'Frase em Pílulas (card)', slides: 1},
  {id: 'inimigo-em-comum',        label: 'Inimigo em Comum (card)', slides: 1},
  {id: 'certo-e-errado',          label: 'Certo e Errado (card)', slides: 1},
  {id: 'doma-motiva',             label: 'Doma Motiva (card)', slides: 1},
  {id: 'narrativa',               label: 'Narrativa (card)', slides: 1},
  {id: 'mapa-clientes',           label: 'Mapa de Clientes (card)', slides: 1},
  {id: 'clientes',                label: 'Cliente Novo (card)', slides: 1},
  {id: 'produtividade',           label: 'Produtividade (card)', slides: 1},
  {id: 'funcoes-sistema',         label: 'Funções do Sistema (card)', slides: 1},
  {id: 'doma-institucional',      label: 'Doma Institucional (card)', slides: 1},
];

export default function NewPostForm() {
  const [cat, setCat] = useState('');
  const [nome, setNome] = useState('');
  const [tema, setTema] = useState('');
  const [bordao, setBordao] = useState('Domine seu negócio em um único lugar.');
  const [slides, setSlides] = useState([]);

  const catObj = CATEGORIAS.find(c => c.id === cat);

  // Inicializar slides ao escolher categoria
  function selectCategoria(id) {
    setCat(id);
    const cat = CATEGORIAS.find(c => c.id === id);
    if (!cat) return;
    if (cat.slides === 1) {
      setSlides([{tipo: 'card', titulo: '', corpo: ''}]);
    } else {
      // Carrossel: capa + N miolos + CTA
      const arr = [{tipo: 'capa', titulo: '', corpo: ''}];
      for (let i = 1; i < cat.slides - 1; i++) {
        arr.push({tipo: 'miolo', numero: String(i).padStart(2, '0'), titulo: '', corpo: ''});
      }
      arr.push({tipo: 'CTA', titulo: '', corpo: ''});
      setSlides(arr);
    }
  }

  function updateSlide(i, field, value) {
    setSlides(s => s.map((sl, idx) => idx === i ? {...sl, [field]: value} : sl));
  }

  // Lint do texto total (todos os campos)
  const allText = [tema, bordao, ...slides.flatMap(s => [s.titulo, s.corpo])].join('\n');
  const lintResult = useMemo(() => lintCopy(allText), [allText]);

  // Gerar markdown do plano
  const planoMd = useMemo(() => {
    if (!catObj || !nome) return '';
    const data = new Date().toISOString().slice(0, 10);
    let md = `# Plano — POST ${nome}\n\n`;
    md += `> Categoria: ${cat}\n`;
    md += `> Criado: ${data}\n\n`;
    md += `## Tema\n${tema || '<preencher>'}\n\n`;
    md += `## Bordão Doma (CTA)\n${bordao}\n\n`;
    md += `## Estrutura slide-a-slide\n\n`;
    md += `| # | Tipo | Título | Corpo |\n|---|---|---|---|\n`;
    slides.forEach((s, i) => {
      const t = (s.titulo || '').replace(/\n/g, ' ').slice(0, 60);
      const c = (s.corpo || '').replace(/\n/g, ' ').slice(0, 60);
      md += `| ${i + 1} | ${s.tipo}${s.numero ? ' ' + s.numero : ''} | ${t} | ${c} |\n`;
    });
    md += `\n## Validação\n- [ ] validador-marca rodou\n- [ ] Patrick aprovou\n- [ ] Snippet colado em Root.tsx\n`;
    md += `\n## Render\n\`\`\`bash\nbash remotion-doma/render-still.sh ${nome}-1\n\`\`\`\n`;
    return md;
  }, [catObj, nome, cat, tema, bordao, slides]);

  function downloadPlano() {
    if (!planoMd) return;
    const blob = new Blob([planoMd], {type: 'text/markdown'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `POST-${nome}-plano.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="new-post-form">
      <div className="form-col">
        <h3>1. Categoria</h3>
        <select value={cat} onChange={e => selectCategoria(e.target.value)}>
          <option value="">— escolher —</option>
          {CATEGORIAS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>

        {cat && (
          <>
            <h3>2. Nome do post (slug)</h3>
            <input value={nome} onChange={e => setNome(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
              placeholder="ex: gestao-financeira" />

            <h3>3. Tema</h3>
            <input value={tema} onChange={e => setTema(e.target.value)}
              placeholder="ex: 7 erros na gestão financeira de pequenas lojas" />

            <h3>4. Bordão Doma (CTA)</h3>
            <select value={bordao} onChange={e => setBordao(e.target.value)}>
              <option>Domine seu negócio em um único lugar.</option>
              <option>Domine o seu negócio antes que ele domine você.</option>
              <option>Quem domina a gestão, alcança mais resultados.</option>
              <option>Assuma as rédeas do seu negócio.</option>
              <option>O nosso negócio é ver o seu prosperar.</option>
            </select>

            <h3>5. Slides ({slides.length})</h3>
            {slides.map((s, i) => (
              <div key={i} className="slide-card">
                <h4>{i + 1}. {s.tipo}{s.numero ? ` ${s.numero}` : ''}</h4>
                <input placeholder="Título" value={s.titulo}
                  onChange={e => updateSlide(i, 'titulo', e.target.value)} />
                <textarea placeholder="Corpo (suporta **bold** ==hl== //it//)" value={s.corpo}
                  onChange={e => updateSlide(i, 'corpo', e.target.value)} rows={3} />
              </div>
            ))}

            <div className="lint-mini">
              <strong>Lint voz:</strong>{' '}
              <span className={`sev sev-${lintResult.verdict.toLowerCase()}`}>{lintResult.verdict}</span>{' '}
              ({lintResult.bloqueia} BLOQUEIA · {lintResult.aviso} AVISO)
            </div>

            <button className="btn-download" disabled={!nome || lintResult.verdict === 'BLOQUEIA'} onClick={downloadPlano}>
              {lintResult.verdict === 'BLOQUEIA' ? '❌ corrigir lint primeiro' : '⬇️ Download POST-' + nome + '-plano.md'}
            </button>
          </>
        )}
      </div>

      <div className="form-col preview">
        <h3>Preview do plano</h3>
        <pre className="md">{planoMd || '(escolha categoria + nome pra ver o plano)'}</pre>
      </div>
    </div>
  );
}
