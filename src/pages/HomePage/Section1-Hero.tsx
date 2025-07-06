import Logo from "../../assets/logo.svg";

const Section1Hero = ({ id }: { id?: string }) => {
  return (
    <div id={id} className="relative h-screen w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden max-w-none">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="object-cover w-screen h-full absolute top-0 left-0 z-0 min-w-full min-h-full"
        style={{ left: 0, right: 0 }}
      >
        <source src="/assets/Homepage/Videoplayback1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 bg-black/40">
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
