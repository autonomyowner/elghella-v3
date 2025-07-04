import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/navigation.css";

import Layout from "./layouts/Layout.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { initPerformanceOptimizations, monitorPerformance } from "./utils/performance";

// Optimized QueryClient for faster performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000, // 2 minutes (reduced for better sync)
      gcTime: 5 * 60 * 1000, // 5 minutes
      retry: 1, // Reduced retries for faster response
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
      refetchOnMount: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Loading component for better UX
const AppLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-900 to-gray-900 flex items-center justify-center">
    <div className="text-center text-white">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-4"></div>
      <h2 className="text-xl font-['NeoSansArabicBold']">جاري تحميل منصة الغلة...</h2>
      <p className="text-green-300 mt-2">منصتك الزراعية الشاملة</p>
    </div>
  </div>
);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <AuthProvider>
        <Suspense fallback={<AppLoading />}>
          <Layout />
        </Suspense>
      </AuthProvider>
    </Router>
    {process.env.NODE_ENV === 'development' && (
      <ReactQueryDevtools initialIsOpen={false} />
    )}
  </QueryClientProvider>
);

// 🚀 Initialize performance optimizations
initPerformanceOptimizations().then(() => {
  console.log('🎯 Elghella Platform fully optimized and ready!');
  
  // Monitor performance in development
  if (process.env.NODE_ENV === 'development') {
    setTimeout(() => {
      monitorPerformance();
    }, 1000);
  }
});
