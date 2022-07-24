import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import StyledCard from "../../styles/StyledCard";
import styled from "styled-components/macro"; 

const StyledSupporters = styled.ul`
    overflow: hidden;

    li {
        border-bottom: 1px solid var(--border-color);
        padding: 0.5rem 0;
        
        :first-of-type {
            padding-top: 0;
        }

        :last-of-type {
            border-bottom: 0px;
        }
    }

    a {
        display: flex;
    }

    img {
        background-color: #fff;
        border-radius: 100%;
        width: 50px;
        height: 50px;
        margin-right: 0.5rem;
    }

    .supporter-details {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    }
`;

const CampaignTopSupport = ({supporters, setDonationIsActive}) => {
    const navigate = useNavigate();
    
    const getTopSupporters = (supporters) => {
        const supportersArr = Object.values(supporters);
        return supportersArr.sort((a, b) => b.donationTotal - a.donationTotal).slice(0, 3);
    }

    const topSupporters = getTopSupporters(supporters);

    if (topSupporters.length > 0) {
        return (
            <StyledCard>
                <StyledSupporters>
                    {topSupporters.map((supporter, index) => {
                        return (
                            <li key={`${supporter.displayName}_${index}`}>
                                <Link to={`../${supporter.displayName}`}>
                                    <img src={supporter.avatar} alt="" referrerPolicy="no-referrer"/>
                                    <div className="supporter-details">
                                        <strong>{supporter.displayName}</strong>
                                        <strong>$ {supporter.donationTotal.toLocaleString()}</strong>
                                    </div>
                                </Link>
                            </li>
                            );
                        }
                    )}
                </StyledSupporters>
                <button className="secondary" onClick={() => navigate('./supporters')}>View all supporters</button>
            </StyledCard>
        );
    }
    else {
        return (
            <StyledCard>
                <p style={{marginTop: 0, marginBottom: '0.5rem'}}>You could be the first!</p>
                <button className="secondary" onClick={() => setDonationIsActive(true)}>Support</button>
            </StyledCard>
        );
    }
}

export default CampaignTopSupport;