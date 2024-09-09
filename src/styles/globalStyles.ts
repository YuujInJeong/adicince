// src/styles/globalStyles.ts
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Noto Sans KR', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: bold;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;