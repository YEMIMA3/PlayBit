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
  Home,
  Target
} from 'lucide-react';
import '../../styles/athlete/athletenav.scss';

const AthleteNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [athleteData, setAthleteData] = useState({
    name: '',
    email: '',
    sport: '',
    level: '',
    experience: '',
    profileImage: ''
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  // Navigation items
  const leftColumnItems = [
    { key: 'dashboard', path: '/athlete/dashboard', icon: Home, label: 'Dashboard' },
    { key: 'announcements', path: '/athlete/announcements', icon: Bell, label: 'Announcements', badge: 3 },
    { key: 'groups', path: '/athlete/groups', icon: Users, label: 'Groups' }
  ];

  const rightColumnItems = [
    { key: 'progress', path: '/athlete/progress', icon: BarChart3, label: 'Progress' },
    { key: 'tournaments', path: '/athlete/tournaments', icon: Trophy, label: 'Tournaments', badge: 2 },
    { key: 'coaches', path: '/athlete/findcoaches', icon: Target, label: 'Find Coaches' },
    { key: 'stadiums', path: '/athlete/stadiums', icon: MapPin, label: 'Stadiums' }
  ];

  // Load athlete data from localStorage
  useEffect(() => {
    const loadAthleteData = () => {
      try {
        const storedAthleteData = localStorage.getItem('athlete_data');
        if (storedAthleteData) {
          const parsedData = JSON.parse(storedAthleteData);
          setAthleteData({
            name: parsedData.name || 'Athlete',
            email: parsedData.email || '',
            sport: parsedData.sport || 'General',
            level: parsedData.level || parsedData.experience || 'Beginner',
            experience: parsedData.experience || '',
            profileImage: parsedData.profileImage || ''
          });
        }
      } catch (error) {
        console.error('Error loading athlete data for nav:', error);
      }
    };

    loadAthleteData();
  }, []);

  // Update active item based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const allItems = [...leftColumnItems, ...rightColumnItems];
    const activeNav = allItems.find(item => currentPath.includes(item.key));
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
        navigate('/athlete/dashboard?tab=profile');
        break;
      case 'notifications':
        navigate('/athlete/announcements');
        setUnreadNotifications(0);
        break;
      case 'settings':
        navigate('/athlete/settings');
        break;
      case 'signout':
        handleSignOut();
        break;
      default:
        break;
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('athlete_token');
    localStorage.removeItem('athlete_data');
    localStorage.removeItem('athlete_basic_data');
    navigate('/athlete/auth');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getDisplayLevel = () => {
    return athleteData.level || athleteData.experience || 'Beginner';
  };

  const getDisplayName = () => {
    if (!athleteData.name) return 'Athlete';
    return athleteData.name.split(' ')[0];
  };

  const getFullName = () => {
    return athleteData.name || 'Athlete';
  };

  return (
    <>
      {/* Main Navbar */}
      <div className="athlete-nav">
        {/* Left Section */}
        <div className="nav-left">
          <button 
            className="menu-toggle"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="platform-brand">
            <span className="logo-icon">⚡</span>
            <span className="platform-name">Athlete Platform</span>
          </div>
        </div>
        
        {/* Right Section */}
        <div className="nav-right">
          <div 
            className="user-profile"
            onClick={handleProfileClick}
            ref={dropdownRef}
          >
            <div className="user-avatar">
              {athleteData.profileImage ? (
                <img 
                  src={athleteData.profileImage} 
                  alt={getDisplayName()}
                />
              ) : (
                <User size={20} />
              )}
            </div>
            <div className="user-info">
              <div className="user-name">{getDisplayName()}</div>
              <div className="user-role">{athleteData.sport} • {getDisplayLevel()}</div>
            </div>
            <span className={`dropdown-arrow ${showDropdown ? 'rotated' : ''}`}>
              ▼
            </span>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <div className="user-avatar-large">
                    {athleteData.profileImage ? (
                      <img 
                        src={athleteData.profileImage} 
                        alt={getFullName()}
                      />
                    ) : (
                      <User size={24} />
                    )}
                  </div>
                  <div className="user-details">
                    <div className="user-name">{getFullName()}</div>
                    <div className="user-email">
                      {athleteData.email || 'No email provided'}
                    </div>
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
                    onClick={() => handleDropdownItemClick('notifications')}
                  >
                    <Bell size={16} />
                    <span>Notifications</span>
                    {unreadNotifications > 0 && (
                      <span className="dropdown-badge">{unreadNotifications}</span>
                    )}
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
                    className="dropdown-item signout-item"
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

      {/* Sidebar Navigation */}
      <div 
        ref={sidebarRef}
        className={`dropdown-sidebar ${sidebarOpen ? 'open' : ''}`}
      >
        <div className="sidebar-content">
          {/* User Info */}
          <div className="sidebar-user-info">
            <div className="user-avatar-sidebar">
              {athleteData.profileImage ? (
                <img 
                  src={athleteData.profileImage} 
                  alt={getDisplayName()}
                />
              ) : (
                <User size={24} />
              )}
            </div>
            <div className="user-details-sidebar">
              <div className="user-name">{getDisplayName()}</div>
              <div className="user-role">{athleteData.sport} • {getDisplayLevel()}</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="sidebar-nav">
            {[...leftColumnItems, ...rightColumnItems].map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.key;
              return (
                <button
                  key={item.key}
                  className={`sidebar-item ${isActive ? 'active' : ''}`}
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

          {/* Profile Completion */}
          <div className="sidebar-progress">
            <div className="progress-info">
              <span className="progress-label">Profile Completion</span>
              <span className="progress-percent">70%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '70%'}}></div>
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

export default AthleteNav;