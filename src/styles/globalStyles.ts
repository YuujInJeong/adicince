// src/styles/globalStyles.ts
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

  :root {
    --primary-color: #6C63FF;
    --secondary-color: #3F3D56;
    --background-color: #F9FAFB;
    --text-color: #2D3748;
    --accent-color: #F6AD55;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    margin-bottom: 1rem;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--accent-color);
    }
  }

  button {
    cursor: pointer;
    border: none;
    background-color: var(--primary-color);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--accent-color);
    }
  }
`;

export default GlobalStyle;