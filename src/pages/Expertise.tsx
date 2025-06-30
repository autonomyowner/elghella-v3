import { useEffect } from "react";
import Section1Hero from "./ExpertisePage/Section1-Hero";
import Footer from "./Footer";

export default function Expertise() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page on load
  }, []);

  return (
    <div className="w-full">
      <Section1Hero />
      <Footer />
      {/* Add more sections below as you create them */}
    </div>
  );
}
