import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import styled from "styled-components";
import sprout from './sprout.png';

const Header = styled.div`
    position: relative;
    height: 60px;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    box-shadow: 0 2px 2px 0px rgba(0, 0, 0, 0.1);

    > img {
        padding: 0.5rem;
    }

    @media(min-width: 768px) {
        display: none;
    }
`;

const SignUp = styled.div`
    display: flex;
    align-items: center;
    margin-right: 1rem;
    margin-left: auto;

    > a {
        text-decoration: none;
        color: inherit;
        :visited {
            color: inherit;
        }
    }
`;


const MobileHeader = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    return (
        <Header>
            <img src={sprout} alt="Pachira" />
            
            { !user && (
                <SignUp>
                    <Link to="../register">Sign up</Link>
                </SignUp>)
            }

        </Header>
    );
}

export default MobileHeader;