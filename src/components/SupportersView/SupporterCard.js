import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.li`
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 0.5rem;
   
    :last-of-type {
        border: none;
        padding-bottom: 0;
    }

    > a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: var(--font-color);

        :visited {
            color: var(--font-color);
        }
    }
`;

const Avatar = styled.div`
    height: 60px;
    width: 60px;
    border-radius: 100%;
    margin-right: 1rem;
`;

const CardDetails = styled.div`
    padding: 1rem;
`;

const SupporterCard = ({id, donationTotal}) => {
    return (
        <Card>
            <Link to={`../${id}`}>
                <Avatar>
                    <img src="" alt="" />
                </Avatar>
                <strong style={{marginRight: 'auto'}}>{id}</strong>
                <strong>${donationTotal.toLocaleString()}</strong>
            </Link>
        </Card>
    );
}

export default SupporterCard;