import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { UserAuthProvider } from '../../context/UserAuthContext';
import WithHeader from '../Layouts/WithHeader';
import Navbar from "../Navbar/Navbar";
import SignUpView from '../SignUpView/SignUpView';
import LoginView from '../LoginView/LoginView';
import CampaignView from "../CampaignView/CampaignView";
import ExploreView from "../ExploreView/ExploreView";
import SupportersView from "../SupportersView/SupportersView";
import DashboardView from '../DashboardView/DashboardView';
import Error from "../Error/Error";

const App = () => {
  return (
    <UserAuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<WithHeader />}>
            <Route path="/" element={<div>Home Route</div>} />
            <Route path="explore" element={<ExploreView />} />
            <Route path="dashboard" element={<DashboardView />} />
            <Route path=":campaignName" element={<CampaignView />} />
            <Route path=":campaignName/supporters" element={<SupportersView />} />
            <Route path=":campaignName/followers" element={<div>Follower Route</div>} />
            <Route path=":campaignName/posts" element={<div>Posts Route</div>} />
            <Route path="*" element={<Error />} />
          </Route>
          <Route path="login" element={<LoginView />} />
          <Route path="register" element={<SignUpView />} />
        </Routes>
      </BrowserRouter>
    </UserAuthProvider>
  );
}

export default App;
