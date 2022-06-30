import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components"; 

const TopSupport = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 2px solid var(--border-color);
    border-radius: 1rem;
    padding: 1rem;
`;

const Supporters = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

const Supporter = styled.li`
    border-bottom: 2px solid var(--border-color);
    padding: 0.5rem 0;
    
    :first-of-type {
        padding-top: 0;
    }

    :last-of-type {
        border-bottom: 0px;
    }

    > a {
        display: flex;
        text-decoration: none;
        color: var(--font-color);

        :visited {
            color: var(--font-color);
        }
    }
`;

const Avatar = styled.img`
    background-color: #fff;
    border-radius: 100%;
    width: 50px;
    height: 50px;
    margin-right: 0.5rem;
`;

const SupporterDetails = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ViewAllButton = styled.button`
    border: none;
    border-radius: 2rem;
    padding: 0.5rem;
    color: #fff;
    background-color: var(--secondary-color);
    cursor: pointer;
    font-weight: bold;
    min-height: 40px;
    margin-top: 0.5rem;
    :hover {
        background-color: var(--secondary-hover);
    }
`;

const DonateButton = styled.button`
    border: none;
    border-radius: 2rem;
    padding: 0.5rem;
    color: #fff;
    background-color: var(--secondary-color);
    cursor: pointer;
    font-weight: bold;
    min-height: 40px;
    margin-top: 0.5rem;
    :hover {
        background-color: var(--secondary-hover);
    }
`;

const CampaignTopSupport = ({supporters}) => {
    const navigate = useNavigate();
    
    const getTopSupporters = (supporters) => {
        const supportersArr = Object.values(supporters);
        return supportersArr.sort((a, b) => b.donationTotal - a.donationTotal).slice(0, 3);
    }

    const topSupporters = getTopSupporters(supporters);

    if (topSupporters.length > 0) {
        return (
            <TopSupport>
                <Supporters>
                    {topSupporters.map((supporter, index) => {
                        return (
                            <Supporter key={`${supporter.displayName}_${index}`}>
                                <Link to={`../${supporter.displayName}`}>
                                    <Avatar src={supporter.avatar} alt={supporter.displayName} referrerPolicy="no-referrer"/>
                                    <SupporterDetails>
                                        <strong>{supporter.displayName}</strong>
                                        <strong>$ {supporter.donationTotal.toLocaleString()}</strong>
                                    </SupporterDetails>
                                </Link>
                            </Supporter>
                            );
                        }
                    )}
                </Supporters>
                <ViewAllButton onClick={() => navigate('./supporters')}>View all supporters</ViewAllButton>
            </TopSupport>
        );
    }
    else {
        return (
            <TopSupport>
                {/* TODO: Add functionality */}
                <p style={{marginTop: 0, marginBottom: '0.5rem'}}>You could be the first!</p>
                <DonateButton>Support</DonateButton>
            </TopSupport>
        );
    }
}

export default CampaignTopSupport;