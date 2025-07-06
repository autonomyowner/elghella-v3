import Footer from "./Footer";
import Section1Hero from "./HomePage/Section1-Hero";
import Section2OurStory from "./HomePage/Section2-OurStory";
import Section3Services from "./HomePage/Section3-Services";
import Section4AboutUs from "./HomePage/Section4-AboutUs";
import OffersSection from "../components/OffersSection";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

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
        <div className="flex flex-col items-center gap-4 my-8">
          {/* Future Services Button */}
          <Link
            to="/future-services"
            className="inline-flex items-center bg-gradient-to-r from-blue-500/90 to-purple-600/90 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl border border-white/20"
            tabIndex={0}
          >
            <span className="text-3xl mr-4 animate-bounce">🚁</span>
            <div className="text-center">
              <div className="font-['NeoSansArabicBold'] text-lg">خدمات مستقبلية مبتكرة</div>
              <div className="text-sm opacity-90">طائرات مسيرة | زراعة دقيقة | مراقبة ذكية</div>
            </div>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs mr-4 animate-pulse font-bold">قريباً 2026</span>
          </Link>
        </div>
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
