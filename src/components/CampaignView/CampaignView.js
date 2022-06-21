import styled from "styled-components";
import CampaignBanner from "./CampaignBanner";
import CampaignInfo from "./CampaignInfo";
import CampaignSupport from "./CampaignSupport";
import { testCampaign } from "../../utils/testCampaign";

const CampaignContainer = styled.section`
    max-width: 1000px;
    margin: 0 auto;
`;

const SectionName = styled.h2`
    font-size: 1.2rem;
    margin: 0.7rem 0;
`;

const CampaignView = () => {
    return (
        <CampaignContainer>
            <CampaignBanner 
                title={testCampaign.title} 
                summary={testCampaign.summary} 
            />

            <SectionName>Details</SectionName>
            <CampaignInfo 
                supporters={testCampaign.supporters}
                followers={testCampaign.followers}
                posts={testCampaign.posts} 
            />

            <SectionName>Support</SectionName>
            <CampaignSupport goal={testCampaign.goal} />
        </CampaignContainer>
    );
}

export default CampaignView;