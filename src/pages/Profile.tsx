import { useEffect } from "react";
import Profile from "./Profile/Section-Profile";
import Footer from "./Footer";

export default function Expertise() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page on load
  }, []);

  return (
    <div className="w-full">
      <Profile />
      <Footer />
      {/* Add more sections below as you create them */}
    </div>
  );
}