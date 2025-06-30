export interface NavLink {
  name: string;
  href: string;
}

export const navigationLinks: NavLink[] = [
  { name: "الرئيسية", href: "hero" },
  { name: "الخدمات", href: "services" },
  { name: "من نحن", href: "our-story" },
  { name: "اتصل بنا", href: "about-us" },
];
