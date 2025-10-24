import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Calendar as CalendarIcon, MapPin, Users, Trophy, Plus, Bell, MessageSquare } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function Tournaments() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] = useState(false);

  const [tournaments, setTournaments] = useState([
    {
      id: 1,
      title: 'Regional Tennis Championship',
      date: '2025-11-15',
      location: 'Los Angeles Sports Complex',
      sport: 'Tennis',
      level: 'Advanced',
      description: 'Annual regional championship for advanced players. Singles and doubles categories.',
      registeredAthletes: 12,
      status: 'upcoming',
      athletes: [
        { name: 'Alex Martinez', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
        { name: 'Marcus Thompson', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
      ]
    },
    {
      id: 2,
      title: 'Badminton Open Tournament',
      date: '2025-11-08',
      location: 'Metro Indoor Arena',
      sport: 'Badminton',
      level: 'All Levels',
      description: 'Open tournament for all skill levels. Great opportunity for beginners.',
      registeredAthletes: 8,
      status: 'upcoming',
      athletes: [
        { name: 'Emily Chen', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
        { name: 'Ryan Park', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop' },
      ]
    },
    {
      id: 3,
      title: 'Summer Tennis League',
      date: '2025-12-01',
      location: 'Coastal Tennis Center',
      sport: 'Tennis',
      level: 'Intermediate',
      description: 'Weekly league matches starting December. Team format.',
      registeredAthletes: 16,
      status: 'upcoming',
      athletes: []
    },
  ]);

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Training Schedule Update',
      message: 'Next week\'s training sessions will start 30 minutes earlier due to facility maintenance.',
      date: '2025-10-24',
      type: 'global',
      author: 'Sarah Johnson'
    },
    {
      id: 2,
      title: 'Tournament Registration Deadline',
      message: 'Don\'t forget to register for the Regional Championship by November 1st!',
      date: '2025-10-23',
      type: 'tournament',
      author: 'Sarah Johnson'
    },
    {
      id: 3,
      title: 'New Equipment Available',
      message: 'Professional-grade rackets are now available for rent at the facility.',
      date: '2025-10-22',
      type: 'global',
      author: 'Sarah Johnson'
    },
  ]);

  const [newTournament, setNewTournament] = useState({
    title: '',
    date: '',
    location: '',
    sport: 'Tennis',
    level: 'All Levels',
    description: ''
  });

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    message: '',
    type: 'global'
  });

  const handleCreateTournament = () => {
    const tournament = {
      id: tournaments.length + 1,
      ...newTournament,
      registeredAthletes: 0,
      status: 'upcoming',
      athletes: []
    };
    setTournaments([...tournaments, tournament]);
    setIsCreateDialogOpen(false);
    setNewTournament({ title: '', date: '', location: '', sport: 'Tennis', level: 'All Levels', description: '' });
    toast.success('Tournament created successfully!');
  };

  const handleCreateAnnouncement = () => {
    const announcement = {
      id: announcements.length + 1,
      ...newAnnouncement,
      date: new Date().toISOString().split('T')[0],
      author: 'Sarah Johnson'
    };
    setAnnouncements([announcement, ...announcements]);
    setIsAnnouncementDialogOpen(false);
    setNewAnnouncement({ title: '', message: '', type: 'global' });
    toast.success('Announcement posted successfully!');
  };

  const upcomingTournaments = tournaments.filter(t => new Date(t.date) >= new Date());
  const pastTournaments = tournaments.filter(t => new Date(t.date) < new Date());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-slate-900 mb-2">Tournaments & Announcements</h1>
        <p className="text-slate-600">Manage tournaments and communicate with your athletes</p>
      </div>

      <Tabs defaultValue="tournaments" className="mb-6">
        <TabsList>
          <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="tournaments" className="space-y-6">
          <div className="flex justify-end">
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Tournament
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create New Tournament</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="tournamentTitle">Tournament Title</Label>
                    <Input
                      id="tournamentTitle"
                      value={newTournament.title}
                      onChange={(e) => setNewTournament({ ...newTournament, title: e.target.value })}
                      placeholder="e.g., Regional Tennis Championship"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tournamentDate">Date</Label>
                    <Input
                      id="tournamentDate"
                      type="date"
                      value={newTournament.date}
                      onChange={(e) => setNewTournament({ ...newTournament, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tournamentLocation">Location</Label>
                    <Input
                      id="tournamentLocation"
                      value={newTournament.location}
                      onChange={(e) => setNewTournament({ ...newTournament, location: e.target.value })}
                      placeholder="e.g., Los Angeles Sports Complex"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tournamentSport">Sport</Label>
                      <Select value={newTournament.sport} onValueChange={(value) => setNewTournament({ ...newTournament, sport: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tennis">Tennis</SelectItem>
                          <SelectItem value="Badminton">Badminton</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="tournamentLevel">Level</Label>
                      <Select value={newTournament.level} onValueChange={(value) => setNewTournament({ ...newTournament, level: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Levels">All Levels</SelectItem>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="tournamentDescription">Description</Label>
                    <Textarea
                      id="tournamentDescription"
                      value={newTournament.description}
                      onChange={(e) => setNewTournament({ ...newTournament, description: e.target.value })}
                      placeholder="Tournament details and information..."
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleCreateTournament} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                    Create Tournament
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div>
            <h2 className="text-slate-900 mb-4">Upcoming Tournaments</h2>
            <div className="grid grid-cols-1 gap-4">
              {upcomingTournaments.map((tournament) => (
                <Card key={tournament.id} className="p-6 hover:shadow-lg transition-all">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex flex-col items-center justify-center text-white">
                        <span className="text-xs">{new Date(tournament.date).toLocaleString('en-US', { month: 'short' })}</span>
                        <span className="text-2xl font-bold">{new Date(tournament.date).getDate()}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-slate-900 mb-2">{tournament.title}</h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className="bg-blue-100 text-blue-700 border-0">
                              {tournament.sport}
                            </Badge>
                            <Badge className="bg-purple-100 text-purple-700 border-0">
                              {tournament.level}
                            </Badge>
                            <Badge className="bg-amber-100 text-amber-700 border-0">
                              {tournament.registeredAthletes} registered
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 mb-3">{tournament.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{tournament.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{new Date(tournament.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>

                      {tournament.athletes.length > 0 && (
                        <div>
                          <p className="text-sm text-slate-600 mb-2">Registered Athletes:</p>
                          <div className="flex -space-x-2">
                            {tournament.athletes.slice(0, 5).map((athlete, idx) => (
                              <Avatar key={idx} className="w-8 h-8 border-2 border-white">
                                <AvatarImage src={athlete.image} />
                                <AvatarFallback>{athlete.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                            ))}
                            {tournament.registeredAthletes > 5 && (
                              <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs text-slate-600">
                                +{tournament.registeredAthletes - 5}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-6">
          <div className="flex justify-end">
            <Dialog open={isAnnouncementDialogOpen} onOpenChange={setIsAnnouncementDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  New Announcement
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create Announcement</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="announcementTitle">Title</Label>
                    <Input
                      id="announcementTitle"
                      value={newAnnouncement.title}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                      placeholder="Announcement title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="announcementType">Type</Label>
                    <Select value={newAnnouncement.type} onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="global">Global (All Athletes)</SelectItem>
                        <SelectItem value="tournament">Tournament Related</SelectItem>
                        <SelectItem value="training">Training Update</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="announcementMessage">Message</Label>
                    <Textarea
                      id="announcementMessage"
                      value={newAnnouncement.message}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
                      placeholder="Type your announcement here..."
                      rows={5}
                    />
                  </div>
                  <Button onClick={handleCreateAnnouncement} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                    Post Announcement
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="p-5 hover:shadow-md transition-all">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                      {announcement.type === 'tournament' ? (
                        <Trophy className="w-5 h-5 text-white" />
                      ) : announcement.type === 'training' ? (
                        <CalendarIcon className="w-5 h-5 text-white" />
                      ) : (
                        <Bell className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-slate-900 mb-1">{announcement.title}</h3>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            {announcement.type}
                          </Badge>
                        </div>
                      </div>
                      <span className="text-sm text-slate-500">
                        {new Date(announcement.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-2">{announcement.message}</p>
                    <p className="text-sm text-slate-400">Posted by {announcement.author}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 lg:col-span-2">
              <h3 className="text-slate-900 mb-4">Tournament Calendar</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </Card>
            <div>
              <h3 className="text-slate-900 mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                {upcomingTournaments.slice(0, 5).map((tournament) => (
                  <Card key={tournament.id} className="p-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex flex-col items-center justify-center text-white">
                          <span className="text-xs">{new Date(tournament.date).toLocaleString('en-US', { month: 'short' })}</span>
                          <span className="text-lg font-bold">{new Date(tournament.date).getDate()}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-slate-900 text-sm mb-1">{tournament.title}</h4>
                        <p className="text-slate-500 text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {tournament.location}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
