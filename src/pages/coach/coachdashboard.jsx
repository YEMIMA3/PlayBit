import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  User,
  UserCheck,
  Users,
  TrendingUp,
  Trophy,
  MessageSquare,
  Award,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Star,
  Target,
  BarChart3,
  Edit3,
  ChevronRight,
  Clock,
  Shield,
  Loader,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import "../../styles/coach/coachdashboard.scss";
import CoachNav from './coachnav';
import { getCoachProfile } from "../../api/coachProfile";

export default function CoachDashboard() {
  const [coachData, setCoachData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    sports: [],
    experience: "",
    certifications: [],
    bio: "",
    profileImage: "",
    hourlyRate: "",
    availability: "",
    achievements: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const stats = [
    { 
      label: "Active Students", 
      value: "0", 
      icon: UserCheck, 
      color: "#3b82f6",
      trend: "+12%",
      description: "From last month"
    },
    { 
      label: "Active Groups", 
      value: "0", 
      icon: Users, 
      color: "#a855f7",
      trend: "+2",
      description: "Training sessions"
    },
    { 
      label: "Tournaments", 
      value: "0", 
      icon: Trophy, 
      color: "#f59e0b",
      trend: "Active",
      description: "This season"
    },
    { 
      label: "Announcements", 
      value: "0", 
      icon: MessageSquare, 
      color: "#10b981",
      trend: "+5 new",
      description: "This week"
    },
  ];

  const actionCards = [
    {
      title: "Profile Management",
      description: "Update your profile, certifications, and contact information",
      icon: User,
      link: "/coach/profile",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      badge: "Update available"
    },
    {
      title: "Student Requests",
      description: "Review and manage incoming athlete requests",
      icon: UserCheck,
      link: "/coach/requests",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      badge: "3 new",
      urgent: true
    },
    {
      title: "Groups Management",
      description: "Create and manage training groups and sessions",
      icon: Users,
      link: "/coach/groups",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      title: "Performance Tracking",
      description: "Monitor athlete performance and analyze metrics",
      icon: TrendingUp,
      link: "/coach/progress",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
    {
      title: "Tournaments",
      description: "Post tournaments and manage announcements",
      icon: Trophy,
      link: "/coach/tournaments",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
    {
      title: "Schedule",
      description: "Manage your calendar and training sessions",
      icon: Calendar,
      link: "/coach/schedule",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    },
    {
      title: "Venue",
      description: "Search Near By Stadiums for practice.",
      icon: MapPin,
      link: "/coach/stadium",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    }
  ];

  const upcomingSessions = [
    { id: 1, title: "Advanced Tennis Training", time: "Today, 4:00 PM", location: "Court A", type: "Group" },
    { id: 2, title: "Beginner Badminton", time: "Tomorrow, 5:30 PM", location: "Indoor Arena", type: "Group" },
    { id: 3, title: "Private Session - Alex", time: "Tomorrow, 3:00 PM", location: "Court B", type: "Private" },
  ];

  const recentAchievements = [
    { id: 1, title: "Student Tournament Win", description: "Marcus won regional championship", date: "2 days ago" },
    { id: 2, title: "New Certification", description: "Advanced Sports Psychology", date: "1 week ago" },
    { id: 3, title: "Group Milestone", description: "Beginner group reached 95% attendance", date: "2 weeks ago" },
  ];

  // Load coach profile data
  useEffect(() => {
    fetchCoachProfile();
  }, [lastUpdate]);

  const fetchCoachProfile = async () => {
    try {
      setLoading(true);
      setError("");
      console.log('🔄 Fetching coach profile data...');
      
      const response = await getCoachProfile();
      
      if (response.success && response.profile) {
        setCoachData(response.profile);
        console.log('✅ Coach data loaded successfully:', response.profile.name);
      } else {
        setError(response.message || 'Failed to load profile data');
      }
    } catch (error) {
      console.error('❌ Error fetching coach profile:', error);
      setError(error.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    console.log('🔄 Manually refreshing coach data...');
    setLastUpdate(Date.now());
  };

  // Calculate derived stats from profile data
  const calculateStats = () => {
    const studentsTrained = coachData.achievements?.length * 15 + 50 || 150;
    const successRate = "92%";
    const rating = 4.9;

    return { studentsTrained, successRate, rating };
  };

  const { studentsTrained, successRate, rating } = calculateStats();

  if (loading) {
    return (
      <div className="coach-dashboard-wrapper">
        <CoachNav />
        <div className="loading-container">
          <Loader size={32} className="spinner" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="coach-dashboard-wrapper">
        <CoachNav />
        <div className="error-container">
          <AlertCircle size={48} />
          <h3>Error Loading Dashboard</h3>
          <p>{error}</p>
          <div className="error-actions">
            <button onClick={refreshData} className="retry-btn">
              <RefreshCw size={16} />
              Try Again
            </button>
            <button 
              onClick={() => {
                localStorage.removeItem('coach_token');
                window.location.href = '/coach/login';
              }} 
              className="logout-btn"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="coach-dashboard-wrapper">
      <CoachNav />
      <div className="coach-dashboard">
        {/* Welcome Header */}
        <div className="welcome-header">
          <div className="welcome-text">
            <h1>Welcome back, Coach {coachData.name?.split(' ')[0] || 'Coach'}! 👋</h1>
            <p>Here's what's happening with your coaching today</p>
            <button onClick={refreshData} className="refresh-btn">
              <RefreshCw size={16} />
              Refresh Data
            </button>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <Star className="icon" size={20} />
              <span>{rating} Rating</span>
            </div>
            <div className="stat-item">
              <Target className="icon" size={20} />
              <span>{successRate} Success</span>
            </div>
            <div className="stat-item">
              <BarChart3 className="icon" size={20} />
              <span>{studentsTrained}+ Trained</span>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Left Column */}
          <div className="left-column">
            {/* Profile Card */}
            <div className="profile-card">
              <div className="profile-header">
                <div className="avatar-section">
                  <img
                    src={coachData.profileImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"}
                    alt="Coach"
                    className="profile-avatar"
                  />
                  <div className="online-status"></div>
                </div>
                <div className="profile-main">
                  <div className="profile-title">
                    <h2>{coachData.name || "Your Name"}</h2>
                    <div className="rating">
                      <Star fill="currentColor" size={16} />
                      <span>{rating}</span>
                    </div>
                  </div>
                  <div className="sports-list">
                    {coachData.sports && coachData.sports.length > 0 ? (
                      coachData.sports.map((sport, index) => (
                        <span key={index} className="sport-badge">
                          {sport}
                        </span>
                      ))
                    ) : (
                      <span className="sport-badge">Add Sports</span>
                    )}
                  </div>
                  <p className="bio">
                    {coachData.bio || "Complete your profile to showcase your coaching expertise to athletes."}
                  </p>
                </div>
                <Link to="/coach/profile" className="edit-profile-btn">
                  <Edit3 size={16} />
                  {coachData.name ? "Edit Profile" : "Complete Profile"}
                </Link>
              </div>

              <div className="profile-details">
                <div className="detail-item">
                  <Award className="icon" size={18} />
                  <div>
                    <span className="label">Experience</span>
                    <span className="value">{coachData.experience || "Not specified"}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <MapPin className="icon" size={18} />
                  <div>
                    <span className="label">Location</span>
                    <span className="value">{coachData.location || "Not specified"}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <Mail className="icon" size={18} />
                  <div>
                    <span className="label">Email</span>
                    <span className="value">{coachData.email || "Not specified"}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <Phone className="icon" size={18} />
                  <div>
                    <span className="label">Phone</span>
                    <span className="value">{coachData.phone || "Not specified"}</span>
                  </div>
                </div>
                {coachData.hourlyRate && (
                  <div className="detail-item">
                    <TrendingUp className="icon" size={18} />
                    <div>
                      <span className="label">Hourly Rate</span>
                      <span className="value">{coachData.hourlyRate}</span>
                    </div>
                  </div>
                )}
                {coachData.availability && (
                  <div className="detail-item">
                    <Calendar className="icon" size={18} />
                    <div>
                      <span className="label">Availability</span>
                      <span className="value">{coachData.availability}</span>
                    </div>
                  </div>
                )}
              </div>

              {coachData.certifications && coachData.certifications.length > 0 && (
                <div className="certifications-section">
                  <h4>Certifications</h4>
                  <div className="certifications-list">
                    {coachData.certifications.map((cert, index) => (
                      <div key={index} className="certification-item">
                        <Shield size={14} />
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {coachData.achievements && coachData.achievements.length > 0 && (
                <div className="achievements-preview">
                  <h4>Recent Achievements</h4>
                  <div className="achievements-list-mini">
                    {coachData.achievements.slice(0, 2).map((achievement, index) => (
                      <div key={index} className="achievement-item-mini">
                        <Trophy size={14} />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Upcoming Sessions */}
            <div className="sessions-card">
              <div className="card-header">
                <h3>Upcoming Sessions</h3>
                <Link to="/coach/schedule" className="view-all">
                  View All <ChevronRight size={16} />
                </Link>
              </div>
              <div className="sessions-list">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="session-item">
                    <div className="session-info">
                      <h4>{session.title}</h4>
                      <div className="session-meta">
                        <Clock size={14} />
                        <span>{session.time}</span>
                        <span className="divider">•</span>
                        <span>{session.location}</span>
                      </div>
                    </div>
                    <div className={`session-type ${session.type.toLowerCase()}`}>
                      {session.type}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column">
            {/* Stats Grid */}
            <div className="stats-grid">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="stat-card">
                    <div className="stat-content">
                      <div className="stat-main">
                        <p className="value">{stat.value}</p>
                        <p className="label">{stat.label}</p>
                      </div>
                      <div className="stat-trend">
                        <span className="trend-value">{stat.trend}</span>
                        <p className="trend-description">{stat.description}</p>
                      </div>
                    </div>
                    <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                      <Icon color="#fff" size={24} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="actions-card">
              <div className="card-header">
                <h3>Quick Actions</h3>
                <p>Manage your coaching activities</p>
              </div>
              <div className="actions-grid">
                {actionCards.map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <Link to={card.link} key={index} className="action-card">
                      <div className="action-header">
                        <div className="icon-wrapper" style={{ background: card.gradient }}>
                          <Icon color="#fff" size={20} />
                        </div>
                        {card.badge && (
                          <span className={`action-badge ${card.urgent ? 'urgent' : ''}`}>
                            {card.badge}
                          </span>
                        )}
                      </div>
                      <div className="action-content">
                        <h4>{card.title}</h4>
                        <p>{card.description}</p>
                      </div>
                      <div className="action-arrow">
                        <ChevronRight size={16} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="achievements-card">
              <div className="card-header">
                <h3>Recent Achievements</h3>
                <Award className="icon" size={20} />
              </div>
              <div className="achievements-list">
                {coachData.achievements && coachData.achievements.length > 0 ? (
                  coachData.achievements.slice(0, 3).map((achievement, index) => (
                    <div key={index} className="achievement-item">
                      <div className="achievement-icon">
                        <Trophy size={16} />
                      </div>
                      <div className="achievement-content">
                        <h4>{achievement}</h4>
                        <p>Great achievement in your coaching career!</p>
                        <span className="achievement-date">Recently added</span>
                      </div>
                    </div>
                  ))
                ) : (
                  recentAchievements.map((achievement) => (
                    <div key={achievement.id} className="achievement-item">
                      <div className="achievement-icon">
                        <Trophy size={16} />
                      </div>
                      <div className="achievement-content">
                        <h4>{achievement.title}</h4>
                        <p>{achievement.description}</p>
                        <span className="achievement-date">{achievement.date}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}