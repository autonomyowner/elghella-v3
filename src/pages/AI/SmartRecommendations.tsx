import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, Target, Lightbulb, TrendingUp, AlertTriangle, 
  Leaf, Droplets, Sun, Wind, MapPin, Calendar, Zap, 
  BarChart3, PieChart, Activity, ThermometerSun
} from 'lucide-react';

// Mock AI recommendations data
const aiRecommendations = {
  weather: {
    title: 'توصيات الطقس الذكية',
    icon: Sun,
    recommendations: [
      {
        type: 'warning',
        title: 'تحذير من الصقيع',
        description: 'متوقع انخفاض درجة الحرارة إلى 2°م غداً. ينصح بحماية المحاصيل الحساسة.',
        confidence: 95,
        action: 'قم بتغطية النباتات الحساسة',
        timeframe: 'خلال 12 ساعة'
      },
      {
        type: 'opportunity',
        title: 'وقت مثالي للزراعة',
        description: 'الظروف المناخية مثالية لزراعة البقوليات خلال الأسبوع القادم.',
        confidence: 88,
        action: 'ابدأ بزراعة الفول والعدس',
        timeframe: 'الأسبوع القادم'
      }
    ]
  },
  market: {
    title: 'تحليل السوق الذكي',
    icon: TrendingUp,
    recommendations: [
      {
        type: 'opportunity',
        title: 'ارتفاع أسعار الطماطم',
        description: 'متوقع ارتفاع أسعار الطماطم بنسبة 25% خلال الشهرين القادمين.',
        confidence: 92,
        action: 'زد من إنتاج الطماطم',
        timeframe: 'خلال شهرين'
      },
      {
        type: 'warning',
        title: 'فائض في إنتاج البطاطس',
        description: 'متوقع انخفاض أسعار البطاطس بسبب الإنتاج الزائد في المنطقة.',
        confidence: 78,
        action: 'فكر في محاصيل بديلة',
        timeframe: 'الموسم الحالي'
      }
    ]
  },
  crops: {
    title: 'توصيات المحاصيل',
    icon: Leaf,
    recommendations: [
      {
        type: 'success',
        title: 'محصول القمح مثالي',
        description: 'نمو ممتاز للقمح في حقلك الشمالي. معدل النمو 15% أعلى من المتوقع.',
        confidence: 96,
        action: 'استمر بالرعاية الحالية',
        timeframe: 'مستمر'
      },
      {
        type: 'warning',
        title: 'نقص في الري',
        description: 'النباتات في القطاع الجنوبي تحتاج مياه إضافية بناءً على مستويات الرطوبة.',
        confidence: 84,
        action: 'زد من معدل الري بـ 20%',
        timeframe: 'فوري'
      }
    ]
  },
  soil: {
    title: 'تحليل التربة الذكي',
    icon: MapPin,
    recommendations: [
      {
        type: 'warning',
        title: 'نقص في النيتروجين',
        description: 'مستويات النيتروجين في التربة أقل من المطلوب للنمو الأمثل.',
        confidence: 91,
        action: 'أضف سماد نيتروجيني',
        timeframe: 'خلال أسبوع'
      },
      {
        type: 'opportunity',
        title: 'pH مثالي للزراعة',
        description: 'مستوى الحموضة مثالي لزراعة معظم الخضروات الورقية.',
        confidence: 87,
        action: 'ازرع الخس والسبانخ',
        timeframe: 'الآن'
      }
    ]
  }
};

const predictiveInsights = [
  {
    title: 'توقعات الإنتاج',
    value: '+15%',
    description: 'زيادة متوقعة في الإنتاج هذا الموسم',
    trend: 'up',
    icon: BarChart3
  },
  {
    title: 'كفاءة المياه',
    value: '92%',
    description: 'تحسن في استخدام المياه مقارنة بالموسم الماضي',
    trend: 'up',
    icon: Droplets
  },
  {
    title: 'صحة المحاصيل',
    value: '8.7/10',
    description: 'مؤشر صحة عام ممتاز للمحاصيل',
    trend: 'stable',
    icon: Activity
  },
  {
    title: 'التوقعات المالية',
    value: '$12,500',
    description: 'إيرادات متوقعة هذا الشهر',
    trend: 'up',
    icon: TrendingUp
  }
];

const smartAlerts = [
  {
    id: 1,
    type: 'critical',
    title: 'تحذير من آفة زراعية',
    message: 'اكتشاف نشاط مشبوه لآفة في المنطقة المجاورة',
    time: 'منذ 15 دقيقة',
    action: 'فحص فوري مطلوب'
  },
  {
    id: 2,
    type: 'info',
    title: 'تحديث سعر السوق',
    message: 'ارتفاع أسعار الخضروات الورقية بنسبة 8%',
    time: 'منذ ساعة',
    action: 'فرصة للبيع'
  },
  {
    id: 3,
    type: 'success',
    title: 'اكتمال دورة الري',
    message: 'تم ري جميع القطاعات بنجاح',
    time: 'منذ 3 ساعات',
    action: 'لا يوجد إجراء مطلوب'
  }
];

const RecommendationCard = ({ recommendation, category }: any) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning': return 'from-yellow-400 to-orange-500';
      case 'opportunity': return 'from-green-400 to-green-600';
      case 'success': return 'from-blue-400 to-blue-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'opportunity': return Target;
      case 'success': return Lightbulb;
      default: return Brain;
    }
  };

  const TypeIcon = getTypeIcon(recommendation.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${getTypeColor(recommendation.type)}`}>
            <TypeIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{recommendation.title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-gray-500">ثقة AI:</span>
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-1000"
                  style={{ width: `${recommendation.confidence}%` }}
                />
              </div>
              <span className="text-xs font-medium text-green-600">
                {recommendation.confidence}%
              </span>
            </div>
          </div>
        </div>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {recommendation.timeframe}
        </span>
      </div>
      
      <p className="text-gray-700 mb-4 text-sm leading-relaxed">
        {recommendation.description}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-blue-600">
          {recommendation.action}
        </span>
        <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors">
          تطبيق
        </button>
      </div>
    </motion.div>
  );
};

export default function SmartRecommendations() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [realTimeData, setRealTimeData] = useState({
    temperature: 24,
    humidity: 65,
    soilMoisture: 78,
    lightLevel: 92
  });

  // Simulate real-time sensor data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 5)),
        soilMoisture: Math.max(20, Math.min(100, prev.soilMoisture + (Math.random() - 0.5) * 8)),
        lightLevel: Math.max(70, Math.min(100, prev.lightLevel + (Math.random() - 0.5) * 3))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    { id: 'all', name: 'جميع التوصيات', icon: Brain },
    { id: 'weather', name: 'الطقس', icon: Sun },
    { id: 'market', name: 'السوق', icon: TrendingUp },
    { id: 'crops', name: 'المحاصيل', icon: Leaf },
    { id: 'soil', name: 'التربة', icon: MapPin }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mr-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">التوصيات الذكية</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نظام ذكاء اصطناعي متقدم يحلل البيانات ويقدم توصيات مخصصة لتحسين إنتاجيتك الزراعية
          </p>
        </motion.div>

        {/* Real-time Sensor Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Activity className="w-6 h-6 mr-3 text-green-600" />
            البيانات المباشرة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <ThermometerSun className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold text-gray-900">
                {realTimeData.temperature.toFixed(1)}°م
              </div>
              <div className="text-sm text-gray-600">درجة الحرارة</div>
            </div>
            <div className="text-center">
              <Droplets className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold text-gray-900">
                {realTimeData.humidity.toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600">الرطوبة</div>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold text-gray-900">
                {realTimeData.soilMoisture.toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600">رطوبة التربة</div>
            </div>
            <div className="text-center">
              <Sun className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold text-gray-900">
                {realTimeData.lightLevel.toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600">مستوى الضوء</div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
              }`}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Predictive Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {predictiveInsights.map((insight, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <insight.icon className="w-8 h-8 text-blue-600" />
                <div className={`text-2xl font-bold ${
                  insight.trend === 'up' ? 'text-green-600' : 
                  insight.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {insight.value}
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{insight.title}</h3>
              <p className="text-gray-600 text-sm">{insight.description}</p>
            </div>
          ))}
        </motion.div>

        {/* AI Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {Object.entries(aiRecommendations).map(([key, category]: [string, any]) => {
            if (activeCategory !== 'all' && activeCategory !== key) return null;
            
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <category.icon className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
                </div>
                {category.recommendations.map((recommendation: any, index: number) => (
                  <RecommendationCard 
                    key={index} 
                    recommendation={recommendation} 
                    category={key} 
                  />
                ))}
              </motion.div>
            );
          })}
        </div>

        {/* Smart Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Zap className="w-6 h-6 mr-3 text-yellow-500" />
            التنبيهات الذكية
          </h2>
          <div className="space-y-4">
            {smartAlerts.map((alert) => (
              <div key={alert.id} className={`flex items-center justify-between p-4 rounded-lg border-r-4 ${
                alert.type === 'critical' ? 'bg-red-50 border-red-500' :
                alert.type === 'info' ? 'bg-blue-50 border-blue-500' :
                'bg-green-50 border-green-500'
              }`}>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                  <p className="text-gray-600 text-sm">{alert.message}</p>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    {alert.action}
                  </div>
                  <button className={`text-xs px-3 py-1 rounded-full ${
                    alert.type === 'critical' ? 'bg-red-600 text-white' :
                    alert.type === 'info' ? 'bg-blue-600 text-white' :
                    'bg-green-600 text-white'
                  }`}>
                    اتخاذ إجراء
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}