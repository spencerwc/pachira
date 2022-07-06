import { useContext, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { MdErrorOutline } from 'react-icons/md';
import { UserAuthContext } from "../../context/UserAuthContext";
import { db } from '../../index';
import styled from "styled-components";
import blob from './images/blob.svg';
import celebrate from './images/celebrate.png';

const Container = styled.section`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const ImageContainer = styled.div`
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    
    > img {
        width: 100%;
        max-width: 500px;
        margin: 1.5rem auto;
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

const DisplayNameForm = ({ displayName, updateDisplayName, updateCollection, getUserCampaign, setIsLoading }) => {
    const [error, setError] = useState(null);
    const {currentUser, getUserData} = useContext(UserAuthContext);
    
    const handleChange = (e) => {
        if (error){
            setError(null);
        }
        updateDisplayName(e.target.value);
    }

    const checkForExistingDoc = async (collection, identifier) => {
        const docRef = doc(db, collection, identifier);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    }

    const addToCampaignCollection = async () => {
        setDoc(doc(db, 'campaigns', displayName.toLowerCase()), {
            about: null,
            avatar: currentUser.avatar,
            bannerImage: null,
            created: new Date(),
            currentGoal: null,
            donations: [],
            followers: [],
            id: displayName.toLowerCase(),
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
        setIsLoading(true);
        const nameExists = await checkForExistingDoc('campaigns', displayName.toLowerCase());

        if (!nameExists) {
            // Update user display name
            await updateCollection('users', currentUser.uid, { displayName: displayName.toLowerCase(), isActive: true });

            // Create campaign using the new display name
            await addToCampaignCollection();
            await getUserData();
            getUserCampaign();
        }
        else {
            setError('That username already exists');
            setIsLoading(false);
        }
    }

    return (
        <Container>
            <div>
                <h1 style={{margin: 0, color: 'var(--secondary-color)'}}>Welcome!</h1>
                <p style={{marginBottom: 0}}>We're glad you're here!</p>
                <ImageContainer image={blob}>
                    <img src={celebrate} alt="" />
                </ImageContainer>
                <p style={{marginTop: 0}}>Set a display name for your account to get started.</p>
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
            </div>
        </Container>
    );
}

export default DisplayNameForm;