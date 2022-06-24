import { useState } from "react";
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import sprout from './sprout.png';

const LoginContainer = styled.section`
    margin: 0 auto;
    padding: 1rem;
    text-align: center;

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

const LoginView = ({ logIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signInUser = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            logIn(user);
          })
          .catch((error) => {
            console.error(error.message);
          });
    }

    const signInGoogleUser = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                logIn(result.user);
                navigate('../settings');
            }).catch((error) => {
                console.error(error.message);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signInUser();
        navigate('../settings');
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
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Choose a Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p style={{fontSize: '0.8rem'}}>Pachira is a demo application and is only intended to showcase example features. This is not an actual service.</p>
                <LoginButton type="submit">Log In</LoginButton>
            </LoginForm>
            <OAuthLogin>
                <p>Or log in with</p>
                <OAuthLoginButton onClick={signInGoogleUser}>Google</OAuthLoginButton>                
            </OAuthLogin>
        </LoginContainer>
    );
}

export default LoginView;