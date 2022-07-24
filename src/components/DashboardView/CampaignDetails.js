import { useState } from 'react';
import { MdInfo } from 'react-icons/md';
import ReactTooltip from "react-tooltip";
import styled from "styled-components/macro";

const StyledCampaignForm = styled.form`
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
        margin-top: 0.75rem;
    }

    .char-limit {
        width: fit-content;
        margin: -2.5rem 0.5rem 1.5rem auto;
        font-size: 0.9rem;
        text-align: right;
    }

    @media (min-width: 290px) {
        input, textarea { 
            font-size: 1rem;
        }
    }
`;

const CampaignDetails = ({name, summary, about, handleUpdate}) => {
    const [newName, setNewName] = useState(name ? name : '');
    const [newSummary, setNewSummary] = useState(summary ? summary : '');
    const [newAbout, setNewAbout] = useState(about ? about : '');
    const MIN_NAME_LENGTH = 3;
    const MAX_NAME_LENGTH = 20;
    const MAX_SUMMARY_LENGTH = 100;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        handleUpdate({
            name: newName,
            summary: newSummary,
            about: newAbout
        });
    }

    return (
        <section>
            <ReactTooltip />
            <StyledCampaignForm onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <strong>Campaign Name</strong> 
                    {!name && <MdInfo data-tip="Setting a name will make your campaign visible." />}
                    <ReactTooltip />
                </label>
                <input 
                    id="name" 
                    type="text" 
                    placeholder="Name your campaign" 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)}
                    minLength={MIN_NAME_LENGTH}
                    maxLength={MAX_NAME_LENGTH}
                    required 
                    disabled={name && name.length > 0}
                />              
                {!name &&<p className="char-limit">{newName.length} / {MAX_NAME_LENGTH}</p>}
                
                <label htmlFor="summary">
                    <strong>Campaign Summary</strong>
                    <MdInfo data-tip="Displayed when others search your campaign." />
                </label>
                <textarea 
                    id="summary" 
                    placeholder="Add a brief summary (optional)" 
                    value={newSummary} 
                    onChange={(e) => setNewSummary(e.target.value)}
                    maxLength={MAX_SUMMARY_LENGTH}
                />
                <p className="char-limit">{newSummary.length} / {MAX_SUMMARY_LENGTH}</p>

                <label htmlFor="about">
                    <strong>About Campaign</strong>
                </label>
                <textarea 
                    id="about" 
                    placeholder="Tell others about your campaign (optional)" 
                    value={newAbout}
                    onChange={(e) => setNewAbout(e.target.value)}
                />
                <button className="secondary" onClick={handleSubmit}>
                    Update Campaign
                </button>
            </StyledCampaignForm>
        </section>
    );
}

export default CampaignDetails;