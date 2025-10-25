import React from "react";
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
  Shield
} from "lucide-react";
import "../../styles/coach/coachdashboard.scss";
import CoachNav from './coachnav';

export default function CoachDashboard() {
  const coachData = {
    name: "Sarah Johnson",
    email: "sarah.johnson@coachplatform.com",
    phone: "+1 (555) 123-4567",
    location: "Los Angeles, CA",
    sports: ["Tennis", "Badminton"],
    experience: "12 years",
    certifications: ["USPTA Certified", "Sports Psychology", "CPR Certified"],
    bio: "Passionate tennis coach with over a decade of experience in developing young talent. Specialized in tournament preparation and mental conditioning.",
    rating: 4.9,
    studentsTrained: 150,
    successRate: "92%"
  };

  const stats = [
    { 
      label: "Active Students", 
      value: "32", 
      icon: UserCheck, 
      color: "#3b82f6",
      trend: "+12%",
      description: "From last month"
    },
    { 
      label: "Active Groups", 
      value: "5", 
      icon: Users, 
      color: "#a855f7",
      trend: "+2",
      description: "Training sessions"
    },
    { 
      label: "Tournaments", 
      value: "8", 
      icon: Trophy, 
      color: "#f59e0b",
      trend: "Active",
      description: "This season"
    },
    { 
      label: "Announcements", 
      value: "24", 
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

  return (
    <div>
    <CoachNav />
    <div className="coach-dashboard">
      {/* Welcome Header */}
      
      <div className="welcome-header">
        <div className="welcome-text">
          <h1>Welcome back, Coach {coachData.name.split(' ')[0]}! 👋</h1>
          <p>Here's what's happening with your coaching today</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <Star className="icon" size={20} />
            <span>{coachData.rating} Rating</span>
          </div>
          <div className="stat-item">
            <Target className="icon" size={20} />
            <span>{coachData.successRate} Success</span>
          </div>
          <div className="stat-item">
            <BarChart3 className="icon" size={20} />
            <span>{coachData.studentsTrained} Trained</span>
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
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
                  alt="Coach"
                  className="profile-avatar"
                />
                <div className="online-status"></div>
              </div>
              <div className="profile-main">
                <div className="profile-title">
                  <h2>{coachData.name}</h2>
                  <div className="rating">
                    <Star fill="currentColor" size={16} />
                    <span>{coachData.rating}</span>
                  </div>
                </div>
                <div className="sports-list">
                  {coachData.sports.map((sport) => (
                    <span key={sport} className="sport-badge">
                      {sport}
                    </span>
                  ))}
                </div>
                <p className="bio">{coachData.bio}</p>
              </div>
              <Link to="/coach/profile" className="edit-profile-btn">
                <Edit3 size={16} />
                Edit Profile
              </Link>
            </div>

            <div className="profile-details">
              <div className="detail-item">
                <Award className="icon" size={18} />
                <div>
                  <span className="label">Experience</span>
                  <span className="value">{coachData.experience}</span>
                </div>
              </div>
              <div className="detail-item">
                <MapPin className="icon" size={18} />
                <div>
                  <span className="label">Location</span>
                  <span className="value">{coachData.location}</span>
                </div>
              </div>
              <div className="detail-item">
                <Mail className="icon" size={18} />
                <div>
                  <span className="label">Email</span>
                  <span className="value">{coachData.email}</span>
                </div>
              </div>
              <div className="detail-item">
                <Phone className="icon" size={18} />
                <div>
                  <span className="label">Phone</span>
                  <span className="value">{coachData.phone}</span>
                </div>
              </div>
            </div>

            <div className="certifications-section">
              <h4>Certifications</h4>
              <div className="certifications-list">
                {coachData.certifications.map((cert) => (
                  <div key={cert} className="certification-item">
                    <Shield size={14} />
                    {cert}
                  </div>
                ))}
              </div>
            </div>
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
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="stat-card">
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
              {actionCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Link to={card.link} key={card.title} className="action-card">
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
              {recentAchievements.map((achievement) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}