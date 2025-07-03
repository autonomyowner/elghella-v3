import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Settings, BarChart3, Shield, Database, Server, 
  Monitor, Bell, Mail, Phone, MapPin, Calendar, Clock,
  TrendingUp, AlertTriangle, CheckCircle, XCircle, Eye,
  Edit, Trash, Plus, Download, Upload, Filter, Search
} from 'lucide-react';
import Button from '../../components/ui/Button';

// Mock admin data
const systemMetrics = {
  totalUsers: 15847,
  activeUsers: 2847,
  totalRevenue: 247800,
  systemUptime: 99.9,
  apiCalls: 1247500,
  storageUsed: 78.5,
  responseTime: 245,
  errorRate: 0.03
};

const recentUsers = [
  { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', plan: 'Enterprise', status: 'active', joined: '2024-01-15', lastActive: '2 دقائق' },
  { id: 2, name: 'فاطمة الزهراء', email: 'fatima@example.com', plan: 'Professional', status: 'active', joined: '2024-01-10', lastActive: '5 دقائق' },
  { id: 3, name: 'محمد العربي', email: 'mohamed@example.com', plan: 'Starter', status: 'inactive', joined: '2024-01-08', lastActive: '2 ساعات' },
  { id: 4, name: 'عائشة بنت أحمد', email: 'aisha@example.com', plan: 'Professional', status: 'active', joined: '2024-01-05', lastActive: '1 دقيقة' }
];

const systemAlerts = [
  { id: 1, type: 'warning', title: 'استخدام عالي للخادم', message: 'استخدام المعالج وصل إلى 85%', time: '5 دقائق', critical: false },
  { id: 2, type: 'error', title: 'خطأ في قاعدة البيانات', message: 'فشل في الاتصال مع قاعدة البيانات الثانوية', time: '15 دقيقة', critical: true },
  { id: 3, type: 'success', title: 'نسخ احتياطي مكتمل', message: 'تم إنشاء النسخة الاحتياطية بنجاح', time: '1 ساعة', critical: false },
  { id: 4, type: 'info', title: 'تحديث النظام', message: 'تم تثبيت تحديث أمني جديد', time: '3 ساعات', critical: false }
];

const AdminCard = ({ title, value, change, icon: Icon, color = "blue" }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        {change && (
          <p className={`text-sm mt-2 ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {change} من الشهر الماضي
          </p>
        )}
      </div>
      <div className={`p-3 rounded-full bg-${color}-100`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
    </div>
  </motion.div>
);

const UserRow = ({ user, onEdit, onDelete }: any) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          {user.name.charAt(0)}
        </div>
        <div className="mr-4">
          <div className="text-sm font-medium text-gray-900">{user.name}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        user.plan === 'Enterprise' ? 'bg-purple-100 text-purple-800' :
        user.plan === 'Professional' ? 'bg-blue-100 text-blue-800' :
        'bg-green-100 text-green-800'
      }`}>
        {user.plan}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {user.status === 'active' ? 'نشط' : 'غير نشط'}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {user.joined}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {user.lastActive}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      <div className="flex space-x-2">
        <button 
          onClick={() => onEdit(user)}
          className="text-blue-600 hover:text-blue-900"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button 
          onClick={() => onDelete(user)}
          className="text-red-600 hover:text-red-900"
        >
          <Trash className="w-4 h-4" />
        </button>
        <button className="text-gray-600 hover:text-gray-900">
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </td>
  </tr>
);

export default function EnterpriseAdmin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');

  const tabs = [
    { id: 'dashboard', name: 'لوحة التحكم', icon: BarChart3 },
    { id: 'users', name: 'إدارة المستخدمين', icon: Users },
    { id: 'system', name: 'مراقبة النظام', icon: Monitor },
    { id: 'settings', name: 'الإعدادات', icon: Settings },
    { id: 'security', name: 'الأمان', icon: Shield }
  ];

  const filteredUsers = recentUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === 'all' || user.plan === filterPlan;
    return matchesSearch && matchesPlan;
  });

  const handleEditUser = (user: any) => {
    console.log('Edit user:', user);
  };

  const handleDeleteUser = (user: any) => {
    console.log('Delete user:', user);
  };

  const handleBulkAction = (action: string) => {
    console.log('Bulk action:', action, 'for users:', selectedUsers);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">لوحة إدارة المؤسسة</h1>
              <p className="text-gray-600 mt-1">إدارة شاملة لمنصة الغلة الزراعية</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
                تصدير التقارير
              </Button>
              <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
                إضافة مستخدم جديد
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AdminCard
                title="إجمالي المستخدمين"
                value={systemMetrics.totalUsers.toLocaleString()}
                change="+12.5%"
                icon={Users}
                color="blue"
              />
              <AdminCard
                title="المستخدمون النشطون"
                value={systemMetrics.activeUsers.toLocaleString()}
                change="+8.2%"
                icon={TrendingUp}
                color="green"
              />
              <AdminCard
                title="إجمالي الإيرادات"
                value={`$${systemMetrics.totalRevenue.toLocaleString()}`}
                change="+15.7%"
                icon={Database}
                color="purple"
              />
              <AdminCard
                title="وقت تشغيل النظام"
                value={`${systemMetrics.systemUptime}%`}
                change="+0.1%"
                icon={Server}
                color="green"
              />
            </div>

            {/* System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">حالة النظام</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">استخدام التخزين</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-1000"
                          style={{ width: `${systemMetrics.storageUsed}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{systemMetrics.storageUsed}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">زمن الاستجابة</span>
                    <span className="text-green-600 font-medium">{systemMetrics.responseTime}ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">معدل الأخطاء</span>
                    <span className="text-green-600 font-medium">{systemMetrics.errorRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">استدعاءات API</span>
                    <span className="text-blue-600 font-medium">{systemMetrics.apiCalls.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">تنبيهات النظام</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className={`flex items-start space-x-3 p-3 rounded-lg ${
                      alert.type === 'error' ? 'bg-red-50' :
                      alert.type === 'warning' ? 'bg-yellow-50' :
                      alert.type === 'success' ? 'bg-green-50' : 'bg-blue-50'
                    }`}>
                      <div className={`p-1 rounded-full ${
                        alert.type === 'error' ? 'bg-red-500' :
                        alert.type === 'warning' ? 'bg-yellow-500' :
                        alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                      }`}>
                        {alert.type === 'error' ? <XCircle className="w-3 h-3 text-white" /> :
                         alert.type === 'warning' ? <AlertTriangle className="w-3 h-3 text-white" /> :
                         alert.type === 'success' ? <CheckCircle className="w-3 h-3 text-white" /> :
                         <Bell className="w-3 h-3 text-white" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                        <p className="text-xs text-gray-600">{alert.message}</p>
                        <span className="text-xs text-gray-500">منذ {alert.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* User Management Header */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">إدارة المستخدمين</h2>
                  <p className="text-gray-600">إدارة حسابات المستخدمين والصلاحيات</p>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
                    تصفية
                  </Button>
                  <Button variant="outline" leftIcon={<Upload className="w-4 h-4" />}>
                    استيراد
                  </Button>
                  <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
                    إضافة مستخدم
                  </Button>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="البحث في المستخدمين..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <select
                  value={filterPlan}
                  onChange={(e) => setFilterPlan(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">جميع الباقات</option>
                  <option value="Starter">الأساسية</option>
                  <option value="Professional">الاحترافية</option>
                  <option value="Enterprise">المؤسسات</option>
                </select>
              </div>

              {/* Bulk Actions */}
              {selectedUsers.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                  <span className="text-blue-700 font-medium">
                    تم تحديد {selectedUsers.length} مستخدم
                  </span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction('activate')}>
                      تفعيل
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction('deactivate')}>
                      إلغاء تفعيل
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction('delete')}>
                      حذف
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المستخدم
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الباقة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      تاريخ الانضمام
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      آخر نشاط
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <UserRow
                      key={user.id}
                      user={user}
                      onEdit={handleEditUser}
                      onDelete={handleDeleteUser}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">مراقبة النظام</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <Server className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">الخوادم</h3>
                <p className="text-3xl font-bold text-green-600">5/5</p>
                <p className="text-gray-600 text-sm">خوادم نشطة</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <Database className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">قواعد البيانات</h3>
                <p className="text-3xl font-bold text-green-600">3/3</p>
                <p className="text-gray-600 text-sm">قواعد بيانات متصلة</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <Shield className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">الأمان</h3>
                <p className="text-3xl font-bold text-yellow-600">متوسط</p>
                <p className="text-gray-600 text-sm">مستوى الأمان</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}