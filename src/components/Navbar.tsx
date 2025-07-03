import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navigationConfig } from "../config/NavigationConfig";
import Logo from "../assets/logo.svg";
import { useAuth } from "../context/AuthContext";
import UserMenu from "../components/DropdownUser";
import DropdownAdd from "../components/DropdownAdd";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { FaBoxArchive } from "react-icons/fa6";
import { LogIn } from "lucide-react";

export default function Navbar({
  toggleSidebar,
  isSidebarOpen,
  isRTL = false,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  isRTL?: boolean;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigation = (href: string) => {
    // If href starts with '/', navigate directly
    if (href.startsWith('/')) {
      if (location.pathname !== href) {
        navigate(href);
      }
      return;
    }
    const sectionToRouteMap: { [key: string]: string } = {
      hero: "/",
      "our-story": "/",
      services: "/",
      "about-us": "/",
    };
    const targetRoute = sectionToRouteMap[href] || "/";
    if (location.pathname !== targetRoute) {
      navigate(targetRoute, { state: { scrollTo: href } });
    } else {
      const element = document.getElementById(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const scrollTo = location.state.scrollTo;
      const element = document.getElementById(scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ease-in-out
      ${
        isScrolled
          ? "bg-gray-800/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }
      ${isRTL ? "right-0" : "left-0"}
    `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center h-16 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          {/* Hamburger Menu for Desktop */}
          <div
            className={`hidden md:flex items-center ${isRTL ? "ml-4" : "mr-4"}`}
          >
            <button
              onClick={toggleSidebar}
              className={`
                focus:outline-none 
                focus:ring-2 
                rounded-md
                flex items-center justify-center
                ${
                  isScrolled
                    ? "text-white focus:ring-white/50"
                    : "text-white focus:ring-white/50"
                }
              `}
            >
              <AiOutlineMenu className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-shrink-0">
            <Link
              onClick={() => handleNavigation("hero")}
              to="/"
              className={`
                text-lg font-bold 
                font-['NeoSansArabicBold']
                ${isScrolled ? "text-white" : "text-white"}
              `}
            >
              <img src={Logo} alt="Logo" className="h-10" />
            </Link>
          </div>

          <div
            className={`absolute transform ${
              isRTL ? "right-1/2 translate-x-1/2" : "left-1/2 -translate-x-1/2"
            } hidden md:flex space-x-6`}
          >
            {navigationConfig.map((link) => (
                              <button
                  key={link.path}
                  onClick={() => handleNavigation(link.path)}
                className={`
                  font-['NeoSansArabicMedium']
                  transition-colors duration-300
                  ${
                    isScrolled
                      ? "text-white hover:text-gray-300 hover:border-gray-300"
                      : "text-white hover:text-gray-200 hover:border-gray-200"
                  }
                  border-b-2 border-transparent 
                  hover:border-current
                  pb-1
                `}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <div className="flex items-center space-x-4 md:space-x-6">
              {/* Public Listings Link */}
              <div className="flex items-center justify-center w-6 h-6">
                <Link
                  to="/publiclistings"
                  className={`flex items-center justify-center w-full h-full text-green-400 hover:text-green-300 transition-colors duration-300 font-bold`}
                  title="جميع العناصر العامة"
                >
                  <FaBoxArchive className="w-6 h-6" />
                </Link>
              </div>

              {/* Unified User Icon with consistent wrapper */}
              <div className="flex items-center justify-center w-6 h-6">
                {!isAuthenticated ? (
                  <Link
                    to="/Login"
                    className={`flex items-center justify-center w-full h-full text-white ${
                      isScrolled ? "hover:text-gray-300" : "hover:text-gray-200"
                    } transition-colors duration-300`}
                  >
                    <LogIn className="w-6 h-6" />
                  </Link>
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <UserMenu
                      isScrolled={isScrolled}
                      isRTL={isRTL}
                      iconClassName="w-6 h-6"
                    />
                  </div>
                )}
              </div>

              {/* Add Button with consistent wrapper */}
              <div className="flex items-center justify-center w-6 h-6">
                {isAuthenticated ? (
                  <div className="flex items-center justify-center w-full h-full">
                    <DropdownAdd
                      isScrolled={isScrolled}
                      isRTL={isRTL}
                      iconClassName="w-6 h-6"
                    />
                  </div>
                ) : (
                  <Link
                    to="/Login"
                    className={`flex items-center justify-center w-full h-full text-white ${
                      isScrolled ? "hover:text-gray-300" : "hover:text-gray-200"
                    } transition-colors duration-300`}
                  >
                    <AiOutlinePlus className="w-6 h-6" />
                  </Link>
                )}
              </div>

              <div className="flex items-center justify-center w-6 h-6">
                {isAuthenticated && (
                  <button
                    onClick={() => navigate("/manage")}
                    className={`flex items-center justify-center w-full h-full text-white ${
                      isScrolled ? "hover:text-gray-300" : "hover:text-gray-200"
                    } transition-colors duration-300`}
                  >
                    <FaBoxArchive className="w-6 h-6" />
                  </button>
                )}
              </div>

              {/* Inbox Link - Only for authenticated users */}
              <div className="flex items-center justify-center w-6 h-6">
                {isAuthenticated && (
                  <Link
                    to="/inbox"
                    className={`flex items-center justify-center w-full h-full text-blue-400 hover:text-blue-300 transition-colors duration-300 font-bold`}
                    title="صندوق الرسائل"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.659 1.591l-7.5 7.5a2.25 2.25 0 01-3.182 0l-7.5-7.5A2.25 2.25 0 012.25 6.993V6.75"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Menu Button - Only visible on mobile */}
            <div className="md:hidden">
              {!isSidebarOpen && (
                <button
                  onClick={toggleSidebar}
                  className={`
                    focus:outline-none 
                    focus:ring-2 
                    rounded-md
                    flex items-center justify-center
                    ${
                      isScrolled
                        ? "text-white focus:ring-white/50"
                        : "text-white focus:ring-white/50"
                    }
                  `}
                >
                  <AiOutlineMenu className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
