import styled from 'styled-components/macro';

const StyledForm = styled.section`
    margin: 0 auto;
    padding: 2rem 0;
    text-align: center;
    max-width: 400px;

    @media (min-width: 768px) {
        padding: 150px 0;
    }

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