import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPassword = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Password reset requested for:', email);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Password reset failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="forgot-password-success glass-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="success-icon">
          <CheckCircle size={48} />
        </div>
        <h3>Reset Link Sent!</h3>
        <p>We've sent a password reset link to your admin email. Please check your inbox.</p>
        <motion.button
          className="back-to-login-btn"
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Login
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="forgot-password-form glass-card"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <div className="forgot-password-header">
        <motion.button
          className="back-button"
          onClick={onBack}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={20} />
        </motion.button>
        <h3>Reset Admin Password</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <motion.div className="admin-form-group" whileFocus={{ scale: 1.02 }}>
          <label>
            <Mail size={18} />
            Admin Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your admin email"
            disabled={isLoading}
          />
        </motion.div>

        <p className="forgot-password-info">
          Enter your admin email address and we'll send you a link to reset your password.
        </p>

        <motion.button
          type="submit"
          className="reset-password-btn"
          disabled={isLoading || !email}
          whileHover={(!isLoading && email) ? { scale: 1.05 } : {}}
          whileTap={(!isLoading && email) ? { scale: 0.95 } : {}}
        >
          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              Sending Reset Link...
            </div>
          ) : (
            'Send Reset Link'
          )}
        </motion.button>
      </form>

      <div className="security-notice">
        <div className="notice-icon">🔐</div>
        <p>For security reasons, reset links expire in 1 hour.</p>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;