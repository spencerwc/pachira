import { useContext, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { MdErrorOutline } from 'react-icons/md';
import { UserAuthContext } from "../../context/UserAuthContext";
import { db } from '../../index';
import styled from "styled-components/macro";
import blob from './images/blob.svg';
import celebrate from './images/celebrate.png';

const StyledNameForm = styled.section`
    display: flex;
    flex-direction: column;
    text-align: center;

    h1 {
       color: var(--secondary-color);
    }

    .image-container {
        background-image: url(${props => props.image});
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        
        img {
            width: 100%;
            max-width: 500px;
            margin: 1.5rem auto;
        }
    }

    form {
        margin-top: 1rem;
    }

    input {
        border: 2px solid var(--border-color);
        border-radius: 2rem;
        outline: none;
        padding: 0.5rem;
        font-size: 1rem;
        margin-right: 0.5rem;
        text-indent: 0.5rem;
        
        &:focus {
            border-color: var(--border-hover);
        }
    }

    @media (min-width: 768px) {
        input {
            width: 100%;
            max-width: 282px;
            margin-right: 0;
            margin-left: -2rem;
        }
    }

    .error-message {
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
    }

    button {
        margin: 0 auto;
        margin-top: 1rem;
        width: fit-content;
        padding: 0.5rem 2rem;
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
            currentGoal: {
                name: '',
                currentFunding: 0,
                description: '',
                targetFunding: 0
            },
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
        <StyledNameForm>
            <div>
                <h1>Welcome!</h1>
                <p>We're glad you're here!</p>
                <div className="image-container" image={blob}>
                    <img src={celebrate} alt="Welcome!" />
                </div>
                <p>Set a display name for your account to get started.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text" 
                        placeholder="Display name" 
                        minLength={3}
                        maxLength={15}
                        value={displayName} 
                        onChange={handleChange}
                    />
                    <button className="secondary" type="submit">Submit</button>
                    {error && <p className="error-message"><MdErrorOutline />{error}</p>}
                </form>
            </div>
        </StyledNameForm>
    );
}

export default DisplayNameForm;