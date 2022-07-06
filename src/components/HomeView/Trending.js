import CampaignCard from "../ExploreView/CampaignCard";
import styled from "styled-components";

const TrendingContainer = styled.section`
    max-width: 1000px;
    margin: 0 auto;
    margin-top: 1rem;
    padding: 1rem;

    @media (min-width: 768px) {
        margin-top: 0;
    }
`;

const TrendingList = styled.ul`
    display: grid;
    grid-template-columns: repeat( auto-fill, minmax(251px, 1fr));
    grid-gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;

    > li {
        background-color: #fff;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.02), 0 3px 10px rgba(0, 0, 0, 0.02);
    }
`;

const Trending = ({ trending }) => {
    return (
        <TrendingContainer>
            <h2>Trending Campaigns</h2>
            <TrendingList>
                { trending.map(campaign => 
                    <CampaignCard 
                        key={campaign.id} 
                        id={campaign.id} 
                        image={campaign.bannerImage} 
                        name={campaign.name} 
                        summary={campaign.summary} 
                    />)
                }
            </TrendingList>
        </TrendingContainer>
    );
}

export default Trending;