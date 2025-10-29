import { useState } from 'react';
import { MapPin, Navigation, Phone, Clock, Search } from 'lucide-react';
import '../../styles/athlete/stadiums.scss';
import AthleteNav from './athleteNav';

const mockStadiums = [
  {
    id: 1,
    name: 'University Sports Complex',
    type: 'Multi-Sport',
    address: 'Juhu Tara Road, Vile Parle, Mumbai 400056',
    distance: '1.2 km',
    phone: '+91 98765 43210',
    hours: '6:00 AM - 10:00 PM',
    facilities: ['Basketball Court', 'Cricket Nets', 'Running Track'],
  },
  {
    id: 2,
    name: 'YMCA Basketball Arena',
    type: 'Basketball',
    address: '18 Nathalal Parekh Marg, Fort, Mumbai 400001',
    distance: '2.5 km',
    phone: '+91 98765 43211',
    hours: '7:00 AM - 9:00 PM',
    facilities: ['Indoor Courts', 'Training Area', 'Locker Rooms'],
  },
  {
    id: 3,
    name: 'Shivaji Park Ground',
    type: 'Cricket & Football',
    address: 'Shivaji Park, Dadar, Mumbai 400028',
    distance: '3.8 km',
    phone: '+91 98765 43212',
    hours: '6:00 AM - 8:00 PM',
    facilities: ['Cricket Ground', 'Football Field', 'Practice Nets'],
  },
  {
    id: 4,
    name: 'Cricket Academy Andheri',
    type: 'Cricket',
    address: 'DN Nagar, Andheri West, Mumbai 400053',
    distance: '4.2 km',
    phone: '+91 98765 43213',
    hours: '5:30 AM - 10:30 PM',
    facilities: ['Turf Wickets', 'Net Practice', 'Indoor Coaching'],
  },
  {
    id: 5,
    name: 'College Sports Ground',
    type: 'Multi-Sport',
    address: 'Bandra Kurla Complex, Bandra East, Mumbai 400051',
    distance: '5.5 km',
    phone: '+91 98765 43214',
    hours: '6:00 AM - 11:00 PM',
    facilities: ['Football Field', 'Basketball Court', 'Fitness Center'],
  },
];

export default function Stadiums() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStadium, setSelectedStadium] = useState(null);

  const filteredStadiums = mockStadiums.filter((stadium) =>
    stadium.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stadium.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="athlete-profile-container">
      <AthleteNav />
      <div className="stadiums-page">
        <div className="container">
          {/* Header */}
          <div className="header">
            <h1>Nearby Stadiums</h1>
            <p>Find practice facilities near you</p>
          </div>

          {/* Search */}
          <div className="search-card">
            <div className="search-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search stadiums by name or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="main-grid">
            {/* Map Placeholder */}
            <div className="map-card">
              <div className="map-card-header">
                <h2>Map View</h2>
              </div>
              <div className="map-content">
                <div className="map-view">
                  {/* Simple map visualization */}
                  <div className="map-grid">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className="grid-cell"
                        style={{
                          backgroundColor: Math.random() > 0.7 ? '#e2e8f0' : '#f1f5f9',
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Stadium markers */}
                  {filteredStadiums.map((stadium, index) => (
                    <div
                      key={stadium.id}
                      className="stadium-marker"
                      style={{
                        left: `${20 + index * 15}%`,
                        top: `${30 + (index % 3) * 20}%`,
                      }}
                      onClick={() => setSelectedStadium(stadium)}
                    >
                      <MapPin
                        className={selectedStadium?.id === stadium.id ? 'selected-marker' : 'default-marker'}
                      />
                      <div className="marker-tooltip">
                        <p>{stadium.name}</p>
                      </div>
                    </div>
                  ))}

                  {/* Current location marker */}
                  <div className="current-location">
                    <div className="location-dot" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stadium List */}
            <div className="stadiums-list">
              {filteredStadiums.map((stadium) => (
                <div
                  key={stadium.id}
                  className={`stadium-card ${selectedStadium?.id === stadium.id ? 'selected' : ''}`}
                  onClick={() => setSelectedStadium(stadium)}
                >
                  <div className="stadium-card-header">
                    <div className="header-top">
                      <div className="stadium-info">
                        <h3>{stadium.name}</h3>
                        <span className="badge type-badge">{stadium.type}</span>
                      </div>
                      <div className="distance">
                        <Navigation size={16} />
                        <span>{stadium.distance}</span>
                      </div>
                    </div>
                  </div>
                  <div className="stadium-card-content">
                    <div className="info-row">
                      <MapPin size={16} />
                      <span>{stadium.address}</span>
                    </div>

                    <div className="info-row">
                      <Phone size={16} />
                      <span>{stadium.phone}</span>
                    </div>

                    <div className="info-row">
                      <Clock size={16} />
                      <span>{stadium.hours}</span>
                    </div>

                    <div className="facilities-section">
                      <p>Facilities:</p>
                      <div className="facilities-list">
                        {stadium.facilities.map((facility, index) => (
                          <span key={index} className="facility-badge">
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="directions-btn">Get Directions</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}