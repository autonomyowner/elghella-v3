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
    // الجزائر العاصمة وضواحيها
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
    // وهران - الغرب الجزائري
    {
      coords: [35.6976, -0.6337],
      name: "بساتين وهران",
      crop: "الحمضيات",
      plantedDate: "فبراير 2024",
      area: "18 هكتار",
      owner: "خالد الوهراني"
    },
    {
      coords: [35.7589, -0.5419],
      name: "مزرعة السهول الغربية",
      crop: "البطاطس",
      plantedDate: "سبتمبر 2024",
      area: "25 هكتار",
      owner: "نورة بنت علي"
    },
    // قسنطينة - الشرق الجزائري
    {
      coords: [36.3650, 6.6147],
      name: "مزارع قسنطينة",
      crop: "الشعير",
      plantedDate: "أغسطس 2024",
      area: "22 هكتار",
      owner: "محمد القسنطيني"
    },
    {
      coords: [36.4681, 6.7648],
      name: "حقول الذرة الشرقية",
      crop: "الذرة",
      plantedDate: "مايو 2024",
      area: "16 هكتار",
      owner: "عائشة الهواري"
    },
    // ورقلة - الجنوب الجزائري
    {
      coords: [31.9447, 5.3317],
      name: "واحة ورقلة",
      crop: "التمر",
      plantedDate: "مارس 2020",
      area: "35 هكتار",
      owner: "عبد الله الصحراوي"
    },
    {
      coords: [32.1234, 5.4567],
      name: "مزرعة النخيل الجنوبية",
      crop: "النخيل",
      plantedDate: "نوفمبر 2019",
      area: "28 هكتار",
      owner: "حليمة بنت سعد"
    },
    // تيارت - الهضاب العليا
    {
      coords: [35.3711, 1.3170],
      name: "مزارع تيارت",
      crop: "القمح الصلب",
      plantedDate: "نوفمبر 2024",
      area: "30 هكتار",
      owner: "سليم التياري"
    },
    // سطيف - الشرق الأوسط
    {
      coords: [36.1905, 5.4133],
      name: "حقول سطيف",
      crop: "العدس",
      plantedDate: "أكتوبر 2024",
      area: "14 هكتار",
      owner: "زينب السطايفية"
    }
  ]);

  useEffect(() => {
    // 🌤️ ENHANCED WEATHER DATA WITH FALLBACKS
    const fetchWeatherData = async () => {
      try {
        setIsWeatherLoading(true);
        const API_KEY = '06dbb6c0777805cea0cc1dcbeb83e18c';
        
        // Try primary API endpoint
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=36.7538&lon=3.0588&appid=${API_KEY}&units=metric&lang=ar`);
        
        if (!response.ok) {
          // Fallback to English if Arabic fails
          response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=36.7538&lon=3.0588&appid=${API_KEY}&units=metric`);
        }
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Validate data structure
        if (!data.main || !data.weather || !data.wind) {
          throw new Error('Invalid weather data structure');
        }
        
        setWeatherData({
          temperature: `${Math.round(data.main.temp)}°C`,
          humidity: `${data.main.humidity}%`,
          windSpeed: `${Math.round(data.wind.speed * 10) / 10} م/ث`,
          description: data.weather[0].description || 'غائم جزئياً'
        });
        
        console.log('🌤️ Weather data loaded successfully!');
        setIsWeatherLoading(false);
        
        // Show success toast
        const toast = document.createElement('div');
        toast.style.cssText = `
          position: fixed;
          top: 20px;
          left: 20px;
          background: #4CAF50;
          color: white;
          padding: 10px 15px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          z-index: 1000;
          font-family: Arial, sans-serif;
          font-size: 14px;
        `;
        toast.innerHTML = '✅ تم تحديث بيانات الطقس';
        document.body.appendChild(toast);
        
        setTimeout(() => {
          if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
          }
        }, 2000);
        
      } catch (error) {
        console.error('خطأ في تحميل بيانات الطقس:', error);
        
        // Enhanced fallback with demo data
        setWeatherData({
          temperature: '22°C',
          humidity: '65%',
          windSpeed: '2.1 م/ث',
          description: 'غائم جزئياً (بيانات تجريبية)'
        });
        
        setIsWeatherLoading(false);
        
        // Show error toast
        const errorToast = document.createElement('div');
        errorToast.style.cssText = `
          position: fixed;
          top: 20px;
          left: 20px;
          background: #FF9800;
          color: white;
          padding: 10px 15px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          z-index: 1000;
          font-family: Arial, sans-serif;
          font-size: 14px;
        `;
        errorToast.innerHTML = '⚠️ استخدام بيانات طقس تجريبية';
        document.body.appendChild(errorToast);
        
        setTimeout(() => {
          if (errorToast.parentNode) {
            errorToast.parentNode.removeChild(errorToast);
          }
        }, 3000);
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
        // Initialize map centered on Algeria (broader view)
        const map = window.L.map(mapRef.current).setView([28.0339, 1.6596], 6);
        
        // Set loading to false immediately after map creation
        setIsLoading(false);
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

        // Add default layer (OSM) and set loading complete
        osmLayer.addTo(map);
        
        // Map is now ready - all other layers load in background
        console.log('🗺️ Base map loaded successfully');

        // 🌱 SOIL DATA LAYERS - Multiple working sources (loaded in background)
        // Primary soil layer - ISRIC SoilGrids (Fixed URL)
        const soilLayer = window.L.tileLayer('https://maps.isric.org/mapserv?map=/map/ocd.map&layer=ocd_0-5cm_mean&mode=tile&tile={x}+{y}+{z}&tilemode=gmap&map.imagetype=png', {
          attribution: 'Soil data © ISRIC SoilGrids',
          opacity: 0.8,
          maxZoom: 16
        });

        // Alternative soil layer - World Soil Information
        const soilLayerAlt = window.L.tileLayer('https://rest.isric.org/soilgrids/v2.0/classification?lon={lon}&lat={lat}&depth=0-5cm&property=ocd&value=mean', {
          attribution: 'Soil data © ISRIC SoilGrids v2.0',
          opacity: 0.7,
          maxZoom: 18
        });

        // Fallback - Create visual soil demo layer for Algeria
        const createSoilDemoLayer = () => {
          const soilDemoLayer = window.L.layerGroup();
          
          // Create sample soil fertility zones around Algiers
          const soilZones = [
            {
              center: [36.7538, 3.0588],
              radius: 2000,
              color: '#8B4513',
              fillColor: '#8B4513',
              fillOpacity: 0.3,
              popup: 'منطقة عالية الخصوبة - كثافة كربون عضوي: 28 g/kg'
            },
            {
              center: [36.7608, 3.0688],
              radius: 1500,
              color: '#A0522D',
              fillColor: '#A0522D',
              fillOpacity: 0.3,
              popup: 'منطقة خصبة - كثافة كربون عضوي: 18 g/kg'
            },
            {
              center: [36.7458, 3.0488],
              radius: 1800,
              color: '#CD853F',
              fillColor: '#CD853F',
              fillOpacity: 0.3,
              popup: 'منطقة متوسطة الخصوبة - كثافة كربون عضوي: 12 g/kg'
            },
            {
              center: [36.7638, 3.0788],
              radius: 1200,
              color: '#F4A460',
              fillColor: '#F4A460',
              fillOpacity: 0.3,
              popup: 'منطقة ضعيفة الخصوبة - كثافة كربون عضوي: 6 g/kg'
            },
            {
              center: [36.7338, 3.0388],
              radius: 1000,
              color: '#FFEFD5',
              fillColor: '#FFEFD5',
              fillOpacity: 0.4,
              popup: 'منطقة ضعيفة جداً - كثافة كربون عضوي: 2 g/kg'
            }
          ];

          soilZones.forEach(zone => {
            const circle = window.L.circle(zone.center, {
              radius: zone.radius,
              color: zone.color,
              fillColor: zone.fillColor,
              fillOpacity: zone.fillOpacity,
              weight: 2
            }).bindPopup(`
              <div style="text-align: center; direction: rtl;">
                <h4>🌱 تحليل التربة</h4>
                <p>${zone.popup}</p>
                <div style="margin-top: 8px; padding: 6px; background: #e8f5e8; border-radius: 4px; font-size: 0.85em;">
                  💡 بيانات تجريبية للمنطقة
                </div>
              </div>
            `);
            soilDemoLayer.addLayer(circle);
          });

          return soilDemoLayer;
        };

        const soilDemoLayer = createSoilDemoLayer();

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
          "🌱 مناطق خصوبة التربة (تجريبية)": soilDemoLayer,
          "🌍 بيانات التربة العالمية": soilLayer,
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

        // Add soil demo layer by default to show it working immediately
        soilDemoLayer.addTo(map);
        
        // Add weather layer for immediate visual impact
        precipitationLayer.addTo(map);

        // Fixed farm icon - simpler and more reliable
        const farmIcon = window.L.divIcon({
          html: '🌾',
          iconSize: [30, 30],
          className: 'farm-marker-icon',
          iconAnchor: [15, 15]
        });

        // Add CSS for farm icon
        const iconStyle = document.createElement('style');
        iconStyle.textContent = `
          .farm-marker-icon {
            background: #4CAF50 !important;
            color: white !important;
            border-radius: 50% !important;
            width: 40px !important;
            height: 40px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 20px !important;
            box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4) !important;
            border: 3px solid white !important;
            transition: all 0.3s ease !important;
          }
          .farm-marker-icon:hover {
            transform: scale(1.1) !important;
            box-shadow: 0 6px 16px rgba(76, 175, 80, 0.6) !important;
          }
        `;
        document.head.appendChild(iconStyle);

        // Enhanced farm markers with detailed information
        farms.forEach((farm, index) => {
          const marker = window.L.marker(farm.coords, { icon: farmIcon }).addTo(map);
          
          // Generate dynamic farm data
          const soilQuality = ['ممتازة', 'جيدة', 'متوسطة', 'ضعيفة'][index % 4];
          const soilColor = ['#8B4513', '#A0522D', '#CD853F', '#F4A460'][index % 4];
          const expectedYield = [85, 72, 58, 45][index % 4];
          const waterNeeds = ['منخفضة', 'متوسطة', 'عالية', 'عالية جداً'][index % 4];
          const recommendedCrops = [
            ['القمح', 'الشعير', 'الذرة'],
            ['الطماطم', 'الخيار', 'الفلفل'],
            ['الزيتون', 'اللوز', 'التين'],
            ['البرتقال', 'الليمون', 'العنب']
          ][index % 4];
          
          const popupContent = `
            <div style="text-align: center; font-family: Arial, sans-serif; direction: rtl; min-width: 280px;">
              <h3 style="color: #4CAF50; margin-bottom: 15px; font-size: 1.5em;">🌾 ${farm.name}</h3>
              
              <!-- معلومات المحصول الحالي -->
              <div style="background: #f0f8f0; padding: 12px; border-radius: 8px; margin: 10px 0;">
                <div style="color: #2e7d32; font-weight: bold; font-size: 1.1em; margin-bottom: 8px;">📋 معلومات المزرعة</div>
                <div style="color: #666; font-size: 0.9em; margin: 5px 0;">🌱 المحصول: ${farm.crop}</div>
                <div style="color: #666; font-size: 0.9em; margin: 5px 0;">📅 الزراعة: ${farm.plantedDate}</div>
                <div style="color: #666; font-size: 0.9em; margin: 5px 0;">📏 المساحة: ${farm.area}</div>
                <div style="color: #666; font-size: 0.9em; margin: 5px 0;">👨‍🌾 المالك: ${farm.owner}</div>
              </div>

              <!-- تحليل التربة -->
              <div style="background: #e3f2fd; padding: 12px; border-radius: 8px; margin: 10px 0;">
                <div style="color: #1976d2; font-weight: bold; font-size: 1.1em; margin-bottom: 8px;">🌱 تحليل التربة</div>
                <div style="display: flex; align-items: center; justify-content: center; margin: 5px 0;">
                  <div style="width: 15px; height: 15px; background: ${soilColor}; border-radius: 50%; margin-left: 8px;"></div>
                  <span style="font-size: 0.9em;">جودة التربة: ${soilQuality}</span>
                </div>
                <div style="color: #666; font-size: 0.9em; margin: 5px 0;">💧 احتياجات الري: ${waterNeeds}</div>
                <div style="color: #666; font-size: 0.9em; margin: 5px 0;">📈 الإنتاجية المتوقعة: ${expectedYield}%</div>
              </div>

              <!-- توصيات المحاصيل -->
              <div style="background: #fff3e0; padding: 12px; border-radius: 8px; margin: 10px 0;">
                <div style="color: #f57c00; font-weight: bold; font-size: 1.1em; margin-bottom: 8px;">💡 محاصيل مُوصى بها</div>
                <div style="font-size: 0.85em; color: #666;">
                  ${recommendedCrops.map(crop => `🌿 ${crop}`).join(' • ')}
                </div>
              </div>

              <!-- أزرار الإجراءات -->
              <div style="margin-top: 15px; display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
                <button onclick="alert('ميزة قادمة: عرض تفاصيل أكثر عن ${farm.name}')" 
                        style="background: #4CAF50; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 0.8em; cursor: pointer;">
                  📊 تفاصيل أكثر
                </button>
                <button onclick="alert('ميزة قادمة: تقرير حالة المحصول')" 
                        style="background: #2196F3; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 0.8em; cursor: pointer;">
                  📈 تقرير الحالة
                </button>
              </div>
            </div>
          `;
          
          marker.bindPopup(popupContent, {
            maxWidth: 350,
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

        // Enhanced measurement tool with better error handling
        const createMeasurementTool = () => {
          let measurementLayer = window.L.layerGroup().addTo(map);
          let isMeasuring = false;
          let measurementPoints: any[] = [];
          
          const MeasurementControl = window.L.Control.extend({
            onAdd: function(mapInstance: any) {
              const div = window.L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom measurement-control');
              
              div.innerHTML = `
                <div class="measurement-buttons">
                  <button id="measure-distance" class="measure-btn" title="قياس المسافة">
                    📏 قياس
                  </button>
                  <button id="clear-measurements" class="clear-btn" title="مسح القياسات">
                    🗑️ مسح
                  </button>
                </div>
              `;
              
              // Prevent map interaction when clicking buttons
              window.L.DomEvent.disableClickPropagation(div);
              window.L.DomEvent.disableScrollPropagation(div);
              
              const measureBtn = div.querySelector('#measure-distance');
              const clearBtn = div.querySelector('#clear-measurements');
              
              measureBtn?.addEventListener('click', function(e: Event) {
                e.stopPropagation();
                startMeasurement();
              });
              
              clearBtn?.addEventListener('click', function(e: Event) {
                e.stopPropagation();
                clearMeasurements();
              });
              
              return div;
            }
          });
          
          const startMeasurement = () => {
            isMeasuring = true;
            measurementPoints = [];
            map.getContainer().style.cursor = 'crosshair';
            
            const toast = document.createElement('div');
            toast.className = 'measurement-toast';
            toast.innerHTML = '📏 انقر على نقطتين لقياس المسافة';
            document.body.appendChild(toast);
            
            setTimeout(() => {
              if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
              }
            }, 3000);
          };
          
          const clearMeasurements = () => {
            measurementLayer.clearLayers();
            measurementPoints = [];
            isMeasuring = false;
            map.getContainer().style.cursor = '';
          };
          
          // Add click handler for measurements
          map.on('click', function(e: any) {
            if (!isMeasuring || measurementPoints.length >= 2) return;
            
            measurementPoints.push(e.latlng);
            
            // Add point marker
            window.L.circleMarker(e.latlng, {
              radius: 6,
              color: '#4CAF50',
              fillColor: '#4CAF50',
              fillOpacity: 0.8,
              weight: 2
            }).addTo(measurementLayer);
            
            if (measurementPoints.length === 2) {
              // Calculate distance
              const distance = measurementPoints[0].distanceTo(measurementPoints[1]);
              const distanceKm = (distance / 1000).toFixed(2);
              const distanceM = distance.toFixed(0);
              
              // Draw line
              window.L.polyline(measurementPoints, {
                color: '#4CAF50',
                weight: 3,
                opacity: 0.8,
                dashArray: '5, 10'
              }).addTo(measurementLayer);
              
              // Add distance label
              const midpoint = window.L.latLng(
                (measurementPoints[0].lat + measurementPoints[1].lat) / 2,
                (measurementPoints[0].lng + measurementPoints[1].lng) / 2
              );
              
              window.L.marker(midpoint, {
                icon: window.L.divIcon({
                  html: `
                    <div class="distance-label-marker">
                      <strong>${distanceKm} كم</strong><br>
                      ${distanceM} متر
                    </div>
                  `,
                  className: 'distance-label-container',
                  iconSize: [80, 40],
                  iconAnchor: [40, 20]
                })
              }).addTo(measurementLayer);
              
              // Reset measurement mode
              isMeasuring = false;
              map.getContainer().style.cursor = '';
              
              // Show completion message
              const successToast = document.createElement('div');
              successToast.className = 'success-toast';
              successToast.innerHTML = `✅ المسافة: ${distanceKm} كم (${distanceM} متر)`;
              document.body.appendChild(successToast);
              
              setTimeout(() => {
                if (successToast.parentNode) {
                  successToast.parentNode.removeChild(successToast);
                }
              }, 4000);
            }
          });
          
          return MeasurementControl;
        };

        // Add measurement control
        const MeasurementControl = createMeasurementTool();
        new MeasurementControl({ position: 'topleft' }).addTo(map);

        // Add CSS for measurement tool
        const measurementStyle = document.createElement('style');
        measurementStyle.textContent = `
          .measurement-control {
            background: white !important;
            border-radius: 8px !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2) !important;
            padding: 8px !important;
          }
          .measurement-buttons {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .measure-btn, .clear-btn {
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 11px;
            font-weight: bold;
            transition: all 0.2s ease;
          }
          .measure-btn {
            background: #4CAF50;
            color: white;
          }
          .measure-btn:hover {
            background: #45a049;
            transform: scale(1.05);
          }
          .clear-btn {
            background: #f44336;
            color: white;
          }
          .clear-btn:hover {
            background: #da190b;
            transform: scale(1.05);
          }
          .measurement-toast, .success-toast {
            position: fixed;
            top: 100px;
            right: 20px;
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            z-index: 1000;
            font-family: Arial, sans-serif;
            direction: rtl;
            font-size: 14px;
          }
          .measurement-toast {
            background: #4CAF50;
          }
          .success-toast {
            background: #2196F3;
          }
          .distance-label-marker {
            background: white;
            padding: 6px 10px;
            border-radius: 6px;
            border: 2px solid #4CAF50;
            font-size: 12px;
            font-weight: bold;
            color: #4CAF50;
            text-align: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          }
          .distance-label-container {
            background: transparent !important;
            border: none !important;
          }
        `;
        document.head.appendChild(measurementStyle);

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

        // Enhanced map click event with comprehensive location analysis
        map.on('click', function(e: any) {
          console.log('📍 Map clicked at: ' + e.latlng);
          
          // Calculate distance from Algiers center
          const algiersCenter = window.L.latLng(36.7538, 3.0588);
          const distanceKm = e.latlng.distanceTo(algiersCenter) / 1000;
          const distance = distanceKm.toFixed(1);
          
          // Determine soil quality based on proximity to our demo zones
          let soilAnalysis = '';
          let farmingAdvice = '';
          let soilColor = '#CD853F';
          
          if (distanceKm < 2) {
            soilAnalysis = 'ممتازة (26-30 g/kg كربون عضوي)';
            farmingAdvice = 'مثالية لجميع أنواع المحاصيل';
            soilColor = '#8B4513';
          } else if (distanceKm < 4) {
            soilAnalysis = 'جيدة (18-25 g/kg كربون عضوي)';
            farmingAdvice = 'مناسبة للخضروات والحبوب';
            soilColor = '#A0522D';
          } else if (distanceKm < 6) {
            soilAnalysis = 'متوسطة (10-17 g/kg كربون عضوي)';
            farmingAdvice = 'تحتاج تسميد عضوي منتظم';
            soilColor = '#CD853F';
          } else {
            soilAnalysis = 'ضعيفة (5-9 g/kg كربون عضوي)';
            farmingAdvice = 'تحتاج تحسين كبير قبل الزراعة';
            soilColor = '#F4A460';
          }
          
          const popup = window.L.popup()
            .setLatLng(e.latlng)
            .setContent(`
              <div style="text-align: center; direction: rtl; min-width: 280px;">
                <h4 style="color: #4CAF50; margin-bottom: 12px;">📍 تحليل الموقع</h4>
                
                <!-- الإحداثيات -->
                <div style="background: #f5f5f5; padding: 10px; border-radius: 6px; margin: 8px 0;">
                  <div style="font-weight: bold; margin-bottom: 5px;">📐 الإحداثيات</div>
                  <div style="font-size: 0.85em; color: #666;">
                    خط العرض: ${e.latlng.lat.toFixed(6)}<br>
                    خط الطول: ${e.latlng.lng.toFixed(6)}<br>
                    المسافة من الجزائر العاصمة: ${distance} كم
                  </div>
                </div>

                <!-- تحليل التربة -->
                <div style="background: #e8f5e8; padding: 10px; border-radius: 6px; margin: 8px 0;">
                  <div style="font-weight: bold; margin-bottom: 8px; color: #2e7d32;">🌱 تحليل التربة المتوقع</div>
                  <div style="display: flex; align-items: center; justify-content: center; margin: 5px 0;">
                    <div style="width: 12px; height: 12px; background: ${soilColor}; border-radius: 50%; margin-left: 6px;"></div>
                    <span style="font-size: 0.9em;">${soilAnalysis}</span>
                  </div>
                  <div style="font-size: 0.85em; color: #666; margin-top: 5px;">
                    💡 ${farmingAdvice}
                  </div>
                </div>

                <!-- معلومات المناخ -->
                <div style="background: #e3f2fd; padding: 10px; border-radius: 6px; margin: 8px 0;">
                  <div style="font-weight: bold; margin-bottom: 5px; color: #1976d2;">🌤️ المناخ المحلي</div>
                  <div style="font-size: 0.85em; color: #666;">
                    المنطقة: مناخ متوسطي<br>
                    هطول الأمطار: 600-800 مم/سنة<br>
                    الموسم الأمثل: أكتوبر - مايو
                  </div>
                </div>

                <!-- أدوات الخريطة -->
                <div style="margin-top: 12px; display: flex; gap: 6px; justify-content: center; flex-wrap: wrap;">
                  <button onclick="
                    navigator.geolocation.getCurrentPosition(function(pos) {
                      const distance = Math.round(
                        L.latLng(pos.coords.latitude, pos.coords.longitude).distanceTo(L.latLng(${e.latlng.lat}, ${e.latlng.lng})) / 1000
                      );
                      alert('المسافة من موقعك الحالي: ' + distance + ' كم');
                    }, function() {
                      alert('لا يمكن الوصول لموقعك الحالي');
                    });
                  " style="background: #FF9800; color: white; border: none; padding: 6px 10px; border-radius: 4px; font-size: 0.75em; cursor: pointer;">
                    📏 قياس المسافة
                  </button>
                  <button onclick="
                    const coords = '${e.latlng.lat},${e.latlng.lng}';
                    navigator.clipboard.writeText(coords).then(() => {
                      alert('تم نسخ الإحداثيات: ' + coords);
                    }).catch(() => {
                      alert('الإحداثيات: ' + coords);
                    });
                  " style="background: #9C27B0; color: white; border: none; padding: 6px 10px; border-radius: 4px; font-size: 0.75em; cursor: pointer;">
                    📋 نسخ الإحداثيات
                  </button>
                </div>

                <div style="margin-top: 10px; padding: 6px; background: #fff3e0; border-radius: 4px; font-size: 0.8em; color: #f57c00;">
                  💡 فعّل طبقات التربة والطقس لمزيد من المعلومات
                </div>
              </div>
            `)
            .openOn(map);
        });

        // Enhanced layer events for better user experience
        map.on('overlayadd', function(e: any) {
          if (e.name.includes('التربة') || e.name.includes('خصوبة')) {
            console.log('🌱 Soil layer activated');
            
            // Show informative toast instead of alert
            const toast = document.createElement('div');
            toast.style.cssText = `
              position: fixed;
              top: 100px;
              right: 20px;
              background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
              color: white;
              padding: 15px 20px;
              border-radius: 10px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              z-index: 1000;
              font-family: Arial, sans-serif;
              direction: rtl;
              max-width: 300px;
              animation: slideIn 0.5s ease-out;
            `;
            toast.innerHTML = `
              <div style="font-weight: bold; margin-bottom: 5px;">🌱 تم تفعيل طبقة التربة!</div>
              <div style="font-size: 0.9em; opacity: 0.9;">انقر على أي مكان لتحليل خصوبة التربة والحصول على نصائح زراعية مخصصة</div>
            `;
            
            // Add CSS animation
            const style = document.createElement('style');
            style.textContent = `
              @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
              }
            `;
            document.head.appendChild(style);
            
            document.body.appendChild(toast);
            setTimeout(() => {
              if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
              }
            }, 4000);
            
          } else if (e.name.includes('مباشر') || e.name.includes('الطقس')) {
            console.log('🌤️ Weather layer activated');
            
            const toast = document.createElement('div');
            toast.style.cssText = `
              position: fixed;
              top: 100px;
              right: 20px;
              background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
              color: white;
              padding: 15px 20px;
              border-radius: 10px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              z-index: 1000;
              font-family: Arial, sans-serif;
              direction: rtl;
              max-width: 300px;
              animation: slideIn 0.5s ease-out;
            `;
            toast.innerHTML = `
              <div style="font-weight: bold; margin-bottom: 5px;">🌤️ تم تفعيل طبقة الطقس!</div>
              <div style="font-size: 0.9em; opacity: 0.9;">يمكنك الآن رؤية بيانات الطقس الحية على الخريطة</div>
            `;
            
            document.body.appendChild(toast);
            setTimeout(() => {
              if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
              }
            }, 3000);
          }
        });

        map.on('overlayremove', function(e: any) {
          console.log('Layer removed: ' + e.name);
        });

        // Fetch weather data
        fetchWeatherData();
        
        // Check for expertise page integration parameters
        const urlParams = new URLSearchParams(window.location.search);
        const feature = urlParams.get('feature');
        const source = urlParams.get('source');
        
        if (source === 'expertise') {
          // Show welcome message from expertise page
          setTimeout(() => {
            const welcomeToast = document.createElement('div');
            welcomeToast.style.cssText = `
              position: fixed;
              top: 20px;
              right: 20px;
              background: linear-gradient(135deg, #4CAF50, #2196F3);
              color: white;
              padding: 15px 20px;
              border-radius: 12px;
              box-shadow: 0 6px 16px rgba(0,0,0,0.3);
              z-index: 1000;
              font-family: Arial, sans-serif;
              font-size: 14px;
              max-width: 300px;
              direction: rtl;
            `;
            welcomeToast.innerHTML = `
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                <span style="font-size: 20px;">🧠</span>
                <strong>مرحباً من صفحة الاستشارات!</strong>
              </div>
              <div style="font-size: 12px; opacity: 0.9;">
                ${feature ? getFeatureMessage(feature) : 'استكشف الخريطة التفاعلية للحصول على تحليل شامل لمزرعتك'}
              </div>
            `;
            document.body.appendChild(welcomeToast);
            
            setTimeout(() => {
              if (welcomeToast.parentNode) {
                welcomeToast.parentNode.removeChild(welcomeToast);
              }
            }, 6000);
          }, 1000);
        }

        // Refresh weather every 10 minutes
        const interval = setInterval(fetchWeatherData, 10 * 60 * 1000);
        return () => clearInterval(interval);
      } catch (error) {
        console.error('Error initializing map:', error);
        setIsLoading(false);
      }
    };

    loadLeaflet();

    // Cleanup
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Helper function to get feature-specific messages
  const getFeatureMessage = (feature: string) => {
    const messages: { [key: string]: string } = {
      'crop-analysis': '🌾 اكتشف صحة محاصيلك باستخدام أدوات التحليل التفاعلية',
      'soil-analysis': '🌱 شاهد بيانات التربة وخصوبتها في مزرعتك',
      'weather-data': '🌤️ اطلع على بيانات الطقس المباشرة لمنطقتك',
      'custom-maps': '🗺️ أنشئ خرائط مخصصة لتحليل مزرعتك'
    };
    return messages[feature] || 'استكشف الأدوات التفاعلية للتحليل الزراعي';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-center lg:text-right mb-6 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                🗺️ خريطة المزارع التفاعلية
              </h1>
                             <p className="text-xl opacity-90">
                 استكشف المزارع والحقول الزراعية في جميع أنحاء الجزائر
               </p>
            </div>
            
            {/* Expertise Integration Button */}
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => window.location.href = '/expertise'}
                className="bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 text-sm font-semibold shadow-lg transform hover:scale-105"
              >
                <span className="text-lg">🧠</span>
                استشارة مع خبير زراعي
              </button>
              
              <div className="text-xs text-green-100 max-w-[200px] text-center">
                احصل على استشارة مهنية مع التحليل التفاعلي
              </div>
            </div>
          </div>
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

          {/* Enhanced Features Guide Panel */}
          <div className="p-6 bg-gray-50">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              🌱 دليل استخدام الخريطة التفاعلية
            </h2>
            
            {/* Main Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-5 rounded-lg shadow-md border-r-4 border-green-500"
              >
                <div className="text-2xl mb-3">🌍</div>
                <h3 className="font-semibold text-gray-800 mb-2">عرض الخريطة</h3>
                <p className="text-sm text-gray-600 mb-3">تبديل بين الخريطة العادية والقمر الصناعي</p>
                <div className="text-xs bg-green-50 p-2 rounded">
                  <strong>💡 نصيحة:</strong> استخدم الخريطة الساتلية لرؤية حالة المحاصيل الفعلية
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-5 rounded-lg shadow-md border-r-4 border-blue-500"
              >
                <div className="text-2xl mb-3">📍</div>
                <h3 className="font-semibold text-gray-800 mb-2">مواقع المزارع</h3>
                <p className="text-sm text-gray-600 mb-3">انقر على العلامات لعرض تفاصيل شاملة</p>
                <div className="text-xs bg-blue-50 p-2 rounded">
                  <strong>📊 البيانات:</strong> نوع المحصول، تاريخ الزراعة، المساحة، المالك
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-5 rounded-lg shadow-md border-r-4 border-yellow-500"
              >
                <div className="text-2xl mb-3">🌾</div>
                <h3 className="font-semibold text-gray-800 mb-2">تحليل المحاصيل</h3>
                <p className="text-sm text-gray-600 mb-3">معلومات مفصلة عن صحة وإنتاجية المحاصيل</p>
                <div className="text-xs bg-yellow-50 p-2 rounded">
                  <strong>🎯 الهدف:</strong> تحسين الإنتاجية وتقليل التكاليف
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-5 rounded-lg shadow-md border-r-4 border-purple-500"
              >
                <div className="text-2xl mb-3">🌱</div>
                <h3 className="font-semibold text-gray-800 mb-2">بيانات التربة</h3>
                <p className="text-sm text-gray-600 mb-3">كثافة الكربون العضوي ومؤشرات الخصوبة</p>
                <div className="text-xs bg-purple-50 p-2 rounded">
                  <strong>📈 التقييم:</strong> من ضعيف جداً إلى ممتاز (حسب g/kg)
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-5 rounded-lg shadow-md border-r-4 border-cyan-500"
              >
                <div className="text-2xl mb-3">�️</div>
                <h3 className="font-semibold text-gray-800 mb-2">معلومات الطقس</h3>
                <p className="text-sm text-gray-600 mb-3">بيانات حية مع نصائح زراعية</p>
                <div className="text-xs bg-cyan-50 p-2 rounded">
                  <strong>⏰ التحديث:</strong> كل 10 دقائق من OpenWeatherMap
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-5 rounded-lg shadow-md border-r-4 border-red-500"
              >
                <div className="text-2xl mb-3">📏</div>
                <h3 className="font-semibold text-gray-800 mb-2">أدوات القياس</h3>
                <p className="text-sm text-gray-600 mb-3">قياس المسافات ونسخ الإحداثيات</p>
                <div className="text-xs bg-red-50 p-2 rounded">
                  <strong>⚡ سريع:</strong> انقر مرتين لقياس المسافة بدقة
                </div>
              </motion.div>
            </div>

            {/* Quick Start Guide */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4 text-center">🚀 دليل البداية السريعة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <span className="bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">1</span>
                    استكشف الطبقات
                  </h4>
                  <p className="text-white/90 mb-3">استخدم قائمة الطبقات (أعلى يمين الخريطة) لتفعيل بيانات التربة والطقس</p>
                  
                  <h4 className="font-semibold mb-2 flex items-center">
                    <span className="bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">2</span>
                    تفاعل مع الخريطة
                  </h4>
                  <p className="text-white/90">انقر في أي مكان للحصول على تحليل شامل للموقع والتربة</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <span className="bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">3</span>
                    اكتشف المزارع
                  </h4>
                  <p className="text-white/90 mb-3">انقر على أيقونات المزارع 🌾 لرؤية معلومات مفصلة</p>
                  
                  <h4 className="font-semibold mb-2 flex items-center">
                    <span className="bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">4</span>
                    استخدم الأدوات
                  </h4>
                  <p className="text-white/90">استفد من أدوات القياس ونسخ الإحداثيات وتحليل المسافات</p>
                </div>
              </div>
            </div>

            {/* Pro Tips */}
            <div className="mt-6 bg-white border border-orange-200 rounded-lg p-4">
              <h3 className="text-lg font-bold text-orange-600 mb-3 flex items-center">
                <span className="text-xl mr-2">💡</span>
                نصائح المحترفين
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start">
                  <span className="text-orange-500 mr-2">🎯</span>
                  <span><strong>لأفضل نتائج:</strong> استخدم طبقة الساتل مع بيانات التربة معاً</span>
                </div>
                <div className="flex items-start">
                  <span className="text-orange-500 mr-2">⚡</span>
                  <span><strong>للسرعة:</strong> اطلع على الطقس قبل التخطيط للأنشطة الزراعية</span>
                </div>
                <div className="flex items-start">
                  <span className="text-orange-500 mr-2">🔍</span>
                  <span><strong>للدقة:</strong> استخدم أداة القياس لحساب مساحات الحقول</span>
                </div>
                <div className="flex items-start">
                  <span className="text-orange-500 mr-2">📱</span>
                  <span><strong>للمشاركة:</strong> انسخ الإحداثيات لمشاركة المواقع مع الآخرين</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Weather Information Panel with Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6">
              🌤️ دليل معلومات الطقس الحالية - الجزائر
            </h2>
            
            {isWeatherLoading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
                <p>جاري تحميل بيانات الطقس...</p>
              </div>
            ) : (
              <>
                {/* Current Weather Data */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

                {/* Weather Guide */}
                <div className="bg-white/10 backdrop-blur-sm p-5 rounded-lg">
                  <h3 className="text-lg font-bold mb-4 text-center">📊 دليل قراءة بيانات الطقس للمزارعين</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <div className="font-semibold mb-3 flex items-center">
                        <span className="text-lg mr-2">🌡️</span>
                        درجة الحرارة المثلى للمحاصيل:
                      </div>
                      <div className="space-y-2 bg-white/5 p-3 rounded">
                        <div className="flex justify-between">
                          <span>• القمح:</span>
                          <span className="font-semibold">15-20°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span>• الطماطم:</span>
                          <span className="font-semibold">20-25°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span>• الزيتون:</span>
                          <span className="font-semibold">15-30°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span>• النخيل:</span>
                          <span className="font-semibold">25-35°C</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-semibold mb-3 flex items-center">
                        <span className="text-lg mr-2">💧</span>
                        مؤشر الرطوبة والري:
                      </div>
                      <div className="space-y-2 bg-white/5 p-3 rounded">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                          <span>أقل من 30%: ري مكثف مطلوب</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                          <span>30-60%: ري معتدل</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                          <span>60-80%: ري خفيف</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                          <span>أكثر من 80%: تهوية مطلوبة</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-semibold mb-3 flex items-center">
                        <span className="text-lg mr-2">💨</span>
                        تأثير الرياح على الزراعة:
                      </div>
                      <div className="space-y-2 bg-white/5 p-3 rounded">
                        <div>• <strong>أقل من 2 م/ث:</strong> مثالي للزراعة</div>
                        <div>• <strong>2-5 م/ث:</strong> جيد للتلقيح الطبيعي</div>
                        <div>• <strong>5-10 م/ث:</strong> قد يؤثر على النباتات الصغيرة</div>
                        <div>• <strong>أكثر من 10 م/ث:</strong> ضار، حماية المحاصيل</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-semibold mb-3 flex items-center">
                        <span className="text-lg mr-2">🌦️</span>
                        نصائح حسب حالة الطقس:
                      </div>
                      <div className="space-y-2 bg-white/5 p-3 rounded">
                        <div>• <strong>مشمس:</strong> وقت مثالي للحصاد والتجفيف</div>
                        <div>• <strong>غائم:</strong> جيد للزراعة والري</div>
                        <div>• <strong>ماطر:</strong> تجنب الرش والتسميد</div>
                        <div>• <strong>عاصف:</strong> حماية النباتات الحساسة</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Weather Actions */}
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="text-center text-xs opacity-80">
                      📡 البيانات محدثة كل 10 دقائق من OpenWeatherMap • آخر تحديث: {new Date().toLocaleTimeString('ar-DZ')}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Map Tools Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6">
              📏 دليل أدوات القياس والتفاعل
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-lg">
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <span className="text-2xl mr-3">🖱️</span>
                  التحكم بالخريطة
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                    <span><strong>النقر:</strong> تحليل الموقع والتربة</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                    <span><strong>السحب:</strong> تحريك الخريطة</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                    <span><strong>العجلة:</strong> تكبير وتصغير</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                    <span><strong>النقر على 🌾:</strong> معلومات المزرعة</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-lg">
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <span className="text-2xl mr-3">🔧</span>
                  أدوات متقدمة
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    <span><strong>قياس المسافة:</strong> زر "📏 قياس" ثم نقرتان</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    <span><strong>مسح القياسات:</strong> زر "🗑️ مسح"</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    <span><strong>نسخ الإحداثيات:</strong> من نافذة الموقع</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    <span><strong>طبقات البيانات:</strong> قائمة أعلى اليمين</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-lg">
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <span className="text-2xl mr-3">🌍</span>
                  طبقات الخريطة
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    <span><strong>🗺️ عادية:</strong> الخريطة التقليدية</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    <span><strong>🛰️ ساتل:</strong> صور جوية حقيقية</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    <span><strong>🌱 تربة:</strong> بيانات الخصوبة</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    <span><strong>🌤️ طقس:</strong> بيانات جوية مباشرة</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-lg">
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <span className="text-2xl mr-3">💡</span>
                  نصائح سريعة
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                    <span>فعّل عدة طبقات معاً للمقارنة</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                    <span>استخدم الساتل لرؤية حالة المحاصيل</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                    <span>احفظ الإحداثيات المهمة</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                    <span>راقب الطقس قبل العمل الزراعي</span>
                  </li>
                </ul>
              </div>
            </div>
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