import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TopSupport = styled.section`
    background-color: rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 1rem;
    padding: 1rem;
`;

const Supporters = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

const Supporter = styled.li`
    border-bottom: 1px solid;
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
        color: inherit;

        :visited {
            color: inherit;
        }
    }
`;

const Avatar = styled.img`
    background-color: #fff;
    border-radius: 0.5rem;
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
    border-radius: 0.7rem;
    padding: 0.5rem;
    background-color: #fff;
    cursor: pointer;
    :hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
    margin-top: 0.5rem;
`;

const DonateButton = styled.button`
    border: none;
    border-radius: 0.7rem;
    padding: 0.5rem;
    background-color: #fff;
    cursor: pointer;
    :hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

const CampaignTopSupport = ({supporters}) => {
    let navigate = useNavigate();
    const supporterValues = Object.values(supporters);

    if (supporterValues.length > 0) {
        const topSupporters = supporterValues.sort((a, b) => b.donationTotal - a.donationTotal).slice(0, 3);
        
        return (
            <TopSupport>
                <Supporters>
                    {topSupporters.map(supporter => 
                        <Supporter key={supporter.id}>
                            <Link to={`../${supporter.id}`}>
                                <Avatar src={supporter.avatar} alt="" />
                                <SupporterDetails>
                                    <strong>{supporter.id}</strong>
                                    <strong>${supporter.donationTotal.toLocaleString()}</strong>
                                </SupporterDetails>
                            </Link>
                        </Supporter>
                    )}
                </Supporters>
                <ViewAllButton onClick={() => navigate('./supporters')}>View all supporters</ViewAllButton>
            </TopSupport>
        );
    }
    else {
        return (
            <TopSupport>
                <p style={{marginTop: 0}}>You could be the first!</p>
                <DonateButton>Donate</DonateButton>
            </TopSupport>
        );
    }
}

export default CampaignTopSupport;