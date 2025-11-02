import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Mail, Phone, Calendar, TrendingUp, Award, Users, Filter, 
  Eye, MessageCircle, Download, MoreVertical, Star, Target, Activity,
  Loader, CheckCircle, XCircle, MapPin, User, Clock, BookOpen
} from 'lucide-react';
import { tournamentService } from '../../api/admin';
import AdminNav from './AdminNav'; // Import AdminNav
import '../../styles/admin/athlete.scss';

const AdminAthlete = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [operationLoading, setOperationLoading] = useState(false);

  // Fetch athletes and stats on component mount
  useEffect(() => {
    fetchAthletes();
    fetchAthleteStats();
  }, []);

  // Fetch athletes when filters change
  useEffect(() => {
    fetchAthletes();
  }, [selectedSport, selectedLevel]);

  const fetchAthletes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {};
      if (selectedSport !== 'all') params.sport = selectedSport;
      if (selectedLevel !== 'all') params.level = selectedLevel;
      if (searchTerm) params.search = searchTerm;
      
      const response = await tournamentService.getAthletes(params);
      setAthletes(response.data.data || []);
    } catch (err) {
      console.error('Error fetching athletes:', err);
      setError('Failed to load athletes. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAthleteStats = async () => {
    try {
      const response = await tournamentService.getAthleteStats();
      setStats(response.data.data);
    } catch (err) {
      console.error('Error fetching athlete stats:', err);
    }
  };

  const handleVerifyAthlete = async (athleteId) => {
    try {
      setOperationLoading(true);
      await tournamentService.verifyAthlete(athleteId);
      alert('Athlete verified successfully!');
      await fetchAthletes();
      await fetchAthleteStats();
    } catch (error) {
      console.error('Error verifying athlete:', error);
      alert(`Failed to verify athlete: ${error.response?.data?.message || error.message}`);
    } finally {
      setOperationLoading(false);
    }
  };

  const handleUpdateStatus = async (athleteId, status) => {
    try {
      setOperationLoading(true);
      await tournamentService.updateAthleteStatus(athleteId, status);
      alert(`Athlete status updated to ${status}!`);
      await fetchAthletes();
    } catch (error) {
      console.error('Error updating athlete status:', error);
      alert(`Failed to update status: ${error.response?.data?.message || error.message}`);
    } finally {
      setOperationLoading(false);
    }
  };

  const handleViewProfile = async (athlete) => {
    try {
      setSelectedAthlete(athlete);
      setShowProfileModal(true);
    } catch (error) {
      console.error('Error fetching athlete details:', error);
      setSelectedAthlete(athlete);
      setShowProfileModal(true);
    }
  };

  const handleSendMessage = (athlete) => {
    alert(`Message dialog would open for ${athlete.name}`);
  };

  const handleExportData = () => {
    alert('Exporting athlete data...');
  };

  const clearFilters = () => {
    setSelectedSport('all');
    setSelectedLevel('all');
    setSearchTerm('');
  };

  // Get available sports and levels from athletes data
  const sports = ['all', ...new Set(athletes.map(athlete => athlete.sport).filter(Boolean))];
  const levels = ['all', ...new Set(athletes.map(athlete => athlete.level).filter(Boolean))];

  // Filter athletes based on search term (client-side for instant feedback)
  const filteredAthletes = athletes.filter(athlete =>
    athlete.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    athlete.sport?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    athlete.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'Intermediate': return 'text-green-600 bg-green-100 border-green-200';
      case 'Advanced': return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'Professional': return 'text-orange-600 bg-orange-100 border-orange-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 border-green-200';
      case 'inactive': return 'text-gray-600 bg-gray-100 border-gray-200';
      case 'suspended': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getVerificationColor = (isVerified) => {
    return isVerified ? 'text-green-600 bg-green-100 border-green-200' : 'text-yellow-600 bg-yellow-100 border-yellow-200';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const ProgressBar = ({ percentage, color = 'blue' }) => (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <motion.div 
          className={`progress-fill bg-${color}-500`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <span className="progress-text">{percentage}%</span>
    </div>
  );

  // Loading and Error states
  if (loading && athletes.length === 0) {
    return (
      <div className="loading-container">
        <Loader size={48} className="animate-spin" />
        <p>Loading athletes...</p>
      </div>
    );
  }

  if (error && athletes.length === 0) {
    return (
      <div className="error-container">
        <h3>Error Loading Athletes</h3>
        <p>{error}</p>
        <button onClick={fetchAthletes} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Admin Navigation */}
      <AdminNav />
      
      {/* Main Content */}
      <div className="admin-athletes">
        {/* Header */}
        <motion.div
          className="admin-page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="header-content">
            <div className="header-text">
              <h1>Athlete Management</h1>
              <p>Manage and monitor all athletes</p>
            </div>
            <div className="header-actions">
              <motion.button
                className="export-btn"
                onClick={handleExportData}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={18} />
                Export Data
              </motion.button>
            </div>
          </div>

          {/* Stats Overview */}
          <motion.div 
            className="stats-overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="stat-card mini">
              <span className="stat-number">{stats?.total || 0}</span>
              <span className="stat-label">Total Athletes</span>
            </div>
            <div className="stat-card mini">
              <span className="stat-number">{stats?.active || 0}</span>
              <span className="stat-label">Active</span>
            </div>
            <div className="stat-card mini">
              <span className="stat-number">{stats?.verified || 0}</span>
              <span className="stat-label">Verified</span>
            </div>
            <div className="stat-card mini">
              <span className="stat-number">{stats?.levels?.Advanced || 0}</span>
              <span className="stat-label">Advanced</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="search-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="search-filters-container">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search athletes by name, sport, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filters-container">
              <div className="filter-group">
                <Filter size={16} />
                <select 
                  value={selectedSport} 
                  onChange={(e) => setSelectedSport(e.target.value)}
                >
                  <option value="all">All Sports</option>
                  {sports.filter(sport => sport !== 'all').map(sport => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <Star size={16} />
                <select 
                  value={selectedLevel} 
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  <option value="all">All Levels</option>
                  {levels.filter(level => level !== 'all').map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {(selectedSport !== 'all' || selectedLevel !== 'all' || searchTerm) && (
                <button onClick={clearFilters} className="clear-filters-btn">
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Operation Loading */}
        {operationLoading && (
          <div className="operation-loading">
            <Loader size={20} className="animate-spin" />
            <span>Processing request...</span>
          </div>
        )}

        {/* Athletes Grid */}
        <motion.div
          className="coaches-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence>
            {filteredAthletes.map((athlete, index) => (
              <motion.div
                key={athlete._id || athlete.id}
                className="coach-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="coach-header">
                  <div className="coach-avatar">
                    {athlete.name?.split(' ').map(n => n[0]).join('') || 'AT'}
                  </div>
                  <div className="coach-basic-info">
                    <h3 className="coach-name">{athlete.name || 'Unknown Athlete'}</h3>
                    <p className="coach-sport">{athlete.sport || 'General'}</p>
                  </div>
                  <div className={`status-badge ${getStatusColor(athlete.status)}`}>
                    {athlete.status === 'active' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    {athlete.status || 'unknown'}
                  </div>
                </div>

                <div className="coach-details">
                  <div className="detail-row">
                    <Mail size={16} />
                    <span>{athlete.email || 'No email'}</span>
                  </div>
                  <div className="detail-row">
                    <Phone size={16} />
                    <span>{athlete.phone || 'No phone'}</span>
                  </div>
                  <div className="detail-row">
                    <MapPin size={16} />
                    <span>{athlete.location || 'Location not set'}</span>
                  </div>
                </div>

                <div className="coach-stats">
                  <div className="stat">
                    <User size={16} />
                    <span>Age: {athlete.age || 'N/A'}</span>
                  </div>
                  <div className="stat">
                    <Star size={16} />
                    <span>{athlete.level || 'Beginner'}</span>
                  </div>
                  <div className="stat">
                    <Award size={16} />
                    <span>{athlete.experience || '0'} yrs</span>
                  </div>
                </div>

                <div className="specialties">
                  <div className={`status-badge ${getVerificationColor(athlete.isVerified)}`}>
                    {athlete.isVerified ? <CheckCircle size={14} /> : <Clock size={14} />}
                    {athlete.isVerified ? 'Verified' : 'Unverified'}
                  </div>
                  {athlete.achievements?.slice(0, 2).map((achievement, idx) => (
                    <span key={idx} className="specialty-tag">
                      {achievement.fileName || achievement}
                    </span>
                  ))}
                </div>

                <div className="coach-actions">
                  <motion.button
                    className="action-btn primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewProfile(athlete)}
                  >
                    View Profile
                  </motion.button>
                  <motion.button
                    className="action-btn secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSendMessage(athlete)}
                  >
                    Message
                  </motion.button>
                </div>

                {!athlete.isVerified && (
                  <div className="verification-actions">
                    <motion.button
                      className="verify-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleVerifyAthlete(athlete._id)}
                    >
                      <CheckCircle size={16} />
                      Verify Athlete
                    </motion.button>
                  </div>
                )}

                {athlete.isVerified && (
                  <div className="verification-actions">
                    <motion.button
                      className="action-btn secondary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleUpdateStatus(athlete._id, athlete.status === 'active' ? 'inactive' : 'active')}
                    >
                      {athlete.status === 'active' ? 'Deactivate' : 'Activate'}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredAthletes.length === 0 && athletes.length === 0 && !loading && (
          <div className="empty-state">
            <Users size={64} />
            <h3>No athletes found</h3>
            <p>There are no athletes in the system yet.</p>
            <button onClick={fetchAthletes} className="retry-btn">
              Refresh
            </button>
          </div>
        )}

        {/* No Results State */}
        {filteredAthletes.length === 0 && athletes.length > 0 && !loading && (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Search size={64} />
            <h3>No athletes found</h3>
            <p>Try adjusting your search criteria or filters</p>
            <button onClick={clearFilters} className="clear-filters-btn">
              Clear All Filters
            </button>
          </motion.div>
        )}

        {/* Athlete Profile Modal */}
        <AnimatePresence>
          {showProfileModal && selectedAthlete && (
            <AthleteProfileModal 
              athlete={selectedAthlete}
              onClose={() => setShowProfileModal(false)}
              onSendMessage={() => {
                setShowProfileModal(false);
                handleSendMessage(selectedAthlete);
              }}
              formatDate={formatDate}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// Athlete Profile Modal Component
const AthleteProfileModal = ({ athlete, onClose, onSendMessage, formatDate }) => (
  <motion.div
    className="modal-overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className="modal-content large"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-header">
        <h2>Athlete Profile</h2>
        <motion.button
          className="close-btn"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <XCircle size={24} />
        </motion.button>
      </div>

      <div className="modal-body">
        <div className="profile-header">
          <div className="profile-avatar">
            {athlete.name?.split(' ').map(n => n[0]).join('') || 'AT'}
          </div>
          <div className="profile-info">
            <h3>{athlete.name || 'Unknown Athlete'}</h3>
            <p className="sport">{athlete.sport || 'General'} Athlete</p>
            <div className="status-badges">
              <span className={`status-badge ${athlete.status === 'active' ? 'text-green-600 bg-green-100 border-green-200' : 'text-gray-600 bg-gray-100 border-gray-200'}`}>
                {athlete.status || 'unknown'}
              </span>
              <span className={`status-badge ${athlete.isVerified ? 'text-green-600 bg-green-100 border-green-200' : 'text-yellow-600 bg-yellow-100 border-yellow-200'}`}>
                {athlete.isVerified ? 'Verified' : 'Unverified'}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-grid">
          <div className="profile-section">
            <h4>Contact Information</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <span>{athlete.email || 'No email'}</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>{athlete.phone || 'No phone'}</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>{athlete.location || 'Location not set'}</span>
              </div>
              <div className="contact-item">
                <Calendar size={16} />
                <span>Joined: {formatDate(athlete.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h4>Athlete Details</h4>
            <div className="details-grid">
              <div className="detail-card">
                <User size={20} />
                <div>
                  <span className="label">Age</span>
                  <span className="value">{athlete.age || 'N/A'}</span>
                </div>
              </div>
              <div className="detail-card">
                <Star size={20} />
                <div>
                  <span className="label">Level</span>
                  <span className="value">{athlete.level || 'Beginner'}</span>
                </div>
              </div>
              <div className="detail-card">
                <Award size={20} />
                <div>
                  <span className="label">Experience</span>
                  <span className="value">{athlete.experience || '0'} years</span>
                </div>
              </div>
              <div className="detail-card">
                <BookOpen size={20} />
                <div>
                  <span className="label">Status</span>
                  <span className="value">{athlete.status || 'active'}</span>
                </div>
              </div>
            </div>
          </div>

          {athlete.bio && (
            <div className="profile-section">
              <h4>Bio</h4>
              <p className="bio-text">{athlete.bio}</p>
            </div>
          )}

          {athlete.achievements && athlete.achievements.length > 0 && (
            <div className="profile-section">
              <h4>Achievements</h4>
              <div className="specialties-list">
                {athlete.achievements.map((achievement, idx) => (
                  <span key={idx} className="specialty-tag large">
                    <Award size={14} />
                    {achievement.fileName || achievement.type || achievement}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="modal-footer">
        <motion.button
          className="btn secondary"
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Close
        </motion.button>
        <motion.button
          className="btn primary"
          onClick={onSendMessage}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle size={16} />
          Send Message
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
);

export default AdminAthlete;