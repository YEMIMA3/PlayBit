import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLogin from './AdminLogin';
import AdminSignup from './AdminSignup';
import ForgotPassword from './ForgotPassword';
import '../../../styles/admin/admin-auth.scss';

const AdminAuth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <div className="admin-auth-container">
      {/* Enhanced Animated Background */}
      <div className="admin-animated-bg">
        <div className="admin-floating-shape shape-1"></div>
        <div className="admin-floating-shape shape-2"></div>
        <div className="admin-floating-shape shape-3"></div>
        <div className="admin-floating-shape shape-4"></div>
        <div className="admin-floating-shape shape-5"></div>
        
        {/* Animated Particles */}
        <div className="particles-container">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="particle" style={{'--i': i}}></div>
          ))}
        </div>
        
        {/* Glowing Orbs */}
        <div className="glowing-orb orb-1"></div>
        <div className="glowing-orb orb-2"></div>
        <div className="glowing-orb orb-3"></div>
      </div>

      <motion.div 
        className="admin-glass-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* Enhanced Header */}
        <div className="admin-auth-header">
          <motion.div
            className="logo-container"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <div className="logo-icon">⚡</div>
          </motion.div>
          
          <motion.h1 
            className="admin-auth-title"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            Admin <span className="admin-accent-text">Access</span>
          </motion.h1>
          
          <motion.p 
            className="admin-auth-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Secure System Management
          </motion.p>
          
          <motion.div 
            className="admin-badges"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.span 
              className="admin-badge"
              whileHover={{ scale: 1.05, y: -2 }}
            >🔒 Secure</motion.span>
            <motion.span 
              className="admin-badge"
              whileHover={{ scale: 1.05, y: -2 }}
            >⚡ Fast</motion.span>
            <motion.span 
              className="admin-badge"
              whileHover={{ scale: 1.05, y: -2 }}
            >🛡️ Protected</motion.span>
          </motion.div>
        </div>

        {!showForgotPassword ? (
          <>
            {/* Enhanced Toggle Switch */}
            <motion.div 
              className="admin-auth-toggle"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="toggle-container">
                <button
                  className={`admin-toggle-btn ${activeTab === 'login' ? 'active' : ''}`}
                  onClick={() => setActiveTab('login')}
                >
                  <motion.span
                    animate={{ color: activeTab === 'login' ? '#fff' : '#6b7280' }}
                  >
                    Login
                  </motion.span>
                </button>
                <button
                  className={`admin-toggle-btn ${activeTab === 'signup' ? 'active' : ''}`}
                  onClick={() => setActiveTab('signup')}
                >
                  <motion.span
                    animate={{ color: activeTab === 'signup' ? '#fff' : '#6b7280' }}
                  >
                    Create Admin
                  </motion.span>
                </button>
                <motion.div 
                  className="admin-toggle-slider"
                  animate={{ x: activeTab === 'login' ? 0 : '100%' }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              </div>
            </motion.div>

            {/* Form Container */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                {activeTab === 'login' ? (
                  <AdminLogin onForgotPassword={() => setShowForgotPassword(true)} />
                ) : (
                  <AdminSignup />
                )}
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <ForgotPassword onBack={() => setShowForgotPassword(false)} />
        )}
      </motion.div>
    </div>
  );
};

export default AdminAuth;