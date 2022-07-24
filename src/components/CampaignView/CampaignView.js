import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import styled from "styled-components/macro";
import { MdClose } from 'react-icons/md';
import CampaignBanner from "./CampaignBanner";
import CampaignInfo from "./CampaignInfo";
import CampaignGoal from './CampaignGoal';
import CampaignSupport from "./CampaignSupport";
import CampaignAbout from "./CampaignAbout";
import CampaignTopSupport from "./CampaignTopSupport";
import CampaignDonations from './CampaignDonations';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import { db } from '../../index';

const StyledCampaign = styled.main`
    max-width: 1000px;
    margin: 0 auto;
    padding: 50px 0 100px 0;

    h2 {
        margin: 0.7rem 0;
    }

    .sections {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
        padding: 0 1rem;
        margin-top: 1rem;
    }

    .section-column {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    @media(min-width: 768px) {
        .sections {
            grid-template-columns: 1fr 1fr;
            margin-top: 0;
        }
    }
`;

const StyledSupportOverlay = styled.div`
    height: calc(100vh + 140px);
    width: 100vw;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: -66px;
    display: ${props => props.active === true ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;

    form {
        width: 100%;
        max-width: 350px;
        background-color: #fff;
    }

    .close-button {
        background: none;
        outline: none;
        border: none;
        cursor: pointer;
        color: #fff;
        display: flex;
   
        svg {
            font-size: 1.5rem;
        }
    }

    @media (min-width: 768px) {
        height: calc(100vh + 80px);

        form {
            max-width: 400px;
        }
    }
`;

const CampaignView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [campaign, setCampaign] = useState(null);
    const [donations, setDonations] = useState([]);
    const [supporters, setSupporters] = useState([]);
    const [donationIsActive, setDonationIsActive] = useState(false);
    let { campaignName } = useParams();

    const getCampaignData = async () => {
        const docRef = doc(db, "campaigns", campaignName);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    }

    const getUserData = async (userId) => {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    }

    const getSupporterData = async (supporters) => {
        const supportersArr = Object.values(supporters);
        const supporterData = await Promise.all(supportersArr.map(async supporter => {
            const userData = await getUserData(supporter.uid);
            return {...userData, ...supporter};
        }));
        return supporterData;
    }

    const getDonationData = async (donations) => {
        const donationData = await Promise.all(donations.map(async donation => {
            const userData = await getUserData(donation.uid);
            return {...userData, ...donation};
        }));
        return donationData;
    }

    const getData = async () => {
        setIsLoading(true);
        const campaignData = await getCampaignData();
        
        if (campaignData) {
            const supporterData = await getSupporterData(campaignData.supporters);
            const donationData = await getDonationData(campaignData.donations);
            
            setCampaign(campaignData);
            setSupporters(supporterData);
            setDonations(donationData);
        }
        else {
            setError('Campaign not found.');
        }
        setIsLoading(false);
    }

    const updateDonations = (currentDonations, newDonation) => {
        const donations = currentDonations;
        donations.push(newDonation);
        return donations;
    }

    const updateSupporters = (currentSupporters, supporterId, donationAmount) => {
        const supporters = currentSupporters;

        // Check for existing donations
        if (supporters.hasOwnProperty(supporterId)) {
            supporters[supporterId].donationTotal += donationAmount; 
        }
        else {
            const newSupporter = {
                uid: supporterId,
                donationTotal: donationAmount
            }
            supporters[supporterId] = newSupporter;
        }
        return supporters;
    }

    const updateGoal = (currentGoal, donationAmount) => {
        let newGoal = null;

        if (currentGoal) {
            newGoal = currentGoal;
            const newFunding = currentGoal.currentFunding + donationAmount;
            newGoal.currentFunding = newFunding;
        }
        return newGoal;
    }

    const updateFollowers = async (followerId) => {
        const docRef = doc(db, 'campaigns', campaignName);
        const docSnap = await getDoc(docRef);
        const followers = docSnap.data().followers;
        const followerIndex = followers.indexOf(followerId);

        // If user doesn't follow, add to followers
        if (followerIndex === -1) {
            followers.push(followerId);
        }
        else {
            // If user already follows, unfollow
            followers.splice(followerIndex, 1);
        }

        await updateDoc(docRef, {
            followers: followers
        });
    }

    const handleFollow = async (followerId) => {
        setIsLoading(true);
        await updateFollowers(followerId);
        setDonationIsActive(false);
        getData();
    }

    const handleDonation = async (newDonation) => {
        setIsLoading(true);
        
        const docRef = doc(db, 'campaigns', campaignName);
        const docSnap = await getDoc(docRef);
        const campaignData = docSnap.data();
        const newDonations = updateDonations(campaignData.donations, newDonation);
        const newSupporters = updateSupporters(campaignData.supporters, newDonation.uid, newDonation.donationAmount);
        const newGoal = updateGoal(campaignData.currentGoal, newDonation.donationAmount);
    
        await updateDoc(docRef, {
            donations: newDonations,
            currentGoal: newGoal,
            supporters: newSupporters,
        });
        
        // Set false to hide modal if opened
        setDonationIsActive(false);
        getData();
    }

    useEffect(() => {
        setIsLoading(true);
        getData();
    }, [campaignName]);

    useEffect(() => {
        if (donationIsActive) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'unset';
        }
    }, [donationIsActive]);

    if (!isLoading && campaign) {
        return (
            <>
                <StyledSupportOverlay active={donationIsActive} >
                    <div style={{minWidth: '180px'}}>
                       <button className="close-button" onClick={() => setDonationIsActive(false)}><MdClose /> Close</button>
                    </div>
                    <CampaignSupport handleDonation={handleDonation} />
                </StyledSupportOverlay>

                <StyledCampaign>
                    <CampaignBanner 
                        name={campaign.name}
                        id={campaign.id}
                        summary={campaign.summary}
                        image={campaign.bannerImage} 
                    />
                    <CampaignInfo 
                        avatar={campaign.avatar}
                        supporters={campaign.supporters}
                        followers={campaign.followers}
                        handleFollow={handleFollow}
                        posts={campaign.posts} 
                        setDonationIsActive={setDonationIsActive}
                        uid={campaign.uid}
                    />

                    <div className="sections">
                        <div className="section-column">
                            <div>
                                <h2>About</h2>
                                <CampaignAbout about={campaign.about} />
                            </div>

                            <div>
                                <h2>Support</h2>
                                <CampaignSupport handleDonation={handleDonation} />
                            </div>
                        </div>

                        <div className="section-column">
                            {campaign.currentGoal.name && 
                                <div>
                                    <h2>Current Goal</h2>
                                    <CampaignGoal goal={campaign.currentGoal} setDonationIsActive={setDonationIsActive} />
                                </div>
                            }
                            
                            <div>
                                <h2>Top Supporters</h2> 
                                <CampaignTopSupport supporters={supporters} setDonationIsActive={setDonationIsActive} />
                            </div>
                        
                            {campaign.donations.length > 0 && (
                                <div>
                                    <h2>Recent Donations</h2>
                                    <CampaignDonations donations={donations} />
                                </div>
                            )}
                        </div>
                    </div>
                </StyledCampaign>
            </>
        );
    }
    else if (!isLoading && error) {
        return <Error />;
    }
    else {
        return <Loader />;
    }
}

export default CampaignView;