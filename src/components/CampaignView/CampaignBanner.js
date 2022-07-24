import styled from "styled-components/macro";

const StyledBanner = styled.div`
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

    h1 {
        font-size: 1.7rem;
        margin: 0;
    }

    .banner-details {
        padding: 1rem;
        background-color: rgba(255, 255, 255, 0.8);
        color: #000;

        p {
            margin-bottom: 0;
            margin-top: 0.5rem;
        }
    }

    @media(min-width: 768px) {
        height: 30vh;
        min-height: 350px;
        text-align: left;
        border-radius: 0 0 3rem 3rem;

        .banner-details {
            border-radius: 1rem;
            width: fit-content;
            max-width: 40%;
            margin-left: 1rem;
        }
    }
`;

const CampaignBanner = ({name, id, summary, image}) => {
    return (
        <StyledBanner image={image}>
            <div className="banner-details">
                <h1>{name ? name : id}</h1>
                {summary && <p>{summary}</p>}
            </div>
        </StyledBanner>
    );
}

export default CampaignBanner;