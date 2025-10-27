import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CoachSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    sport: '',
    experience: '',
    isCertified: false
  });

  const [isLoading, setIsLoading] = useState(false);

  const sports = ['Football', 'Basketball', 'Tennis', 'Swimming', 'Cricket', 'Athletics'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.isCertified) {
      alert('Please accept the certification agreement to continue.');
      return;
    }

    setIsLoading(true);
    console.log('Coach Signup:', formData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirect to document verification
    navigate('/coach/auth/verify');
    setIsLoading(false);
  };

  return (
    <div className="coach-signup-form glass-card">
      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
          <label>Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            disabled={isLoading}
          />
        </motion.div>

        <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
          <label>Email *</label>
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
          <label>Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Create a strong password"
            disabled={isLoading}
          />
        </motion.div>

        <motion.div className="form-group">
          <label>Primary Sport *</label>
          <select
            name="sport"
            value={formData.sport}
            onChange={handleChange}
            required
            disabled={isLoading}
          >
            <option value="">Select your sport</option>
            {sports.map(sport => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
        </motion.div>

        <motion.div className="form-group">
          <label>Years of Experience *</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            min="0"
            placeholder="e.g., 5"
            disabled={isLoading}
          />
        </motion.div>

        <motion.div 
          className="certification-checkbox"
          whileHover={!isLoading ? { scale: 1.05 } : {}}
        >
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isCertified"
              checked={formData.isCertified}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            <span className="checkmark"></span>
            I am a certified coach and will provide proof
          </label>
        </motion.div>

        <motion.button 
          type="submit" 
          className="signup-btn"
          disabled={!formData.isCertified || isLoading}
          whileHover={(!isLoading && formData.isCertified) ? { scale: 1.05 } : {}}
          whileTap={(!isLoading && formData.isCertified) ? { scale: 0.95 } : {}}
        >
          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              Processing...
            </div>
          ) : (
            formData.isCertified ? 'Continue to Verification →' : 'Please Accept Certification'
          )}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default CoachSignup;