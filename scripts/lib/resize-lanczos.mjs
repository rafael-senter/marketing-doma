#!/usr/bin/env node
/** Resize PNG com Lanczos3 (substitui Python/PIL). Uso: node resize-lanczos.mjs SRC DST W H */
import sharp from 'sharp';

const [src, dst, w, h] = process.argv.slice(2);
if (!src || !dst || !w || !h) {
  console.error('Uso: node resize-lanczos.mjs <src> <dst> <width> <height>');
  process.exit(2);
}

await sharp(src)
  .resize(parseInt(w, 10), parseInt(h, 10), { kernel: sharp.kernel.lanczos3 })
  .png()
  .toFile(dst);
