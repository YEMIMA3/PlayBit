import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Plus, Eye, Edit, Trash2, Calendar, Users, Trophy, MapPin, X, Save, Clock, DollarSign } from 'lucide-react';

const AdminTournaments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [tournamentToDelete, setTournamentToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Tournament form state
  const [tournamentForm, setTournamentForm] = useState({
    name: '',
    sport: '',
    date: '',
    participants: '',
    location: '',
    prize: '',
    organizer: '',
    description: '',
    registrationDeadline: '',
    status: 'upcoming'
  });

  // Sample data
  const [tournaments, setTournaments] = useState([
    {
      id: 1,
      name: 'Summer Championship 2024',
      sport: 'Basketball',
      date: '2024-06-15',
      participants: 24,
      status: 'active',
      location: 'City Sports Complex',
      prize: '$5,000',
      organizer: 'PlayBit Sports',
      description: 'Annual summer basketball championship for all age groups',
      registrationDeadline: '2024-05-30'
    },
    {
      id: 2,
      name: 'Winter Football League',
      sport: 'Football',
      date: '2024-12-01',
      participants: 16,
      status: 'upcoming',
      location: 'National Stadium',
      prize: '$10,000',
      organizer: 'Football Association',
      description: 'Winter football league with professional teams',
      registrationDeadline: '2024-11-15'
    },
    {
      id: 3,
      name: 'Spring Tennis Open',
      sport: 'Tennis',
      date: '2024-03-20',
      participants: 32,
      status: 'completed',
      location: 'Tennis Club',
      prize: '$3,000',
      organizer: 'Tennis Federation',
      description: 'Spring tennis tournament for amateur players',
      registrationDeadline: '2024-03-01'
    },
    {
      id: 4,
      name: 'Youth Badminton Tournament',
      sport: 'Badminton',
      date: '2024-08-10',
      participants: 48,
      status: 'active',
      location: 'Community Center',
      prize: '$2,000',
      organizer: 'PlayBit Sports',
      description: 'Youth badminton tournament for players under 18',
      registrationDeadline: '2024-07-25'
    }
  ]);

  const filteredTournaments = tournaments.filter(tournament =>
    tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tournament.sport.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 border-green-200';
      case 'upcoming': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'completed': return 'text-gray-600 bg-gray-100 border-gray-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  // Create Tournament Handler
  const handleCreateTournament = () => {
    setTournamentForm({
      name: '',
      sport: '',
      date: '',
      participants: '',
      location: '',
      prize: '',
      organizer: '',
      description: '',
      registrationDeadline: '',
      status: 'upcoming'
    });
    setIsEditing(false);
    setSelectedTournament(null);
    setShowCreateModal(true);
  };

  // Save Tournament Handler (for both create and update)
  const handleSaveTournament = () => {
    if (!tournamentForm.name || !tournamentForm.sport || !tournamentForm.date) {
      alert('Please fill in all required fields');
      return;
    }

    if (isEditing && selectedTournament) {
      // Update existing tournament
      setTournaments(prev => prev.map(tournament => 
        tournament.id === selectedTournament.id 
          ? {
              ...tournament,
              name: tournamentForm.name,
              sport: tournamentForm.sport,
              date: tournamentForm.date,
              participants: parseInt(tournamentForm.participants) || 0,
              location: tournamentForm.location,
              prize: tournamentForm.prize,
              organizer: tournamentForm.organizer,
              description: tournamentForm.description,
              registrationDeadline: tournamentForm.registrationDeadline,
              status: tournamentForm.status
            }
          : tournament
      ));
      alert('Tournament updated successfully!');
    } else {
      // Create new tournament
      const newTournament = {
        id: Math.max(...tournaments.map(t => t.id), 0) + 1, // Generate new ID
        name: tournamentForm.name,
        sport: tournamentForm.sport,
        date: tournamentForm.date,
        participants: parseInt(tournamentForm.participants) || 0,
        location: tournamentForm.location,
        prize: tournamentForm.prize,
        organizer: tournamentForm.organizer,
        description: tournamentForm.description,
        registrationDeadline: tournamentForm.registrationDeadline,
        status: tournamentForm.status
      };

      setTournaments(prev => [newTournament, ...prev]);
      alert('Tournament created successfully!');
    }

    setShowCreateModal(false);
    setSelectedTournament(null);
  };

  // View Tournament Handler
  const handleViewTournament = (tournament) => {
    setSelectedTournament(tournament);
    setShowViewModal(true);
  };

  // Edit Tournament Handler
  const handleEditTournament = (tournament) => {
    setTournamentForm({
      name: tournament.name,
      sport: tournament.sport,
      date: tournament.date,
      participants: tournament.participants.toString(),
      location: tournament.location,
      prize: tournament.prize,
      organizer: tournament.organizer,
      description: tournament.description || '',
      registrationDeadline: tournament.registrationDeadline || '',
      status: tournament.status
    });
    setSelectedTournament(tournament);
    setIsEditing(true);
    setShowCreateModal(true);
  };

  // Delete Tournament Handler
  const handleDeleteClick = (tournament) => {
    setTournamentToDelete(tournament);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (tournamentToDelete) {
      setTournaments(prev => prev.filter(t => t.id !== tournamentToDelete.id));
      setShowDeleteModal(false);
      setTournamentToDelete(null);
      alert('Tournament deleted successfully!');
    }
  };

  const handleFormChange = (field, value) => {
    setTournamentForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Reset form when modal closes
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setSelectedTournament(null);
    setIsEditing(false);
  };

  const sports = ['Basketball', 'Football', 'Tennis', 'Badminton', 'Swimming', 'Cricket', 'Volleyball'];

  return (
    <div className="admin-tournaments">
      {/* Header */}
      <motion.div
        className="admin-page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-content">
          <div className="header-text">
            <h1>Tournament Management</h1>
            <p>Manage and monitor all tournaments</p>
            <div className="tournament-stats">
              <span>Total: {tournaments.length}</span>
              <span>Active: {tournaments.filter(t => t.status === 'active').length}</span>
              <span>Upcoming: {tournaments.filter(t => t.status === 'upcoming').length}</span>
            </div>
          </div>
          <motion.button
            className="create-btn"
            onClick={handleCreateTournament}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} />
            Create Tournament
          </motion.button>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        className="controls-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="search-filter-container">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search tournaments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="view-controls">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tournaments Grid/List */}
      <motion.div
        className="tournaments-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {viewMode === 'grid' ? (
          <div className="tournaments-grid">
            <AnimatePresence>
              {filteredTournaments.map((tournament, index) => (
                <motion.div
                  key={tournament.id}
                  className="tournament-card glass-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                >
                  <div className="tournament-header">
                    <div className="sport-badge">{tournament.sport}</div>
                    <span className={`status-badge ${getStatusColor(tournament.status)}`}>
                      {tournament.status}
                    </span>
                  </div>
                  
                  <h3 className="tournament-name">{tournament.name}</h3>
                  
                  <div className="tournament-details">
                    <div className="detail-item">
                      <Calendar size={16} />
                      <span>{new Date(tournament.date).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-item">
                      <MapPin size={16} />
                      <span>{tournament.location}</span>
                    </div>
                    <div className="detail-item">
                      <Users size={16} />
                      <span>{tournament.participants} participants</span>
                    </div>
                    <div className="detail-item">
                      <Trophy size={16} />
                      <span>{tournament.prize}</span>
                    </div>
                  </div>

                  {tournament.description && (
                    <div className="tournament-description-preview">
                      {tournament.description}
                    </div>
                  )}

                  <div className="tournament-actions">
                    <motion.button
                      className="action-btn view"
                      onClick={() => handleViewTournament(tournament)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </motion.button>
                    <motion.button
                      className="action-btn edit"
                      onClick={() => handleEditTournament(tournament)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Edit Tournament"
                    >
                      <Edit size={16} />
                    </motion.button>
                    <motion.button
                      className="action-btn delete"
                      onClick={() => handleDeleteClick(tournament)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Delete Tournament"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="tournaments-list">
            <div className="list-header">
              <span>Tournament</span>
              <span>Sport</span>
              <span>Date</span>
              <span>Participants</span>
              <span>Prize</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            <AnimatePresence>
              {filteredTournaments.map((tournament, index) => (
                <motion.div
                  key={tournament.id}
                  className="list-item glass-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                >
                  <div className="tournament-cell">
                    <div className="tournament-name">{tournament.name}</div>
                    {tournament.description && (
                      <div className="tournament-description-small">{tournament.description}</div>
                    )}
                  </div>
                  <span className="sport">{tournament.sport}</span>
                  <span className="date">{new Date(tournament.date).toLocaleDateString()}</span>
                  <span className="participants">{tournament.participants}</span>
                  <span className="prize">{tournament.prize}</span>
                  <span className={`status ${getStatusColor(tournament.status)}`}>
                    {tournament.status}
                  </span>
                  <div className="actions">
                    <motion.button 
                      onClick={() => handleViewTournament(tournament)}
                      whileHover={{ scale: 1.1 }} 
                      whileTap={{ scale: 0.9 }}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </motion.button>
                    <motion.button 
                      onClick={() => handleEditTournament(tournament)}
                      whileHover={{ scale: 1.1 }} 
                      whileTap={{ scale: 0.9 }}
                      title="Edit Tournament"
                    >
                      <Edit size={16} />
                    </motion.button>
                    <motion.button 
                      onClick={() => handleDeleteClick(tournament)}
                      whileHover={{ scale: 1.1 }} 
                      whileTap={{ scale: 0.9 }}
                      title="Delete Tournament"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Empty State */}
      {filteredTournaments.length === 0 && (
        <motion.div
          className="empty-state"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Trophy size={64} />
          <h3>No tournaments found</h3>
          <p>Try adjusting your search criteria or create a new tournament</p>
          <motion.button
            className="create-btn"
            onClick={handleCreateTournament}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} />
            Create Your First Tournament
          </motion.button>
        </motion.div>
      )}

      {/* Create/Edit Tournament Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseCreateModal}
          >
            <motion.div
              className="modal-content large"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>{isEditing ? 'Edit Tournament' : 'Create New Tournament'}</h2>
                <motion.button
                  className="close-btn"
                  onClick={handleCloseCreateModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Tournament Name *</label>
                    <input
                      type="text"
                      value={tournamentForm.name}
                      onChange={(e) => handleFormChange('name', e.target.value)}
                      placeholder="Enter tournament name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Sport *</label>
                    <select
                      value={tournamentForm.sport}
                      onChange={(e) => handleFormChange('sport', e.target.value)}
                    >
                      <option value="">Select Sport</option>
                      {sports.map(sport => (
                        <option key={sport} value={sport}>{sport}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Tournament Date *</label>
                    <input
                      type="date"
                      value={tournamentForm.date}
                      onChange={(e) => handleFormChange('date', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Registration Deadline</label>
                    <input
                      type="date"
                      value={tournamentForm.registrationDeadline}
                      onChange={(e) => handleFormChange('registrationDeadline', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Location *</label>
                    <input
                      type="text"
                      value={tournamentForm.location}
                      onChange={(e) => handleFormChange('location', e.target.value)}
                      placeholder="Enter location"
                    />
                  </div>

                  <div className="form-group">
                    <label>Prize Pool</label>
                    <input
                      type="text"
                      value={tournamentForm.prize}
                      onChange={(e) => handleFormChange('prize', e.target.value)}
                      placeholder="e.g., $5,000"
                    />
                  </div>

                  <div className="form-group">
                    <label>Max Participants</label>
                    <input
                      type="number"
                      value={tournamentForm.participants}
                      onChange={(e) => handleFormChange('participants', e.target.value)}
                      placeholder="Enter number of participants"
                    />
                  </div>

                  <div className="form-group">
                    <label>Organizer</label>
                    <input
                      type="text"
                      value={tournamentForm.organizer}
                      onChange={(e) => handleFormChange('organizer', e.target.value)}
                      placeholder="Enter organizer name"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Status</label>
                    <select
                      value={tournamentForm.status}
                      onChange={(e) => handleFormChange('status', e.target.value)}
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea
                      value={tournamentForm.description}
                      onChange={(e) => handleFormChange('description', e.target.value)}
                      placeholder="Enter tournament description"
                      rows="4"
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <motion.button
                  className="btn secondary"
                  onClick={handleCloseCreateModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="btn primary"
                  onClick={handleSaveTournament}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Save size={16} />
                  {isEditing ? 'Update Tournament' : 'Create Tournament'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Tournament Modal */}
      <AnimatePresence>
        {showViewModal && selectedTournament && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowViewModal(false)}
          >
            <motion.div
              className="modal-content large"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Tournament Details</h2>
                <motion.button
                  className="close-btn"
                  onClick={() => setShowViewModal(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="modal-body">
                <div className="tournament-detail-header">
                  <div className="detail-badge-group">
                    <span className="sport-badge large">{selectedTournament.sport}</span>
                    <span className={`status-badge large ${getStatusColor(selectedTournament.status)}`}>
                      {selectedTournament.status}
                    </span>
                  </div>
                  <h3>{selectedTournament.name}</h3>
                  {selectedTournament.description && (
                    <p className="tournament-description">{selectedTournament.description}</p>
                  )}
                </div>

                <div className="detail-grid">
                  <div className="detail-card">
                    <Calendar size={20} />
                    <div>
                      <span className="label">Tournament Date</span>
                      <span className="value">{new Date(selectedTournament.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="detail-card">
                    <Clock size={20} />
                    <div>
                      <span className="label">Registration Deadline</span>
                      <span className="value">
                        {selectedTournament.registrationDeadline 
                          ? new Date(selectedTournament.registrationDeadline).toLocaleDateString()
                          : 'Not set'
                        }
                      </span>
                    </div>
                  </div>

                  <div className="detail-card">
                    <MapPin size={20} />
                    <div>
                      <span className="label">Location</span>
                      <span className="value">{selectedTournament.location}</span>
                    </div>
                  </div>

                  <div className="detail-card">
                    <Users size={20} />
                    <div>
                      <span className="label">Participants</span>
                      <span className="value">{selectedTournament.participants}</span>
                    </div>
                  </div>

                  <div className="detail-card">
                    <Trophy size={20} />
                    <div>
                      <span className="label">Prize Pool</span>
                      <span className="value">{selectedTournament.prize}</span>
                    </div>
                  </div>

                  <div className="detail-card">
                    <DollarSign size={20} />
                    <div>
                      <span className="label">Organizer</span>
                      <span className="value">{selectedTournament.organizer}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <motion.button
                  className="btn secondary"
                  onClick={() => setShowViewModal(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
                <motion.button
                  className="btn primary"
                  onClick={() => {
                    setShowViewModal(false);
                    handleEditTournament(selectedTournament);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit size={16} />
                  Edit Tournament
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && tournamentToDelete && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Delete Tournament</h2>
                <motion.button
                  className="close-btn"
                  onClick={() => setShowDeleteModal(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="modal-body">
                <div className="delete-confirmation">
                  <Trash2 size={48} className="delete-icon" />
                  <h3>Are you sure?</h3>
                  <p>
                    You are about to delete the tournament <strong>"{tournamentToDelete.name}"</strong>. 
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="modal-footer">
                <motion.button
                  className="btn secondary"
                  onClick={() => setShowDeleteModal(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="btn danger"
                  onClick={handleConfirmDelete}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 size={16} />
                  Delete Tournament
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminTournaments;