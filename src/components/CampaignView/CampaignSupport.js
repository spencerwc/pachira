import { useContext, useState } from "react";
import { MdErrorOutline, MdClose } from 'react-icons/md';
import styled from "styled-components";
import { UserAuthContext } from "../../context/UserAuthContext";

const Donate = styled.form`
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
`;

const DonateAmount = styled.input`
    border-radius: 0.5rem;
    padding: 0.5rem;
    border: 1px solid var(--border-color);

    :focus {
        outline: none;
        border-color: var(--border-hover);
    }
`;

const DonateMessage = styled.textarea`
    resize: none;
    flex-grow: 1;
    margin: 0.5rem 0;
    min-height: 100px;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    padding: 0.5rem;

    :focus {
        outline: none;
        border-color: var(--border-hover);
    }
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

const CharLimit = styled.p`
    margin: 0;
    margin-top: -2rem;
    margin-right: 0.5rem;
    font-size: 0.9rem;
    text-align: right;
`;

const ErrorMessage = styled.p`
    color: red;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 1s;
    margin-bottom: 0.5rem;

    > svg {
        margin-right: 0.3rem;
    }

    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
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
                    donationMessage: donateMessage.length > 1 ? donateMessage : 'No message included.'
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
        <Donate onSubmit={handleSubmit}>
            <h2 style={{margin: 0, marginBottom: '0.5rem', fontSize: '1rem'}}>Make a Donation</h2>
            {error && <ErrorMessage><MdErrorOutline />{error}</ErrorMessage>}
            <DonateAmount 
                type="number" 
                min={1}
                max={10000}
                placeholder={'$5'} 
                value={donateAmount} 
                onChange={handleAmountChange}
                required
            />
            <DonateMessage 
                placeholder="Your message" 
                value={donateMessage}
                onChange={handleMessageChange}
                minLength={1}
                maxLength={MESSAGE_LIMIT}
            />
            <CharLimit>
                {donateMessage.length} / {MESSAGE_LIMIT}
            </CharLimit>
            <DonateButton>Support</DonateButton>
        </Donate>
    );
}

export default CampaignSupport;