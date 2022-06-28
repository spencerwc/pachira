import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import styled from "styled-components";
import logo from '../../images/logo.png';

const Header = styled.div`
    background-color: #fff;
    position: relative; 
    height: 50px;
    padding: 0.5rem 0;
    width: 100%;
    display: flex;
    justify-content: center;
    box-shadow: 0 3px 10px rgba(0,0,0,0.05), 0 3px 10px rgba(0,0,0,0.05);

    @media(min-width: 768px) {
        display: none;
    }
`;

const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 0.5rem;
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
            <Link to="/">
                <img src={logo} alt="Pachira" style={{maxWidth: '50px', marginLeft: '0.5rem'}}/>
            </Link>

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