import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.div`
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 1rem;
    
    > a {
        text-decoration: none;

        :visited {
            color: inherit;
        }
    }
`;

const CardBanner = styled.div`
    background-color: rgba(0, 0, 0, 0.1);
    height: 100px;
    border-radius: 1rem 1rem 0 0;
`;

const CardDetails = styled.div`
    padding: 1rem;
`;

const ViewPage = styled.div`
    border: none;
    border-radius: 0.7rem;
    padding: 0.5rem 1rem;
    background-color: #fff;
    cursor: pointer;
    text-align: center;
    width: fit-content;
    margin-top: 2rem;
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