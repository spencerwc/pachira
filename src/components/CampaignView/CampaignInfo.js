import { useContext } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { HiHeart, HiUser } from 'react-icons/hi';
import styled from "styled-components/macro";
import { UserAuthContext } from "../../context/UserAuthContext";
import { db } from "../..";

const StyledCampaignInfo = styled.section`
    display: flex;
    flex-wrap: wrap;
    padding: 0 1rem;

    img {
        width: 100px;
        height: 100px;
        border-radius: 100%;
        margin: -3rem 0 0 0;
        background-color: #fff;
        border: 4px solid #fff;
    }

    span {
        display: flex;
        align-items: center;
        
        svg {
            margin-right: 0.25rem;
        }
        
        &:first-child {
            margin-right: 1rem;
        }
    }

    button {
        padding: 0 1rem;
        min-height: 40px;

        &:last-of-type {
            margin-left: 0.5rem;
        }
    }

    .campaign-details {
        display: flex;
    }

    .campaign-buttons {
        display: flex;
        align-items: center;
        width: 100%;
        margin-top: 0.5rem;
    }

    @media (min-width: 376px) {
        img {
            margin: -3rem 1rem 0 0;
        }
    }

    @media (min-width: 768px) {
        img {
            width: 120px;
            height: 120px;
            margin: -4rem 1rem 0 0.5rem;
        }

        .campaign-buttons {
            margin-left: auto;
            margin-top: 0;
            width: auto;
        }
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
        if (currentUser.uid) {
            handleFollow(currentUser.uid);
            updateFollowing();
        }
    }

    return (
        <StyledCampaignInfo>
            <img src={avatar} alt="" referrerPolicy="no-referrer"/>
            <div className="campaign-details">
                <span>
                    <HiHeart style={{color: 'red'}}/>{supportersLength} supporter{supportersLength !== 1 && 's'}
                </span>
                <span>
                    <HiUser style={{fontSize: '1.05rem'}} />{followers.length} follower{followers.length !== 1 && 's'}
                </span>
            </div>
            <div className="campaign-buttons">
                <button className="secondary" onClick={() => setDonationIsActive(true)}>Support</button>
                { currentUser && currentUser.uid !== uid &&
                    <button className="outline" onClick={handleFollowClick}>{currentUser.following.indexOf(uid) === -1 ? 'Follow' : 'Following'}</button>
                }
            </div>
        </StyledCampaignInfo>
    )
}

export default CampaignInfo;