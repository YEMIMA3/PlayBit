import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  User, 
  Bell, 
  Trophy, 
  Users, 
  LogOut,
  Settings,
  Menu,
  X,
  BarChart3,
  Megaphone,
  MapPin,
  MoreVertical,
  Home,
  Search,
  CheckCircle
} from 'lucide-react';

const AthleteNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  const menuItems = [
    { 
      key: 'dashboard', 
      path: '/athlete/dashboard', 
      icon: Home, 
      label: 'Dashboard',
      badge: null
    },
    { 
      key: 'announcements', 
      path: '/athlete/announcements', 
      icon: Megaphone, 
      label: 'Announcements',
      badge: null
    },
    { 
      key: 'groups', 
      path: '/athlete/groups', 
      icon: Users, 
      label: 'Groups',
      badge: null
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
      key: 'find-coaches', 
      path: '/athlete/find-coaches', 
      icon: Search, 
      label: 'Find Coaches',
      badge: null
    },
    { 
      key: 'stadium', 
      path: '/athlete/stadium', 
      icon: MapPin, 
      label: 'Stadium',
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

  const handleThreeDotsClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownItemClick = (action) => {
    setShowDropdown(false);
    switch (action) {
      case 'profile':
        navigate('/athlete/profile');
        break;
      case 'settings':
        navigate('/athlete/settings');
        break;
      case 'signout':
        console.log('Athlete signing out...');
        navigate('/auth');
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
            <span className="logo-icon">🏀</span>
            <span className="platform-name">Athlete Platform</span>
          </div>
        </div>
        
        {/* Center Section - User Info */}
        <div className="nav-center">
          <div className="athlete-info">
            <div className="athlete-name">Alex Johnson</div>
            <div className="athlete-sport">Basketball - Intermediate</div>
          </div>
        </div>
        
        {/* Right Section - Three Dots Menu */}
        <div className="nav-right">
          <div 
            className="three-dots-menu"
            onClick={handleThreeDotsClick}
            ref={dropdownRef}
          >
            <button className="dots-button">
              <MoreVertical size={24} />
            </button>

            {/* Animated Dropdown Menu */}
            <div className={`dropdown-menu ${showDropdown ? 'open' : ''}`}>
              <div className="dropdown-header">
                <div className="user-avatar-large">
                  <User size={24} />
                </div>
                <div className="user-details">
                  <div className="user-name">Alex Johnson</div>
                  <div className="user-email">alex@athlete.com</div>
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
                  <div className="profile-completion">
                    <div className="completion-bar">
                      <div className="completion-fill" style={{ width: '70%' }}></div>
                    </div>
                    <span>70%</span>
                  </div>
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
          </div>
        </div>
      </div>

      {/* Dropdown Sidebar */}
      <div 
        ref={sidebarRef}
        className={`dropdown-sidebar ${sidebarOpen ? 'open' : ''}`}
      >
        <div className="sidebar-content">
          {/* User Info Section */}
          <div className="sidebar-user-section">
            <div className="user-avatar-sidebar">
              <User size={32} />
            </div>
            <div className="user-info-sidebar">
              <div className="user-name">Alex Johnson</div>
              <div className="user-sport">Basketball - Intermediate</div>
              <div className="profile-completion-sidebar">
                <div className="completion-info">
                  <span>Profile Completion</span>
                  <span>70%</span>
                </div>
                <div className="completion-bar-sidebar">
                  <div className="completion-fill-sidebar" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="sidebar-nav">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  className={`nav-item ${activeItem === item.key ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.path, item.key)}
                >
                  <div className="nav-item-content">
                    <div className="nav-icon">
                      <Icon size={20} />
                    </div>
                    <span className="nav-label">{item.label}</span>
                    {item.badge && (
                      <span className="nav-badge">{item.badge}</span>
                    )}
                  </div>
                  {activeItem === item.key && (
                    <div className="active-indicator">
                      <CheckCircle size={16} />
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="sidebar-actions">
            <button className="action-button primary">
              <Trophy size={18} />
              <span>Join Tournament</span>
            </button>
            <button className="action-button secondary">
              <Users size={18} />
              <span>Find Group</span>
            </button>
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

      <style jsx>{`
        .athlete-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          color: #1e293b;
          padding: 1rem 2rem;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
          border-bottom: 1px solid #e2e8f0;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          height: 80px;
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .nav-center {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .nav-right {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          position: relative;
        }

        .menu-toggle {
          background: none;
          border: none;
          color: #475569;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          border: 1px solid #e2e8f0;
        }

        .menu-toggle:hover {
          background-color: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .platform-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-icon {
          font-size: 1.75rem;
        }

        .platform-name {
          font-weight: 700;
          font-size: 1.5rem;
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .athlete-info {
          text-align: center;
        }

        .athlete-name {
          font-weight: 600;
          font-size: 1.1rem;
          color: #1e293b;
        }

        .athlete-sport {
          font-size: 0.9rem;
          color: #64748b;
        }

        .three-dots-menu {
          position: relative;
        }

        .dots-button {
          background: none;
          border: none;
          color: #475569;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          border: 1px solid #e2e8f0;
        }

        .dots-button:hover {
          background-color: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          width: 300px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          margin-top: 0.5rem;
          z-index: 1001;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          transform: translateY(-10px);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .dropdown-menu.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .dropdown-header {
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 1px solid #e2e8f0;
        }

        .user-avatar-large {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
          color: white;
        }

        .user-details {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-weight: 600;
          color: #1e293b;
          font-size: 1rem;
        }

        .user-email {
          font-size: 0.85rem;
          color: #64748b;
        }

        .dropdown-divider {
          height: 1px;
          background: #e2e8f0;
        }

        .dropdown-items {
          padding: 0.5rem 0;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.25rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          color: #475569;
          background: white;
        }

        .dropdown-item:hover {
          background: #f8fafc;
          color: #2563eb;
        }

        .dropdown-item.signout {
          color: #dc2626;
        }

        .dropdown-item.signout:hover {
          background: #fef2f2;
          color: #dc2626;
        }

        .profile-completion {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-left: auto;
          font-size: 0.8rem;
          color: #64748b;
        }

        .completion-bar {
          width: 60px;
          height: 4px;
          background: #e2e8f0;
          border-radius: 2px;
          overflow: hidden;
        }

        .completion-fill {
          height: 100%;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 2px;
        }

        .dropdown-badge {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          border-radius: 12px;
          padding: 0.2rem 0.5rem;
          font-size: 0.7rem;
          font-weight: 600;
          position: absolute;
          right: 1.25rem;
        }

        /* Dropdown Sidebar Styles */
        .dropdown-sidebar {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          background: white;
          border-radius: 0 0 20px 20px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          border: 1px solid #e2e8f0;
          border-top: none;
          z-index: 999;
          transform: translateY(-100%);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          max-height: 70vh;
          overflow-y: auto;
        }

        .dropdown-sidebar.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .sidebar-content {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .sidebar-user-section {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-radius: 16px;
          margin-bottom: 2rem;
          border: 1px solid #e2e8f0;
        }

        .user-avatar-sidebar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
          color: white;
          flex-shrink: 0;
        }

        .user-info-sidebar {
          flex: 1;
        }

        .user-name {
          font-weight: 700;
          font-size: 1.25rem;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }

        .user-sport {
          font-size: 0.9rem;
          color: #64748b;
          margin-bottom: 1rem;
        }

        .profile-completion-sidebar {
          background: white;
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .completion-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .completion-info span:first-child {
          color: #64748b;
        }

        .completion-info span:last-child {
          color: #2563eb;
          font-weight: 600;
        }

        .completion-bar-sidebar {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .completion-fill-sidebar {
          height: 100%;
          background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .sidebar-nav {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          background: white;
          border: 2px solid #f1f5f9;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #475569;
        }

        .nav-item:hover {
          border-color: #3b82f6;
          background: #f8fafc;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
        }

        .nav-item.active {
          border-color: #2563eb;
          background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
          color: white;
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.2);
        }

        .nav-item-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
        }

        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
        }

        .nav-label {
          font-weight: 500;
          font-size: 0.95rem;
        }

        .nav-badge {
          background: #ef4444;
          color: white;
          border-radius: 8px;
          padding: 0.2rem 0.6rem;
          font-size: 0.75rem;
          font-weight: 600;
          margin-left: auto;
        }

        .active-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 1rem;
        }

        .sidebar-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .action-button.primary {
          background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
          color: white;
        }

        .action-button.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.3);
        }

        .action-button.secondary {
          background: white;
          color: #475569;
          border: 2px solid #e2e8f0;
        }

        .action-button.secondary:hover {
          border-color: #3b82f6;
          color: #2563eb;
          transform: translateY(-2px);
        }

        .sidebar-overlay {
          position: fixed;
          top: 80px;
          left: 0;
          width: 100%;
          height: calc(100vh - 80px);
          background-color: rgba(0, 0, 0, 0.4);
          z-index: 998;
        }

        @media (max-width: 768px) {
          .athlete-nav {
            padding: 1rem;
            height: 70px;
          }

          .dropdown-sidebar {
            top: 70px;
            border-radius: 0 0 16px 16px;
          }

          .sidebar-content {
            padding: 1.5rem;
          }

          .sidebar-user-section {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .sidebar-nav {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }

          .sidebar-actions {
            flex-direction: column;
          }

          .platform-name {
            font-size: 1.25rem;
          }
          
          .athlete-info {
            display: none;
          }

          .dropdown-menu {
            width: 280px;
            right: -50%;
            transform: translate(-50%, -10px);
          }

          .dropdown-menu.open {
            transform: translate(-50%, 0);
          }
        }

        @media (max-width: 480px) {
          .sidebar-content {
            padding: 1rem;
          }

          .nav-item {
            padding: 0.875rem 1rem;
          }

          .dropdown-menu {
            width: 250px;
          }
          
          .nav-left {
            gap: 0.5rem;
          }
          
          .platform-name {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </>
  );
};

export default AthleteNav;