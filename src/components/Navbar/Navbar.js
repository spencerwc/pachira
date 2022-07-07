import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdHome, MdSearch, MdSettings, MdLogin } from 'react-icons/md';
import styled from "styled-components";
import logo from '../../images/logo.png';
import { UserAuthContext } from "../../context/UserAuthContext";

const Nav = styled.nav`
    background-color: #fff;
    position: fixed; 
    bottom: 0;
    height: 50px;
    padding: 0.5rem 0;
    width: 100%;
    display: flex;
    box-shadow: 0 -3px 10px rgba(0,0,0,0.05), 0 -3px 10px rgba(0,0,0,0.05);

    @media(min-width: 768px) {
        position: relative;
        width: auto;
        font-weight: bold;
        box-shadow: 0 3px 10px rgba(0,0,0,0.05), 0 3px 10px rgba(0,0,0,0.05);
    }
`;

const NavLogo = styled.div`
    display: none;

    @media(min-width: 768px) {
        display: flex;
        flex-grow: 1;
        margin-left: 1rem;

        > a {
            display: flex;
        }
    }
`;

const NavLinks = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-grow: 1;
    justify-content: space-around;
    align-items: center;

    @media (min-width: 768px) {
        justify-content: space-between;
        flex-grow: 0.5;
    }
`;

const NavItem = styled.li`
    > a {
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: var(--font-color);
        width: 60px;
        height: 60px;

        :visited {
            color: var(--font-color);
        }

        :hover {
            color: var(--secondary-hover);
        }
        
        > svg {
            font-size: 1.6rem;
            
            @media (min-width: 768px) {
                display: none;
            }
        }

        > span {
            display: none;

            @media(min-width: 768px) {
                display: inline-block;
                font-size: 1.1rem;
            }
        }
`;

const RegisterLink = styled.li`
    display: none;

    @media (min-width: 768px) {
        display: inline-block;
        background-color: var(--secondary-color);
        padding: 0.5rem 1rem;
        border-radius: 2rem;
        margin-right: 1rem;

        :hover {
            background-color: var(--secondary-hover);
        }

        > a  {
            color: #fff;
            text-decoration: none;
        }
    }
`;

const NavUser = styled.li`
    display: flex;
    align-items: center;
    margin-right: 1rem;

    > img {
        border-radius: 100%;
        width: 45px;
        height: 45px;
        background-color: var(--border-color);
        cursor: pointer;
    }
`;

const UserMenu = styled.ul`
    display: ${props => props.visible === true ? 'block' : 'none'};
    background-color: #fff;
    padding: 0.5rem 0;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04), 0 3px 10px rgba(0, 0, 0, 0.04);
    list-style: none;
    position: absolute;
    bottom: 5rem;
    right: 1rem;
    
    @media (min-width: 768px) {
        right: 1rem;
        top: 5rem;
        bottom: auto;
    }
    
    > li {
        padding: 0.5rem 1.5rem;
        cursor: pointer;
        :hover {
            color: var(--secondary-hover);
        }
        :nth-of-type(2) {
            border-top: 1px solid var(--border-color);
        }
        > a {
            text-decoration: none;
            color: var(--font-color);
            :visited {
                color: var(--font-color);
            }
            :hover {
                color: var(--secondary-hover);
            }
        }
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
        <Nav>
            <NavLogo>
                <Link to="/"><img src={logo} alt="pachira" style={{maxWidth: '50px'}}/></Link>
            </NavLogo>
            <NavLinks>
                <NavItem><NavLink to="/"><MdHome /><span>Home</span></NavLink></NavItem>
                <NavItem><NavLink to="explore"><MdSearch /><span>Explore</span></NavLink></NavItem>
                { !currentUser ?
                    <NavItem><NavLink to="login"><MdLogin /><span>Log in</span></NavLink></NavItem> :
                    <NavItem><NavLink to="dashboard"><MdSettings /><span>Dashboard</span></NavLink></NavItem>
                }
                { !currentUser && 
                    <RegisterLink><NavLink to="register">Sign up</NavLink></RegisterLink>
                }
                { currentUser && 
                    <NavUser onClick={() => setShowMenu(!showMenu)}>
                        <img
                            src={currentUser.avatar} 
                            referrerPolicy="no-referrer" 
                            alt=""
                        /> 
                        <UserMenu visible={showMenu}>
                            {currentUser.isActive && <li><Link to={`../${currentUser.displayName}`}>Your Campaign</Link></li>}
                            <li onClick={handleLogOut}>Log Out</li>
                        </UserMenu>
                    </NavUser>
                }
            </NavLinks>
            
        </Nav>
    );
}

export default Navbar;