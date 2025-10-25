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
  });

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: "",
    priority: "medium"
  });

  const [activeTab, setActiveTab] = useState("tournaments");
  const [calendarView, setCalendarView] = useState(false);

  const handleAddTournament = () => {
    if (!newTournament.title) return;
    const newT = {
      id: tournaments.length + 1,
      ...newTournament,
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
                {tournaments.map((tournament) => (
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
                        <span className="registered">{tournament.registeredAthletes} registered</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="tournament-list">
                {tournaments.map((tournament) => (
                  <div className="tournament-card" key={tournament.id}>
                    <div className="tournament-header">
                      <div className="date-badge">
                        <span className="month">{getMonth(tournament.date)}</span>
                        <span className="day">{getShortDate(tournament.date)}</span>
                      </div>
                      <div className="tournament-title">
                        <h3>{tournament.title}</h3>
                        <p className="sport-level">{tournament.sport} {tournament.level} • {tournament.registeredAthletes} registered</p>
                      </div>
                    </div>
                    
                    <p className="tournament-description">{tournament.description}</p>
                    
                    <div className="tournament-footer">
                      <span className="location">📍 {tournament.location}</span>
                      <span className="full-date">{formatDate(tournament.date)}</span>
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
                ))}
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
    </div>
    </div>
  );
}