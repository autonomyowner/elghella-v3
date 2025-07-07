export interface NavLink {
  name: string;
  href: string;
}

export const navigationLinks: NavLink[] = [
  { name: "الرئيسية", href: "/" },
  { name: "الخدمات", href: "/publiclistings" },
  { name: "سوق المواشي", href: "/services/livestock-market" },
  { name: "تربية النحل", href: "/services/beekeeping" },
  { name: "الخبراء", href: "/experts" },
  { name: "من نحن", href: "/about" }, // About Us page
  { name: "اتصل بنا", href: "contact-section" }, // Scroll to contact section
];
