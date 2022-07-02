import { useContext } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { HiHeart, HiUser } from 'react-icons/hi';
import styled from "styled-components";
import { UserAuthContext } from "../../context/UserAuthContext";
import { db } from "../..";

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
    margin-left: 0.5rem;
    background-color: transparent;
    color: var(--font-color);
    font-weight: bold;
    min-height: 40px;
    cursor: pointer;
    :hover {
        border-color: var(--border-hover);
    }
`;

const CampaignInfo = ({avatar, supporters, followers, handleFollow, setDonationIsActive, uid}) => {
    const {currentUser} = useContext(UserAuthContext);
    const supportersLength = Object.keys(supporters).length;

    const updateFollowing = async () => {
        const docRef = doc(db, 'users', currentUser.uid);
        const following = currentUser.following; 
        const followingIndex = currentUser.following.indexOf(uid);

        if (followingIndex === -1) {
            following.push(uid);
        }
        else {
            following.splice(followingIndex, 1);
        }

        await updateDoc(docRef, {
            following: following
        });

    }

    const handleFollowClick = () => {
        handleFollow(currentUser.uid);
        updateFollowing();
    }

    return (
        <Info>
            <Avatar src={avatar} alt="" referrerPolicy="no-referrer"/>
            <Details>
                <Detail>
                    <HiHeart style={{color: 'red'}}/> {supportersLength} supporter{supportersLength !== 1 && 's'}
                </Detail>
                <Detail>
                    <HiUser style={{fontSize: '1.05rem',color: 'var(--font-color)'}} /> {followers.length} follower{followers.length !== 1 && 's'}
                </Detail>
            </Details>
            <Buttons>
                {/* TODO: Add functionality later */}
                <SupportButton onClick={() => setDonationIsActive(true)}>Support</SupportButton>
                {currentUser.uid !== uid &&
                    <FollowButton onClick={handleFollowClick}>{currentUser.following.indexOf(uid) === -1 ? 'Follow' : 'Following'}</FollowButton>
                }
            </Buttons>
        </Info>
    )
}

export default CampaignInfo;