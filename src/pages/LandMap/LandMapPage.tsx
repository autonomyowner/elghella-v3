import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandMapPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new interactive farm map
    navigate('/farm-map', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mb-4 mx-auto"></div>
        <p className="text-gray-600 text-lg">جاري إعادة التوجيه إلى الخريطة التفاعلية...</p>
      </div>
    </div>
  );
};

export default LandMapPage;