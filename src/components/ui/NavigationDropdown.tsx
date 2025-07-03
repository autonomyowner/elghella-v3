import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownItem {
  name: string;
  path: string;
  icon: string;
  badge?: string;
  description?: string;
}

interface NavigationDropdownProps {
  items: DropdownItem[];
  isOpen: boolean;
  onItemClick: (path: string) => void;
  title: string;
}

export const NavigationDropdown: React.FC<NavigationDropdownProps> = ({
  items,
  isOpen,
  onItemClick,
  title
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 px-4 py-3 border-b border-gray-100">
            <h3 className="font-['NeoSansArabicBold'] text-gray-800 text-sm">
              {title}
            </h3>
          </div>

          {/* Items */}
          <div className="py-2 max-h-96 overflow-y-auto">
            {items.map((item, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onItemClick(item.path);
                }}
                className="w-full text-right px-4 py-3 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-200 flex items-center justify-between group border-b border-gray-50 last:border-b-0"
              >
                <div className="flex items-center">
                  <span className="text-xl mr-3 group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </span>
                  <div className="text-left">
                    <span className="font-['NeoSansArabicMedium'] text-gray-700 group-hover:text-gray-900 block">
                      {item.name}
                    </span>
                    {item.description && (
                      <span className="font-['NeoSansArabicRegular'] text-xs text-gray-500 group-hover:text-gray-600">
                        {item.description}
                      </span>
                    )}
                  </div>
                </div>
                
                {item.badge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`px-2 py-1 text-xs rounded-full font-bold ${
                      item.badge === 'Pro' ? 'bg-blue-100 text-blue-600' :
                      item.badge === 'AI' ? 'bg-purple-100 text-purple-600' :
                      item.badge === 'Hot' ? 'bg-red-100 text-red-600' :
                      item.badge === 'New' ? 'bg-green-100 text-green-600' :
                      item.badge === 'Admin' ? 'bg-orange-100 text-orange-600' :
                      'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {item.badge}
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-2 text-center">
            <span className="text-xs text-gray-500 font-['NeoSansArabicRegular']">
              اختر الخدمة المناسبة لك
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavigationDropdown;