import Logo from "../../assets/logo.svg";
import Hero from "../../assets/Homepage/hero.svg";

const Section1Hero = ({ id }: { id?: string }) => {
  return (
    <div id={id} className="relative h-screen overflow-hidden">
      <img
        src={Hero}
        alt="Hero"
        className="object-cover w-full h-full"
      />  

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="text-center">
          {/* Logo */}
          <img src={Logo} alt="Logo" className="mx-auto mb-6 max-h-24" />

          {/* Big Text */}
          <h1 className="text-4xl font-bold mb-4 text-white font-NeoSansArabicBlack">
            منتجات طبيعية خدمات زراعية و استشارية
          </h1>

          {/* Less Big Text */}
          <p className="text-2xl text-white font-NeoSansArabicMedium">
            أستكشف موقعنا الغلة
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section1Hero;
