import React, { useState } from "react";
import "../../styles/coach/tournaments.scss";
import CoachNav from './coachnav';

export default function CoachTournaments() {
  const [tournaments, setTournaments] = useState([
    {
      id: 1,
      title: "Regional Tennis Championship",
      date: "2025-11-15",
      location: "Los Angeles Sports Complex",
      sport: "Tennis",
      level: "Advanced",
      description: "Annual regional championship for advanced players. Singles and doubles categories.",
      registeredAthletes: 12,
      maxPlayers: 16,
      registrationFee: 75,
      athletes: [
        { id: 1, name: "Alex Martinez", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop" },
        { id: 2, name: "Marcus Thompson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop" },
        { id: 3, name: "Sophie Williams", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop" },
        { id: 4, name: "James Wilson", avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=60&h=60&fit=crop" },
        { id: 5, name: "Emma Davis", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop" },
        { id: 6, name: "Michael Brown", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop" },
        { id: 7, name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop" }
      ]
    },
    {
      id: 2,
      title: "Badminton Open Tournament",
      date: "2025-11-16",
      location: "Metro Indoor Arena",
      sport: "Badminton",
      level: "All Levels",
      description: "Open tournament for all skill levels. Great opportunity for beginners to gain experience.",
      registeredAthletes: 8,
      maxPlayers: 12,
      registrationFee: 35,
      athletes: [
        { id: 1, name: "Emily Chen", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop" },
        { id: 2, name: "David Lee", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop" }
      ]
    },
    {
      id: 3,
      title: "City Basketball Championship",
      date: "2025-11-20",
      location: "Downtown Sports Center",
      sport: "Basketball",
      level: "Intermediate",
      description: "5v5 basketball tournament for intermediate level players.",
      registeredAthletes: 10,
      maxPlayers: 20,
      registrationFee: 120,
      athletes: []
    }
  ]);

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
    title: "",
    date: "",
    location: "",
    sport: "",
    level: "",
    description: "",
    maxPlayers: "",
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

  const handleAddTournament = () => {
    if (!newTournament.title) return;
    const newT = {
      id: tournaments.length + 1,
      ...newTournament,
      maxPlayers: parseInt(newTournament.maxPlayers) || 0,
      registrationFee: parseFloat(newTournament.registrationFee) || 0,
      registeredAthletes: 0,
      athletes: []
    };
    setTournaments([...tournaments, newT]);
    setNewTournament({
      title: "",
      date: "",
      location: "",
      sport: "",
      level: "",
      description: "",
      maxPlayers: "",
      registrationFee: "",
    });
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

  const handleShareTournament = (tournament) => {
    const seatsLeft = tournament.maxPlayers - tournament.registeredAthletes;
    const feeText = tournament.registrationFee > 0 ? `Registration fee: $${tournament.registrationFee}` : "Free registration";
    const shareText = `Check out this ${tournament.sport} tournament: ${tournament.title} on ${formatDate(tournament.date)} at ${tournament.location}. ${seatsLeft} seats left! ${feeText}`;
    
    if (navigator.share) {
      navigator.share({
        title: tournament.title,
        text: shareText,
        url: window.location.href,
      })
      .catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Tournament details copied to clipboard!');
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getShortDate = (dateString) => {
    const date = new Date(dateString);
    return date.getDate().toString();
  };

  const getMonth = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short' });
  };

  // Calculate seats left
  const getSeatsLeft = (tournament) => {
    return tournament.maxPlayers - tournament.registeredAthletes;
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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

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
                  placeholder="Tournament Title"
                  value={newTournament.title}
                  onChange={(e) =>
                    setNewTournament({ ...newTournament, title: e.target.value })
                  }
                />
                <input
                  type="date"
                  placeholder="Date"
                  value={newTournament.date}
                  onChange={(e) =>
                    setNewTournament({ ...newTournament, date: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newTournament.location}
                  onChange={(e) =>
                    setNewTournament({ ...newTournament, location: e.target.value })
                  }
                />
                <select
                  value={newTournament.sport}
                  onChange={(e) =>
                    setNewTournament({ ...newTournament, sport: e.target.value })
                  }
                >
                  <option value="">Select Sport</option>
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
                  placeholder="Maximum Players"
                  value={newTournament.maxPlayers}
                  onChange={(e) =>
                    setNewTournament({ ...newTournament, maxPlayers: e.target.value })
                  }
                  min="1"
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
              <button className="primary-btn" onClick={handleAddTournament}>
                Create Tournament
              </button>
            </div>

            <div className="list-section">
              <h2>Upcoming Tournaments</h2>
              
              {calendarView ? (
                <div className="calendar-view">
                  {tournaments.map((tournament) => {
                    const availability = getAvailabilityStatus(tournament);
                    return (
                      <div className="calendar-tournament-card" key={tournament.id}>
                        <div className="calendar-date">
                          <span className="date-number">{getShortDate(tournament.date)}</span>
                          <span className="date-month">{getMonth(tournament.date)}</span>
                        </div>
                        <div className="calendar-details">
                          <h3>{tournament.title}</h3>
                          <p className="sport-info">{tournament.sport} • {tournament.level}</p>
                          <p className="description">{tournament.description}</p>
                          <div className="tournament-footer">
                            <span className="location">📍 {tournament.location}</span>
                            <div className="availability-info">
                              <span className="seats-left">
                                {getSeatsLeft(tournament)}/{tournament.maxPlayers} seats
                              </span>
                              <span className="registration-fee">
                                {tournament.registrationFee > 0 ? formatCurrency(tournament.registrationFee) : "Free"}
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
                        {/* Action Buttons for Calendar View */}
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
                      <div className="tournament-card" key={tournament.id}>
                        <div className="tournament-header">
                          <div className="date-badge">
                            <span className="month">{getMonth(tournament.date)}</span>
                            <span className="day">{getShortDate(tournament.date)}</span>
                          </div>
                          <div className="tournament-title">
                            <h3>{tournament.title}</h3>
                            <p className="sport-level">{tournament.sport} {tournament.level}</p>
                            <div className="tournament-meta">
                              <span className="registered-count">
                                {tournament.registeredAthletes} registered
                              </span>
                              <span className="fee-badge">
                                {tournament.registrationFee > 0 ? formatCurrency(tournament.registrationFee) : "Free"}
                              </span>
                              <span 
                                className={`availability-status ${availability.status}`}
                                style={{ color: availability.color }}
                              >
                                {availability.text}
                              </span>
                            </div>
                          </div>
                          {/* Action Buttons for List View */}
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
                        
                        <p className="tournament-description">{tournament.description}</p>
                        
                        <div className="tournament-footer">
                          <span className="location">📍 {tournament.location}</span>
                          <div className="seats-info">
                            <span className="seats-left">
                              {getSeatsLeft(tournament)} seats left of {tournament.maxPlayers}
                            </span>
                            <span className="full-date">{formatDate(tournament.date)}</span>
                          </div>
                        </div>

                        {tournament.athletes.length > 0 && (
                          <div className="registered-athletes">
                            <p className="section-label">Registered Athletes:</p>
                            <div className="athletes-grid">
                              {tournament.athletes.map((athlete) => (
                                <div key={athlete.id} className="athlete-avatar">
                                  <img src={athlete.avatar} alt={athlete.name} />
                                  <span className="tooltip">{athlete.name}</span>
                                </div>
                              ))}
                              {tournament.registeredAthletes > tournament.athletes.length && (
                                <div className="more-athletes">
                                  +{tournament.registeredAthletes - tournament.athletes.length}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
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
                <h2>{selectedTournament.title}</h2>
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
                    <span>{selectedTournament.level}</span>
                  </div>
                  <div className="info-row">
                    <label>Registration Fee:</label>
                    <span className={`fee-amount ${selectedTournament.registrationFee === 0 ? 'free' : ''}`}>
                      {selectedTournament.registrationFee > 0 
                        ? formatCurrency(selectedTournament.registrationFee) 
                        : "Free Entry"
                      }
                    </span>
                  </div>
                  <div className="info-row">
                    <label>Registered Athletes:</label>
                    <span>{selectedTournament.registeredAthletes} of {selectedTournament.maxPlayers}</span>
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
                  <p>{selectedTournament.description}</p>
                </div>

                {/* Progress Bar for Seats */}
                <div className="seats-progress">
                  <h3>Registration Progress</h3>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${(selectedTournament.registeredAthletes / selectedTournament.maxPlayers) * 100}%`,
                        backgroundColor: getAvailabilityStatus(selectedTournament).color
                      }}
                    ></div>
                  </div>
                  <div className="progress-stats">
                    <span>{selectedTournament.registeredAthletes} registered</span>
                    <span>{getSeatsLeft(selectedTournament)} seats left</span>
                  </div>
                </div>

                {selectedTournament.athletes.length > 0 && (
                  <div className="athletes-section">
                    <h3>Registered Athletes</h3>
                    <div className="athletes-list">
                      {selectedTournament.athletes.map((athlete) => (
                        <div key={athlete.id} className="athlete-item">
                          <img src={athlete.avatar} alt={athlete.name} />
                          <span>{athlete.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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