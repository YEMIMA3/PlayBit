import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, Upload, Award, Save, Edit3 } from 'lucide-react';
import '../../styles/athlete/athleteprofile.scss';
import AthleteNav from './athleteNav'; 

const AthleteProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    sport: 'Basketball',
    level: 'Intermediate',
    bio: 'Passionate basketball player with 3 years of competitive experience. Looking to improve skills and connect with professional coaches.',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    dateOfBirth: '1998-05-15',
    height: '6\'2"',
    weight: '185 lbs'
  });

  const [profileImage, setProfileImage] = useState(null);
  const [achievements, setAchievements] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Please select an image smaller than 5MB');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleCertificateUpload = (e, type) => {
    const files = Array.from(e.target.files);
    const newAchievements = files.map(file => ({
      id: Date.now() + Math.random(),
      type,
      file,
      name: file.name,
      uploadDate: new Date().toLocaleDateString(),
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    }));
    
    setAchievements(prev => [...prev, ...newAchievements]);
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    console.log('Saving profile:', profileData);
    console.log('Achievements:', achievements);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const removeAchievement = (id) => {
    setAchievements(prev => prev.filter(achievement => achievement.id !== id));
  };

  const sports = ['Basketball', 'Football', 'Tennis', 'Swimming', 'Athletics', 'Cricket', 'Boxing', 'Martial Arts'];
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];

  return (
    <div className="athlete-profile-container">
      <AthleteNav />
      <div className="athlete-content">
        <div className="athlete-profile-page">
          <motion.div 
            className="profile-header"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="header-content">
              <div className="avatar-section">
                <div className="avatar-upload">
                  <motion.div 
                    className="avatar-preview"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="profile-image" />
                    ) : (
                      <div className="default-avatar">
                        <User size={48} />
                      </div>
                    )}
                    <label className="camera-button">
                      <Camera size={20} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </motion.div>
                  <p className="upload-hint">Click camera to upload profile picture</p>
                </div>
                <div className="user-info">
                  <h1>{profileData.name}</h1>
                  <p>{profileData.sport} • {profileData.level}</p>
                  <div className="profile-stats">
                    <div className="stat">
                      <span className="stat-value">{achievements.length}</span>
                      <span className="stat-label">Certificates</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">3</span>
                      <span className="stat-label">Years</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <motion.button
                className={`edit-toggle-btn ${isEditing ? 'editing' : ''}`}
                onClick={() => setIsEditing(!isEditing)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isEditing ? <Save size={18} /> : <Edit3 size={18} />}
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </motion.button>
            </div>
          </motion.div>

          <div className="profile-content">
            <motion.div 
              className="profile-section glass-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2>Personal Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                    placeholder="City, Country"
                  />
                </div>

                <div className="form-group">
                  <label>Primary Sport *</label>
                  <select
                    value={profileData.sport}
                    onChange={(e) => handleInputChange('sport', e.target.value)}
                    disabled={!isEditing}
                  >
                    {sports.map(sport => (
                      <option key={sport} value={sport}>{sport}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Skill Level *</label>
                  <select
                    value={profileData.level}
                    onChange={(e) => handleInputChange('level', e.target.value)}
                    disabled={!isEditing}
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Height</label>
                  <input
                    type="text"
                    value={profileData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    disabled={!isEditing}
                    placeholder="5'10&quot;"
                  />
                </div>

                <div className="form-group">
                  <label>Weight</label>
                  <input
                    type="text"
                    value={profileData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    disabled={!isEditing}
                    placeholder="160 lbs"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Bio *</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    rows="4"
                    placeholder="Tell us about your sports journey, achievements, and goals..."
                  />
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="profile-section glass-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2>Certifications & Achievements</h2>
              <p className="section-description">
                Upload your certificates to showcase your journey and build credibility with coaches.
              </p>

              <div className="upload-areas">
                <motion.div 
                  className="upload-area winning"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="upload-icon">
                    <Award size={40} />
                    <span className="trophy">🏆</span>
                  </div>
                  <h3>Winning Certificates</h3>
                  <p>Upload certificates from competitions you've won</p>
                  <label className="upload-button">
                    <Upload size={18} />
                    Upload Winning Certificates
                    <input 
                      type="file" 
                      multiple 
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" 
                      onChange={(e) => handleCertificateUpload(e, 'winning')}
                      style={{ display: 'none' }} 
                    />
                  </label>
                </motion.div>

                <motion.div 
                  className="upload-area participation"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="upload-icon">
                    <Award size={40} />
                    <span className="medal">🎖️</span>
                  </div>
                  <h3>Participation Certificates</h3>
                  <p>Upload certificates from events you've participated in</p>
                  <label className="upload-button">
                    <Upload size={18} />
                    Upload Participation Certificates
                    <input 
                      type="file" 
                      multiple 
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" 
                      onChange={(e) => handleCertificateUpload(e, 'participation')}
                      style={{ display: 'none' }} 
                    />
                  </label>
                </motion.div>
              </div>

              {achievements.length > 0 && (
                <motion.div 
                  className="achievements-list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3>Uploaded Certificates ({achievements.length})</h3>
                  <div className="achievements-grid">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        className="achievement-card"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -2 }}
                      >
                        <div className={`card-header ${achievement.type}`}>
                          <Award size={18} />
                          <span className="type-badge">
                            {achievement.type === 'winning' ? '🏆 Winning' : '🎖️ Participation'}
                          </span>
                        </div>
                        <div className="card-content">
                          <h4>{achievement.name}</h4>
                          <p>Uploaded: {achievement.uploadDate}</p>
                          <p className="file-size">{achievement.size}</p>
                        </div>
                        <div className="card-actions">
                          <button className="view-btn">View</button>
                          <button 
                            className="delete-btn"
                            onClick={() => removeAchievement(achievement.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {isEditing && (
              <motion.div 
                className="action-buttons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  className="save-button primary"
                  onClick={handleSaveProfile}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Save size={18} />
                  Save All Changes
                </motion.button>
                <motion.button
                  className="cancel-button"
                  onClick={() => setIsEditing(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteProfile;