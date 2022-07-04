import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import styled from "styled-components";
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

const CampaignContainer = styled.section`
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: var(--bottom-margin);
    margin-top: calc(var(--top-margin) - 1rem);

    @media (min-width: 768px) {
        margin-top: 0;
    }
`;

const CampaignSections = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    padding: 0 1rem;
    margin-top: 1rem;
        
    @media(min-width: 768px) {
        grid-template-columns: 1fr 1fr;
        margin-top: 0;
    }
`;

const SectionColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const SectionName = styled.h2`
    margin: 0.7rem 0;
`;

const SupportContainer = styled.div`
    height: calc(100vh + 140px);
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: -66px;
    display: ${props => props.active === true ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > form {
        min-width: 300px;
        background-color: #fff;
    }

    @media (min-width: 768px) {
        height: calc(100vh + 80px);
    }
`;

const CloseButton = styled.button`
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    color: #fff;
    display: flex;
    align-items: center;
    margin-left: 100%;
    margin-bottom: 0.5rem;

    > svg {
        font-size: 1.5rem;
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

    const updateDonations = async (newDonation) => {
        const docRef = doc(db, 'campaigns', campaignName);
        const docSnap = await getDoc(docRef);
        const donations = docSnap.data().donations;
        donations.push(newDonation);
        
        // Update doc with new changes
        await updateDoc(docRef, {
            donations: donations
        });
    }

    const updateSupporters = async (supporterId, donationAmount) => {
        const docRef = doc(db, 'campaigns', campaignName);
        const docSnap = await getDoc(docRef);
        const supporters = docSnap.data().supporters;

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

        await updateDoc(docRef, {
            supporters: supporters
        });
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
        await updateDonations(newDonation);
        await updateSupporters(newDonation.uid, newDonation.donationAmount);
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
                <SupportContainer active={donationIsActive} >
                    <div style={{minWidth: '180px'}}>
                       <CloseButton onClick={() => setDonationIsActive(false)}><MdClose /> Close</CloseButton>
                    </div>
                    <CampaignSupport handleDonation={handleDonation} />
                </SupportContainer>

                <CampaignContainer>
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

                    <CampaignSections>
                        <SectionColumn>
                            <div>
                                <SectionName>About</SectionName>
                                <CampaignAbout about={campaign.about} />
                            </div>

                            <div>
                                <SectionName>Support</SectionName>
                                <CampaignSupport handleDonation={handleDonation} />
                            </div>
                        </SectionColumn>

                        <SectionColumn>
                            {campaign.goal && 
                                <div>
                                    <SectionName>Goal</SectionName>
                                    <CampaignGoal goal={campaign.goal} />
                                </div>
                            }
                            
                            <div>
                                <SectionName>Top Supporters</SectionName> 
                                <CampaignTopSupport supporters={supporters} setDonationIsActive={setDonationIsActive} />
                            </div>
                        
                            {campaign.donations.length > 0 && (
                                <div>
                                    <SectionName>Recent Donations</SectionName>
                                    <CampaignDonations donations={donations} />
                                </div>
                            )}
                        </SectionColumn>
                    </CampaignSections>
                </CampaignContainer>
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