import styled from "styled-components";
import CampaignBanner from "./CampaignBanner";
import CampaignInfo from "./CampaignInfo";
import { testCampaign } from "../../utils/testCampaign";

const Container = styled.section`
    max-width: 1280px;
    margin: 0 auto;
`;

const CampaignView = () => {
    return (
        <Container>
            <CampaignBanner 
                title={testCampaign.title} 
                summary={testCampaign.summary} 
            />
            <CampaignInfo 
                supporters={testCampaign.supporters}
                followers={testCampaign.followers}
                posts={testCampaign.posts} 
            />
        </Container>
    );
}

export default CampaignView;