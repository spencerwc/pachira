import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TopSupport = styled.section`
    background-color: rgba(0, 0, 0, 0.05);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 1rem;
`;

const Supporter = styled.div`
    display: flex;
    padding: 0.5rem 0;
    border-bottom: 1px solid;

    :nth-child(3) {
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
`;

const CampaignTopSupport = ({supporters}) => {
    const topSupporters = supporters.sort((a, b) => b.donationTotal - a.donationTotal).slice(0, 3);
    let navigate = useNavigate();

    return (
        <TopSupport>
            {topSupporters.map(supporter => 
                <Supporter key={supporter.id}>
                    <Avatar src={supporter.avatar} alt="" />
                    <SupporterDetails>
                        <strong>{supporter.username}</strong>
                        <strong>${supporter.donationTotal}</strong>
                    </SupporterDetails>
                </Supporter>
            )}
            <ViewAllButton onClick={() => navigate('./supporters')}>View all supporters</ViewAllButton>
        </TopSupport>
    );
}

export default CampaignTopSupport;