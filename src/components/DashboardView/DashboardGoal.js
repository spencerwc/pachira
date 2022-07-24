import { useState } from 'react';
import { BiDollar } from 'react-icons/bi';
import styled from "styled-components/macro";

const StyledGoalForm = styled.form`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: 1.5rem;

    label {
        display: flex;
        align-items: center;
        
        svg {
            margin-left: 0.25rem;
            cursor: pointer;
        }
    }

    input {
        border-radius: 0.5rem;
        padding: 0.5rem;
        margin: 0.5rem 0 1rem 0;
        border: 1px solid var(--border-color);
        font-size: 0.9rem;

        &:focus {
            outline: none;
            border-color: var(--border-hover);
        }
    }

    textarea {
        resize: none;
        margin: 0.5rem 0 1rem 0;
        min-height: 100px;
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
        padding: 0.5rem;
        font-size: 0.9rem;

        &:last-of-type {
            margin-bottom: 0;
        }

        &:focus {
            outline: none;
            border-color: var(--border-hover);
        }
    }

    button {
        width: fit-content;
        padding: 0 1rem;
    }

    .char-limit {
        width: fit-content;
        margin: -2.5rem 0.5rem 1.5rem auto;
        font-size: 0.9rem;
        text-align: right;
    }

    .currency-icon {
        font-size: 1.1rem;
        margin: -2.8rem 0 1.5rem 0.3rem;
        z-index: 2;
    }

    .goal-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    @media (min-width: 290px) {
        input, textarea {
            font-size: 1rem;
        }
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
            <StyledGoalForm onSubmit={handleSubmit}>
                <label htmlFor="goal-name">
                    <strong>Goal Name</strong> 
                </label>
                <input 
                    id="goal-name" 
                    type="text" 
                    placeholder="Name your goal" 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)}
                    minLength={MIN_NAME_LENGTH}
                    maxLength={MAX_NAME_LENGTH}
                    required 
                />              
                <p className="char-limit">{newName.length} / {MAX_NAME_LENGTH}</p>
                <label htmlFor="goal-description">
                    <strong>Goal Description</strong>
                </label>
                <textarea 
                    id="goal-description" 
                    placeholder="Describe your goal (required)" 
                    value={newDescription} 
                    onChange={(e) => setNewDescription(e.target.value)}
                    maxLength={MAX_DESCRIPTION_LENGTH}
                    required
                />
                <p className="char-limit" style={{marginTop: '-1.5rem'}}>{newDescription.length} / {MAX_DESCRIPTION_LENGTH}</p>
                <label htmlFor="target">
                    <strong>Target Funding</strong>
                </label>
                <input 
                    id="target"
                    type="number" 
                    placeholder={1} 
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    min={1}
                    required
                    style={{textIndent: '0.7rem'}}
                />
                <BiDollar className="currency-icon" />
                <div className="goal-buttons">
                    <button className="secondary" onClick={handleSubmit}>
                        Update Goal
                    </button>
                    <button className="outline" onClick={handleReset}>
                        Reset Goal
                    </button>
                </div>
            </StyledGoalForm>
        </section>
    );
}

export default DashboardGoal;