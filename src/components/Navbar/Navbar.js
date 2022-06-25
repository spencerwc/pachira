import { Link, NavLink } from "react-router-dom";
import { MdHome, MdSearch, MdSettings, MdLogin } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import sprout from './sprout.png';

const Nav = styled.nav`
    background-color: rgba(0, 0, 0, 0.05);
    position: fixed; 
    bottom: 0;
    height: 60px;
    padding: 0.5rem;
    width: 100vw;
    display: flex;

    @media(min-width: 768px) {
        position: relative;
        margin-bottom: 1rem;
        width: auto;
        border-radius: 0 0 3rem 3rem;
    }
`;

const NavLogo = styled.div`
    display: none;

    @media(min-width: 768px) {
        display: flex;
        margin-left: 2rem;
        flex-grow: 1;

        > a {
            display: flex;
            padding: 0.7rem;
        }
    }
`;

const NavLinks = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-grow: 1;
    justify-content: space-around;
    align-items: center;

    @media (min-width: 768px) {
        margin-right: 2rem;
        justify-content: space-between;
        flex-grow: 0.5;
    }

    > li > a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: inherit;

        :visited {
            color: inherit;
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
    }

    > #register {
        display: none;

        @media(min-width: 768px) {
            display: block;
        }
    }
`;

const NavUser = styled.img`
    border-radius: 100%;
    max-width: 40px;
`;

const Navbar = ({ user, logOut }) => {
    const navigate = useNavigate();

    const signOutUser = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            logOut();
            navigate('login');
          }).catch((error) => {
            console.error(error);
          });
    }

    return (
        <Nav>
            <NavLogo>
                <Link to="/"><img src={sprout} alt="" /></Link>
            </NavLogo>
            <NavLinks>
                <li><NavLink to="/"><MdHome /><span>Home</span></NavLink></li>
                <li><NavLink to="explore"><MdSearch /><span>Explore</span></NavLink></li>
                { !user ?
                    <li><NavLink to="login"><MdLogin /><span>Log in</span></NavLink></li> :
                    <li><NavLink to="settings"><MdSettings /><span>Settings</span></NavLink></li>
                }
                { !user && 
                    <li id="register"><NavLink to="register"><span>Sign up</span></NavLink></li>
                }
                { user && 
                <li>
                    { user.photoURL ? 
                        <NavUser 
                            src={user.photoURL} 
                            referrerPolicy="no-referrer" 
                            alt={user.displayName}
                            onClick={signOutUser}
                        /> :
                        <FaUserCircle 
                            style={{fontSize: '1.6rem'}}
                            onClick={signOutUser}
                        />
                    }
                </li>
            }
            </NavLinks>
            
        </Nav>
    );
}

export default Navbar;