import { useEffect, useState} from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../index';
import styled from "styled-components";
import CampaignCard from "./CampaignCard";

const ExploreContainer = styled.section`
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: 80px;
    padding: 0.5rem;
`;

const Container = styled.ul`
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

const Search = styled.input`
    border-radius: 2rem;
    outline: none;
    border: none;
    background-color: rgba(0, 0, 0, 0.05);
    padding: 1rem;
    width: 40%;
    margin-bottom: 1rem;
`;

const ExploreView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [campaignsList, setCampaignsList] = useState([]);

    const getCampaigns = async () => {
        const campaignsList = [];
        const querySnapshot = await getDocs(collection(db, "campaigns"));
        
        querySnapshot.forEach((doc) => {
            campaignsList.push({id: doc.id, ...doc.data()});
        });

        // Only show campaigns that have been set up by the user
        const activeCampaigns = campaignsList.filter(campaign => campaign.name);
        
        setCampaignsList(activeCampaigns);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        getCampaigns();
    }, []);

    if (!isLoading && campaignsList) {
        return (
            <ExploreContainer>
                <Heading>Explore</Heading>
                {/* TODO: Make this functional */}
                <Search type="text" placeholder="Search for a campaign..."></Search>
                <Container>
                    {campaignsList.length && campaignsList.map(campaign => <CampaignCard key={campaign.id} id={campaign.id} name={campaign.name} summary={campaign.summary} />)}
                </Container>
            </ExploreContainer>
        );
    }
    else {
        return <div>Loading</div>
    }
}

export default ExploreView;