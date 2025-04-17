
export type EmergencyStatus = 'pending' | 'approved' | 'in-progress' | 'completed';

export type EmergencyType = 'medical' | 'fire' | 'police' | 'accident';

export interface EmergencyRequest {
  id: string;
  reporterName: string;
  vehicleNumber: string;
  emergencyType: EmergencyType;
  patientStatus?: string;
  destinationHospital?: string;
  description: string;
  timestamp: Date;
  status: EmergencyStatus;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  isPriority: boolean;
}

export const mockEmergencies: EmergencyRequest[] = [
  {
    id: 'EM-001',
    reporterName: 'John Doe',
    vehicleNumber: 'KA-01-1234',
    emergencyType: 'medical',
    patientStatus: 'Critical - Heart Attack',
    destinationHospital: 'City General Hospital',
    description: 'Patient experiencing severe chest pain, needs immediate medical attention',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    status: 'approved',
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
      address: 'MG Road, Bangalore'
    },
    isPriority: true
  },
  {
    id: 'EM-002',
    reporterName: 'Jane Smith',
    vehicleNumber: 'KA-02-5678',
    emergencyType: 'accident',
    patientStatus: 'Stable but urgent',
    destinationHospital: 'Apollo Hospital',
    description: 'Traffic accident victim with possible fractures',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    status: 'in-progress',
    location: {
      latitude: 12.9352,
      longitude: 77.6245,
      address: 'Koramangala, Bangalore'
    },
    isPriority: true
  },
  {
    id: 'EM-003',
    reporterName: 'Robert Johnson',
    vehicleNumber: 'KA-03-9012',
    emergencyType: 'fire',
    description: 'Building fire, fire truck needs urgent passage',
    timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
    status: 'pending',
    location: {
      latitude: 12.9762,
      longitude: 77.6033,
      address: 'Indiranagar, Bangalore'
    },
    isPriority: false
  },
  {
    id: 'EM-004',
    reporterName: 'Emily Davis',
    vehicleNumber: 'KA-04-3456',
    emergencyType: 'police',
    description: 'Responding to security threat',
    timestamp: new Date(Date.now() - 1000 * 60 * 8), // 8 minutes ago
    status: 'in-progress',
    location: {
      latitude: 12.9982,
      longitude: 77.5529,
      address: 'Malleshwaram, Bangalore'
    },
    isPriority: true
  },
  {
    id: 'EM-005',
    reporterName: 'Michael Brown',
    vehicleNumber: 'KA-05-7890',
    emergencyType: 'medical',
    patientStatus: 'Pregnant woman in labor',
    destinationHospital: 'Fortis Hospital',
    description: 'Woman in active labor, needs immediate medical attention',
    timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    status: 'approved',
    location: {
      latitude: 12.9010,
      longitude: 77.6200,
      address: 'BTM Layout, Bangalore'
    },
    isPriority: true
  }
];

// Function to get emergency icon based on type
export const getEmergencyIcon = (type: EmergencyType): string => {
  switch (type) {
    case 'medical':
      return '🚑';
    case 'fire':
      return '🚒';
    case 'police':
      return '🚓';
    case 'accident':
      return '🚧';
    default:
      return '🚨';
  }
};

// Function to get color based on emergency type
export const getEmergencyColor = (type: EmergencyType): string => {
  switch (type) {
    case 'medical':
      return 'bg-emergency-red';
    case 'fire':
      return 'bg-emergency-yellow';
    case 'police':
      return 'bg-emergency-blue';
    case 'accident':
      return 'bg-emergency-green';
    default:
      return 'bg-gray-500';
  }
};

// Function to get text color based on emergency type
export const getEmergencyTextColor = (type: EmergencyType): string => {
  switch (type) {
    case 'medical':
      return 'text-emergency-red';
    case 'fire':
      return 'text-emergency-yellow';
    case 'police':
      return 'text-emergency-blue';
    case 'accident':
      return 'text-emergency-green';
    default:
      return 'text-gray-500';
  }
};

// Function to get badge color based on status
export const getStatusColor = (status: EmergencyStatus): string => {
  switch (status) {
    case 'pending':
      return 'bg-gray-500';
    case 'approved':
      return 'bg-blue-500';
    case 'in-progress':
      return 'bg-yellow-500';
    case 'completed':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

// Function to generate a mock route
export const generateMockRoute = () => {
  // Simulated route waypoints (would be replaced with actual API data)
  return [
    { lat: 12.9716, lng: 77.5946 }, // Start point
    { lat: 12.9752, lng: 77.5963 },
    { lat: 12.9780, lng: 77.5999 },
    { lat: 12.9799, lng: 77.6032 },
    { lat: 12.9762, lng: 77.6033 }, // End point
  ];
};
