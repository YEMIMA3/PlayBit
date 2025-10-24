import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, User, UserCheck, Users, TrendingUp, Trophy } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { path: '/coach/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/coach/profile', label: 'Profile', icon: User },
    { path: '/coach/requests', label: 'Requests', icon: UserCheck },
    { path: '/coach/groups', label: 'Groups', icon: Users },
    { path: '/coach/progress', label: 'Progress', icon: TrendingUp },
    { path: '/coach/tournaments', label: 'Tournaments', icon: Trophy },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-slate-900">Coach Platform</span>
          </div>
          
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
