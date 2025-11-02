import React, { useState, useEffect } from "react";
import "../../styles/coach/tournaments.scss";
import CoachNav from './coachnav';
import { tournamentService, getCoachProfile } from '../../api/coachProfile';

export default function CoachTournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Training Schedule Update",
      message: "Next week's training sessions will start 30 minutes earlier due to facility maintenance. Please adjust your schedules accordingly.",
      date: "2025-10-24",
      priority: "high"
    },
    {
      id: 2,
      title: "New Equipment Arrival",
      message: "New training equipment has arrived and will be available for use starting Monday.",
      date: "2025-10-22",
      priority: "medium"
    }
  ]);

  const [newTournament, setNewTournament] = useState({
    name: "",
    date: "",
    location: "",
    sport: "",
    level: "",
    description: "",
    participants: "", // Changed from maxPlayers to participants
    registrationFee: "",
  });

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: "",
    priority: "medium"
  });

  const [activeTab, setActiveTab] = useState("tournaments");
  const [calendarView, setCalendarView] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coachName, setCoachName] = useState("");

  // Fetch coach name and tournaments
  useEffect(() => {
    fetchCoachName();
    fetchTournaments();
  }, []);

  const fetchCoachName = async () => {
    try {
      const response = await getCoachProfile();
      setCoachName(response.profile?.name || "Coach");
    } catch (error) {
      console.error('Error fetching coach name:', error);
      setCoachName("Coach");
    }
  };

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tournamentService.getCoachTournaments();
      console.log('📊 Full API response:', response);
      console.log('📊 Response data:', response.data);
      
      // FIX: The tournaments are in response.data directly, not response.data.data
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

  const handleAddTournament = async () => {
    // Validate all required fields
    const requiredFields = {
      name: 'Tournament Name',
      date: 'Date',
      location: 'Location',
      sport: 'Sport',
      participants: 'Number of Participants' // Added participants to required fields
    };
    
    const missingFields = Object.keys(requiredFields).filter(field => !newTournament[field]);
    
    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.map(field => requiredFields[field]);
      alert(`Please fill in all required fields: ${missingFieldNames.join(', ')}`);
      return;
    }
    
    try {
      setLoading(true);
      const tournamentData = {
        name: newTournament.name.trim(),
        date: newTournament.date,
        location: newTournament.location.trim(),
        sport: newTournament.sport,
        level: newTournament.level || 'All Levels',
        description: newTournament.description.trim() || 'No description provided',
        participants: parseInt(newTournament.participants) || 10, // Changed to participants
        registrationFee: parseFloat(newTournament.registrationFee) || 0,
        organizer: coachName || "Coach",
      };

      console.log('🔄 Creating tournament with data:', tournamentData);

      const response = await tournamentService.createTournament(tournamentData);
      
      // Add the new tournament to the list
      setTournaments(prev => [response.data, ...prev]);
      
      // Reset form
      setNewTournament({
        name: "",
        date: "",
        location: "",
        sport: "",
        level: "",
        description: "",
        participants: "", // Changed from maxPlayers to participants
        registrationFee: "",
      });
      
      alert('Tournament created successfully!');
    } catch (error) {
      console.error('Error creating tournament:', error);
      alert(`Failed to create tournament: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAnnouncement = () => {
    if (!newAnnouncement.title) return;
    const newA = {
      id: announcements.length + 1,
      ...newAnnouncement,
      date: new Date().toISOString().split("T")[0],
    };
    setAnnouncements([newA, ...announcements]);
    setNewAnnouncement({ title: "", message: "", priority: "medium" });
  };

  const handleViewDetails = (tournament) => {
    setSelectedTournament(tournament);
  };

  const handleShareTournament = async (tournament) => {
    const maxPlayers = tournament.participants || tournament.maxPlayers || 10;
    const registeredCount = tournament.registeredAthletes || tournament.currentAthleteCount || 0;
    const seatsLeft = maxPlayers - registeredCount;
    const feeText = tournament.registrationFee > 0 ? `Registration fee: $${tournament.registrationFee}` : "Free registration";
    const shareText = `Check out this ${tournament.sport} tournament: ${tournament.name} on ${formatDate(tournament.date)} at ${tournament.location}. ${seatsLeft} seats left! ${feeText}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: tournament.name,
          text: shareText,
          url: window.location.href,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareText);
        alert('Tournament details copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing tournament:', error);
      // Don't show error for user cancellation
      if (error.name !== 'AbortError') {
        alert('Tournament shared successfully!');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not specified';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getShortDate = (dateString) => {
    if (!dateString) return '?';
    try {
      const date = new Date(dateString);
      return date.getDate().toString();
    } catch (error) {
      return '?';
    }
  };

  const getMonth = (dateString) => {
    if (!dateString) return '???';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short' });
    } catch (error) {
      return '???';
    }
  };

  // Calculate seats left
  const getSeatsLeft = (tournament) => {
    const maxPlayers = tournament.participants || tournament.maxPlayers || 10;
    const registeredCount = tournament.registeredAthletes || tournament.currentAthleteCount || 0;
    return maxPlayers - registeredCount;
  };

  // Get availability status
  const getAvailabilityStatus = (tournament) => {
    const seatsLeft = getSeatsLeft(tournament);
    if (seatsLeft === 0) {
      return { status: "full", text: "Fully Booked", color: "#dc3545" };
    } else if (seatsLeft <= 3) {
      return { status: "limited", text: "Limited Seats", color: "#ffc107" };
    } else {
      return { status: "available", text: "Seats Available", color: "#28a745" };
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return "Free";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Loading state
  if (loading && tournaments.length === 0) {
    return (
      <div>
        <CoachNav />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading tournaments...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CoachNav />
      <div className="tournaments-page">
        <div className="page-header">
          <h1>Tournaments & Announcements</h1>
          <p>Manage tournaments and communicate with your athletes</p>
        </div>

        <div className="main-tabs">
          <button
            className={activeTab === "tournaments" ? "active" : ""}
            onClick={() => setActiveTab("tournaments")}
          >
            Tournaments
          </button>
          <button
            className={activeTab === "announcements" ? "active" : ""}
            onClick={() => setActiveTab("announcements")}
          >
            Announcements
          </button>
        </div>

        {/* TOURNAMENTS TAB */}
        {activeTab === "tournaments" && (
          <div className="tab-content">
            <div className="view-toggle">
              <button 
                className={!calendarView ? "active" : ""}
                onClick={() => setCalendarView(false)}
              >
                List View
              </button>
              <button 
                className={calendarView ? "active" : ""}
                onClick={() => setCalendarView(true)}
              >
                Calendar View
              </button>
            </div>

            <div className="create-section">
              <h2>Create New Tournament</h2>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Tournament Name *"
                  value={newTournament.name}
                  onChange={(e) =>
                    setNewTournament({ ...newTournament, name: e.target.value })
                  }
                  className={!newTournament.name ? 'required-field' : ''}
                />
                <input
                  type="date"
                  placeholder="Date *"
                  value={newTournament.date}
                  onChange={(e) =>
                    setNewTournament({ ...newTournament, date: e.target.value })
                  }
                  className={!newTournament.date ? 'required-field' : ''}
                />
                <input
                  type="text"
                  placeholder="Location *"
                  value={newTournament.location}
                  onChange={(e) =>
                    setNewTournament({ ...newTournament, location: e.target.value })
                  }
                  className={!newTournament.location ? 'required-field' : ''}
                />
                <select
                  value={newTournament.sport}
                  onChange={(e) =>
                    setNewTournament({ ...newTournament, sport: e.target.value })
                  }
                  className={!newTournament.sport ? 'required-field' : ''}
                >
                  <option value="">Select Sport *</option>
                  <option value="Tennis">Tennis</option>
                  <option value="Badminton">Badminton</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Soccer">Soccer</option>
                  <option value="Swimming">Swimming</option>
                </select>
                <select
                  value={newTournament.level}
                  onChange={(e) =>
                    setNewTournament({ ...newTournament, level: e.target.value })
                  }
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="All Levels">All Levels</option>
                </select>
                <input
                  type="number"
                  placeholder="Number of Participants *"
                  value={newTournament.participants}
                  onChange={(e) =>
                    setNewTournament({ ...newTournament, participants: e.target.value })
                  }
                  min="1"
                  className={!newTournament.participants ? 'required-field' : ''}
                />
                <input
                  type="number"
                  placeholder="Registration Fee ($)"
                  value={newTournament.registrationFee}
                  onChange={(e) =>
                    setNewTournament({ ...newTournament, registrationFee: e.target.value })
                  }
                  min="0"
                  step="0.01"
                />
              </div>
              <textarea
                placeholder="Tournament Description"
                value={newTournament.description}
                onChange={(e) =>
                  setNewTournament({
                    ...newTournament,
                    description: e.target.value,
                  })
                }
              ></textarea>
              <button 
                className="primary-btn" 
                onClick={handleAddTournament}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Tournament'}
              </button>
            </div>

            <div className="list-section">
              <h2>Available Tournaments</h2>
              
              {error && (
                <div className="error-message">
                  {error}
                  <button onClick={fetchTournaments} className="retry-btn">
                    Try Again
                  </button>
                </div>
              )}
              
              {calendarView ? (
                <div className="calendar-view">
                  {tournaments.map((tournament) => {
                    const availability = getAvailabilityStatus(tournament);
                    return (
                      <div className="calendar-tournament-card" key={tournament._id || tournament.id}>
                        <div className="calendar-date">
                          <span className="date-number">{getShortDate(tournament.date)}</span>
                          <span className="date-month">{getMonth(tournament.date)}</span>
                        </div>
                        <div className="calendar-details">
                          <h3>{tournament.name}</h3>
                          <p className="sport-info">{tournament.sport} • {tournament.level || 'All Levels'}</p>
                          <p className="description">{tournament.description || 'No description provided'}</p>
                          <div className="tournament-footer">
                            <span className="location">📍 {tournament.location}</span>
                            <div className="availability-info">
                              <span className="seats-left">
                                {getSeatsLeft(tournament)}/{tournament.participants} seats
                              </span>
                              <span className="registration-fee">
                                {formatCurrency(tournament.registrationFee)}
                              </span>
                              <span 
                                className={`availability-status ${availability.status}`}
                                style={{ color: availability.color }}
                              >
                                {availability.text}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="card-actions">
                          <button 
                            className="btn-view-details"
                            onClick={() => handleViewDetails(tournament)}
                          >
                            View Details
                          </button>
                          <button 
                            className="btn-share"
                            onClick={() => handleShareTournament(tournament)}
                          >
                            Share
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="tournament-list">
                  {tournaments.map((tournament) => {
                    const availability = getAvailabilityStatus(tournament);
                    return (
                      <div className="tournament-card" key={tournament._id || tournament.id}>
                        <div className="tournament-header">
                          <div className="date-badge">
                            <span className="month">{getMonth(tournament.date)}</span>
                            <span className="day">{getShortDate(tournament.date)}</span>
                          </div>
                          <div className="tournament-title">
                            <h3>{tournament.name}</h3>
                            <p className="sport-level">{tournament.sport} {tournament.level || 'All Levels'}</p>
                            <div className="tournament-meta">
                              <span className="registered-count">
                                {(tournament.registeredAthletes || tournament.currentAthleteCount || 0)} registered
                              </span>
                              <span className="fee-badge">
                                {formatCurrency(tournament.registrationFee)}
                              </span>
                              <span 
                                className={`availability-status ${availability.status}`}
                                style={{ color: availability.color }}
                              >
                                {availability.text}
                              </span>
                            </div>
                          </div>
                          <div className="tournament-actions">
                            <button 
                              className="btn-view-details"
                              onClick={() => handleViewDetails(tournament)}
                            >
                              View Details
                            </button>
                            <button 
                              className="btn-share"
                              onClick={() => handleShareTournament(tournament)}
                            >
                              Share
                            </button>
                          </div>
                        </div>
                        
                        <p className="tournament-description">{tournament.description || 'No description provided'}</p>
                        
                        <div className="tournament-footer">
                          <span className="location">📍 {tournament.location}</span>
                          <div className="seats-info">
                            <span className="seats-left">
                              {getSeatsLeft(tournament)} seats left of {tournament.participants}
                            </span>
                            <span className="full-date">{formatDate(tournament.date)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {tournaments.length === 0 && !loading && (
                <div className="empty-state">
                  <p>No tournaments available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ANNOUNCEMENTS TAB */}
        {activeTab === "announcements" && (
          <div className="tab-content">
            <div className="create-section">
              <h2>Create Announcement</h2>
              <input
                type="text"
                placeholder="Announcement Title"
                value={newAnnouncement.title}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    title: e.target.value,
                  })
                }
              />
              <select
                value={newAnnouncement.priority}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    priority: e.target.value,
                  })
                }
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <textarea
                placeholder="Announcement Message"
                value={newAnnouncement.message}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    message: e.target.value,
                  })
                }
              ></textarea>
              <button className="primary-btn" onClick={handleAddAnnouncement}>
                Post Announcement
              </button>
            </div>

            <div className="list-section">
              <h2>All Announcements</h2>
              <div className="announcements-list">
                {announcements.map((announcement) => (
                  <div className={`announcement-card priority-${announcement.priority}`} key={announcement.id}>
                    <div className="announcement-header">
                      <div className="announcement-title">
                        <h3>{announcement.title}</h3>
                        <span className={`priority-badge ${announcement.priority}`}>
                          {announcement.priority}
                        </span>
                      </div>
                      <span className="announcement-date">{formatDate(announcement.date)}</span>
                    </div>
                    <p className="announcement-message">{announcement.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tournament Details Modal */}
        {selectedTournament && (
          <div className="modal-overlay">
            <div className="tournament-modal">
              <div className="modal-header">
                <h2>{selectedTournament.name}</h2>
                <button 
                  className="close-btn"
                  onClick={() => setSelectedTournament(null)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-content">
                <div className="tournament-info">
                  <div className="info-row">
                    <label>Date:</label>
                    <span>{formatDate(selectedTournament.date)}</span>
                  </div>
                  <div className="info-row">
                    <label>Location:</label>
                    <span>{selectedTournament.location}</span>
                  </div>
                  <div className="info-row">
                    <label>Sport:</label>
                    <span>{selectedTournament.sport}</span>
                  </div>
                  <div className="info-row">
                    <label>Level:</label>
                    <span>{selectedTournament.level || 'All Levels'}</span>
                  </div>
                  <div className="info-row">
                    <label>Registration Fee:</label>
                    <span className={`fee-amount ${selectedTournament.registrationFee === 0 ? 'free' : ''}`}>
                      {formatCurrency(selectedTournament.registrationFee)}
                    </span>
                  </div>
                  <div className="info-row">
                    <label>Registered Athletes:</label>
                    <span>{(selectedTournament.registeredAthletes || selectedTournament.currentAthleteCount || 0)} of {selectedTournament.participants}</span>
                  </div>
                  <div className="info-row">
                    <label>Seats Left:</label>
                    <span className={`seats-left-badge ${getAvailabilityStatus(selectedTournament).status}`}>
                      {getSeatsLeft(selectedTournament)} seats available
                    </span>
                  </div>
                </div>
                
                <div className="description-section">
                  <h3>Description</h3>
                  <p>{selectedTournament.description || 'No description provided'}</p>
                </div>

                <div className="seats-progress">
                  <h3>Registration Progress</h3>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${((selectedTournament.registeredAthletes || selectedTournament.currentAthleteCount || 0) / selectedTournament.participants) * 100}%`,
                        backgroundColor: getAvailabilityStatus(selectedTournament).color
                      }}
                    ></div>
                  </div>
                  <div className="progress-stats">
                    <span>{(selectedTournament.registeredAthletes || selectedTournament.currentAthleteCount || 0)} registered</span>
                    <span>{getSeatsLeft(selectedTournament)} seats left</span>
                  </div>
                </div>

                <div className="modal-actions">
                  <button 
                    className="btn-share"
                    onClick={() => handleShareTournament(selectedTournament)}
                  >
                    Share Tournament
                  </button>
                  <button 
                    className="btn-close"
                    onClick={() => setSelectedTournament(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}