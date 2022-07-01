import { useEffect, useState} from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../index';
import styled from "styled-components";
import CampaignCard from "./CampaignCard";

const ExploreContainer = styled.section`
    max-width: 1000px;
    margin: 0.5rem auto;
    margin-bottom: var(--bottom-margin);
    padding: 1rem;

    @media (min-width: 768px) {
        margin-top: 1rem;
    }
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
    border: 2px solid var(--border-color);
    border-radius: 2rem;
    outline: none;
    padding: 1rem;
    width: 100%;
    max-width: 350px;
    margin-bottom: 1rem;
    font-size: 1rem;

    :focus {
        border-color: var(--border-hover);
    }
`;

const ExploreView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [campaignsList, setCampaignsList] = useState([]);

    const getCampaigns = async () => {
        const campaignsList = [];
        const querySnapshot = await getDocs(collection(db, "campaigns"));
        
        querySnapshot.forEach((doc) => {
            campaignsList.push(doc.data());
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
                    {campaignsList.length && campaignsList.map(campaign => 
                        <CampaignCard 
                            key={campaign.id} 
                            id={campaign.id} 
                            image={campaign.bannerImage} 
                            name={campaign.name} 
                            summary={campaign.summary} 
                        />
                    )}
                </Container>
            </ExploreContainer>
        );
    }
    else {
        return <div>Loading</div>
    }
}

export default ExploreView;