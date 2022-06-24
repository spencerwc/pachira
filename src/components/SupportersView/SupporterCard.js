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

const SupporterCard = ({id, name, donationTotal}) => {
    return (
        <Card>
            <Link to={`../${id}`}>
                <CardBanner />
                <CardDetails>
                    <h2>{name}</h2>
                    <h3>${donationTotal.toLocaleString()}</h3>
                </CardDetails>
            </Link>
        </Card>
    );
}

export default SupporterCard;