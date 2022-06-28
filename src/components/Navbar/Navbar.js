import { Link, NavLink } from "react-router-dom";
import { MdHome, MdSearch, MdSettings, MdLogin } from 'react-icons/md';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from '../../images/logo.png';

const Nav = styled.nav`
    background-color: #fff;
    position: fixed; 
    bottom: 0;
    height: 50px;
    padding: 0.5rem;
    width: calc(100vw - 1rem);
    display: flex;
    box-shadow: 0 -3px 10px rgba(0,0,0,0.05), 0 -3px 10px rgba(0,0,0,0.05);

    @media(min-width: 768px) {
        position: relative;
        margin-bottom: 1rem;
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
    > img {
        border-radius: 100%;
        max-width: 50px;
    }
`;

const Navbar = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;

    const signOutUser = () => {
        signOut(auth).then(() => {
            navigate('login');
          }).catch((error) => {
            console.error(error);
          });
    }

    return (
        <Nav>
            <NavLogo>
                <Link to="/"><img src={logo} alt="" /></Link>
            </NavLogo>
            <NavLinks>
                <NavItem><NavLink to="/"><MdHome /><span>Home</span></NavLink></NavItem>
                <NavItem><NavLink to="explore"><MdSearch /><span>Explore</span></NavLink></NavItem>
                { !user ?
                    <NavItem><NavLink to="login"><MdLogin /><span>Log in</span></NavLink></NavItem> :
                    <NavItem><NavLink to="dashboard"><MdSettings /><span>Dashboard</span></NavLink></NavItem>
                }
                { !user && 
                    <RegisterLink><NavLink to="register">Sign up</NavLink></RegisterLink>
                }
                { user && 
                    <NavUser>
                        <img
                            src={user.photoURL} 
                            referrerPolicy="no-referrer" 
                            alt={user.displayName}
                            onClick={signOutUser}
                        /> 
                    </NavUser>
                }
            </NavLinks>
            
        </Nav>
    );
}

export default Navbar;