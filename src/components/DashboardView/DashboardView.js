import { useState, useEffect, useContext } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { db } from '../../index';
import { UserAuthContext } from "../../context/UserAuthContext";
import DisplayNameForm from "./DisplayNameForm";
import DashboardProfile from "./DashboardProfile";
import Loader from "../Loader/Loader";

const DashboardContainer = styled.section`
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: 80px;
    padding: 1rem;

    @media (min-width: 768px) {
        margin-top: 1rem;
    }
`;

const DashboardSections = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    margin-top: 1rem;
        
    @media(min-width: 768px) {
        grid-template-columns: 1fr 2fr;
    }
`;

const SectionColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
            // TODO: Revisit this
            navigate('/');
        }
    }, []);
    
    if (!isLoading && campaign) {
        const campaignName = campaign.id[0].toUpperCase() + campaign.id.slice(1, campaign.id.length);
        
        return (
            <DashboardContainer>
                <h1 style={{margin: 0}}>Hi {campaignName}!</h1>
                <DashboardSections>
                    <SectionColumn>
                        <DashboardProfile 
                            avatar={currentUser.avatar} 
                            displayName={currentUser.displayName} 
                            email={currentUser.email}
                            handleUpdate={handleUpdate}
                            setIsLoading={setIsLoading}
                        />
                    </SectionColumn>
                    <SectionColumn>
                        {/* TODO: Add campaign settings */}
                    </SectionColumn>
                </DashboardSections>
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