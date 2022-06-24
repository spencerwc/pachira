import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import CampaignView from "../CampaignView/CampaignView";
import ExploreView from "../ExploreView/ExploreView";
import SupportersView from "../SupportersView/SupportersView";


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home Route</div>} />
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
