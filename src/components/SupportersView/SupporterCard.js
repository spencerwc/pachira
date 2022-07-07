import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.li`
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 0.5rem;
   
    :last-of-type {
        border: none;
        padding-bottom: 0;
    }

    > a {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        text-decoration: none;
        color: var(--font-color);

        :visited {
            color: var(--font-color);
        }
    }
`;

const Avatar = styled.img`
    height: 60px;
    width: 60px;
    border-radius: 100%;
    margin-right: 1rem;
    background-color: rgba(0, 0, 0, 0.05);
`;

const SupporterCard = ({id, avatar, donationTotal}) => {
    return (
        <Card>
            <Link to={`../${id}`}>
                <Avatar src={avatar} />
                <strong style={{marginRight: 'auto'}}>{id}</strong>
                <strong>${donationTotal.toLocaleString()}</strong>
            </Link>
        </Card>
    );
}

export default SupporterCard;