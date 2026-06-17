import React, {useState, useRef, useMemo} from 'react';

/**
 * WizardClientePanel — gera card cliente baked NO BROWSER (sem servidor).
 * Replica auto-format-asset.py (logo-cliente) via Canvas 2D.
 *
 * Fluxo:
 *  1. Upload do logo (PNG/JPG).
 *  2. Preencher: nome, cidade, cor de fundo.
 *  3. Preview live no canvas.
 *  4. Download PNG (1080×600 com cantos arredondados baked).
 *  5. Mostra snippet pra colar no Root.tsx.
 */
export default function WizardClientePanel() {
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [cor, setCor] = useState('#FF6B35');
  const canvasRef = useRef(null);

  const slug = nome.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  function onLogoUpload(e) {
    const f = e.target.files[0];
    if (!f) return;
    setLogoFile(f);
    const r = new FileReader();
    r.onload = ev => setLogoPreview(ev.target.result);
    r.readAsDataURL(f);
  }

  // Render preview no canvas sempre que mudar logo/cor
  React.useEffect(() => {
    if (!logoPreview) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = 1080, H = 600, RAIO = 40, PAD = 80;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // BG cor
    ctx.fillStyle = cor;
    roundRect(ctx, 0, 0, W, H, RAIO);
    ctx.fill();

    // Logo centralizado proporcional
    const img = new Image();
    img.onload = () => {
      const availW = W - 2 * PAD;
      const availH = H - 2 * PAD;
      const scale = Math.min(availW / img.width, availH / img.height);
      const newW = img.width * scale;
      const newH = img.height * scale;
      const x = (W - newW) / 2;
      const y = (H - newH) / 2;
      ctx.drawImage(img, x, y, newW, newH);
    };
    img.src = logoPreview;
  }, [logoPreview, cor]);

  function downloadPng() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `_205-card_${slug || 'novo-cliente'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  const snippet = useMemo(() => {
    if (!slug) return '';
    return `<Still id="cliente-${slug}" component={ClientesMiolo as never}
  width={vertical.largura} height={vertical.altura}
  defaultProps={{
    card: 'oficial/_205-card_${slug}.png',
    texto: 'A **${nome || '<NomeCliente>'}** ${cidade ? `(${cidade})` : ''} faz parte do time de clientes da **DOMa**.'
  }} />`;
  }, [slug, nome, cidade]);

  return (
    <div className="wizard-cliente">
      <div className="form-col">
        <h3>1. Logo do cliente (PNG transparente preferido)</h3>
        <input type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={onLogoUpload} />

        <h3>2. Nome real do cliente</h3>
        <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Rentauto Aluguel de Carros" />
        {slug && <small style={{opacity: 0.6}}>Slug gerado: <code>{slug}</code></small>}

        <h3>3. Cidade/UF</h3>
        <input value={cidade} onChange={e => setCidade(e.target.value)} placeholder="Curitiba/PR" />

        <h3>4. Cor de fundo do card</h3>
        <input type="color" value={cor} onChange={e => setCor(e.target.value)} />
        <input value={cor} onChange={e => setCor(e.target.value)} placeholder="#FF6B35" />

        <button className="btn-download" disabled={!logoPreview || !slug} onClick={downloadPng}>
          ⬇️ Download _205-card_{slug || 'nome'}.png
        </button>
        <small style={{display: 'block', marginTop: 8, opacity: 0.7}}>
          Depois: salvar em <code>assets/cards-clientes/</code>, rodar build-catalog + sync-components.
        </small>
      </div>

      <div className="form-col preview">
        <h3>Preview live do card (1080×600)</h3>
        <canvas ref={canvasRef} style={{width: '100%', maxWidth: 540, height: 'auto', border: '1px solid #1F1F1F', borderRadius: 6, background: '#F8F8F6'}} />

        <h3 style={{marginTop: 16}}>Snippet pra colar em Root.tsx</h3>
        <pre className="md">{snippet || '(preencha nome + logo pra ver snippet)'}</pre>
      </div>
    </div>
  );
}

// Helper — rounded rect path
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
