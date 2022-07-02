import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.li`
    border: 2px solid var(--border-color);
    border-radius: 1.1rem;

    :hover {
        border-color: var(--border-hover);
    }
    
    > a {
        color: var(--font-color);
        text-decoration: none;

        :visited {
            color: var(--font-color);
        }
    }
`;

const CardBanner = styled.div`
    height: 150px;
    border-radius: 1rem 1rem 0 0;
    background-color: rgba(0, 0, 0, 0.05);
    background-image: url(${props => props.image});
    background-size: cover;
`;

const CardDetails = styled.div`
    padding: 1rem;

    > p {
        font-size: 0.9rem;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
    }
`;

const ViewPage = styled.div`
    border: none;
    border-radius: 0.7rem;
    padding: 0.5rem 1rem;
    color: #fff;
    background-color: var(--secondary-color);
    font-weight: 500;
    font-size: 0.9rem;
    width: fit-content;
    :hover {
        background-color: var(--secondary-hover);
    }
`;

const CampaignCard = ({id, image, name, summary}) => {
    const MAX_SUMMARY_LENGTH = 80;

    return (
        <Card>
            <Link to={`../${id}`}>
                <CardBanner image={image}/>
                <CardDetails>
                    <strong>{name}</strong>
                    {/* TODO: Revisit this */}

                    {summary.length > MAX_SUMMARY_LENGTH ? 
                        <p>{summary.slice(0, MAX_SUMMARY_LENGTH)}...</p> :
                        <p>{summary}</p> 
                    }
                    <ViewPage>View Page</ViewPage>
                </CardDetails>
            </Link>
        </Card>
    );
}

export default CampaignCard;