import { useState, useEffect, useContext } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../../context/UserAuthContext";
import { db } from '../../index';
import styled from "styled-components/macro";
import DisplayNameForm from "./DisplayNameForm";
import DashboardProfile from "./DashboardProfile";
import DashboardCampaign from "./DashboardCampaign";
import Loader from "../Loader/Loader";

const StyledDashboard = styled.main`
    max-width: 1000px;
    margin: 0 auto;
    padding: 75px 1rem 100px 1rem;

    h1 {
        margin: 1rem 0;
    }

    .dashboard-sections {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
        margin-top: 1rem;
    }

    .section-column {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    @media (min-width: 768px) {
        .dashboard-sections {
            grid-template-columns: 1fr 2fr;
        }
    }
`;

const DashboardView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [campaign, setCampaign] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const {currentUser, getUserData} = useContext(UserAuthContext);
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

        const campaignData = campaignDoc.data();
       
        if (campaignData) {
            setCampaign(campaignData);
        }
        setIsLoading(false);
    }

    const updateDisplayName = (newName) => {
        setDisplayName(newName);
    }

    const updateCollection = async (collection, identifier, newData) => {
        const docRef = doc(db, collection, identifier);

        // Update doc with new changes
        await updateDoc(docRef, {
            ...newData
        });

        if (collection === 'campaigns') {
            getUserCampaign();
        }
        else {
            getUserData();
        }
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
            <StyledDashboard>
                <h1>Hi {campaignName}!</h1>
                <div className="dashboard-sections">
                    <div className="section-column">
                        <DashboardProfile 
                            avatar={currentUser.avatar} 
                            displayName={currentUser.displayName} 
                            email={currentUser.email}
                            updateCollection={updateCollection}
                            setIsLoading={setIsLoading}
                        />
                    </div>
                    <div className="section-column">
                        <DashboardCampaign 
                            campaign={campaign} 
                            updateCollection={updateCollection} 
                            setIsLoading={setIsLoading}
                        />
                    </div>
                </div>
            </StyledDashboard>
        )
    }
    else if (!isLoading && !campaign) {
        return (
            <StyledDashboard>
                <DisplayNameForm 
                    displayName={displayName}
                    updateDisplayName={updateDisplayName} 
                    updateCollection={updateCollection}
                    getUserCampaign={getUserCampaign}
                    setIsLoading={setIsLoading}
                />
            </StyledDashboard>
        );
    }
    else {
        return <Loader />
    }
}

export default DashboardView;