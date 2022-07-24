import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../../index";
import styled from "styled-components/macro";
import StyledCard from "../../styles/StyledCard";
import SupporterCard from "./SupporterCard";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

const StyledSupporters = styled.main`
    padding: 100px 1rem;
    max-width: 900px;

    @media (min-width: 768px) {
        padding: 110px 1rem;
    }

    h1 {
        margin-bottom: 1.5rem;
    }
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
            <StyledSupporters>
                <section>
                    <h1>
                        {campaign.name ? campaign.name : campaign.id}'s Supporters
                    </h1>
                    <StyledCard>
                        <ul>
                            {supportersData.map(supporter => 
                                <SupporterCard 
                                    key={supporter.uid}
                                    avatar={supporter.avatar}
                                    id={supporter.displayName} 
                                    donationTotal={supporter.donationTotal} 
                                />
                            )}
                        </ul>
                    </StyledCard>
                </section>
            </StyledSupporters>
        );
    }
    else if (!isLoading && error) {
        return <Error />
    }
    else {
        return <Loader />;
    }
}

export default SupportersView;