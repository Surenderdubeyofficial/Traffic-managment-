
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import MapView from '@/components/MapView';
import { mockEmergencies } from '@/services/mockData';
import { Ambulance, ShieldAlert, Route, BellRing } from 'lucide-react';

const Index = () => {
  // Filter only priority emergencies for the map
  const priorityEmergencies = mockEmergencies.filter(e => e.isPriority);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Smart Emergency <span className="text-emergency-red">Traffic Assist</span>
            </h1>
            <p className="text-lg text-gray-600">
              Helping emergency vehicles navigate through traffic efficiently with smart routing and priority assistance.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/user-panel">
                <Button className="bg-emergency-red hover:bg-red-700 text-white gap-2">
                  <Ambulance size={18} />
                  Report Emergency
                </Button>
              </Link>
              <Link to="/authority-dashboard">
                <Button variant="outline" className="gap-2">
                  <ShieldAlert size={18} />
                  Authority Access
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <MapView 
              emergencies={priorityEmergencies.slice(0, 3)}  
              showRoute={true}
              height="400px"
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">How SETA Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-full bg-red-100 w-12 h-12 flex items-center justify-center mb-4">
                <Ambulance className="h-6 w-6 text-emergency-red" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Report Emergency</h3>
              <p className="text-gray-600">
                Quickly report emergency situations with vehicle details and urgency level. Your location is automatically tracked.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
                <ShieldAlert className="h-6 w-6 text-emergency-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Authority Approval</h3>
              <p className="text-gray-600">
                Traffic authorities review and approve emergency requests, granting priority status to urgent cases.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
                <Route className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Routing</h3>
              <p className="text-gray-600">
                Receive optimized routes that account for real-time traffic conditions and navigate efficiently to your destination.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-xl bg-gradient-to-r from-emergency-blue to-emergency-red p-8 text-white text-center">
          <div className="space-y-6">
            <BellRing className="h-12 w-12 mx-auto" />
            <h2 className="text-3xl font-bold">Every Second Counts</h2>
            <p className="text-lg max-w-lg mx-auto">
              In emergency situations, quick response can save lives. Use SETA to ensure emergency vehicles reach their destinations on time.
            </p>
            <Link to="/user-panel">
              <Button className="bg-white text-emergency-red hover:bg-gray-100 shadow-lg">
                Report an Emergency
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="p-1.5 bg-emergency-red rounded-md">
                <Ambulance className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-lg">
                SETA
              </span>
            </div>
            <div className="flex gap-8">
              <Link to="/" className="hover:text-gray-300">Home</Link>
              <Link to="/user-panel" className="hover:text-gray-300">Report Emergency</Link>
              <Link to="/authority-dashboard" className="hover:text-gray-300">Authority Access</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Smart Emergency Traffic Assist. All rights reserved.</p>
            <p className="mt-1">A demo project created for emergency response management.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
