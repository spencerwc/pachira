import styled from "styled-components";

const Banner = styled.div`
    background-image: ${props => props.image};
    background-color: rgba(0, 0, 0, 0.05);
    text-align: center;
    height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media(min-width: 768px) {
        height: 30vh;
        text-align: left;
        border-radius: 0 0 3rem 3rem;
    }
`;

const Details = styled.div`
    padding: 1rem;
    
    @media (min-width: 768px) {
        max-width: 40%;
        margin-left: 1rem;
    }
`;

const Name = styled.h1`
    font-size: 1.7rem;
    margin: 0;
`;

const CampaignBanner = ({name, summary, image}) => {
    return (
        <Banner image={image}>
            <Details>
                <Name>{name}</Name>
                <p>{summary}</p>
            </Details>
        </Banner>
    );
}

export default CampaignBanner;