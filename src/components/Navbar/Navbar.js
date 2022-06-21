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
        padding: 0.5rem;
        padding-left: 2rem;
    }
`;

const NavLinks = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-grow: 1;
    justify-content: space-around;
`;

const NavLink = styled.li`
    display: block;
    background-color: #fff;
    border-radius: 100%;
    padding: 1rem;
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

const tempLinks = ["Home", "Explore", "About"];

const Navbar = () => {
    return (
        <Nav>
            <NavLogo>
                <img src={sprout} alt="" />
            </NavLogo>
            <NavLinks>
                {tempLinks.map(link => <NavLink key={link}></NavLink>)}
            </NavLinks>
            <NavUser>
                <div>

                </div>
            </NavUser>
        </Nav>
    );
}

export default Navbar;