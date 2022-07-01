import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../../index";
import styled from "styled-components";
import SupporterCard from "./SupporterCard";

const SupportersContainer = styled.section`
    max-width: 800px;
    margin: 0.5rem auto;
    margin-bottom: var(--bottom-margin);
    padding: 1rem;

    @media (min-width: 768px) {
        margin-top: 1rem;
    }
`;

const Supporters = styled.ul`
    list-style: none;
    margin: 0;
    padding: 1rem;
    border: 2px solid var(--border-color);
    border-radius: 0.7rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Heading = styled.h1`
    margin-top: 0;
`;

const SupportersView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [campaign, setCampaign] = useState();
    const [supporters, setSupporters] = useState(null);
    const [error, setError] = useState(null);
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

    const getData = async () => {
        setIsLoading(true);
        const campaignData = await getCampaignData();
        
        if (campaignData) {
            const supporterData = await getSupporterData(campaignData.supporters);
            setCampaign(campaignData);
            setSupporters(supporterData);
        }
        else {
            setError('Campaign not found');
        }
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        getData();
    }, [campaignName]);

    if (!isLoading && campaign) {
        const supportersData = Object.values(supporters).sort((a, b) => b.donationTotal - a.donationTotal);

        return (
            <SupportersContainer>
                <Heading>
                    {campaign.name ? campaign.name : campaign.id}'s Supporters
                </Heading>
                <Supporters>
                    {supportersData.map(supporter => 
                        <SupporterCard 
                            key={supporter.uid}
                            avatar={supporter.avatar}
                            id={supporter.displayName} 
                            donationTotal={supporter.donationTotal} 
                        />
                    )}
                </Supporters>
            </SupportersContainer>
        );
    }
    else {
        return <div>Loading</div>
    }
}

export default SupportersView;