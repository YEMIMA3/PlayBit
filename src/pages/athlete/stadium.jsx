import { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, Clock, Search, Crosshair, AlertCircle } from 'lucide-react';
import '../../styles/athlete/stadiums.scss';
import AthleteNav from './athleteNav';

const mockStadiums = [
  {
    id: 1,
    name: 'Surya Sports Center',
    type: 'Cricket & Football',
    address: 'Eluru Road, Tadepalligudem 534101',
    lat: 16.818,
    lon: 81.526,
    phone: '+91 98765 43100',
    hours: '5:30 AM - 10:00 PM',
    facilities: ['Cricket Nets', 'Football Field', 'Indoor Practice Zone'],
  },
  {
    id: 2,
    name: 'Cricket Box Plot',
    type: 'Cricket',
    address: 'Tanuku Main Road, Tadepalligudem 534102',
    lat: 16.820,
    lon: 81.532,
    phone: '+91 98765 43101',
    hours: '6:00 AM - 9:00 PM',
    facilities: ['Pitch Nets', 'Bowling Machine', 'Turf Practice Area'],
  },
  {
    id: 3,
    name: 'Dhoni Sports Arena',
    type: 'Multi-Sport',
    address: 'Near Bus Stand, Tadepalligudem 534103',
    lat: 16.823,
    lon: 81.528,
    phone: '+91 98765 43102',
    hours: '5:00 AM - 10:30 PM',
    facilities: ['Cricket Ground', 'Badminton Court', 'Gym Zone'],
  },
  {
    id: 4,
    name: 'KKep Sports Club',
    type: 'Badminton & Fitness',
    address: 'Railway Station Road, Tadepalligudem 534104',
    lat: 16.816,
    lon: 81.523,
    phone: '+91 98765 43103',
    hours: '6:00 AM - 11:00 PM',
    facilities: ['Indoor Courts', 'Fitness Center', 'Yoga Studio'],
  },
  {
    id: 5,
    name: 'Boxpot Sports Ground',
    type: 'Multi-Sport',
    address: 'Bypass Road, Tadepalligudem 534105',
    lat: 16.825,
    lon: 81.529,
    phone: '+91 98765 43104',
    hours: '6:00 AM - 9:30 PM',
    facilities: ['Basketball Court', 'Running Track', 'Cricket Field'],
  },
];


export default function Stadiums() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState('');

  // 🧭 Get live location
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    const watcher = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLocationError('');
      },
      (err) => {
        console.error('Location error:', err);
        setLocationError('Unable to fetch your location.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  // 🔍 Filter stadiums by name/type
  const filteredStadiums = mockStadiums.filter(
    (stadium) =>
      stadium.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stadium.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 📏 Calculate rough distance (in km)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  const enhancedStadiums = userLocation
    ? filteredStadiums.map((s) => ({
        ...s,
        distance:
          calculateDistance(userLocation.lat, userLocation.lon, s.lat, s.lon) +
          ' km',
      }))
    : filteredStadiums;

  return (
    <div className="athlete-profile-container">
      <AthleteNav />
      <div className="stadiums-page">
        <div className="container">
          {/* Header */}
          <div className="header">
            <h1>Nearby Stadiums</h1>
            <p>Find practice facilities near your live location</p>
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

          {locationError && (
            <div className="error-banner">
              <AlertCircle size={18} />
              <p>{locationError}</p>
            </div>
          )}

          <div className="main-grid">
            {/* 🗺️ Google Map + iframe preview */}
            <div className="map-card">
              <div className="map-card-header">
                <h2>Map View</h2>
                <Crosshair className="crosshair-icon" />
              </div>

              <div className="map-content">
                {/* Static embedded map */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15276.518955659294!2d81.5267274!3d16.819918649999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1762156770575!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Tadepalligudem Map"
                ></iframe>
              </div>
            </div>

            {/* 🏟️ Stadium List */}
            <div className="stadiums-list">
              {enhancedStadiums.map((stadium) => (
                <div
                  key={stadium.id}
                  className={`stadium-card ${
                    selectedStadium?.id === stadium.id ? 'selected' : ''
                  }`}
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
                        <span>{stadium.distance || '—'}</span>
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

                    <button
                      className="directions-btn"
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                            stadium.address
                          )}`,
                          '_blank'
                        )
                      }
                    >
                      Get Directions
                    </button>
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
