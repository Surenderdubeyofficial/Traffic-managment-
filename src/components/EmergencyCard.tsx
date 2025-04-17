
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmergencyRequest, getEmergencyIcon, getEmergencyTextColor, getStatusColor } from '@/services/mockData';
import { Shield, Clock, MapPin, AlertCircle, CheckCircle } from 'lucide-react';

interface EmergencyCardProps {
  emergency: EmergencyRequest;
  onPriorityToggle: (id: string, isPriority: boolean) => void;
  onViewDetails: (id: string) => void;
}

const EmergencyCard: React.FC<EmergencyCardProps> = ({ emergency, onPriorityToggle, onViewDetails }) => {
  const formattedTime = new Date(emergency.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  return (
    <Card className={`overflow-hidden transition-all duration-200 ${emergency.isPriority ? 'border-emergency-red' : ''}`}>
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">{getEmergencyIcon(emergency.emergencyType)}</span>
            <CardTitle className="text-base font-medium">
              {emergency.vehicleNumber}
            </CardTitle>
            <Badge 
              variant="secondary"
              className={`${getStatusColor(emergency.status)} text-white`}
            >
              {emergency.status.charAt(0).toUpperCase() + emergency.status.slice(1)}
            </Badge>
          </div>
          <p className={`text-sm mt-1 ${getEmergencyTextColor(emergency.emergencyType)} font-medium`}>
            {emergency.emergencyType.charAt(0).toUpperCase() + emergency.emergencyType.slice(1)} Emergency
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="text-sm space-y-1">
          <p><strong>Reported by:</strong> {emergency.reporterName}</p>
          {emergency.patientStatus && (
            <p className="flex items-center gap-1">
              <AlertCircle size={14} className="text-emergency-red" />
              <span><strong>Status:</strong> {emergency.patientStatus}</span>
            </p>
          )}
          {emergency.destinationHospital && (
            <p><strong>Destination:</strong> {emergency.destinationHospital}</p>
          )}
          <p className="flex items-center gap-1 text-gray-500 mt-2">
            <Clock size={14} />
            <span>{formattedTime}</span>
          </p>
          <p className="flex items-center gap-1 text-gray-500">
            <MapPin size={14} />
            <span>{emergency.location.address}</span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2 flex justify-between items-center">
        <Button 
          variant={emergency.isPriority ? "default" : "outline"} 
          size="sm"
          className={`${emergency.isPriority ? 'bg-emergency-red hover:bg-red-700' : 'border-emergency-red text-emergency-red hover:bg-red-50'} flex gap-1 items-center`}
          onClick={() => onPriorityToggle(emergency.id, !emergency.isPriority)}
        >
          {emergency.isPriority ? (
            <>
              <Shield size={14} />
              Priority Set
            </>
          ) : (
            <>
              <Shield size={14} />
              Set Priority
            </>
          )}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onViewDetails(emergency.id)}
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmergencyCard;
