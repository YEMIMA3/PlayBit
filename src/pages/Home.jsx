import React from 'react';
import { 
  Search, 
  Users, 
  Trophy, 
  Star, 
  MapPin, 
  Calendar,
  Shield,
  Video,
  MessageCircle,
  ArrowRight,
  Settings
} from 'lucide-react';
import "../styles/home.scss";
import { Link } from 'react-router-dom';

const Home = () => {
  const sports = [
    { name: "Tennis", icon: "🎾", coaches: 245 },
    { name: "Football", icon: "⚽", coaches: 189 },
    { name: "Basketball", icon: "🏀", coaches: 167 },
    { name: "Swimming", icon: "🏊", coaches: 98 },
    { name: "Cricket", icon: "🏏", coaches: 134 },
    { name: "Badminton", icon: "🏸", coaches: 76 }
  ];

  const features = [
    {
      icon: <Search className="feature-icon" />,
      title: "Find Perfect Coaches",
      description: "Browse verified coaches with detailed profiles, ratings, and specialties"
    },
    {
      icon: <MapPin className="feature-icon" />,
      title: "Location Based Search",
      description: "Discover coaches near you with our advanced location filtering"
    },
    {
      icon: <Calendar className="feature-icon" />,
      title: "Tournament Updates",
      description: "Stay updated with ongoing and upcoming sports tournaments"
    },
    {
      icon: <Shield className="feature-icon" />,
      title: "Verified Professionals",
      description: "All coaches are thoroughly verified for credentials and experience"
    }
  ];

  const featuredCoaches = [
    {
      name: "Sarah Johnson",
      sport: "Tennis",
      experience: "8 years",
      rating: 4.9,
      students: 120,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      specialty: "Serve Technique & Strategy"
    },
    {
      name: "Mike Chen",
      sport: "Basketball",
      experience: "12 years",
      rating: 4.8,
      students: 95,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      specialty: "Shooting & Defense"
    },
    {
      name: "Emma Davis",
      sport: "Swimming",
      experience: "6 years",
      rating: 4.7,
      students: 78,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      specialty: "Freestyle & Butterfly"
    }
  ];

  return (
    <div className="home-page">
      {/* Header with Admin Login Button */}
      <header className="home-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h2>PlayBit</h2>
            </div>
            <div className="header-actions">
              <Link to="/admin/auth" className="admin-login-btn">
               <Settings size={18} />
                     Admin Login
              </Link>

            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Find Your Perfect 
              <span className="hero-highlight"> Sports Coach</span>
            </h1>
            <p className="hero-description">
              Connect with certified professional coaches across 50+ sports. 
              Improve your skills, achieve your goals, and transform your game with expert guidance.
            </p>
            
            <div className="hero-search">
              <div className="search-box">
                <Search className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search coaches by sport, name, or location..."
                  className="search-input"
                />
                <Link to="/coach/auth" className="search-btn" style={{textDecoration:'none'}}>
                  Find Coaches
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Categories */}
      <section className="sports-section">
        <div className="container">
          <div className="section-header">
            <h2>Popular Sports Categories</h2>
            <p>Choose from a wide range of sports and find specialized coaches</p>
          </div>
          <div className="sports-grid">
            {sports.map((sport, index) => (
              <Link to={`/sport/${sport.name.toLowerCase()}`} key={index} className="sport-card">
                <div className="sport-icon">{sport.icon}</div>
                <h3 className="sport-name">{sport.name}</h3>
                <p className="sport-coaches">{sport.coaches} coaches available</p>
                <div className="sport-arrow">
                  <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How PlayBit Works</h2>
            <p>Get started in three simple steps</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <Users className="step-icon" />
                <h3>Create Your Profile</h3>
                <p>Sign up and tell us about your sports interests and goals</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <Search className="step-icon" />
                <h3>Find Your Coach</h3>
                <p>Browse verified coaches and filter by sport, location, and expertise</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <MessageCircle className="step-icon" />
                <h3>Start Training</h3>
                <p>Connect with your coach and begin your sports journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose PlayBit</h2>
            <p>Experience the best platform for sports coaching</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Coaches */}
      <section className="coaches-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Coaches</h2>
            <p>Meet some of our top-rated professional coaches</p>
          </div>
          <div className="coaches-grid">
            {featuredCoaches.map((coach, index) => (
              <div key={index} className="coach-card">
                <img src={coach.image} alt={coach.name} className="coach-image" />
                <div className="coach-info">
                  <h3 className="coach-name">{coach.name}</h3>
                  <p className="coach-sport">{coach.sport}</p>
                  <p className="coach-specialty">{coach.specialty}</p>
                  
                  <div className="coach-stats">
                    <div className="coach-stat">
                      <Star className="stat-icon" />
                      <span>{coach.rating} Rating</span>
                    </div>
                    <div className="coach-stat">
                      <Users className="stat-icon" />
                      <span>{coach.students} Students</span>
                    </div>
                    <div className="coach-stat">
                      <Trophy className="stat-icon" />
                      <span>{coach.experience}</span>
                    </div>
                  </div>
                  
                  <Link to="/coach/auth" className="search-btn" style={{textDecoration:'none',borderRadius:'10px',padding:'18px 18px',alignItems:'center',justifyContent:'center'}}>
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="section-actions">
            <Link to="/coach/auth" className="btn-primary">
              View All Coaches
              <ArrowRight className="btn-icon" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Sports Journey?</h2>
            <p>Join thousands of athletes who have found their perfect coach on PlayBit</p>
            <div className="cta-actions">
              <Link to="/register" className="btn-primary large">
                Find Your Coach
              </Link>
              <Link to="/coach/auth" className="btn-secondary large">
                Become a Coach
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;