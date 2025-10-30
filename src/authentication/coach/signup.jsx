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
    phone: '',
    location: '',
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

    try {
      // ✅ FIXED: Single API call to your actual backend endpoint
      const response = await fetch('http://localhost:3000/api/auth/coach/register', { // ✅ Fixed port and endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          location: formData.location,
          sport: formData.sport,
          experience: formData.experience,
          isCertified: formData.isCertified
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // ✅ FIXED: Store token and coach data
        localStorage.setItem('coach_token', data.token);
        localStorage.setItem('coach_data', JSON.stringify(data.coach));
        
        console.log('Coach registration successful:', data);
        
        // Redirect to coach profile page
        navigate('/coach/profile');
      } else {
        throw new Error(data.message || 'Registration failed');
      }
      
    } catch (error) {
      console.error('Signup error:', error);
      alert(`Signup failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
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
            minLength="6"
          />
        </motion.div>

        <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
          <label>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+1 (555) 123-4567"
            disabled={isLoading}
          />
        </motion.div>

        <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
          <label>Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="City, State"
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
            max="50"
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
            I am a certified coach and agree to provide proof when requested
          </label>
        </motion.div>

        <motion.button 
          type="submit" 
          className="signup-btn" style={{backgroundColor:"#1976d2",color: "white",width: "100%",padding: "14px 20px",border: "none",borderRadius: "4px",cursor: "pointer",fontSize: "16px",boxShadow: "0 4px 10px rgba(25, 118, 210, 0.3)"}}
          disabled={!formData.isCertified || isLoading}
          whileHover={(!isLoading && formData.isCertified) ? { scale: 1.05 } : {}}
          whileTap={(!isLoading && formData.isCertified) ? { scale: 0.95 } : {}}
        >
          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              Creating Your Profile...
            </div>
          ) : (
            formData.isCertified ? 'Complete Signup & Create Profile' : 'Please Accept Certification'
          )}
        </motion.button>

      </motion.form>
    </div>
  );
};

export default CoachSignup;