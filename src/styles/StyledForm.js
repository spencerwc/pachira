import styled from 'styled-components/macro';

const StyledForm = styled.section`
    margin: 1rem auto;
    padding: 1rem;
    text-align: center;
    max-width: 400px;
    margin-bottom: var(--bottom-margin);

    img {
        max-width: 100px;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        input {
            margin: 0.5rem 0;
            border-radius: 0.5rem;
            padding: 0.5rem;
            border: 1px solid var(--border-color);
            
            &:focus {
                outline: none;
                border-color: var(--border-hover);
            }
        }
    }

    h1, p {
        margin: 2rem auto;
    }

    a {
        &:hover {
            color: var(--secondary-color);
        }
    }

    .error-message {
        color: red;
        margin: 0;
        animation: fadeIn 1s;

        svg {
            margin-right: 0.3rem;
        }

        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
    }
`;

export default StyledForm;