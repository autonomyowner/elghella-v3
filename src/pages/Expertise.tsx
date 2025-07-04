import { useEffect } from "react";
import Section1Hero from "./ExpertisePage/Section1-Hero";
import Section2About from "./ExpertisePage/Section2-About";
import Section3Experts from "./ExpertisePage/Section3-Experts";
import Section4Services from "./ExpertisePage/Section4-Services";
import Section5Testimonials from "./ExpertisePage/Section5-Testimonials";
import Section6Contact from "./ExpertisePage/Section6-Contact";
import Footer from "./Footer";

export default function Expertise() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page on load
  }, []);

  return (
    <div className="w-full">
      <Section1Hero />
      <Section2About />
      <Section3Experts />
      <Section4Services />
      <Section5Testimonials />
      <Section6Contact />
      <Footer />
      {/* Add more sections below as you create them */}
    </div>
  );
}
