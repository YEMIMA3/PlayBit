import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AthleteSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    sport: '',
    experience: '',
    achievements: '',
    isCertified: false
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Athlete signup successful!');
      navigate('/athlete/verification');
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div whileHover={!isLoading ? { scale: 1.02 } : {}}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          disabled={isLoading}
        />
      </motion.div>

      <motion.div whileHover={!isLoading ? { scale: 1.02 } : {}}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
          disabled={isLoading}
        />
      </motion.div>

      <motion.div whileHover={!isLoading ? { scale: 1.02 } : {}}>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          disabled={isLoading}
        />
      </motion.div>

      <motion.div whileHover={!isLoading ? { scale: 1.02 } : {}}>
        <input
          type="text"
          name="sport"
          value={formData.sport}
          onChange={handleChange}
          placeholder="Your Sport"
          required
          disabled={isLoading}
        />
      </motion.div>

      <motion.div whileHover={!isLoading ? { scale: 1.02 } : {}}>
        <input
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Years of Experience"
          required
          disabled={isLoading}
        />
      </motion.div>

      <motion.div whileHover={!isLoading ? { scale: 1.02 } : {}}>
        <textarea
          name="achievements"
          value={formData.achievements}
          onChange={handleChange}
          placeholder="Notable Achievements"
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
          I confirm that all provided information is accurate
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
          formData.isCertified ? 'Create Account →' : 'Please Confirm Information'
        )}
      </motion.button>
    </motion.form>
  );
};

export default AthleteSignup;