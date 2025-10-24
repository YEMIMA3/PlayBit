import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, ArrowLeft } from 'lucide-react';

export default function PerformanceTracking() {
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [timeFilter, setTimeFilter] = useState('monthly');
  const [groupFilter, setGroupFilter] = useState('all');

  const athletes = [
    {
      id: 1,
      name: 'Alex Martinez',
      sport: 'Tennis',
      group: 'Advanced Tennis Squad',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      currentScore: 85,
      trend: 5.2,
      weeklyData: [
        { week: 'Week 1', performance: 78, stamina: 75, technique: 80, mental: 76 },
        { week: 'Week 2', performance: 80, stamina: 78, technique: 82, mental: 78 },
        { week: 'Week 3', performance: 82, stamina: 80, technique: 84, mental: 80 },
        { week: 'Week 4', performance: 85, stamina: 83, technique: 86, mental: 84 },
      ],
      radarData: [
        { skill: 'Serve', value: 88 },
        { skill: 'Backhand', value: 82 },
        { skill: 'Forehand', value: 90 },
        { skill: 'Footwork', value: 85 },
        { skill: 'Strategy', value: 80 },
        { skill: 'Stamina', value: 83 },
      ]
    },
    {
      id: 2,
      name: 'Emily Chen',
      sport: 'Badminton',
      group: 'Beginner Badminton',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      currentScore: 72,
      trend: 8.5,
      weeklyData: [
        { week: 'Week 1', performance: 60, stamina: 58, technique: 62, mental: 60 },
        { week: 'Week 2', performance: 65, stamina: 63, technique: 67, mental: 64 },
        { week: 'Week 3', performance: 68, stamina: 66, technique: 70, mental: 68 },
        { week: 'Week 4', performance: 72, stamina: 70, technique: 74, mental: 72 },
      ],
      radarData: [
        { skill: 'Smash', value: 70 },
        { skill: 'Drop Shot', value: 68 },
        { skill: 'Clear', value: 75 },
        { skill: 'Footwork', value: 72 },
        { skill: 'Net Play', value: 65 },
        { skill: 'Stamina', value: 70 },
      ]
    },
    {
      id: 3,
      name: 'Marcus Thompson',
      sport: 'Tennis',
      group: 'Advanced Tennis Squad',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      currentScore: 92,
      trend: 3.1,
      weeklyData: [
        { week: 'Week 1', performance: 88, stamina: 86, technique: 90, mental: 87 },
        { week: 'Week 2', performance: 89, stamina: 88, technique: 91, mental: 88 },
        { week: 'Week 3', performance: 90, stamina: 89, technique: 92, mental: 90 },
        { week: 'Week 4', performance: 92, stamina: 91, technique: 94, mental: 91 },
      ],
      radarData: [
        { skill: 'Serve', value: 95 },
        { skill: 'Backhand', value: 90 },
        { skill: 'Forehand', value: 92 },
        { skill: 'Footwork', value: 91 },
        { skill: 'Strategy', value: 93 },
        { skill: 'Stamina', value: 91 },
      ]
    },
    {
      id: 4,
      name: 'Sophie Williams',
      sport: 'Tennis',
      group: 'Intermediate Tennis',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
      currentScore: 78,
      trend: -2.3,
      weeklyData: [
        { week: 'Week 1', performance: 80, stamina: 78, technique: 82, mental: 79 },
        { week: 'Week 2', performance: 79, stamina: 77, technique: 81, mental: 78 },
        { week: 'Week 3', performance: 78, stamina: 76, technique: 80, mental: 77 },
        { week: 'Week 4', performance: 78, stamina: 76, technique: 79, mental: 78 },
      ],
      radarData: [
        { skill: 'Serve', value: 75 },
        { skill: 'Backhand', value: 80 },
        { skill: 'Forehand', value: 82 },
        { skill: 'Footwork', value: 78 },
        { skill: 'Strategy', value: 76 },
        { skill: 'Stamina', value: 76 },
      ]
    },
  ];

  const filteredAthletes = athletes.filter(a => 
    groupFilter === 'all' || a.group === groupFilter
  );

  if (selectedAthlete) {
    const athlete = athletes.find(a => a.id === selectedAthlete);
    
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="outline" 
          onClick={() => setSelectedAthlete(null)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Athletes
        </Button>

        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={athlete.image} />
              <AvatarFallback>{athlete.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-slate-900 mb-1">{athlete.name}</h1>
              <div className="flex gap-2">
                <Badge className="bg-blue-100 text-blue-700 border-0">{athlete.sport}</Badge>
                <Badge className="bg-purple-100 text-purple-700 border-0">{athlete.group}</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6">
            <p className="text-slate-600 text-sm mb-1">Current Score</p>
            <p className="text-slate-900 mb-1">{athlete.currentScore}/100</p>
            <div className={`flex items-center gap-1 text-sm ${athlete.trend >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {athlete.trend >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{Math.abs(athlete.trend)}% from last month</span>
            </div>
          </Card>
          <Card className="p-6">
            <p className="text-slate-600 text-sm mb-1">Training Sessions</p>
            <p className="text-slate-900 mb-1">24</p>
            <p className="text-slate-500 text-sm">This month</p>
          </Card>
          <Card className="p-6">
            <p className="text-slate-600 text-sm mb-1">Attendance</p>
            <p className="text-slate-900 mb-1">96%</p>
            <p className="text-slate-500 text-sm">Excellent attendance</p>
          </Card>
        </div>

        <Tabs defaultValue="progress" className="mb-6">
          <TabsList>
            <TabsTrigger value="progress">Progress Over Time</TabsTrigger>
            <TabsTrigger value="skills">Skill Analysis</TabsTrigger>
            <TabsTrigger value="comparison">Performance Breakdown</TabsTrigger>
          </TabsList>

          <TabsContent value="progress">
            <Card className="p-6">
              <h3 className="text-slate-900 mb-4">Performance Trend</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={athlete.weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="performance" stroke="#10b981" strokeWidth={2} name="Overall Performance" />
                  <Line type="monotone" dataKey="technique" stroke="#3b82f6" strokeWidth={2} name="Technique" />
                  <Line type="monotone" dataKey="stamina" stroke="#f59e0b" strokeWidth={2} name="Stamina" />
                  <Line type="monotone" dataKey="mental" stroke="#8b5cf6" strokeWidth={2} name="Mental" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card className="p-6">
              <h3 className="text-slate-900 mb-4">Skill Radar Analysis</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={athlete.radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar name={athlete.name} dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="comparison">
            <Card className="p-6">
              <h3 className="text-slate-900 mb-4">Weekly Performance Breakdown</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={athlete.weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="performance" fill="#10b981" name="Performance" />
                  <Bar dataKey="technique" fill="#3b82f6" name="Technique" />
                  <Bar dataKey="stamina" fill="#f59e0b" name="Stamina" />
                  <Bar dataKey="mental" fill="#8b5cf6" name="Mental" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-slate-900 mb-2">Performance Tracking</h1>
        <p className="text-slate-600">Monitor and analyze athlete progress and metrics</p>
      </div>

      <Card className="p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm text-slate-600 mb-1 block">Group</label>
            <Select value={groupFilter} onValueChange={setGroupFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Groups</SelectItem>
                <SelectItem value="Advanced Tennis Squad">Advanced Tennis Squad</SelectItem>
                <SelectItem value="Beginner Badminton">Beginner Badminton</SelectItem>
                <SelectItem value="Intermediate Tennis">Intermediate Tennis</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm text-slate-600 mb-1 block">Time Period</label>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAthletes.map((athlete) => (
          <Card 
            key={athlete.id} 
            className="p-6 hover:shadow-xl transition-all cursor-pointer"
            onClick={() => setSelectedAthlete(athlete.id)}
          >
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="w-14 h-14">
                <AvatarImage src={athlete.image} />
                <AvatarFallback>{athlete.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">{athlete.name}</h3>
                <div className="flex flex-wrap gap-1">
                  <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">
                    {athlete.sport}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Performance Score</span>
                <span className="text-slate-900">{athlete.currentScore}/100</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all"
                  style={{ width: `${athlete.currentScore}%` }}
                />
              </div>
            </div>

            <div className={`flex items-center gap-2 text-sm ${athlete.trend >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {athlete.trend >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{athlete.trend >= 0 ? '+' : ''}{athlete.trend}% from last period</span>
            </div>

            <Button variant="outline" className="w-full mt-4">
              View Details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
