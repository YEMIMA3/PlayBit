import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Calendar, Filter } from 'lucide-react';
import '../../styles/athlete/athlete-announcements.scss';

const AthleteAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [filter, setFilter] = useState('all');
  const [unreadCount, setUnreadCount] = useState(3);

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
      }
    ];
    setAnnouncements(mockAnnouncements);
  }, []);

  const filteredAnnouncements = filter === 'all' 
    ? announcements 
    : announcements.filter(announcement => announcement.type === filter);

  return (
    <div className="athlete-announcements-page">
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
        </motion.div>

        <div className="announcements-list">
          <AnimatePresence>
            {filteredAnnouncements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                className={`announcement-card glass-card ${announcement.isRead ? 'read' : 'unread'}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
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
                  {!announcement.isRead && (
                    <motion.span className="new-badge">New</motion.span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AthleteAnnouncements;