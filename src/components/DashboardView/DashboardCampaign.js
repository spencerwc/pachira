import { useContext } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserAuthContext } from "../../context/UserAuthContext";
import styled from "styled-components/macro";
import CampaignDetails from "./CampaignDetails";
import DashboardGoal from "./DashboardGoal";

const StyledCampaignSection = styled.section`
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04), 0 3px 10px rgba(0, 0, 0, 0.04);

    .banner-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }

    .campaign-banner {
        height: 150px;
        border-radius: 1rem;
        background-color: rgba(0, 0, 0, 0.05);
        background-image: url(${props => props.image});
        background-size: cover;
        background-position: center;
    }

    .change-banner-label {
        border: none;
        border-radius: 2rem;
        padding: 0.5rem 1rem;
        margin: 0;
        margin-top: 1rem;
        background-color: var(--secondary-color);
        font-weight: bold;
        cursor: pointer;
        color: #fff;
        width: fit-content;
        &:hover {
            background-color: var(--secondary-hover);
        }
    }

    .change-banner {
        display: none;
    }

    @media (min-width: 768px) {
        .campaign-banner {
            height: 200px;
        }
    }
`;

const DashboardCampaign = ({campaign, updateCollection, setIsLoading}) => {
    const {currentUser} = useContext(UserAuthContext);
    const storage = getStorage();

    const handleChange = (e) => {
        const image = e.target.files[0];
        
        if (image !== null) {
            handleUpload(image);
        }
        e.target.value = null;
    }

    const handleUpload = (image) => {
        setIsLoading(true);
        const bannerRef = ref(storage, `banners/${currentUser.uid}`);
        
        uploadBytes(bannerRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then( url => {
                updateCollection('campaigns', currentUser.displayName, {bannerImage: url});
            });
        }).catch(error => {
            console.error(error);
            setIsLoading(false);
        });
    }

    const handleUpdate = (newData) => {
        updateCollection('campaigns', currentUser.displayName, {...newData});
    }

    return (
        <StyledCampaignSection>
            <h2 style={{margin: 0, marginBottom: '1rem'}}>Campaign Settings</h2>
            <div className="banner-container">
                <div className="campaign-banner" image={campaign.bannerImage} />
                <label className="change-banner-label" htmlFor="bannerImage">Change Banner</label>
                <input className="change-banner" id="bannerImage" type="file" accept="image/png" onChange={handleChange} />
            </div>
            <CampaignDetails 
                name={campaign.name}
                summary={campaign.summary}
                about={campaign.about}
                handleUpdate={handleUpdate}
            />
            <DashboardGoal 
                currentGoal={campaign.currentGoal}
                handleUpdate={handleUpdate}
            />
        </StyledCampaignSection>
    );
}

export default DashboardCampaign;