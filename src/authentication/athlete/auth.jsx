import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AthleteSignup from './signup';
import AthleteLogin from './login';
import '../../styles/athlete/athlete-auth.scss';

const AthleteAuth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="athlete-auth-container">
      {/* Animated Background */}
      <div className="athlete-animated-bg">
        <div className="athlete-floating-shape shape-1"></div>
        <div className="athlete-floating-shape shape-2"></div>
        <div className="athlete-floating-shape shape-3"></div>
      </div>

      <motion.div 
        className="athlete-glass-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="athlete-auth-header">
          <motion.h1 
            className="athlete-auth-title"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            Athlete <span className="athlete-accent-text">Portal</span>
          </motion.h1>
          <p className="athlete-auth-subtitle">
            {isLogin ? 'Welcome back to your training dashboard' : 'Join our platform and elevate your performance'}
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="athlete-auth-toggle">
          <button
            className={`athlete-toggle-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`athlete-toggle-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
          <motion.div 
            className="athlete-toggle-slider"
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
            {isLogin ? <AthleteLogin /> : <AthleteSignup />}
          </motion.div>
        </AnimatePresence>

        {/* Additional Info */}
        <motion.div 
          className="athlete-auth-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Why Join as an Athlete?</h3>
          <ul>
            <li>✓ Find expert coaches</li>
            <li>✓ Track your progress</li>
            <li>✓ Access training programs</li>
            <li>✓ Connect with peers</li>
            <li>✓ Achieve your goals</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AthleteAuth;