import { useState, useEffect } from 'react';
import { Search, MapPin, Star, Award, Users, CheckCircle, X, Send } from 'lucide-react';
import '../../styles/athlete/findcoaches.scss';
import AthleteNav from './athleteNav';
import { coachService } from '../../api/findCoaches'; // Import the API service

export default function FindCoaches() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');

  // Fetch coaches from backend
  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    try {
      setLoading(true);
      const coachesData = await coachService.getAllCoaches();
      setCoaches(coachesData);
    } catch (error) {
      console.error('Error fetching coaches:', error);
      alert('Failed to load coaches. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredCoaches = coaches.filter((coach) => {
    const matchesSearch = coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (coach.sports && coach.sports.some(sport => 
                           sport.toLowerCase().includes(searchQuery.toLowerCase())
                         ));
    const matchesSport = selectedSport === 'all' || 
                        (coach.sports && coach.sports.includes(selectedSport));
    const matchesLocation = selectedLocation === 'all' || 
                           (coach.location && coach.location.includes(selectedLocation));
    return matchesSearch && matchesSport && matchesLocation;
  });

  const openModal = (coach) => {
    setSelectedCoach(coach);
    setShowModal(true);
    setRequestMessage(`Hi ${coach.name}, I would like to train with you!`);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCoach(null);
    setRequestMessage('');
  };

  const handleSendRequest = async () => {
    if (!selectedCoach) return;

    try {
      setSendingRequest(true);
      await coachService.sendCoachRequest(selectedCoach._id, requestMessage);
      alert('Request sent successfully!');
      closeModal();
      
      // Refresh coaches to update request status
      fetchCoaches();
    } catch (error) {
      console.error('Error sending request:', error);
      alert(error.message || 'Failed to send request. Please try again.');
    } finally {
      setSendingRequest(false);
    }
  };

  // Get unique sports and locations for filters
  const allSports = ['all', ...new Set(coaches.flatMap(coach => coach.sports || []))];
  const allLocations = ['all', ...new Set(coaches.map(coach => coach.location).filter(Boolean))];

  if (loading) {
    return (
      <div className="athlete-profile-container">
        <AthleteNav />
        <div className="find-coaches-page">
          <div className="container">
            <div className="loading-state">
              <p>Loading coaches...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="athlete-profile-container">
      <AthleteNav />
      <div className="find-coaches-page">
        <div className="container">
          {/* Header */}
          <div className="header">
            <h1>Find Coaches</h1>
            <p>Search and connect with professional coaches</p>
          </div>

          {/* Filters */}
          <div className="filter-card">
            <div className="filter-grid">
              <div className="search-wrapper">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by coach name or sport..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <select value={selectedSport} onChange={(e) => setSelectedSport(e.target.value)}>
                <option value="all">All Sports</option>
                {allSports.filter(sport => sport !== 'all').map(sport => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>

              <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                <option value="all">All Locations</option>
                {allLocations.filter(location => location !== 'all').map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="coaches-grid">
            {filteredCoaches.map((coach) => (
              <div key={coach._id} className="coach-card fade-in">
                <div className="coach-card-header">
                  <div className="coach-header-content">
                    <div className="avatar">
                      <img 
                        src={coach.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${coach._id}`} 
                        alt={coach.name} 
                      />
                    </div>
                    <div className="coach-info">
                      <h3>{coach.name}</h3>
                      <span className="badge sport-badge">
                        {coach.sports ? coach.sports[0] : 'Coach'}
                      </span>
                      {coach.requestStatus && coach.requestStatus !== 'not_sent' && (
                        <span className={`badge status-badge ${coach.requestStatus}`}>
                          {coach.requestStatus}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="coach-card-content">
                  <div className="stats-grid">
                    <div className="stat">
                      <Star className="star-icon" />
                      <span>{coach.rating || 'No'} Rating</span>
                    </div>
                    
                    <div className="stat">
                      <Award />
                      <span>{coach.experience || 'Experienced'}</span>
                    </div>
                    
                    <div className="stat">
                      <MapPin />
                      <span>{coach.location || 'Location not specified'}</span>
                    </div>
                    
                    <div className="stat">
                      <span className="rate">₹{coach.hourlyRate || 'N/A'}/hr</span>
                    </div>
                  </div>

                  {coach.bio && (
                    <p className="coach-bio">{coach.bio.substring(0, 100)}...</p>
                  )}

                  <button 
                    className={`view-profile-btn ${coach.requestStatus === 'pending' ? 'pending' : ''}`}
                    onClick={() => openModal(coach)}
                    disabled={coach.requestStatus === 'pending' || coach.requestStatus === 'accepted'}
                  >
                    {coach.requestStatus === 'pending' ? 'Request Sent' : 
                     coach.requestStatus === 'accepted' ? 'Accepted' : 'View Profile'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCoaches.length === 0 && !loading && (
            <div className="empty-state">
              <p>No coaches found matching your criteria</p>
            </div>
          )}

          {/* Modal */}
          {showModal && selectedCoach && (
            <div className="modal-backdrop" onClick={closeModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <div className="modal-title">
                    <h2>Coach Profile</h2>
                    <p>Detailed information about the coach</p>
                  </div>
                  <button className="close-btn" onClick={closeModal}>
                    <X size={24} />
                  </button>
                </div>
                
                <div className="profile-section">
                  <div className="profile-header">
                    <div className="avatar large">
                      <img 
                        src={selectedCoach.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedCoach._id}`} 
                        alt={selectedCoach.name} 
                      />
                    </div>
                    <div className="profile-info">
                      <h2>{selectedCoach.name}</h2>
                      <span className="badge sport-badge">
                        {selectedCoach.sports ? selectedCoach.sports.join(', ') : 'Coach'}
                      </span>
                      <div className="meta-info">
                        <span>
                          <Star className="star-icon" />
                          {selectedCoach.rating || 'No rating'}
                        </span>
                        <span className="rate">
                          ₹{selectedCoach.hourlyRate || 'N/A'}/hr
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="section-block">
                    <h3>About</h3>
                    <p>{selectedCoach.bio || 'No bio available'}</p>
                  </div>

                  <div className="section-block">
                    <h3>Experience</h3>
                    <p>{selectedCoach.experience || 'Experience not specified'}</p>
                  </div>

                  <div className="section-block">
                    <h3>Location</h3>
                    <p>{selectedCoach.location || 'Location not specified'}</p>
                  </div>

                  {selectedCoach.certifications && selectedCoach.certifications.length > 0 && (
                    <div className="section-block">
                      <h3>Certifications</h3>
                      <div className="certifications-list">
                        {selectedCoach.certifications.map((cert, index) => (
                          <span key={index} className="cert-badge">
                            <CheckCircle size={16} />
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedCoach.availability && (
                    <div className="section-block">
                      <h3>Availability</h3>
                      <p>{selectedCoach.availability}</p>
                    </div>
                  )}

                  <div className="section-block">
                    <h3>Your Message</h3>
                    <textarea
                      value={requestMessage}
                      onChange={(e) => setRequestMessage(e.target.value)}
                      placeholder="Write a message to the coach..."
                      rows="4"
                    />
                  </div>

                  <button 
                    className={`action-button primary ${sendingRequest ? 'loading' : ''}`}
                    onClick={handleSendRequest}
                    disabled={sendingRequest || selectedCoach.requestStatus === 'pending' || selectedCoach.requestStatus === 'accepted'}
                  >
                    {sendingRequest ? (
                      'Sending...'
                    ) : selectedCoach.requestStatus === 'pending' ? (
                      'Request Already Sent'
                    ) : selectedCoach.requestStatus === 'accepted' ? (
                      'Request Accepted'
                    ) : (
                      <>
                        <Send size={16} />
                        Send Coaching Request
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}