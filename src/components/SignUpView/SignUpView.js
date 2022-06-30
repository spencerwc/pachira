import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdErrorOutline } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import styled from "styled-components";
import logo from '../../images/logo.png';
import { UserAuthContext } from "../../context/UserAuthContext";

const SignUpContainer = styled.section`
    margin: 0 auto;
    padding: 1rem;
    text-align: center;
    max-width: 400px;
`;

const Logo = styled.img`
    max-width: 100px;
`;

const SignUpForm = styled.form`
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

const SignUpHeading = styled.h1`
    margin: 2rem auto;
`;

const SignUpButton = styled.button`
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

const OAuthSignUp = styled.section`
    display: flex;
    flex-direction: column;
`;

const OAuthSignUpButton = styled.button`
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

const ErrorMessage = styled.p`
    color: red;
    margin: 0;
    animation: fadeIn 1s;
    > svg {
        margin-right: 0.3rem;
    }
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`;

const Login = styled.p`
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

const SignUpView = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { signUp, googleSignIn } = useContext(UserAuthContext);
    const navigate = useNavigate();
        
    const createUser = async (email, password) => {
        try {
            setIsLoading(true);
            await signUp(displayName, email, password);
            navigate('../dashboard');
        }
        catch(error) {
            setError(error.message);
            setIsLoading(false);
        };
    }
    
    const signInGoogleUser = async () => {
        try {
            await googleSignIn();
            navigate('../dashboard');
        }
        catch (error) {
            setError(error.message)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
            
        if (!displayName.match(/^[a-z\d]+$/i)) {
            setError('Display name only allows A-Z, a-z, 0-9 and _.');
        }
        else {
            createUser(email, password);
        }
    }

    if (!isLoading) {
        return (
            <SignUpContainer>
                <Logo src={logo} alt="pachira" />
                <SignUpForm onSubmit={handleSubmit}>
                    <SignUpHeading>Sign up. It's free!</SignUpHeading>
                    <input 
                        type="text" 
                        placeholder="Display Name"
                        minLength={3}
                        maxLength={15}
                        value={displayName} 
                        onChange={(e) => {
                            setDisplayName(e.target.value);
                            setError(null);
                        }}
                        required
                    />
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
                        placeholder="Choose a Password" 
                        value={password} 
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError(null);
                        }}
                        required
                    />
                    {error && <ErrorMessage><MdErrorOutline />{error}</ErrorMessage>}
                    <p style={{fontSize: '0.8rem'}}>Pachira is a demo application and is only intended to showcase example features. This is not an actual service.</p>
                    <SignUpButton type="submit">Create Account</SignUpButton>
                </SignUpForm>
                <OAuthSignUp>
                    <p>Or sign up with</p>
                    <OAuthSignUpButton onClick={signInGoogleUser}><FcGoogle/> Google</OAuthSignUpButton>                
                </OAuthSignUp>
                <Login><Link to="../login">Already have an account?  Log in.</Link></Login>
            </SignUpContainer>
        );
    }
    else {
        return (
            <div>Loading</div>
        );
    }
}

export default SignUpView;