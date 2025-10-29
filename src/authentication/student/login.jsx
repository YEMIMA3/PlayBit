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

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Athlete Login Attempt:', formData);
      
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, always succeed and redirect
      // In real app, you'd check credentials and get token
      console.log('Login successful! Redirecting to dashboard...');
      
      // Redirect to athlete dashboard
      navigate('/athlete/dashboard');
      
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate password reset email
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Password reset email sent to:', formData.email);
      setForgotPassword(false);
      
    } catch (error) {
      console.error('Password reset error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Athlete Login</h2>
      
      {!forgotPassword ? (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <button 
            type="button"
            onClick={() => setForgotPassword(true)}
          >
            Forgot Password?
          </button>
        </form>
      ) : (
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Reset Password'}
          </button>
          <button 
            type="button"
            onClick={() => setForgotPassword(false)}
          >
            Back to Login
          </button>
        </form>
      )}
    </motion.div>
  );
};

export default AthleteLogin;