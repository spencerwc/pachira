import { useState, useEffect, createContext } from "react";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged
 } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { db } from '../index';
import avatar from '../images/avatar.png';

export const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  const checkForExistingDoc = async (collection, identifier) => {
    const docRef = doc(db, collection, identifier);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  }

  const addToUserCollection = async (user, displayName, isActive) => {
    const userExists = await checkForExistingDoc('users', user.uid);
    
    if (!userExists) {
        setDoc(doc(db, 'users', user.uid), {
            avatar: user.photoURL ? user.photoURL : avatar,
            displayName: displayName,
            email: user.email,
            isActive: isActive,
            following: []
        });
    }
  }

  const addToCampaignCollection = async (displayName) => {
    await setDoc(doc(db, 'campaigns', displayName.toLowerCase()), {
        about: null,
        bannerImage: null,
        created: new Date(),
        currentGoal: null,
        donations: [],
        followers: [],
        name: null,
        posts: [],
        summary: null,
        supporters: [],
        uid: currentUser.uid
    });
  }

  const getUserData = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      setCurrentUser({...auth.currentUser, ...docSnap.data()});
  }

  const signUp = async (displayName, email, password) => {
    const campaignExists = await checkForExistingDoc('campaigns', displayName); 

    if (!campaignExists) {
      return createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
        console.log(userCredential);
        // Add to user collection
        await addToUserCollection(userCredential.user, displayName, true);

        // Create a new campaign using the user display name
        await addToCampaignCollection(displayName);
      });
    }
    else {
      throw new Error('That username already exists');
    }
  };

  const logIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password); 
    return getUserData();
  };

  const logOut = () => {
    return signOut(auth);
  }

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    
    return signInWithPopup(auth, provider).then(async (result) => {
      await addToUserCollection(result.user, result.user.uid, false);
      await getUserData();
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
    });

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        getUserData();
      }
    });

    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <UserAuthContext.Provider value={{currentUser, getUserData, signUp, logIn, googleSignIn, logOut}}>
      {children}
    </UserAuthContext.Provider>
  );
}