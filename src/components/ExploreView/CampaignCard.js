import styled from "styled-components/macro";
import { Link } from "react-router-dom";

const StyledCard = styled.li`
    border: 1px solid var(--border-color);
    border-radius: 1.1rem;

    a {
        color: var(--font-color);
        text-decoration: none;

        :visited {
            color: var(--font-color);
        }
    }

    p {
        font-size: 0.9rem;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        flex-grow: 1;
    }

    .details {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        min-height: 130px;
    }

    .view-page {
        border: none;
        border-radius: 2rem;
        padding: 0.5rem 1rem;
        color: #fff;
        background-color: var(--secondary-color);
        font-weight: 500;
        width: fit-content;
        
        &:hover {
            background-color: var(--secondary-hover);
        }
    }
`;

const StyledBanner = styled.div`
    height: 150px;
    border-radius: 1rem 1rem 0 0;
    background-color: rgba(0, 0, 0, 0.05);
    background-image: url(${props => props.image});
    background-size: cover;
`;

const CampaignCard = ({id, image, name, summary}) => {
    const MAX_SUMMARY_LENGTH = 100;

    return (
        <StyledCard>
            <Link to={`../${id}`}>
                <StyledBanner image={image}/>
                <div className="details">
                    <strong style={{fontSize: '1.05rem'}}>{name}</strong>
                    {/* TODO: Revisit this */}

                    {summary.length > MAX_SUMMARY_LENGTH ? 
                        <p>{summary.slice(0, MAX_SUMMARY_LENGTH)}...</p> :
                        <p>{summary}</p> 
                    }
                    <div className="view-page">View Page</div>
                </div>
            </Link>
        </StyledCard>
    );
}

export default CampaignCard;