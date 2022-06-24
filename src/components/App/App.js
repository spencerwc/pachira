import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SignUpView from '../SignUpView/SignUpView';
import LoginView from '../LoginView/LoginView';
import CampaignView from "../CampaignView/CampaignView";
import ExploreView from "../ExploreView/ExploreView";
import SupportersView from "../SupportersView/SupportersView";

const App = () => {
  const [user, setUser] = useState(null);
  
  const logIn = (user) => {
    setUser(user);
  }

  const logOut = (user) => {
    setUser(null);
  }
  
  return (
    <BrowserRouter>
      <Navbar user={user} logIn={logIn} logOut={logOut} />
      <Routes>
        <Route path="/" element={<div>Home Route</div>} />
        <Route path="login" element={<LoginView logIn={logIn} />} />
        <Route path="register" element={<SignUpView logIn={logIn} />} />
        <Route path="explore" element={<ExploreView />} />
        <Route path="settings" element={<div>Settings Route</div>} />
        <Route path=":campaignName" element={<CampaignView />} />
        <Route path=":campaignName/supporters" element={<SupportersView />} />
        <Route path=":campaignName/followers" element={<div>Follower Route</div>} />
        <Route path=":campaignName/posts" element={<div>Posts Route</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
