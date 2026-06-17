/**
 * Root.tsx — entrypoint do Remotion para o projeto marketing-doma do host.
 *
 * Adicionar Stills aqui (geralmente via snippet de new-post.sh ou wizard-cliente).
 *
 * Estrutura básica:
 *   - Imports dos componentes em src/v2/categorias/<cat>/
 *   - <Still> registrado por id (usado no render-still.sh <id>)
 *   - width/height padrão Doma vertical 1080×1350 (brand.formato.vertical)
 *
 * Sincronizado automaticamente pelo plugin via scripts/sync-components.sh.
 */
import {Still} from 'remotion';
import {brand} from './theme';

const {vertical} = brand.formato;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Sem Stills ainda. Adicione via:
          - bash <plugin>/scripts/new-post.sh <categoria> <nome>
          - bash <plugin>/scripts/wizard-cliente.py
          - bash <plugin>/scripts/render-from-plano.py <plano>.md

          Snippet exemplo (substituir Categoria + Componente reais):
          <Still id="meu-post-1" component={MeuComponente as never}
            width={vertical.largura} height={vertical.altura} />
      */}
    </>
  );
};
