import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import '../../styles/admin/admin-auth.scss';
import ForgotPassword from './forgotpassword.jsx';

const AdminAuth = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      console.log('✅ Admin already logged in, redirecting to tournaments...');
      navigate('/admin/tournaments', { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      console.log('🔐 Starting admin login process...');
      
      const response = await fetch('http://localhost:3000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      console.log('📡 Response status:', response.status);
      
      const data = await response.json();
      console.log('📦 Full response data:', data);
      
      if ((response.status === 200 || response.ok) && data.token) {
        console.log('✅ Admin login successful!');
        
        // Store admin token with correct key name
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminData', JSON.stringify(data.admin || data.user || {}));
        
        console.log('💾 Token stored, navigating to tournaments...');
        
        // Navigate to tournaments page
        navigate('/admin/tournaments', { replace: true });
        
      } else {
        console.error('❌ Login failed - API response:', data);
        setError(data.message || data.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('💥 Network error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-auth-container">
      {/* Background and styling remains the same */}
      <div className="admin-animated-bg">
        <div className="admin-floating-shape shape-1"></div>
        <div className="admin-floating-shape shape-2"></div>
        <div className="admin-floating-shape shape-3"></div>
        <div className="admin-floating-shape shape-4"></div>
        <div className="admin-floating-shape shape-5"></div>
        
        <div className="particles-container">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="particle" style={{'--i': i}}></div>
          ))}
        </div>
        
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
        {/* Header */}
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
            {showForgotPassword ? 'Reset Password' : 'Admin Access'}
            <span className="admin-accent-text">
              {showForgotPassword ? '' : ' Access'}
            </span>
          </motion.h1>
          
          <motion.p 
            className="admin-auth-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {showForgotPassword ? 'Recover your admin account' : 'Secure System Management'}
          </motion.p>
          
          {!showForgotPassword && (
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
          )}
        </div>

        {/* Back Button for Forgot Password */}
        {showForgotPassword && (
          <motion.button
            className="back-to-login-btn"
            onClick={() => setShowForgotPassword(false)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={16} />
            Back to Login
          </motion.button>
        )}

        {/* Login Form or Forgot Password Form */}
        <AnimatePresence mode="wait">
          {showForgotPassword ? (
            <motion.div
              key="forgot-password"
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <ForgotPassword onBack={() => setShowForgotPassword(false)} />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring", delay: 0.7 }}
            >
              <div className="admin-login-form glass-card">
                <motion.form 
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {error && (
                    <motion.div 
                      className="error-message"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {error}
                    </motion.div>
                  )}

                  <motion.div className="admin-form-group" whileFocus={{ scale: 1.02 }}>
                    <label>
                      <Mail size={18} />
                      Admin Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="admin@playbit.com"
                      disabled={isLoading}
                    />
                  </motion.div>

                  <motion.div className="admin-form-group" whileFocus={{ scale: 1.02 }}>
                    <label>
                      <Lock size={18} />
                      Password
                    </label>
                    <div className="password-input-wrapper">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter admin password"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </motion.div>

                  <motion.button 
                    type="submit" 
                    className="admin-login-btn"
                    disabled={isLoading}
                    whileHover={!isLoading ? { scale: 1.05 } : {}}
                    whileTap={!isLoading ? { scale: 0.95 } : {}}
                  >
                    {isLoading ? (
                      <div className="loading-spinner">
                        <div className="spinner"></div>
                        Accessing Admin Panel...
                      </div>
                    ) : (
                      'Access Admin Panel'
                    )}
                  </motion.button>

                  <div className="admin-auth-links">
                    <button
                      type="button"
                      className="forgot-password-link"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot Admin Password?
                    </button>
                  </div>

                  <motion.div 
                    className="security-notice"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="notice-icon">🛡️</div>
                    <p>Secure admin access only. All activities are logged and monitored.</p>
                  </motion.div>
                </motion.form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AdminAuth;