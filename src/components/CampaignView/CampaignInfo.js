import styled from "styled-components";

const Info = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0.5rem;
    margin: 0.5rem 0;

    @media(min-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`;

const Detail = styled.div`
    height: 100px;
    background-color: rgba(0, 0, 0, 0.05);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 1rem;
`;

const Value = styled.h3`
    font-size: 1.5rem;
    margin: 0;
`;

const CampaignInfo = ({supporters, followers, posts}) => {
    const supportersLength = Object.keys(supporters).length;
    return (
        <Info>
            <Detail>
                <Value>{supportersLength}</Value> supporter{supportersLength !== 1 && 's'}
            </Detail>
            <Detail>
                <Value>{followers.length}</Value> follower{followers.length !== 1 && 's'}
            </Detail>
            <Detail>
                <Value>{posts.length}</Value> post{posts.length !== 1 && 's'}
            </Detail>
        </Info>
    )
}

export default CampaignInfo;