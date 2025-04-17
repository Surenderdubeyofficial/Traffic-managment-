
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Ambulance, Upload, AlertTriangle } from 'lucide-react';
import { EmergencyType } from '@/services/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EmergencyFormProps {
  onSubmit: (formData: any) => void;
  loading?: boolean;
}

const EmergencyForm: React.FC<EmergencyFormProps> = ({ onSubmit, loading = false }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    reporterName: '',
    vehicleNumber: '',
    emergencyType: 'medical' as EmergencyType,
    patientStatus: '',
    destinationHospital: '',
    description: '',
    proofUploaded: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = () => {
    // Simulate file upload
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        proofUploaded: true,
      }));
      
      toast({
        title: "File Uploaded",
        description: "Your emergency proof has been uploaded successfully.",
      });
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if required fields are filled
    const requiredFields = ['reporterName', 'vehicleNumber', 'description'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Generate mock location data (in production, this would come from the browser's Geolocation API)
    const mockLocationData = {
      latitude: 12.9716 + (Math.random() * 0.05 - 0.025),
      longitude: 77.5946 + (Math.random() * 0.05 - 0.025),
      address: "Sample Street, City Area",
    };
    
    onSubmit({ ...formData, location: mockLocationData });
  };

  const emergencyTypeOptions = [
    { value: 'medical', label: 'Medical', icon: '🚑' },
    { value: 'fire', label: 'Fire', icon: '🚒' },
    { value: 'police', label: 'Police', icon: '🚓' },
    { value: 'accident', label: 'Accident', icon: '🚧' },
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-emergency-red" />
          Report Emergency
        </CardTitle>
        <CardDescription>
          Fill in the details below to report an emergency and request traffic assistance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Details</TabsTrigger>
            <TabsTrigger value="advanced">Additional Details</TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="reporterName">Your Name *</Label>
                <Input
                  id="reporterName"
                  name="reporterName"
                  placeholder="Enter your full name"
                  value={formData.reporterName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vehicleNumber">Vehicle Number *</Label>
                <Input
                  id="vehicleNumber"
                  name="vehicleNumber"
                  placeholder="E.g., KA-01-AB-1234"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Emergency Type *</Label>
                <RadioGroup 
                  defaultValue={formData.emergencyType}
                  onValueChange={(value) => handleSelectChange('emergencyType', value)}
                  className="grid grid-cols-2 gap-4"
                >
                  {emergencyTypeOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`emergency-${option.value}`} />
                      <Label htmlFor={`emergency-${option.value}`} className="flex items-center gap-1 cursor-pointer">
                        <span>{option.icon}</span> {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Emergency Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Briefly describe the emergency situation"
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-[100px]"
                  required
                />
              </div>
            </form>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="space-y-4 pt-4">
              {formData.emergencyType === 'medical' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="patientStatus">Patient Status</Label>
                    <Select onValueChange={(value) => handleSelectChange('patientStatus', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select patient condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical - Immediate attention needed</SelectItem>
                        <SelectItem value="serious">Serious but stable</SelectItem>
                        <SelectItem value="stable">Stable condition</SelectItem>
                        <SelectItem value="pregnant">Pregnant woman in labor</SelectItem>
                        <SelectItem value="other">Other medical condition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="destinationHospital">Destination Hospital</Label>
                    <Input
                      id="destinationHospital"
                      name="destinationHospital"
                      placeholder="Enter hospital name"
                      value={formData.destinationHospital}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label>Upload Emergency Proof/ID (Optional)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                     onClick={handleFileUpload}>
                  {formData.proofUploaded ? (
                    <div className="flex flex-col items-center gap-2 text-green-600">
                      <div className="rounded-full bg-green-100 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p>File uploaded successfully</p>
                      <p className="text-xs text-gray-500">emergency_proof.pdf</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <Upload className="h-10 w-10" />
                      <p>Click or drag and drop to upload</p>
                      <p className="text-xs">Accepted formats: PDF, JPG, PNG (max 5MB)</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Your Location</Label>
                <div className="bg-gray-100 p-3 rounded-md flex items-center justify-between">
                  <span className="text-sm text-gray-600">Using your current location</span>
                  <Button variant="outline" size="sm" className="text-xs">
                    Refresh Location
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          className="bg-emergency-red hover:bg-red-700 gap-2" 
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Processing...
            </>
          ) : (
            <>
              <Ambulance className="h-4 w-4" />
              Submit Emergency Request
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmergencyForm;
