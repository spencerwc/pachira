import styled from "styled-components";

const Banner = styled.div`
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-color: rgba(0, 0, 0, 0.05);
    background-size: cover;
    background-position: center;
    text-align: center;
    height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media(min-width: 768px) {
        height: 30vh;
        min-height: 350px;
        text-align: left;
        border-radius: 0 0 3rem 3rem;
    }
`;

const Details = styled.div`
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.8);
    color: #000;

    > p {
        margin-bottom: 0;
        margin-top: 0.5rem;
    }
    
    @media (min-width: 768px) {
        border-radius: 1rem;
        width: fit-content;
        max-width: 40%;
        margin-left: 1rem;
    }
`;

const Name = styled.h1`
    font-size: 1.7rem;
    margin: 0;
`;

const CampaignBanner = ({name, id, summary, image}) => {
    return (
        <Banner image={image}>
            <Details>
                <Name>{name ? name : id}</Name>
                {summary && <p>{summary}</p>}
            </Details>
        </Banner>
    );
}

export default CampaignBanner;