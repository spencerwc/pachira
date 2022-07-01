import styled from "styled-components";

const Info = styled.section`
    display: flex;
    flex-wrap: wrap;
    padding: 0 1rem;
`;

const Avatar = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 100%;
    margin: -3rem 1rem 0 0;
    background-color: #fff;
    border: 4px solid #fff;

    @media (min-width: 768px) {
        width: 120px;
        height: 120px;
        margin-left: 0.5rem;
        margin-top: -4rem;
    }
`;

const Details = styled.div`
    display: flex;
    align-items: center;
`;

const Detail = styled.span`
    :first-child {
        margin-right: 1rem;
    }
`;

const Buttons = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 0.5rem;

    @media (min-width: 768px) {
        margin-left: auto;
        margin-top: 0;
        width: auto;
    }
`;

const SupportButton = styled.button`
    border: none;
    border-radius: 2rem;
    padding: 0 1rem;
    color: #fff;
    background-color: var(--secondary-color);
    font-weight: bold;
    min-height: 40px;
    cursor: pointer;
    flex-grow: 1;
    margin-right: 0.5rem;
    :hover {
        background-color: var(--secondary-hover);
    }

    @media (min-width: 768px) {
        width: auto;
    }
`;

const FollowButton = styled.button`
    border: 2px solid var(--border-color);
    border-radius: 2rem;
    padding: 0 1rem;
    background-color: transparent;
    font-weight: bold;
    min-height: 40px;
    cursor: pointer;
    :hover {
        border-color: var(--border-hover);
    }
`;

const CampaignInfo = ({avatar, supporters, followers, setDonationIsActive}) => {
    const supportersLength = Object.keys(supporters).length;
    return (
        <Info>
            <Avatar src={avatar} alt="" referrerPolicy="no-referrer"/>
            <Details>
                <Detail>
                    {supportersLength} supporter{supportersLength !== 1 && 's'}
                </Detail>
                <Detail>
                    {followers.length} follower{followers.length !== 1 && 's'}
                </Detail>
            </Details>
            <Buttons>
                {/* TODO: Add functionality later */}
                <SupportButton onClick={() => setDonationIsActive(true)}>Support</SupportButton>
                <FollowButton>Follow</FollowButton>
            </Buttons>
        </Info>
    )
}

export default CampaignInfo;