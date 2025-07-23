import { createGlobalStyle } from 'styled-components';
import { devices } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.typography.fontFamily.primary};
    color: ${props => props.theme.colors.neutral.black};
    background-color: ${props => props.theme.colors.neutral.white};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${props => props.theme.typography.fontWeight.bold};
    line-height: 1.2;
    margin-bottom: ${props => props.theme.spacing.md};
  }

  h1 {
    font-size: ${props => props.theme.typography.fontSize['5xl']};
    @media ${devices.tablet} {
      font-size: ${props => props.theme.typography.fontSize['4xl']};
    }
    @media ${devices.mobile} {
      font-size: ${props => props.theme.typography.fontSize['3xl']};
    }
  }

  h2 {
    font-size: ${props => props.theme.typography.fontSize['4xl']};
    @media ${devices.tablet} {
      font-size: ${props => props.theme.typography.fontSize['3xl']};
    }
    @media ${devices.mobile} {
      font-size: ${props => props.theme.typography.fontSize['2xl']};
    }
  }

  h3 {
    font-size: ${props => props.theme.typography.fontSize['3xl']};
    @media ${devices.tablet} {
      font-size: ${props => props.theme.typography.fontSize['2xl']};
    }
    @media ${devices.mobile} {
      font-size: ${props => props.theme.typography.fontSize['xl']};
    }
  }

  p {
    margin-bottom: ${props => props.theme.spacing.md};
    font-size: ${props => props.theme.typography.fontSize.md};
  }

  a {
    color: ${props => props.theme.colors.primary.main};
    text-decoration: none;
    transition: ${props => props.theme.transitions.fast};
    
    &:hover {
      color: ${props => props.theme.colors.primary.dark};
    }
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    font-size: inherit;
  }

  input, textarea {
    font-family: inherit;
    font-size: inherit;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.neutral.lightGray};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary.main};
    border-radius: ${props => props.theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.primary.dark};
  }

  ::selection {
    background: ${props => props.theme.colors.primary.light};
    color: ${props => props.theme.colors.neutral.white};
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${props => props.theme.spacing.lg};
    
    @media ${devices.tablet} {
      padding: 0 ${props => props.theme.spacing.md};
    }
  }

  .section {
    padding: ${props => props.theme.spacing['3xl']} 0;
    
    @media ${devices.tablet} {
      padding: ${props => props.theme.spacing['2xl']} 0;
    }
  }
`;