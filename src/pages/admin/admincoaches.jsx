import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Mail, Phone, MapPin, Star, Award, Calendar, 
  CheckCircle, XCircle, X, MessageCircle, User, Clock, 
  BookOpen, Loader, Filter
} from 'lucide-react';
import { tournamentService } from '../../api/admin';
import AdminNav from './AdminNav'; // Import AdminNav
import '../../styles/admin/coaches.scss';

const AdminCoaches = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    sport: '',
    location: '',
    status: ''
  });

  // Fetch coaches and stats on component mount
  useEffect(() => {
    fetchCoaches();
    fetchCoachStats();
  }, []);

  // Fetch coaches when filters change
  useEffect(() => {
    fetchCoaches();
  }, [filters]);

  const fetchCoaches = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query params from filters
      const params = {};
      if (filters.sport) params.sport = filters.sport;
      if (filters.location) params.location = filters.location;
      if (filters.status) params.status = filters.status;
      
      const response = await tournamentService.getCoaches(params);
      setCoaches(response.data.data || []);
    } catch (err) {
      console.error('Error fetching coaches:', err);
      setError('Failed to load coaches. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCoachStats = async () => {
    try {
      const response = await tournamentService.getCoachStats();
      setStats(response.data.data);
    } catch (err) {
      console.error('Error fetching coach stats:', err);
    }
  };

  const handleVerifyCoach = async (coachId) => {
    try {
      await tournamentService.verifyCoach(coachId);
      alert('Coach verified successfully!');
      // Refresh the coaches list and stats
      await fetchCoaches();
      await fetchCoachStats();
    } catch (error) {
      console.error('Error verifying coach:', error);
      alert(`Failed to verify coach: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleRejectCoach = async (coachId) => {
    try {
      await tournamentService.rejectCoach(coachId);
      alert('Coach rejected successfully!');
      // Refresh the coaches list and stats
      await fetchCoaches();
      await fetchCoachStats();
    } catch (error) {
      console.error('Error rejecting coach:', error);
      alert(`Failed to reject coach: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleViewProfile = async (coach) => {
  try {
    console.log('Opening profile for coach:', coach); // Debug log
    setSelectedCoach(coach);
    setShowProfileModal(true);
  } catch (error) {
    console.error('Error fetching coach details:', error);
    setSelectedCoach(coach);
    setShowProfileModal(true);
  }
  };

  const handleSendMessage = (coach) => {
    setSelectedCoach(coach);
    setShowMessageModal(true);
    setMessageText('');
  };

  const handleSubmitMessage = () => {
    if (messageText.trim()) {
      // Here you would typically send the message to the coach
      console.log(`Message to ${selectedCoach.name}: ${messageText}`);
      alert(`Message sent to ${selectedCoach.name}!`);
      setShowMessageModal(false);
      setMessageText('');
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      sport: '',
      location: '',
      status: ''
    });
    setSearchTerm('');
  };

  // Filter coaches based on search term (client-side for instant feedback)
  const filteredCoaches = coaches.filter(coach =>
    coach.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coach.sports?.some(sport => sport.toLowerCase().includes(searchTerm.toLowerCase())) ||
    coach.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coach.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    return status === 'verified' ? <CheckCircle size={16} /> : <XCircle size={16} />;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-100 border-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'rejected': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  // Loading and Error states
  if (loading && coaches.length === 0) {
    return (
      <div className="loading-container">
        <Loader size={48} className="animate-spin" />
        <p>Loading coaches...</p>
      </div>
    );
  }

  if (error && coaches.length === 0) {
    return (
      <div className="error-container">
        <h3>Error Loading Coaches</h3>
        <p>{error}</p>
        <button onClick={fetchCoaches} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <AdminNav />
    <div className="admin-coaches">
      {/* Header */}
      <motion.div
        className="admin-page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-content">
          <div className="header-text">
            <h1>Coach Management</h1>
            <p>Manage and monitor all coaches</p>
          </div>
          <div className="stats-overview">
            <div className="stat-card mini">
              <span className="stat-number">{stats?.total || 0}</span>
              <span className="stat-label">Total Coaches</span>
            </div>
            <div className="stat-card mini">
              <span className="stat-number">{stats?.verified || 0}</span>
              <span className="stat-label">Verified</span>
            </div>
            <div className="stat-card mini">
              <span className="stat-number">{stats?.pending || 0}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-card mini">
              <span className="stat-number">{stats?.rejected || 0}</span>
              <span className="stat-label">Rejected</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        className="search-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="search-filters-container">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search coaches by name, sport, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filters-container">
            <div className="filter-group">
              <Filter size={16} />
              <select 
                value={filters.sport} 
                onChange={(e) => handleFilterChange('sport', e.target.value)}
              >
                <option value="">All Sports</option>
                <option value="Basketball">Basketball</option>
                <option value="Football">Football</option>
                <option value="Tennis">Tennis</option>
                <option value="Swimming">Swimming</option>
                <option value="Badminton">Badminton</option>
                <option value="Cricket">Cricket</option>
                <option value="Volleyball">Volleyball</option>
              </select>
            </div>

            <div className="filter-group">
              <select 
                value={filters.status} 
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="filter-group">
              <input
                type="text"
                placeholder="Location..."
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />
            </div>

            {(filters.sport || filters.location || filters.status) && (
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Loading indicator for operations */}
      {loading && (
        <div className="operation-loading">
          <Loader size={20} className="animate-spin" />
          <span>Loading coaches...</span>
        </div>
      )}

      {/* Coaches Grid */}
      <motion.div
        className="coaches-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <AnimatePresence>
          {filteredCoaches.map((coach, index) => (
            <motion.div
              key={coach._id || coach.id}
              className="coach-card glass-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="coach-header">
                <div className="coach-avatar">
                  {coach.name?.split(' ').map(n => n[0]).join('') || 'CO'}
                </div>
                <div className="coach-basic-info">
                  <h3 className="coach-name">{coach.name || 'Unknown Coach'}</h3>
                  <p className="coach-sport">{(coach.sports && coach.sports[0]) || 'General'}</p>
                </div>
                <div className={`status-badge ${getStatusColor(coach.status)}`}>
                  {getStatusIcon(coach.status)}
                  {coach.status || 'unknown'}
                </div>
              </div>

              <div className="coach-details">
                <div className="detail-row">
                  <Mail size={16} />
                  <span>{coach.email || 'No email'}</span>
                </div>
                <div className="detail-row">
                  <Phone size={16} />
                  <span>{coach.phone || 'No phone'}</span>
                </div>
                <div className="detail-row">
                  <MapPin size={16} />
                  <span>{coach.location || 'Location not set'}</span>
                </div>
              </div>

              <div className="coach-stats">
                <div className="stat">
                  <Star size={16} className="text-yellow-500" />
                  <span>{coach.rating || 'N/A'}</span>
                </div>
                <div className="stat">
                  <Award size={16} />
                  <span>{coach.experience || 'Experience not set'}</span>
                </div>
                <div className="stat">
                  <Calendar size={16} />
                  <span>{coach.students || 0} students</span>
                </div>
              </div>

              <div className="specialties">
                {(coach.specialties || coach.certifications || []).slice(0, 3).map((specialty, idx) => (
                  <span key={idx} className="specialty-tag">
                    {specialty}
                  </span>
                ))}
                {(coach.specialties || coach.certifications || []).length > 3 && (
                  <span className="specialty-tag">+{(coach.specialties || coach.certifications || []).length - 3} more</span>
                )}
              </div>

              <div className="coach-actions">
                <motion.button
                  className="action-btn primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleViewProfile(coach)}
                >
                  View Profile
                </motion.button>
                <motion.button
                  className="action-btn secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage(coach)}
                >
                  Message
                </motion.button>
              </div>

              {coach.status === 'pending' && (
                <div className="verification-actions">
                  <motion.button
                    className="verify-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVerifyCoach(coach._id)}
                  >
                    <CheckCircle size={16} />
                    Verify Coach
                  </motion.button>
                  <motion.button
                    className="reject-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRejectCoach(coach._id)}
                  >
                    <XCircle size={16} />
                    Reject
                  </motion.button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredCoaches.length === 0 && coaches.length === 0 && !loading && (
        <EmptyState onRetry={fetchCoaches} />
      )}

      {/* No Results State */}
      {filteredCoaches.length === 0 && coaches.length > 0 && !loading && (
        <motion.div
          className="empty-state"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Search size={64} />
          <h3>No coaches found</h3>
          <p>Try adjusting your search criteria or filters</p>
          <button onClick={clearFilters} className="clear-filters-btn">
            Clear All Filters
          </button>
        </motion.div>
      )}

      {/* Coach Profile Modal */}
      <AnimatePresence>
        {showProfileModal && selectedCoach && (
          <CoachProfileModal 
            coach={selectedCoach}
            onClose={() => setShowProfileModal(false)}
            onSendMessage={() => {
              setShowProfileModal(false);
              handleSendMessage(selectedCoach);
            }}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
            formatDate={formatDate}
          />
        )}
      </AnimatePresence>

      {/* Message Modal */}
      <AnimatePresence>
        {showMessageModal && selectedCoach && (
          <MessageModal
            coach={selectedCoach}
            messageText={messageText}
            onMessageChange={setMessageText}
            onSubmit={handleSubmitMessage}
            onClose={() => setShowMessageModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

// Separate Modal Components for better organization
const MessageModal = ({ coach, messageText, onMessageChange, onSubmit, onClose }) => (
  <motion.div
    className="modal-overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className="modal-content"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-header">
        <h2>Send Message to {coach.name}</h2>
        <motion.button
          className="close-btn"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={24} />
        </motion.button>
      </div>

      <div className="modal-body">
        <div className="message-recipient">
          <div className="recipient-avatar">
            {coach.name?.split(' ').map(n => n[0]).join('') || 'CO'}
          </div>
          <div>
            <strong>{coach.name}</strong>
            <p>{(coach.sports?.[0] || 'General')} Coach</p> {/* FIX: Optional chaining */}
          </div>
        </div>

        <div className="message-form">
          <label>Your Message</label>
          <textarea
            value={messageText}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="Type your message here..."
            rows="6"
          />
        </div>
      </div>

      <div className="modal-footer">
        <motion.button
          className="btn secondary"
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cancel
        </motion.button>
        <motion.button
          className="btn primary"
          onClick={onSubmit}
          disabled={!messageText.trim()}
          whileHover={{ scale: messageText.trim() ? 1.05 : 1 }}
          whileTap={{ scale: messageText.trim() ? 0.95 : 1 }}
        >
          <MessageCircle size={16} />
          Send Message
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
);


const EmptyState = ({ onRetry }) => (
  <motion.div
    className="empty-state"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
  >
    <Award size={64} />
    <h3>No coaches found</h3>
    <p>There are no coaches in the system yet.</p>
    <button onClick={onRetry} className="retry-btn">
      Refresh
    </button>
  </motion.div>
);

export default AdminCoaches;