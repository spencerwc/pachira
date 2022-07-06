import styled from 'styled-components';
import error from './error.png';

const ErrorContainer = styled.section`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    padding: 1rem;
`;

const ErrorMessage = styled.div`
    > img {
        width: 100%;

        @media (min-width: 768px) {
            max-width: 700px;
        }
    }
`;

const Error = () => {
    return (
        <ErrorContainer>
            <ErrorMessage>
                <h1>Oops! Something went wrong.</h1>
                <img src={error} alt="" />
                <h2>Try again.</h2>
            </ErrorMessage>
        </ErrorContainer>
    );
}

export default Error;