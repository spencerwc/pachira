import styled from "styled-components";
import CampaignBanner from "./CampaignBanner";
import CampaignInfo from "./CampaignInfo";
import CampaignSupport from "./CampaignSupport";
import CampaignAbout from "./CampaignAbout";
import CampaignTopSupport from "./CampaignTopSupport";
import { testCampaign } from "../../utils/testCampaign";

const CampaignContainer = styled.section`
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: 80px;
    padding: 0.5rem;
`;

const SectionName = styled.h2`
    font-size: 1.2rem;
    margin: 0.7rem 0;
`;

const SplitSection = styled.section`
    display: grid;
    grid-template-columns: 1fr;
        
    @media(min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
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

            <SplitSection>
                <div>
                    <SectionName>About</SectionName>
                    <CampaignAbout about={testCampaign.about} />
                </div>
                <div>
                    <SectionName>Top Supporters</SectionName> 
                    <CampaignTopSupport supporters={testCampaign.supporters} />
                </div>
            </SplitSection>
        </CampaignContainer>
    );
}

export default CampaignView;