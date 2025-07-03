import { 
  Home, Tractor, Package, Users, Leaf, BarChart3, 
  Brain, CreditCard, Shield, Settings, MessageSquare, 
  Image, HelpCircle, Star, TrendingUp, Crown,
  Zap, Database, Globe, Target
} from "lucide-react";

export interface NavigationItem {
  name: string;
  path: string;
  icon: any;
  description?: string;
  badge?: string;
  category?: 'main' | 'enterprise' | 'user' | 'help';
  featured?: boolean;
  new?: boolean;
}

export const navigationConfig: NavigationItem[] = [
  // 🏠 MAIN NAVIGATION
  {
    name: "الصفحة الرئيسية",
    path: "/",
    icon: Home,
    description: "العودة إلى الصفحة الرئيسية",
    category: "main"
  },
  {
    name: "معرض الصور",
    path: "/gallery", 
    icon: Image,
    description: "استكشف جمال الطبيعة الزراعية",
    category: "main"
  },
  
  // 🌾 CORE MARKETPLACE FEATURES
  {
    name: "تأجير الأراضي",
    path: "/land-rent",
    icon: Leaf,
    description: "استأجر أو أجر الأراضي الزراعية",
    category: "main"
  },
  {
    name: "تأجير المعدات",
    path: "/machine-rent", 
    icon: Tractor,
    description: "معدات زراعية حديثة للإيجار",
    category: "main"
  },
  {
    name: "المنتجات الزراعية",
    path: "/greengrocer",
    icon: Package,
    description: "منتجات طبيعية طازجة ومتنوعة", 
    category: "main"
  },
  {
    name: "الخدمات الاستشارية",
    path: "/expertise",
    icon: Users,
    description: "استشر الخبراء الزراعيين",
    category: "main"
  },

  // 🚀 ENTERPRISE FEATURES - MILLION DOLLAR SAAS
  {
    name: "لوحة التحليلات",
    path: "/analytics",
    icon: BarChart3,
    description: "تحليلات متقدمة وإحصائيات شاملة",
    category: "enterprise",
    featured: true,
    badge: "Pro"
  },
  {
    name: "التوصيات الذكية",
    path: "/ai-recommendations", 
    icon: Brain,
    description: "ذكاء اصطناعي لتحسين الإنتاجية",
    category: "enterprise",
    featured: true,
    new: true,
    badge: "AI"
  },
  {
    name: "باقات الاشتراك",
    path: "/subscription",
    icon: Crown,
    description: "اختر الباقة المناسبة لاحتياجاتك",
    category: "enterprise",
    featured: true
  },
  {
    name: "بوابة الدفع",
    path: "/payment",
    icon: CreditCard,
    description: "دفع آمن ومرن بعدة طرق",
    category: "enterprise"
  },
  {
    name: "لوحة الإدارة",
    path: "/admin",
    icon: Shield,
    description: "إدارة شاملة للمؤسسات",
    category: "enterprise",
    badge: "Admin"
  },

  // 👤 USER MANAGEMENT
  {
    name: "الملف الشخصي",
    path: "/profile",
    icon: Users,
    description: "إدارة معلوماتك الشخصية",
    category: "user"
  },
  {
    name: "الإعدادات",
    path: "/settings",
    icon: Settings,
    description: "تخصيص تفضيلاتك",
    category: "user"
  },
  {
    name: "الرسائل",
    path: "/inbox",
    icon: MessageSquare,
    description: "تواصل مع المجتمع الزراعي",
    category: "user"
  },

  // 📋 PUBLIC PAGES
  {
    name: "القوائم العامة",
    path: "/public-listings",
    icon: Globe,
    description: "تصفح جميع العروض المتاحة",
    category: "main"
  },
  {
    name: "الشتلات والبذور",
    path: "/seedlings",
    icon: Leaf,
    description: "أفضل الشتلات والبذور",
    category: "main"
  }
];

// 🎯 QUICK ACCESS FEATURES (FOR HERO SECTION)
export const quickAccessFeatures = [
  {
    name: "التحليلات الذكية",
    path: "/analytics",
    icon: BarChart3,
    color: "from-blue-500 to-blue-600",
    description: "رؤى عميقة لأعمالك الزراعية"
  },
  {
    name: "الذكاء الاصطناعي",
    path: "/ai-recommendations", 
    icon: Brain,
    color: "from-purple-500 to-purple-600",
    description: "توصيات مخصصة لتحسين الإنتاج"
  },
  {
    name: "الاشتراكات المتميزة",
    path: "/subscription",
    icon: Crown,
    color: "from-yellow-500 to-orange-500", 
    description: "باقات احترافية للمؤسسات"
  },
  {
    name: "المدفوعات الآمنة",
    path: "/payment",
    icon: CreditCard,
    color: "from-green-500 to-green-600",
    description: "دفع سريع وآمن بضغطة زر"
  }
];

// 📊 ENTERPRISE DASHBOARD LINKS
export const enterpriseNavigation = [
  {
    name: "نظرة عامة",
    path: "/analytics",
    icon: BarChart3
  },
  {
    name: "التوصيات الذكية", 
    path: "/ai-recommendations",
    icon: Brain
  },
  {
    name: "إدارة الاشتراكات",
    path: "/subscription", 
    icon: Crown
  },
  {
    name: "المدفوعات",
    path: "/payment",
    icon: CreditCard
  },
  {
    name: "إدارة النظام",
    path: "/admin",
    icon: Shield
  }
];

// 🏆 FEATURED ROUTES (For marketing)
export const featuredRoutes = navigationConfig.filter(item => item.featured);

// 🆕 NEW FEATURES (With badges)
export const newFeatures = navigationConfig.filter(item => item.new);

// 📱 MOBILE NAVIGATION (Optimized for mobile)
export const mobileNavigation = [
  { name: "الرئيسية", path: "/", icon: Home },
  { name: "التحليلات", path: "/analytics", icon: BarChart3, badge: "Pro" },
  { name: "AI", path: "/ai-recommendations", icon: Brain, badge: "New" },
  { name: "الاشتراك", path: "/subscription", icon: Crown },
  { name: "المزيد", path: "/profile", icon: Users }
];

// 🎨 CATEGORY COLORS
export const categoryColors = {
  main: "text-gray-700 hover:text-green-600",
  enterprise: "text-blue-700 hover:text-blue-800", 
  user: "text-purple-700 hover:text-purple-800",
  help: "text-orange-700 hover:text-orange-800"
};

// 🔥 TRENDING FEATURES
export const trendingFeatures = [
  {
    name: "الذكاء الاصطناعي الزراعي",
    path: "/ai-recommendations",
    icon: Brain,
    growth: "+300%",
    users: "2,847"
  },
  {
    name: "التحليلات المتقدمة", 
    path: "/analytics",
    icon: BarChart3,
    growth: "+250%", 
    users: "1,923"
  },
  {
    name: "الباقات الاحترافية",
    path: "/subscription", 
    icon: Crown,
    growth: "+180%",
    users: "1,456"
  }
];

export default navigationConfig;
