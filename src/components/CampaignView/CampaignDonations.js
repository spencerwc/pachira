import styled from "styled-components/macro";
import StyledCard from "../../styles/StyledCard"; 

const StyledDonations = styled.ol`
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: hidden;

    li {
        border-bottom: 1px solid var(--border-color);
        padding: 0.5rem 0;
        display: flex;
        
        &:first-of-type {
            padding-top: 0;
        }

        &:last-of-type {
            border-bottom: 0px;
            padding-bottom: 0;
        }
    }

    img {
        background-color: #fff;
        border-radius: 100%;
        width: 50px;
        height: 50px;
        margin-right: 0.5rem;
    }

    .donation-details {
        width: 100%;
    }

    .donation-header {
        display: flex;
        flex-direction: column;
    }

    .donation-header-inner {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .donation-message {
        margin: 0;
        padding-bottom: 0.2rem;
    }
`;

const CampaignDonations = ({donations}) => {
    const getRecentDonations = (donations) => {
        return donations.sort((a, b) => b.date.seconds - a.date.seconds).slice(0, 3);
    }

    const recentDonations = getRecentDonations(donations);

    return (
        <StyledCard>
            <StyledDonations>
                {recentDonations.map((donation, index) => (
                    <li key={`${donation.id}D${index}`}>
                        <img src={donation.avatar} alt="" />
                        <div className="donation-details">
                            <div className="donation-header">
                                <div className="donation-header-inner">
                                    <strong>{donation.displayName}</strong>
                                    <strong style={{textAlign: 'right'}}>${donation.donationAmount.toLocaleString()}</strong>
                                </div>
                                <div style={{fontSize: '0.9rem'}}>{new Date(donation.date.seconds * 1000).toLocaleDateString()}</div>
                            </div>
                        <p className="donation-message">{donation.donationMessage}</p>
                        </div>
                    </li>
                ))}
            </StyledDonations>
        </StyledCard>
    );
}

export default CampaignDonations;