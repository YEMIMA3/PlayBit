import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { 
  User, 
  UserCheck, 
  Users, 
  TrendingUp, 
  Trophy, 
  MessageSquare,
  Award,
  Calendar,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';

export default function Dashboard() {
  const coachData = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@coachplatform.com',
    phone: '+1 (555) 123-4567',
    location: 'Los Angeles, CA',
    sports: ['Tennis', 'Badminton'],
    experience: '12 years',
    certifications: ['USPTA Certified', 'Sports Psychology'],
    bio: 'Passionate tennis coach with over a decade of experience in developing young talent. Specialized in tournament preparation and mental conditioning.'
  };

  const stats = [
    { label: 'Active Students', value: '32', icon: UserCheck, color: 'bg-blue-500' },
    { label: 'Active Groups', value: '5', icon: Users, color: 'bg-purple-500' },
    { label: 'Tournaments', value: '8', icon: Trophy, color: 'bg-amber-500' },
    { label: 'Announcements', value: '24', icon: MessageSquare, color: 'bg-emerald-500' },
  ];

  const actionCards = [
    {
      title: 'Profile Management',
      description: 'Update your profile, certifications, and contact information',
      icon: User,
      link: '/coach/profile',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Student Requests',
      description: 'Review and manage incoming athlete requests',
      icon: UserCheck,
      link: '/coach/requests',
      color: 'from-purple-500 to-purple-600',
      badge: '3 new'
    },
    {
      title: 'Groups',
      description: 'Create and manage training groups and sessions',
      icon: Users,
      link: '/coach/groups',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor athlete performance and analyze metrics',
      icon: TrendingUp,
      link: '/coach/progress',
      color: 'from-amber-500 to-amber-600'
    },
    {
      title: 'Tournaments',
      description: 'Post tournaments and manage announcements',
      icon: Trophy,
      link: '/coach/tournaments',
      color: 'from-rose-500 to-rose-600'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Section */}
      <Card className="p-6 mb-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
        <div className="flex flex-col md:flex-row gap-6">
          <Avatar className="w-24 h-24 border-4 border-white/20">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-white mb-1">{coachData.name}</h1>
                <div className="flex flex-wrap gap-2 mb-3">
                  {coachData.sports.map((sport) => (
                    <Badge key={sport} variant="secondary" className="bg-white/20 text-white border-0">
                      {sport}
                    </Badge>
                  ))}
                </div>
              </div>
              <Link
                to="/coach/profile"
                className="px-4 py-2 bg-white text-slate-900 rounded-lg hover:bg-white/90 transition-colors"
              >
                Edit Profile
              </Link>
            </div>
            
            <p className="text-white/80 mb-4 max-w-3xl">{coachData.bio}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2 text-white/70">
                <Award className="w-4 h-4" />
                <span>{coachData.experience} experience</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <MapPin className="w-4 h-4" />
                <span>{coachData.location}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Mail className="w-4 h-4" />
                <span>{coachData.email}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Phone className="w-4 h-4" />
                <span>{coachData.phone}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex flex-wrap gap-2">
                {coachData.certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-1 text-sm text-white/70">
                    <Award className="w-3 h-3" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-slate-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Action Cards */}
      <div className="mb-4">
        <h2 className="text-slate-900 mb-4">Quick Actions</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actionCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} to={card.link}>
              <Card className="p-6 hover:shadow-xl transition-all group cursor-pointer h-full">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-slate-900">{card.title}</h3>
                      {card.badge && (
                        <Badge className="bg-emerald-100 text-emerald-700 border-0 hover:bg-emerald-100">
                          {card.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm">{card.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
