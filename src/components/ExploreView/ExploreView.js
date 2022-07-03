import { useEffect, useState} from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../index';
import styled from "styled-components";
import CampaignCard from "./CampaignCard";
import Loader from "../Loader/Loader";

const ExploreContainer = styled.section`
    max-width: 1000px;
    margin: 0.5rem auto;
    margin-bottom: var(--bottom-margin);
    padding: 1rem;
    padding-bottom: 0;

    @media (min-width: 768px) {
        margin-top: 1rem;
    }
`;

const Container = styled.ul`
    display: grid;
    grid-template-columns: repeat( auto-fill, minmax(300px, 1fr) );
    grid-gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const Heading = styled.h1`
    margin-top: 0;
    margin-bottom: 1rem;
`;

const SearchForm = styled.form`
    margin-bottom: 1rem;
`;

const Search = styled.input`
    border: 2px solid var(--border-color);
    border-radius: 2rem;
    outline: none;
    padding: 0.5rem;
    font-size: 1rem;
    margin-right: 0.5rem;
    text-indent: 0.5rem;
    :focus {
        border-color: var(--border-hover);
    }

    @media (min-width: 768px) {
        padding: 1rem;
        width: 100%;
        max-width: 282px;
        text-indent: 0;
        margin-right: 0;
    }
`;

const SearchButton = styled.button`
    border: none;
    border-radius: 2rem;
    padding: 0 1rem;
    margin-top: 1rem;
    color: #fff;
    background-color: var(--secondary-color);
    font-weight: bold;
    min-height: 40px;
    cursor: pointer;
    :hover {
        background-color: var(--secondary-hover);
    }

    @media (min-width: 361px) {
        margin-top: 0;
    }

    @media (min-width: 768px) {
        margin-left: -6rem;
    }
`;

const ExploreView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [campaignsList, setCampaignsList] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const getCampaigns = async (searchTerm) => {
        setIsLoading(true);
        const activeCampaignsList = [];
        const querySnapshot = await getDocs(collection(db, "campaigns"));
        
        querySnapshot.forEach((doc) => {
            const campaignData = doc.data();
            if (campaignData.name && campaignData.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                activeCampaignsList.push(campaignData);
            }
        });

        setCampaignsList(activeCampaignsList);
        setIsLoading(false);
    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        getCampaigns(searchTerm);
    }

    useEffect(() => {
        try {
            getCampaigns(searchTerm);
        }
        catch (error) {
            setError(error.message);
        }
    }, []);

    if (!isLoading && campaignsList) {
        return (
            <ExploreContainer>
                <Heading>Explore</Heading>
                <SearchForm onSubmit={handleSearch}>
                    <Search type="text" placeholder="Search for a campaign..." value={searchTerm} onChange={handleChange}></Search>
                    <SearchButton type="submit">Search</SearchButton>
                </SearchForm>
                <Container>
                    {campaignsList.length > 0 ? campaignsList.map(campaign => 
                        <CampaignCard 
                            key={campaign.id} 
                            id={campaign.id} 
                            image={campaign.bannerImage} 
                            name={campaign.name} 
                            summary={campaign.summary} 
                        />
                    ) : 
                    
                    <div>No campaigns found. Try again.</div>}
                </Container>
            </ExploreContainer>
        );
    }
    else if (!isLoading && error) {
        return <div>Something went wrong.</div>;
    }
    else {
        return <Loader />;
    }
}

export default ExploreView;