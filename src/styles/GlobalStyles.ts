'use client';
import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.typography.fontFamily.primary};
    font-size: ${theme.typography.fontSizes.md};
    line-height: ${theme.typography.lineHeights.normal};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.background.default};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: ${theme.colors.primary[500]};
    text-decoration: none;
    transition: ${theme.transitions.default};
    
    &:hover {
      color: ${theme.colors.primary[600]};
    }
  }

  button, 
  input, 
  select, 
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
    
    &:disabled {
      cursor: not-allowed;
    }
  }

  /* Typography styles */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.typography.fontWeights.semibold};
    line-height: ${theme.typography.lineHeights.tight};
    margin-bottom: ${theme.spacing[4]};
  }

  h1 {
    font-size: ${theme.typography.fontSizes['4xl']};
  }

  h2 {
    font-size: ${theme.typography.fontSizes['3xl']};
  }

  h3 {
    font-size: ${theme.typography.fontSizes['2xl']};
  }

  h4 {
    font-size: ${theme.typography.fontSizes.xl};
  }

  h5 {
    font-size: ${theme.typography.fontSizes.lg};
  }

  h6 {
    font-size: ${theme.typography.fontSizes.md};
  }

  p {
    margin-bottom: ${theme.spacing[4]};
  }

  small {
    font-size: ${theme.typography.fontSizes.sm};
  }
`;

export default GlobalStyles;