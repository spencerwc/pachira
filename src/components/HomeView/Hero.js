import { useNavigate } from "react-router-dom";
import TypeAnimation from 'react-type-animation';
import styled from "styled-components/macro";
import blob from './images/blob.svg';
import growth from './images/growth.png';

const StyledHero = styled.section`
    text-align: center;
    padding-top: 2rem;

    button {
        width: fit-content;
        margin: 1rem auto;
        padding: 0 1rem;
    }

    .sections {
        max-width: 1400px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .desktop-hidden {
        padding: 0 1rem;
    }

    .header {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        
        h1 {
            margin: 0;
            margin-bottom: 1rem;
            font-size: 1.8rem;

            &:nth-of-type(2) {
                color: var(--secondary-color);
            }
        }
    }

    @media (max-width: 768px) {
        .mobile-hidden {
            display: none;
        }
    }

    @media (min-width: 768px) {
        padding-top: 4rem;

        .sections {
            flex-direction: row;
        }

        .desktop-hidden {
            display: none;
        }

        .header {
            font-size: 2.6rem;
        }
    }
`;

const ImageContainer = styled.div`
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
`;

const Hero = () => {
    const navigate = useNavigate();
    const ANIMATION_DELAY = 2000;
    const summary = 'The free and easy way to accept funding, engage supporters, and expand your following.';

    return (
        <StyledHero>
            <div className="sections">
                <div style={{padding: '1rem'}}>
                    <div className="header">
                        <h1>Grow Your&nbsp;</h1>
                            <TypeAnimation
                                cursor={false}
                                sequence={
                                    ['Project', ANIMATION_DELAY, 
                                    'Channel', ANIMATION_DELAY,
                                    'App', ANIMATION_DELAY,
                                    'Portfolio', ANIMATION_DELAY,
                                    'Game', ANIMATION_DELAY,
                                    'Stream', ANIMATION_DELAY,
                                    'Podcast', ANIMATION_DELAY,
                                    'Blog', ANIMATION_DELAY,
                                    'Campaign']
                                }
                                wrapper="h1"
                            />
                    </div>
                    <div className="mobile-hidden">
                        <p>{summary}</p>
                        <button className="secondary" onClick={() => navigate('../register')}>Get Started</button>
                    </div>
                </div>
                <ImageContainer image={blob}>
                    <img src={growth} alt="Pachira " />
                </ImageContainer>
                <div className="desktop-hidden">
                    <p style={{margin: '0.5rem'}}>{summary}</p>
                    <button className="secondary" onClick={() => navigate('../register')}>Get Started</button>
                </div>
            </div>
        </StyledHero>
    );
}

export default Hero;