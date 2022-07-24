import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../index';

export const getCampaignData = async (campaignName) => {
    const docRef = doc(db, "campaigns", campaignName);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export const getUserData = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export const getSupporterData = async (supporters) => {
    const supportersArr = Object.values(supporters);
    const supporterData = await Promise.all(supportersArr.map(async supporter => {
        const userData = await getUserData(supporter.uid);
        return {...userData, ...supporter};
    }));
    return supporterData;
}

export const getDonationData = async (donations) => {
    const donationData = await Promise.all(donations.map(async donation => {
        const userData = await getUserData(donation.uid);
        return {...userData, ...donation};
    }));
    return donationData;
}

export const updateDonationsList = (currentDonations, newDonation) => {
    const donations = currentDonations;
    donations.push(newDonation);
    return donations;
}

export const updateSupportersList = (currentSupporters, supporterId, donationAmount) => {
    const supporters = currentSupporters;

    // Check for existing donations
    if (supporters.hasOwnProperty(supporterId)) {
        supporters[supporterId].donationTotal += donationAmount; 
    }
    else {
        const newSupporter = {
            uid: supporterId,
            donationTotal: donationAmount
        }
        supporters[supporterId] = newSupporter;
    }
    return supporters;
}

export const updateGoal = (currentGoal, donationAmount) => {
    let newGoal = null;

    if (currentGoal) {
        newGoal = currentGoal;
        const newFunding = currentGoal.currentFunding + donationAmount;
        newGoal.currentFunding = newFunding;
    }
    return newGoal;
}

export const updateFollowers = async (followerId, campaignName) => {
    const docRef = doc(db, 'campaigns', campaignName);
    const docSnap = await getDoc(docRef);
    const followers = docSnap.data().followers;
    const followerIndex = followers.indexOf(followerId);

    // If user doesn't follow, add to followers
    if (followerIndex === -1) {
        followers.push(followerId);
    }
    else {
        // If user already follows, unfollow
        followers.splice(followerIndex, 1);
    }

    await updateDoc(docRef, {
        followers: followers
    });
}

export const updateCampaignOnDonation = async (campaignName, newDonation) => {
    const docRef = doc(db, 'campaigns', campaignName);
    const docSnap = await getDoc(docRef);
    const campaignData = docSnap.data();

    if (campaignData) {
        const newDonations = updateDonationsList(campaignData.donations, newDonation);
        const newSupporters = updateSupportersList(campaignData.supporters, newDonation.uid, newDonation.donationAmount);
        const newGoal = updateGoal(campaignData.currentGoal, newDonation.donationAmount);

        await updateDoc(docRef, {
            donations: newDonations,
            currentGoal: newGoal,
            supporters: newSupporters,
        });
    }
}