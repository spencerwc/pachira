import styled from "styled-components";

const Goal = styled.section`
    background-color: rgba(0, 0, 0, 0.05);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 1rem;
`;

const GoalName = styled.h3`
    margin: 0;
    margin-bottom: 0.5rem;
`;

const GoalFunding = styled.p`
    margin: 1rem 0;
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
    margin: 1rem 0 0 0;

    @media(min-width: 768px) {
        display: none;
    }
`;

const CampaignGoal = ({goal}) => {
    return (
        <Goal>
            <GoalName>
                {goal.name}
            </GoalName>
            <p style={{flexGrow: 1}}>{goal.description}</p>
            <GoalFunding>{goal.currentFunding / goal.targetFunding * 100}% of ${goal.targetFunding.toLocaleString()}</GoalFunding>
            <DonateButton>Donate</DonateButton>
        </Goal>
    );
}

export default CampaignGoal;