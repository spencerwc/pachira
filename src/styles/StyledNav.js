import styled from "styled-components/macro";

const StyledNav = styled.nav`
    background-color: #fff;
    position: fixed; 
    bottom: 0;
    width: 100%;
    min-height: 60px;
    padding: 0.5rem 1rem;
    display: flex;
    box-shadow: 0 -3px 10px rgba(0,0,0,0.05), 0 -3px 10px rgba(0,0,0,0.05);

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-grow: 1;
        justify-content: space-around;
        align-items: center;
    }

    span {
        display: none;
    }

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        
        &:hover, &:focus {
            color: var(--secondary-hover);
        }
    }

    svg {
        font-size: 1.6rem;
    }

    .logo, .register-link {
        display: none;
    }

    .user {
        display: flex;
        align-items: center;
        cursor: pointer;

        img {
            border-radius: 100%;
            width: 45px;
            height: 45px;
            background-color: var(--border-color);
        }
    }

    @media(min-width: 768px) {
        position: fixed;
        top: 0;
        bottom: auto;
        font-weight: bold;
        box-shadow: 0 3px 10px rgba(0,0,0,0.05), 0 3px 10px rgba(0,0,0,0.05);

        ul {
            justify-content: space-between;
            flex-grow: 0.5;
        }

        svg {
            display: none;
        }

        span {
            display: inline-block;
            font-size: 1.1rem;
        }

        img {
            width: 50px;
            height: 50px;
        }

        .logo {
            display: flex;
            flex-grow: 1;
            align-items: center;
        }

        .register-link {
            display: inline-block;
            background-color: var(--secondary-color);
            color: #fff;
            padding: 0.5rem 1rem;
            border-radius: 2rem;

            &:hover {
                background-color: var(--secondary-hover);
            }
        }
    }
`;

export default StyledNav;