import { Line } from 'rc-progress';
import styled from "styled-components";

const Goal = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04), 0 3px 10px rgba(0, 0, 0, 0.04);
`;

const GoalName = styled.h3`
    margin: 0;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
`;

const GoalFunding = styled.p`
    margin: 1rem 0 0.5rem 0;
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
    margin-top: 1rem;
    :hover {
        background-color: var(--secondary-hover);
    }
`;

const CampaignGoal = ({goal, setDonationIsActive}) => {
    if (goal) {
        const percentComplete = Math.floor(goal.currentFunding / goal.targetFunding * 100);
        
        return (
            <Goal>
                <GoalName>
                    {goal.name}
                </GoalName>
                <p style={{flexGrow: 1, margin: '0.5rem 0 1.5rem 0'}}>{goal.description}</p>
                <Line 
                    percent={percentComplete} 
                    strokeWidth={2} 
                    strokeColor="var(--secondary-color)" 
                    trailWidth={2}
                    trailColor="var(--border-color)"
                />
                <GoalFunding>{percentComplete}% of ${goal.targetFunding.toLocaleString()}</GoalFunding>
                <DonateButton onClick={() => setDonationIsActive(true)}>Support</DonateButton>
            </Goal>
        );
    }
}

export default CampaignGoal;