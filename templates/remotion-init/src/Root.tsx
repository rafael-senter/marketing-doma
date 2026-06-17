/**
 * Root.tsx — entrypoint Remotion (marketing-doma).
 * Já vem com `padrao-frase-pilulas` registrado pro smoke test do install-deps.sh.
 * Adicionar Stills via new-post.sh, wizard-cliente.py, render-from-plano.py.
 */
import {Still} from 'remotion';
import {brand} from './theme';
import {FrasePilulas} from './v2/categorias/frase-em-pilulas/FrasePilulas';

const {vertical} = brand.formato;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Still
        id="padrao-frase-pilulas"
        component={FrasePilulas as never}
        width={vertical.largura}
        height={vertical.altura}
      />
    </>
  );
};
