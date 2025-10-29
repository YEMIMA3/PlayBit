import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, Users, Award, Trophy } from 'lucide-react';
import "../../styles/athlete/dashboard.scss";
import AthleteNav from './AthleteNav';

const progressData = [
  { week: 'Week 1', score: 65 },
  { week: 'Week 2', score: 72 },
  { week: 'Week 3', score: 68 },
  { week: 'Week 4', score: 78 },
  { week: 'Week 5', score: 82 },
  { week: 'Week 6', score: 85 },
];

const upcomingTournaments = [
  { id: 1, name: 'Mumbai Inter-College Basketball Cup', date: '2025-11-05', sport: 'Basketball' },
  { id: 2, name: 'All-India College Football League', date: '2025-11-12', sport: 'Football' },
  { id: 3, name: 'Maharashtra State Cricket Tournament', date: '2025-11-20', sport: 'Cricket' },
];

const announcements = [
  { id: 1, title: 'New Training Schedule Released', date: '2025-10-23', from: 'Coach Rajesh' },
  { id: 2, title: 'Diet Plan Updated - Check WhatsApp', date: '2025-10-22', from: 'Coach Rajesh' },
  { id: 3, title: 'Group Practice This Sunday', date: '2025-10-20', from: 'Coach Rajesh' },
];

export default function AthleteDashboard() {
  return (
    <div className="athlete-profile-container">
      <AthleteNav />
      <div className="athlete-dashboard">
        <div className="container">
          {/* Header */}
          <div className="header">
            <h1>Dashboard</h1>
            <p>Welcome back! Here's your overview</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="card fade-in">
              <div className="card-header">
                <h3>Active Coach</h3>
                <Users />
              </div>
              <div className="card-content">
                <div className="coach-info">
                  <div className="avatar">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=coach1" alt="Coach Michael" />
                  </div>
                  <div className="coach-details">
                    <p>Coach Michael</p>
                    <p>Basketball</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card fade-in">
              <div className="card-header">
                <h3>Pending Requests</h3>
                <Clock />
              </div>
              <div className="card-content">
                <p className="stat-number">2</p>
                <p className="stat-label">Awaiting response</p>
              </div>
            </div>

            <div className="card fade-in">
              <div className="card-header">
                <h3>Tournaments</h3>
                <Trophy />
              </div>
              <div className="card-content">
                <p className="stat-number">5</p>
                <p className="stat-label">Upcoming events</p>
              </div>
            </div>

            <div className="card fade-in">
              <div className="card-header">
                <h3>Performance</h3>
                <Award />
              </div>
              <div className="card-content">
                <p className="stat-number">85%</p>
                <p className="stat-label">Current score</p>
              </div>
            </div>
          </div>

          <div className="chart-grid">
            {/* Progress Graph */}
            <div className="card fade-in">
              <div className="card-header">
                <h3>Performance Progress</h3>
              </div>
              <div className="card-content">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#1d4ed8' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Upcoming Tournaments */}
            <div className="card fade-in">
              <div className="card-header">
                <h3>Upcoming Tournaments</h3>
              </div>
              <div className="card-content">
                <div className="tournaments-list">
                  {upcomingTournaments.map((tournament) => (
                    <div key={tournament.id} className="tournament-item slide-in">
                      <div className="tournament-info">
                        <p className="tournament-name">{tournament.name}</p>
                        <div className="tournament-meta">
                          <span>
                            <Calendar size={14} />
                            {new Date(tournament.date).toLocaleDateString()}
                          </span>
                          <span className="badge">{tournament.sport}</span>
                        </div>
                      </div>
                      <button className="button">Register</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Latest Announcements */}
          <div className="announcements-card fade-in">
            <div className="card-header">
              <h3>Latest Announcements from Coach</h3>
            </div>
            <div className="card-content">
              <div className="announcements-list">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="announcement-item slide-in">
                    <div className="announcement-content">
                      <h4>{announcement.title}</h4>
                      <p>
                        {announcement.from} • {new Date(announcement.date).toLocaleDateString()}
                      </p>
                    </div>
                    <button>View</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}