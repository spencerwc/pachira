<p align="center">
  <a href="https://pachira-acc77.web.app/">
    <h1 align="center">Pachira</h1>
  </a>
</p> 
<p align="center">
  A prototype crowdfunding / engagement application built around passion projects. Create, style, and add content to your campaign, browse other campaigns, and follow and support your favorites.
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/84942739/183565896-861a637f-72ec-4671-b9ec-808177099d0d.png" />
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/84942739/183565988-e2befb3c-4a7d-4c43-b49b-725c6f754964.png" />
</p>

## Set up Firebase
For a more detailed explanation, see the [Firebase documentation for getting started](https://firebase.google.com/docs/web/setup?authuser=0&hl=en). 
1. Add a new project from the [Firebase console](https://console.firebase.google.com/).
2. On the Project Overview page, register a web app and follow the required steps.
3. Save the Firebase configuration object for your project.
4. Enable Email/Password and Google authentication for the project.
5. Enable the Firestore database for the project.

## Set up and run the project 

1. Install dependencies
```bash
npm install
```

2. Create a `.env` file in the root directory
```bash
touch .env
```

3. Create variables for your Firebase project configuration and save them in the `.env` file
```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
```

4. Run the project
```bash
npm run start
```

## Made With
- [Dotenv](https://github.com/motdotla/dotenv#readme)
- [Firebase & Firestore](https://firebase.google.com/)
- [Jest](https://jestjs.io/)
- [React Router](https://reactrouter.com/)
- [Styled Components](https://styled-components.com/)
