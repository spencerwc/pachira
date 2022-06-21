import { useState } from "react";
import styled from "styled-components";
import CampaignGoal from './CampaignGoal';

const Support = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0.5rem;

    @media(min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const Donate = styled.section`
    display: none;

    @media(min-width: 768px) {
        background-color: rgba(0, 0, 0, 0.05);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 1rem;
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }
`;

const DonateHeading = styled.h3`
    margin: 0;
    margin-bottom: 0.5rem;
`;

const DonateAmount = styled.input`
    border-radius: 0.5rem;
    padding: 0.5rem;
    border: none;

    :focus {
        outline: none;
    }
`;

const DonateMessage = styled.textarea`
    resize: none;
    flex-grow: 1;
    margin: 0.5rem 0;
    min-height: 100px;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem;

    :focus {
        outline: none;
    }
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

const CampaignSupport = ({goal}) => {
    const [donateAmount, setDonateAmount] = useState(5);
    const [donateMessage, setDonateMessage] = useState('');

    const handleAmountChange = (e) => {
        setDonateAmount(e.target.value);
    }

    const handleMessageChange = (e) => {
        setDonateMessage(e.target.value);
    }

    const handleDonateSubmit = () => {
        console.log('Donating $' + donateAmount);
        console.log('Message: ' + donateMessage);
    }

    return (
        <Support>
            <CampaignGoal goal={goal} />
            <Donate>
                <DonateHeading>Make a donation</DonateHeading>
                <DonateAmount 
                    type="number" 
                    min="1" 
                    placeholder="5" 
                    value={donateAmount} 
                    onChange={handleAmountChange} 
                />
                <DonateMessage 
                    placeholder="Your message" 
                    value={donateMessage}
                    onChange={handleMessageChange}
                />
                <DonateButton onClick={handleDonateSubmit}>Donate</DonateButton>
            </Donate>
        </Support>
    );
}

export default CampaignSupport;