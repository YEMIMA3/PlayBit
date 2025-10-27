import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bell } from 'lucide-react';
import { Outlet, useLocation } from 'react-router-dom';
import AthleteSidebar from './AthleteSidebar';
import '../../styles/athlete/athlete-layout.scss';

const AthleteLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications] = useState(3);
  const location = useLocation();

  // Get current page title for breadcrumb
  const getPageTitle = () => {
    if (location.pathname.includes('profile')) return 'Profile';
    if (location.pathname.includes('announcements')) return 'Announcements';
    return 'Dashboard';
  };

  return (
    <div className="athlete-layout">
      <AthleteSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      <div className="layout-content">
        <motion.header 
          className="layout-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="header-left">
            <motion.button
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
            
            <motion.div 
              className="breadcrumb"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span>Athlete Portal / {getPageTitle()}</span>
            </motion.div>
          </div>

          <div className="header-right">
            <motion.button
              className="notification-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell size={20} />
              {notifications > 0 && (
                <motion.span 
                  className="notification-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {notifications}
                </motion.span>
              )}
            </motion.button>

            <motion.div 
              className="user-menu"
              whileHover={{ scale: 1.02 }}
            >
              <div className="user-avatar">
                <span>AJ</span>
              </div>
              <div className="user-details">
                <span className="user-name">Alex Johnson</span>
                <span className="user-role">Athlete</span>
              </div>
            </motion.div>
          </div>
        </motion.header>

        <motion.main 
          className="layout-main"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Outlet /> {/* This renders the nested routes */}
        </motion.main>
      </div>
    </div>
  );
};

export default AthleteLayout;