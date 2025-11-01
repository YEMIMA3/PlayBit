import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Mail, Phone, Calendar, TrendingUp, Award, Users, Filter, 
  Eye, MessageCircle, Download, MoreVertical, Star, Target, Activity
} from 'lucide-react';

const AdminAthlete = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const students = [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex.j@student.com',
      phone: '+1 234 567 8910',
      age: 16,
      sport: 'Basketball',
      coach: 'John Smith',
      joinDate: '2023-09-01',
      level: 'Intermediate',
      attendance: 92,
      progress: 85,
      performance: 88,
      achievements: ['Player of Month', 'Top Scorer'],
      sessions: 45,
      nextSession: '2024-01-20',
      status: 'active'
    },
    {
      id: 2,
      name: 'Maya Patel',
      email: 'maya.p@student.com',
      phone: '+1 234 567 8911',
      age: 15,
      sport: 'Tennis',
      coach: 'Sarah Johnson',
      joinDate: '2023-10-15',
      level: 'Advanced',
      attendance: 88,
      progress: 92,
      performance: 95,
      achievements: ['Tournament Winner', 'Most Improved'],
      sessions: 32,
      nextSession: '2024-01-22',
      status: 'active'
    },
    {
      id: 3,
      name: 'Ryan Brown',
      email: 'ryan.b@student.com',
      phone: '+1 234 567 8912',
      age: 17,
      sport: 'Swimming',
      coach: 'Mike Chen',
      joinDate: '2024-01-20',
      level: 'Beginner',
      attendance: 95,
      progress: 78,
      performance: 82,
      achievements: ['Swim Competition'],
      sessions: 12,
      nextSession: '2024-01-25',
      status: 'active'
    },
    {
      id: 4,
      name: 'Sophia Garcia',
      email: 'sophia.g@student.com',
      phone: '+1 234 567 8913',
      age: 16,
      sport: 'Football',
      coach: 'Emma Davis',
      joinDate: '2023-11-10',
      level: 'Intermediate',
      attendance: 90,
      progress: 88,
      performance: 85,
      achievements: ['Team Captain', 'Best Defender'],
      sessions: 38,
      nextSession: '2024-01-21',
      status: 'inactive'
    },
    {
      id: 5,
      name: 'James Wilson',
      email: 'james.w@student.com',
      phone: '+1 234 567 8914',
      age: 14,
      sport: 'Basketball',
      coach: 'John Smith',
      joinDate: '2023-12-05',
      level: 'Beginner',
      attendance: 85,
      progress: 72,
      performance: 75,
      achievements: ['Rookie of Month'],
      sessions: 18,
      nextSession: '2024-01-23',
      status: 'active'
    }
  ];

  const sports = ['all', ...new Set(students.map(student => student.sport))];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredStudents = students.filter(student =>
    (selectedSport === 'all' || student.sport === selectedSport) &&
    (selectedLevel === 'all' || student.level === selectedLevel) &&
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.coach.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.sport.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'Intermediate': return 'text-green-600 bg-green-100 border-green-200';
      case 'Advanced': return 'text-purple-600 bg-purple-100 border-purple-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'text-green-600 bg-green-100';
    if (progress >= 80) return 'text-blue-600 bg-blue-100';
    if (progress >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100';
  };

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
    setShowProfileModal(true);
  };

  const handleSendMessage = (student) => {
    alert(`Message dialog would open for ${student.name}`);
  };

  const handleExportData = () => {
    alert('Exporting student data...');
  };

  const handleQuickAction = (action, student) => {
    switch (action) {
      case 'view':
        handleViewProfile(student);
        break;
      case 'message':
        handleSendMessage(student);
        break;
      case 'schedule':
        alert(`Schedule session for ${student.name}`);
        break;
      default:
        break;
    }
  };

  const ProgressBar = ({ percentage, color }) => (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <motion.div 
          className={`progress-fill ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <span className="progress-text">{percentage}%</span>
    </div>
  );

  return (
    <div className="admin-students">
      {/* Header */}
      <motion.div
        className="admin-page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-content">
          <div className="header-text">
            <h1>Student Management</h1>
            <p>Monitor student progress and performance</p>
          </div>
          <div className="header-actions">
            <motion.button
              className="export-btn"
              onClick={handleExportData}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} />
              Export Data
            </motion.button>
          </div>
        </div>

        {/* Stats Overview */}
        <motion.div 
          className="stats-overview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-card">
            <div className="stat-icon primary">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <h3>{students.length}</h3>
              <p>Total Students</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon success">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <h3>{Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)}%</h3>
              <p>Avg Progress</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon warning">
              <Activity size={24} />
            </div>
            <div className="stat-content">
              <h3>{Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length)}%</h3>
              <p>Avg Attendance</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon info">
              <Target size={24} />
            </div>
            <div className="stat-content">
              <h3>{students.filter(s => s.level === 'Advanced').length}</h3>
              <p>Advanced Level</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Controls */}
      <motion.div
        className="controls-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="controls-row">
          <div className="search-filter-group">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search students by name, coach, or sport..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-group">
              <div className="filter-item">
                <Filter size={16} />
                <select 
                  value={selectedSport} 
                  onChange={(e) => setSelectedSport(e.target.value)}
                >
                  <option value="all">All Sports</option>
                  {sports.filter(sport => sport !== 'all').map(sport => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-item">
                <Star size={16} />
                <select 
                  value={selectedLevel} 
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  <option value="all">All Levels</option>
                  {levels.filter(level => level !== 'all').map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="view-controls">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid View
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              List View
            </button>
          </div>
        </div>
      </motion.div>

      {/* Students Grid/List */}
      <motion.div
        className="students-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {viewMode === 'grid' ? (
          <div className="students-grid">
            <AnimatePresence>
              {filteredStudents.map((student, index) => (
                <motion.div
                  key={student.id}
                  className="student-card glass-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Card Header */}
                  <div className="card-header">
                    <div className="student-avatar">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="student-info">
                      <h3>{student.name}</h3>
                      <p>{student.sport} • Age {student.age}</p>
                    </div>
                    <div className="status-badge">
                      <span className={`status-dot ${student.status}`}></span>
                      {student.status}
                    </div>
                  </div>

                  {/* Coach Info */}
                  <div className="coach-info">
                    <span>Coach: {student.coach}</span>
                  </div>

                  {/* Progress Stats */}
                  <div className="progress-stats">
                    <div className="stat-item">
                      <label>Progress</label>
                      <ProgressBar 
                        percentage={student.progress} 
                        color={getProgressColor(student.progress).split(' ')[0].replace('text-', '')}
                      />
                    </div>
                    <div className="stat-item">
                      <label>Attendance</label>
                      <ProgressBar 
                        percentage={student.attendance} 
                        color="green"
                      />
                    </div>
                    <div className="stat-item">
                      <label>Performance</label>
                      <ProgressBar 
                        percentage={student.performance} 
                        color="blue"
                      />
                    </div>
                  </div>

                  {/* Level & Sessions */}
                  <div className="meta-info">
                    <span className={`level-badge ${getLevelColor(student.level)}`}>
                      {student.level}
                    </span>
                    <span className="sessions">
                      {student.sessions} sessions
                    </span>
                  </div>

                  {/* Achievements */}
                  <div className="achievements-preview">
                    {student.achievements.slice(0, 2).map((achievement, idx) => (
                      <span key={idx} className="achievement-tag">
                        <Award size={12} />
                        {achievement}
                      </span>
                    ))}
                    {student.achievements.length > 2 && (
                      <span className="more-achievements">
                        +{student.achievements.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="card-actions">
                    <motion.button
                      className="action-btn primary"
                      onClick={() => handleViewProfile(student)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye size={16} />
                      View Profile
                    </motion.button>
                    <motion.button
                      className="action-btn secondary"
                      onClick={() => handleSendMessage(student)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageCircle size={16} />
                      Message
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="students-table">
            <div className="table-header">
              <div>Student</div>
              <div>Sport & Coach</div>
              <div>Level</div>
              <div>Progress</div>
              <div>Attendance</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            <AnimatePresence>
              {filteredStudents.map((student, index) => (
                <motion.div
                  key={student.id}
                  className="table-row"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="student-cell">
                    <div className="student-avatar small">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="student-name">{student.name}</div>
                      <div className="student-email">{student.email}</div>
                    </div>
                  </div>
                  <div className="sport-cell">
                    <div className="sport">{student.sport}</div>
                    <div className="coach">{student.coach}</div>
                  </div>
                  <div className="level-cell">
                    <span className={`level-badge ${getLevelColor(student.level)}`}>
                      {student.level}
                    </span>
                  </div>
                  <div className="progress-cell">
                    <ProgressBar percentage={student.progress} color="blue" />
                  </div>
                  <div className="attendance-cell">
                    <ProgressBar percentage={student.attendance} color="green" />
                  </div>
                  <div className="status-cell">
                    <span className={`status-badge ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </div>
                  <div className="actions-cell">
                    <div className="action-buttons">
                      <motion.button
                        className="icon-btn"
                        onClick={() => handleViewProfile(student)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye size={16} />
                      </motion.button>
                      <motion.button
                        className="icon-btn"
                        onClick={() => handleSendMessage(student)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <MessageCircle size={16} />
                      </motion.button>
                      <motion.button
                        className="icon-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <MoreVertical size={16} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Empty State */}
      {filteredStudents.length === 0 && (
        <motion.div
          className="empty-state"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Users size={64} />
          <h3>No students found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  );
};

export default AdminAthlete;