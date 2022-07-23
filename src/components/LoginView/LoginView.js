import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdErrorOutline } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import StyledForm from "../../styles/StyledForm";
import logo from '../../images/logo.png';
import { UserAuthContext } from "../../context/UserAuthContext";
import Loader from "../Loader/Loader";

const LoginView = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { logIn, googleSignIn } = useContext(UserAuthContext);
    const navigate = useNavigate();

    const signInUser = async () => {
        if (email.length) {
            setIsLoading(true);
            try {
                await logIn(email, password);
                navigate('../dashboard');
            }
            catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        }
        else {
            setError({code: 'Invalid username or password'});
        }
    }

    const signInDemo = async () => {
        try {
            await logIn('demo@email.com', 'demo1234');
            navigate('../dashboard');
        }
        catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    const signInGoogleUser = async () => {
        try {
            await googleSignIn();
            navigate('../dashboard');
        }
        catch (error) {
            console.error(error);
            setError(error.message)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signInUser();
    }

    if (!isLoading) {
        return (
            <StyledForm>
                <img src={logo} alt="pachira" />
                <form onSubmit={handleSubmit}>
                    <h1>Log In</h1>
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
                    {error && <p className="error-message"><MdErrorOutline />{error}</p>}
                    <p style={{fontSize: '0.8rem'}}>
                        Pachira is a demo application and is only intended to showcase example features. This is not an actual service.
                    </p>
                    <button className="secondary" type="submit">Log In</button>
                </form>
                <div>
                    <p>Or log in with</p>
                    <button className="outline" onClick={signInDemo} style={{marginBottom: '1rem'}}>🤖 Demo</button>
                    <button className="outline" onClick={signInGoogleUser}><FcGoogle/> Google</button>                
                </div>
                <p>
                    <Link to="../register">New to Pachira?  Sign up.</Link>
                </p>
            </StyledForm>
        );
    }
    else {
        return <Loader />;
    }
}

export default LoginView;