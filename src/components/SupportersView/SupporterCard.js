import styled from "styled-components/macro";
import { Link } from "react-router-dom";

const Card = styled.li`
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0;

    &:first-of-type {
        padding-top: 0;
    }
   
    &:last-of-type {
        border: none;
        padding-bottom: 0;
    }

    a {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    img {
        height: 60px;
        width: 60px;
        border-radius: 100%;
        margin-right: 1rem;
        background-color: rgba(0, 0, 0, 0.05);
    }
`;

const SupporterCard = ({id, avatar, donationTotal}) => {
    return (
        <Card>
            <Link to={`../${id}`}>
                <img src={avatar} alt="avatar" />
                <strong style={{marginRight: 'auto'}}>{id}</strong>
                <strong>${donationTotal.toLocaleString()}</strong>
            </Link>
        </Card>
    );
}

export default SupporterCard;