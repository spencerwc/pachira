import { Link, NavLink } from "react-router-dom";
import  { MdHome, MdSearch, MdSettings } from 'react-icons/md';
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

    > li > a {
        display: flex;
        align-items: center;
        text-decoration: none;

        :visited {
            color: inherit;
        }
        
        > svg {
            font-size: 1.6rem;
            
            @media(min-width: 768px) {
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
`;

const NavUser = styled.div`
    display: flex;
    align-items: center;
    margin: 0 2rem;
    
   > div {
        display: block;
        background-color: #fff;
        border-radius: 100%;
        padding: 1.5rem;
   }
`;

const Navbar = () => {
    return (
        <Nav>
            <NavLogo>
                <Link to="/"><img src={sprout} alt="" /></Link>
            </NavLogo>
            <NavLinks>
                <li><NavLink to="/"><MdHome /><span>Home</span></NavLink></li>
                <li><NavLink to="explore"><MdSearch /><span>Explore</span></NavLink></li>
                <li><NavLink to="settings"><MdSettings /><span>Settings</span></NavLink></li>
            </NavLinks>
            <NavUser>
                <div></div>
            </NavUser>
        </Nav>
    );
}

export default Navbar;