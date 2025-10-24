import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Users, Plus, MessageSquare, Calendar, TrendingUp, UtensilsCrossed, Edit } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function GroupsManagement() {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'Advanced Tennis Squad',
      sport: 'Tennis',
      members: 12,
      level: 'Advanced',
      schedule: 'Mon, Wed, Fri - 6:00 PM',
      location: 'Court A',
      image: 'https://images.unsplash.com/photo-1706536069138-0d9ee537aff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjB0cmFpbmluZyUyMGNvdXJ0fGVufDF8fHx8MTc2MTI5MTExMnww&ixlib=rb-4.1.0&q=80&w=1080',
      announcements: [
        { id: 1, text: 'Tournament preparation starts next week', date: '2025-10-23' },
        { id: 2, text: 'Bring your own water bottles', date: '2025-10-20' }
      ],
      avgPerformance: 85
    },
    {
      id: 2,
      name: 'Beginner Badminton',
      sport: 'Badminton',
      members: 8,
      level: 'Beginner',
      schedule: 'Tue, Thu - 5:00 PM',
      location: 'Indoor Arena',
      image: 'https://images.unsplash.com/photo-1722087642932-9b070e9a066e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBwbGF5ZXJ8ZW58MXx8fHwxNzYxMjkxMTEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      announcements: [
        { id: 1, text: 'Focus on footwork drills this week', date: '2025-10-22' }
      ],
      avgPerformance: 72
    },
    {
      id: 3,
      name: 'Intermediate Tennis',
      sport: 'Tennis',
      members: 10,
      level: 'Intermediate',
      schedule: 'Mon, Wed - 7:00 PM',
      location: 'Court B',
      image: 'https://images.unsplash.com/photo-1706536069138-0d9ee537aff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjB0cmFpbmluZyUyMGNvdXJ0fGVufDF8fHx8MTc2MTI5MTExMnww&ixlib=rb-4.1.0&q=80&w=1080',
      announcements: [],
      avgPerformance: 78
    },
    {
      id: 4,
      name: 'Elite Training Group',
      sport: 'Tennis',
      members: 6,
      level: 'Elite',
      schedule: 'Daily - 6:00 AM',
      location: 'Court A',
      image: 'https://images.unsplash.com/photo-1761039807688-f5b154a8827a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMHRyYWluaW5nJTIwc3BvcnRzfGVufDF8fHx8MTc2MTI5MTExMnww&ixlib=rb-4.1.0&q=80&w=1080',
      announcements: [
        { id: 1, text: 'Nutrition plan updated - check your email', date: '2025-10-24' }
      ],
      avgPerformance: 92
    }
  ]);

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    sport: 'Tennis',
    level: 'Beginner',
    schedule: '',
    location: ''
  });

  const handleCreateGroup = () => {
    const group = {
      id: groups.length + 1,
      ...newGroup,
      members: 0,
      announcements: [],
      avgPerformance: 0,
      image: 'https://images.unsplash.com/photo-1761039807688-f5b154a8827a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMHRyYWluaW5nJTIwc3BvcnRzfGVufDF8fHx8MTc2MTI5MTExMnww&ixlib=rb-4.1.0&q=80&w=1080'
    };
    setGroups([...groups, group]);
    setIsCreateDialogOpen(false);
    setNewGroup({ name: '', sport: 'Tennis', level: 'Beginner', schedule: '', location: '' });
    toast.success('Group created successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-slate-900 mb-2">Groups Management</h1>
          <p className="text-slate-600">Create and manage your training groups</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="groupName">Group Name</Label>
                <Input
                  id="groupName"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  placeholder="e.g., Advanced Tennis Squad"
                />
              </div>
              <div>
                <Label htmlFor="sport">Sport</Label>
                <Select value={newGroup.sport} onValueChange={(value) => setNewGroup({ ...newGroup, sport: value })}>
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
                <Label htmlFor="level">Level</Label>
                <Select value={newGroup.level} onValueChange={(value) => setNewGroup({ ...newGroup, level: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Elite">Elite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  value={newGroup.schedule}
                  onChange={(e) => setNewGroup({ ...newGroup, schedule: e.target.value })}
                  placeholder="e.g., Mon, Wed, Fri - 6:00 PM"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newGroup.location}
                  onChange={(e) => setNewGroup({ ...newGroup, location: e.target.value })}
                  placeholder="e.g., Court A"
                />
              </div>
              <Button onClick={handleCreateGroup} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                Create Group
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Card key={group.id} className="overflow-hidden hover:shadow-xl transition-all group cursor-pointer">
            <div className="relative h-40 overflow-hidden">
              <img 
                src={group.image} 
                alt={group.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white mb-1">{group.name}</h3>
                <div className="flex gap-2">
                  <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                    {group.sport}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                    {group.level}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users className="w-4 h-4" />
                  <span>{group.members} members</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>{group.avgPerformance}% avg</span>
                </div>
              </div>

              <div className="mb-3 pb-3 border-b border-slate-100">
                <div className="flex items-start gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{group.schedule}</span>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setSelectedGroup(group)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Manage Group
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{group.name}</DialogTitle>
                  </DialogHeader>
                  
                  <Tabs defaultValue="announcements" className="mt-4">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="announcements">Announcements</TabsTrigger>
                      <TabsTrigger value="diet">Diet Plan</TabsTrigger>
                      <TabsTrigger value="training">Training</TabsTrigger>
                      <TabsTrigger value="chat">Chat</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="announcements" className="space-y-4">
                      <div>
                        <Label htmlFor="newAnnouncement">New Announcement</Label>
                        <Textarea
                          id="newAnnouncement"
                          placeholder="Type your announcement here..."
                          rows={3}
                        />
                        <Button className="mt-2 bg-emerald-500 hover:bg-emerald-600 text-white">
                          Post Announcement
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-slate-900">Recent Announcements</h4>
                        {group.announcements.length === 0 ? (
                          <p className="text-slate-400 text-sm">No announcements yet</p>
                        ) : (
                          group.announcements.map((announcement) => (
                            <Card key={announcement.id} className="p-3">
                              <p className="text-slate-900 text-sm mb-1">{announcement.text}</p>
                              <p className="text-slate-400 text-xs">
                                {new Date(announcement.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </p>
                            </Card>
                          ))
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="diet" className="space-y-4">
                      <div>
                        <Label htmlFor="dietPlan">Diet Plan</Label>
                        <Textarea
                          id="dietPlan"
                          placeholder="Enter diet plan details..."
                          rows={8}
                          defaultValue="Breakfast: High protein smoothie, oatmeal&#10;Lunch: Grilled chicken, brown rice, vegetables&#10;Snack: Fruits and nuts&#10;Dinner: Fish, quinoa, salad"
                        />
                        <Button className="mt-2 bg-emerald-500 hover:bg-emerald-600 text-white">
                          <UtensilsCrossed className="w-4 h-4 mr-2" />
                          Save Diet Plan
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="training" className="space-y-4">
                      <div>
                        <Label htmlFor="trainingSchedule">Training Schedule</Label>
                        <Textarea
                          id="trainingSchedule"
                          placeholder="Enter training schedule..."
                          rows={8}
                          defaultValue="Monday: Serve practice (1hr), Match play (1hr)&#10;Wednesday: Footwork drills (45min), Backhand practice (1hr)&#10;Friday: Fitness training (30min), Tournament prep (1.5hr)"
                        />
                        <Button className="mt-2 bg-emerald-500 hover:bg-emerald-600 text-white">
                          <Calendar className="w-4 h-4 mr-2" />
                          Save Schedule
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="chat" className="space-y-4">
                      <div className="border rounded-lg p-4 h-64 overflow-y-auto bg-slate-50">
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>AM</AvatarFallback>
                            </Avatar>
                            <div className="bg-white rounded-lg p-2 flex-1">
                              <p className="text-sm">Coach, what time is tomorrow's practice?</p>
                              <p className="text-xs text-slate-400 mt-1">10:30 AM</p>
                            </div>
                          </div>
                          <div className="flex gap-2 justify-end">
                            <div className="bg-emerald-500 text-white rounded-lg p-2 max-w-xs">
                              <p className="text-sm">6:00 PM at Court A. Don't be late!</p>
                              <p className="text-xs text-emerald-100 mt-1">10:32 AM</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Input placeholder="Type a message..." />
                        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        ))}
      </div>

      {groups.length === 0 && (
        <Card className="p-12 text-center">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-400 mb-4">No groups created yet</p>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Group
          </Button>
        </Card>
      )}
    </div>
  );
}
