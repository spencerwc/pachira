import styled from 'styled-components';
import pageNotFound from './undraw_page_not_found.svg';

const ErrorContainer = styled.section`
    display: flex;
    flex-direction: column;
    text-align: center;
    height: calc(100vh - 2rem);
    justify-content: center;
    padding: 1rem;

    @media (min-width: 768px) {
        height: calc(100vh - 2rem - 66px);
    }
`;

const ErrorMessage = styled.div`
    > img {
        width: 100%;
        max-width: 350px;
        margin: 1.5rem auto;

        @media (min-width: 768px) {
            max-width: 500px;
        }
    }
`;

const Error = () => {
    return (
        <ErrorContainer>
            <ErrorMessage>
                <h1>Oops! Something went wrong.</h1>
                <img src={pageNotFound} alt="" />
                <h2>Try again.</h2>
            </ErrorMessage>
        </ErrorContainer>
    );
}

export default Error;