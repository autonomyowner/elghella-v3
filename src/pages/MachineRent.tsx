import { useEffect } from "react";
import Footer from "./Footer";
import Section1Hero from "./EquipmentPage/Section1-Hero";
import Section2MachineSearch from "./EquipmentPage/Section2-MachineSearch";

export default function MachineRent() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page on load
  }, []);

  return (
    <div className="w-full">
      <Section1Hero />
      <div className="h-4 bg-gradient-to-br from-gray-900 to-gray-8000" />
      <Section2MachineSearch />
      <Footer />

      {/* Add more sections below as you create them */}
    </div>
  );
}
