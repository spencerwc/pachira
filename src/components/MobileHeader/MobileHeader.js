import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import styled from "styled-components";
import logo from '../../images/logo.png';

const Header = styled.div`
    background-color: #fff;
    position: relative; 
    height: 50px;
    padding: 0.5rem;
    width: calc(100vw - 1rem);
    display: flex;
    justify-content: center;
    box-shadow: 0 3px 10px rgba(0,0,0,0.05), 0 3px 10px rgba(0,0,0,0.05);

    @media(min-width: 768px) {
        display: none;
    }
`;

const Logo = styled.div`
    display: flex;
    flex-grow: 1;

    > a {
        display: flex;
    }
`;

const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`;

const RegisterLink = styled.div`
    display: flex;
    align-items: center;
    background-color: var(--secondary-color);
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    :hover {
        background-color: var(--secondary-hover);
    }

    > a {
        color: #fff;
        text-decoration: none;
        
        :visited {
            color: #fff;
        }
    }
`;


const MobileHeader = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    return (
        <Header>
            <Logo>
                <Link to="/">
                    <img src={logo} alt="Pachira" />
                </Link>
            </Logo>

            { !user && 
            <LinkContainer>
                <RegisterLink>
                    <Link to="../register">Sign up</Link>
                </RegisterLink>
            </LinkContainer> }
        </Header>
    );
}

export default MobileHeader;