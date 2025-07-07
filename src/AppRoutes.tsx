import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LandRent from "./pages/LandRent";
import MachineRent from "./pages/MachineRent";
import Products from "./pages/Products";
import Expertise from "./pages/Expertise";
import LoginPage from "./pages/Login/Section-Login";
import SignUpPage from "./pages/Login/Section-SignUp";
import AddProducts from "./pages/ProductsPage/AddProducts";
import AddLand from "./pages/LandPage/AddLand";
import ProfilePage from "./pages/Profile";
import SettingsPage from "./pages/Settings";
import ProtectedRoute from "./ProtectedRoute";
import AddEquipment from "./pages/EquipmentPage/AddEquipment";
import ManageListingsPage from "./pages/Profile/ManageInventory";
import PublicListings from "./pages/PublicListings";
import Inbox from "./pages/Inbox";
import AddExpert from "./pages/ExpertsPage/AddExpert";
import ExpertsList from "./pages/ExpertsPage/ExpertsList";
import SeedlingsPage from "./pages/SeedlingsPage";
import FutureServices from "./pages/FutureServices";
import LivestockMarket from "./pages/LivestockMarket";
import BeekeepingServices from "./pages/BeekeepingServices";
import AboutUs from "./pages/AboutUs";
import { MarketplaceModalProvider } from "./context/MarketplaceModalContext";

const AppRoutes = () => {
  return (
    <MarketplaceModalProvider>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/land-rent" element={<LandRent />} />

        <Route path="/machine-rent" element={<MachineRent />} />

        <Route path="/greengrocer" element={<Products />} />

        <Route path="/expertise" element={<Expertise />} />

        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Signup" element={<SignUpPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute redirectTo="/" />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route element={<ProtectedRoute redirectTo="/" />}>
          <Route path="/manage" element={<ManageListingsPage />} />
        </Route>

        <Route element={<ProtectedRoute redirectTo="/" />}>
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route element={<ProtectedRoute redirectTo="/login" />}>
          <Route path="/addproduct" element={<AddProducts />} />
        </Route>

        <Route element={<ProtectedRoute redirectTo="/login" />}>
          <Route path="/addlandrent" element={<AddLand />} />
        </Route>

        <Route element={<ProtectedRoute redirectTo="/login" />}>
          <Route path="/addequipment" element={<AddEquipment />} />
        </Route>

        <Route element={<ProtectedRoute redirectTo="/login" />}>
          <Route path="/inbox" element={<Inbox />} />
        </Route>

        <Route element={<ProtectedRoute redirectTo="/login" />}>
          <Route path="/experts/add" element={<AddExpert />} />
        </Route>

        <Route path="/publiclistings" element={<PublicListings />} />
        <Route path="/experts" element={<ExpertsList />} />
        <Route path="/SeedlingsPage" element={<SeedlingsPage />} />
        <Route path="/future-services" element={<FutureServices />} />
        <Route path="/services/livestock-market" element={<LivestockMarket />} />
        <Route path="/services/beekeeping" element={<BeekeepingServices />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </MarketplaceModalProvider>
  );
};

export default AppRoutes;
