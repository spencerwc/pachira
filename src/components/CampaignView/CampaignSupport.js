import { useContext, useState } from "react";
import { UserAuthContext } from "../../context/UserAuthContext";
import { MdErrorOutline } from 'react-icons/md';
import { BiDollar } from 'react-icons/bi';
import styled from "styled-components/macro";

const StyledDonationForm = styled.form`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 1rem;
    border: 1px solid var(--border-color);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04), 0 3px 10px rgba(0, 0, 0, 0.04);

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input {
        border-radius: 0.5rem;
        padding: 0.5rem;
        border: 1px solid var(--border-color);
        text-indent: 0.7rem;

        &:focus {
            outline: none;
            border-color: var(--border-hover);
        }
    }

    textarea {
        resize: none;
        flex-grow: 1;
        margin: 0.5rem 0;
        min-height: 100px;
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
        padding: 0.5rem;

        &:focus {
            outline: none;
            border-color: var(--border-hover);
        }
    }

    button {
        margin-top: 1rem;
    }

    h2 {
        margin: 0;
        margin-bottom: 0.5rem; 
        font-size: 1rem;
    }

    .currency-icon {
        font-size: 1.1rem;
        margin: 1rem 0 -1.81rem 0.3rem;
        z-index: 2;
    }

    .char-limit {
        margin: 0;
        margin-top: -2rem;
        margin-right: 0.5rem;
        font-size: 0.9rem;
        text-align: right;
    }

    .error-message {
        color: red;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 1s;
        margin-top: 1rem;

        svg {
            margin-right: 0.3rem;
        }

        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
    }
`;

const CampaignSupport = ({ handleDonation }) => {
    const [donateAmount, setDonateAmount] = useState(5);
    const [donateMessage, setDonateMessage] = useState('');
    const [error, setError] = useState(null);
    const {currentUser} = useContext(UserAuthContext);
    const MESSAGE_LIMIT = 90;

    const handleAmountChange = (e) => {
        setDonateAmount(e.target.value);
        setError(null);
    }

    const handleMessageChange = (e) => {
        setDonateMessage(e.target.value);
        setError(null);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!currentUser) {
            setError('You are not logged in.');
        }
        else {
            // Check if user is activated
            if (currentUser.isActive) {
                const newDonation = {
                    uid: currentUser.uid,
                    date: new Date(),
                    donationAmount: Number(donateAmount),
                    donationMessage: donateMessage
                }
                handleDonation(newDonation);
            }
            else {
                // Prompt inactive users to activate on dashboard
                setError('Activate your account on your dashboard.');
            }
        }
    }

    return (
        <StyledDonationForm onSubmit={handleSubmit}>
            <h2>Make a Donation</h2>
            <BiDollar className="currency-icon" />
            <input 
                type="number" 
                min={1}
                max={10000}
                placeholder={'5'} 
                value={donateAmount} 
                onChange={handleAmountChange}
                required
            />
            <textarea 
                placeholder="Your message (optional)" 
                value={donateMessage}
                onChange={handleMessageChange}
                minLength={1}
                maxLength={MESSAGE_LIMIT}
            />
            <p className="char-limit">
                {donateMessage.length} / {MESSAGE_LIMIT}
            </p>
            {error && <p className="error-message"><MdErrorOutline />{error}</p>}
            <button className="secondary">Support</button>
        </StyledDonationForm>
    );
}

export default CampaignSupport;