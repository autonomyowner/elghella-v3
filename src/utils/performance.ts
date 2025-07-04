// 🚀 ELGHELLA PLATFORM PERFORMANCE OPTIMIZER
import { supabase, checkSupabaseConnection } from '../lib/supabase';

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalAssets = [
    '/assets/Homepage/logo.svg',
    '/assets/Homepage/hero.svg',
    '/assets/Homepage/trees.webp',
    '/assets/Homepage/west.webp'
  ];

  criticalAssets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = asset;
    link.as = asset.endsWith('.svg') ? 'image' : 'image';
    document.head.appendChild(link);
  });
};

// Optimize images with lazy loading
export const optimizeImageLoading = () => {
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      (img as HTMLImageElement).src = (img as HTMLImageElement).dataset.src!;
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    const script = document.createElement('script');
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
    document.head.appendChild(script);
  }
};

// Cache management
export const initCacheOptimization = () => {
  // Service worker registration for caching
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
  }

  // Local storage cleanup
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('temp_') || key.startsWith('cache_')) {
        const item = localStorage.getItem(key);
        if (item) {
          const parsed = JSON.parse(item);
          if (parsed.expiry && Date.now() > parsed.expiry) {
            localStorage.removeItem(key);
          }
        }
      }
    });
  } catch (error) {
    console.warn('Cache cleanup failed:', error);
  }
};

// Connection optimization
export const optimizeSupabaseConnection = async () => {
  console.log('🔗 Optimizing Supabase connection...');
  
  try {
    const connectionCheck = await checkSupabaseConnection();
    if (connectionCheck.connected) {
      console.log('✅ Supabase connection optimized');
      
      // Warm up critical queries
      const warmupQueries = [
        supabase.from('products').select('*').limit(1),
        supabase.from('equipments').select('*').limit(1),
        supabase.from('lands').select('*').limit(1)
      ];
      
      await Promise.allSettled(warmupQueries);
      console.log('🔥 Database warmed up');
    } else {
      console.warn('⚠️ Supabase connection issues detected');
    }
  } catch (error) {
    console.error('❌ Connection optimization failed:', error);
  }
};

// Remove unused CSS and JS
export const removeUnusedAssets = () => {
  // Remove unused stylesheets
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  stylesheets.forEach(sheet => {
    const href = (sheet as HTMLLinkElement).href;
    if (href.includes('unused') || href.includes('temp')) {
      sheet.remove();
    }
  });
};

// Font optimization
export const optimizeFonts = () => {
  // Preload critical fonts
  const fonts = [
    '/fonts/NeoSansArabic-Bold.woff2',
    '/fonts/NeoSansArabic-Medium.woff2'
  ];

  fonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = font;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Memory cleanup
export const performMemoryCleanup = () => {
  // Force garbage collection if available
  if ((window as any).gc) {
    (window as any).gc();
  }

  // Clear old event listeners
  const oldElements = document.querySelectorAll('[data-cleanup="true"]');
  oldElements.forEach(el => el.remove());
};

// Main performance initialization
export const initPerformanceOptimizations = async () => {
  console.log('🚀 Initializing Elghella Performance Optimizations...');
  
  try {
    // Start optimizations in parallel
    await Promise.all([
      preloadCriticalResources(),
      optimizeImageLoading(),
      initCacheOptimization(),
      optimizeFonts(),
      optimizeSupabaseConnection()
    ]);

    // Cleanup tasks
    setTimeout(() => {
      removeUnusedAssets();
      performMemoryCleanup();
    }, 3000);

    console.log('✅ Performance optimizations complete!');
  } catch (error) {
    console.error('❌ Performance optimization failed:', error);
  }
};

// Monitor performance metrics
export const monitorPerformance = () => {
  if ('performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    const metrics = {
      loadTime: navigation.loadEventEnd - navigation.fetchStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
      firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
    };

    console.log('📊 Performance Metrics:', metrics);
    
    // Alert if performance is poor
    if (metrics.loadTime > 3000) {
      console.warn('⚠️ Slow loading detected. Consider optimizing assets.');
    }

    return metrics;
  }
};

// Export all optimizations
export default {
  initPerformanceOptimizations,
  monitorPerformance,
  optimizeSupabaseConnection,
  preloadCriticalResources
};