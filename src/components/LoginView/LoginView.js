import { useState } from "react";
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";
import { MdErrorOutline } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import styled from "styled-components";
import sprout from './sprout.png';
import { db } from '../../index';

const LoginContainer = styled.section`
    margin: 0 auto;
    padding: 1rem;
    text-align: center;
    padding-top: 2rem;

    @media (min-width: 768px) {
        max-width: 400px;
    }
`;

const Logo = styled.img`
    max-width: 100px;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.05);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 1rem;
    > input {
        margin: 0.5rem 0;
        border-radius: 0.5rem;
        padding: 0.5rem;
        border: none;
    
        :focus {
            outline: none;
        }
    }
`;

const LoginHeading = styled.h1`
    margin: 0 auto;
    margin-bottom: 0.5rem;
`;

const LoginButton = styled.button`
    margin-top: 0.5rem;
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

    > svg {
        margin-right: 0.3rem;
    }

    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`;

const OAuthLogin = styled.section`
    display: flex;
    flex-direction: column;
    padding: 1rem;
`;

const OAuthLoginButton = styled.button`
    margin-top: 0.5rem;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.7rem;
    padding: 0.5rem;
    background-color: #fff;
    cursor: pointer;
    :hover {
        border-color: rgba(0, 0, 0, 0.3);
    }
`;

const SignUp = styled.p`
    > a {
        color: inherit;
        text-decoration: none;

        :visited {
            color: inherit;
        }
    }
`;

const LoginView = ({ logIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const checkForExistingCampaign = async (userDisplayName) => {
        const docRef = doc(db, 'campaigns', userDisplayName);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    }

    const addUserToCampaignCollection = async (user, userDisplayName) => {
        const campaignExists = await checkForExistingCampaign(userDisplayName);

        if (!campaignExists) {
            setDoc(doc(db, 'campaigns', userDisplayName), {
                about: "",
                avatar: user.photoURL,
                bannerImage: "",
                created: new Date(),
                currentGoal: null,
                donations: [],
                email: user.email,
                followers: [],
                name: "",
                posts: [],
                summary: "",
                supporters: []
            });
        }
    }

    const signInUser = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            logIn(user);
            navigate('../settings');
          })
          .catch((error) => {
            setError(error);
          });
    }

    const signInGoogleUser = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        
        signInWithPopup(auth, provider)
            .then((result) => {
                // Add new campaign if it doesnt exist already
                addUserToCampaignCollection(result.user, result.user.uid);
                
                // Log in and redirect
                logIn(result.user);
                navigate("../settings");
            }).catch((error) => {
                setError(error);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signInUser();
    }

    return (
        <LoginContainer>
            <Logo src={sprout} alt="pachira" />
            <LoginForm onSubmit={handleSubmit}>
                <LoginHeading>Log In</LoginHeading>
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={email} 
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError(null);
                    }}
                />
                <input 
                    type="password" 
                    placeholder="Choose a Password" 
                    value={password} 
                    onChange={(e) =>{
                        setPassword(e.target.value);
                        setError(null);
                    }}
                />
                {error && <ErrorMessage><MdErrorOutline />{error.code}</ErrorMessage>}
                <p style={{fontSize: '0.8rem'}}>Pachira is a demo application and is only intended to showcase example features. This is not an actual service.</p>
                <LoginButton type="submit">Log In</LoginButton>
            </LoginForm>
            <OAuthLogin>
                <p>Or log in with</p>
                <OAuthLoginButton onClick={signInGoogleUser}><FcGoogle/> Google</OAuthLoginButton>                
            </OAuthLogin>
            <SignUp><Link to="../register">New to Pachira?  Sign up.</Link></SignUp>
        </LoginContainer>
    );
}

export default LoginView;