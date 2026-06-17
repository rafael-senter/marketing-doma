/**
 * Blocks.tsx — wrappers de formatação automática.
 *
 * Para casos onde o usuário cola asset CRÚ (sem pré-processar) — esses blocos
 * aplicam a formatação Doma em RUNTIME (CSS). Fallback do scripts/auto-format-asset.py
 * (que é o caminho preferido — pré-processa offline pra qualidade fixa).
 *
 * Quando usar:
 *  - Marketing precisa testar logo cliente novo na hora, sem pre-processar.
 *  - Foto bruta sem recorte — bloco aplica fit + raio + watermark opcional.
 *  - Mockup colado sem ajuste — bloco aplica box-shadow + raio.
 */
import {Img, staticFile} from 'remotion';
import React from 'react';

const RAIO_PADRAO = 40;

/* ─── LogoClienteBlock — logo cliente sobre card colorido ─── */
export type LogoClienteBlockProps = {
  logo: string;          // path do PNG do logo (transparente preferido)
  cor: string;           // cor de fundo do card (hex)
  raio?: number;         // default 40
  padding?: string;      // default 13% (≈80/600)
  width?: string;        // default 100%
  height?: string;       // default 100%
};

export const LogoClienteBlock: React.FC<LogoClienteBlockProps> = ({
  logo, cor, raio = RAIO_PADRAO, padding = '13%', width = '100%', height = '100%'
}) => (
  <div style={{
    width, height, background: cor, borderRadius: raio,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding, boxSizing: 'border-box', overflow: 'hidden',
  }}>
    <Img src={staticFile(logo)} style={{
      maxWidth: '100%', maxHeight: '100%', objectFit: 'contain',
    }} />
  </div>
);

/* ─── FotoLojaBlock — foto loja com raio + opcional watermark ─── */
export type FotoLojaBlockProps = {
  foto: string;
  raio?: number;
  watermark?: boolean;
  width?: string;
  height?: string;
};

export const FotoLojaBlock: React.FC<FotoLojaBlockProps> = ({
  foto, raio = RAIO_PADRAO, watermark, width = '100%', height = '100%'
}) => (
  <div style={{
    width, height, borderRadius: raio, overflow: 'hidden', position: 'relative',
  }}>
    <Img src={staticFile(foto)} style={{
      width: '100%', height: '100%', objectFit: 'cover',
    }} />
    {watermark && (
      <div style={{
        position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(31,31,31,0.4))',
        pointerEvents: 'none',
      }} />
    )}
  </div>
);

/* ─── MockupBlock — device/produto com shadow + raio ─── */
export type MockupBlockProps = {
  mockup: string;
  shadow?: boolean;
  raio?: number;
  width?: string;
  height?: string;
};

export const MockupBlock: React.FC<MockupBlockProps> = ({
  mockup, shadow = true, raio = 30, width = '100%', height = '100%'
}) => (
  <div style={{
    width, height, borderRadius: raio, overflow: 'hidden',
    boxShadow: shadow ? '0 12px 32px rgba(31,31,31,0.18)' : 'none',
  }}>
    <Img src={staticFile(mockup)} style={{
      width: '100%', height: '100%', objectFit: 'contain',
    }} />
  </div>
);

/* ─── IconeTemaBlock — ícone temático centralizado ─── */
export type IconeTemaBlockProps = {
  icone: string;
  cor?: string;       // se passar, aplica como mask + backgroundColor (tinge)
  width?: string;
  height?: string;
};

export const IconeTemaBlock: React.FC<IconeTemaBlockProps> = ({
  icone, cor, width = '100%', height = '100%'
}) => {
  const url = `url(${staticFile(icone)})`;
  if (cor) {
    return (
      <div style={{
        width, height, backgroundColor: cor,
        WebkitMaskImage: url, maskImage: url,
        WebkitMaskSize: 'contain', maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center', maskPosition: 'center',
      }} />
    );
  }
  return (
    <div style={{width, height, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Img src={staticFile(icone)} style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}} />
    </div>
  );
};

/* ─── CardLogoCliente — drop-in pra CarrosselClientes (ClientesMiolo) ─── */
/* Substitui o consumo de _205-card<X>.png baked por geração em runtime.       */
export type CardLogoClienteProps = {
  logo: string;
  cor: string;
  texto?: React.ReactNode;
};

export const CardLogoCliente: React.FC<CardLogoClienteProps> = ({logo, cor, texto}) => (
  <div style={{position: 'absolute', left: '9.4%', top: '10%', width: '81.1%', height: '42.6%', zIndex: 1}}>
    <LogoClienteBlock logo={logo} cor={cor} />
  </div>
);
