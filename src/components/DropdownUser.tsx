import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOut, Settings } from "lucide-react";
import { AiOutlineUser } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";

interface UserMenuProps {
  isScrolled: boolean;
  isRTL?: boolean;
  iconClassName?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({
  isRTL = true,
  iconClassName = "w-6 h-6",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      await logout();
      await logout();
      await logout();
      await logout();
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsOpen(false);
    }
  };

  const menuItemStyle = `
    flex items-center space-x-2 px-4 py-2 text-sm 
    text-gray-200 hover:bg-gray-700
    font-['NeoSansArabicRegular']
  `;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center space-x-2 
        text-white hover:text-gray-300 
        font-['NeoSansArabicMedium']`}
      >
        <AiOutlineUser className={iconClassName} />
        <span
          className={`hidden md:inline ${isRTL ? "mr-2" : "ml-2"}`}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        ></span>
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 w-48 bg-gray-800 rounded-md shadow-lg 
          ${isRTL ? "left-0" : "right-0"} mt-2 origin-top-right`}
        >
          <div
            className="py-1 rounded-md shadow-xs"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <Link
              to="/Profile"
              className={`${menuItemStyle} justify-between`}
              onClick={() => setIsOpen(false)}
            >
              <AiOutlineUser className="w-4 h-4" />
              <span>الملف الشخصي</span>
            </Link>

            <Link
              to="/settings"
              className={`${menuItemStyle} justify-between`}
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4" />
              <span>الإعدادات</span>
            </Link>

            <button
              onClick={handleLogout}
              className={`w-full text-left ${menuItemStyle} justify-between`}
            >
              <LogOut className="w-4 h-4" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
