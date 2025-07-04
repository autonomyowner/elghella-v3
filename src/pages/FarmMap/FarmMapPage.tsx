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

        // 🌱 SOIL DATA LAYERS - Multiple working sources
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

        // Custom farm icon
        const farmIcon = window.L.divIcon({
          html: '<div style="background: #4CAF50; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.3); border: 3px solid white;">🌾</div>',
          iconSize: [40, 40],
          className: 'custom-farm-icon'
        });

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

        // Add measurement tool
        const MeasurementControl = window.L.Control.extend({
          onAdd: function(map: any) {
            const div = window.L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
            
            div.style.cssText = `
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.2);
              padding: 5px;
            `;
            
            div.innerHTML = `
              <div style="display: flex; flex-direction: column; gap: 2px;">
                <button id="measure-distance" style="
                  background: #4CAF50; 
                  color: white; 
                  border: none; 
                  padding: 8px 12px; 
                  border-radius: 4px; 
                  cursor: pointer; 
                  font-size: 11px;
                  font-weight: bold;
                " title="قياس المسافة">📏 قياس</button>
                <button id="clear-measurements" style="
                  background: #f44336; 
                  color: white; 
                  border: none; 
                  padding: 8px 12px; 
                  border-radius: 4px; 
                  cursor: pointer; 
                  font-size: 11px;
                  font-weight: bold;
                " title="مسح القياسات">🗑️ مسح</button>
              </div>
            `;
            
            let measurementLayer = window.L.layerGroup().addTo(map);
            let ismeasuring = false;
            let measurementPoints: any[] = [];
            
            div.querySelector('#measure-distance')?.addEventListener('click', function() {
              isMapping = true;
              map.getContainer().style.cursor = 'crosshair';
              
              const toast = document.createElement('div');
              toast.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: #4CAF50;
                color: white;
                padding: 10px 15px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                z-index: 1000;
                font-family: Arial, sans-serif;
                direction: rtl;
              `;
              toast.innerHTML = '📏 انقر على نقطتين لقياس المسافة';
              document.body.appendChild(toast);
              
              setTimeout(() => {
                if (toast.parentNode) {
                  toast.parentNode.removeChild(toast);
                }
              }, 3000);
            });
            
            div.querySelector('#clear-measurements')?.addEventListener('click', function() {
              measurementLayer.clearLayers();
              measurementPoints = [];
              isMapping = false;
              map.getContainer().style.cursor = '';
            });
            
            // Add measurement click handler
            let isMapping = false;
            map.on('click', function(e: any) {
              if (isMapping && measurementPoints.length < 2) {
                measurementPoints.push(e.latlng);
                
                // Add point marker
                const pointMarker = window.L.circleMarker(e.latlng, {
                  radius: 6,
                  color: '#4CAF50',
                  fillColor: '#4CAF50',
                  fillOpacity: 0.8
                }).addTo(measurementLayer);
                
                if (measurementPoints.length === 2) {
                  // Calculate distance
                  const distance = measurementPoints[0].distanceTo(measurementPoints[1]);
                  const distanceKm = (distance / 1000).toFixed(2);
                  const distanceM = distance.toFixed(0);
                  
                  // Draw line
                  const line = window.L.polyline(measurementPoints, {
                    color: '#4CAF50',
                    weight: 3,
                    opacity: 0.8
                  }).addTo(measurementLayer);
                  
                  // Add distance label
                  const midpoint = window.L.latLng(
                    (measurementPoints[0].lat + measurementPoints[1].lat) / 2,
                    (measurementPoints[0].lng + measurementPoints[1].lng) / 2
                  );
                  
                  const label = window.L.marker(midpoint, {
                    icon: window.L.divIcon({
                      html: `
                        <div style="
                          background: white; 
                          padding: 4px 8px; 
                          border-radius: 4px; 
                          border: 2px solid #4CAF50; 
                          font-size: 12px; 
                          font-weight: bold; 
                          color: #4CAF50;
                          text-align: center;
                          min-width: 60px;
                        ">
                          ${distanceKm} كم<br>
                          ${distanceM} م
                        </div>
                      `,
                      className: 'distance-label',
                      iconSize: [60, 30]
                    })
                  }).addTo(measurementLayer);
                  
                  // Reset measurement mode
                  measurementPoints = [];
                  isMapping = false;
                  map.getContainer().style.cursor = '';
                  
                  // Show completion message
                  const successToast = document.createElement('div');
                  successToast.style.cssText = `
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: #2196F3;
                    color: white;
                    padding: 10px 15px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                    z-index: 1000;
                    font-family: Arial, sans-serif;
                    direction: rtl;
                  `;
                  successToast.innerHTML = `✅ المسافة: ${distanceKm} كم (${distanceM} متر)`;
                  document.body.appendChild(successToast);
                  
                  setTimeout(() => {
                    if (successToast.parentNode) {
                      successToast.parentNode.removeChild(successToast);
                    }
                  }, 4000);
                }
              }
            });
            
            return div;
          },
          
          onRemove: function(map: any) {
            // Cleanup if needed
          }
        });

        new MeasurementControl({ position: 'topleft' }).addTo(map);

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