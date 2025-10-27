import React, { useState } from "react";
import { MapPin, Calendar, CheckCircle2, XCircle, Filter, User, Mail, Phone, Award, Clock, Target } from "lucide-react";
import "../../styles/coach/requests.scss";
import CoachNav from './coachnav';

export default function CoachRequests() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Alex Martinez",
      sport: "Tennis",
      location: "Los Angeles, CA",
      date: "2025-10-20",
      level: "Intermediate",
      message: "Looking to improve my serve and backhand technique",
      status: "pending",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      email: "alex.martinez@email.com",
      phone: "+1 (555) 123-4567",
      age: 24,
      experience: "3 years",
      goals: ["Improve serve technique", "Enhance backhand power", "Tournament preparation"],
      achievements: ["Local club champion 2024", "University team player"],
      availability: ["Weekdays after 6 PM", "Weekends morning"],
      preferredLocation: "Westside Tennis Club",
      height: "6'1\"",
      weight: "180 lbs"
    },
    {
      id: 2,
      name: "Emily Chen",
      sport: "Badminton",
      location: "Santa Monica, CA",
      date: "2025-10-21",
      level: "Beginner",
      message: "New to badminton, seeking fundamentals training",
      status: "pending",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      email: "emily.chen@email.com",
      phone: "+1 (555) 987-6543",
      age: 19,
      experience: "6 months",
      goals: ["Learn basic techniques", "Improve footwork", "Join recreational league"],
      achievements: ["Beginner tournament participant"],
      availability: ["Mon, Wed, Fri evenings", "Sunday afternoons"],
      preferredLocation: "Santa Monica Sports Center",
      height: "5'6\"",
      weight: "135 lbs"
    },
    {
      id: 3,
      name: "Marcus Thompson",
      sport: "Tennis",
      location: "Pasadena, CA",
      date: "2025-10-22",
      level: "Advanced",
      message: "Preparing for upcoming regional tournament",
      status: "pending",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      email: "marcus.thompson@email.com",
      phone: "+1 (555) 456-7890",
      age: 28,
      experience: "8 years",
      goals: ["Tournament preparation", "Improve mental game", "Advanced strategy"],
      achievements: ["State champion 2023", "College team captain", "UTR 10.5"],
      availability: ["Flexible - full time athlete"],
      preferredLocation: "Pasadena Tennis Center",
      height: "6'3\"",
      weight: "195 lbs"
    },
  ]);

  const [filterSport, setFilterSport] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleAccept = (id) => {
    setRequests(
      requests.map((r) =>
        r.id === id ? { ...r, status: "accepted" } : r
      )
    );
  };

  const handleReject = (id) => {
    setRequests(
      requests.map((r) =>
        r.id === id ? { ...r, status: "rejected" } : r
      )
    );
  };

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
    setShowProfileModal(true);
  };

  const filtered = requests
    .filter((r) => filterSport === "all" || r.sport === filterSport)
    .filter((r) => filterStatus === "all" || r.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      if (sortBy === "sport") return a.sport.localeCompare(b.sport);
      return 0;
    });

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const acceptedCount = requests.filter((r) => r.status === "accepted").length;

  return (
    <div>
      <CoachNav />
      <div className="requests-page">
        <div className="header">
          <h1>Student Requests</h1>
          <p>Review and manage athlete coaching requests</p>
        </div>

        {/* Stats */}
        <div className="stats">
          <div className="card amber">
            <p>Pending</p>
            <h2>{pendingCount}</h2>
          </div>
          <div className="card green">
            <p>Accepted</p>
            <h2>{acceptedCount}</h2>
          </div>
          <div className="card grey">
            <p>Total</p>
            <h2>{requests.length}</h2>
          </div>
        </div>

        {/* Filters */}
        <div className="filter-section">
          <div className="filter-title">
            <Filter size={16} />
            <span>Filters</span>
          </div>
          <div className="filters">
            <select
              value={filterSport}
              onChange={(e) => setFilterSport(e.target.value)}
            >
              <option value="all">All Sports</option>
              <option value="Tennis">Tennis</option>
              <option value="Badminton">Badminton</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">Date</option>
              <option value="sport">Sport</option>
            </select>
          </div>
        </div>

        {/* Request Cards */}
        <div className="request-list">
          {filtered.map((r) => (
            <div
              key={r.id}
              className={`request-card ${r.status}`}
            >
              <img src={r.image} alt={r.name} className="avatar" />
              <div className="info">
                <div className="top">
                  <h3>{r.name}</h3>
                  <div className="badges">
                    <span className="badge sport">{r.sport}</span>
                    <span className="badge level">{r.level}</span>
                    {r.status === "accepted" && (
                      <span className="badge accepted">Accepted</span>
                    )}
                    {r.status === "rejected" && (
                      <span className="badge rejected">Rejected</span>
                    )}
                  </div>
                </div>

                <p className="message">{r.message}</p>

                <div className="meta">
                  <span>
                    <MapPin size={14} /> {r.location}
                  </span>
                  <span>
                    <Calendar size={14} />{" "}
                    {new Date(r.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="actions">
                  <button 
                    className="view-profile" 
                    onClick={() => handleViewProfile(r)}
                  >
                    <User size={16} /> View Full Details
                  </button>
                  
                  {r.status === "pending" && (
                    <>
                      <button className="accept" onClick={() => handleAccept(r.id)}>
                        <CheckCircle2 size={16} /> Accept
                      </button>
                      <button className="reject" onClick={() => handleReject(r.id)}>
                        <XCircle size={16} /> Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="no-results">
              No requests found matching your filters.
            </div>
          )}
        </div>

        {/* Student Profile Modal */}
        {showProfileModal && selectedStudent && (
          <div className="modal-backdrop">
            <div className="modal profile-modal">
              <div className="modal-header">
                <h2>Student Profile</h2>
                <button 
                  className="close-btn" 
                  onClick={() => setShowProfileModal(false)}
                >
                  ×
                </button>
              </div>

              <div className="profile-content">
                {/* Header Section */}
                <div className="profile-header">
                  <img src={selectedStudent.image} alt={selectedStudent.name} className="profile-avatar" />
                  <div className="profile-info">
                    <h3>{selectedStudent.name}</h3>
                    <div className="profile-badges">
                      <span className="badge sport">{selectedStudent.sport}</span>
                      <span className="badge level">{selectedStudent.level}</span>
                    </div>
                    <p className="profile-message">{selectedStudent.message}</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="profile-section">
                  <h4>Contact Information</h4>
                  <div className="contact-grid">
                    <div className="contact-item">
                      <Mail size={16} />
                      <span>{selectedStudent.email}</span>
                    </div>
                    <div className="contact-item">
                      <Phone size={16} />
                      <span>{selectedStudent.phone}</span>
                    </div>
                    <div className="contact-item">
                      <MapPin size={16} />
                      <span>{selectedStudent.location}</span>
                    </div>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="profile-section">
                  <h4>Personal Details</h4>
                  <div className="details-grid">
                    <div className="detail-item">
                      <strong>Age:</strong>
                      <span>{selectedStudent.age}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Height:</strong>
                      <span>{selectedStudent.height}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Weight:</strong>
                      <span>{selectedStudent.weight}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Experience:</strong>
                      <span>{selectedStudent.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Training Goals */}
                <div className="profile-section">
                  <h4>
                    <Target size={18} />
                    Training Goals
                  </h4>
                  <div className="goals-list">
                    {selectedStudent.goals.map((goal, index) => (
                      <div key={index} className="goal-item">
                        <CheckCircle2 size={16} />
                        <span>{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="profile-section">
                  <h4>
                    <Award size={18} />
                    Achievements
                  </h4>
                  <div className="achievements-list">
                    {selectedStudent.achievements.map((achievement, index) => (
                      <div key={index} className="achievement-item">
                        <Award size={14} />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="profile-section">
                  <h4>
                    <Clock size={18} />
                    Availability
                  </h4>
                  <div className="availability-list">
                    {selectedStudent.availability.map((slot, index) => (
                      <div key={index} className="availability-item">
                        <Calendar size={14} />
                        <span>{slot}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preferred Location */}
                <div className="profile-section">
                  <h4>Preferred Training Location</h4>
                  <div className="location-preferred">
                    <MapPin size={16} />
                    <span>{selectedStudent.preferredLocation}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                {selectedStudent.status === "pending" && (
                  <div className="profile-actions">
                    <button 
                      className="accept-btn large"
                      onClick={() => {
                        handleAccept(selectedStudent.id);
                        setShowProfileModal(false);
                      }}
                    >
                      <CheckCircle2 size={18} />
                      Accept Request
                    </button>
                    <button 
                      className="reject-btn large"
                      onClick={() => {
                        handleReject(selectedStudent.id);
                        setShowProfileModal(false);
                      }}
                    >
                      <XCircle size={18} />
                      Reject Request
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}