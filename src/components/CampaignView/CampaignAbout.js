import styled from "styled-components";

const About = styled.section`
    background-color: rgba(0, 0, 0, 0.05);
    padding: 1rem;
    border-radius: 1rem;

    > p {
        margin: 0 auto;
    }
`;

const CampaignAbout = ({about}) => {
    if (about) {
        return (
            <About>
                {about}
            </About>
        );
    }
}

export default CampaignAbout;