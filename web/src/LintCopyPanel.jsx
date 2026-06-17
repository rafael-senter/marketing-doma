import React, {useState, useMemo} from 'react';
import {lintCopy, SUGGEST} from './lintCopy.js';

export default function LintCopyPanel() {
  const [text, setText] = useState('Cole aqui o copy do post pra validar voz Doma…\n\nEx: "Achismo é o luxo de quem não liga pro próprio dinheiro" — deve BLOQUEAR (julgador).\nEx: "Domine seu negócio em um único lugar" — OK (bordão Doma).');
  const result = useMemo(() => lintCopy(text), [text]);

  const badge = {
    BLOQUEIA: {bg: '#EF4639', fg: '#FFF', label: '❌ BLOQUEIA'},
    AVISO:    {bg: '#F5C24A', fg: '#1F1F1F', label: '⚠️ AVISO'},
    OK:       {bg: '#32BA7C', fg: '#FFF', label: '✅ OK'},
  }[result.verdict];

  return (
    <div className="lint-copy">
      <div className="lint-input">
        <h3>Texto da copy</h3>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={14}
          placeholder="Cole aqui o texto do post…" />
        <div className="lint-stats">
          {text.split('\n').length} linhas · {text.length} chars
        </div>
      </div>

      <div className="lint-result">
        <div className="lint-verdict" style={{background: badge.bg, color: badge.fg}}>
          {badge.label} — {result.bloqueia} BLOQUEIA · {result.aviso} AVISO
        </div>

        {result.findings.length === 0 && (
          <div className="lint-empty">✅ Nenhuma frase proibida detectada. Copy livre pra publicar.</div>
        )}

        {result.findings.length > 0 && (
          <table className="lint-tbl">
            <thead>
              <tr><th>Linha</th><th>Severidade</th><th>Regra</th><th>Trecho</th><th>Sugestão</th></tr>
            </thead>
            <tbody>
              {result.findings.map((f, i) => {
                const suggestKey = Object.keys(SUGGEST).find(k => f.name.includes(k));
                return (
                  <tr key={i} className={f.sev.toLowerCase()}>
                    <td>{f.line}</td>
                    <td><span className={`sev sev-${f.sev.toLowerCase()}`}>{f.sev}</span></td>
                    <td>{f.name}</td>
                    <td className="trecho">{f.text.length > 60 ? f.text.slice(0, 60) + '…' : f.text}</td>
                    <td className="suggest">{suggestKey ? SUGGEST[suggestKey] : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
