import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;',
    heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 600,
    bold: 700,
  },
  fontSizes: {
    base: 16,
    small: 14,
  },
  lineHeight: 1.625,
  spacing: Math.round(16 * 1.625),
  buttons: {
    height: 35,
    borderRadius: 20,
  },
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

export default Theme;
