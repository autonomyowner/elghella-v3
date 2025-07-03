import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlinePlus, AiOutlineApple } from "react-icons/ai";
import { PiFarm } from "react-icons/pi";
import { GiFarmTractor } from "react-icons/gi";

interface DropdownAddProps {
  isScrolled: boolean;
  isRTL?: boolean;
  iconClassName?: string;
}

const DropdownAdd: React.FC<DropdownAddProps> = ({
  isRTL = true,
  iconClassName = "w-6 h-6",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dropdown menu items
  const menuItems = [
    {
      icon: AiOutlineApple,
      label: "إضافة منتج جديد",
      route: "/add-product",
      description: "أضف منتجك إلى المنصة"
    },
    {
      icon: PiFarm,
      label: "قوائم المنتجات",
      route: "/public-listings",
      description: "تصفح جميع المنتجات"
    },
    {
      icon: GiFarmTractor,
      label: "ملفي الشخصي",
      route: "/profile",
      description: "إدارة حسابك"
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center text-white 
        hover:text-gray-300 transition-colors duration-300 
        font-['NeoSansArabicMedium']`}
      >
        <AiOutlinePlus className={iconClassName} />
      </button>

      {isOpen && (
        <div
          className={`
            absolute top-full mt-2 bg-gray-800 
            shadow-lg rounded-md border border-gray-700
            w-64 z-50 overflow-hidden
            ${isRTL ? "left-0" : "right-0"}
          `}
        >
          {menuItems.map((item) => (
            <Link
              key={item.route}
              to={item.route}
              onClick={() => setIsOpen(false)}
              className="
                flex items-center px-4 py-3 
                hover:bg-gray-700 
                transition-colors duration-300
                text-gray-200
                font-['NeoSansArabicRegular']
                group
              "
            >
              <item.icon className="w-5 h-5 ml-3 group-hover:text-green-400 transition-colors" />
              <div className="flex-1 text-right">
                <div className="text-sm font-semibold group-hover:text-white transition-colors">
                  {item.label}
                </div>
                <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                  {item.description}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownAdd;
