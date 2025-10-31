import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, X, Bell, Shield, Users, Settings, LogOut, 
  BarChart3, CheckSquare, Trophy, UserCheck, BookOpen 
} from 'lucide-react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/admin/tournaments', icon: Trophy, label: 'Tournaments' },
    { path: '/admin/coaches', icon: UserCheck, label: 'Coach Details' },
    { path: '/admin/students', icon: Users, label: 'Student Details' },
    { path: '/admin/coach-verification', icon: CheckSquare, label: 'Verify Coaches' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/admin/security', icon: Shield, label: 'Security' }
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // Add logout logic here
    navigate('/admin/auth');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <motion.div
        className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <div className="sidebar-header">
          <motion.div 
            className="admin-logo"
            whileHover={{ scale: 1.05 }}
          >
            <div className="logo-icon">
              <Shield size={28} />
            </div>
            <div className="logo-text">
              <h2>PlayBit</h2>
              <span>Admin Panel</span>
            </div>
          </motion.div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.path}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  x: 5,
                  backgroundColor: 'rgba(59, 130, 246, 0.1)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="nav-icon">
                  <Icon size={20} />
                </div>
                <span>{item.label}</span>
                {isActive(item.path) && (
                  <motion.div 
                    className="active-indicator"
                    layoutId="activeIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <motion.button 
            className="nav-item" 
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="nav-icon">
              <Settings size={20} />
            </div>
            <span>Settings</span>
          </motion.button>
          <motion.button 
            className="nav-item logout" 
            onClick={handleLogout}
            whileHover={{ x: 5, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="nav-icon">
              <LogOut size={20} />
            </div>
            <span>Logout</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="admin-content">
        <header className="admin-header">
          <div className="header-left">
            <motion.button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="menu-toggle"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Admin Portal
            </motion.h1>
          </div>
          <div className="header-right">
            <motion.button 
              className="notification-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </motion.button>
            <motion.div 
              className="admin-user"
              whileHover={{ scale: 1.02 }}
            >
              <div className="user-avatar">A</div>
              <span>Admin</span>
            </motion.div>
          </div>
        </header>

        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;