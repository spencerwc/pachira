import { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { MdErrorOutline } from 'react-icons/md';
import styled from "styled-components";
import { db } from '../../index';

const Donate = styled.form`
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
    const auth = getAuth();
    const user = auth.currentUser;

    const getCurrentUserDetails = async () => {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        return docSnap;
    }

    const handleAmountChange = (e) => {
        setDonateAmount(e.target.value);
        setError(null);
    }

    const handleMessageChange = (e) => {
        setDonateMessage(e.target.value);
        setError(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if user is logged in
        if (!user) {
            setError({code: 'You are not logged in.'});
        }
        else {
            // Get the current user and check if account is activated
            const currentUser = await getCurrentUserDetails();
            const currentUserData = currentUser.data();

            if (currentUserData.isActive) {
                const newDonation = {
                    id: currentUserData.displayName,
                    date: new Date(),
                    donationAmount: Number(donateAmount),
                    donationMessage: donateMessage
                }
                handleDonation(newDonation);
            }
            else {
                // Prompt inactive users to activate on dashboard
                setError({code: 'Activate your account on your dashboard.'});
            }
        }
    }

    return (
        <Donate onSubmit={handleSubmit}>
            {error && <ErrorMessage><MdErrorOutline />Error: {error.code}</ErrorMessage>}
            <DonateAmount 
                type="number" 
                min={1}
                max={10000}
                placeholder={5} 
                value={donateAmount} 
                onChange={handleAmountChange}
                required
            />
            <DonateMessage 
                placeholder="Your message" 
                value={donateMessage}
                onChange={handleMessageChange}
                minLength={1}
                maxLength={100}
            />
            <DonateButton>Donate</DonateButton>
        </Donate>
    );
}

export default CampaignSupport;