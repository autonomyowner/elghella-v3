import Footer from "./Footer";
import Section1Hero from "./HomePage/Section1-Hero";
import Section2OurStory from "./HomePage/Section2-OurStory";
import Section3Services from "./HomePage/Section3-Services";
import Section4AboutUs from "./HomePage/Section4-AboutUs";

export default function Home() {
  return (
    <div>
      <Section1Hero id="hero" />
      <div className="h-4 bg-gradient-to-br from-gray-900 to-gray-8000" />
      <Section3Services id="services" />
      <Section2OurStory id="our-story" />
      <Section4AboutUs />
      <Footer />
    </div>
  );
}
