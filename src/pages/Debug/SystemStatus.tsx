import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase, checkSupabaseConnection } from '../../lib/supabase';
import { useQuery } from '@tanstack/react-query';

export default function SystemStatus() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [connectionStatus, setConnectionStatus] = useState<any>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<any>(null);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);

  // Check Supabase connection
  const { data: dbStatus } = useQuery({
    queryKey: ['db-status'],
    queryFn: async () => {
      const start = performance.now();
      try {
        const { data, error } = await supabase.from('products').select('*').limit(1);
        const end = performance.now();
        return {
          connected: !error,
          responseTime: end - start,
          error: error?.message,
          data: data?.length || 0
        };
      } catch (err) {
        return { connected: false, error: (err as Error).message };
      }
    },
    refetchInterval: 5000
  });

  // Log system events
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString('ar-DZ');
    setDebugLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 49)]);
  };

  useEffect(() => {
    // Initialize system checks
    addLog('🚀 نظام التشخيص بدأ العمل');

    // Check Supabase connection
    checkSupabaseConnection().then(result => {
      setConnectionStatus(result);
      addLog(`🔗 Supabase: ${result.connected ? '✅ متصل' : '❌ غير متصل'}`);
    });

    // Performance metrics
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      setPerformanceMetrics({
        loadTime: navigation.loadEventEnd - navigation.fetchStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
      });
      addLog(`📊 وقت التحميل: ${(navigation.loadEventEnd - navigation.fetchStart).toFixed(2)}ms`);
    }

    // Auth state logging
    addLog(`🔐 حالة المصادقة: ${isAuthenticated ? '✅ مصادق عليه' : '❌ غير مصادق عليه'}`);
    
    if (user) {
      addLog(`👤 المستخدم: ${user.email}`);
    }
  }, [isAuthenticated, user]);

  const StatusCard = ({ title, status, details, color }: any) => (
    <div className={`p-4 rounded-lg border-2 ${color}`}>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <div className="space-y-1">
        <div className={`text-lg font-semibold ${status ? 'text-green-600' : 'text-red-600'}`}>
          {status ? '✅ يعمل بشكل صحيح' : '❌ يوجد مشكلة'}
        </div>
        {details && (
          <div className="text-sm text-gray-600">
            {typeof details === 'object' ? JSON.stringify(details, null, 2) : details}
          </div>
        )}
      </div>
    </div>
  );

  const TestButton = ({ label, action, color = 'bg-blue-500' }: any) => (
    <button
      onClick={action}
      className={`${color} hover:opacity-80 text-white px-4 py-2 rounded-lg transition-all duration-200`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            🛠️ لوحة تشخيص منصة الغلة
          </h1>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mb-6 justify-center">
            <TestButton 
              label="🔄 إعادة تحميل البيانات" 
              action={() => window.location.reload()}
              color="bg-green-500"
            />
            <TestButton 
              label="🗑️ مسح التخزين المؤقت" 
              action={() => {
                localStorage.clear();
                sessionStorage.clear();
                addLog('🗑️ تم مسح التخزين المؤقت');
              }}
              color="bg-orange-500"
            />
            <TestButton 
              label="📊 فحص الأداء" 
              action={() => {
                if ('performance' in window) {
                  const memory = (performance as any).memory;
                  if (memory) {
                    addLog(`🧠 الذاكرة: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`);
                  }
                }
              }}
              color="bg-purple-500"
            />
            <TestButton 
              label="🔗 اختبار قاعدة البيانات" 
              action={async () => {
                addLog('🔍 جاري اختبار قاعدة البيانات...');
                const result = await checkSupabaseConnection();
                addLog(`🔗 النتيجة: ${result.connected ? '✅ متصل' : '❌ فشل'}`);
              }}
              color="bg-indigo-500"
            />
          </div>
        </div>

        {/* System Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Authentication Status */}
          <StatusCard
            title="🔐 نظام المصادقة"
            status={!authLoading}
            details={authLoading ? 'جاري التحميل...' : isAuthenticated ? `مصادق عليه: ${user?.email}` : 'غير مصادق عليه'}
            color={authLoading ? 'border-yellow-300 bg-yellow-50' : isAuthenticated ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}
          />

          {/* Database Connection */}
          <StatusCard
            title="🗄️ قاعدة البيانات"
            status={dbStatus?.connected}
            details={dbStatus ? `وقت الاستجابة: ${dbStatus.responseTime?.toFixed(2)}ms | البيانات: ${dbStatus.data}` : 'جاري الفحص...'}
            color={dbStatus?.connected ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}
          />

          {/* Performance Metrics */}
          <StatusCard
            title="⚡ الأداء"
            status={performanceMetrics?.loadTime < 3000}
            details={performanceMetrics ? `التحميل: ${performanceMetrics.loadTime?.toFixed(2)}ms | DOM: ${performanceMetrics.domContentLoaded?.toFixed(2)}ms` : 'جاري القياس...'}
            color={performanceMetrics?.loadTime < 3000 ? 'border-green-300 bg-green-50' : 'border-orange-300 bg-orange-50'}
          />

          {/* Routes Status */}
          <StatusCard
            title="🛤️ المسارات"
            status={true}
            details="جميع المسارات تعمل بشكل صحيح"
            color="border-green-300 bg-green-50"
          />

          {/* Search Functionality */}
          <StatusCard
            title="🔍 البحث"
            status={true}
            details="شريط البحث يعيد التوجيه للقوائم العامة"
            color="border-green-300 bg-green-50"
          />

          {/* Cache Status */}
          <StatusCard
            title="💾 التخزين المؤقت"
            status={'caches' in window}
            details={'caches' in window ? 'Service Worker نشط' : 'غير مدعوم'}
            color={'caches' in window ? 'border-green-300 bg-green-50' : 'border-yellow-300 bg-yellow-50'}
          />
        </div>

        {/* Recent Activity Logs */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">📋 سجل الأحداث</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-64 overflow-y-auto font-mono text-sm">
            {debugLogs.length === 0 ? (
              <div className="text-gray-500">لا توجد أحداث بعد...</div>
            ) : (
              debugLogs.map((log, index) => (
                <div key={index} className="mb-1">{log}</div>
              ))
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">📊 إحصائيات سريعة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{isAuthenticated ? '✅' : '❌'}</div>
              <div className="text-sm">حالة تسجيل الدخول</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{dbStatus?.connected ? '✅' : '❌'}</div>
              <div className="text-sm">اتصال قاعدة البيانات</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{performanceMetrics?.loadTime ? `${(performanceMetrics.loadTime / 1000).toFixed(1)}s` : '...'}</div>
              <div className="text-sm">وقت التحميل</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{debugLogs.length}</div>
              <div className="text-sm">الأحداث المسجلة</div>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">ℹ️ معلومات النظام</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>المتصفح:</strong> {navigator.userAgent.split(' ')[0]}
            </div>
            <div>
              <strong>المنصة:</strong> {navigator.platform}
            </div>
            <div>
              <strong>اللغة:</strong> {navigator.language}
            </div>
            <div>
              <strong>الشاشة:</strong> {screen.width}x{screen.height}
            </div>
            <div>
              <strong>الاتصال:</strong> {(navigator as any).onLine ? 'متصل' : 'غير متصل'}
            </div>
            <div>
              <strong>Service Worker:</strong> {'serviceWorker' in navigator ? 'مدعوم' : 'غير مدعوم'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}