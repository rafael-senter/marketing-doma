import React, {useEffect, useState} from 'react';
import manifest from '@plugin/plugin.json';
import LintCopyPanel from './LintCopyPanel.jsx';
import NewPostForm from './NewPostForm.jsx';
import AssetsPanel from './AssetsPanel.jsx';
import RenderPreview from './RenderPreview.jsx';
import WizardClientePanel from './WizardClientePanel.jsx';

const SECTIONS = ['categorias', 'agentes', 'commands', 'scripts', 'new-post', 'lint-copy', 'assets', 'renders', 'wizard-cliente'];

export default function App() {
  const [tab, setTab] = useState('categorias');
  const [selected, setSelected] = useState(null);
  const [content, setContent] = useState('');

  const categorias = (manifest.embedded_subskills || []).map(p => p.split('/').pop());
  const agentes = (manifest.agents || []).map(p => p.split('/').pop().replace('.md', ''));
  const commands = (manifest.commands || []).map(p => p.split('/').pop().replace('.md', ''));
  const scripts = Object.keys(manifest.scripts || {});

  // Carrega conteúdo da ficha quando selecionado
  useEffect(() => {
    if (!selected) { setContent(''); return; }
    const path = selectedToPath(tab, selected);
    if (!path) { setContent(''); return; }
    fetch(`@plugin/${path}`).then(r => r.ok ? r.text() : '').then(setContent).catch(() => setContent('(arquivo não encontrado)'));
  }, [tab, selected]);

  return (
    <div className="app">
      <header className="hd">
        <h1>marketing-doma <span className="ver">v{manifest.version}</span></h1>
        <p className="desc">{manifest.description.slice(0, 200)}…</p>
      </header>

      <nav className="tabs">
        {SECTIONS.map(s => (
          <button key={s} className={tab === s ? 'on' : ''} onClick={() => { setTab(s); setSelected(null); }}>
            {s}
          </button>
        ))}
      </nav>

      {tab === 'lint-copy' ? (
        <main className="lint-copy-wrap">
          <LintCopyPanel />
        </main>
      ) : tab === 'new-post' ? (
        <main className="lint-copy-wrap">
          <NewPostForm />
        </main>
      ) : tab === 'assets' ? (
        <main className="lint-copy-wrap">
          <AssetsPanel />
        </main>
      ) : tab === 'renders' ? (
        <main className="lint-copy-wrap">
          <RenderPreview />
        </main>
      ) : tab === 'wizard-cliente' ? (
        <main className="lint-copy-wrap">
          <WizardClientePanel />
        </main>
      ) : (
      <main className="grid">
        <aside className="list">
          {tab === 'categorias' && categorias.map(c => (
            <button key={c} className={selected === c ? 'on' : ''} onClick={() => setSelected(c)}>{c}</button>
          ))}
          {tab === 'agentes' && agentes.map(a => (
            <button key={a} className={selected === a ? 'on' : ''} onClick={() => setSelected(a)}>{a}</button>
          ))}
          {tab === 'commands' && commands.map(c => (
            <button key={c} className={selected === c ? 'on' : ''} onClick={() => setSelected(c)}>/{c}</button>
          ))}
          {tab === 'scripts' && scripts.map(s => (
            <button key={s} className={selected === s ? 'on' : ''} onClick={() => setSelected(s)}>{s}</button>
          ))}
        </aside>

        <section className="detail">
          {!selected && <div className="empty">← selecione um item à esquerda</div>}
          {selected && (
            <>
              <h2>{selected}</h2>
              <pre className="md">{content || '(carregando…)'}</pre>
            </>
          )}
        </section>
      </main>
      )}

      <footer className="ft">
        <span>{categorias.length} categorias · {agentes.length} agentes · {commands.length} commands · {scripts.length} scripts</span>
      </footer>
    </div>
  );
}

function selectedToPath(tab, sel) {
  if (tab === 'categorias') {
    return `skills/marketing-doma/subskills/${sel}/SKILL.md`;
  }
  if (tab === 'agentes') {
    return `agents/${sel}.md`;
  }
  if (tab === 'commands') {
    return `commands/${sel}.md`;
  }
  if (tab === 'scripts') {
    return `scripts/${manifest.scripts[sel].split('/').pop()}`;
  }
  return null;
}
