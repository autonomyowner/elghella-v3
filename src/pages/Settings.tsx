import { useEffect } from "react";
import Settings from "./Settings/Section-Settings";
import Footer from "./Footer";

export default function Expertise() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page on load
  }, []);

  return (
    <div className="w-full">
      <Settings />
      <Footer />
      {/* Add more sections below as you create them */}
    </div>
  );
}