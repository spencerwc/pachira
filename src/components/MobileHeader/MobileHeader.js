import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserAuthContext } from "../../context/UserAuthContext";
import styled from "styled-components/macro";
import logo from '../../images/logo.png';

const Header = styled.header`
    background-color: #fff;
    position: fixed;
    top: 0;
    padding: 0.5rem;
    min-height: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 10;
    box-shadow: 0 3px 10px rgba(0,0,0,0.05), 0 3px 10px rgba(0,0,0,0.05);

    .link-container {
        display: flex;
        align-items: center;
        margin-left: auto;
    }

    .register-link {
        display: flex;
        align-items: center;
        background-color: var(--secondary-color);
        color: #fff;
        padding: 0.5rem 1rem;
        border-radius: 2rem;
        
        &:hover {
            background-color: var(--secondary-hover);
        }
    }

    @media (min-width: 768px) {
        position: relative;
        display: none;
    }
`;

const MobileHeader = () => {
    const {currentUser} = useContext(UserAuthContext);

    return (
        <Header>
            <Link to="/">
                <img src={logo} alt="Pachira" style={{maxWidth: '45px', marginLeft: '0.5rem'}}/>
            </Link>

            {!currentUser && 
            <div className="link-container">
                <div className="register-link">
                    <Link to="../register">Sign up</Link>
                </div>
            </div>}
        </Header>
    );
}

export default MobileHeader;