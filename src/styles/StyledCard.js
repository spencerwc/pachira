import styled from "styled-components/macro";

const StyledCard = styled.div`
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 0.7rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04), 0 3px 10px rgba(0, 0, 0, 0.04);

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
`;

export default StyledCard;