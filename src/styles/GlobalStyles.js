import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Helvetica Neue', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  * {
    box-sizing: border-box;
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textLight};
    cursor: pointer;
  }

  input {
    padding: 10px;
    border: 2px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
  }
`;

export default GlobalStyles;
