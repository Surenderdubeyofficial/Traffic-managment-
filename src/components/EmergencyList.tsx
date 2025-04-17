
import React, { useState } from 'react';
import EmergencyCard from './EmergencyCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { EmergencyRequest, EmergencyStatus, EmergencyType } from '@/services/mockData';

interface EmergencyListProps {
  emergencies: EmergencyRequest[];
  onPriorityToggle: (id: string, isPriority: boolean) => void;
  onViewDetails: (id: string) => void;
}

const EmergencyList: React.FC<EmergencyListProps> = ({ 
  emergencies, 
  onPriorityToggle,
  onViewDetails
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<EmergencyStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<EmergencyType | 'all'>('all');
  
  const filteredEmergencies = emergencies.filter(emergency => {
    // Search term filter
    const matchesSearch = 
      emergency.reporterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emergency.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emergency.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emergency.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || emergency.status === statusFilter;
    
    // Type filter
    const matchesType = typeFilter === 'all' || emergency.emergencyType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Sort emergencies by priority first, then by timestamp
  const sortedEmergencies = [...filteredEmergencies].sort((a, b) => {
    if (a.isPriority !== b.isPriority) {
      return a.isPriority ? -1 : 1;
    }
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search emergencies..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap md:flex-nowrap">
          <div className="flex items-center gap-2 min-w-[200px]">
            <Filter size={16} className="text-gray-500" />
            <Select 
              value={statusFilter} 
              onValueChange={(value) => setStatusFilter(value as EmergencyStatus | 'all')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Select 
            value={typeFilter} 
            onValueChange={(value) => setTypeFilter(value as EmergencyType | 'all')}
          >
            <SelectTrigger className="min-w-[200px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="medical">Medical</SelectItem>
              <SelectItem value="fire">Fire</SelectItem>
              <SelectItem value="police">Police</SelectItem>
              <SelectItem value="accident">Accident</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedEmergencies.length > 0 ? (
          sortedEmergencies.map(emergency => (
            <EmergencyCard 
              key={emergency.id} 
              emergency={emergency} 
              onPriorityToggle={onPriorityToggle} 
              onViewDetails={onViewDetails}
            />
          ))
        ) : (
          <div className="col-span-full p-12 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-gray-100 p-3">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-900">No emergencies found</h3>
              <p className="text-gray-500 max-w-sm">
                No emergency requests match your current filters. Try adjusting your search or filters.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyList;
