import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, Users, Award, Trophy, Loader, AlertCircle, User, Mail, Target } from 'lucide-react';
import "../../styles/athlete/dashboard.scss";
import AthleteNav from './AthleteNav';
import { getAthleteProfile } from '../../api/athleteProfile';

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
  const [basicAthleteData, setBasicAthleteData] = useState(null); // From credentials collection
  const [profileData, setProfileData] = useState(null); // From profile collection
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Load athlete data from both sources
  useEffect(() => {
    fetchAthleteData();
  }, []);

  const fetchAthleteData = async () => {
    try {
      setLoading(true);
      
      // 1. Get basic data from localStorage (from login - credentials collection)
      const storedAthleteData = localStorage.getItem('athlete_data');
      if (storedAthleteData) {
        const parsedData = JSON.parse(storedAthleteData);
        console.log('📋 Basic athlete data from credentials:', parsedData);
        setBasicAthleteData(parsedData);
      }

      // 2. Get detailed profile data from API (profile collection)
      try {
        const response = await getAthleteProfile();
        if (response.success && response.profile) {
          console.log('✅ Detailed profile data:', response.profile);
          setProfileData(response.profile);
        }
      } catch (profileError) {
        console.log('ℹ️ No detailed profile found yet, using basic data only');
        // It's okay if profile doesn't exist yet
      }

    } catch (error) {
      console.error('❌ Error fetching athlete data:', error);
      setError(error.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Merge data from both sources - profile data takes priority
  const getMergedAthleteData = () => {
    if (profileData) {
      return profileData; // Use profile data if available
    }
    return basicAthleteData || {}; // Fallback to basic data
  };

  const athleteData = getMergedAthleteData();

  // Calculate dynamic stats based on athlete data
  const getAthleteStats = () => {
    return {
      pendingRequests: 2,
      upcomingTournaments: 5,
      performanceScore: 85,
      activeCoach: 'Coach Rajesh'
    };
  };

  const stats = getAthleteStats();

  // Profile Details Component
  const ProfileDetails = () => (
    <div className="profile-details-card fade-in">
      <div className="card-header">
        <h3>Personal Information</h3>
        <User size={20} />
      </div>
      <div className="card-content">
        <div className="profile-details-grid">
          <div className="detail-item">
            <label>Full Name</label>
            <p>{athleteData.name || 'Not provided'}</p>
          </div>
          <div className="detail-item">
            <label>Email Address</label>
            <p>{athleteData.email || 'Not provided'}</p>
          </div>
          <div className="detail-item">
            <label>Phone Number</label>
            <p>{athleteData.phone || 'Not provided'}</p>
          </div>
          <div className="detail-item">
            <label>Location</label>
            <p>{athleteData.location || 'Not provided'}</p>
          </div>
          <div className="detail-item">
            <label>Date of Birth</label>
            <p>{athleteData.dateOfBirth ? new Date(athleteData.dateOfBirth).toLocaleDateString() : 'Not provided'}</p>
          </div>
          <div className="detail-item">
            <label>Sport</label>
            <p>{athleteData.sport || 'Not specified'}</p>
          </div>
          <div className="detail-item">
            <label>Experience Level</label>
            <p>{athleteData.experience || 'Not specified'}</p>
          </div>
          <div className="detail-item">
            <label>Skill Level</label>
            <p>{athleteData.level || 'Not specified'}</p>
          </div>
          <div className="detail-item">
            <label>Height</label>
            <p>{athleteData.height || 'Not provided'}</p>
          </div>
          <div className="detail-item">
            <label>Weight</label>
            <p>{athleteData.weight || 'Not provided'}</p>
          </div>
          <div className="detail-item full-width">
            <label>Bio</label>
            <p>{athleteData.bio || 'No bio provided'}</p>
          </div>
        </div>
        
        {/* Achievements Section */}
        {athleteData.achievements && athleteData.achievements.length > 0 && (
          <div className="achievements-section">
            <h4>Achievements & Certificates</h4>
            <div className="achievements-list">
              {athleteData.achievements.map((achievement, index) => (
                <div key={index} className="achievement-item">
                  <Award size={16} />
                  <span>{achievement.fileName || achievement || `Achievement ${index + 1}`}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Overview Dashboard Component
  const OverviewDashboard = () => (
    <>
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
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=coach1" alt="Coach" />
              </div>
              <div className="coach-details">
                <p>{stats.activeCoach}</p>
                <p>{athleteData.sport || 'General'}</p>
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
            <p className="stat-number">{stats.pendingRequests}</p>
            <p className="stat-label">Awaiting response</p>
          </div>
        </div>

        <div className="card fade-in">
          <div className="card-header">
            <h3>Tournaments</h3>
            <Trophy />
          </div>
          <div className="card-content">
            <p className="stat-number">{stats.upcomingTournaments}</p>
            <p className="stat-label">Upcoming events</p>
          </div>
        </div>

        <div className="card fade-in">
          <div className="card-header">
            <h3>Performance</h3>
            <Award />
          </div>
          <div className="card-content">
            <p className="stat-number">{stats.performanceScore}%</p>
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
    </>
  );

  if (loading) {
    return (
      <div className="athlete-profile-container">
        <AthleteNav />
        <div className="loading-container">
          <Loader size={32} className="spinner" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="athlete-profile-container">
        <AthleteNav />
        <div className="error-container">
          <AlertCircle size={48} />
          <h3>Error Loading Dashboard</h3>
          <p>{error}</p>
          <button onClick={fetchAthleteData} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="athlete-profile-container">
      <AthleteNav />
      <div className="athlete-dashboard">
        <div className="container">
          {/* Header */}
          <div className="header">
            <div className="header-content">
              <div className="welcome-section">
                <h1>Welcome back, {athleteData.name?.split(' ')[0] || 'Athlete'}!</h1>
                <p>Here's your performance overview and profile details</p>
              </div>
              <div className="profile-badge">
                
                <div className="profile-info">
                  <h3>{athleteData.name}</h3>
                  <p>{athleteData.sport} • {athleteData.level || athleteData.experience}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="dashboard-tabs">
            <button 
              className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <Target size={18} />
              Overview
            </button>
            <button 
              className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={18} />
              Profile Details
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'overview' ? <OverviewDashboard /> : <ProfileDetails />}
          </div>
        </div>
      </div>
    </div>
  );
}