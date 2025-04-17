
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from 'lucide-react';
import { EmergencyRequest } from '@/services/mockData';

interface MapViewProps {
  emergencies?: EmergencyRequest[];
  centerLocation?: { latitude: number; longitude: number };
  showRoute?: boolean;
  height?: string;
  interactive?: boolean;
}

const MapView: React.FC<MapViewProps> = ({ 
  emergencies = [],
  centerLocation,
  showRoute = false,
  height = "400px",
  interactive = true
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  
  useEffect(() => {
    const loadMap = () => {
      // This is a placeholder for actual map integration
      // In a real implementation, we would initialize a map library here
      setTimeout(() => {
        setIsMapLoaded(true);
      }, 1000);
    };
    
    loadMap();
  }, []);
  
  // Mock map rendering - in production, we would use a real map library
  return (
    <div className="relative w-full rounded-lg overflow-hidden" style={{ height }}>
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader className="animate-spin h-8 w-8 text-emergency-blue" />
          <span className="ml-2 text-gray-600">Loading map...</span>
        </div>
      )}
      
      <div 
        ref={mapContainer} 
        className={`bg-[#e5e3df] w-full h-full ${isMapLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
      >
        {isMapLoaded && (
          <div className="absolute inset-0">
            {/* This is a simplified map visualization for demo purposes */}
            <div className="w-full h-full relative">
              {/* Mock map grid lines */}
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-12">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={`col-${i}`} className="border-r border-gray-300 h-full" />
                ))}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={`row-${i}`} className="border-b border-gray-300 w-full" />
                ))}
              </div>

              {/* Mock roads */}
              <div className="absolute left-0 right-0 top-1/2 h-4 bg-gray-300 transform -translate-y-1/2"></div>
              <div className="absolute top-0 bottom-0 left-1/2 w-4 bg-gray-300 transform -translate-x-1/2"></div>
              <div className="absolute left-1/4 right-0 top-1/3 h-4 bg-gray-300 transform -translate-y-1/2"></div>
              <div className="absolute top-2/3 bottom-0 left-3/4 w-4 bg-gray-300 transform -translate-x-1/2"></div>

              {/* Emergency markers */}
              {emergencies.map((emergency) => (
                <div 
                  key={emergency.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{ 
                    left: `${(emergency.location.longitude - 77.5) * 200}%`, 
                    top: `${(emergency.location.latitude - 12.9) * 200}%` 
                  }}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${emergency.isPriority ? 'animate-pulse-beacon' : ''}`}>
                    <div className={`w-4 h-4 rounded-full text-xs flex items-center justify-center text-white font-bold`} style={{ backgroundColor: emergency.emergencyType === 'medical' ? '#e53e3e' : 
                      emergency.emergencyType === 'fire' ? '#ecc94b' : 
                      emergency.emergencyType === 'police' ? '#3182ce' : '#48bb78' }}>
                      {emergency.emergencyType === 'medical' ? '🚑' : 
                       emergency.emergencyType === 'fire' ? '🚒' : 
                       emergency.emergencyType === 'police' ? '🚓' : '🚧'}
                    </div>
                  </div>
                  <div className="mt-1 bg-white px-2 py-1 rounded text-xs font-medium shadow-md">
                    {emergency.vehicleNumber}
                  </div>
                </div>
              ))}

              {/* User's current location */}
              {centerLocation && (
                <div 
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ 
                    left: `${(centerLocation.longitude - 77.5) * 200}%`, 
                    top: `${(centerLocation.latitude - 12.9) * 200}%` 
                  }}
                >
                  <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow-lg pulse-animation"></div>
                </div>
              )}

              {/* Mock route line for emergency vehicles */}
              {showRoute && (
                <svg className="absolute inset-0 z-0" width="100%" height="100%">
                  <path 
                    d="M 20% 50% L 30% 40% L 45% 35% L 60% 30% L 75% 35%" 
                    stroke="#e53e3e" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeDasharray="5,5" 
                    fill="none" 
                  />
                </svg>
              )}

              {/* Map controls (mock) */}
              {interactive && (
                <div className="absolute right-4 top-4 flex flex-col gap-2">
                  <button className="bg-white p-2 rounded-full shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Map attribution */}
      <div className="absolute bottom-0 right-0 bg-white/80 text-xs p-1 font-mono text-gray-600">
        Map Visualization (Demo)
      </div>
    </div>
  );
};

export default MapView;
