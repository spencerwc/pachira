import { useState } from 'react';
import styled from "styled-components";

const GoalForm = styled.form`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: 1.5rem;

    > label {
        display: flex;
        align-items: center;
        > svg {
            margin-left: 0.25rem;
            cursor: pointer;
        }
    }
`;

const GoalInput = styled.input`
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin: 0.5rem 0 1rem 0;
    border: 1px solid var(--border-color);
    width: calc(100% - 1.2rem);
    font-size: 0.9rem;

    :focus {
        outline: none;
        border-color: var(--border-hover);
    }

    @media (min-width: 290px) {
        font-size: 1rem;
    }
`;

const GoalTextarea = styled.textarea`
    resize: none;
    margin: 0.5rem 0 1rem 0;
    min-height: 100px;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    padding: 0.5rem;
    font-size: 0.9rem;

    :last-of-type {
        margin-bottom: 0;
    }

    :focus {
        outline: none;
        border-color: var(--border-hover);
    }

    @media (min-width: 290px) {
        font-size: 1rem;
    }
`;

const CharLimit = styled.p`
    width: fit-content;
    margin: -2.5rem 0.5rem 1.5rem auto;
    font-size: 0.9rem;
    text-align: right;
`;

const UpdateButton = styled.button`
    border: none;
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    margin: 0;
    margin-right: 0.5rem;
    background-color: var(--secondary-color);
    font-weight: bold;
    cursor: pointer;
    color: #fff;
    width: fit-content;
    :hover {
        background-color: var(--secondary-hover);
    }
`;

const ResetButton = styled.button`
    border: 2px solid var(--border-color);
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    margin: 0;
    background-color: transparent;
    color: var(--font-color);
    font-weight: bold;
    cursor: pointer;
    width: fit-content;
    :hover {
        border-color: var(--border-hover);
    }

    @media (max-width: 320px) {
        margin-top: 0.5rem;
    }
`;

const DashboardGoal = ({currentGoal, handleUpdate}) => {
    const [newName, setNewName] = useState(currentGoal.name ? currentGoal.name : '');
    const [newDescription, setNewDescription] = useState(currentGoal.description ? currentGoal.description : '');
    const [newTarget, setNewTarget] = useState(currentGoal.targetFunding ? currentGoal.targetFunding : 0);
    const MIN_NAME_LENGTH = 3;
    const MAX_NAME_LENGTH = 100;
    const MAX_DESCRIPTION_LENGTH = 200;

    const handleSubmit = (e) => {
        e.preventDefault();

        const newGoal = {
            name: newName,
            description: newDescription,
            currentFunding: currentGoal.currentFunding,
            targetFunding: Number(newTarget)
        }
        
        handleUpdate({
            currentGoal: newGoal
        });
    }

    const handleReset = (e) => {
        e.preventDefault();

        const newGoal = {
            name: '',
            description: '',
            currentFunding: 0,
            targetFunding: 0
        }

        handleUpdate({
            currentGoal: newGoal
        });
    }

    return (
        <section>
            <GoalForm onSubmit={handleSubmit}>
                <label htmlFor="goal-name">
                    <strong>Goal Name</strong> 
                </label>
                <GoalInput 
                    id="goal-name" 
                    type="text" 
                    placeholder="Name your goal" 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)}
                    minLength={MIN_NAME_LENGTH}
                    maxLength={MAX_NAME_LENGTH}
                    required 
                />              
                <CharLimit>{newName.length} / {MAX_NAME_LENGTH}</CharLimit>

                <label htmlFor="goal-description">
                    <strong>Goal Description</strong>
                </label>
                <GoalTextarea 
                    id="goal-description" 
                    placeholder="Describe your goal" 
                    value={newDescription} 
                    onChange={(e) => setNewDescription(e.target.value)}
                    maxLength={MAX_DESCRIPTION_LENGTH}
                    required
                />
                <CharLimit style={{marginTop: '-1.5rem'}}>{newDescription.length} / {MAX_DESCRIPTION_LENGTH}</CharLimit>
                
                <label htmlFor="target">
                    <strong>Target Funding</strong>
                </label>
                <GoalInput 
                    id="target"
                    type="number" 
                    placeholder="Target funding amount" 
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    min={0}
                    required
                />
                <div>
                    <UpdateButton onClick={handleSubmit}>
                        Update Goal
                    </UpdateButton>
                    <ResetButton onClick={handleReset}>
                        Reset Goal
                    </ResetButton>
                </div>

            </GoalForm>
        </section>
    );
}

export default DashboardGoal;