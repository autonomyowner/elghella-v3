import Footer from "./Footer";
import Section1Hero from "./HomePage/Section1-Hero";
import Section2OurStory from "./HomePage/Section2-OurStory";
import Section3Services from "./HomePage/Section3-Services";
import Section4AboutUs from "./HomePage/Section4-AboutUs";
import OffersSection from "../components/OffersSection";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>الغلة | منتجات طبيعية وخدمات زراعية واستشارية</title>
        <meta name="description" content="منصة الغلة تقدم منتجات طبيعية وخدمات زراعية واستشارات من خبراء في المجال الزراعي. اكتشف أفضل المنتجات والخدمات الزراعية في الجزائر." />
        <meta property="og:title" content="الغلة | منتجات طبيعية وخدمات زراعية واستشارية" />
        <meta property="og:description" content="منصة الغلة تقدم منتجات طبيعية وخدمات زراعية واستشارات من خبراء في المجال الزراعي. اكتشف أفضل المنتجات والخدمات الزراعية في الجزائر." />
        <meta property="og:image" content="/assets/Homepage/hero.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_DZ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="الغلة | منتجات طبيعية وخدمات زراعية واستشارية" />
        <meta name="twitter:description" content="منصة الغلة تقدم منتجات طبيعية وخدمات زراعية واستشارات من خبراء في المجال الزراعي. اكتشف أفضل المنتجات والخدمات الزراعية في الجزائر." />
        <meta name="twitter:image" content="/assets/Homepage/hero.webp" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "الغلة",
          "url": "https://elghella.com/",
          "logo": "/assets/Homepage/logo.svg",
          "description": "منصة الغلة تقدم منتجات طبيعية وخدمات زراعية واستشارات من خبراء في المجال الزراعي."
        })}</script>
      </Helmet>
      <div>
        <Section1Hero id="hero" />
        <OffersSection />
        <div className="h-4 bg-gradient-to-br from-gray-900 to-gray-8000" />
        <Section3Services id="services" />
        <Section2OurStory id="our-story" />
        <Section4AboutUs />
        <Footer />
      </div>
    </>
  );
}
