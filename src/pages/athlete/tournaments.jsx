import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Trophy, Clock, DollarSign, Search } from 'lucide-react';
import '../../styles/athlete/tournaments.scss';
import AthleteNav from './athleteNav';
import { tournamentService, getAthleteProfile } from '../../api/athleteProfile';

export default function Tournaments() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [athleteName, setAthleteName] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    sport: ''
  });

  // Fetch tournaments and athlete data
  useEffect(() => {
    fetchAthleteName();
    fetchTournaments();
  }, [activeTab, filters]);

  const fetchAthleteName = async () => {
    try {
      const response = await getAthleteProfile();
      setAthleteName(response.profile?.name || 'Athlete');
    } catch (error) {
      console.error('Error fetching athlete name:', error);
      setAthleteName('Athlete');
    }
  };

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Convert frontend tab to backend status filter
      const backendFilters = {
        ...filters,
        status: activeTab === 'live' ? 'active' : 'upcoming'
      };
      
      const response = await tournamentService.getAthleteTournaments(backendFilters);
      
      // The tournaments are in response.data directly
      const tournamentsData = response.data || [];
      console.log('📊 Setting tournaments to:', tournamentsData);
      
      setTournaments(tournamentsData);
    } catch (err) {
      console.error('Error fetching tournaments:', err);
      setError('Failed to load tournaments. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (tournament) => {
    try {
      const registrationData = {
        teamName: document.getElementById('team-name')?.value,
        contact: document.getElementById('contact')?.value,
        email: document.getElementById('email')?.value,
        experience: document.getElementById('experience')?.value
      };

      const response = await tournamentService.registerForTournament(
        tournament._id || tournament.id,
        registrationData
      );
      
      alert(response.message || 'Registration successful! Waiting for approval.');
      setShowModal(false);
      // Refresh tournaments to update registration status
      fetchTournaments();
    } catch (error) {
      alert(error.message || 'Failed to register for tournament');
    }
  };

  const openModal = (tournament) => {
    setSelectedTournament(tournament);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTournament(null);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Helper functions to handle different field names
  const getTournamentField = (tournament, field) => {
    const fieldMap = {
      name: tournament.name || 'Untitled Tournament',
      sport: tournament.sport || 'General',
      location: tournament.location || 'Location not specified',
      description: tournament.description || 'No description available',
      participants: tournament.participants || tournament.maxAthletes || 0,
      maxParticipants: tournament.maxAthletes || tournament.participants || 100,
      prize: tournament.prize || 'No prize',
      registrationDeadline: tournament.registrationDeadline,
      entryFee: tournament.registrationFee > 0 ? `₹${tournament.registrationFee}` : 'Free',
      status: tournament.status || 'upcoming'
    };
    
    return fieldMap[field] || 'Not specified';
  };

  const getSeatsLeft = (tournament) => {
    const maxParticipants = tournament.maxAthletes || tournament.participants || 100;
    const currentParticipants = tournament.currentAthleteCount || tournament.registeredAthletes?.length || 0;
    return maxParticipants - currentParticipants;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not specified';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const isRegistrationOpen = (tournament) => {
    if (!tournament.registrationDeadline) return true;
    return new Date() <= new Date(tournament.registrationDeadline);
  };

  if (loading && tournaments.length === 0) {
    return (
      <div className="athlete-profile-container">
        <AthleteNav />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading tournaments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="athlete-profile-container">
      <AthleteNav />
      <div className="tournaments-page">
        <div className="container">
          {/* Header */}
          <div className="header">
            <h1>Tournaments</h1>
            <p>Browse and register for upcoming tournaments</p>
          </div>

          {/* Search and Filters */}
          <div className="filters-section">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search tournaments..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            <div className="filter-buttons">
              <select
                value={filters.sport}
                onChange={(e) => handleFilterChange('sport', e.target.value)}
              >
                <option value="">All Sports</option>
                <option value="Basketball">Basketball</option>
                <option value="Football">Football</option>
                <option value="Tennis">Tennis</option>
                <option value="Badminton">Badminton</option>
                <option value="Swimming">Swimming</option>
                <option value="Cricket">Cricket</option>
                <option value="Volleyball">Volleyball</option>
              </select>
            </div>
          </div>

          <div className="tabs-container">
            <div className="tabs-list">
              <button
                className={`tab-trigger ${activeTab === 'upcoming' ? 'active' : ''}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming
              </button>
              <button
                className={`tab-trigger ${activeTab === 'live' ? 'active' : ''}`}
                onClick={() => setActiveTab('live')}
              >
                Live Tournaments
              </button>
            </div>

            {error && (
              <div className="error-message">
                {error}
                <button onClick={fetchTournaments} className="retry-btn">
                  Try Again
                </button>
              </div>
            )}

            {/* Tournaments Grid */}
            <div className="tournaments-grid">
              {tournaments.map((tournament) => {
                const isRegistered = tournament.userRegistration;
                const seatsLeft = getSeatsLeft(tournament);
                const registrationOpen = isRegistrationOpen(tournament);
                
                return (
                  <div key={tournament._id || tournament.id} className={`tournament-card ${activeTab === 'live' ? 'live' : ''} fade-in`}>
                    <div className="tournament-card-header">
                      <div className="header-top">
                        <div className="tournament-info">
                          <h3>{getTournamentField(tournament, 'name')}</h3>
                          <div className="badges">
                            <span className="badge sport-badge">
                              {getTournamentField(tournament, 'sport')}
                            </span>
                            <span className={`badge ${activeTab === 'live' ? 'live-badge' : 'status-badge open'}`}>
                              {activeTab === 'live' ? (
                                <>
                                  <div className="live-dot" />
                                  Live
                                </>
                              ) : (
                                registrationOpen ? 'Open' : 'Closed'
                              )}
                            </span>
                            {isRegistered && (
                              <span className="badge registered-badge">
                                Registered
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="trophy">
                          <Trophy size={24} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="tournament-card-content">
                      {activeTab === 'live' && tournament.round && (
                        <div className="live-round">
                          <p>Current Round: {tournament.round}</p>
                        </div>
                      )}

                      <div className="details-list">
                        <div className="detail-item">
                          <Calendar size={16} />
                          <span>
                            {formatDate(tournament.date)}
                            {tournament.endDate && ` - ${formatDate(tournament.endDate)}`}
                          </span>
                        </div>

                        <div className="detail-item">
                          <MapPin size={16} />
                          <span>{getTournamentField(tournament, 'location')}</span>
                        </div>

                        <div className="detail-item">
                          <Users size={16} />
                          <span>
                            {tournament.currentAthleteCount || 0} / {getTournamentField(tournament, 'maxParticipants')} registered
                            {seatsLeft > 0 && ` (${seatsLeft} seats left)`}
                          </span>
                        </div>

                        {activeTab === 'upcoming' && tournament.registrationDeadline && (
                          <div className="detail-item">
                            <Clock size={16} />
                            <span>
                              Registration closes: {formatDate(tournament.registrationDeadline)}
                            </span>
                          </div>
                        )}

                        <div className="prize-row">
                          <div className="entry-fee">
                            <DollarSign size={16} />
                            <span>Entry: {getTournamentField(tournament, 'entryFee')}</span>
                          </div>
                          <div className="prize">
                            <Trophy size={16} />
                            <span>Prize: {getTournamentField(tournament, 'prize')}</span>
                          </div>
                        </div>
                      </div>

                      <p className="description">{getTournamentField(tournament, 'description')}</p>

                      <div className="actions">
                        {!isRegistered && registrationOpen && seatsLeft > 0 && (
                          <button 
                            className="register-btn"
                            onClick={() => openModal(tournament)}
                            disabled={isRegistered}
                          >
                            {isRegistered ? 'Already Registered' : 'Register Now'}
                          </button>
                        )}
                        {isRegistered && (
                          <span className="registration-status">
                            Status: {tournament.userRegistration?.status || 'Registered'}
                          </span>
                        )}
                        {!registrationOpen && (
                          <span className="registration-closed">
                            Registration Closed
                          </span>
                        )}
                        {seatsLeft <= 0 && (
                          <span className="sold-out">
                            Sold Out
                          </span>
                        )}
                        <button className="outline-btn">Register</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {tournaments.length === 0 && !loading && (
              <div className="empty-state">
                <p>No tournaments found matching your criteria.</p>
                <button onClick={() => setFilters({ search: '', sport: '' })}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Registration Modal */}
          {showModal && selectedTournament && (
            <div className="modal-backdrop" onClick={closeModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>Tournament Registration</h2>
                  <p>Register for {getTournamentField(selectedTournament, 'name')}</p>
                  <button className="close-btn" onClick={closeModal}>×</button>
                </div>
                
                <div className="registration-form">
                  <div className="tournament-summary">
                    <p>{getTournamentField(selectedTournament, 'name')}</p>
                    <div className="summary-meta">
                      <span>{getTournamentField(selectedTournament, 'sport')}</span>
                      <span>Entry Fee: {getTournamentField(selectedTournament, 'entryFee')}</span>
                    </div>
                  </div>

                  <div className="form-fields">
                    <div className="form-field">
                      <label htmlFor="team-name">Team/Player Name *</label>
                      <input 
                        id="team-name" 
                        type="text" 
                        placeholder="Enter your team or player name" 
                        required 
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="contact">Contact Number *</label>
                      <input 
                        id="contact" 
                        type="tel" 
                        placeholder="Your contact number" 
                        required 
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="email">Email Address *</label>
                      <input 
                        id="email" 
                        type="email" 
                        placeholder="your.email@example.com" 
                        required 
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="experience">Experience Level</label>
                      <input 
                        id="experience" 
                        type="text" 
                        placeholder="e.g., Beginner, Intermediate, Advanced" 
                      />
                    </div>
                  </div>

                  <div className="payment-info">
                    <p>Payment Details</p>
                    <p>
                      Entry fee of {getTournamentField(selectedTournament, 'entryFee')} will be collected upon confirmation
                    </p>
                  </div>

                  <button 
                    className="submit-button"
                    onClick={() => handleRegister(selectedTournament)}
                  >
                    Complete Registration
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}