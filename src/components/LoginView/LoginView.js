import { useState } from "react";
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";
import { MdErrorOutline } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import styled from "styled-components";
import logo from '../../images/logo.png';
import { db } from '../../index';

const LoginContainer = styled.section`
    margin: 0 auto;
    padding: 1rem;
    text-align: center;
    max-width: 400px;
`;

const Logo = styled.img`
    max-width: 100px;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    > input {
        margin: 0.5rem 0;
        border-radius: 0.5rem;
        padding: 0.5rem;
        border: 2px solid var(--border-color);
        :focus {
            outline: none;
            border-color: var(--border-hover);
        }
    }
`;

const LoginHeading = styled.h1`
    margin: 2rem auto;
`;

const LoginButton = styled.button`
    margin-top: 0.5rem;
    border: none;
    border-radius: 2rem;
    padding: 0.5rem;
    background-color: var(--secondary-color);
    color: #fff;
    font-weight: bold;
    letter-spacing: 0.05rem;
    cursor: pointer;
    min-height: 45px;
    :hover {
        background-color: var(--secondary-hover);
    }
`;

const ErrorMessage = styled.p`
    color: var(--secondary-color);
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
`;

const OAuthLoginButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    border: 2px solid var(--border-color);
    border-radius: 2rem;
    padding: 0.5rem;
    background-color: transparent;
    font-weight: bold;
    min-height: 45px;
    cursor: pointer;
    :hover {
        border-color: var(--border-hover);
    }
    > svg {
        font-size: 1.1rem;
        margin-right: 0.3rem;
    }
`;

const SignUp = styled.p`
    margin-top: 4rem;
    > a {
        color: var(--font-color);
        text-decoration: none;

        :visited {
            color: var(--font-color);
        }
        :hover {
            color: var(--secondary-hover);
        }
    }
`;

const LoginView = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();


    const checkForExistingDoc = async (collection, identifier) => {
        const docRef = doc(db, collection, identifier);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    }

    const addToUserCollection = async (user) => {
        const userExists = await checkForExistingDoc('users', user.uid);
        
        if (!userExists) {
            setDoc(doc(db, 'users', user.uid), {
                avatar: user.photoURL,
                displayName: user.uid,
                email: user.email,
                isActive: false,
            });
        }
    }

    const signInUser = () => {
        if (email.length) {
            setIsLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                // TODO: Revisit
                // const user = userCredential.user;
                    navigate('../dashboard');
                })
                .catch((error) => {
                    setError({code: error});
                    setIsLoading(false);
                });
        }
        else {
            setError({code: 'Invalid username or password'});
        }
    }

    const signInGoogleUser = async () => {
        const provider = new GoogleAuthProvider();
        
        signInWithPopup(auth, provider)
            .then(async (result) => {
                setIsLoading(true);
                await addToUserCollection(result.user);
                navigate("../dashboard");
            }).catch((error) => {
                setError({code: error});
                setIsLoading(false);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signInUser();
    }

    if (!isLoading) {
        return (
            <LoginContainer>
                <Logo src={logo} alt="pachira" />
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
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) =>{
                            setPassword(e.target.value);
                            setError(null);
                        }}
                        required
                    />
                    {error && <ErrorMessage><MdErrorOutline />{error.code}</ErrorMessage>}
                    <p style={{fontSize: '0.8rem'}}>
                        Pachira is a demo application and is only intended to showcase example features. This is not an actual service.
                    </p>
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
    else {
        return (
            <div>Loading</div>
        );
    }
}

export default LoginView;