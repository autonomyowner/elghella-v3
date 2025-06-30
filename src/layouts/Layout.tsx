import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AppRoutes from "../AppRoutes";

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div
      className={`min-h-screen min-w-[320px] mx-auto bg-gradient-to-br from-green-900 to-gray-900 text-white`}
    >
      <Navbar
        toggleSidebar={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isSidebarOpen={isMobileMenuOpen}
      />
      <Sidebar
        isOpen={isMobileMenuOpen}
        toggleSidebar={() => setIsMobileMenuOpen(false)}
      />
      <main
        className={`flex items-center justify-center min-h-screen transition-all duration-300 ease-in-out 
          ${isMobileMenuOpen ? "md:ml-64" : ""}`}
      >
        <AppRoutes />
      </main>
    </div>
  );
}
