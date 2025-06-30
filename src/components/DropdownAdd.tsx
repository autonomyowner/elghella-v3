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
      icon: PiFarm,
      label: "تأجير أراضي",
      route: "/addlandrent",
    },
    {
      icon: AiOutlineApple,
      label: "إضافة منتجات",
      route: "/addproduct",
    },
    {
      icon: GiFarmTractor,
      label: "تأجير معدات",
      route: "addequipment",
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
                flex items-center justify-between px-4 py-3 
                hover:bg-gray-700 
                transition-colors duration-300
                text-gray-200
                font-['NeoSansArabicRegular']
              "
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownAdd;
