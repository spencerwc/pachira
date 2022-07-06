import { useNavigate } from "react-router-dom";
import TypeAnimation from 'react-type-animation';
import styled from "styled-components";
import blob from './images/blob.svg';
import growth from './images/growth.png';

const HeroSection = styled.section`
    text-align: center;
    padding-top: 2rem;

    @media (min-width: 768px) {
        padding-top: 4rem;
    }
`;

const Sections = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const MobileHide = styled.div`
    @media (max-width: 768px) {
        display: none;
    }
`;

const DesktopHide = styled.div`
    padding: 0 1rem;
    @media (min-width: 768px) {
        display: none;
    }
`;

const Heading = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    > h1 {
        margin: 0;
        margin-bottom: 1rem;
        font-size: 1.8rem;

        @media (min-width: 768px) {
            font-size: 2.6rem;
        }

        :nth-of-type(2) {
            color: var(--secondary-color);
        }
    }
`;

const GetStarted = styled.button`
    border: none;
    border-radius: 2rem;
    margin-top: 1rem;
    padding: 1rem 2rem;
    color: #fff;
    background-color: var(--secondary-color);
    font-weight: bold;
    min-height: 40px;
    cursor: pointer;
    :hover {
        background-color: var(--secondary-hover);
    }
`;

const ImageContainer = styled.div`
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
`;

const HeroImage = styled.img`
    width: 100%;
`;

const Hero = () => {
    const navigate = useNavigate();
    const ANIMATION_DELAY = 2000;
    const summary = 'The free and easy way to accept funding, engage supporters, and expand your following.';

    return (
        <HeroSection >
            <Sections>
                <div style={{padding: '1rem'}}>
                    <Heading>
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
                    </Heading>
                    <MobileHide>
                        <p>{summary}</p>
                        <GetStarted onClick={() => navigate('../register')}>Get Started</GetStarted>
                    </MobileHide>
                </div>
                <ImageContainer image={blob}>
                    <HeroImage src={growth} alt="" />
                </ImageContainer>
                <DesktopHide>
                    <p style={{margin: '0.5rem'}}>{summary}</p>
                    <GetStarted onClick={() => navigate('../register')}>Get Started</GetStarted>
                </DesktopHide>
            </Sections>
        </HeroSection>
    );
}

export default Hero;