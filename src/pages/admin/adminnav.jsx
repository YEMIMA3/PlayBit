import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  User, 
  Bell, 
  Trophy, 
  Users, 
  BarChart3,
  LogOut,
  Settings,
  Menu,
  X,
  Shield,
  LayoutDashboard,
  UserCheck
} from 'lucide-react';
import '../../styles/admin/admin-auth.scss';

const AdminNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [unreadNotifications, setUnreadNotifications] = useState(5);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  const menuItems = [
    { 
      key: 'dashboard', 
      path: '/admin/dashboard', 
      icon: LayoutDashboard, 
      label: 'Dashboard',
      badge: null
    },
    { 
      key: 'tournaments', 
      path: '/admin/tournaments', 
      icon: Trophy, 
      label: 'Tournaments',
      badge: 2
    },
    { 
      key: 'coaches', 
      path: '/admin/coaches', 
      icon: UserCheck, 
      label: 'Coaches',
      badge: null
    },
    { 
      key: 'athlete', 
      path: '/admin/athlete', 
      icon: Users, 
      label: 'Athletes',
      badge: 12
    },
    { 
      key: 'announcements', 
      path: '/admin/announcements', 
      icon: Bell, 
      label: 'Announcements',
      badge: 5
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
        navigate('/admin/profile');
        break;
      case 'notifications':
        navigate('/admin/announcements');
        setUnreadNotifications(0);
        break;
      case 'settings':
        navigate('/admin/settings');
        break;
      case 'signout':
        console.log('Admin signing out...');
        navigate('/admin/auth');
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
      <div className="admin-nav">
        {/* Left Section - Menu Button and Platform Name */}
        <div className="nav-left">
          <button 
            className="menu-toggle"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="platform-brand">
            <span className="logo-icon">🛡️</span>
            <span className="platform-name">Admin Platform</span>
          </div>
        </div>
        
        {/* Right Section - User Profile Dropdown */}
        <div className="nav-right">
          <div 
            className="user-profile"
            onClick={handleProfileClick}
            ref={dropdownRef}
          >
            <div className="user-avatar admin-avatar">
              <Shield size={20} />
            </div>
            <div className="user-info">
              <div className="user-name">Admin User</div>
              <div className="user-role">System Administrator</div>
            </div>
            <span className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>▼</span>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <div className="user-avatar-large admin-avatar">
                    <Shield size={24} />
                  </div>
                  <div className="user-details">
                    <div className="user-name">Admin User</div>
                    <div className="user-email">admin@platform.com</div>
                  </div>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <div className="dropdown-items">
                  <div 
                    className="dropdown-item"
                    onClick={() => handleDropdownItemClick('profile')}
                  >
                    <User size={16} />
                    <span>Admin Profile</span>
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
                    <span>System Settings</span>
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
        className={`dropdown-sidebar admin-sidebar ${sidebarOpen ? 'open' : ''}`}
      >
        <div className="sidebar-content">
          <div className="sidebar-user-info">
            <div className="user-avatar-sidebar admin-avatar">
              <Shield size={24} />
            </div>
            <div className="user-details-sidebar">
              <div className="user-name">Admin User</div>
              <div className="user-sport">System Administrator</div>
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
              <span>System Status</span>
              <span>Online</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill online" style={{ width: '100%' }}></div>
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

export default AdminNav;