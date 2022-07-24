import { createGlobalStyle } from "styled-components/macro";
import "@fontsource/noto-sans/400.css";
import "@fontsource/noto-sans/600.css";

const GlobalStyle = createGlobalStyle`
    :root {
        --primary-color: #ffd561;
        --primary-hover: #ffc72e;
        --secondary-color: #3064F3;
        --secondary-hover: #4b78f5; 

        --border-color: rgba(0, 0, 0, 0.12);
        --border-hover: rgba(0, 0, 0, 0.24);

        --font-color: #575757;

        --top-margin: 5rem;
        --bottom-margin: 100px;
    }   

    html {
        box-sizing: border-box;
        font-size: 16px;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
        font-family: 'Noto Sans', sans-serif;
    }

    body {
        margin: 0;
        padding: 0;
        width: 100%;
        max-width: 100%;
        min-height: 100%;
        overflow-x: hidden;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        color: var(--font-color);
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 0;
    }

    h1 {
        font-size: 1.5rem;
    } 

    h2 {
        font-size: 1.25rem;
    }

    p {
        margin: 0;
    }

    a,
    button {
        transition: all 0.3s ease;
        color: inherit;
    }

    a {
        text-decoration: none;
    }

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        font-size: 1rem;
        font-family: inherit;
        font-weight: bold;
        min-height: 45px;
        cursor: pointer;
        border-radius: 2rem;

        svg {
            font-size: 1.1rem;
            margin-right: 0.3rem;
        }
    }

    .outline {
        border: 2px solid var(--border-color);
        padding: 0.5rem;
        background-color: transparent;
        color: var(--font-color);

        &:hover {
            border-color: var(--border-hover);
        }
    }

    .secondary {
        border: 0;
        background-color: var(--secondary-color);
        color: #fff;

        &:hover, &:focus {
            background-color: var(--secondary-hover);
            outline: 0;
        }
    }

    img {
        width: 100%;
        max-width: 100%;
        vertical-align: middle;
    }

    main {
        position: relative;
        margin: 0 auto;
        padding: 1rem;
        min-height: 100vh;
    }

    input, textarea {
        font-size: 1rem;
    }

    nav {
        z-index: 10;
    }
`;

export default GlobalStyle;