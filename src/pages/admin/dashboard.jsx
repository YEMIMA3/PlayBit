import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BarChart3, 
  Settings, 
  Shield, 
  TrendingUp,
  Calendar,
  Bell,
  Search,
  LogOut
} from 'lucide-react';
import '../../styles/admin/dashboard.scss';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminData, setAdminData] = useState({});

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const adminToken = localStorage.getItem('admin_token');
    const adminData = localStorage.getItem('admin_data');
    
    if (!adminToken) {
      console.log('No admin token found, redirecting to login...');
      window.location.href = '/admin/auth';
      return;
    }
    
    try {
      if (adminData) {
        setAdminData(JSON.parse(adminData));
      }
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error parsing admin data:', error);
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_data');
      window.location.href = '/admin/auth';
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_data');
    window.location.href = '/admin/auth';
  };

  const stats = [
    { label: "Total Users", value: "2,847", icon: Users, color: "#3b82f6", change: "+12%" },
    { label: "Active Coaches", value: "156", icon: Shield, color: "#10b981", change: "+8%" },
    { label: "Revenue", value: "$24,589", icon: TrendingUp, color: "#f59e0b", change: "+23%" },
    { label: "Tournaments", value: "42", icon: Calendar, color: "#8b5cf6", change: "+5" },
  ];

  // Show loading state
  if (isLoading) {
    return (
      <div className="admin-dashboard-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  // Show nothing if not authenticated (redirect will happen)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {adminData.name || 'Admin'}! 👋</p>
        </div>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={20} />
            <input type="text" placeholder="Search..." />
          </div>
          <button className="notification-btn">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            Logout
          </button>
          <div className="admin-profile">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
              alt="Admin" 
            />
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.label}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                <Icon size={24} color="#fff" />
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
                <span className="stat-change positive">{stat.change}</span>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <motion.button 
            className="action-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Users size={24} />
            <span>Manage Users</span>
          </motion.button>
          <motion.button 
            className="action-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Shield size={24} />
            <span>Coach Verification</span>
          </motion.button>
          <motion.button 
            className="action-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BarChart3 size={24} />
            <span>Analytics</span>
          </motion.button>
          <motion.button 
            className="action-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings size={24} />
            <span>Settings</span>
          </motion.button>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon new-user">👤</div>
            <div className="activity-content">
              <p><strong>New user registration</strong></p>
              <span>2 minutes ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon coach-verified">✅</div>
            <div className="activity-content">
              <p><strong>Coach verification approved</strong></p>
              <span>1 hour ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon tournament">🏆</div>
            <div className="activity-content">
              <p><strong>New tournament created</strong></p>
              <span>3 hours ago</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;