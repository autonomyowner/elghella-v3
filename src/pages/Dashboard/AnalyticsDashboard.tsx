import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, 
  Activity, Globe, Target, Award, Zap, BarChart3, PieChart as PieChartIcon
} from 'lucide-react';

// Mock data - in real app, fetch from Supabase
const mockData = {
  revenue: [
    { month: 'يناير', revenue: 45000, orders: 234, users: 1200 },
    { month: 'فبراير', revenue: 52000, orders: 267, users: 1450 },
    { month: 'مارس', revenue: 48000, orders: 245, users: 1380 },
    { month: 'أبريل', revenue: 61000, orders: 312, users: 1620 },
    { month: 'مايو', revenue: 55000, orders: 289, users: 1580 },
    { month: 'يونيو', revenue: 67000, orders: 334, users: 1750 }
  ],
  categories: [
    { name: 'تأجير الأراضي', value: 35, color: '#10b981' },
    { name: 'المعدات الزراعية', value: 25, color: '#3b82f6' },
    { name: 'المنتجات الطبيعية', value: 30, color: '#f59e0b' },
    { name: 'الخدمات الاستشارية', value: 10, color: '#ef4444' }
  ],
  realTimeMetrics: {
    activeUsers: 2847,
    todayRevenue: 15420,
    pendingOrders: 67,
    completedTransactions: 234
  }
};

const MetricCard = ({ title, value, change, icon: Icon, color = "green" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        <div className={`flex items-center mt-2 text-sm ${color === 'green' ? 'text-green-600' : 'text-red-600'}`}>
          {color === 'green' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className="mr-1">{change}</span>
        </div>
      </div>
      <div className={`p-3 rounded-full ${color === 'green' ? 'bg-green-100' : 'bg-red-100'}`}>
        <Icon size={24} className={color === 'green' ? 'text-green-600' : 'text-red-600'} />
      </div>
    </div>
  </motion.div>
);

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('6months');
  const [realTimeData, setRealTimeData] = useState(mockData.realTimeMetrics);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        todayRevenue: prev.todayRevenue + Math.floor(Math.random() * 500),
        pendingOrders: prev.pendingOrders + Math.floor(Math.random() * 3) - 1
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">لوحة التحكم التحليلية</h1>
          <p className="text-gray-600">مراقبة شاملة لأداء منصة الغلة الزراعية</p>
        </motion.div>

        {/* Time Range Selector */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex space-x-4 bg-white rounded-lg p-1 shadow-sm border inline-flex">
            {[
              { value: '7days', label: '7 أيام' },
              { value: '1month', label: 'شهر' },
              { value: '3months', label: '3 أشهر' },
              { value: '6months', label: '6 أشهر' },
              { value: '1year', label: 'سنة' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setTimeRange(option.value)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  timeRange === option.value 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="إجمالي الإيرادات"
            value={`$${realTimeData.todayRevenue.toLocaleString()}`}
            change="+12.5%"
            icon={DollarSign}
            color="green"
          />
          <MetricCard
            title="المستخدمون النشطون"
            value={realTimeData.activeUsers.toLocaleString()}
            change="+8.2%"
            icon={Users}
            color="green"
          />
          <MetricCard
            title="الطلبات المعلقة"
            value={realTimeData.pendingOrders}
            change="+5.7%"
            icon={ShoppingCart}
            color="green"
          />
          <MetricCard
            title="المعاملات المكتملة"
            value={realTimeData.completedTransactions}
            change="+15.3%"
            icon={Activity}
            color="green"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">نمو الإيرادات</h3>
              <BarChart3 className="text-green-600" size={24} />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockData.revenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [`$${value}`, name === 'revenue' ? 'الإيرادات' : 'الطلبات']}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">توزيع الفئات</h3>
              <PieChartIcon className="text-blue-600" size={24} />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockData.categories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockData.categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Advanced Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Growth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">نمو المستخدمين</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={mockData.revenue}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top Performing Regions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">أفضل المناطق أداءً</h3>
            <div className="space-y-4">
              {[
                { region: 'الجزائر العاصمة', percentage: 35, color: 'bg-green-500' },
                { region: 'وهران', percentage: 28, color: 'bg-blue-500' },
                { region: 'قسنطينة', percentage: 20, color: 'bg-yellow-500' },
                { region: 'عنابة', percentage: 17, color: 'bg-red-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">{item.region}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} transition-all duration-1000`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Real-time Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">النشاط المباشر</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {[
                { action: 'طلب جديد من أحمد محمد', time: 'منذ دقيقتين', type: 'order' },
                { action: 'تسجيل مستخدم جديد', time: 'منذ 5 دقائق', type: 'user' },
                { action: 'بيع معدة زراعية', time: 'منذ 8 دقائق', type: 'sale' },
                { action: 'استشارة زراعية مكتملة', time: 'منذ 12 دقيقة', type: 'consultation' },
                { action: 'دفعة بقيمة $500', time: 'منذ 15 دقيقة', type: 'payment' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'order' ? 'bg-blue-500' :
                    activity.type === 'user' ? 'bg-green-500' :
                    activity.type === 'sale' ? 'bg-yellow-500' :
                    activity.type === 'consultation' ? 'bg-purple-500' :
                    'bg-gray-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* AI Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">رؤى الذكاء الاصطناعي</h3>
            <Zap className="text-yellow-300" size={24} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">توقعات النمو</h4>
              <p className="text-sm opacity-90">نمو متوقع بنسبة 23% في الشهر القادم بناءً على الاتجاهات الحالية</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">فرص التحسين</h4>
              <p className="text-sm opacity-90">تحسين أوقات الاستجابة قد يزيد رضا العملاء بنسبة 15%</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">توصيات استراتيجية</h4>
              <p className="text-sm opacity-90">التركيز على المنتجات العضوية يمكن أن يزيد الإيرادات بنسبة 30%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}