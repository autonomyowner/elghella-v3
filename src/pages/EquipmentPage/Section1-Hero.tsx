import Hero from "../../assets/MachineRentPage/hero.png";

export default function Section1Hero() {
  return (
    <section className="relative h-[30vh] md:h-[40vh] overflow-hidden">
      {/* Background Image */}
      <img
        src={Hero}
        alt="Hero"
        className="object-cover w-full h-full absolute inset-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-4 font-NeoSansArabicBlack">
          الآلات الزراعية{" "}
        </h1>
      </div>
    </section>
  );
}
