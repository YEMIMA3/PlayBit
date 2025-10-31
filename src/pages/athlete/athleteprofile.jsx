import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, Upload, Award, Save, Edit3, Loader, AlertCircle } from 'lucide-react';
import '../../styles/athlete/athleteprofile.scss';
import AthleteNav from './AthleteNav';
import { getAthleteProfile, updateAthleteProfile } from '../../api/athleteProfile';

const AthleteProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    sport: '',
    level: 'Intermediate',
    bio: '',
    phone: '',
    location: '',
    dateOfBirth: '',
    height: '',
    weight: '',
    profileImage: ''
  });

  const [achievements, setAchievements] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch athlete profile on component mount
  useEffect(() => {
    fetchAthleteProfile();
  }, []);

  const fetchAthleteProfile = async () => {
    try {
      setIsLoading(true);
      const response = await getAthleteProfile();

      if (response.success && response.profile) {
        const profile = response.profile;
        setProfileData({
          name: profile.name || '',
          email: profile.email || '',
          sport: profile.sport || '',
          level: profile.level || 'Intermediate',
          bio: profile.bio || '',
          phone: profile.phone || '',
          location: profile.location || '',
          dateOfBirth: profile.dateOfBirth || '',
          height: profile.height || '',
          weight: profile.weight || '',
          profileImage: profile.profileImage || ''
        });
        setAchievements(profile.achievements || []);
        console.log('✅ Athlete profile loaded:', profile.name);
      } else {
        throw new Error(response.message || 'Failed to fetch profile');
      }
    } catch (error) {
      console.error('❌ Error fetching athlete profile:', error);
      setMessage({ type: 'error', text: 'Failed to load profile data' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Please select an image smaller than 5MB' });
        return;
      }

      // Create a local URL for preview
      const imageUrl = URL.createObjectURL(file);
      setProfileData(prev => ({ ...prev, profileImage: imageUrl }));

      // In production, you'd upload to your backend here
      console.log('Uploading image:', file.name);
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await updateAthleteProfile(profileData);

      if (response.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setIsEditing(false);
        
        // Update local storage with new data
        const athleteData = JSON.parse(localStorage.getItem('athlete_data') || '{}');
        localStorage.setItem('athlete_data', JSON.stringify({
          ...athleteData,
          name: profileData.name,
          sport: profileData.sport,
          level: profileData.level
        }));

        console.log('✅ Profile updated successfully');
      } else {
        throw new Error(response.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('❌ Error saving profile:', error);
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const sports = ['Basketball', 'Football', 'Tennis', 'Swimming', 'Athletics', 'Cricket', 'Boxing', 'Martial Arts'];
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];

  if (isLoading) {
    return (
      <div className="athlete-profile-container">
        <AthleteNav />
        <div className="loading-container">
          <Loader size={32} className="spinner" />
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="athlete-profile-container">
      <AthleteNav />
      <div className="athlete-content">
        <div className="athlete-profile-page">
          {message.text && (
            <div className={`global-message ${message.type}`}>
              {message.text}
            </div>
          )}

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
                    {profileData.profileImage ? (
                      <img src={profileData.profileImage} alt="Profile" className="profile-image" />
                    ) : (
                      <div className="default-avatar">
                        <User size={48} />
                      </div>
                    )}
                    {isEditing && (
                      <label className="camera-button">
                        <Camera size={20} />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                      </label>
                    )}
                  </motion.div>
                  <p className="upload-hint">Click camera to upload profile picture</p>
                </div>
                <div className="user-info">
                  <h1>{profileData.name}</h1>
                  <p>{profileData.sport} • {profileData.level}</p>
                  <div className="profile-stats">
                    <div className="stat">
                      <span className="stat-value">{achievements.length}</span>
                      <span className="stat-label">Achievements</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{profileData.experience || '0'}</span>
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
                disabled={isSaving}
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
                    disabled={true} // Email shouldn't be editable
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
                    <option value="">Select Sport</option>
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
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <div className="loading-spinner small"></div>
                  ) : (
                    <Save size={18} />
                  )}
                  {isSaving ? 'Saving...' : 'Save All Changes'}
                </motion.button>
                <motion.button
                  className="cancel-button"
                  onClick={() => {
                    setIsEditing(false);
                    fetchAthleteProfile(); // Reload original data
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSaving}
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