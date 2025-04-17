
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import EmergencyForm from '@/components/EmergencyForm';
import MapView from '@/components/MapView';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, Navigation, AlertCircle } from 'lucide-react';
import { EmergencyRequest } from '@/services/mockData';

const UserPanel = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<EmergencyRequest | null>(null);
  const [activeTab, setActiveTab] = useState('report');
  
  const handleSubmit = (formData: any) => {
    setLoading(true);
    
    // Simulate API call to submit emergency request
    setTimeout(() => {
      const newRequest: EmergencyRequest = {
        id: `EM-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        reporterName: formData.reporterName,
        vehicleNumber: formData.vehicleNumber,
        emergencyType: formData.emergencyType,
        patientStatus: formData.patientStatus || undefined,
        destinationHospital: formData.destinationHospital || undefined,
        description: formData.description,
        timestamp: new Date(),
        status: 'pending',
        location: formData.location,
        isPriority: false
      };
      
      setSubmittedRequest(newRequest);
      setLoading(false);
      setActiveTab('status');
      
      toast({
        title: "Emergency Reported",
        description: "Your emergency request has been submitted successfully.",
      });
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Header />
      
      <div className="pt-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6">
            <TabsTrigger value="report">Report Emergency</TabsTrigger>
            <TabsTrigger value="status" disabled={!submittedRequest}>Request Status</TabsTrigger>
          </TabsList>
          
          <TabsContent value="report">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3">
                <EmergencyForm onSubmit={handleSubmit} loading={loading} />
              </div>
              
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Current Location</CardTitle>
                    <CardDescription>
                      We'll use this location to assist emergency services
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MapView 
                      centerLocation={{ latitude: 12.9716, longitude: 77.5946 }}
                      height="300px"
                    />
                  </CardContent>
                </Card>
                
                <Alert className="mt-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important Notice</AlertTitle>
                  <AlertDescription>
                    Please ensure all information is accurate. False reporting of emergencies is a punishable offense.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="status">
            {submittedRequest && (
              <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-3">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Emergency Request {submittedRequest.id}</CardTitle>
                          <CardDescription>
                            Submitted {submittedRequest.timestamp.toLocaleTimeString()}
                          </CardDescription>
                        </div>
                        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                          Pending Approval
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <div>
                            <h3 className="font-medium">Emergency Reported</h3>
                            <p className="text-sm text-gray-500">
                              Your request has been received
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <div className="rounded-full w-5 h-5 border-2 border-yellow-500 flex items-center justify-center">
                            <div className="animate-pulse w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                          </div>
                          <div>
                            <h3 className="font-medium">Awaiting Authority Approval</h3>
                            <p className="text-sm text-gray-500">
                              Traffic authorities are reviewing your request
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2 opacity-50">
                          <div className="rounded-full w-5 h-5 border-2 border-gray-300 flex items-center justify-center">
                          </div>
                          <div>
                            <h3 className="font-medium">Priority Status Assignment</h3>
                            <p className="text-sm text-gray-500">
                              Priority status will be assigned based on emergency level
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2 opacity-50">
                          <div className="rounded-full w-5 h-5 border-2 border-gray-300 flex items-center justify-center">
                          </div>
                          <div>
                            <h3 className="font-medium">Route Optimization</h3>
                            <p className="text-sm text-gray-500">
                              Optimal route will be provided considering traffic conditions
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Emergency Details</h3>
                        <ul className="space-y-1 text-sm">
                          <li><strong>Vehicle:</strong> {submittedRequest.vehicleNumber}</li>
                          <li><strong>Type:</strong> {submittedRequest.emergencyType}</li>
                          <li><strong>Reporter:</strong> {submittedRequest.reporterName}</li>
                          {submittedRequest.patientStatus && (
                            <li><strong>Patient Status:</strong> {submittedRequest.patientStatus}</li>
                          )}
                          {submittedRequest.destinationHospital && (
                            <li><strong>Destination:</strong> {submittedRequest.destinationHospital}</li>
                          )}
                          <li><strong>Description:</strong> {submittedRequest.description}</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Route Status</CardTitle>
                      <CardDescription>
                        Optimal route will appear after approval
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <MapView 
                        centerLocation={submittedRequest.location}
                        height="300px"
                      />
                      
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Navigation className="h-4 w-4" />
                        <span>Route optimization pending authority approval</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserPanel;
