import { useState } from 'react';
import { Search, MapPin, Star, Award, Users, CheckCircle, X } from 'lucide-react';
import '../../styles/athlete/findcoaches.scss';
import AthleteNav from './athleteNav';

const mockCoaches = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    sport: 'Basketball',
    experience: '10 years',
    rating: 4.8,
    students: 45,
    location: 'Mumbai, Maharashtra',
    bio: 'Former state-level basketball player. Specialized in youth development and skill enhancement for college teams.',
    certifications: ['Basketball Federation of India Certified', 'Youth Coach License'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=coach1',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    sport: 'Football',
    experience: '8 years',
    rating: 4.9,
    students: 38,
    location: 'Bangalore, Karnataka',
    bio: 'Former university football captain. Focus on technical skills and team coordination for college players.',
    certifications: ['AIFF D License', 'Sports Science Degree'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=coach2',
  },
  {
    id: 3,
    name: 'Arjun Patel',
    sport: 'Cricket',
    experience: '12 years',
    rating: 4.7,
    students: 52,
    location: 'Ahmedabad, Gujarat',
    bio: 'Ranji Trophy experience. Mentored multiple university teams to championships.',
    certifications: ['BCCI Level 2 Coach', 'NIS Diploma'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=coach3',
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    sport: 'Basketball',
    experience: '6 years',
    rating: 4.6,
    students: 29,
    location: 'Hyderabad, Telangana',
    bio: 'Dedicated to developing fundamental skills and building confidence in college athletes.',
    certifications: ['BFI Certified', 'Sports Psychology Certificate'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=coach4',
  },
  {
    id: 5,
    name: 'Vikram Singh',
    sport: 'Football',
    experience: '15 years',
    rating: 4.9,
    students: 67,
    location: 'Delhi, NCR',
    bio: 'Former I-League player. Specializing in strength conditioning and technical training.',
    certifications: ['AIFF C License', 'Strength & Conditioning'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=coach5',
  },
  {
    id: 6,
    name: 'Ananya Iyer',
    sport: 'Cricket',
    experience: '9 years',
    rating: 4.8,
    students: 41,
    location: 'Chennai, Tamil Nadu',
    bio: 'State-level women\'s cricket player. Passionate about helping student athletes reach their potential.',
    certifications: ['BCCI Level 1 Coach', 'University Sports Instructor'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=coach6',
  },
];

export default function FindCoaches() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredCoaches = mockCoaches.filter((coach) => {
    const matchesSearch = coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         coach.sport.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = selectedSport === 'all' || coach.sport === selectedSport;
    const matchesLocation = selectedLocation === 'all' || coach.location.includes(selectedLocation);
    return matchesSearch && matchesSport && matchesLocation;
  });

  const openModal = (coach) => {
    setSelectedCoach(coach);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCoach(null);
  };

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
                <option value="Basketball">Basketball</option>
                <option value="Football">Football</option>
                <option value="Cricket">Cricket</option>
              </select>

              <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                <option value="all">All Locations</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Delhi">Delhi</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="coaches-grid">
            {filteredCoaches.map((coach) => (
              <div key={coach.id} className="coach-card fade-in">
                <div className="coach-card-header">
                  <div className="coach-header-content">
                    <div className="avatar">
                      <img src={coach.avatar} alt={coach.name} />
                    </div>
                    <div className="coach-info">
                      <h3>{coach.name}</h3>
                      <span className="badge sport-badge">{coach.sport}</span>
                    </div>
                  </div>
                </div>
                
                <div className="coach-card-content">
                  <div className="stats-grid">
                    <div className="stat">
                      <Star className="star-icon" />
                      <span>{coach.rating} Rating</span>
                    </div>
                    
                    <div className="stat">
                      <Users />
                      <span>{coach.students} Students</span>
                    </div>
                    
                    <div className="stat">
                      <MapPin />
                      <span>{coach.location}</span>
                    </div>
                    
                    <div className="stat">
                      <Award />
                      <span>{coach.experience}</span>
                    </div>
                  </div>

                  <button 
                    className="view-profile-btn"
                    onClick={() => openModal(coach)}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCoaches.length === 0 && (
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
                      <img src={selectedCoach.avatar} alt={selectedCoach.name} />
                    </div>
                    <div className="profile-info">
                      <h2>{selectedCoach.name}</h2>
                      <span className="badge sport-badge">{selectedCoach.sport}</span>
                      <div className="meta-info">
                        <span>
                          <Star className="star-icon" />
                          {selectedCoach.rating}
                        </span>
                        <span>
                          <Users />
                          {selectedCoach.students} students
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="section-block">
                    <h3>About</h3>
                    <p>{selectedCoach.bio}</p>
                  </div>

                  <div className="section-block">
                    <h3>Experience</h3>
                    <p>{selectedCoach.experience} of professional coaching</p>
                  </div>

                  <div className="section-block">
                    <h3>Location</h3>
                    <p>{selectedCoach.location}</p>
                  </div>

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

                  <button className="action-button primary">
                    Send Coaching Request
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