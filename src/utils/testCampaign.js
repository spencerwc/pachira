import avatar from '../images/avatar.png';

export const testCampaign = {
    created: new Date(),
    campaignName: 'stardropvalley',
    name: 'Stardrop Valley',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    bannerImage: null,
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    donations: [
        {
            id: 'test',
            displayName: 'test',
            avatar: avatar,
            date: {
                seconds: Date.now() / 1000
            },
            donationMessage: 'Hello World!',
            donationAmount: 100
        },
        {
            id: 'test2',
            displayName: 'Test 2',
            avatar: avatar,
            date: {
                seconds: Date.now() / 1000
            },
            donationMessage: 'Look at me!',
            donationAmount: 200
        }
    ],
    supporters: {
        test: {
            id: 'test',
            displayName: 'test',
            avatar: avatar,
            donationTotal: 100
        },
        test2: {
            id: 'test2',
            displayName: 'test2',
            avatar: avatar,
            donationTotal: 200
        },
        test3: {
            id: 'test3',
            displayName: 'test3',
            avatar: avatar,
            donationTotal: 300
        },
        test4: {
            id: 'test4',
            displayName: 'test4',
            avatar: avatar,
            donationTotal: 400
        },
        test5: {
            id: 'test5',
            displayName: 'test5',
            avatar: avatar,
            donationTotal: 500
        },
        test6: {
            id: 'test6',
            name: 'test6',
            avatar: avatar,
            donationTotal: 600
        }
    },
    followers: ["", ""],
    posts: [""],
    comments: [],
    goal: {
        name: 'Add perfect fruit trees',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        currentFunding: 25000,
        targetFunding: 100000
    }
}