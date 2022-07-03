import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useContext } from "react";
import styled from "styled-components";
import { UserAuthContext } from "../../context/UserAuthContext";

const Campaign= styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 2px solid var(--border-color);
    border-radius: 1rem;
    padding: 1rem;
`;

const CampaignBanner = styled.div`
    height: 150px;
    border-radius: 1rem;
    background-color: rgba(0, 0, 0, 0.05);
    background-image: url(${props => props.image});
    background-size: cover;
    @media (min-width: 768px) {
        height: 200px;
    }
`;

const ChangeBannerLabel = styled.label`
    border: 2px solid var(--border-color);
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    margin: 0 auto;
    margin-top: 1rem;
    background-color: transparent;
    font-weight: bold;
    cursor: pointer;
    color: var(--font-color);
    width: fit-content;
    :hover {
        border-color: var(--border-hover);
    }

    @media (min-width: 768px) {
        margin-left: 0;
    }
`;

const ChangeBanner = styled.input`
    display: none;
`;

const DashboardCampaign = ({campaign, updateCollection}) => {
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
        const bannerRef = ref(storage, `banners/${currentUser.uid}`);
        
        uploadBytes(bannerRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then( url => {
                updateCollection('campaigns', currentUser.displayName, {bannerImage: url});
            });
        });
    }

    return (
        <Campaign>
            <CampaignBanner image={campaign.bannerImage} />
            <ChangeBannerLabel htmlFor="bannerImage">Change Banner</ChangeBannerLabel>
            <ChangeBanner id="bannerImage" type="file" accept="image/png" onChange={handleChange} />
        </Campaign>
    );
}

export default DashboardCampaign;