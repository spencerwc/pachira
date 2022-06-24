import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../../index";
import styled from "styled-components";
import SupporterCard from "./SupporterCard";

const SupportersContainer = styled.section`
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: 80px;
    padding: 0.5rem;
`;

const Supporters = styled.ul`
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(200px, 1fr) );
    grid-gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const Heading = styled.h1`
    margin-top: 0;
`;

const SupportersView = () => {
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
        const supporters = Object.values(campaign.supporters).sort((a, b) => b.donationTotal - a.donationTotal);

        return (
            <SupportersContainer>
                <Heading>
                    {campaign.name}'s Supporters
                </Heading>
                <Supporters>
                    {supporters.map(supporter => 
                        <SupporterCard 
                            key={supporter.id}
                            id={supporter.id} 
                            name={supporter.name} 
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