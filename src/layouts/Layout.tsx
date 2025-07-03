import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AppRoutes from "../AppRoutes";
import ErrorBoundary from "../components/ui/ErrorBoundary";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ErrorBoundary>
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
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </main>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            className: 'text-sm',
            style: {
              background: '#1f2937',
              color: '#fff',
              borderRadius: '8px',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </ErrorBoundary>
  );
}
