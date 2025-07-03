import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, Shield, CheckCircle, AlertTriangle, 
  Lock, Globe, Calendar, DollarSign, Receipt,
  ArrowRight, Star, Clock, TrendingUp
} from 'lucide-react';
import Button from '../../components/ui/Button';

// Mock payment data
const paymentMethods = [
  { id: 'card', name: 'بطاقة ائتمان', icon: CreditCard, popular: true },
  { id: 'bank', name: 'تحويل بنكي', icon: Receipt, popular: false },
  { id: 'paypal', name: 'PayPal', icon: Globe, popular: false }
];

const selectedPlan = {
  id: 'professional',
  name: 'الباقة الاحترافية',
  price: 79,
  duration: 'شهرياً',
  features: [
    'منتجات غير محدودة',
    'لوحة تحكم متقدمة',
    'دعم مباشر 24/7',
    'تحليلات متقدمة',
    'API وتكامل خارجي'
  ],
  discount: 20, // 20% yearly discount
  originalPrice: 948, // yearly price without discount
  discountedPrice: 758 // yearly price with discount
};

const securityFeatures = [
  { icon: Shield, text: 'تشفير SSL 256-bit' },
  { icon: Lock, text: 'حماية PCI DSS' },
  { icon: CheckCircle, text: 'مدفوعات آمنة' }
];

export default function PaymentPortal() {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const getCurrentPrice = () => {
    return billingCycle === 'yearly' 
      ? selectedPlan.discountedPrice 
      : selectedPlan.price;
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // In real app, redirect to success page or show success message
      alert('تم الدفع بنجاح! مرحباً بك في منصة الغلة الاحترافية');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            إتمام عملية الدفع
          </h1>
          <p className="text-xl text-gray-600">
            خطوة واحدة تفصلك عن الوصول للميزات الاحترافية
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">ملخص الطلب</h2>
            
            {/* Plan Details */}
            <div className="border border-gray-200 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{selectedPlan.name}</h3>
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
              
              {/* Billing Toggle */}
              <div className="flex items-center justify-center space-x-4 mb-6 p-3 bg-gray-50 rounded-lg">
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

              {/* Features */}
              <div className="space-y-3 mb-6">
                {selectedPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="border-t pt-4">
                {billingCycle === 'yearly' ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>السعر السنوي</span>
                      <span className="line-through">${selectedPlan.originalPrice}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>خصم 20%</span>
                      <span className="text-green-600">-${selectedPlan.originalPrice - selectedPlan.discountedPrice}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                      <span>المجموع</span>
                      <span>${selectedPlan.discountedPrice}</span>
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                      (${(selectedPlan.discountedPrice / 12).toFixed(2)} شهرياً)
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>المجموع الشهري</span>
                    <span>${selectedPlan.price}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Security Features */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 mb-3">الأمان والضمانات</h3>
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <feature.icon className="w-4 h-4 text-green-500 mr-3" />
                  <span className="text-gray-700 text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">معلومات الدفع</h2>

            {/* Payment Methods */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">طريقة الدفع</h3>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full flex items-center justify-between p-4 border-2 rounded-lg transition-colors ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <method.icon className="w-5 h-5 mr-3 text-gray-600" />
                      <span className="font-medium text-gray-900">{method.name}</span>
                      {method.popular && (
                        <span className="mr-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          الأكثر استخداماً
                        </span>
                      )}
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedMethod === method.id 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300'
                    }`}>
                      {selectedMethod === method.id && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Card Form */}
            {selectedMethod === 'card' && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم البطاقة
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.number}
                    onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      تاريخ الانتهاء
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cardData.cvc}
                      onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم حامل البطاقة
                  </label>
                  <input
                    type="text"
                    placeholder="الاسم كما يظهر على البطاقة"
                    value={cardData.name}
                    onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Terms */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <div className="text-sm text-gray-600">
                  <p>أوافق على <a href="#" className="text-blue-600 hover:underline">شروط الخدمة</a> و 
                  <a href="#" className="text-blue-600 hover:underline mr-1">سياسة الخصوصية</a></p>
                  <p className="mt-2">يمكنك إلغاء الاشتراك في أي وقت دون رسوم إضافية.</p>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full text-lg py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              variant="primary"
              leftIcon={isProcessing ? <Clock className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
            >
              {isProcessing 
                ? 'جاري معالجة الدفع...' 
                : `ادفع $${getCurrentPrice()} ${billingCycle === 'yearly' ? 'سنوياً' : 'شهرياً'}`
              }
            </Button>

            {/* Trust Indicators */}
            <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                <span>دفع آمن</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span>ضمان استرداد</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>تفعيل فوري</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white text-center"
        >
          <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-200" />
          <h3 className="text-2xl font-bold mb-2">ضمان استرداد المال خلال 30 يوماً</h3>
          <p className="text-lg opacity-90">
            إذا لم تكن راضياً تماماً عن خدماتنا، نعيد لك أموالك كاملة دون أسئلة
          </p>
        </motion.div>
      </div>
    </div>
  );
}