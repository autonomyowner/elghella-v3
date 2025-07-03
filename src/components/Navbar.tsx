import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navigationConfig } from "../config/NavigationConfig";
import Logo from "../assets/logo.svg";
import { useAuth } from "../context/AuthContext";
import UserMenu from "../components/DropdownUser";
import DropdownAdd from "../components/DropdownAdd";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { FaBoxArchive } from "react-icons/fa6";
import { LogIn, ChevronDown } from "lucide-react";

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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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
    // Close any open dropdown
    setOpenDropdown(null);
    
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

  // Grouped navigation items
  const mainItems = [
    { name: "الرئيسية", path: "/" },
    { name: "معرض الصور", path: "/gallery" }
  ];

  const servicesDropdown = [
    { name: "تأجير الأراضي", path: "/land-rent", icon: "🌾" },
    { name: "تأجير المعدات", path: "/machine-rent", icon: "🚜" },
    { name: "المنتجات الزراعية", path: "/greengrocer", icon: "🥬" },
    { name: "الخدمات الاستشارية", path: "/expertise", icon: "👨‍🌾" },
    { name: "الشتلات والبذور", path: "/seedlings", icon: "🌱" }
  ];

  const enterpriseDropdown = [
    { name: "لوحة التحليلات", path: "/analytics", icon: "📊", badge: "Pro" },
    { name: "التوصيات الذكية", path: "/ai-recommendations", icon: "🤖", badge: "AI" },
    { name: "باقات الاشتراك", path: "/subscription", icon: "👑", badge: "Hot" },
    { name: "بوابة الدفع", path: "/payment", icon: "💳" },
    { name: "لوحة الإدارة", path: "/admin", icon: "🛡️", badge: "Admin" }
  ];

  const accountDropdown = [
    { name: "الملف الشخصي", path: "/profile", icon: "👤" },
    { name: "الإعدادات", path: "/settings", icon: "⚙️" },
    { name: "الرسائل", path: "/inbox", icon: "💬" },
    { name: "القوائم العامة", path: "/public-listings", icon: "📋" }
  ];

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const DropdownMenu = ({ 
    items, 
    isOpen, 
    onItemClick 
  }: { 
    items: any[], 
    isOpen: boolean, 
    onItemClick: (path: string) => void 
  }) => (
    <div className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 transform transition-all duration-300 z-50 ${
      isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
    }`}>
      <div className="py-2">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              onItemClick(item.path);
            }}
            className="w-full text-right px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 flex items-center justify-between group"
          >
            <div className="flex items-center">
              <span className="text-lg mr-3">{item.icon}</span>
              <span className="font-['NeoSansArabicMedium']">{item.name}</span>
            </div>
            {item.badge && (
              <span className={`px-2 py-1 text-xs rounded-full font-bold ${
                item.badge === 'Pro' ? 'bg-blue-100 text-blue-600' :
                item.badge === 'AI' ? 'bg-purple-100 text-purple-600' :
                item.badge === 'Hot' ? 'bg-red-100 text-red-600' :
                item.badge === 'Admin' ? 'bg-orange-100 text-orange-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ease-in-out
      ${
        isScrolled
          ? "bg-gray-800/95 backdrop-blur-md shadow-lg border-b border-gray-700/20"
          : "bg-gray-800/80 backdrop-blur-sm"
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
              className="focus:outline-none focus:ring-2 rounded-md flex items-center justify-center text-white hover:text-green-400 focus:ring-white/50 transition-colors duration-200"
            >
              <AiOutlineMenu className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-shrink-0">
            <Link
              onClick={() => handleNavigation("hero")}
              to="/"
              className="text-lg font-bold font-['NeoSansArabicBold'] text-white hover:text-green-400 transition-colors duration-200"
            >
              <img src={Logo} alt="Logo" className="h-10" />
            </Link>
          </div>

          {/* MODERN DROPDOWN NAVIGATION */}
          <div className={`absolute transform ${
            isRTL ? "right-1/2 translate-x-1/2" : "left-1/2 -translate-x-1/2"
          } hidden md:flex items-center space-x-6`}>
            
            {/* Main Navigation Items */}
            {mainItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className="font-['NeoSansArabicMedium'] text-white hover:text-green-400 transition-colors duration-200 px-3 py-2 rounded-md"
              >
                {item.name}
              </button>
            ))}

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown('services');
                }}
                className="font-['NeoSansArabicMedium'] text-white hover:text-green-400 transition-colors duration-200 px-3 py-2 rounded-md flex items-center"
              >
                الخدمات
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${openDropdown === 'services' ? 'rotate-180' : ''}`} />
              </button>
              <DropdownMenu 
                items={servicesDropdown} 
                isOpen={openDropdown === 'services'} 
                onItemClick={handleNavigation}
              />
            </div>

            {/* Enterprise Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown('enterprise');
                }}
                className="font-['NeoSansArabicMedium'] text-white hover:text-green-400 transition-colors duration-200 px-3 py-2 rounded-md flex items-center"
              >
                الحلول المتقدمة
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${openDropdown === 'enterprise' ? 'rotate-180' : ''}`} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <DropdownMenu 
                items={enterpriseDropdown} 
                isOpen={openDropdown === 'enterprise'} 
                onItemClick={handleNavigation}
              />
            </div>

            {/* Account Dropdown */}
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown('account');
                  }}
                  className="font-['NeoSansArabicMedium'] text-white hover:text-green-400 transition-colors duration-200 px-3 py-2 rounded-md flex items-center"
                >
                  حسابي
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${openDropdown === 'account' ? 'rotate-180' : ''}`} />
                </button>
                <DropdownMenu 
                  items={accountDropdown} 
                  isOpen={openDropdown === 'account'} 
                  onItemClick={handleNavigation}
                />
              </div>
            )}
          </div>

          {/* RIGHT SIDE ACTIONS */}
          <div className="ml-auto flex items-center space-x-3">
            
            {/* Quick Access Icons */}
            <div className="hidden md:flex items-center space-x-3">
              
              {/* Public Listings */}
              <Link
                to="/public-listings"
                className="p-2 text-green-400 hover:text-green-300 hover:bg-green-400/10 rounded-lg transition-all duration-200"
                title="القوائم العامة"
              >
                <FaBoxArchive className="w-5 h-5" />
              </Link>

              {/* Analytics Dashboard */}
              <Link
                to="/analytics"
                className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-all duration-200"
                title="لوحة التحليلات"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                </svg>
              </Link>

              {/* AI Recommendations */}
              <Link
                to="/ai-recommendations"
                className="p-2 text-purple-400 hover:text-purple-300 hover:bg-purple-400/10 rounded-lg transition-all duration-200 relative"
                title="التوصيات الذكية"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                </svg>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              </Link>
            </div>

            {/* User Authentication */}
            <div className="flex items-center">
              {!isAuthenticated ? (
                <Link
                  to="/Login"
                  className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 font-['NeoSansArabicMedium']"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  تسجيل الدخول
                </Link>
              ) : (
                <div className="flex items-center space-x-2">
                  {/* Add Button */}
                  <DropdownAdd
                    isScrolled={isScrolled}
                    isRTL={isRTL}
                    iconClassName="w-5 h-5"
                  />
                  
                  {/* User Menu */}
                  <UserMenu
                    isScrolled={isScrolled}
                    isRTL={isRTL}
                    iconClassName="w-5 h-5"
                  />
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleSidebar}
                className="p-2 text-white hover:text-green-400 hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <AiOutlineMenu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
