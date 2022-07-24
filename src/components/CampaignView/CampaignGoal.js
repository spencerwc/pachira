import { Line } from 'rc-progress';
import styled from "styled-components/macro";

const StyledGoalSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04), 0 3px 10px rgba(0, 0, 0, 0.04);

    h3 {
        margin: 0;
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
    }

    .goal-description {
        flex-grow: 1; 
        margin: 0.5rem 0 1.5rem 0;
    }

    .goal-funding {
        margin: 1rem 0 0.5rem 0;
    }
`;

const CampaignGoal = ({goal, setDonationIsActive}) => {
    if (goal) {
        const percentComplete = Math.floor(goal.currentFunding / goal.targetFunding * 100);
        
        return (
            <StyledGoalSection>
                <h3>{goal.name}</h3>
                <p className="goal-description">{goal.description}</p>
                <Line 
                    percent={percentComplete} 
                    strokeWidth={2} 
                    strokeColor="var(--secondary-color)" 
                    trailWidth={2}
                    trailColor="var(--border-color)"
                />
                <p className="goal-funding">{percentComplete}% of ${goal.targetFunding.toLocaleString()}</p>
                <button className="secondary" onClick={() => setDonationIsActive(true)}>Support</button>
            </StyledGoalSection>
        );
    }
}

export default CampaignGoal;