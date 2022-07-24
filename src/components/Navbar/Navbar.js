import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdHome, MdSearch, MdSettings, MdLogin } from 'react-icons/md';
import styled from "styled-components/macro";
import StyledNav from "../../styles/StyledNav";
import logo from '../../images/logo.png';
import { UserAuthContext } from "../../context/UserAuthContext";

const StyledMenu = styled.ul`
    display: ${props => props.visible === true ? 'flex' : 'none !important'};
    background-color: #fff;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04), 0 3px 10px rgba(0, 0, 0, 0.04);
    list-style: none;
    position: absolute;
    bottom: 5rem;
    right: 1rem;
    flex-direction: column;

    li {
        width: 100%;
        cursor: pointer;
        padding: 0.5rem 1rem;

        &:hover {
            color: var(--secondary-hover);
        }

        &:nth-of-type(2) {
            border-top: 1px solid var(--border-color);
        }
    }

    @media (min-width: 768px) {
        right: 1rem;
        top: 5rem;
        bottom: auto;
    }
`;

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { currentUser, logOut } = useContext(UserAuthContext);
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await logOut();
            navigate('../login');
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <StyledNav>
            <div className="logo">
                <Link to="/"><img src={logo} alt="pachira"/></Link>
            </div>
            <ul>
                <li>
                    <NavLink to="/" aria-label="Home link"><MdHome name="Home" /><span>Home</span></NavLink>
                </li>
                <li>
                    <NavLink to="explore" aria-label="Explore link"><MdSearch name="Explore" /><span>Explore</span></NavLink>
                </li>
                { !currentUser ? (
                    <li>
                        <NavLink to="login" aria-label="Login link"><MdLogin name="Login" /><span>Log in</span></NavLink>
                    </li>) : (
                    <li>
                        <NavLink to="dashboard" aria-label="Dashboard link"><MdSettings name="Dashboard" /><span>Dashboard</span></NavLink>
                    </li>)
                }
                { !currentUser && 
                    <li className="register-link"><NavLink to="register">Sign up</NavLink></li>
                }
                { currentUser && 
                    <li className="user" onClick={() => setShowMenu(!showMenu)}>
                        <img
                            src={currentUser.avatar} 
                            referrerPolicy="no-referrer" 
                            alt=""
                        /> 
                        <StyledMenu visible={showMenu}>
                            {currentUser.isActive && <li><Link to={`../${currentUser.displayName}`}>Your Campaign</Link></li>}
                            <li onClick={handleLogOut}>Log Out</li>
                        </StyledMenu>
                    </li>
                }
            </ul>
        </StyledNav>
    );
}

export default Navbar;