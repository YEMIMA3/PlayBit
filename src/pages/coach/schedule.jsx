import React, { useState } from 'react';
import "../../styles/coach/schedule.scss";
import CoachNav from './coachnav';

const SchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Sample sessions data
  const [sessions, setSessions] = useState([
    {
      id: 1,
      title: "Tennis - John Smith",
      start: new Date(2024, 0, 15, 10, 0),
      end: new Date(2024, 0, 15, 11, 30),
      clientName: "John Smith",
      sport: "Tennis",
      type: "Private",
      status: "confirmed",
      location: "Central Tennis Court",
      notes: "Focus on backhand technique"
    },
    {
      id: 2,
      title: "Basketball - Sarah Johnson",
      start: new Date(2024, 0, 15, 14, 0),
      end: new Date(2024, 0, 15, 15, 0),
      clientName: "Sarah Johnson",
      sport: "Basketball",
      type: "Group",
      status: "confirmed",
      location: "Sports Arena",
      notes: "Team practice session"
    },
    {
      id: 3,
      title: "Soccer - Mike Davis",
      start: new Date(2024, 0, 16, 16, 0),
      end: new Date(2024, 0, 16, 17, 30),
      clientName: "Mike Davis",
      sport: "Soccer",
      type: "Private",
      status: "pending",
      location: "City Field",
      notes: "First session - assessment"
    },
    {
      id: 4,
      title: "Tennis - Emma Wilson",
      start: new Date(2024, 0, 17, 9, 0),
      end: new Date(2024, 0, 17, 10, 30),
      clientName: "Emma Wilson",
      sport: "Tennis",
      type: "Private",
      status: "confirmed",
      location: "Central Tennis Court",
      notes: "Serve practice"
    }
  ]);

  // Get sessions for selected date
  const getSessionsForDate = (date) => {
    return sessions.filter(session => {
      const sessionDate = new Date(session.start);
      return sessionDate.toDateString() === date.toDateString();
    }).sort((a, b) => new Date(a.start) - new Date(b.start));
  };

  // Get upcoming sessions (next 3 days)
  const getUpcomingSessions = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(threeDaysLater.getDate() + 3);
    
    return sessions.filter(session => {
      const sessionDate = new Date(session.start);
      return sessionDate >= today && sessionDate <= threeDaysLater;
    }).sort((a, b) => new Date(a.start) - new Date(b.start));
  };

  // Calendar generation
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleAcceptSession = (sessionId) => {
    setSessions(sessions.map(session => 
      session.id === sessionId 
        ? { ...session, status: 'confirmed' }
        : session
    ));
  };

  const handleDeclineSession = (sessionId) => {
    setSessions(sessions.filter(session => session.id !== sessionId));
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const hasSessions = (date) => {
    return sessions.some(session => 
      new Date(session.start).toDateString() === date.toDateString()
    );
  };

  const days = getDaysInMonth(currentMonth);
  const selectedDateSessions = getSessionsForDate(selectedDate);
  const upcomingSessions = getUpcomingSessions();

  return (
    <div>
    <CoachNav />
    <div className="schedule-page">
      <div className="schedule-header">
        <h1>Training Schedule</h1>
        <div className="selected-date">
          {formatDate(selectedDate)}
        </div>
      </div>

      <div className="schedule-content">
        {/* Small Calendar Sidebar */}
        <div className="calendar-sidebar">
          <div className="calendar-mini">
            <div className="calendar-header">
              <button 
                className="nav-btn"
                onClick={() => navigateMonth(-1)}
              >
                ‹
              </button>
              <span className="month-year">
                {currentMonth.toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
              <button 
                className="nav-btn"
                onClick={() => navigateMonth(1)}
              >
                ›
              </button>
            </div>

            <div className="week-days">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="week-day">{day}</div>
              ))}
            </div>

            <div className="calendar-days">
              {days.map((date, index) => (
                <button
                  key={index}
                  className={`calendar-day ${
                    date ? '' : 'empty'
                  } ${
                    date && isToday(date) ? 'today' : ''
                  } ${
                    date && isSelected(date) ? 'selected' : ''
                  } ${
                    date && hasSessions(date) ? 'has-sessions' : ''
                  }`}
                  onClick={() => date && handleDateSelect(date)}
                  disabled={!date}
                >
                  {date ? date.getDate() : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Date Navigation */}
          <div className="quick-dates">
            <button 
              className="quick-date-btn"
              onClick={() => setSelectedDate(new Date())}
            >
              Today
            </button>
            <button 
              className="quick-date-btn"
              onClick={() => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                setSelectedDate(tomorrow);
              }}
            >
              Tomorrow
            </button>
          </div>
        </div>

        {/* Main Content - Sessions */}
        <div className="sessions-main">
          {/* Selected Date Sessions */}
          <div className="sessions-section">
            <h2>Sessions for {formatDate(selectedDate)}</h2>
            <div className="sessions-grid">
              {selectedDateSessions.length === 0 ? (
                <div className="no-sessions-card">
                  <div className="no-sessions-icon">📅</div>
                  <h3>No Sessions</h3>
                  <p>No training sessions scheduled for this date</p>
                </div>
              ) : (
                selectedDateSessions.map(session => (
                  <div key={session.id} className="session-card">
                    <div className="session-header">
                      <div className="session-sport-badge">{session.sport}</div>
                      <div className={`session-status ${session.status}`}>
                        {session.status}
                      </div>
                    </div>
                    
                    <div className="session-time">
                      {formatTime(session.start)} - {formatTime(session.end)}
                    </div>
                    
                    <div className="session-client">
                      <strong>{session.clientName}</strong>
                    </div>
                    
                    <div className="session-details">
                      <div className="detail-item">
                        <span className="detail-label">Type:</span>
                        <span>{session.type}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Location:</span>
                        <span>{session.location}</span>
                      </div>
                      {session.notes && (
                        <div className="detail-item">
                          <span className="detail-label">Notes:</span>
                          <span>{session.notes}</span>
                        </div>
                      )}
                    </div>

                    {session.status === 'pending' && (
                      <div className="session-actions">
                        <button 
                          className="btn-accept"
                          onClick={() => handleAcceptSession(session.id)}
                        >
                          Accept
                        </button>
                        <button 
                          className="btn-decline"
                          onClick={() => handleDeclineSession(session.id)}
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="sessions-section">
            <h2>Upcoming Sessions (Next 3 Days)</h2>
            <div className="upcoming-list">
              {upcomingSessions.length === 0 ? (
                <div className="no-upcoming">
                  No upcoming sessions in the next 3 days
                </div>
              ) : (
                upcomingSessions.map(session => (
                  <div key={session.id} className="upcoming-item">
                    <div className="upcoming-date">
                      {formatDate(new Date(session.start))}
                    </div>
                    <div className="upcoming-time">
                      {formatTime(session.start)}
                    </div>
                    <div className="upcoming-details">
                      <div className="upcoming-sport">{session.sport}</div>
                      <div className="upcoming-client">{session.clientName}</div>
                    </div>
                    <div className={`upcoming-status ${session.status}`}>
                      {session.status}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SchedulePage;