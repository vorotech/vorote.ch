import 'normalize.css';
import 'prismjs/themes/prism-tomorrow.css';
import './static/css/colors.css';
import './static/css/switch.css';

import wrapWithProvider from './src/gatsbyapis/wrap-with-provider';

/* eslint-disable import/prefer-default-export */
export const wrapRootElement = wrapWithProvider;
