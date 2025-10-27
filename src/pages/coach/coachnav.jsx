import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../../styles/coach/coachnav.scss";

const CoachNav = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const navItems = [
    { 
      key: 'dashboard', 
      path: '/coach/dashboard', 
      icon: '📊', 
      label: 'Dashboard',
      badge: null
    },
    { 
      key: 'requests', 
      path: '/coach/requests', 
      icon: '📋', 
      label: 'Requests',
      badge: 3
    },
    { 
      key: 'groups', 
      path: '/coach/groups', 
      icon: '👥', 
      label: 'Groups',
      badge: null
    },
    { 
      key: 'progress', 
      path: '/coach/progress', 
      icon: '📈', 
      label: 'Progress',
      badge: null
    },
    { 
      key: 'tournaments', 
      path: '/coach/tournaments', 
      icon: '🏆', 
      label: 'Tournaments',
      badge: 1
    },
    { 
      key: 'schedule', 
      path: '/coach/schedule', 
      icon: '🗓️', 
      label: 'Schedule',
      badge: 1
    },
    {
      key:'venue',
      path:'/coach/stadium',
      icon:'📍',
      label:'Venue',
      badge:1
    }
  ];

  // Update active item based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const activeNav = navItems.find(item => currentPath.includes(item.key));
    if (activeNav) {
      setActiveItem(activeNav.key);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (path, key, e) => {
    e.preventDefault();
    setActiveItem(key);
    navigate(path);
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
      case 'notifications':
        navigate('/coach/notifications');
        break;
      case 'signout':
        // Handle sign out logic here
        console.log('Signing out...');
        navigate('/login');
        break;
      default:
        break;
    }
  };

  return (
    <div className={`coach-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-left">
        <span className="platform-name">Coach Platform</span>
      </div>
      
      <div className="nav-center">
        <nav className="nav-menu">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.path}
              className={`nav-item ${activeItem === item.key ? 'active' : ''}`}
              onClick={(e) => handleNavClick(item.path, item.key, e)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
              {item.badge && (
                <span className="notification-badge">{item.badge}</span>
              )}
            </a>
          ))}
        </nav>
      </div>
      
      <div className="nav-right">
        <div 
          className="user-profile"
          onClick={handleProfileClick}
          ref={dropdownRef}
        >
          <div className="user-avatar">CM</div>
          <div className="user-info">
            <div className="user-name">Coach Mike</div>
            <div className="user-role">Professional Coach</div>
          </div>
          <span className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>▼</span>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <div className="user-avatar-large">CM</div>
                <div className="user-details">
                  <div className="user-name">Coach Mike</div>
                  <div className="user-email">coach.mike@example.com</div>
                </div>
              </div>
              
              <div className="dropdown-divider"></div>
              
              <div className="dropdown-items">
                <div 
                  className="dropdown-item"
                  onClick={() => handleDropdownItemClick('profile')}
                >
                  <span className="item-icon">👤</span>
                  <span>My Profile</span>
                </div>
                
                <div 
                  className="dropdown-item"
                  onClick={() => handleDropdownItemClick('notifications')}
                >
                  <span className="item-icon">🔔</span>
                  <span>Notifications</span>
                </div>
                
                
                <div className="dropdown-divider"></div>
                
                <div 
                  className="dropdown-item signout"
                  onClick={() => handleDropdownItemClick('signout')}
                >
                  <span className="item-icon">🚪</span>
                  <span>Sign Out</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoachNav;