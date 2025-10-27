import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Trophy, 
  Users, 
  MapPin, 
  BarChart3,
  LogOut,
  Settings
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/athlete/athlete-sidebar.scss';

const AthleteSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/athlete/profile', icon: User, label: 'Profile' },
    { path: '/athlete/announcements', icon: Bell, label: 'Announcements' },
    { path: '/athlete/progress', icon: BarChart3, label: 'Progress' },
    { path: '/athlete/tournaments', icon: Trophy, label: 'Tournaments' },
    { path: '/athlete/coaches', icon: Users, label: 'Find Coaches' },
    { path: '/athlete/stadiums', icon: MapPin, label: 'Stadiums' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    console.log('Navigating to:', path);
    navigate(path);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
    // Add settings functionality here
    alert('Settings feature coming soon!');
  };

  const handleLogoutClick = () => {
    console.log('Logout clicked');
    if (window.confirm('Are you sure you want to logout?')) {
      // Add logout functionality here
      navigate('/');
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          className="sidebar-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className={`athlete-sidebar ${isOpen ? 'open' : ''}`}
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="sidebar-header">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigation('/athlete/profile')}
            style={{ cursor: 'pointer' }}
          >
            <div className="logo-icon">⚡</div>
            <div className="logo-text">
              <h2>PlayBit</h2>
              <span>Athlete Portal</span>
            </div>
          </motion.div>
        </div>

        {/* User Profile Quick View */}
        <motion.div 
          className="user-quickview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="user-avatar">
            <User size={24} />
          </div>
          <div className="user-info">
            <h4>Alex Johnson</h4>
            <span>Basketball • Intermediate</span>
          </div>
        </motion.div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.path}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => handleNavigation(item.path)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ 
                  x: 5,
                  backgroundColor: isActive(item.path) ? 'rgba(59, 130, 246, 0.9)' : 'rgba(59, 130, 246, 0.1)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="nav-icon">
                  <Icon size={20} />
                </div>
                <span className="nav-label">{item.label}</span>
                {isActive(item.path) && (
                  <motion.div 
                    className="active-indicator"
                    layoutId="activeIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="sidebar-footer">
          {/* Settings Button */}
          <motion.button
            className="nav-item settings-btn"
            onClick={handleSettingsClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ 
              x: 5,
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              scale: 1.02
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="nav-icon">
              <Settings size={20} />
            </div>
            <span className="nav-label">Settings</span>
            <motion.div 
              className="button-hover-effect"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
          </motion.button>
          
          {/* Logout Button */}
          <motion.button
            className="nav-item logout-btn"
            onClick={handleLogoutClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ 
              x: 5,
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              scale: 1.02
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="nav-icon">
              <LogOut size={20} />
            </div>
            <span className="nav-label">Logout</span>
            <motion.div 
              className="button-hover-effect logout-effect"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
          </motion.button>
        </div>

        {/* Progress Indicator */}
        <motion.div 
          className="progress-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: '70%' }}
              transition={{ duration: 1, delay: 0.7 }}
            />
          </div>
          <span>Profile 70% Complete</span>
        </motion.div>
      </motion.div>
    </>
  );
};

export default AthleteSidebar;