import styled from "styled-components";

const Banner = styled.section`
    background-image: ${props => props.image};
    background-color: rgba(0, 0, 0, 0.05);
    text-align: center;
    height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    border-radius: 1rem;

    @media(min-width: 768px) {
        text-align: left;
    }
`;

const Title = styled.h1`
    font-size: 1.7rem;
    margin: 0;
`;

const CampaignBanner = ({title, summary, image}) => {
    return (
        <Banner image={image}>
            <Title>{title}</Title>
            <p>{summary}</p>
        </Banner>
    );
}

export default CampaignBanner;