import styled from 'styled-components/macro';
import error from './error.png';

const StyledError = styled.main`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    padding-top: 150px;
    padding-bottom: 50px;
`;

const ErrorMessage = styled.div`
    img {
        width: 100%;

        @media (min-width: 768px) {
            max-width: 700px;
        }
    }
`;

const Error = () => {
    return (
        <StyledError>
            <ErrorMessage>
                <h1>Oops! Something went wrong.</h1>
                <img src={error} alt="" />
                <h2>Try again.</h2>
            </ErrorMessage>
        </StyledError>
    );
}

export default Error;