import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoachSignup from './signup';
import CoachLogin from './login';
import '../../styles/coach/coach-auth.scss';

const CoachAuth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="coach-auth-container">
      {/* Animated Background */}
      <div className="coach-animated-bg">
        <div className="coach-floating-shape shape-1"></div>
        <div className="coach-floating-shape shape-2"></div>
        <div className="coach-floating-shape shape-3"></div>
      </div>

      <motion.div 
        className="coach-glass-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="coach-auth-header">
          <motion.h1 
            className="coach-auth-title"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            Coach <span className="coach-accent-text">Portal</span>
          </motion.h1>
          <p className="coach-auth-subtitle">
            {isLogin ? 'Welcome back to your coaching dashboard' : 'Join our platform and start coaching today'}
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="coach-auth-toggle">
          <button
            className={`coach-toggle-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`coach-toggle-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
          <motion.div 
            className="coach-toggle-slider"
            animate={{ x: isLogin ? 0 : '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Form Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'signup'}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="form-wrapper"
          >
            {isLogin ? <CoachLogin /> : <CoachSignup />}
          </motion.div>
        </AnimatePresence>

        {/* Additional Info */}
        <motion.div 
          className="coach-auth-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Why Join as a Coach?</h3>
          <ul>
            <li>✓ Reach more athletes</li>
            <li>✓ Manage your schedule</li>
            <li>✓ Build your coaching brand</li>
            <li>✓ Get paid securely</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CoachAuth;