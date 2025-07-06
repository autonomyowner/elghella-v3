import React, { useState, useRef } from 'react';

interface DiseaseResult {
  disease: string;
  confidence: number;
  description: string;
  treatment: string;
  severity: 'low' | 'medium' | 'high';
}

const DiseaseDetection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<DiseaseResult | null>(null);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
        setError('');
        
        // Create preview URL
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setError('Please select a valid image file');
      }
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock disease detection result
      // In production, this would call a real AI model API
      const mockResults: DiseaseResult[] = [
        {
          disease: 'Leaf Blight',
          confidence: 0.85,
          description: 'A fungal disease that causes brown spots on leaves and can reduce yield significantly.',
          treatment: 'Apply fungicide treatment and remove infected plant parts. Ensure proper spacing for air circulation.',
          severity: 'medium'
        },
        {
          disease: 'Powdery Mildew',
          confidence: 0.72,
          description: 'A common fungal disease that appears as white powdery spots on leaves and stems.',
          treatment: 'Apply sulfur-based fungicide and improve air circulation. Avoid overhead watering.',
          severity: 'low'
        },
        {
          disease: 'Root Rot',
          confidence: 0.68,
          description: 'A soil-borne disease that affects the root system, causing wilting and stunted growth.',
          treatment: 'Improve soil drainage and apply fungicide to soil. Remove severely affected plants.',
          severity: 'high'
        }
      ];

      // Select a random result for demo
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setAnalysisResult(randomResult);

    } catch (error) {
      setError('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setPreviewUrl('');
    setAnalysisResult(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">🐛 Disease & Pest Detection</h2>
      <p className="text-gray-600 mb-6">
        Upload a photo of your plant to detect diseases and get treatment recommendations.
      </p>

      {/* Image Upload Section */}
      <div className="mb-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          
          {!previewUrl ? (
            <div>
              <div className="text-4xl mb-4">📸</div>
              <p className="text-gray-600 mb-2">Click to upload a plant photo</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Choose Image
              </button>
            </div>
          ) : (
            <div>
              <img
                src={previewUrl}
                alt="Plant preview"
                className="max-w-full h-64 object-contain mx-auto mb-4 rounded-lg"
              />
              <div className="flex space-x-2 justify-center">
                <button
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isAnalyzing ? 'Analyzing...' : '🔍 Analyze Image'}
                </button>
                <button
                  onClick={resetAnalysis}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Analysis Result */}
      {analysisResult && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">
            🔍 Analysis Results
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Detected Disease:</span>
              <span className="font-semibold">{analysisResult.disease}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="font-medium">Confidence:</span>
              <span className="font-semibold">{(analysisResult.confidence * 100).toFixed(1)}%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="font-medium">Severity:</span>
              <span className={`px-2 py-1 rounded-full text-sm font-medium ${getSeverityColor(analysisResult.severity)}`}>
                {analysisResult.severity.charAt(0).toUpperCase() + analysisResult.severity.slice(1)}
              </span>
            </div>
            
            <div>
              <span className="font-medium block mb-2">Description:</span>
              <p className="text-gray-700">{analysisResult.description}</p>
            </div>
            
            <div>
              <span className="font-medium block mb-2">Recommended Treatment:</span>
              <p className="text-gray-700">{analysisResult.treatment}</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Notes:</h4>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>• This analysis is for educational purposes only</li>
              <li>• Consult with a local agronomist for professional diagnosis</li>
              <li>• Follow local regulations for pesticide use</li>
              <li>• Consider integrated pest management (IPM) approaches</li>
            </ul>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isAnalyzing && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing your plant image...</p>
        </div>
      )}

      {/* Tips Section */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Tips for Better Detection:</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Take clear, well-lit photos of affected plant parts</li>
          <li>• Include both healthy and diseased areas for comparison</li>
          <li>• Focus on leaves, stems, and any visible symptoms</li>
          <li>• Avoid shadows and blurry images</li>
        </ul>
      </div>
    </div>
  );
};

export default DiseaseDetection; 