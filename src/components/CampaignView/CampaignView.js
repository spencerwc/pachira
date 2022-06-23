import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore"; 
import styled from "styled-components";
import CampaignBanner from "./CampaignBanner";
import CampaignInfo from "./CampaignInfo";
import CampaignGoal from './CampaignGoal';
import CampaignSupport from "./CampaignSupport";
import CampaignAbout from "./CampaignAbout";
import CampaignTopSupport from "./CampaignTopSupport";
import { db } from '../../index';

const CampaignContainer = styled.section`
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: 80px;
    padding: 0.5rem;
`;

const SectionName = styled.h2`
    font-size: 1.2rem;
    margin: 0.7rem 0;
`;

const CampaignSections = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0.5rem;
        
    @media(min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const CampaignView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [campaign, setCampaign] = useState();
    let { campaignName } = useParams();

    const getCampaign = async () => {
        const docRef = doc(db, "campaigns", campaignName);
        const docSnap = await getDoc(docRef);
        setCampaign(docSnap.data());
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        getCampaign();
    }, [campaignName]);

    if (!isLoading && campaign) {
        return (
            <CampaignContainer>
                <CampaignBanner 
                    name={campaign.name} 
                    summary={campaign.summary} 
                />
    
                <SectionName>Details</SectionName>
                <CampaignInfo 
                    supporters={campaign.supporters}
                    followers={campaign.followers}
                    posts={campaign.posts} 
                />

                <CampaignSections>
                    {campaign.about && (
                        <div>
                            <SectionName>About</SectionName>
                            <CampaignAbout about={campaign.about} />
                        </div>
                    )}
                    <div>
                        <SectionName>Make a Donation</SectionName>
                        <CampaignSupport  />
                    </div>
                    {campaign.goal && (
                        <div>
                            <SectionName>Support</SectionName>
                            <CampaignGoal goal={campaign.goal} />
                        </div>
                    )}
                    {campaign.supporters.length > 0 && (
                        <div>
                            <SectionName>Top Supporters</SectionName> 
                            <CampaignTopSupport supporters={campaign.supporters} />
                        </div>
                    )}
                </CampaignSections>
            </CampaignContainer>
        );
    }
    else {
        return <div>Loading</div>
    }
}

export default CampaignView;