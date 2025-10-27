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
  X
} from 'lucide-react';
import '../../styles/athlete/athletenav.scss';

const AthleteNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeItem, setActiveItem] = useState('profile');
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  const menuItems = [
    { 
      key: 'profile', 
      path: '/athlete/profile', 
      icon: User, 
      label: 'Profile',
      badge: null
    },
    { 
      key: 'announcements', 
      path: '/athlete/announcements', 
      icon: Bell, 
      label: 'Announcements',
      badge: 3
    },
    { 
      key: 'progress', 
      path: '/athlete/progress', 
      icon: BarChart3, 
      label: 'Progress',
      badge: null
    },
    { 
      key: 'tournaments', 
      path: '/athlete/tournaments', 
      icon: Trophy, 
      label: 'Tournaments',
      badge: 2
    },
    { 
      key: 'coaches', 
      path: '/athlete/coaches', 
      icon: Users, 
      label: 'Find Coaches',
      badge: null
    },
    { 
      key: 'stadiums', 
      path: '/athlete/stadiums', 
      icon: MapPin, 
      label: 'Stadiums',
      badge: null
    }
  ];

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
        navigate('/athlete/profile');
        break;
      case 'notifications':
        navigate('/athlete/announcements');
        setUnreadNotifications(0);
        break;
      case 'settings':
        navigate('/athlete/settings');
        break;
      case 'signout':
        console.log('Signing out...');
        navigate('/login');
        break;
      default:
        break;
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Main Navbar */}
      <div className="athlete-nav">
        {/* Left Section - Menu Button and Platform Name */}
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
        
        {/* Right Section - User Profile Dropdown */}
        <div className="nav-right">
          <div 
            className="user-profile"
            onClick={handleProfileClick}
            ref={dropdownRef}
          >
            <div className="user-avatar">
              <User size={20} />
            </div>
            <div className="user-info">
              <div className="user-name">Alex Johnson</div>
              <div className="user-role">Basketball • Intermediate</div>
            </div>
            <span className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>▼</span>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <div className="user-avatar-large">
                    <User size={24} />
                  </div>
                  <div className="user-details">
                    <div className="user-name">Alex Johnson</div>
                    <div className="user-email">alex.johnson@example.com</div>
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
              <User size={24} />
            </div>
            <div className="user-details-sidebar">
              <div className="user-name">Alex Johnson</div>
              <div className="user-sport">Basketball • Intermediate</div>
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
              <span>Profile Completion</span>
              <span>70%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '70%' }}></div>
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