import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../index';
import styled from "styled-components/macro";
import Hero from "./Hero";
import Trending from './Trending';
import Loader from "../Loader/Loader";

const HomeContainer = styled.main`
    padding-top: var(--top-margin);
    padding-bottom: var(--bottom-margin);
    background-color: #f5f5f5;
`;

const HomeView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [trending, setTrending] = useState(null);
    
    const getTrending = async () => {
        setIsLoading(true);
        const campaigns = [];
        const querySnapshot = await getDocs(collection(db, 'campaigns'));
        
        querySnapshot.forEach(doc => {
            campaigns.push(doc.data());
        });
        
        const trending = campaigns.sort((a, b) => b.donations.length - a.donations.length).slice(0, 3);
        setTrending(trending);
        setIsLoading(false);
    }

    useEffect(() => {
        getTrending();
    }, []);
    
    if (!isLoading && trending) {
        return (
            <HomeContainer>
               <Hero />
               <Trending trending={trending} />
            </HomeContainer>
        );
    }
    else {
        return <Loader />
    }

}

export default HomeView;