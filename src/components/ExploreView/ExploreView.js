import styled from "styled-components";
import { testCampaign } from "../../utils/testCampaign";
import CampaignCard from "./CampaignCard";

const ExploreContainer = styled.section`
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: 80px;
    padding: 0.5rem;
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(200px, 1fr) );
    grid-gap: 1rem;
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
    return (
        <ExploreContainer>
            <Heading>Explore</Heading>
            {/* TODO: Make this functional */}
            <Search type="text" placeholder="Search for a campaign..."></Search>
            <Container>
                <CampaignCard title={testCampaign.title} summary={testCampaign.summary} />
                <CampaignCard title={testCampaign.title} summary={testCampaign.summary} />
                <CampaignCard title={testCampaign.title} summary={testCampaign.summary} />
            </Container>
        </ExploreContainer>
    );
}

export default ExploreView;