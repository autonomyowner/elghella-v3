import { useEffect } from "react";
import Footer from "./Footer";
import Section1Hero from "./LandPage/Section1-Hero";
import Section2LandSearch from "./LandPage/Section2-LandSearch";

export default function LandRent() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page on load
  }, []);

  return (
    <div className="w-full">
      <Section1Hero />
      <div className="h-4 bg-gradient-to-br from-gray-900 to-gray-800" />
      <Section2LandSearch />
      <Footer />
      {/* Add more sections below as you create them */}
    </div>
  );
}
