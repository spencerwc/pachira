import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useContext } from "react";
import { UserAuthContext } from "../../context/UserAuthContext";
import styled from "styled-components/macro";

const StyledProfile = styled.section`
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 1rem;
    overflow-wrap: anywhere;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04), 0 3px 10px rgba(0, 0, 0, 0.04);

    img {
        border-radius: 100%;
        background-color: var(--border-color);
        border: 4px solid #fff;
        width: 100px;
        height: 100px;
    }

    input {
        display: none;
    }

    .avatar-container {
        margin: 0 auto;
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .change-avatar {
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

    @media (min-width: 768px) {
        img {
            width: 120px;
            height: 120px;
        }
    }
`;

const DashboardProfile = ({avatar, displayName, email, updateCollection, setIsLoading}) => {
    const {currentUser} = useContext(UserAuthContext);
    const storage = getStorage();

    const handleChange = (e) => {
        const image = e.target.files[0];
        
        if (avatar !== null) {
            handleUpload(image);
        }
        e.target.value = null;
    }

    const handleUpload = (image) => {
        setIsLoading(true);
        const avatarRef = ref(storage, `avatars/${currentUser.uid}`);
        
        uploadBytes(avatarRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then( async (url) => {
                // Upload user avatar
                updateCollection('users', currentUser.uid, {avatar: url});

                // Update campaign avatar
                updateCollection('campaigns', currentUser.displayName, {avatar: url});
            }).catch(error => {
                console.error(error);
                setIsLoading(false);
            });
        });
    }

    return (
        <StyledProfile>
            <h2 style={{margin: '0 0 1rem 0'}}>User Settings</h2>
            <div className="avatar-container">
                <img src={avatar} alt="" referrerPolicy="no-referrer"/>
                <label className="change-avatar" htmlFor="avatar">Change Avatar</label>
                <input id="avatar" type="file" accept="image/png" onChange={handleChange} />
            </div>
            <strong>Username</strong>
            <p style={{margin: 0, marginBottom: '1rem'}}>{displayName}</p>
            <strong>Email Address</strong>
            <p style={{margin: 0}}>{email}</p>
        </StyledProfile>
    );
}

export default DashboardProfile;