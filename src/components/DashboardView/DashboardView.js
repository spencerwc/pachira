import { useState, useEffect, useContext } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { db } from '../../index';
import { UserAuthContext } from "../../context/UserAuthContext";
import DisplayNameForm from "./DisplayNameForm";
import Loader from "../Loader/Loader";

const DashboardContainer = styled.section`
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: 80px;
    padding: 0.5rem;
`;

const DashboardView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [campaign, setCampaign] = useState();
    const {currentUser} = useContext(UserAuthContext);
    const navigate = useNavigate();

    const getFromCollection = async (collection, identifier) => {
        const docRef = doc(db, collection, identifier);
        const docSnap = await getDoc(docRef);
        return docSnap;
    }

    const getUserCampaign = async () => {
        setIsLoading(true);

        // Get user displayName from user document
        const userDoc = await getFromCollection('users', currentUser.uid);

        // Check campaign collection for user displayName
        const campaignDoc = await getFromCollection('campaigns', userDoc.data().displayName);
       
        if (campaignDoc.data()) {
            setCampaign({id: campaignDoc.id, ...campaignDoc.data()});
        }
        setIsLoading(false);
    }

    const handleUpdate = async (collection, identifier, newData) => {
        const docRef = doc(db, collection, identifier);

        // Update doc with new changes
        await updateDoc(docRef, {
            ...newData
        });

        // Get the updated campaign
        getUserCampaign();
    }

    useEffect(() => {
        setIsLoading(true);

        if (currentUser !== null) {
            getUserCampaign();
        }
        else {
            navigate('../login');
        }
    }, []);
    
    if (!isLoading && campaign) {
        const campaignName = campaign.id[0].toUpperCase() + campaign.id.slice(1, campaign.id.length);
        
        return (
            <DashboardContainer>
                {/* TODO: Add sections here */}
                <h1>Hi {campaignName}!</h1>
            </DashboardContainer>
        )
    }
    else if (!isLoading && !campaign) {
        return (
            <DashboardContainer>
                <DisplayNameForm handleUpdate={handleUpdate} />
            </DashboardContainer>
        );
    }
    else {
        return <Loader />
    }
}

export default DashboardView;