import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CoachLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:3000/api/auth/coach/login', {
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
        localStorage.setItem('coach_token', data.token);
        localStorage.setItem('coach_data', JSON.stringify(data.coach));
        setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
        
        // Redirect after success message
        setTimeout(() => {
          navigate('/coach/dashboard');
        }, 1000);
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage({ type: 'error', text: `Login failed: ${error.message}` });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:3000/api/auth/coach/forgot-password', {
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
          text: `Password reset instructions sent to ${formData.email}` 
        });
        setForgotPassword(false);
      } else {
        throw new Error(data.message || 'Failed to send reset email');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setMessage({ type: 'error', text: `Failed to send reset email: ${error.message}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="coach-login-form glass-card">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-dark">
          {forgotPassword ? 'Reset Your Password' : 'Coach Login'}
        </h2>
        
        {message.text && (
          <div className={`${message.type}-message`}>
            {message.text}
          </div>
        )}

        {!forgotPassword ? (
          <form onSubmit={handleSubmit}>
            <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="coach@example.com"
                disabled={isLoading}
              />
            </motion.div>

            <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </motion.div>

            <motion.button 
              type="submit" 
              className="login-btn"
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.05 } : {}}
              whileTap={!isLoading ? { scale: 0.95 } : {}}
            >
              {isLoading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  Logging in...
                </div>
              ) : (
                'Login to Coach Account'
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
            <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your registered email"
                disabled={isLoading}
              />
            </motion.div>

            <motion.button 
              type="submit" 
              className="login-btn"
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.05 } : {}}
              whileTap={!isLoading ? { scale: 0.95 } : {}}
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
    </div>
  );
};

export default CoachLogin;