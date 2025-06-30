import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { navigationLinks } from "../config/NavigationConfig";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        toggleSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  // Handle window resize to close sidebar on desktop view
  useEffect(() => {
    const handleResize = () => {
      // Check if window width is at medium breakpoint (typically 768px for Tailwind)
      if (window.innerWidth >= 768) {
        toggleSidebar(); // Close the sidebar
      }
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, toggleSidebar]);

  // Handle navigation for sidebar links
  const handleNavigation = (href: string) => {
    // Map the section IDs to their corresponding routes
    const sectionToRouteMap: { [key: string]: string } = {
      hero: "/",
      "our-story": "/",
      services: "/",
      "about-us": "/",
    };

    // Determine the target route based on the href
    const targetRoute = sectionToRouteMap[href] || "/";

    // Close the sidebar
    toggleSidebar();

    // If we're not on the target route, navigate to it first
    if (location.pathname !== targetRoute) {
      navigate(targetRoute, { state: { scrollTo: href } });
    } else {
      // If already on the correct route, scroll to the section
      const element = document.getElementById(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Add useEffect to handle scroll on route change
  useEffect(() => {
    if (location.state && (location.state as any).scrollTo) {
      const scrollTo = (location.state as any).scrollTo;
      const element = document.getElementById(scrollTo);
      if (element) {
        // Slight delay to ensure page is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  // Helper function to truncate email
  const truncateEmail = (email: string, maxLength: number = 20) => {
    if (!email) return "";

    if (email.length <= maxLength) return email;

    const atIndex = email.indexOf("@");
    if (atIndex === -1) return email.slice(0, maxLength) + "...";

    const username = email.slice(0, atIndex);
    const domain = email.slice(atIndex);

    if (username.length > maxLength) {
      return username.slice(0, maxLength) + "..." + domain;
    }

    return email;
  };

  return (
    <div
      ref={sidebarRef}
      dir="rtl"
      className={`fixed top-0 h-full w-64 bg-gray-800 shadow-lg transform transition-transform z-[60] 
        ${
          // Desktop: left-side opening, Mobile: right-side opening
          "md:right-auto md:left-0 right-0 " +
          (isOpen
            ? "translate-x-0 md:translate-x-0" // When open, ensure it's at the correct position
            : "translate-x-full md:-translate-x-full") // When closed, slide off-screen
        }`}
    >
      <div className="relative h-full flex flex-col items-center justify-center space-y-4 px-6">
        {/* Close Button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-gray-300 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Sidebar Links */}
        {navigationLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => handleNavigation(link.href)}
            className="text-lg text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-lg w-full text-right font-['NeoSansArabicMedium']"
          >
            {link.name}
          </button>
        ))}

        {/* Login/User Button with Truncated Email */}
        <a
          href={isAuthenticated ? "/profile" : "/login"}
          className="text-lg text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-lg mt-4 w-full text-right font-['NeoSansArabicMedium'] truncate"
        >
          {isAuthenticated ? truncateEmail(user?.email || "") : "تسجيل الدخول"}
        </a>
      </div>
    </div>
  );
}
