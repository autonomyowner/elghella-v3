import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import '../../styles/map.css';

// Leaflet imports (we'll load them dynamically)
declare global {
  interface Window {
    L: any;
  }
}

interface Farm {
  coords: [number, number];
  name: string;
  crop: string;
  plantedDate: string;
  area: string;
  owner: string;
}

const FarmMapPage: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({
    temperature: '--',
    humidity: '--',
    windSpeed: '--',
    description: '--'
  });
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const [farms] = useState<Farm[]>([
    {
      coords: [36.7538, 3.0588],
      name: "مزرعة الأمل",
      crop: "القمح",
      plantedDate: "مارس 2024",
      area: "15 هكتار",
      owner: "محمد أحمد"
    },
    {
      coords: [36.7608, 3.0688],
      name: "حقل الزيتون المبارك",
      crop: "أشجار الزيتون",
      plantedDate: "أكتوبر 2020",
      area: "8 هكتار",
      owner: "فاطمة بن علي"
    },
    {
      coords: [36.7458, 3.0488],
      name: "مزرعة النجاح",
      crop: "الطماطم",
      plantedDate: "أبريل 2024",
      area: "3 هكتار",
      owner: "عبد الرحمن محمود"
    },
    {
      coords: [36.7638, 3.0788],
      name: "حقل البركة",
      crop: "الذرة",
      plantedDate: "مايو 2024",
      area: "12 هكتار",
      owner: "خديجة يوسف"
    },
    {
      coords: [36.7338, 3.0388],
      name: "مزرعة الخير",
      crop: "البرتقال",
      plantedDate: "نوفمبر 2021",
      area: "6 هكتار",
      owner: "أحمد العربي"
    }
  ]);

  useEffect(() => {
    // 🌤️ FETCH LIVE WEATHER DATA
    const fetchWeatherData = async () => {
      try {
        setIsWeatherLoading(true);
        const API_KEY = '06dbb6c0777805cea0cc1dcbeb83e18c';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=36.7538&lon=3.0588&appid=${API_KEY}&units=metric&lang=ar`);
        const data = await response.json();
        
        setWeatherData({
          temperature: `${Math.round(data.main.temp)}°C`,
          humidity: `${data.main.humidity}%`,
          windSpeed: `${data.wind.speed} م/ث`,
          description: data.weather[0].description
        });
        
        console.log('🌤️ Weather data loaded successfully!');
        setIsWeatherLoading(false);
      } catch (error) {
        console.error('خطأ في تحميل بيانات الطقس:', error);
        setWeatherData({
          temperature: 'غير متوفر',
          humidity: 'غير متوفر',
          windSpeed: 'غير متوفر',
          description: 'غير متوفر'
        });
        setIsWeatherLoading(false);
      }
    };

    const loadLeaflet = async () => {
      try {
        // Dynamically load Leaflet CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);

        // Dynamically load Leaflet JS
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = () => {
          initializeMap(fetchWeatherData);
        };
        document.body.appendChild(script);
      } catch (error) {
        console.error('Error loading Leaflet:', error);
        setIsLoading(false);
      }
    };

    const initializeMap = (fetchWeatherData: () => void) => {
      if (!mapRef.current || !window.L) return;

      try {
        // Initialize map centered on Algiers, Algeria
        const map = window.L.map(mapRef.current).setView([36.7538, 3.0588], 13);
        mapInstance.current = map;

        // Define base layers
        const osmLayer = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        });

        // Esri Satellite imagery layer
        const satelliteLayer = window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
          maxZoom: 19
        });

        // Add default layer (OSM)
        osmLayer.addTo(map);

        // 🌱 SOIL DATA LAYER - ISRIC SoilGrids
        const soilLayer = window.L.tileLayer.wms('https://maps.isric.org/mapserv', {
          layers: 'ocd_0-5cm_mean',
          format: 'image/png',
          transparent: true,
          attribution: 'Soil data © ISRIC SoilGrids',
          opacity: 0.7,
          styles: '',
          version: '1.1.1'
        });

        // 🌤️ WEATHER LAYERS - OpenWeatherMap
        const API_KEY = '06dbb6c0777805cea0cc1dcbeb83e18c';
        
        const precipitationLayer = window.L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`, {
          attribution: 'Weather data © OpenWeatherMap',
          opacity: 0.6,
          maxZoom: 19
        });

        const temperatureLayer = window.L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`, {
          attribution: 'Weather data © OpenWeatherMap',
          opacity: 0.6,
          maxZoom: 19
        });

        const windLayer = window.L.tileLayer(`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`, {
          attribution: 'Weather data © OpenWeatherMap',
          opacity: 0.6,
          maxZoom: 19
        });

        const cloudsLayer = window.L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`, {
          attribution: 'Weather data © OpenWeatherMap',
          opacity: 0.6,
          maxZoom: 19
        });

        const pressureLayer = window.L.tileLayer(`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${API_KEY}`, {
          attribution: 'Weather data © OpenWeatherMap',
          opacity: 0.6,
          maxZoom: 19
        });

        // Create base and overlay layer controls
        const baseLayers = {
          "🗺️ الخريطة العادية": osmLayer,
          "🛰️ صور الأقمار الصناعية": satelliteLayer
        };

        const overlayLayers = {
          "🌱 كثافة الكربون العضوي (التربة)": soilLayer,
          "🌧️ هطول الأمطار (مباشر)": precipitationLayer,
          "🌡️ درجة الحرارة (مباشر)": temperatureLayer,
          "💨 الرياح (مباشر)": windLayer,
          "☁️ الغيوم (مباشر)": cloudsLayer,
          "📊 الضغط الجوي": pressureLayer
        };

        // Add layer control with overlays
        const layerControl = window.L.control.layers(baseLayers, overlayLayers, {
          position: 'topright',
          collapsed: false
        }).addTo(map);

        // Add soil layer by default to show it working
        soilLayer.addTo(map);

        // Custom farm icon
        const farmIcon = window.L.divIcon({
          html: '<div style="background: #4CAF50; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.3); border: 3px solid white;">🌾</div>',
          iconSize: [40, 40],
          className: 'custom-farm-icon'
        });

        // Add farm markers
        farms.forEach(farm => {
          const marker = window.L.marker(farm.coords, { icon: farmIcon }).addTo(map);
          
          const popupContent = `
            <div style="text-align: center; font-family: Arial, sans-serif; direction: rtl;">
              <h3 style="color: #4CAF50; margin-bottom: 10px; font-size: 1.4em;">🌾 ${farm.name}</h3>
              <div style="background: #f0f8f0; padding: 10px; border-radius: 8px; margin: 8px 0;">
                <div style="color: #2e7d32; font-weight: bold; font-size: 1.1em;">🌱 نوع المحصول: ${farm.crop}</div>
                <div style="color: #666; font-size: 0.9em; margin-top: 5px;">📅 تاريخ الزراعة: ${farm.plantedDate}</div>
                <div style="color: #666; font-size: 0.9em; margin-top: 5px;">📏 المساحة: ${farm.area}</div>
                <div style="color: #666; font-size: 0.9em; margin-top: 5px;">👨‍🌾 المالك: ${farm.owner}</div>
              </div>
              <div style="margin-top: 10px; padding: 8px; background: #e8f5e8; border-radius: 5px; font-size: 0.9em;">
                💡 انقر لعرض المزيد من التفاصيل
              </div>
            </div>
          `;
          
          marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'custom-popup'
          });
        });

        // Add a scale control
        window.L.control.scale().addTo(map);

        // Add custom zoom control with Arabic labels
        map.removeControl(map.zoomControl);
        window.L.control.zoom({
          zoomInTitle: 'تكبير',
          zoomOutTitle: 'تصغير'
        }).addTo(map);

        // Add location marker for current position (if available)
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            
            const userIcon = window.L.divIcon({
              html: '<div style="background: #ff4444; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); border: 2px solid white;">📍</div>',
              iconSize: [20, 20],
              className: 'user-location-icon'
            });
            
            window.L.marker([userLat, userLng], { icon: userIcon })
              .addTo(map)
              .bindPopup('📍 موقعك الحالي')
              .openPopup();
          });
        }

        // Enhanced map click event with soil data info
        map.on('click', function(e: any) {
          console.log('📍 Map clicked at: ' + e.latlng);
          
          const popup = window.L.popup()
            .setLatLng(e.latlng)
            .setContent(`
              <div style="text-align: center; direction: rtl;">
                <h4>📍 الموقع المحدد</h4>
                <p><strong>خط العرض:</strong> ${e.latlng.lat.toFixed(4)}</p>
                <p><strong>خط الطول:</strong> ${e.latlng.lng.toFixed(4)}</p>
                <div style="margin-top: 10px; padding: 8px; background: #e3f2fd; border-radius: 5px; font-size: 0.9em;">
                  💡 فعّل طبقة التربة لرؤية بيانات الكربون العضوي
                </div>
              </div>
            `)
            .openOn(map);
        });

        // Layer events for better user experience
        map.on('overlayadd', function(e: any) {
          if (e.name.includes('التربة')) {
            console.log('🌱 Soil layer activated');
            alert('تم تفعيل طبقة بيانات التربة! انقر على أي مكان في الخريطة لاستكشاف البيانات.');
          } else if (e.name.includes('مباشر')) {
            console.log('🌤️ Weather layer activated');
          }
        });

        // Fetch weather data
        fetchWeatherData();
        
        // Update weather data every 10 minutes
        const weatherInterval = setInterval(fetchWeatherData, 600000);
        
        // Store interval reference for cleanup
        (map as any).weatherInterval = weatherInterval;

        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing map:', error);
        setIsLoading(false);
      }
    };

    loadLeaflet();

    // Cleanup
    return () => {
      if (mapInstance.current) {
        // Clear weather interval
        if ((mapInstance.current as any).weatherInterval) {
          clearInterval((mapInstance.current as any).weatherInterval);
        }
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [farms]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🗺️ خريطة المزارع التفاعلية
          </h1>
          <p className="text-xl opacity-90">
            استكشف المزارع والحقول الزراعية في منطقة الجزائر العاصمة
          </p>
        </div>
      </motion.div>

      {/* Map Container */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Map */}
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mb-4"></div>
                  <p className="text-gray-600 text-lg">جاري تحميل الخريطة...</p>
                </div>
              </div>
            )}
            <div
              ref={mapRef}
              className="w-full h-96 md:h-[600px] border-4 border-green-500 rounded-lg"
              style={{ 
                minHeight: '400px',
                opacity: isLoading ? 0.3 : 1,
                transition: 'opacity 0.5s ease'
              }}
            />
          </div>

          {/* Features Panel */}
          <div className="p-6 bg-gray-50">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              ✨ ميزات الخريطة التفاعلية
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-md border-r-4 border-green-500"
              >
                <div className="text-2xl mb-2">🌍</div>
                <h3 className="font-semibold text-gray-800">عرض الخريطة</h3>
                <p className="text-sm text-gray-600">تبديل بين الخريطة العادية والقمر الصناعي</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-md border-r-4 border-blue-500"
              >
                <div className="text-2xl mb-2">📍</div>
                <h3 className="font-semibold text-gray-800">مواقع المزارع</h3>
                <p className="text-sm text-gray-600">انقر على العلامات لعرض تفاصيل المحاصيل</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-md border-r-4 border-yellow-500"
              >
                <div className="text-2xl mb-2">🌾</div>
                <h3 className="font-semibold text-gray-800">معلومات المحاصيل</h3>
                <p className="text-sm text-gray-600">نوع المحصول وتاريخ الزراعة</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-md border-r-4 border-purple-500"
              >
                <div className="text-2xl mb-2">🚜</div>
                <h3 className="font-semibold text-gray-800">إدارة المزارع</h3>
                <p className="text-sm text-gray-600">تتبع حالة المحاصيل والأنشطة الزراعية</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-md border-r-4 border-orange-500"
              >
                <div className="text-2xl mb-2">🌱</div>
                <h3 className="font-semibold text-gray-800">بيانات التربة</h3>
                <p className="text-sm text-gray-600">معلومات كثافة الكربون العضوي</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-md border-r-4 border-cyan-500"
              >
                <div className="text-2xl mb-2">🌤️</div>
                <h3 className="font-semibold text-gray-800">معلومات الطقس</h3>
                <p className="text-sm text-gray-600">بيانات جوية حية ومحدثة</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Weather Information Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6">
              🌤️ معلومات الطقس الحالية - الجزائر العاصمة
            </h2>
            
            {isWeatherLoading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
                <p>جاري تحميل بيانات الطقس...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold mb-2">{weatherData.temperature}</div>
                  <div className="text-sm opacity-80">درجة الحرارة</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold mb-2">{weatherData.humidity}</div>
                  <div className="text-sm opacity-80">الرطوبة</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold mb-2">{weatherData.windSpeed}</div>
                  <div className="text-sm opacity-80">سرعة الرياح</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center">
                  <div className="text-xl font-bold mb-2">{weatherData.description}</div>
                  <div className="text-sm opacity-80">وصف الطقس</div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Soil Carbon Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
              🌱 دليل كثافة الكربون العضوي في التربة
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-5 bg-amber-900 rounded mr-3 border"></div>
                <div className="flex-1">
                  <strong>عالي جداً (&gt; 25 g/kg):</strong> تربة خصبة جداً، مثالية للزراعة الكثيفة
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-5 bg-amber-700 rounded mr-3 border"></div>
                <div className="flex-1">
                  <strong>عالي (15-25 g/kg):</strong> تربة خصبة، جيدة للمحاصيل المتنوعة
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-5 bg-amber-500 rounded mr-3 border"></div>
                <div className="flex-1">
                  <strong>متوسط (8-15 g/kg):</strong> تربة متوسطة الخصوبة، تحتاج تحسين
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-5 bg-amber-300 rounded mr-3 border"></div>
                <div className="flex-1">
                  <strong>منخفض (3-8 g/kg):</strong> تربة ضعيفة، تحتاج تسميد عضوي
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-5 bg-amber-100 rounded mr-3 border"></div>
                <div className="flex-1">
                  <strong>منخفض جداً (&lt; 3 g/kg):</strong> تربة غير صالحة للزراعة
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>💡 معلومة مهمة:</strong> الكربون العضوي في التربة مؤشر حيوي لخصوبة الأرض وقدرتها على الاحتفاظ بالماء والمغذيات. 
                كلما زاد المحتوى العضوي، كانت التربة أكثر صحة وإنتاجية.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{farms.length}</div>
            <div className="text-gray-600">مزارع مسجلة</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">44</div>
            <div className="text-gray-600">هكتار إجمالي</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">5</div>
            <div className="text-gray-600">أنواع محاصيل</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FarmMapPage;