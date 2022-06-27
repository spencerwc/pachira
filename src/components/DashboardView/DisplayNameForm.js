import { useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { MdErrorOutline } from 'react-icons/md';
import styled from "styled-components";
import { db } from '../../index';

const ErrorMessage = styled.p`
    color: red;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 1s;

    > svg {
        margin-right: 0.3rem;
    }

    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`;

const DisplayNameForm = ({ handleUpdate }) => {
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);
    const auth = getAuth();
    const user = auth.currentUser;
    
    const handleChange = (e) => {
        setDisplayName(e.target.value);
        setError(null);
    }

    const checkForExistingDoc = async (collection, identifier) => {
        const docRef = doc(db, collection, identifier);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    }

    const addToCampaignCollection = async () => {
        setDoc(doc(db, 'campaigns', displayName), {
            about: null,
            bannerImage: null,
            created: new Date(),
            currentGoal: null,
            donations: [],
            followers: [],
            name: null,
            posts: [],
            summary: null,
            supporters: []
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!displayName.match(/^[a-z\d]+$/i)) {
            setError({code: 'Display name only allows A-Z, a-z, 0-9 and _.'});
        }
        // Check if name already exists
        const nameExists = await checkForExistingDoc('campaigns', displayName.toLowerCase());

        if (!nameExists) {
            // Update user display name
            handleUpdate('users', user.uid, { displayName: displayName.toLowerCase() });

            // Create campaign using the new display name
            addToCampaignCollection();
        }
        else {
            setError({code: 'That username already exists'});
        }
    }

    return (
        <div>
            <h1>Welcome!</h1>
            <p>Set a display name for your account to get started!</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Display name" 
                    minLength={3}
                    maxLength={15}
                    value={displayName} 
                    onChange={handleChange}
                />
                {error && <ErrorMessage><MdErrorOutline />Error: {error.code}</ErrorMessage>}
            </form>
        </div>
    );
}

export default DisplayNameForm;