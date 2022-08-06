import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdErrorOutline } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import logo from '../../images/logo.png';
import { UserAuthContext } from "../../context/UserAuthContext";
import Loader from "../Loader/Loader";
import StyledForm from "../../styles/StyledForm";

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
            <main>
                <StyledForm>
                    <img src={logo} alt="pachira" />
                    <form onSubmit={handleSubmit}>
                        <h1>Sign up. It's free!</h1>
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
                        {error && <p style={{color: 'red'}}><MdErrorOutline />{error}</p>}
                        <p style={{fontSize: '0.8rem'}}>Pachira is a demo application and is only intended to showcase example features. This is not an actual service.</p>
                        <button className="secondary" type="submit">Create Account</button>
                    </form>
                    <div>
                        <p>Or sign up with</p>
                        <button className="outline" onClick={signInGoogleUser}><FcGoogle/> Google</button>                
                    </div>
                    <p>
                        <Link to="../login">Already have an account?  Log in.</Link>
                    </p>
                </StyledForm>
            </main>
        );
    }
    else {
        return <Loader />;
    }
}

export default SignUpView;