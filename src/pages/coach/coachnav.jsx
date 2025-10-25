import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../../styles/coach/coachnav.scss";

const CoachNav = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { 
      key: 'dashboard', 
      path: '/coach/dashboard', 
      icon: '📊', 
      label: 'Dashboard',
      badge: null
    },
    { 
      key: 'profile', 
      path: '/coach/profile', 
      icon: '👤', 
      label: 'Profile',
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

  const handleNavClick = (path, key, e) => {
    e.preventDefault();
    setActiveItem(key);
    navigate(path); // React Router navigation
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
        <div className="user-profile">
          <div className="user-avatar">CM</div>
          <div className="user-info">
            <div className="user-name">Coach Mike</div>
            <div className="user-role">Professional Coach</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachNav;