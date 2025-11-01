import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mail, Phone, MapPin, Star, Award, Calendar, CheckCircle, XCircle, X, MessageCircle, User, Clock, BookOpen } from 'lucide-react';

const AdminCoaches = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');

  // Sample data
  const coaches = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@playbit.com',
      phone: '+1 234 567 8900',
      sport: 'Basketball',
      experience: '8 years',
      rating: 4.8,
      students: 45,
      status: 'verified',
      joinDate: '2023-01-15',
      location: 'New York, NY',
      specialties: ['Shooting', 'Defense', 'Team Strategy'],
      bio: 'Professional basketball coach with 8 years of experience training athletes at all levels. Specialized in shooting techniques and defensive strategies.',
      achievements: [
        'NBA Certified Coach',
        'State Championship 2022',
        'Coach of the Year 2021'
      ],
      availability: ['Monday', 'Wednesday', 'Friday'],
      hourlyRate: '$75'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@playbit.com',
      phone: '+1 234 567 8901',
      sport: 'Tennis',
      experience: '6 years',
      rating: 4.9,
      students: 32,
      status: 'verified',
      joinDate: '2023-03-20',
      location: 'Los Angeles, CA',
      specialties: ['Serve Technique', 'Footwork', 'Match Strategy'],
      bio: 'Former professional tennis player turned coach. Passionate about developing young talent and improving technical skills.',
      achievements: [
        'USPTA Certified',
        'Regional Champion 2020',
        'Top Junior Developer'
      ],
      availability: ['Tuesday', 'Thursday', 'Saturday'],
      hourlyRate: '$85'
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@playbit.com',
      phone: '+1 234 567 8902',
      sport: 'Swimming',
      experience: '10 years',
      rating: 4.7,
      students: 28,
      status: 'pending',
      joinDate: '2024-01-10',
      location: 'Miami, FL',
      specialties: ['Freestyle', 'Butterfly', 'Endurance Training'],
      bio: 'Olympic-level swimming coach with expertise in stroke technique and endurance training. Focused on building champions.',
      achievements: [
        'ASCA Level 4 Certified',
        'National Record Holder',
        'Olympic Team Coach 2020'
      ],
      availability: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
      hourlyRate: '$95'
    },
    {
      id: 4,
      name: 'Emma Davis',
      email: 'emma.davis@playbit.com',
      phone: '+1 234 567 8903',
      sport: 'Football',
      experience: '7 years',
      rating: 4.6,
      students: 38,
      status: 'verified',
      joinDate: '2023-08-05',
      location: 'Chicago, IL',
      specialties: ['Passing', 'Tactics', 'Fitness Training'],
      bio: 'Football strategist and fitness expert. Specialized in team tactics and individual player development.',
      achievements: [
        'NSCAA Premier Diploma',
        'State Cup Winner 2023',
        'Best Tactical Coach 2022'
      ],
      availability: ['Tuesday', 'Thursday', 'Saturday'],
      hourlyRate: '$70'
    }
  ];

  const filteredCoaches = coaches.filter(coach =>
    coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coach.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coach.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    return status === 'verified' ? <CheckCircle size={16} /> : <XCircle size={16} />;
  };

  const getStatusColor = (status) => {
    return status === 'verified' ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100';
  };

  const handleViewProfile = (coach) => {
    setSelectedCoach(coach);
    setShowProfileModal(true);
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

  const handleVerifyCoach = (coachId) => {
    // Here you would typically verify the coach
    console.log(`Verifying coach ${coachId}`);
    alert('Coach verified successfully!');
  };

  return (
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
              <span className="stat-number">{coaches.length}</span>
              <span className="stat-label">Total Coaches</span>
            </div>
            <div className="stat-card mini">
              <span className="stat-number">{coaches.filter(c => c.status === 'verified').length}</span>
              <span className="stat-label">Verified</span>
            </div>
            <div className="stat-card mini">
              <span className="stat-number">{coaches.filter(c => c.status === 'pending').length}</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        className="search-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search coaches by name, sport, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

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
              key={coach.id}
              className="coach-card glass-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="coach-header">
                <div className="coach-avatar">
                  {coach.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="coach-basic-info">
                  <h3 className="coach-name">{coach.name}</h3>
                  <p className="coach-sport">{coach.sport}</p>
                </div>
                <div className={`status-badge ${getStatusColor(coach.status)}`}>
                  {getStatusIcon(coach.status)}
                  {coach.status}
                </div>
              </div>

              <div className="coach-details">
                <div className="detail-row">
                  <Mail size={16} />
                  <span>{coach.email}</span>
                </div>
                <div className="detail-row">
                  <Phone size={16} />
                  <span>{coach.phone}</span>
                </div>
                <div className="detail-row">
                  <MapPin size={16} />
                  <span>{coach.location}</span>
                </div>
              </div>

              <div className="coach-stats">
                <div className="stat">
                  <Star size={16} className="text-yellow-500" />
                  <span>{coach.rating}</span>
                </div>
                <div className="stat">
                  <Award size={16} />
                  <span>{coach.experience}</span>
                </div>
                <div className="stat">
                  <Calendar size={16} />
                  <span>{coach.students} students</span>
                </div>
              </div>

              <div className="specialties">
                {coach.specialties.map((specialty, idx) => (
                  <span key={idx} className="specialty-tag">
                    {specialty}
                  </span>
                ))}
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
                <motion.button
                  className="verify-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleVerifyCoach(coach.id)}
                >
                  <CheckCircle size={16} />
                  Verify Coach
                </motion.button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredCoaches.length === 0 && (
        <motion.div
          className="empty-state"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Award size={64} />
          <h3>No coaches found</h3>
          <p>Try adjusting your search criteria</p>
        </motion.div>
      )}

      {/* Coach Profile Modal */}
      <AnimatePresence>
        {showProfileModal && selectedCoach && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowProfileModal(false)}
          >
            <motion.div
              className="modal-content large"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Coach Profile</h2>
                <motion.button
                  className="close-btn"
                  onClick={() => setShowProfileModal(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="modal-body">
                <div className="profile-header">
                  <div className="profile-avatar">
                    {selectedCoach.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="profile-info">
                    <h3>{selectedCoach.name}</h3>
                    <p className="sport">{selectedCoach.sport} Coach</p>
                    <div className={`status-badge ${getStatusColor(selectedCoach.status)}`}>
                      {getStatusIcon(selectedCoach.status)}
                      {selectedCoach.status}
                    </div>
                  </div>
                </div>

                <div className="profile-grid">
                  <div className="profile-section">
                    <h4>Contact Information</h4>
                    <div className="contact-info">
                      <div className="contact-item">
                        <Mail size={16} />
                        <span>{selectedCoach.email}</span>
                      </div>
                      <div className="contact-item">
                        <Phone size={16} />
                        <span>{selectedCoach.phone}</span>
                      </div>
                      <div className="contact-item">
                        <MapPin size={16} />
                        <span>{selectedCoach.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="profile-section">
                    <h4>Professional Details</h4>
                    <div className="details-grid">
                      <div className="detail-card">
                        <User size={20} />
                        <div>
                          <span className="label">Experience</span>
                          <span className="value">{selectedCoach.experience}</span>
                        </div>
                      </div>
                      <div className="detail-card">
                        <Star size={20} />
                        <div>
                          <span className="label">Rating</span>
                          <span className="value">{selectedCoach.rating}/5</span>
                        </div>
                      </div>
                      <div className="detail-card">
                        <BookOpen size={20} />
                        <div>
                          <span className="label">Students</span>
                          <span className="value">{selectedCoach.students}</span>
                        </div>
                      </div>
                      <div className="detail-card">
                        <Clock size={20} />
                        <div>
                          <span className="label">Hourly Rate</span>
                          <span className="value">{selectedCoach.hourlyRate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="profile-section">
                    <h4>Bio</h4>
                    <p className="bio-text">{selectedCoach.bio}</p>
                  </div>

                  <div className="profile-section">
                    <h4>Specialties</h4>
                    <div className="specialties-list">
                      {selectedCoach.specialties.map((specialty, idx) => (
                        <span key={idx} className="specialty-tag large">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="profile-section">
                    <h4>Achievements</h4>
                    <ul className="achievements-list">
                      {selectedCoach.achievements.map((achievement, idx) => (
                        <li key={idx}>
                          <Award size={16} />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="profile-section">
                    <h4>Availability</h4>
                    <div className="availability-list">
                      {selectedCoach.availability.map((day, idx) => (
                        <span key={idx} className="availability-tag">
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <motion.button
                  className="btn secondary"
                  onClick={() => setShowProfileModal(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
                <motion.button
                  className="btn primary"
                  onClick={() => {
                    setShowProfileModal(false);
                    handleSendMessage(selectedCoach);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle size={16} />
                  Send Message
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Modal */}
      <AnimatePresence>
        {showMessageModal && selectedCoach && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMessageModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Send Message to {selectedCoach.name}</h2>
                <motion.button
                  className="close-btn"
                  onClick={() => setShowMessageModal(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="modal-body">
                <div className="message-recipient">
                  <div className="recipient-avatar">
                    {selectedCoach.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <strong>{selectedCoach.name}</strong>
                    <p>{selectedCoach.sport} Coach</p>
                  </div>
                </div>

                <div className="message-form">
                  <label>Your Message</label>
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message here..."
                    rows="6"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <motion.button
                  className="btn secondary"
                  onClick={() => setShowMessageModal(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="btn primary"
                  onClick={handleSubmitMessage}
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
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCoaches;