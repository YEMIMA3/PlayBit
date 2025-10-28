import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

const AdminLogin = ({ onForgotPassword }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
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
    
    try {
      console.log('Admin Login Attempt:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Admin login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-form glass-card">
      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
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
            onClick={onForgotPassword}
          >
            Forgot Admin Password?
          </button>
        </div>

        {/* Security Notice */}
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
  );
};

export default AdminLogin;