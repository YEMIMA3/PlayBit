import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  User, 
  Bell, 
  Trophy, 
  Users, 
  MapPin, 
  BarChart3,
  LogOut,
  Settings,
  Menu,
  X,
  Calendar,
  ClipboardList
} from 'lucide-react';
import '../../styles/coach/coachnav.scss';
import { getCoachProfile } from '../../api/coachProfile';

const CoachNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [coachData, setCoachData] = useState({
    name: '',
    email: '',
    sports: [],
    experience: '',
    profileImage: ''
  });
  const [loading, setLoading] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  const menuItems = [
    { 
      key: 'dashboard', 
      path: '/coach/dashboard', 
      icon: BarChart3, 
      label: 'Dashboard',
      badge: null
    },
    { 
      key: 'requests', 
      path: '/coach/requests', 
      icon: ClipboardList, 
      label: 'Requests',
      badge: 3
    },
    { 
      key: 'groups', 
      path: '/coach/groups', 
      icon: Users, 
      label: 'Groups',
      badge: null
    },
    { 
      key: 'progress', 
      path: '/coach/progress', 
      icon: BarChart3, 
      label: 'Progress',
      badge: null
    },
    { 
      key: 'tournaments', 
      path: '/coach/tournaments', 
      icon: Trophy, 
      label: 'Tournaments',
      badge: 1
    },
    { 
      key: 'schedule', 
      path: '/coach/schedule', 
      icon: Calendar, 
      label: 'Schedule',
      badge: 1
    },
    {
      key: 'venue',
      path: '/coach/stadium',
      icon: MapPin,
      label: 'Venue',
      badge: 1
    }
  ];

  // Load coach profile data
  useEffect(() => {
    fetchCoachProfile();
  }, []);

  const fetchCoachProfile = async () => {
    try {
      setLoading(true);
      const response = await getCoachProfile();
      
      if (response.success && response.profile) {
        setCoachData(response.profile);
        console.log('✅ Coach data loaded for nav:', response.profile.name);
      } else {
        console.error('❌ Failed to load coach profile for nav');
      }
    } catch (error) {
      console.error('❌ Error fetching coach profile for nav:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update active item based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const activeNav = menuItems.find(item => currentPath.includes(item.key));
    if (activeNav) {
      setActiveItem(activeNav.key);
    }
  }, [location.pathname]);

  // Close dropdown and sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && 
          !event.target.closest('.menu-toggle')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (path, key) => {
    setActiveItem(key);
    navigate(path);
    setSidebarOpen(false);
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownItemClick = (action) => {
    setShowDropdown(false);
    switch (action) {
      case 'profile':
        navigate('/coach/profile');
        break;
      case 'settings':
        navigate('/coach/settings');
        break;
      case 'signout':
        handleSignOut();
        break;
      default:
        break;
    }
  };

  const handleSignOut = () => {
    console.log('Signing out...');
    localStorage.removeItem('coach_token');
    navigate('/coach/auth');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Helper functions to get coach information
  const getCoachName = () => {
    return coachData.name || 'Coach';
  };

  const getCoachFirstName = () => {
    return coachData.name?.split(' ')[0] || 'Coach';
  };

  const getCoachSport = () => {
    if (coachData.sports && coachData.sports.length > 0) {
      return `${coachData.sports[0]} Coach`;
    }
    return coachData.experience ? 'Professional Coach' : 'Coach';
  };

  const getCoachEmail = () => {
    return coachData.email || 'coach@example.com';
  };

  const getCoachAvatar = () => {
    return coachData.profileImage || null;
  };

  // Calculate dynamic stats based on coach data
  const getCoachStats = () => {
    const achievements = coachData.achievements?.length || 0;
    const sports = coachData.sports?.length || 0;
    const certifications = coachData.certifications?.length || 0;
    
    return {
      activeAthletes: Math.min(achievements * 5, 50),
      sessions: Math.min(sports * 10 + certifications * 5, 100),
      rating: calculateCoachRating()
    };
  };

  const calculateCoachRating = () => {
    let rating = 4.0; // Base rating
    
    // Increase rating based on profile completeness
    if (coachData.experience) rating += 0.5;
    if (coachData.certifications?.length > 0) rating += 0.2 * coachData.certifications.length;
    if (coachData.achievements?.length > 0) rating += 0.1 * coachData.achievements.length;
    if (coachData.sports?.length > 1) rating += 0.2;
    
    return Math.min(rating, 5.0).toFixed(1);
  };

  const stats = getCoachStats();

  if (loading) {
    return (
      <div className="coach-nav">
        <div className="nav-left">
          <button className="menu-toggle">
            <Menu size={24} />
          </button>
          <div className="platform-brand">
            <span className="logo-icon">🏆</span>
            <span className="platform-name">Coach Platform</span>
          </div>
        </div>
        <div className="nav-right">
          <div className="user-profile">
            <div className="user-avatar">
              <User size={20} />
            </div>
            <div className="user-info">
              <div className="user-name">Loading...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Navbar */}
      <div className="coach-nav">
        {/* Left Section - Menu Button and Platform Name */}
        <div className="nav-left">
          <button 
            className="menu-toggle"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="platform-brand">
            <span className="logo-icon">🏆</span>
            <span className="platform-name">Coach Platform</span>
          </div>
        </div>
        
        {/* Right Section - User Profile Dropdown */}
        <div className="nav-right">

          <div 
            className="user-profile"
            onClick={handleProfileClick}
            ref={dropdownRef}
          >
            <div className="user-avatar">
              {getCoachAvatar() ? (
                <img 
                  src={getCoachAvatar()} 
                  alt={getCoachName()} 
                  className="avatar-image"
                />
              ) : (
                <User size={20} />
              )}
            </div>
            <div className="user-info">
              <div className="user-name">{getCoachFirstName()}</div>
              <div className="user-role">{getCoachSport()}</div>
            </div>
            <span className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>▼</span>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <div className="user-avatar-large">
                    {getCoachAvatar() ? (
                      <img 
                        src={getCoachAvatar()} 
                        alt={getCoachName()} 
                        className="avatar-image-large"
                      />
                    ) : (
                      <User size={24} />
                    )}
                  </div>
                  <div className="user-details">
                    <div className="user-name">{getCoachName()}</div>
                    <div className="user-email">{getCoachEmail()}</div>
                    <div className="user-sport">{getCoachSport()}</div>
                  </div>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <div className="dropdown-items">
                  <div 
                    className="dropdown-item"
                    onClick={() => handleDropdownItemClick('profile')}
                  >
                    <User size={16} />
                    <span>My Profile</span>
                  </div>
                  
                  
                  <div 
                    className="dropdown-item"
                    onClick={() => handleDropdownItemClick('settings')}
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  
                  <div 
                    className="dropdown-item signout"
                    onClick={() => handleDropdownItemClick('signout')}
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown Sidebar - Appears below navbar */}
      <div 
        ref={sidebarRef}
        className={`dropdown-sidebar ${sidebarOpen ? 'open' : ''}`}
      >
        <div className="sidebar-content">
          <div className="sidebar-user-info">
            <div className="user-avatar-sidebar">
              {getCoachAvatar() ? (
                <img 
                  src={getCoachAvatar()} 
                  alt={getCoachName()} 
                  className="avatar-image-sidebar"
                />
              ) : (
                <User size={24} />
              )}
            </div>
            <div className="user-details-sidebar">
              <div className="user-name">{getCoachName()}</div>
              <div className="user-sport">{getCoachSport()}</div>
            </div>
          </div>

          <nav className="sidebar-nav">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  className={`sidebar-item ${activeItem === item.key ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.path, item.key)}
                >
                  <div className="sidebar-icon">
                    <Icon size={20} />
                  </div>
                  <span className="sidebar-label">{item.label}</span>
                  {item.badge && (
                    <span className="sidebar-badge">{item.badge}</span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="sidebar-progress">
            <div className="progress-info">
              <span>Coach Rating</span>
              <span>{stats.rating}/5</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(stats.rating / 5) * 100}%` }}
              ></div>
            </div>
            <div className="progress-stats">
              <span>{stats.activeAthletes} Active Athletes</span>
              <span>•</span>
              <span>{stats.sessions} Sessions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default CoachNav;