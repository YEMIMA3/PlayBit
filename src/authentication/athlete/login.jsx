import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AthleteLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      console.log('🔄 Attempting login with:', { email: formData.email });
      
      // Updated to port 5000
      const response = await fetch('http://localhost:3000/api/auth/athlete/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      console.log('📡 Response Status:', response.status);
      
      const data = await response.json();
      console.log('📡 Response Data:', data);
      
      if (response.ok && data.success) {
        // Store token and athlete data in localStorage
        localStorage.setItem('athlete_token', data.token);
        
        // Store the athlete data from credentials collection
        localStorage.setItem('athlete_data', JSON.stringify(data.athlete));
        
        setMessage({ type: 'success', text: data.message || 'Login successful! Redirecting...' });
        
        // Redirect to athlete dashboard with user data
        setTimeout(() => {
          navigate('/athlete/dashboard', { 
            state: { 
              athlete: data.athlete,
              hasProfile: data.hasProfile || false
            }
          });
        }, 1500);
      } else {
        // Handle different error cases
        let errorMessage = data.message || 'Login failed';
        
        if (response.status === 401) {
          errorMessage = 'Invalid email or password. Please check your credentials.';
        } else if (response.status === 404) {
          errorMessage = 'Account not found. Please check your email or sign up.';
        }
        
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Updated to port 5000
      const response = await fetch('http://localhost:3000/api/auth/athlete/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage({ 
          type: 'success', 
          text: data.message || `Password reset instructions sent to ${formData.email}` 
        });
        setForgotPassword(false);
      } else {
        throw new Error(data.message || 'Failed to send reset email');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of your JSX remains the same
  return (
    <motion.div 
      className="athlete-login-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="login-header"
      >
        <h2 className="text-dark">Welcome Back, Athlete!</h2>
        <p className="text-muted">Sign in to access your training dashboard</p>
      </motion.div>
      
      {message.text && (
        <motion.div 
          className={`alert-message ${message.type}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <span className="message-icon">
            {message.type === 'success' ? '✓' : '⚠'}
          </span>
          {message.text}
        </motion.div>
      )}
      
      {!forgotPassword ? (
        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="form-input"
            />
          </div>

          <motion.button 
            type="submit" 
            className={`login-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
            whileHover={!isLoading ? { scale: 1.02, boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)" } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <span>Authenticating...</span>
              </div>
            ) : (
              <>
                <span>Login to Dashboard</span>
                <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </motion.button>

          <div className="form-footer">
            <button 
              type="button"
              className="link-btn"
              onClick={() => setForgotPassword(true)}
              disabled={isLoading}
              style={{ 
                backgroundColor: "transparent", 
                border: "none", 
                color: "#2e7d32",
                fontSize: "14px", 
                cursor: "pointer", 
                textDecoration: "underline", 
                fontWeight: 600, 
                transition: "color 0.3s ease",
                marginLeft: "120px",
                marginTop: "10px" 
              }}
            >
              Forgot your password?
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.form 
          onSubmit={handleForgotPassword}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="forgot-password-header">
            <button 
              type="button"
              className="back-button"
              onClick={() => setForgotPassword(false)}
              disabled={isLoading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h3>Reset Your Password</h3>
          </div>

          <div className="form-group">
            <label htmlFor="reset-email" className="form-label">Email Address</label>
            <input
              id="reset-email"
              type="email"
              name="email"
              placeholder="Enter your registered email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="form-input"
            />
            <p className="input-hint">
              We'll send reset instructions to this email
            </p>
          </div>

          <motion.button 
            type="submit" 
            className={`login-btn secondary ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <span>Sending instructions...</span>
              </div>
            ) : (
              'Send Reset Instructions'
            )}
          </motion.button>
        </motion.form>
      )}
    </motion.div>
  );
};

export default AthleteLogin;