import React, { useState, useEffect } from "react";
import { MapPin, Calendar, CheckCircle2, XCircle, Filter, User, Mail, Phone, Award, Clock, Target, Loader } from "lucide-react";
import "../../styles/coach/requests.scss";
import CoachNav from './coachnav';
import { coachRequestsService } from "../../api/coachRequests";

export default function CoachRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingRequest, setUpdatingRequest] = useState(null);
  const [filterSport, setFilterSport] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Fetch requests from backend
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const requestsData = await coachRequestsService.getCoachRequests();
      setRequests(requestsData);
    } catch (error) {
      console.error('Error fetching requests:', error);
      alert('Failed to load requests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      setUpdatingRequest(requestId);
      await coachRequestsService.updateRequestStatus(requestId, "accepted");
      
      // Update local state
      setRequests(requests.map(req => 
        req._id === requestId ? { ...req, status: "accepted" } : req
      ));
      
      alert('Request accepted successfully!');
    } catch (error) {
      console.error('Error accepting request:', error);
      alert(error.message || 'Failed to accept request. Please try again.');
    } finally {
      setUpdatingRequest(null);
    }
  };

  const handleReject = async (requestId) => {
    try {
      setUpdatingRequest(requestId);
      await coachRequestsService.updateRequestStatus(requestId, "rejected");
      
      // Update local state
      setRequests(requests.map(req => 
        req._id === requestId ? { ...req, status: "rejected" } : req
      ));
      
      alert('Request rejected successfully!');
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert(error.message || 'Failed to reject request. Please try again.');
    } finally {
      setUpdatingRequest(null);
    }
  };

  const handleViewProfile = (request) => {
    setSelectedStudent({
      ...request.athleteId,
      requestId: request._id,
      message: request.message,
      status: request.status,
      createdAt: request.createdAt
    });
    setShowProfileModal(true);
  };

  const filtered = requests
    .filter((r) => filterSport === "all" || (r.athleteId?.sport && r.athleteId.sport === filterSport))
    .filter((r) => filterStatus === "all" || r.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "sport") return (a.athleteId?.sport || '').localeCompare(b.athleteId?.sport || '');
      return 0;
    });

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const acceptedCount = requests.filter((r) => r.status === "accepted").length;

  // Get unique sports for filter
  const allSports = ['all', ...new Set(requests.map(req => req.athleteId?.sport).filter(Boolean))];

  if (loading) {
    return (
      <div>
        <CoachNav />
        <div className="requests-page">
          <div className="loading-state">
            <Loader size={32} />
            <p>Loading requests...</p>
          </div>
        </div>
      </div>
    );
  }

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
              {allSports.filter(sport => sport !== 'all').map(sport => (
                <option key={sport} value={sport}>{sport}</option>
              ))}
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
          {filtered.map((request) => (
            <div
              key={request._id}
              className={`request-card ${request.status}`}
            >
              <img 
                src={request.athleteId?.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${request.athleteId?._id}`} 
                alt={request.athleteId?.name} 
                className="avatar" 
              />
              <div className="info">
                <div className="top">
                  <h3>{request.athleteId?.name || 'Unknown Athlete'}</h3>
                  <div className="badges">
                    <span className="badge sport">{request.athleteId?.sport || 'General'}</span>
                    <span className="badge level">{request.athleteId?.level || 'Not specified'}</span>
                    {request.status === "accepted" && (
                      <span className="badge accepted">Accepted</span>
                    )}
                    {request.status === "rejected" && (
                      <span className="badge rejected">Rejected</span>
                    )}
                  </div>
                </div>

                <p className="message">{request.message || 'No message provided'}</p>

                <div className="meta">
                  {request.athleteId?.location && (
                    <span>
                      <MapPin size={14} /> {request.athleteId.location}
                    </span>
                  )}
                  <span>
                    <Calendar size={14} />{" "}
                    {new Date(request.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </span>
                  {request.athleteId?.age && (
                    <span>Age: {request.athleteId.age}</span>
                  )}
                </div>

                <div className="actions">
                  <button 
                    className="view-profile" 
                    onClick={() => handleViewProfile(request)}
                  >
                    <User size={16} /> View Full Details
                  </button>
                  
                  {request.status === "pending" && (
                    <>
                      <button 
                        className={`accept ${updatingRequest === request._id ? 'loading' : ''}`} 
                        onClick={() => handleAccept(request._id)}
                        disabled={updatingRequest === request._id}
                      >
                        {updatingRequest === request._id ? (
                          <Loader size={16} />
                        ) : (
                          <CheckCircle2 size={16} />
                        )}
                        {updatingRequest === request._id ? 'Accepting...' : 'Accept'}
                      </button>
                      <button 
                        className={`reject ${updatingRequest === request._id ? 'loading' : ''}`} 
                        onClick={() => handleReject(request._id)}
                        disabled={updatingRequest === request._id}
                      >
                        {updatingRequest === request._id ? (
                          <Loader size={16} />
                        ) : (
                          <XCircle size={16} />
                        )}
                        {updatingRequest === request._id ? 'Rejecting...' : 'Reject'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && !loading && (
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
                  <img 
                    src={selectedStudent.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedStudent._id}`} 
                    alt={selectedStudent.name} 
                    className="profile-avatar" 
                  />
                  <div className="profile-info">
                    <h3>{selectedStudent.name || 'Unknown Athlete'}</h3>
                    <div className="profile-badges">
                      <span className="badge sport">{selectedStudent.sport || 'General'}</span>
                      <span className="badge level">{selectedStudent.level || 'Not specified'}</span>
                      {selectedStudent.status === "accepted" && (
                        <span className="badge accepted">Accepted</span>
                      )}
                      {selectedStudent.status === "rejected" && (
                        <span className="badge rejected">Rejected</span>
                      )}
                    </div>
                    <p className="profile-message">{selectedStudent.message || 'No message provided'}</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="profile-section">
                  <h4>Contact Information</h4>
                  <div className="contact-grid">
                    {selectedStudent.email && (
                      <div className="contact-item">
                        <Mail size={16} />
                        <span>{selectedStudent.email}</span>
                      </div>
                    )}
                    {selectedStudent.phone && (
                      <div className="contact-item">
                        <Phone size={16} />
                        <span>{selectedStudent.phone}</span>
                      </div>
                    )}
                    {selectedStudent.location && (
                      <div className="contact-item">
                        <MapPin size={16} />
                        <span>{selectedStudent.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Personal Details */}
                <div className="profile-section">
                  <h4>Personal Details</h4>
                  <div className="details-grid">
                    {selectedStudent.age && (
                      <div className="detail-item">
                        <strong>Age:</strong>
                        <span>{selectedStudent.age}</span>
                      </div>
                    )}
                    {selectedStudent.height && (
                      <div className="detail-item">
                        <strong>Height:</strong>
                        <span>{selectedStudent.height}</span>
                      </div>
                    )}
                    {selectedStudent.weight && (
                      <div className="detail-item">
                        <strong>Weight:</strong>
                        <span>{selectedStudent.weight}</span>
                      </div>
                    )}
                    <div className="detail-item">
                      <strong>Experience:</strong>
                      <span>{selectedStudent.level || 'Not specified'}</span>
                    </div>
                  </div>
                </div>

                {/* Training Goals */}
                {selectedStudent.goals && (
                  <div className="profile-section">
                    <h4>
                      <Target size={18} />
                      Training Goals
                    </h4>
                    <div className="goals-list">
                      {Array.isArray(selectedStudent.goals) ? (
                        selectedStudent.goals.map((goal, index) => (
                          <div key={index} className="goal-item">
                            <CheckCircle2 size={16} />
                            <span>{goal}</span>
                          </div>
                        ))
                      ) : (
                        <div className="goal-item">
                          <CheckCircle2 size={16} />
                          <span>{selectedStudent.goals}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {selectedStudent.achievements && (
                  <div className="profile-section">
                    <h4>
                      <Award size={18} />
                      Achievements
                    </h4>
                    <div className="achievements-list">
                      {Array.isArray(selectedStudent.achievements) ? (
                        selectedStudent.achievements.map((achievement, index) => (
                          <div key={index} className="achievement-item">
                            <Award size={14} />
                            <span>{achievement}</span>
                          </div>
                        ))
                      ) : (
                        <div className="achievement-item">
                          <Award size={14} />
                          <span>{selectedStudent.achievements}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Request Date */}
                <div className="profile-section">
                  <h4>Request Date</h4>
                  <div className="request-date">
                    <Calendar size={16} />
                    <span>{new Date(selectedStudent.createdAt).toLocaleDateString("en-US", {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                {selectedStudent.status === "pending" && (
                  <div className="profile-actions">
                    <button 
                      className={`accept-btn large ${updatingRequest === selectedStudent.requestId ? 'loading' : ''}`}
                      onClick={() => {
                        handleAccept(selectedStudent.requestId);
                        setShowProfileModal(false);
                      }}
                      disabled={updatingRequest === selectedStudent.requestId}
                    >
                      {updatingRequest === selectedStudent.requestId ? (
                        <Loader size={18} />
                      ) : (
                        <CheckCircle2 size={18} />
                      )}
                      {updatingRequest === selectedStudent.requestId ? 'Accepting...' : 'Accept Request'}
                    </button>
                    <button 
                      className={`reject-btn large ${updatingRequest === selectedStudent.requestId ? 'loading' : ''}`}
                      onClick={() => {
                        handleReject(selectedStudent.requestId);
                        setShowProfileModal(false);
                      }}
                      disabled={updatingRequest === selectedStudent.requestId}
                    >
                      {updatingRequest === selectedStudent.requestId ? (
                        <Loader size={18} />
                      ) : (
                        <XCircle size={18} />
                      )}
                      {updatingRequest === selectedStudent.requestId ? 'Rejecting...' : 'Reject Request'}
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