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

      const data = await response.json();
      
      if (data.success) {
        // Store token and athlete data in localStorage
        localStorage.setItem('athlete_token', data.token);
        localStorage.setItem('athlete_data', JSON.stringify(data.athlete));
        
        setMessage({ type: 'success', text: data.message || 'Login successful! Redirecting...' });
        
        // Redirect to athlete dashboard
        setTimeout(() => {
          navigate('/athlete/dashboard');
        }, 1000);
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
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

  return (
    <motion.div 
      className="athlete-login-form"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-dark">Athlete Login</h2>
      
      {message.text && (
        <div className={`${message.type}-message`}>
          {message.text}
        </div>
      )}
      
      {!forgotPassword ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <motion.button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                Logging in...
              </div>
            ) : (
              'Login to Dashboard'
            )}
          </motion.button>

          <div className="forgot-password">
            <button 
              type="button"
              className="link-btn"
              onClick={() => setForgotPassword(true)}
              disabled={isLoading}
            >
              Forgot Password?
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleForgotPassword}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <motion.button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                Sending...
              </div>
            ) : (
              'Send Reset Instructions'
            )}
          </motion.button>

          <div className="forgot-password">
            <button 
              type="button"
              className="link-btn"
              onClick={() => setForgotPassword(false)}
              disabled={isLoading}
            >
              ← Back to Login
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default AthleteLogin;