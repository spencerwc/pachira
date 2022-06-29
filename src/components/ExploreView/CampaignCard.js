import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.li`
    border: 2px solid var(--border-color);
    border-radius: 1rem;

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
`;

const CardDetails = styled.div`
    padding: 1rem;
`;

const ViewPage = styled.div`
    border: none;
    border-radius: 0.7rem;
    padding: 0.5rem 1rem;
    color: #fff;
    background-color: var(--secondary-color);
    font-weight: bold;
    width: fit-content;
    :hover {
        background-color: var(--secondary-hover);
    }
`;

const CampaignCard = ({id, name, summary}) => {
    const MAX_SUMMARY_LENGTH = 80;

    return (
        <Card>
            <Link to={`../${id}`}>
                <CardBanner />
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