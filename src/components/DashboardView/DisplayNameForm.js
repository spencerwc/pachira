import { useContext, useState } from "react";
import { useHistory } from 'react-router';
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { MdErrorOutline } from 'react-icons/md';
import { UserAuthContext } from "../../context/UserAuthContext";
import { db } from '../../index';
import styled from "styled-components";
import welcome from './images/undraw_welcoming.svg';

const Container = styled.section`
    display: flex;
    flex-direction: column;
    text-align: center;
    height: calc(100vh - 200px);
`;

const FormContainer = styled.div`
    > img {
        width: 100%;
        max-width: 350px;
        margin: 1.5rem auto;

        @media (min-width: 768px) {
            max-width: 500px;
        }
    }
`;

const DisplayName = styled.input`
    border: 2px solid var(--border-color);
    border-radius: 2rem;
    outline: none;
    padding: 0.5rem;
    font-size: 1rem;
    margin-right: 0.5rem;
    text-indent: 0.5rem;
    :focus {
        border-color: var(--border-hover);
    }

    @media (min-width: 768px) {
        padding: 1rem;
        width: 100%;
        max-width: 282px;
        text-indent: 0;
        margin-right: 0;
        margin-left: -2rem;
    }
`;

const SetButton = styled.button`
    border: none;
    border-radius: 2rem;
    padding: 0 1rem;
    margin-top: 1rem;
    color: #fff;
    background-color: var(--secondary-color);
    font-weight: bold;
    min-height: 40px;
    cursor: pointer;
    :hover {
        background-color: var(--secondary-hover);
    }

    @media (min-width: 361px) {
        margin-top: 0;
    }

    @media (min-width: 768px) {
        margin-left: -6.1rem;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    margin: 0;
    margin-top: 0.5rem;
    animation: fadeIn 1s;
    > svg {
        margin-right: 0.3rem;
    }

    @media (min-width: 768px) {
        margin-left:  -2rem;
    }

    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`;

const DisplayNameForm = ({ handleUpdate }) => {
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);
    const {currentUser, getUserData} = useContext(UserAuthContext);
    
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
            avatar: currentUser.avatar,
            bannerImage: null,
            created: new Date(),
            currentGoal: null,
            donations: [],
            followers: [],
            id: displayName,
            name: null,
            posts: [],
            summary: null,
            supporters: [],
            uid: currentUser.uid
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
            await handleUpdate('users', currentUser.uid, { displayName: displayName.toLowerCase(), isActive: true });

            // Create campaign using the new display name
            addToCampaignCollection();
            getUserData();
        }
        else {
            setError('That username already exists');
        }
    }

    return (
        <Container>
            <FormContainer>
                <h1 style={{margin: 0}}>Welcome!</h1>
                <img src={welcome} alt="" />
                <p style={{margin: 0}}>Set a display name for your account to get started!</p>
                <form onSubmit={handleSubmit} style={{marginTop: '1rem'}}>
                    <DisplayName 
                        type="text" 
                        placeholder="Display name" 
                        minLength={3}
                        maxLength={15}
                        value={displayName} 
                        onChange={handleChange}
                    />
                    <SetButton type="submit">Submit</SetButton>
                    {error && <ErrorMessage><MdErrorOutline />{error}</ErrorMessage>}
                </form>
            </FormContainer>
        </Container>
    );
}

export default DisplayNameForm;