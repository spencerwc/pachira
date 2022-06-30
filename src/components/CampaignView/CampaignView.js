import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import styled from "styled-components";
import CampaignBanner from "./CampaignBanner";
import CampaignInfo from "./CampaignInfo";
import CampaignGoal from './CampaignGoal';
import CampaignSupport from "./CampaignSupport";
import CampaignAbout from "./CampaignAbout";
import CampaignTopSupport from "./CampaignTopSupport";
import CampaignDonations from './CampaignDonations';
import { db } from '../../index';

const CampaignContainer = styled.section`
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: 80px;
`;

const CampaignSections = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    padding: 0 1rem;
        
    @media(min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const SectionColumn = styled.div``;

const SectionName = styled.h2`
    font-size: 1.2rem;
    margin: 0.7rem 0;
`;

const CampaignView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [campaign, setCampaign] = useState(null);
    const [donations, setDonations] = useState([]);
    const [supporters, setSupporters] = useState([]);
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
        setError({code: 'Campaign not found'});
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

    const handleDonation = async (newDonation) => {
        setIsLoading(true);
        await updateDonations(newDonation);
        await updateSupporters(newDonation.uid, newDonation.donationAmount);
        getData();
    }

    useEffect(() => {
        setIsLoading(true);
        getData();
    }, [campaignName]);

    if (!isLoading && campaign) {
        return (
            <CampaignContainer>
                <CampaignBanner 
                    name={campaign.name} 
                    summary={campaign.summary} 
                />
                <CampaignInfo 
                    supporters={campaign.supporters}
                    followers={campaign.followers}
                    posts={campaign.posts} 
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
                            <CampaignTopSupport supporters={supporters} />
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
        );
    }
    else if (!isLoading && error) {
        return <div>Not found</div>
    }
    else {
        return <div>Loading</div>
    }
}

export default CampaignView;