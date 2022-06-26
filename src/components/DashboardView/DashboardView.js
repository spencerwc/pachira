import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore"; 
import { db } from '../../index';
import styled from "styled-components";
import { getAuth } from "firebase/auth";


const DashboardView = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [isLoading, setIsLoading] = useState(false);
    const [campaign, setCampaign] = useState();

    const getCampaign = async () => {
        const docRef = doc(db, "campaigns", user.uid);
        const docSnap = await getDoc(docRef);
        setCampaign(docSnap.data());
        setIsLoading(false);
    }
    
    useEffect(() => {
        if (user) {
            setIsLoading(true);
            getCampaign();
        }
    }, [user]);

    if (!isLoading && campaign) {
        return <p>{user.uid}</p>
    }
    else if (!user) {
        return <p>Not logged in</p>
    }
    else {
        return <p>Loading</p>
    }
}

export default DashboardView;