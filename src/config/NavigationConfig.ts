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
  { name: "من نحن", href: "our-story" }, // Scroll to 'our-story' section
  { name: "اتصل بنا", href: "contact-section" }, // Scroll to contact section
];
