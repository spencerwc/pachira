import styled from "styled-components";

const Info = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

const Detail = styled.div`
    width: 100%;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.05);
    margin: 0.5rem 0;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 1rem;

    @media(min-width: 768px) {
        width: 20%;
        margin: 0.5rem;
    }
`;

const Value = styled.h2`
    font-size: 1.5rem;
`;

const CampaignInfo = ({supporters, followers, posts}) => {
    return (
        <Info>
            <Detail>
                <Value>{supporters.length}</Value> supporter{supporters.length !== 1 && 's'}
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