# Ícones oficiais Doma

50 ícones bicolores em `../../assets/icones/` (grade 5×10 do manual).

## Estilo
- Line icons two-tone (grafite + amarelo).
- Traços grossos, geométricos.
- Match com TT Lakes (mesma família visual).

## Uso típico
- Pílulas de benefício (`+ controle`, `+ vendas`, `+ lucro`).
- Ícones temáticos em cards.
- Iconografia em carrossel.

## ⚠️ Variante por contexto
- Sobre fundo manga `#F4BB35`: ícone bicolor (parte amarela some) → usar **variante monocromática grafite** OU chip de contraste.
- Sobre fundo grafite: ícone bicolor OK ou só amarelo.
- Sobre fundo branco: bicolor original.

## Como usar (Remotion)

```tsx
import {Icone} from '../../components';

<Icone nome="cifrao" cor="grafite" tamanho={64} />
```

OU direto:
```tsx
<Img src={staticFile('icones/cifrao.png')} style={{width: 64, height: 64}} />
```

## Ícones extraídos pra capas (recortes)

| Arquivo | Origem | Uso |
|---|---|---|
| `oficial/_dicas246-icones.png` | recorte capa POST 246 | cifrão + gráfico cadente (cabe em temas de margem/gestão financeira) |
| `oficial/_<XXX>-icones.png` | recorte capa POST XXX | específico daquele post |

⚠️ **Recortes específicos** ficam em `assets/oficial/_<XXX>-icones.png`, NÃO em `assets/icones/` (que tem só os 50 ícones bicolores oficiais).

## Anti-padrões

- ❌ Recriar ícone em CSS/SVG quando há PNG oficial.
- ❌ Recolorir bicolor sem testar contraste no fundo.
- ❌ Usar ícone temático em peça institucional pura (T1/T10).
