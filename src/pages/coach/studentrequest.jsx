import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { MapPin, Calendar, CheckCircle2, XCircle, Filter } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function StudentRequests() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'Alex Martinez',
      sport: 'Tennis',
      location: 'Los Angeles, CA',
      date: '2025-10-20',
      level: 'Intermediate',
      message: 'Looking to improve my serve and backhand technique',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Emily Chen',
      sport: 'Badminton',
      location: 'Santa Monica, CA',
      date: '2025-10-21',
      level: 'Beginner',
      message: 'New to badminton, seeking fundamentals training',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Marcus Thompson',
      sport: 'Tennis',
      location: 'Pasadena, CA',
      date: '2025-10-22',
      level: 'Advanced',
      message: 'Preparing for upcoming regional tournament',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
    },
    {
      id: 4,
      name: 'Sophie Williams',
      sport: 'Tennis',
      location: 'Long Beach, CA',
      date: '2025-10-18',
      level: 'Intermediate',
      message: 'Want to work on tournament strategies',
      status: 'accepted',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'
    },
    {
      id: 5,
      name: 'Ryan Park',
      sport: 'Badminton',
      location: 'Los Angeles, CA',
      date: '2025-10-19',
      level: 'Intermediate',
      message: 'Need help with smash and footwork',
      status: 'accepted',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop'
    }
  ]);

  const [filterSport, setFilterSport] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const handleAccept = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'accepted' } : req
    ));
    toast.success('Request accepted successfully!');
  };

  const handleReject = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'rejected' } : req
    ));
    toast.error('Request rejected');
  };

  const filteredRequests = requests
    .filter(req => filterSport === 'all' || req.sport === filterSport)
    .filter(req => filterStatus === 'all' || req.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'sport') return a.sport.localeCompare(b.sport);
      if (sortBy === 'location') return a.location.localeCompare(b.location);
      return 0;
    });

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const acceptedCount = requests.filter(r => r.status === 'accepted').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-slate-900 mb-2">Student Requests</h1>
        <p className="text-slate-600">Review and manage athlete training requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-amber-50 border-amber-200">
          <p className="text-amber-600 text-sm mb-1">Pending Requests</p>
          <p className="text-amber-900">{pendingCount}</p>
        </Card>
        <Card className="p-4 bg-emerald-50 border-emerald-200">
          <p className="text-emerald-600 text-sm mb-1">Accepted</p>
          <p className="text-emerald-900">{acceptedCount}</p>
        </Card>
        <Card className="p-4 bg-slate-50 border-slate-200">
          <p className="text-slate-600 text-sm mb-1">Total Requests</p>
          <p className="text-slate-900">{requests.length}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-slate-600" />
          <span className="text-slate-900">Filters</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Sport</label>
            <Select value={filterSport} onValueChange={setFilterSport}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sports</SelectItem>
                <SelectItem value="Tennis">Tennis</SelectItem>
                <SelectItem value="Badminton">Badminton</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Status</label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="sport">Sport</SelectItem>
                <SelectItem value="location">Location</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Requests List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredRequests.map((request) => (
          <Card 
            key={request.id} 
            className={`p-6 hover:shadow-lg transition-all ${
              request.status === 'accepted' ? 'bg-emerald-50 border-emerald-200' :
              request.status === 'rejected' ? 'bg-slate-50 border-slate-200' : ''
            }`}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <Avatar className="w-16 h-16 flex-shrink-0">
                <AvatarImage src={request.image} />
                <AvatarFallback>{request.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-slate-900 mb-1">{request.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-100 text-blue-700 border-0">
                        {request.sport}
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-700 border-0">
                        {request.level}
                      </Badge>
                      {request.status === 'accepted' && (
                        <Badge className="bg-emerald-500 text-white border-0">
                          Accepted
                        </Badge>
                      )}
                      {request.status === 'rejected' && (
                        <Badge className="bg-slate-500 text-white border-0">
                          Rejected
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-600 mb-3">{request.message}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{request.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(request.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
                
                {request.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleAccept(request.id)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Accept
                    </Button>
                    <Button 
                      onClick={() => handleReject(request.id)}
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-slate-400">No requests found matching your filters</p>
        </Card>
      )}
    </div>
  );
}
