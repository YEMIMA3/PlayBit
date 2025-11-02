import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  User, 
  LogOut,
  Menu,
  X,
  BarChart3,
  Users,
  Shield,
  ShieldCheck,
  Database
} from 'lucide-react';
import '../../styles/admin/adminnav.scss';

const AdminNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeItem, setActiveItem] = useState('tournaments');
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    role: '',
    permissions: [],
    profileImage: ''
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  // Navigation items - Only the three you wanted
  const menuItems = [
    { key: 'tournaments', path: '/admin/tournaments', icon: BarChart3, label: 'Tournaments' },
    { key: 'athletes', path: '/admin/athlete', icon: Users, label: 'Athlete Management', badge: 12 },
    { key: 'coaches', path: '/admin/coaches', icon: Shield, label: 'Coach Management', badge: 8 }
  ];

  // Load admin data from localStorage
  useEffect(() => {
    const loadAdminData = () => {
      try {
        const storedAdminData = localStorage.getItem('admin_data');
        if (storedAdminData) {
          const parsedData = JSON.parse(storedAdminData);
          setAdminData({
            name: parsedData.name || 'Administrator',
            email: parsedData.email || '',
            role: parsedData.role || 'System Admin',
            permissions: parsedData.permissions || [],
            profileImage: parsedData.profileImage || ''
          });
        } else {
          // Default admin data for demo
          setAdminData({
            name: 'admin',
            email: 'admin123@gmail.com',
            role: 'System Administrator',
            permissions: ['users', 'coaches', 'venues', 'billing'],
            profileImage: ''
          });
        }
      } catch (error) {
        console.error('Error loading admin data for nav:', error);
      }
    };

    loadAdminData();
  }, []);

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
      case 'signout':
        handleSignOut();
        break;
      default:
        break;
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_data');
    navigate('/admin/auth');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getDisplayName = () => {
    if (!adminData.name) return 'Admin';
    return adminData.name.split(' ')[0];
  };

  const getFullName = () => {
    return adminData.name || 'Administrator';
  };

  const getAdminRole = () => {
    return adminData.role || 'System Admin';
  };

  // Calculate system stats
  const getSystemStats = () => {
    return {
      totalUsers: 1250,
      pendingApprovals: 23,
      systemHealth: 98
    };
  };

  const stats = getSystemStats();

  return (
    <>
      {/* Main Navbar */}
      <div className="admin-nav">
        {/* Left Section */}
        <div className="nav-left">
          <button 
            className="menu-toggle"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="platform-brand">
            <span className="logo-icon">⚙️</span>
            <span className="platform-name">Admin Portal</span>
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
              {adminData.profileImage ? (
                <img 
                  src={adminData.profileImage} 
                  alt={getDisplayName()}
                />
              ) : (
                <ShieldCheck size={20} />
              )}
            </div>
            <div className="user-info">
              <div className="user-name">{getDisplayName()}</div>
              <div className="user-role">{getAdminRole()}</div>
            </div>
            <span className={`dropdown-arrow ${showDropdown ? 'rotated' : ''}`}>
              ▼
            </span>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <div className="user-avatar-large">
                    {adminData.profileImage ? (
                      <img 
                        src={adminData.profileImage} 
                        alt={getFullName()}
                      />
                    ) : (
                      <ShieldCheck size={24} />
                    )}
                  </div>
                  <div className="user-details">
                    <div className="user-name">{getFullName()}</div>
                    <div className="user-email">
                      {adminData.email || 'admin123@gmail.com'}
                    </div>
                    <div className="user-role-badge">{getAdminRole()}</div>
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
              {adminData.profileImage ? (
                <img 
                  src={adminData.profileImage} 
                  alt={getDisplayName()}
                />
              ) : (
                <ShieldCheck size={24} />
              )}
            </div>
            <div className="user-details-sidebar">
              <div className="user-name">{getDisplayName()}</div>
              <div className="user-role">{getAdminRole()}</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="sidebar-nav">
            {menuItems.map((item) => {
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

          {/* System Stats */}
          <div className="sidebar-stats">
            <div className="stats-header">
              <Database size={18} />
              <span>System Overview</span>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">{stats.totalUsers}</span>
                <span className="stat-label">Total Users</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.pendingApprovals}</span>
                <span className="stat-label">Pending</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.systemHealth}%</span>
                <span className="stat-label">System Health</span>
              </div>
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