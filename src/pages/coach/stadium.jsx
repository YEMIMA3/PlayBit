import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  DollarSign, 
  Phone, 
  Globe,
  Navigation,
  Calendar,
  Users
} from 'lucide-react';
import CoachNav from './coachnav';
import "../../styles/coach/stadium.scss";

const Stadium = () => {
  const [stadiums, setStadiums] = useState([
    {
      id: 1,
      name: "City Sports Complex",
      type: "Multi-Sport",
      address: "123 Sports Avenue, Downtown",
      distance: "1.2 km",
      rating: 4.5,
      price: "$45/hour",
      sports: ["Football", "Basketball", "Tennis"],
      image: "https://images.unsplash.com/photo-1543353071-873f17a7a088?w=400&h=250&fit=crop",
      phone: "+1 (555) 123-4567",
      website: "www.citysportscomplex.com",
      hours: "6:00 AM - 11:00 PM",
      capacity: "500 people",
      facilities: ["Changing Rooms", "Parking", "Cafeteria", "Lighting"]
    },
    {
      id: 2,
      name: "Elite Tennis Center",
      type: "Tennis",
      address: "456 Court Street, Westside",
      distance: "2.5 km",
      rating: 4.8,
      price: "$35/hour",
      sports: ["Tennis", "Badminton"],
      image: "https://images.unsplash.com/photo-1622279457486-62dcc4a4310e?w=400&h=250&fit=crop",
      phone: "+1 (555) 234-5678",
      website: "www.elitetennis.com",
      hours: "5:00 AM - 10:00 PM",
      capacity: "8 courts",
      facilities: ["Pro Shop", "Training Wall", "Club House"]
    },
    {
      id: 3,
      name: "Community Football Ground",
      type: "Football",
      address: "789 Field Road, East District",
      distance: "3.1 km",
      rating: 4.2,
      price: "$25/hour",
      sports: ["Football", "Rugby"],
      image: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=400&h=250&fit=crop",
      phone: "+1 (555) 345-6789",
      website: "www.communityfootball.org",
      hours: "7:00 AM - 9:00 PM",
      capacity: "2 full-size pitches",
      facilities: ["Floodlights", "Bleachers", "Refreshment Stand"]
    },
    {
      id: 4,
      name: "Cricket Academy",
      type: "Cricket",
      address: "321 Pitch Lane, North Area",
      distance: "4.7 km",
      rating: 4.6,
      price: "$40/hour",
      sports: ["Cricket", "Net Practice"],
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=250&fit=crop",
      phone: "+1 (555) 456-7890",
      website: "www.cricketacademy.com",
      hours: "6:00 AM - 10:00 PM",
      capacity: "3 practice nets",
      facilities: ["Bowling Machine", "Coaching", "Pavilion"]
    },
    {
      id: 5,
      name: "Basketball Arena",
      type: "Basketball",
      address: "654 Hoop Street, Central",
      distance: "1.8 km",
      rating: 4.4,
      price: "$30/hour",
      sports: ["Basketball", "Volleyball"],
      image: "https://images.unsplash.com/photo-1544919982-9ea5c3ad1d0b?w=400&h=250&fit=crop",
      phone: "+1 (555) 567-8901",
      website: "www.bballarena.com",
      hours: "24/7",
      capacity: "4 courts",
      facilities: ["AC", "Scoreboards", "Locker Rooms"]
    },
    {
      id: 6,
      name: "Swimming & Athletics Center",
      type: "Aquatic",
      address: "987 Pool Road, Southside",
      distance: "5.2 km",
      rating: 4.7,
      price: "$50/hour",
      sports: ["Swimming", "Track", "Gym"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
      phone: "+1 (555) 678-9012",
      website: "www.swimcenter.com",
      hours: "5:00 AM - 11:00 PM",
      capacity: "Olympic pool",
      facilities: ["Sauna", "Gym", "Physical Therapy"]
    }
  ]);

  const [filteredStadiums, setFilteredStadiums] = useState(stadiums);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const sports = ['all', 'Football', 'Basketball', 'Tennis', 'Cricket', 'Swimming', 'Multi-Sport', 'Aquatic'];

  useEffect(() => {
    // Simulate getting user location
    setUserLocation({
      lat: 40.7128,
      lng: -74.0060
    });
  }, []);

  useEffect(() => {
    filterStadiums();
  }, [searchTerm, selectedSport]);

  const filterStadiums = () => {
    let filtered = stadiums;

    if (searchTerm) {
      filtered = filtered.filter(stadium =>
        stadium.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stadium.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stadium.sports.some(sport => sport.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedSport !== 'all') {
      filtered = filtered.filter(stadium =>
        stadium.sports.includes(selectedSport) || stadium.type === selectedSport
      );
    }

    setFilteredStadiums(filtered);
  };

  const handleBookNow = (stadiumId) => {
    alert(`Booking initiated for stadium ID: ${stadiumId}\nThis would open a booking modal in a real application.`);
  };

  return (
    <div>
    <CoachNav />
    <div className="stadiums-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>Find Nearby Stadiums & Pitches</h1>
          <p>Discover and book sports facilities near you for practice and games</p>
        </div>

        {/* Search and Filters */}
        <div className="search-filters">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search stadiums by name, location, or sport..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters">
            <Filter className="filter-icon" />
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="sport-filter"
            >
              {sports.map(sport => (
                <option key={sport} value={sport}>
                  {sport === 'all' ? 'All Sports' : sport}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="content-layout">
          {/* Stadiums List */}
          <div className="stadiums-list">
            <div className="results-header">
              <h3>{filteredStadiums.length} Stadiums Found</h3>
              <span>Sorted by distance</span>
            </div>

            {filteredStadiums.map(stadium => (
              <div
                key={stadium.id}
                className={`stadium-card ${selectedStadium?.id === stadium.id ? 'active' : ''}`}
                onClick={() => setSelectedStadium(stadium)}
              >
                <img src={stadium.image} alt={stadium.name} className="stadium-image" />
                
                <div className="stadium-info">
                  <div className="stadium-header">
                    <h3>{stadium.name}</h3>
                    <div className="rating">
                      <Star className="star-icon" />
                      <span>{stadium.rating}</span>
                    </div>
                  </div>

                  <div className="stadium-meta">
                    <div className="meta-item">
                      <MapPin className="meta-icon" />
                      <span>{stadium.address}</span>
                    </div>
                    <div className="meta-item">
                      <Navigation className="meta-icon" />
                      <span>{stadium.distance} away</span>
                    </div>
                  </div>

                  <div className="sports-tags">
                    {stadium.sports.map((sport, index) => (
                      <span key={index} className="sport-tag">{sport}</span>
                    ))}
                  </div>

                  <div className="stadium-features">
                    <div className="feature">
                      <DollarSign className="feature-icon" />
                      <span>{stadium.price}</span>
                    </div>
                    <div className="feature">
                      <Clock className="feature-icon" />
                      <span>{stadium.hours}</span>
                    </div>
                    <div className="feature">
                      <Users className="feature-icon" />
                      <span>{stadium.capacity}</span>
                    </div>
                  </div>

                  <button
                    className="book-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookNow(stadium.id);
                    }}
                  >
                    <Calendar className="btn-icon" />
                    Book Now
                  </button>
                </div>
              </div>
            ))}

            {filteredStadiums.length === 0 && (
              <div className="no-results">
                <p>No stadiums found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSport('all');
                  }}
                  className="reset-btn"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Map and Details Section */}
          <div className="map-details-section">
            {/* Map Placeholder */}
            <div className="map-container">
              <div className="map-placeholder">
                <div className="map-content">
                  <MapPin className="map-icon" />
                  <h3>Interactive Map</h3>
                  <p>Stadium locations would be displayed here</p>
                  <div className="map-features">
                    <span>• Real-time location tracking</span>
                    <span>• Directions to venues</span>
                    <span>• Traffic conditions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stadium Details */}
            {selectedStadium ? (
              <div className="stadium-details">
                <h3>Venue Details</h3>
                <div className="details-content">
                  <div className="detail-section">
                    <h4>Contact Information</h4>
                    <div className="contact-info">
                      <div className="contact-item">
                        <Phone className="contact-icon" />
                        <a href={`tel:${selectedStadium.phone}`}>{selectedStadium.phone}</a>
                      </div>
                      <div className="contact-item">
                        <Globe className="contact-icon" />
                        <a href={`https://${selectedStadium.website}`} target="_blank" rel="noopener noreferrer">
                          {selectedStadium.website}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4>Facilities</h4>
                    <div className="facilities-list">
                      {selectedStadium.facilities.map((facility, index) => (
                        <div key={index} className="facility-item">
                          <span className="facility-dot">•</span>
                          {facility}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4>Operating Hours</h4>
                    <div className="hours-info">
                      <Clock className="hours-icon" />
                      <span>{selectedStadium.hours}</span>
                    </div>
                  </div>

                  <button className="primary-btn large">
                    <Calendar className="btn-icon" />
                    Book This Venue
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-selection">
                <MapPin className="no-selection-icon" />
                <h4>Select a Stadium</h4>
                <p>Click on a stadium from the list to view details and booking options</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Stadium;