import styled from "styled-components/macro";
import CampaignCard from "../ExploreView/CampaignCard";

const StyledTrending = styled.section`
    max-width: 1000px;
    margin: 0 auto;
    margin-top: 1rem;

    ul {
        display: grid;
        grid-template-columns: repeat( auto-fill, minmax(251px, 1fr));
        grid-gap: 1rem;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    li {
        background-color: #fff;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.02), 0 3px 10px rgba(0, 0, 0, 0.02);
    }

    h2 {
        margin-bottom: 1rem;
    }
`;

const Trending = ({ trending }) => {
    return (
        <StyledTrending>
            <h2>Trending Campaigns</h2>
            <ul>
                { trending.map(campaign => 
                    <CampaignCard 
                        key={campaign.id} 
                        id={campaign.id} 
                        image={campaign.bannerImage} 
                        name={campaign.name} 
                        summary={campaign.summary} 
                    />)
                }
            </ul>
        </StyledTrending>
    );
}

export default Trending;