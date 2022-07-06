import styled from "styled-components";

const About = styled.section`
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid var(--border-color);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04), 0 3px 10px rgba(0, 0, 0, 0.04);

    > p {
        margin: 0 auto;
    }
`;

const CampaignAbout = ({about}) => {
    return (
        <About>
            {about ? about : `We don't know much about them yet, but we're sure they are great!`}
        </About>
    );
}

export default CampaignAbout;