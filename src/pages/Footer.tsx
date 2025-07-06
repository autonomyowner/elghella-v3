import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import Logo from "../assets/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSectionScroll = (sectionId: string) => {
    // Map the section IDs to their corresponding routes
    const sectionToRouteMap: { [key: string]: string } = {
      hero: "/",
      "our-story": "/",
      services: "/",
      "about-us": "/",
    };

    // Determine the target route based on the sectionId
    const targetRoute = sectionToRouteMap[sectionId] || "/";

    // If we're not on the target route, navigate to it first
    if (location.pathname !== targetRoute) {
      navigate(targetRoute, { state: { scrollTo: sectionId } });
    } else {
      // If already on the correct route, scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="text-white py-16 font-NeoSansArabicLight" dir="rtl">
      <div id="about-us" className="container mx-auto px-4 max-w-6xl">
        {/* Offers Section - removed, now at top of Home page */}
        {/* Main Grid: Logo/Social, Links/Contact, Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Right Section: Logo and Social Media */}
          <div className="flex flex-col items-start justify-start space-y-6">
            <img
              src={Logo}
              alt="Logo"
              className="w-40 h-auto mb-4 opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
            <div className="flex space-x-reverse space-x-4">
              {[
                {
                  Icon: FaFacebookF,
                  link: "https://facebook.com",
                  color: "text-blue-500",
                },
                {
                  Icon: FaTwitter,
                  link: "https://twitter.com",
                  color: "text-sky-400",
                },
                {
                  Icon: FaInstagram,
                  link: "https://instagram.com",
                  color: "text-pink-500",
                },
                {
                  Icon: FaLinkedinIn,
                  link: "https://linkedin.com",
                  color: "text-blue-600",
                },
              ].map(({ Icon, link, color }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 ${color}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Middle Section: Contact Us and Links */}
          <div className="flex justify-between w-full">
            {/* Links Section */}
            <div className="flex flex-col items-start space-y-4">
              <h4 className="text-xl font-semibold font-NeoSansArabicBold text-green-200 mb-4">
                روابط
              </h4>
              <ul className="space-y-2 text-sm font-NeoSansArabicRegular">
                {[
                  { name: "الرئيسية", section: "hero" },
                  { name: "الخدمات", section: "services" },
                  { name: "من نحن", section: "our-story" },
                  { name: "اتصل بنا", section: "about-us" },
                ].map(({ name, section }, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleSectionScroll(section)}
                      className="text-white/80 hover:text-green-300 transition-colors duration-300"
                    >
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us Section */}
            <div id="contact-section" className="flex flex-col items-start space-y-4">
              <h3 className="text-xl font-semibold font-NeoSansArabicBold text-green-200 mb-4">
                تواصل معنا
              </h3>
              <div className="space-y-3 text-left font-NeoSansArabicRegular">
                <p className="flex items-center gap-2">
                  <span>islam.zellag@univ-bouira.dz</span>
                  <MdEmail className="w-5 h-5 text-green-400 mr-2" />
                </p>
                <p className="flex items-center gap-2">
                  <span>0798700447</span>
                  <MdPhone className="w-5 h-5 text-green-400 mr-2" />
                </p>
                <p className="flex items-center gap-2">
                  <span>العنوان: البويرة</span>
                  <MdLocationOn className="w-5 h-5 text-green-400 mr-2" />
                </p>
              </div>
            </div>
          </div>

          {/* Left Section: Newsletter or Additional Content */}
          <div className="flex flex-col items-start space-y-4">
            <h4 className="text-xl font-semibold font-NeoSansArabicBold text-green-200 mb-4">
              النشرة البريدية
            </h4>
            <div className="w-full">
              <div className="flex">
                <button className="bg-green-600 text-white px-4 rounded-r-lg hover:bg-green-700 transition-colors duration-300 font-NeoSansArabicMedium">
                  اشتراك
                </button>
                <input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  className="w-full p-2 bg-white/10 rounded-l-lg text-right focus:outline-none focus:ring-2 focus:ring-green-500 font-NeoSansArabicLight"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom: Hadith in Golden Diamond */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center flex flex-col items-center justify-center">
          <div className="relative inline-block px-8 py-6">
            {/* Diamond background */}
            <svg width="320" height="80" viewBox="0 0 320 80" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0" style={{filter: 'drop-shadow(0 0 16px gold)'}}>
              <polygon points="160,0 320,40 160,80 0,40" fill="url(#gold-gradient)" stroke="#fff8dc" strokeWidth="3" />
              <defs>
                <linearGradient id="gold-gradient" x1="0" y1="0" x2="320" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fff8dc" />
                  <stop offset="0.3" stopColor="#ffd700" />
                  <stop offset="0.7" stopColor="#bfa14a" />
                  <stop offset="1" stopColor="#fff8dc" />
                </linearGradient>
              </defs>
            </svg>
            <span className="relative z-10 text-lg font-bold text-black drop-shadow-lg" style={{letterSpacing: '1px'}}>
              قال رسول الله ﷺ:
            </span>
          </div>
          <span className="mt-4 text-base font-normal text-white drop-shadow-[0_0_8px_white] block mb-1">
            «إنْ قامَتِ السَّاعةُ وفي يدِ أحدِكُم فَسيلةٌ، فإنِ استَطاعَ أن لا تَقومَ حتَّى يغرِسَها، فلْيغرِسْها.»
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
