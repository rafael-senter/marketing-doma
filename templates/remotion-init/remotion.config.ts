import {Config} from '@remotion/cli/config';

// Qualidade de imagem para os stills (carrosséis/posts)
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

// PNG quando precisar de transparência; JPEG é mais leve para feed.
// Trocar via CLI: --image-format=png
