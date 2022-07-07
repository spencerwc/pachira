import styled from "styled-components"; 

const RecentDonations = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 1rem 1rem 0.7rem 1rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04), 0 3px 10px rgba(0, 0, 0, 0.04);
`;

const Donations = styled.ol`
    list-style: none;
    margin: 0;
    padding: 0;
`;

const Donation = styled.li`
    border-bottom: 1px solid var(--border-color);
    padding: 0.5rem 0;
    display: flex;
    
    :first-of-type {
        padding-top: 0;
    }

    :last-of-type {
        border-bottom: 0px;
        padding-bottom: 0;
    }
`;

const Avatar = styled.img`
    background-color: #fff;
    border-radius: 100%;
    width: 50px;
    height: 50px;
    margin-right: 0.5rem;
`;

const DonationDetails = styled.div`
    width: 100%;
`;

const DonationHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
`;

const DonationMessage = styled.p`
    margin: 0;
    padding-bottom: 0.2rem;
`;

const CampaignDonations = ({donations}) => {
    const getRecentDonations = (donations) => {
        return donations.sort((a, b) => b.date.seconds - a.date.seconds).slice(0, 3);
    }

    const recentDonations = getRecentDonations(donations);

    return (
        <RecentDonations>
            <Donations>
                {recentDonations.map((donation, index) => (
                    <Donation key={`${donation.id}D${index}`}>
                        <Avatar src={donation.avatar} alt="" />
                        <DonationDetails>
                            <DonationHeader>
                                <strong>{donation.displayName}</strong>
                                <strong style={{textAlign: 'right'}}>$ {donation.donationAmount.toLocaleString()}</strong>
                                <span style={{fontSize: '0.9rem'}}>{new Date(donation.date.seconds * 1000).toLocaleDateString()}</span>
                            </DonationHeader>
                        <DonationMessage>{donation.donationMessage}</DonationMessage>
                        </DonationDetails>
                    </Donation>
                ))}
            </Donations>
        </RecentDonations>
    );
}

export default CampaignDonations;