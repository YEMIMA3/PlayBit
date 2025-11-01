import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Plus, Eye, Edit, Trash2, Calendar, 
  Users, Trophy, MapPin, X, Save, Clock, DollarSign,
  Loader
} from 'lucide-react';
import { tournamentService } from '../../api/admin';
import '../../styles/admin/tournaments.scss';
import AdminNav from './adminnav'; // CORRECTED IMPORT

const AdminTournaments = () => {
  const navigate = useNavigate();
  
  // State declarations
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [tournamentToDelete, setTournamentToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Tournaments data from API
  const [tournaments, setTournaments] = useState([]);

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      console.log('🚫 No admin token, redirecting to login...');
      navigate('/admin/auth', { replace: true });
      return;
    }
  }, [navigate]);

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
    status: 'upcoming',
    allowedUserTypes: ['athlete', 'coach'],
    maxCoaches: 5,
    maxAthletes: 50,
    isActive: true,
    visibility: 'public'
  });

  // Fetch tournaments on component mount
  useEffect(() => {
    fetchTournaments();
  }, []);

  // API Functions
  const fetchTournaments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tournamentService.getTournaments();
      setTournaments(response.data.data || response.data);
    } catch (err) {
      console.error('Error fetching tournaments:', err);
      setError('Failed to load tournaments. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTournament = async () => {
    try {
      if (!tournamentForm.name || !tournamentForm.sport || !tournamentForm.date) {
        alert('Please fill in all required fields');
        return;
      }

      // Prepare data for API
      const tournamentData = {
        name: tournamentForm.name,
        sport: tournamentForm.sport,
        date: tournamentForm.date,
        participants: parseInt(tournamentForm.participants) || 0,
        location: tournamentForm.location,
        prize: tournamentForm.prize,
        organizer: tournamentForm.organizer,
        description: tournamentForm.description,
        registrationDeadline: tournamentForm.registrationDeadline,
        status: tournamentForm.status,
        allowedUserTypes: tournamentForm.allowedUserTypes,
        maxCoaches: tournamentForm.maxCoaches,
        maxAthletes: tournamentForm.maxAthletes,
        isActive: tournamentForm.isActive,
        visibility: tournamentForm.visibility
      };

      if (isEditing && selectedTournament) {
        // Update existing tournament
        await tournamentService.updateTournament(selectedTournament._id, tournamentData);
        alert('Tournament updated successfully!');
      } else {
        // Create new tournament
        await tournamentService.createTournament(tournamentData);
        alert('Tournament created successfully!');
      }

      // Refresh tournaments list
      await fetchTournaments();
      setShowCreateModal(false);
      setSelectedTournament(null);
    } catch (error) {
      console.error('Error saving tournament:', error);
      alert(`Failed to save tournament: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (tournamentToDelete) {
        await tournamentService.deleteTournament(tournamentToDelete._id);
        setTournaments(prev => prev.filter(t => t._id !== tournamentToDelete._id));
        setShowDeleteModal(false);
        setTournamentToDelete(null);
        alert('Tournament deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting tournament:', error);
      alert(`Failed to delete tournament: ${error.response?.data?.message || error.message}`);
    }
  };

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
      status: 'upcoming',
      allowedUserTypes: ['athlete', 'coach'],
      maxCoaches: 5,
      maxAthletes: 50,
      isActive: true,
      visibility: 'public'
    });
    setIsEditing(false);
    setSelectedTournament(null);
    setShowCreateModal(true);
  };

  const handleViewTournament = (tournament) => {
    setSelectedTournament(tournament);
    setShowViewModal(true);
  };

  const handleEditTournament = (tournament) => {
    setTournamentForm({
      name: tournament.name,
      sport: tournament.sport,
      date: tournament.date ? tournament.date.split('T')[0] : '',
      participants: tournament.participants?.toString() || '',
      location: tournament.location,
      prize: tournament.prize,
      organizer: tournament.organizer,
      description: tournament.description || '',
      registrationDeadline: tournament.registrationDeadline ? tournament.registrationDeadline.split('T')[0] : '',
      status: tournament.status,
      allowedUserTypes: tournament.allowedUserTypes || ['athlete', 'coach'],
      maxCoaches: tournament.maxCoaches || 5,
      maxAthletes: tournament.maxAthletes || 50,
      isActive: tournament.isActive !== undefined ? tournament.isActive : true,
      visibility: tournament.visibility || 'public'
    });
    setSelectedTournament(tournament);
    setIsEditing(true);
    setShowCreateModal(true);
  };

  const handleDeleteClick = (tournament) => {
    setTournamentToDelete(tournament);
    setShowDeleteModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setSelectedTournament(null);
    setIsEditing(false);
  };

  // Constants
  const sports = ['Basketball', 'Football', 'Tennis', 'Badminton', 'Swimming', 'Cricket', 'Volleyball'];

  // Computed values
  const filteredTournaments = tournaments.filter(tournament =>
    tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tournament.sport.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 border-green-200';
      case 'upcoming': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'completed': return 'text-gray-600 bg-gray-100 border-gray-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const handleFormChange = (field, value) => {
    setTournamentForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Loading and Error states
  if (loading && tournaments.length === 0) {
    return (
      <div className="loading-container">
        <Loader size={48} className="animate-spin" />
        <p>Loading tournaments...</p>
      </div>
    );
  }

  if (error && tournaments.length === 0) {
    return (
      <div className="error-container">
        <h3>Error Loading Tournaments</h3>
        <p>{error}</p>
        <button onClick={fetchTournaments} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="admin-tournaments-page">
      {/* Admin Navigation Bar */}
      <AdminNav />
      
      <div className="admin-tournaments">
        {/* Header Section */}
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
            <div className="header-actions">
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
          </div>
        </motion.div>

        {/* Controls Section */}
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

        {/* Loading indicator for operations */}
        {loading && (
          <div className="operation-loading">
            <Loader size={20} className="animate-spin" />
            <span>Processing...</span>
          </div>
        )}

        {/* Tournaments Display Section */}
        <TournamentsDisplay 
          viewMode={viewMode}
          filteredTournaments={filteredTournaments}
          getStatusColor={getStatusColor}
          onViewTournament={handleViewTournament}
          onEditTournament={handleEditTournament}
          onDeleteClick={handleDeleteClick}
        />

        {/* Empty State */}
        {filteredTournaments.length === 0 && tournaments.length === 0 && !loading && (
          <EmptyState onCreateTournament={handleCreateTournament} />
        )}

        {/* Modals */}
        <CreateEditModal
          show={showCreateModal}
          isEditing={isEditing}
          tournamentForm={tournamentForm}
          sports={sports}
          onClose={handleCloseCreateModal}
          onFormChange={handleFormChange}
          onSave={handleSaveTournament}
        />

        <ViewModal
          show={showViewModal}
          tournament={selectedTournament}
          getStatusColor={getStatusColor}
          onClose={() => setShowViewModal(false)}
          onEdit={() => {
            setShowViewModal(false);
            handleEditTournament(selectedTournament);
          }}
        />

        <DeleteModal
          show={showDeleteModal}
          tournament={tournamentToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
};

// All your sub-components remain exactly the same...
// TournamentsDisplay, TournamentsGrid, TournamentCard, TournamentsList, ActionButton, 
// EmptyState, CreateEditModal, ViewModal, DeleteModal, Modal, CloseButton, Button, 
// FormField, FormSelect, FormTextarea, DetailCard

// Sub-components (keep all your existing sub-components exactly as they were)
const TournamentsDisplay = ({ 
  viewMode, 
  filteredTournaments, 
  getStatusColor, 
  onViewTournament, 
  onEditTournament, 
  onDeleteClick 
}) => (
  <motion.div
    className="tournaments-container"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    {viewMode === 'grid' ? (
      <TournamentsGrid
        tournaments={filteredTournaments}
        getStatusColor={getStatusColor}
        onViewTournament={onViewTournament}
        onEditTournament={onEditTournament}
        onDeleteClick={onDeleteClick}
      />
    ) : (
      <TournamentsList
        tournaments={filteredTournaments}
        getStatusColor={getStatusColor}
        onViewTournament={onViewTournament}
        onEditTournament={onEditTournament}
        onDeleteClick={onDeleteClick}
      />
    )}
  </motion.div>
);

const TournamentsGrid = ({ tournaments, getStatusColor, onViewTournament, onEditTournament, onDeleteClick }) => (
  <div className="tournaments-grid">
    <AnimatePresence>
      {tournaments.map((tournament, index) => (
        <TournamentCard
          key={tournament._id || tournament.id}
          tournament={tournament}
          index={index}
          getStatusColor={getStatusColor}
          onViewTournament={onViewTournament}
          onEditTournament={onEditTournament}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </AnimatePresence>
  </div>
);

const TournamentCard = ({ tournament, index, getStatusColor, onViewTournament, onEditTournament, onDeleteClick }) => (
  <motion.div
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
        <span>{tournament.date ? new Date(tournament.date).toLocaleDateString() : 'Date not set'}</span>
      </div>
      <div className="detail-item">
        <MapPin size={16} />
        <span>{tournament.location || 'Location not set'}</span>
      </div>
      <div className="detail-item">
        <Users size={16} />
        <span>{tournament.participants || 0} participants</span>
      </div>
      <div className="detail-item">
        <Trophy size={16} />
        <span>{tournament.prize || 'No prize'}</span>
      </div>
    </div>

    {tournament.description && (
      <div className="tournament-description-preview">
        {tournament.description}
      </div>
    )}

    <div className="tournament-actions">
      <ActionButton icon={Eye} onClick={() => onViewTournament(tournament)} title="View Details" />
      <ActionButton icon={Edit} onClick={() => onEditTournament(tournament)} title="Edit Tournament" />
      <ActionButton icon={Trash2} onClick={() => onDeleteClick(tournament)} title="Delete Tournament" />
    </div>
  </motion.div>
);

const TournamentsList = ({ tournaments, getStatusColor, onViewTournament, onEditTournament, onDeleteClick }) => (
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
      {tournaments.map((tournament, index) => (
        <motion.div
          key={tournament._id || tournament.id}
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
          <span className="date">{tournament.date ? new Date(tournament.date).toLocaleDateString() : 'N/A'}</span>
          <span className="participants">{tournament.participants || 0}</span>
          <span className="prize">{tournament.prize || 'N/A'}</span>
          <span className={`status ${getStatusColor(tournament.status)}`}>
            {tournament.status}
          </span>
          <div className="actions">
            <ActionButton icon={Eye} onClick={() => onViewTournament(tournament)} />
            <ActionButton icon={Edit} onClick={() => onEditTournament(tournament)} />
            <ActionButton icon={Trash2} onClick={() => onDeleteClick(tournament)} />
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

const ActionButton = ({ icon: Icon, onClick, title }) => (
  <motion.button 
    onClick={onClick}
    whileHover={{ scale: 1.1 }} 
    whileTap={{ scale: 0.9 }}
    title={title}
  >
    <Icon size={16} />
  </motion.button>
);

const EmptyState = ({ onCreateTournament }) => (
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
      onClick={onCreateTournament}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Plus size={20} />
      Create Your First Tournament
    </motion.button>
  </motion.div>
);

const CreateEditModal = ({ show, isEditing, tournamentForm, sports, onClose, onFormChange, onSave }) => (
  <AnimatePresence>
    {show && (
      <Modal onClose={onClose} size="large">
        <div className="modal-header">
          <h2>{isEditing ? 'Edit Tournament' : 'Create New Tournament'}</h2>
          <CloseButton onClose={onClose} />
        </div>

        <div className="modal-body">
          <div className="form-grid">
            <FormField
              label="Tournament Name *"
              type="text"
              value={tournamentForm.name}
              onChange={(value) => onFormChange('name', value)}
              placeholder="Enter tournament name"
            />

            <FormSelect
              label="Sport *"
              value={tournamentForm.sport}
              onChange={(value) => onFormChange('sport', value)}
              options={sports}
              placeholder="Select Sport"
            />

            <FormField
              label="Tournament Date *"
              type="date"
              value={tournamentForm.date}
              onChange={(value) => onFormChange('date', value)}
            />

            <FormField
              label="Registration Deadline"
              type="date"
              value={tournamentForm.registrationDeadline}
              onChange={(value) => onFormChange('registrationDeadline', value)}
            />

            <FormField
              label="Location *"
              type="text"
              value={tournamentForm.location}
              onChange={(value) => onFormChange('location', value)}
              placeholder="Enter location"
            />

            <FormField
              label="Prize Pool"
              type="text"
              value={tournamentForm.prize}
              onChange={(value) => onFormChange('prize', value)}
              placeholder="e.g., $5,000"
            />

            <FormField
              label="Max Participants"
              type="number"
              value={tournamentForm.participants}
              onChange={(value) => onFormChange('participants', value)}
              placeholder="Enter number of participants"
            />

            <FormField
              label="Organizer"
              type="text"
              value={tournamentForm.organizer}
              onChange={(value) => onFormChange('organizer', value)}
              placeholder="Enter organizer name"
            />

            <FormSelect
              label="Status"
              value={tournamentForm.status}
              onChange={(value) => onFormChange('status', value)}
              options={['upcoming', 'active', 'completed']}
              fullWidth
            />

            <FormTextarea
              label="Description"
              value={tournamentForm.description}
              onChange={(value) => onFormChange('description', value)}
              placeholder="Enter tournament description"
              rows={4}
            />
          </div>
        </div>

        <div className="modal-footer">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onSave} icon={Save}>
            {isEditing ? 'Update Tournament' : 'Create Tournament'}
          </Button>
        </div>
      </Modal>
    )}
  </AnimatePresence>
);

const ViewModal = ({ show, tournament, getStatusColor, onClose, onEdit }) => (
  <AnimatePresence>
    {show && tournament && (
      <Modal onClose={onClose} size="large">
        <div className="modal-header">
          <h2>Tournament Details</h2>
          <CloseButton onClose={onClose} />
        </div>

        <div className="modal-body">
          <div className="tournament-detail-header">
            <div className="detail-badge-group">
              <span className="sport-badge large">{tournament.sport}</span>
              <span className={`status-badge large ${getStatusColor(tournament.status)}`}>
                {tournament.status}
              </span>
            </div>
            <h3>{tournament.name}</h3>
            {tournament.description && (
              <p className="tournament-description">{tournament.description}</p>
            )}
          </div>

          <div className="detail-grid">
            <DetailCard icon={Calendar} label="Tournament Date" value={tournament.date ? new Date(tournament.date).toLocaleDateString() : 'Not set'} />
            <DetailCard icon={Clock} label="Registration Deadline" value={tournament.registrationDeadline ? new Date(tournament.registrationDeadline).toLocaleDateString() : 'Not set'} />
            <DetailCard icon={MapPin} label="Location" value={tournament.location || 'Not set'} />
            <DetailCard icon={Users} label="Participants" value={tournament.participants || 0} />
            <DetailCard icon={Trophy} label="Prize Pool" value={tournament.prize || 'Not set'} />
            <DetailCard icon={DollarSign} label="Organizer" value={tournament.organizer || 'Not set'} />
          </div>
        </div>

        <div className="modal-footer">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onEdit} icon={Edit}>
            Edit Tournament
          </Button>
        </div>
      </Modal>
    )}
  </AnimatePresence>
);

const DeleteModal = ({ show, tournament, onClose, onConfirm }) => (
  <AnimatePresence>
    {show && tournament && (
      <Modal onClose={onClose}>
        <div className="modal-header">
          <h2>Delete Tournament</h2>
          <CloseButton onClose={onClose} />
        </div>

        <div className="modal-body">
          <div className="delete-confirmation">
            <Trash2 size={48} className="delete-icon" />
            <h3>Are you sure?</h3>
            <p>
              You are about to delete the tournament <strong>"{tournament.name}"</strong>. 
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} icon={Trash2}>
            Delete Tournament
          </Button>
        </div>
      </Modal>
    )}
  </AnimatePresence>
);

// Reusable Modal Component
const Modal = ({ children, onClose, size = 'default' }) => (
  <motion.div
    className="modal-overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className={`modal-content ${size}`}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </motion.div>
  </motion.div>
);

const CloseButton = ({ onClose }) => (
  <motion.button
    className="close-btn"
    onClick={onClose}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <X size={24} />
  </motion.button>
);

const Button = ({ variant = 'primary', onClick, children, icon: Icon }) => (
  <motion.button
    className={`btn ${variant}`}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {Icon && <Icon size={16} />}
    {children}
  </motion.button>
);

const FormField = ({ label, type = 'text', value, onChange, placeholder, fullWidth = false }) => (
  <div className={`form-group ${fullWidth ? 'full-width' : ''}`}>
    <label>{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

const FormSelect = ({ label, value, onChange, options, placeholder, fullWidth = false }) => (
  <div className={`form-group ${fullWidth ? 'full-width' : ''}`}>
    <label>{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">{placeholder}</option>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const FormTextarea = ({ label, value, onChange, placeholder, rows = 4, fullWidth = false }) => (
  <div className={`form-group ${fullWidth ? 'full-width' : ''}`}>
    <label>{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
    />
  </div>
);

const DetailCard = ({ icon: Icon, label, value }) => (
  <div className="detail-card">
    <Icon size={20} />
    <div>
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  </div>
);

export default AdminTournaments;