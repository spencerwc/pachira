import StyledCard from '../../styles/StyledCard';

const CampaignAbout = ({about}) => {
    return (
        <StyledCard>
            <p>{about ? about : `We don't know much about them yet, but we're sure they are great!`}</p>
        </StyledCard>
    );
}

export default CampaignAbout;