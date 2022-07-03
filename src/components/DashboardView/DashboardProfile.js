import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useContext } from "react";
import { UserAuthContext } from "../../context/UserAuthContext";
import styled from "styled-components";

const Profile = styled.div`
    border: 2px solid var(--border-color);
    border-radius: 1rem;
    padding: 1rem;
    overflow-wrap: anywhere;
`;

const AvatarContainer = styled.div`
    margin: 0 auto;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    :hover {
        > button {
            display: block;
        }
    }
`;

const Avatar = styled.img`
    border-radius: 100%;
    background-color: var(--border-color);
    border: 4px solid #fff;
    width: 100px;
    height: 100px;

    @media (min-width: 768px) {
        width: 120px;
        height: 120px;
    }
`;

const ChangeAvatarLabel = styled.label`
    border: 2px solid var(--border-color);
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    background-color: transparent;
    font-weight: bold;
    cursor: pointer;
    color: var(--font-color);
    :hover {
        border-color: var(--border-hover);
    }
`;

const ChangeAvatar = styled.input`
    display: none;
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
            getDownloadURL(snapshot.ref).then( url => {
                // Upload user avatar
                updateCollection('users', currentUser.uid, {avatar: url});

                // Update campaign avatar
                updateCollection('campaigns', currentUser.displayName, {avatar: url});
            });
        });
    }

    return (
        <Profile>
            <AvatarContainer>
                <Avatar src={avatar} alt="" referrerPolicy="no-referrer"/>
                <ChangeAvatarLabel htmlFor="avatar">Change Avatar</ChangeAvatarLabel>
                <ChangeAvatar id="avatar" type="file" accept="image/png" onChange={handleChange} />
            </AvatarContainer>
            <strong>Username</strong>
            <p style={{margin: 0, marginBottom: '1rem'}}>{displayName}</p>
            <strong>Email Address</strong>
            <p style={{margin: 0}}>{email}</p>
        </Profile>
    );
}

export default DashboardProfile;