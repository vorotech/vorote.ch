import { createGlobalStyle } from 'styled-components';
import { marginTop, marginBottom } from '../../utils/get-margin';
import { lineHeight } from '../../utils/get-line-height';

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 100;
  }

  body {
    margin: 0 0 0 calc(100vw - 100%);
    font-family: ${(props) => props.theme.fonts.body};
    color: var(--color-text);
    background-color: var(--color-background);
    ${lineHeight(1)}
    font-size: ${(props) => props.theme.fontSizes.base}px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${(props) => props.theme.fonts.heading};
    font-weight: ${(props) => props.theme.fontWeights.heading};
  }

  h1 {
    font-size: ${(props) => props.theme.fontSizes.base * 2.5}px;
    ${lineHeight(2)}
    ${marginTop(4)}
    ${marginBottom(1)}
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizes.base * 1.6875}px;
    ${lineHeight(1.5)}
    ${marginTop(2)}
    ${marginBottom(0.5)}
  }

  h3 {
    font-size: ${(props) => props.theme.fontSizes.base * 1.375}px;
    ${lineHeight(1)}
    ${marginTop(2)}
    ${marginBottom(0.5)}
  }

  h4 {
    font-size: ${(props) => props.theme.fontSizes.base * 1.2}px;
    ${lineHeight(1)}
    ${marginTop(1.5)}
    ${marginBottom(0.5)}
  }

  h5 {
    font-size: ${(props) => props.theme.fontSizes.base}px;
    ${lineHeight(1)}
    ${marginTop(2.5)}
    ${marginBottom(0.5)}
  }

  h6 {
    font-size: ${(props) => props.theme.fontSizes.base}px;
    ${lineHeight(1)}
    ${marginTop(2.5)}
    ${marginBottom(0.5)}
  }

  img {
    border: 0;
    max-width: 100%;
    display: block;
    margin: inherit auto;
  }

  hr {
    margin-top: 52px;
    margin-bottom: 52px;
    border: 0;
    color: var(--color-text);
    display: block;
    height: 26px;
    margin-right: auto;
    margin-left: auto;
    background-size: 100% 26px;
    background-image: linear-gradient(to bottom, transparent 1px, transparent 11px, var(--color-text) 11px, var(--color-text) 15px, transparent 15px, transparent 26px);
    width: 100px;
  }

  a {
    color: var(--color-secondary);
    text-decoration: none;
  }

  a:hover,
  a:focus,
  a:active {
    color: var(--color-primary);
  }

  ul {
    list-style: square;
    ${marginBottom(1)}
  }

  ul li {
    padding: 0 5px;
    margin-bottom: 10px;
  }


  b,
  strong {
    font-weight: ${(props) => props.theme.fontWeights.heading};
  }

  p {
    ${lineHeight(1)}
    ${marginBottom(1)}
  }

  blockquote {
    padding: 0;
    font-style: italic;
    text-align: center;
  }

  figure {
    display: block;
    width: 100%;
    height: auto;
  }

  figcaption {
    ${lineHeight(0.75)}
    ${marginTop(0.25)}
    color: var(--color-text);
    font-size: ${(props) => props.theme.fontSizes.small}px;
    font-style: italic;
    margin-bottom: 0;
    text-align: center;
  }

  .anchor {
    margin-left: -30px !important;
    padding-right: 14px !important;
  }
`;

export default GlobalStyles;
