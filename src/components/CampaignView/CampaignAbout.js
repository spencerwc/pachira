import styled from "styled-components";

const About = styled.section`
    background-color: rgba(0, 0, 0, 0.05);
    padding: 1rem;
    border-radius: 1rem;

    @media(min-width: 768px) {
        margin-right: 0.5rem;
    }

    > p {
        margin: 0 auto;
    }
`;

const CampaignAbout = ({about}) => {
    return (
        <About>
            <p>
                {about}
            </p>
        </About>
    );
}

export default CampaignAbout;