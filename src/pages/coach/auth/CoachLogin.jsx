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

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    try {
      console.log('Coach Login Attempt:', formData);
      
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, always succeed and redirect
      // In real app, you'd check credentials and get token
      console.log('Login successful! Redirecting to dashboard...');
      
      // Redirect to coach dashboard
      navigate('/coach/dashboard');
      
    } catch (error) {
      console.error('Login failed:', error);
      // You can add error handling here (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="coach-login-form glass-card">
      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
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
            'Login to Coach Portal'
          )}
        </motion.button>

        <p className="login-redirect">
          Don't have an account? <span onClick={() => window.location.reload()} style={{cursor: 'pointer', color: '#3b82f6', fontWeight: '600'}}>Sign up here</span>
        </p>

        {/* Demo Credentials Hint */}
        
      </motion.form>
    </div>
  );
};

export default CoachLogin;