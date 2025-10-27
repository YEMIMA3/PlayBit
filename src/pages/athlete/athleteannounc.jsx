import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Calendar, Filter } from 'lucide-react';
import '../../styles/athlete/athleteannounc.scss';
import AthleteNav from './athleteNav'; 

const AthleteAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [filter, setFilter] = useState('all');
  const [unreadCount, setUnreadCount] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Add sidebar state

  useEffect(() => {
    const mockAnnouncements = [
      {
        id: 1,
        coachName: 'Coach Michael',
        coachSport: 'Basketball',
        title: 'New Training Schedule',
        message: 'Starting next week, we will have morning sessions at 6 AM. Please be prepared with proper gear.',
        type: 'training',
        date: '2024-01-15',
        time: '10:30 AM',
        isRead: false,
        priority: 'high'
      },
      {
        id: 2,
        coachName: 'Coach Sarah',
        coachSport: 'Tennis',
        title: 'Tournament Registration Open',
        message: 'The annual city tennis championship registration is now open. Limited spots available!',
        type: 'tournament',
        date: '2024-01-14',
        time: '2:15 PM',
        isRead: false,
        priority: 'medium'
      },
      {
        id: 3,
        coachName: 'Coach David',
        coachSport: 'Swimming',
        title: 'Pool Maintenance',
        message: 'The main pool will be closed for maintenance this weekend. All sessions moved to the outdoor pool.',
        type: 'facility',
        date: '2024-01-13',
        time: '4:45 PM',
        isRead: true,
        priority: 'medium'
      }
    ];
    setAnnouncements(mockAnnouncements);
    
    // Calculate unread count
    const unread = mockAnnouncements.filter(ann => !ann.isRead).length;
    setUnreadCount(unread);
  }, []);

  const filteredAnnouncements = filter === 'all' 
    ? announcements 
    : announcements.filter(announcement => announcement.type === filter);

  const markAsRead = (id) => {
    setAnnouncements(prev => 
      prev.map(ann => 
        ann.id === id ? { ...ann, isRead: true } : ann
      )
    );
    setUnreadCount(prev => prev - 1);
  };

  return (
    <div className="athlete-announcements-container">
      <AthleteNav />
      
      {/* Mobile menu toggle */}
      <button 
        className="mobile-menu-toggle"
        onClick={() => setSidebarOpen(true)}
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 100,
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '0.5rem',
          display: window.innerWidth < 768 ? 'block' : 'none'
        }}
      >
        ☰
      </button>

      <div className="athlete-announcements-page" style={{ 
        marginLeft: window.innerWidth >= 768 ? '280px' : '0',
        padding: '1rem'
      }}>
        <motion.div 
          className="announcements-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="header-content">
            <div className="title-section">
              <div className="title-with-badge">
                <h1>Announcements</h1>
                {unreadCount > 0 && (
                  <motion.span 
                    className="unread-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </div>
              <p>Latest updates from your coaches</p>
            </div>
          </div>
        </motion.div>

        <div className="announcements-content">
          <motion.div 
            className="filter-tabs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
              <Filter size={16} />
              All Updates
            </button>
            <button className={`filter-btn ${filter === 'training' ? 'active' : ''}`} onClick={() => setFilter('training')}>
              💪 Training
            </button>
            <button className={`filter-btn ${filter === 'tournament' ? 'active' : ''}`} onClick={() => setFilter('tournament')}>
              🏆 Tournament
            </button>
            <button className={`filter-btn ${filter === 'facility' ? 'active' : ''}`} onClick={() => setFilter('facility')}>
              🏊 Facility
            </button>
          </motion.div>

          <div className="announcements-list">
            <AnimatePresence>
              {filteredAnnouncements.length > 0 ? (
                filteredAnnouncements.map((announcement, index) => (
                  <motion.div
                    key={announcement.id}
                    className={`announcement-card glass-card ${announcement.isRead ? 'read' : 'unread'}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                    onClick={() => !announcement.isRead && markAsRead(announcement.id)}
                  >
                    <div className="card-header">
                      <div className="coach-info">
                        <div className="coach-avatar">
                          {announcement.coachName.charAt(0)}
                        </div>
                        <div className="coach-details">
                          <h3>{announcement.coachName}</h3>
                          <span className="sport-badge">{announcement.coachSport}</span>
                        </div>
                      </div>
                      <div className={`priority-indicator ${announcement.priority}`}>
                        {announcement.priority === 'high' ? '🔴' : '🟡'}
                      </div>
                    </div>

                    <div className="card-content">
                      <h4>{announcement.title}</h4>
                      <p>{announcement.message}</p>
                    </div>

                    <div className="card-footer">
                      <div className="timestamp">
                        <Calendar size={14} />
                        <span>{announcement.date}</span>
                        <span className="time">{announcement.time}</span>
                      </div>
                      <div className="card-badges">
                        {!announcement.isRead && (
                          <motion.span 
                            className="new-badge"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            New
                          </motion.span>
                        )}
                        <span className="type-badge">{announcement.type}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="no-announcements"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Bell size={48} />
                  <h3>No announcements found</h3>
                  <p>There are no announcements for the selected filter.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteAnnouncements;