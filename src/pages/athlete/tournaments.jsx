import { useState } from 'react';
import { Calendar, MapPin, Users, Trophy, Clock, DollarSign } from 'lucide-react';
import '../../styles/athlete/tournaments.scss';
import AthleteNav from './athleteNav';

const liveTournaments = [
  {
    id: 1,
    name: 'Inter-University Basketball Championship',
    sport: 'Basketball',
    startDate: '2025-10-20',
    endDate: '2025-10-27',
    location: 'NSCI Dome, Worli, Mumbai',
    participants: 128,
    prize: '₹2,50,000',
    status: 'Live',
    round: 'Quarter Finals',
  },
  {
    id: 2,
    name: 'All-India College Football League',
    sport: 'Football',
    startDate: '2025-10-18',
    endDate: '2025-10-30',
    location: 'Cooperage Stadium, Mumbai',
    participants: 64,
    prize: '₹5,00,000',
    status: 'Live',
    round: 'Group Stage',
  },
];

const upcomingTournaments = [
  {
    id: 3,
    name: 'Mumbai Inter-College Basketball Cup',
    sport: 'Basketball',
    startDate: '2025-11-05',
    endDate: '2025-11-12',
    location: 'DY Patil Stadium, Navi Mumbai',
    participants: 96,
    maxParticipants: 128,
    registrationDeadline: '2025-11-01',
    entryFee: '₹2,500',
    prize: '₹1,50,000',
    status: 'Open',
    description: 'Annual city championship featuring top college basketball teams from Mumbai and surrounding regions.',
  },
  {
    id: 4,
    name: 'Maharashtra State Cricket Tournament',
    sport: 'Cricket',
    startDate: '2025-11-20',
    endDate: '2025-11-25',
    location: 'Wankhede Stadium, Mumbai',
    participants: 45,
    maxParticipants: 64,
    registrationDeadline: '2025-11-15',
    entryFee: '₹3,000',
    prize: '₹3,00,000',
    status: 'Open',
    description: 'Premier college-level cricket tournament with teams from across Maharashtra competing.',
  },
  {
    id: 5,
    name: 'Youth Football Championship',
    sport: 'Football',
    startDate: '2025-12-01',
    endDate: '2025-12-08',
    location: 'Andheri Sports Complex, Mumbai',
    participants: 28,
    maxParticipants: 32,
    registrationDeadline: '2025-11-25',
    entryFee: '₹2,000',
    prize: '₹1,00,000',
    status: 'Open',
    description: 'Elite youth football tournament for college players under 22 years.',
  },
  {
    id: 6,
    name: 'Winter Basketball Slam',
    sport: 'Basketball',
    startDate: '2025-12-15',
    endDate: '2025-12-20',
    location: 'Phoenix Marketcity Arena, Mumbai',
    participants: 0,
    maxParticipants: 64,
    registrationDeadline: '2025-12-10',
    entryFee: '₹2,800',
    prize: '₹2,00,000',
    status: 'Open',
    description: 'Premier winter basketball tournament with exciting prizes and professional coaching opportunities.',
  },
];

export default function Tournaments() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (tournament) => {
    setSelectedTournament(tournament);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="athlete-profile-container">
      <AthleteNav />
      <div className="tournaments-page">
        <div className="container">
          {/* Header */}
          <div className="header">
            <h1>Tournaments</h1>
            <p>Browse and register for upcoming tournaments</p>
          </div>

          <div className="tabs-container">
            <div className="tabs-list">
              <button
                className={`tab-trigger ${activeTab === 'upcoming' ? 'active' : ''}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming
              </button>
              <button
                className={`tab-trigger ${activeTab === 'live' ? 'active' : ''}`}
                onClick={() => setActiveTab('live')}
              >
                Live Tournaments
              </button>
            </div>

            {/* Upcoming Tournaments */}
            {activeTab === 'upcoming' && (
              <div className="tournaments-grid">
                {upcomingTournaments.map((tournament) => (
                  <div key={tournament.id} className="tournament-card fade-in">
                    <div className="tournament-card-header">
                      <div className="header-top">
                        <div className="tournament-info">
                          <h3>{tournament.name}</h3>
                          <div className="badges">
                            <span className="badge sport-badge">{tournament.sport}</span>
                            <span className="badge status-badge open">
                              {tournament.status}
                            </span>
                          </div>
                        </div>
                        <div className="trophy">
                          <Trophy size={24} />
                        </div>
                      </div>
                    </div>
                    <div className="tournament-card-content">
                      <div className="details-list">
                        <div className="detail-item">
                          <Calendar size={16} />
                          <span>
                            {new Date(tournament.startDate).toLocaleDateString()} -{' '}
                            {new Date(tournament.endDate).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="detail-item">
                          <MapPin size={16} />
                          <span>{tournament.location}</span>
                        </div>

                        <div className="detail-item">
                          <Users size={16} />
                          <span>
                            {tournament.participants} / {tournament.maxParticipants} registered
                          </span>
                        </div>

                        <div className="detail-item">
                          <Clock size={16} />
                          <span>
                            Registration closes: {new Date(tournament.registrationDeadline).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="prize-row">
                          <div className="entry-fee">
                            <DollarSign size={16} />
                            <span>Entry: {tournament.entryFee}</span>
                          </div>
                          <div className="prize">
                            <Trophy size={16} />
                            <span>Prize: {tournament.prize}</span>
                          </div>
                        </div>
                      </div>

                      <p className="description">{tournament.description}</p>

                      <div className="actions">
                        <button 
                          className="register-btn"
                          onClick={() => openModal(tournament)}
                        >
                          Register Now
                        </button>
                        <button className="outline-btn">View Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Live Tournaments */}
            {activeTab === 'live' && (
              <div className="tournaments-grid">
                {liveTournaments.map((tournament) => (
                  <div key={tournament.id} className="tournament-card live fade-in">
                    <div className="tournament-card-header">
                      <div className="header-top">
                        <div className="tournament-info">
                          <h3>{tournament.name}</h3>
                          <div className="badges">
                            <span className="badge sport-badge">{tournament.sport}</span>
                            <span className="badge live-badge">
                              <div className="live-dot" />
                              {tournament.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tournament-card-content">
                      <div className="live-round">
                        <p>Current Round: {tournament.round}</p>
                      </div>

                      <div className="details-list">
                        <div className="detail-item">
                          <Calendar size={16} />
                          <span>
                            {new Date(tournament.startDate).toLocaleDateString()} -{' '}
                            {new Date(tournament.endDate).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="detail-item">
                          <MapPin size={16} />
                          <span>{tournament.location}</span>
                        </div>

                        <div className="detail-item">
                          <Users size={16} />
                          <span>{tournament.participants} participants</span>
                        </div>

                        <div className="detail-item">
                          <Trophy size={16} />
                          <span>Prize Pool: {tournament.prize}</span>
                        </div>
                      </div>

                      <div className="actions">
                        <button className="outline-btn">View Live Scores</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Registration Modal */}
          {showModal && selectedTournament && (
            <div className="modal-backdrop" onClick={closeModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>Tournament Registration</h2>
                  <p>Register for {selectedTournament.name}</p>
                </div>
                
                <div className="registration-form">
                  <div className="tournament-summary">
                    <p>{selectedTournament.name}</p>
                    <div className="summary-meta">
                      <span>{selectedTournament.sport}</span>
                      <span>Entry Fee: {selectedTournament.entryFee}</span>
                    </div>
                  </div>

                  <div className="form-fields">
                    <div className="form-field">
                      <label htmlFor="team-name">Team/Player Name</label>
                      <input id="team-name" type="text" placeholder="Enter your team or player name" />
                    </div>

                    <div className="form-field">
                      <label htmlFor="contact">Contact Number</label>
                      <input id="contact" type="tel" placeholder="Your contact number" />
                    </div>

                    <div className="form-field">
                      <label htmlFor="email">Email Address</label>
                      <input id="email" type="email" placeholder="your.email@example.com" />
                    </div>

                    <div className="form-field">
                      <label htmlFor="experience">Experience Level</label>
                      <input id="experience" type="text" placeholder="e.g., Beginner, Intermediate, Advanced" />
                    </div>
                  </div>

                  <div className="payment-info">
                    <p>Payment Details</p>
                    <p>
                      Entry fee of {selectedTournament.entryFee} will be collected upon confirmation
                    </p>
                  </div>

                  <button className="submit-button">
                    Complete Registration
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