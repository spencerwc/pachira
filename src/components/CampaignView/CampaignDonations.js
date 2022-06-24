import styled from "styled-components";

const RecentDonations = styled.section`
    background-color: rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 1rem;
    padding: 1rem 1rem 0.7rem 1rem;
`;

const Donations = styled.ol`
    list-style: none;
    margin: 0;
    padding: 0;
`;

const Donation = styled.li`
    border-bottom: 1px solid;
    padding: 0.5rem 0;
    display: flex;
    
    :first-of-type {
        padding-top: 0;
    }

    :last-of-type {
        border-bottom: 0px;
    }
`;

const Avatar = styled.img`
    background-color: #fff;
    border-radius: 0.5rem;
    width: 50px;
    height: 50px;
    margin-right: 0.5rem;
`;

const DonationDetails = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const DonationHeader = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    flex-grow: 1;
    padding-top: 0.2rem;
`;

const DonationMessage = styled.p`
    margin: 0;
    padding-bottom: 0.2rem;
`;

const CampaignDonations = ({donations}) => {
    const recentDonations = donations.sort((a, b) => b.date.seconds - a.date.seconds).slice(0, 3);
    
    return (
        <RecentDonations>
            <Donations>
                {recentDonations.map((donation, index) => (
                    <Donation key={`${donation.id}D${index}`}>
                        <Avatar src={donation.avatar} alt="" />
                        <DonationDetails>
                            <DonationHeader>
                                <strong>{donation.name}</strong>
                                <strong style={{textAlign: 'right'}}>${donation.donationAmount.toLocaleString()}</strong>
                                <span style={{textAlign: 'right'}}>{new Date(donation.date.seconds * 1000).toLocaleDateString()}</span>
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