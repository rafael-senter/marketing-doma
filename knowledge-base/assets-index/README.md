# Asset Index — catálogo dos assets oficiais Doma

Documentos de referência para uso correto de cada tipo de asset. As skills consultam estes arquivos antes de usar logo/cor/fonte/ícone/grafismo.

## Arquivos

- **[logos.md](logos.md)** — wordmark horizontal, vertical, selo, sub-marcas, taglines, complementos. Como usar `LogoDoma` vs CSS mask + tingimento.
- **[cores.md](cores.md)** — paleta tokens (manga, soft, watermark, grafite, branco). Variações por categoria. Anti-padrões.
- **[fontes.md](fontes.md)** — TT Lakes (primária) + Kanit. Pesos, cap-height, letterSpacing.
- **[icones.md](icones.md)** — 50 ícones bicolores oficiais. Variantes por fundo (manga/grafite/branco).
- **[grafismos.md](grafismos.md)** — corte diagonal 45° do M, complementos, watermark (mask/outline), pílulas/cards.

## Fonte de verdade dos arquivos

Assets físicos em `../../assets/`:
```
assets/
├── oficial/        # logos, selos, sub-marcas, complementos, taglines (31 arquivos)
├── icones/         # 50 ícones bicolores
├── fontes/         # TT Lakes + Kanit (6 arquivos)
└── grafismos/      # (reservado para grafismos extraídos avulsos)
```

Sincronizados pro projeto Remotion host via `scripts/sync-components.sh` (rodado pelo `/marketing-doma-setup`).
