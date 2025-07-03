import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, Star, Zap, Crown, Shield, TrendingUp, 
  Users, Database, Headphones, Smartphone, Globe, Lock 
} from 'lucide-react';
import Button from '../../components/ui/Button';

const subscriptionPlans = [
  {
    id: 'starter',
    name: 'الباقة الأساسية',
    nameEn: 'Starter',
    price: 29,
    duration: 'شهرياً',
    description: 'مثالية للمزارعين الجدد والمشاريع الصغيرة',
    color: 'from-green-400 to-green-600',
    icon: Smartphone,
    popular: false,
    features: [
      'حتى 50 منتج',
      'لوحة تحكم أساسية',
      'دعم عبر البريد الإلكتروني',
      'تقارير شهرية',
      'تخزين 1 جيجابايت',
      '2 مستخدم',
      'الدعم الأساسي',
      'تطبيق الموبايل'
    ],
    limitations: [
      'بدون تحليلات متقدمة',
      'بدون API',
      'بدون تكامل خارجي'
    ]
  },
  {
    id: 'professional',
    name: 'الباقة الاحترافية',
    nameEn: 'Professional',
    price: 79,
    duration: 'شهرياً',
    description: 'للمزارع التجارية والشركات المتوسطة',
    color: 'from-blue-400 to-blue-600',
    icon: Users,
    popular: true,
    features: [
      'منتجات غير محدودة',
      'لوحة تحكم متقدمة',
      'دعم مباشر 24/7',
      'تقارير يومية وأسبوعية',
      'تخزين 10 جيجابايت',
      '10 مستخدم',
      'تحليلات متقدمة',
      'API وتكامل خارجي',
      'إدارة المخزون',
      'نظام CRM مدمج'
    ],
    limitations: [
      'بدون الذكاء الاصطناعي',
      'بدون تخصيص كامل'
    ]
  },
  {
    id: 'enterprise',
    name: 'باقة المؤسسات',
    nameEn: 'Enterprise',
    price: 199,
    duration: 'شهرياً',
    description: 'للمؤسسات الكبيرة والمشاريع الضخمة',
    color: 'from-purple-400 to-purple-600',
    icon: Crown,
    popular: false,
    features: [
      'كل ميزات الباقة الاحترافية',
      'تحليلات الذكاء الاصطناعي',
      'توقعات السوق',
      'مستخدمين غير محدود',
      'تخزين غير محدود',
      'دعم مخصص',
      'تدريب فريق العمل',
      'تخصيص كامل للمنصة',
      'SLA مضمون 99.9%',
      'تكامل مع أنظمة ERP',
      'تقارير مخصصة',
      'أمان enterprise-grade'
    ],
    limitations: []
  },
  {
    id: 'custom',
    name: 'حلول مخصصة',
    nameEn: 'Custom',
    price: null,
    duration: 'حسب الطلب',
    description: 'حلول مصممة خصيصاً لاحتياجاتك',
    color: 'from-yellow-400 to-orange-500',
    icon: Star,
    popular: false,
    features: [
      'تطوير ميزات مخصصة',
      'تصميم واجهة مخصصة',
      'استضافة مخصصة',
      'تكامل مع أنظمتك الحالية',
      'دعم تقني مخصص',
      'تدريب شامل',
      'صيانة دورية',
      'ضمان الأداء'
    ],
    limitations: []
  }
];

const additionalServices = [
  {
    name: 'استشارات تقنية',
    price: 150,
    duration: 'في الساعة',
    description: 'استشارات متخصصة في التقنيات الزراعية'
  },
  {
    name: 'تدريب الفريق',
    price: 500,
    duration: 'في اليوم',
    description: 'تدريب شامل لفريق العمل على استخدام المنصة'
  },
  {
    name: 'تكامل مخصص',
    price: 2000,
    duration: 'مشروع',
    description: 'تكامل المنصة مع أنظمتك الحالية'
  }
];

export default function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [showComparison, setShowComparison] = useState(false);

  const getDiscountedPrice = (price: number | null) => {
    if (!price) return null;
    return billingCycle === 'yearly' ? Math.floor(price * 0.8) : price;
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    // In real app, redirect to payment or contact form
    console.log('Selected plan:', planId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            باقات الاشتراك
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            اختر الباقة المناسبة لاحتياجاتك الزراعية ونمّي مشروعك مع أدوات احترافية
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              شهرياً
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                billingCycle === 'yearly' ? 'bg-green-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
              سنوياً <span className="text-green-600 font-bold">(وفر 20%)</span>
            </span>
          </div>
        </motion.div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                plan.popular ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-2 text-sm font-bold">
                  الأكثر شعبية ⭐
                </div>
              )}

              <div className={`h-2 bg-gradient-to-r ${plan.color}`} />
              
              <div className="p-8">
                <div className="flex items-center justify-center mb-4">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${plan.color}`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  {plan.name}
                </h3>
                
                <div className="text-center mb-6">
                  {plan.price ? (
                    <>
                      <span className="text-4xl font-bold text-gray-900">
                        ${getDiscountedPrice(plan.price)}
                      </span>
                      {billingCycle === 'yearly' && plan.price && (
                        <span className="text-lg text-gray-500 line-through ml-2">
                          ${plan.price}
                        </span>
                      )}
                      <span className="text-gray-600 block text-sm">
                        {billingCycle === 'yearly' ? 'سنوياً' : plan.duration}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">
                      اتصل بنا
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-center mb-6 text-sm">
                  {plan.description}
                </p>

                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full mb-6 bg-gradient-to-r ${plan.color} hover:shadow-lg transform hover:scale-105`}
                  variant="primary"
                >
                  {plan.price ? 'اختر هذه الباقة' : 'طلب عرض سعر'}
                </Button>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.slice(0, 6).map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.features.length > 6 && (
                    <button 
                      onClick={() => setShowComparison(true)}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      عرض جميع الميزات ({plan.features.length - 6} أخرى)
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            خدمات إضافية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="text-center p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                <div className="text-2xl font-bold text-green-600 mb-2">
                  ${service.price} <span className="text-sm text-gray-500">{service.duration}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <Button variant="outline" size="sm">
                  المزيد من التفاصيل
                </Button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Enterprise Features Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">لماذا تختار منصة الغلة؟</h2>
            <p className="text-xl opacity-90">
              منصة زراعية شاملة مدعومة بأحدث التقنيات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-xl font-bold mb-2">أمان متقدم</h3>
              <p className="opacity-90">حماية البيانات بأعلى معايير الأمان العالمية</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-200" />
              <h3 className="text-xl font-bold mb-2">نمو مضمون</h3>
              <p className="opacity-90">تحليلات ذكية تساعدك على اتخاذ قرارات مدروسة</p>
            </div>
            <div className="text-center">
              <Headphones className="w-12 h-12 mx-auto mb-4 text-yellow-200" />
              <h3 className="text-xl font-bold mb-2">دعم استثنائي</h3>
              <p className="opacity-90">فريق خبراء زراعيين متاح 24/7 لمساعدتك</p>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            الأسئلة الشائعة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                هل يمكنني تغيير الباقة لاحقاً؟
              </h3>
              <p className="text-gray-600">
                نعم، يمكنك ترقية أو تخفيض باقتك في أي وقت. التغييرات تطبق فوراً.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                هل هناك رسوم إضافية؟
              </h3>
              <p className="text-gray-600">
                لا توجد رسوم خفية. جميع الأسعار شاملة لجميع الميزات المذكورة.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                ما هي مدة الالتزام؟
              </h3>
              <p className="text-gray-600">
                لا يوجد التزام طويل المدى. يمكنك الإلغاء في أي وقت دون رسوم.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                هل يوجد فترة تجريبية مجانية؟
              </h3>
              <p className="text-gray-600">
                نعم، نوفر فترة تجريبية مجانية لمدة 14 يوماً لجميع الباقات.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}