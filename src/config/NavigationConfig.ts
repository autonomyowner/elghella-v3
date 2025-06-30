export interface NavLink {
  name: string;
  href: string;
}

export const navigationLinks: NavLink[] = [
  { name: "الرئيسية", href: "/" },
  { name: "الخدمات", href: "/publiclistings" },
  { name: "الخبراء", href: "/experts" },
  { name: "من نحن", href: "/about" },
  { name: "اتصل بنا", href: "/contact" },
];
