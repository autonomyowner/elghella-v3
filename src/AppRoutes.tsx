import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense, lazy } from "react";

// Existing pages
import Home from "./pages/Home";
import GalleryPage from "./pages/GalleryPage";
import LandRent from "./pages/LandRent";
import MachineRent from "./pages/MachineRent";
import Products from "./pages/Products";
import Expertise from "./pages/Expertise";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Inbox from "./pages/Inbox";
import PublicListings from "./pages/PublicListings";
import SeedlingsPage from "./pages/SeedlingsPage";
import LoginPage from "./pages/auth/LoginPage";
import AddProduct from "./pages/AddProduct";
import UpcomingServices from "./pages/UpcomingServices";

// Specific Marketplace Pages
import AddEquipment from "./pages/EquipmentPage/AddEquipment";
import AddLand from "./pages/LandPage/AddLand";

// Debug & System Status
import SystemStatus from "./pages/Debug/SystemStatus";

// Lazy load improved components for better performance
const AnalyticsDashboard = lazy(() => import("./pages/Dashboard/AnalyticsDashboard"));
const SmartRecommendations = lazy(() => import("./pages/AI/SmartRecommendations"));
const FarmMapPage = lazy(() => import("./pages/FarmMap/FarmMapPage"));
const MapGuide = lazy(() => import("./pages/FarmMap/MapGuide"));
// TODO: Create these pages
// const WeatherPage = lazy(() => import("./pages/Weather/WeatherPage"));

// Use existing page components
import LoadingSpinner from "./components/ui/LoadingSpinner";

// Loading component for enterprise features
const EnterpriseLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <LoadingSpinner size="lg" />
      <p className="text-xl text-gray-600 mt-4 font-medium">
        جاري تحميل الميزات المتقدمة...
      </p>
      <p className="text-sm text-gray-500 mt-2">
        نظام ذكي متطور للزراعة الحديثة
      </p>
    </motion.div>
  </div>
);

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
};

function AppRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<EnterpriseLoading />}>
        <Routes>
              {/* Main Pages */}
              <Route 
                path="/" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <Home />
                  </motion.div>
                } 
              />
              
              {/* Gallery */}
              <Route 
                path="/gallery" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <GalleryPage />
                  </motion.div>
                } 
              />

              {/* Core Features */}
              <Route 
                path="/land-rent" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <LandRent />
                  </motion.div>
                } 
              />
              <Route 
                path="/machine-rent" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <MachineRent />
                  </motion.div>
                } 
              />
              <Route 
                path="/greengrocer" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <Products />
                  </motion.div>
                } 
              />
              <Route 
                path="/expertise" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <Expertise />
                  </motion.div>
                } 
              />

              {/* 🌾 ALGERIA AGRICULTURE FEATURES - FREE COMMUNITY PLATFORM */}
              
              {/* Analytics Dashboard - Agriculture Focus */}
              <Route 
                path="/analytics" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <AnalyticsDashboard />
                  </motion.div>
                } 
              />
              
              {/* AI-Powered Recommendations - Algeria Specific */}
              <Route 
                path="/ai-recommendations" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <SmartRecommendations />
                  </motion.div>
                } 
              />
              
              {/* 🗺️ Farm Map - Interactive Map for Algeria Agriculture */}
              <Route 
                path="/farm-map" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <FarmMapPage />
                  </motion.div>
                } 
              />
              <Route 
                path="/land-map" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <FarmMapPage />
                  </motion.div>
                } 
              />
              <Route 
                path="/interactive-map" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <FarmMapPage />
                  </motion.div>
                } 
              />
              <Route 
                path="/map-guide" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <MapGuide />
                  </motion.div>
                } 
              />

              {/* 🚁 UPCOMING SERVICES - INNOVATION PREVIEW */}
              
              {/* Upcoming Services Overview */}
              <Route 
                path="/upcoming-services" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <UpcomingServices />
                  </motion.div>
                } 
              />
              
              {/* Individual Upcoming Service Pages (redirect to main page) */}
              <Route 
                path="/drone-services" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <UpcomingServices />
                  </motion.div>
                } 
              />
              <Route 
                path="/precision-agriculture" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <UpcomingServices />
                  </motion.div>
                } 
              />
              <Route 
                path="/aerial-monitoring" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <UpcomingServices />
                  </motion.div>
                } 
              />

              {/* Authentication */}
              <Route 
                path="/login" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <LoginPage />
                  </motion.div>
                } 
              />

              {/* Marketplace */}
              <Route 
                path="/add-product" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <AddProduct />
                  </motion.div>
                } 
              />
              
              {/* Specific Marketplace Categories */}
              <Route 
                path="/add-equipment" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <AddEquipment />
                  </motion.div>
                } 
              />
              <Route 
                path="/add-land" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <AddLand />
                  </motion.div>
                } 
              />
              
              {/* Marketplace category aliases */}
              <Route 
                path="/equipment" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <AddEquipment />
                  </motion.div>
                } 
              />
              <Route 
                path="/land" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <AddLand />
                  </motion.div>
                } 
              />

              {/* User Management */}
              <Route 
                path="/profile" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <Profile />
                  </motion.div>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <Settings />
                  </motion.div>
                } 
              />
              <Route 
                path="/inbox" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <Inbox />
                  </motion.div>
                } 
              />

              {/* Public & Authentication */}
              <Route 
                path="/public-listings" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <PublicListings />
                  </motion.div>
                } 
              />
              <Route 
                path="/seedlings" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <SeedlingsPage />
                  </motion.div>
                } 
              />
              
              {/* 🛠️ SYSTEM DEBUG & STATUS */}
              <Route 
                path="/system-status" 
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <SystemStatus />
                  </motion.div>
                } 
              />

              {/* 404 - Not Found */}
              <Route 
                path="*" 
                element={
                  <motion.div 
                    variants={pageVariants} 
                    initial="initial" 
                    animate="animate" 
                    exit="exit"
                    className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.8 }}
                        className="text-9xl font-bold text-green-600 mb-4"
                      >
                        404
                      </motion.div>
                      <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        الصفحة غير موجودة
                      </h1>
                      <p className="text-xl text-gray-600 mb-8">
                        عذراً، الصفحة التي تبحث عنها غير متوفرة في منصة الغلة
                      </p>
                      <motion.a
                        href="/"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        العودة للصفحة الرئيسية
                      </motion.a>
                    </div>
                  </motion.div>
                } 
              />
                                </Routes>
       </Suspense>
     </AnimatePresence>
   );
 }

export default AppRoutes;
