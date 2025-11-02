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
    phone: '',
    location: '',
    dateOfBirth: '',
    achievements: '',
    isCertified: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Frontend validation
    if (!formData.isCertified) {
      setMessage({ type: 'error', text: 'Please confirm that all information is accurate' });
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      // Updated to port 3000 and correct endpoint
      const response = await fetch('http://localhost:3000/api/auth/athlete/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          sport: formData.sport,
          experience: formData.experience,
          phone: formData.phone,
          location: formData.location,
          dateOfBirth: formData.dateOfBirth,
          achievements: formData.achievements ? [formData.achievements] : []
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Store token and athlete data in localStorage
        localStorage.setItem('athlete_token', data.token);
        localStorage.setItem('athlete_data', JSON.stringify(data.athlete));
        
        setMessage({ type: 'success', text: data.message || 'Account created successfully! Redirecting...' });
        
        // Redirect to athlete dashboard
        setTimeout(() => {
          navigate('/athlete/dashboard', { 
            state: { 
              athlete: data.athlete,
              hasProfile: data.hasProfile || false
            }
          });
        }, 1500);
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form 
      className="athlete-signup-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-dark">Create Athlete Account</h2>
      
      {message.text && (
        <div className={`${message.type}-message`}>
          {message.text}
        </div>
      )}

      <motion.div className="form-group" whileHover={!isLoading ? { scale: 1.02 } : {}}>
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

      <motion.div className="form-group" whileHover={!isLoading ? { scale: 1.02 } : {}}>
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

      <motion.div className="form-group" whileHover={!isLoading ? { scale: 1.02 } : {}}>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password (min. 6 characters)"
          required
          minLength="6"
          disabled={isLoading}
        />
      </motion.div>

      <motion.div className="form-group" whileHover={!isLoading ? { scale: 1.02 } : {}}>
        <input
          type="text"
          name="sport"
          value={formData.sport}
          onChange={handleChange}
          placeholder="Your Sport (e.g., Basketball, Soccer, Swimming)"
          required
          disabled={isLoading}
        />
      </motion.div>

      <motion.div className="form-group" whileHover={!isLoading ? { scale: 1.02 } : {}}>
        <select
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
          disabled={isLoading}
        >
          <option value="">Years of Experience</option>
          <option value="0-1">0-1 years</option>
          <option value="1-3">1-3 years</option>
          <option value="3-5">3-5 years</option>
          <option value="5-10">5-10 years</option>
          <option value="10+">10+ years</option>
        </select>
      </motion.div>

      <motion.div className="form-group" whileHover={!isLoading ? { scale: 1.02 } : {}}>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          disabled={isLoading}
        />
      </motion.div>

      <motion.div className="form-group" whileHover={!isLoading ? { scale: 1.02 } : {}}>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          disabled={isLoading}
        />
      </motion.div>

      <motion.div className="form-group" whileHover={!isLoading ? { scale: 1.02 } : {}}>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          placeholder="Date of Birth"
          disabled={isLoading}
        />
      </motion.div>

      <motion.div className="form-group" whileHover={!isLoading ? { scale: 1.02 } : {}}>
        <textarea
          name="achievements"
          value={formData.achievements}
          onChange={handleChange}
          placeholder="Notable Achievements, Awards, or Competition Results"
          disabled={isLoading}
          rows="3"
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
          I confirm that all provided information is accurate and I agree to the terms of service
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
            Creating Account...
          </div>
        ) : (
          formData.isCertified ? 'Create Athlete Account →' : 'Please Confirm Information Accuracy'
        )}
      </motion.button>
    </motion.form>
  );
};

export default AthleteSignup;