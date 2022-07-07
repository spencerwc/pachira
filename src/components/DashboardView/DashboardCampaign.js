import { useContext } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styled from "styled-components";
import { UserAuthContext } from "../../context/UserAuthContext";
import CampaignDetails from "./CampaignDetails";
import DashboardGoal from "./DashboardGoal";

const Campaign= styled.section`
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04), 0 3px 10px rgba(0, 0, 0, 0.04);
`;

const BannerContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
`;

const CampaignBanner = styled.div`
    height: 150px;
    border-radius: 1rem;
    background-color: rgba(0, 0, 0, 0.05);
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    @media (min-width: 768px) {
        height: 200px;
    }
`;

const ChangeBannerLabel = styled.label`
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
    :hover {
        background-color: var(--secondary-hover);
    }
`;

const ChangeBanner = styled.input`
    display: none;
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
        <Campaign>
            <h2 style={{margin: 0, marginBottom: '1rem'}}>Campaign Settings</h2>
            <BannerContainer>
                <CampaignBanner image={campaign.bannerImage} />
                <ChangeBannerLabel htmlFor="bannerImage">Change Banner</ChangeBannerLabel>
                <ChangeBanner id="bannerImage" type="file" accept="image/png" onChange={handleChange} />
            </BannerContainer>
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
        </Campaign>
    );
}

export default DashboardCampaign;