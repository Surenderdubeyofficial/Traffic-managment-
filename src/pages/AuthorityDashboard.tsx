
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import MapView from '@/components/MapView';
import EmergencyList from '@/components/EmergencyList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmergencyRequest, EmergencyStatus, mockEmergencies, getEmergencyIcon, getStatusColor } from '@/services/mockData';
import { AlertCircle, CheckCircle, Clock, MapPin, User, Car, Shield, FileText } from 'lucide-react';

const AuthorityDashboard = () => {
  const { toast } = useToast();
  const [emergencies, setEmergencies] = useState<EmergencyRequest[]>(mockEmergencies);
  const [selectedEmergency, setSelectedEmergency] = useState<EmergencyRequest | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  
  // Dashboard statistics
  const totalEmergencies = emergencies.length;
  const pendingEmergencies = emergencies.filter(e => e.status === 'pending').length;
  const priorityEmergencies = emergencies.filter(e => e.isPriority).length;
  
  const handlePriorityToggle = (id: string, isPriority: boolean) => {
    const updatedEmergencies = emergencies.map(emergency => {
      if (emergency.id === id) {
        return {
          ...emergency,
          isPriority,
          status: isPriority && emergency.status === 'pending' ? 'approved' as EmergencyStatus : emergency.status
        };
      }
      return emergency;
    });
    
    setEmergencies(updatedEmergencies);
    
    toast({
      title: isPriority ? "Priority Status Set" : "Priority Status Removed",
      description: `Emergency request ${id} has been ${isPriority ? 'marked as priority' : 'removed from priority queue'}.`,
    });
  };
  
  const handleViewDetails = (id: string) => {
    const emergency = emergencies.find(e => e.id === id);
    if (emergency) {
      setSelectedEmergency(emergency);
      setIsDetailsDialogOpen(true);
    }
  };
  
  const handleStatusChange = (status: EmergencyStatus) => {
    if (!selectedEmergency) return;
    
    const updatedEmergencies = emergencies.map(emergency => {
      if (emergency.id === selectedEmergency.id) {
        return { ...emergency, status };
      }
      return emergency;
    });
    
    setEmergencies(updatedEmergencies);
    setSelectedEmergency({ ...selectedEmergency, status });
    
    toast({
      title: "Status Updated",
      description: `Emergency request status changed to ${status}.`,
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Header />
      
      <div className="pt-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Traffic Authority Dashboard</h1>
          <p className="text-gray-600">Manage and respond to emergency traffic requests</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Requests</p>
                <p className="text-2xl font-bold">{totalEmergencies}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 mb-1">Pending Approval</p>
                <p className="text-2xl font-bold">{pendingEmergencies}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 mb-1">Priority Status</p>
                <p className="text-2xl font-bold">{priorityEmergencies}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <Shield className="h-6 w-6 text-emergency-red" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="map" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Requests Map</CardTitle>
                <CardDescription>Live view of all emergency vehicles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px]">
                  <MapView 
                    emergencies={emergencies}
                    height="100%"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="list" className="mt-6">
            <EmergencyList 
              emergencies={emergencies}
              onPriorityToggle={handlePriorityToggle}
              onViewDetails={handleViewDetails}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Emergency Details Dialog */}
      {selectedEmergency && (
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span className="text-xl">{getEmergencyIcon(selectedEmergency.emergencyType)}</span>
                Emergency Request {selectedEmergency.id}
              </DialogTitle>
              <DialogDescription>
                Reported at {selectedEmergency.timestamp.toLocaleString()}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Status</h3>
                  <Select 
                    value={selectedEmergency.status} 
                    onValueChange={(value) => handleStatusChange(value as EmergencyStatus)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue>
                        <Badge className={`${getStatusColor(selectedEmergency.status)} text-white`}>
                          {selectedEmergency.status.charAt(0).toUpperCase() + selectedEmergency.status.slice(1)}
                        </Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">Reported by:</span>
                    <span className="font-medium">{selectedEmergency.reporterName}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">Vehicle Number:</span>
                    <span className="font-medium">{selectedEmergency.vehicleNumber}</span>
                  </div>
                  
                  {selectedEmergency.patientStatus && (
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-emergency-red" />
                      <span className="text-gray-500">Patient Status:</span>
                      <span className="font-medium">{selectedEmergency.patientStatus}</span>
                    </div>
                  )}
                  
                  {selectedEmergency.destinationHospital && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-500">Destination:</span>
                      <span className="font-medium">{selectedEmergency.destinationHospital}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">Description</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                    {selectedEmergency.description}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Priority Status</h3>
                  <Button 
                    variant={selectedEmergency.isPriority ? "default" : "outline"} 
                    className={`${selectedEmergency.isPriority ? 'bg-emergency-red hover:bg-red-700' : 'border-emergency-red text-emergency-red hover:bg-red-50'} w-full`}
                    onClick={() => handlePriorityToggle(selectedEmergency.id, !selectedEmergency.isPriority)}
                  >
                    {selectedEmergency.isPriority ? (
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span>Priority Status Active</span>
                        <CheckCircle className="h-4 w-4 ml-auto" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span>Grant Priority Status</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Location</h3>
                <MapView 
                  emergencies={[selectedEmergency]}
                  centerLocation={selectedEmergency.location}
                  showRoute={selectedEmergency.isPriority}
                  height="300px"
                />
                
                <div className="mt-4 bg-gray-50 p-3 rounded-md">
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-gray-700">{selectedEmergency.location.address}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    Coordinates: {selectedEmergency.location.latitude.toFixed(4)}, {selectedEmergency.location.longitude.toFixed(4)}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AuthorityDashboard;
