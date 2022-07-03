import { useState } from 'react';
import { MdInfo } from 'react-icons/md';
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

const Details = styled.div`
`;

const CampaignForm = styled.form`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    > label {
        display: flex;
        align-items: center;
        > svg {
            margin-left: 0.25rem;
            cursor: pointer;
        }
    }
`;

const CampaignInput = styled.input`
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin: 0.5rem 0 1rem 0;
    border: 2px solid var(--border-color);
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

const CampaignTextarea = styled.textarea`
    resize: none;
    margin: 0.5rem 0 1rem 0;
    min-height: 100px;
    border: 2px solid var(--border-color);
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
    margin-top: 1rem;
    background-color: var(--secondary-color);
    font-weight: bold;
    cursor: pointer;
    color: #fff;
    width: fit-content;
    :hover {
        background-color: var(--secondary-hover);
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
        <Details>
            <ReactTooltip />
            <CampaignForm onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <strong>Campaign Name</strong> 
                    <MdInfo data-tip="Setting a name will make your campaign visible." />
                    <ReactTooltip />
                </label>
                <CampaignInput 
                    id="name" 
                    type="text" 
                    placeholder="Name your campaign" 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)}
                    minLength={MIN_NAME_LENGTH}
                    maxLength={MAX_NAME_LENGTH}
                    required 
                />              
                <CharLimit>{newName.length} / 20</CharLimit>

                
                <label htmlFor="summary">
                    <strong>Campaign Summary</strong>
                    <MdInfo data-tip="Displayed when others search your campaign." />
                </label>
                <CampaignTextarea 
                    id="summary" 
                    placeholder="Add a brief summary (optional)" 
                    value={newSummary} 
                    onChange={(e) => setNewSummary(e.target.value)}
                    maxLength={MAX_SUMMARY_LENGTH}
                />
                <CharLimit>{newSummary.length} / 100</CharLimit>
                
                <label htmlFor="about">
                    <strong>About Campaign</strong>
                </label>
                <CampaignTextarea 
                    id="about" 
                    placeholder="Tell others about your campaign (optional)" 
                    value={newAbout}
                    onChange={(e) => setNewAbout(e.target.value)}
                />
                <UpdateButton onClick={handleSubmit}>
                    Update Campaign
                </UpdateButton>
            </CampaignForm>
        </Details>
    );
}

export default CampaignDetails;