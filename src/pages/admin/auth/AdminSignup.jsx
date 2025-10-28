import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Shield, Eye, EyeOff } from 'lucide-react';

const AdminSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminKey: '',
    isSuperAdmin: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (formData.adminKey !== 'PLAYBIT_ADMIN_2024') {
      alert('Invalid admin key!');
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Admin Signup:', formData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Admin account created successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-signup-form glass-card">
      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div className="admin-form-group" whileFocus={{ scale: 1.02 }}>
          <label>
            <User size={18} />
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            disabled={isLoading}
          />
        </motion.div>

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
              placeholder="Create strong password"
              disabled={isLoading}
              minLength="8"
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

        <motion.div className="admin-form-group" whileFocus={{ scale: 1.02 }}>
          <label>
            <Lock size={18} />
            Confirm Password
          </label>
          <div className="password-input-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              disabled={isLoading}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </motion.div>

        <motion.div className="admin-form-group" whileFocus={{ scale: 1.02 }}>
          <label>
            <Shield size={18} />
            Admin Key
          </label>
          <input
            type="password"
            name="adminKey"
            value={formData.adminKey}
            onChange={handleChange}
            required
            placeholder="Enter admin authorization key"
            disabled={isLoading}
          />
          <small className="input-hint">Required for admin account creation</small>
        </motion.div>

        <motion.div 
          className="admin-privilege-checkbox"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isSuperAdmin"
              checked={formData.isSuperAdmin}
              onChange={handleChange}
              disabled={isLoading}
            />
            <span className="checkmark"></span>
            <div className="privilege-text">
              <strong>Super Admin Privileges</strong>
              <small>Full system access and user management</small>
            </div>
          </label>
        </motion.div>

        <motion.button 
          type="submit" 
          className="admin-signup-btn"
          disabled={isLoading || !formData.adminKey}
          whileHover={(!isLoading && formData.adminKey) ? { scale: 1.05 } : {}}
          whileTap={(!isLoading && formData.adminKey) ? { scale: 0.95 } : {}}
        >
          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              Creating Admin Account...
            </div>
          ) : (
            'Create Admin Account'
          )}
        </motion.button>

        <motion.p 
          className="admin-login-redirect"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Already have an admin account? <span onClick={() => window.location.reload()} style={{cursor: 'pointer', color: '#8b5cf6', fontWeight: '600'}}>Login here</span>
        </motion.p>
      </motion.form>
    </div>
  );
};

export default AdminSignup;