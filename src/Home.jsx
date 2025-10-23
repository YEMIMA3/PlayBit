import React, { useState, useRef } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import "./styles/home.scss";
import "./styles/buttons.scss";

import heroBackground from "./assets/bg1.jpg";

// Tournament images
import tournament1 from "./assets/tournaments/tournaments.jpeg";
import tournament2 from "./assets/tournaments/tournaments.jpeg";
import tournament3 from "./assets/tournaments/tournaments.jpeg";

// Coach images
import coach1 from "./assets/coaches/coach1.jpg";
import baseballImg from "./assets/sports/baseball.jpeg";

const featuredSports = [
  { name: "Soccer", icon: "⚽", image: baseballImg },
  { name: "Basketball", icon: "🏀", image: baseballImg },
  { name: "Tennis", icon: "🎾", image: baseballImg },
  { name: "Swimming", icon: "🏊", image: baseballImg },
  { name: "Baseball", icon: "⚾", image: baseballImg },
];

const coaches = [
  { name: "John Martinez", sport: "Fitness & Strength", rating: 4.9, experience: "8 years", image: coach1 },
  { name: "Sarah Johnson", sport: "Basketball", rating: 4.8, experience: "6 years", image: coach1 },
  { name: "Michael Chen", sport: "Tennis", rating: 5.0, experience: "10 years", image: coach1 },
  { name: "David Thompson", sport: "Swimming", rating: 4.7, experience: "12 years", image: coach1 },
  { name: "Robert Wilson", sport: "Soccer", rating: 4.9, experience: "9 years", image: coach1 },
  { name: "Emma Davis", sport: "Yoga & Wellness", rating: 5.0, experience: "7 years", image: coach1 },
];

const tournaments = [
  { name: "City Championship Cup", sport: "Multi-Sport", date: "Dec 15-20, 2025", location: "Central Stadium", image: tournament1 },
  { name: "National Basketball League", sport: "Basketball", date: "Jan 5-12, 2026", location: "Sports Arena", image: tournament2 },
  { name: "Grand Tennis Masters", sport: "Tennis", date: "Feb 18-25, 2026", location: "Tennis Center", image: tournament3 },
];

const whyChooseFeatures = [
  { title: "Expert Coaches", description: "Connect with certified and experienced coaches across 50+ sports" },
  { title: "Personalized Training", description: "Get customized training plans and diet recommendations" },
  { title: "Track Progress", description: "Monitor your performance with detailed analytics and graphs" },
  { title: "Flexible Scheduling", description: "Book sessions that fit your schedule with easy rescheduling" },
  { title: "Community Groups", description: "Join training groups and connect with fellow athletes" },
  { title: "Video Analysis", description: "Review your technique with coach feedback and video playback" },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Refs for horizontal scroll
  const tournamentsRef = useRef(null);
  const coachesRef = useRef(null);

  const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${heroBackground})` }}>
        <div className="hero__overlay"></div>
        <div className="hero__content">
          <h1 className="hero__title">Find the Right Coach, Train Smarter</h1>
          <p className="hero__subtitle">
            Connect with professional coaches across multiple sports and take your skills to the next level
          </p>

          <div className="hero__search">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search by sport, coach name, or location..."
                className="hero__input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-hero btn-lg">
                <Search size={20} style={{ marginRight: "0.5rem" }} />
                Search
              </button>
            </div>
          </div>

          <div className="hero__cta">
            <button className="btn btn-hero btn-xl">Find a Coach</button>
            <button className="btn btn-outline btn-xl">Join as Coach</button>
          </div>
        </div>
      </section>

      {/* Featured Sports */}
      <section className="featured-sports-section">
        <h2>Featured Sports</h2>
        <div className="sports-grid">
          {featuredSports.map((sport, i) => (
            <div key={i} className="sport-card">
              <div className="sport-image">
                <img src={sport.image} alt={sport.name} />
                <div className="overlay">
                  <div className="sport-info">
                    <div className="sport-icon">{sport.icon}</div>
                    <h3>{sport.name}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

{/* Live Tournaments Carousel */}
<section className="carousel-section">
  <h2>Live Tournaments</h2>
  <div className="carousel">
    <button className="carousel-btn prev" onClick={() => scrollLeft(tournamentsRef)}>
      <ChevronLeft size={20} />
    </button>

    <div className="horizontal-scroll" ref={tournamentsRef}>
      {tournaments.map((tournament, i) => (
        <div key={i} className="tournament-card">
          <div className="tournament-image">
            <img src={tournament.image} alt={tournament.name} />
            <div className="sport-badge">{tournament.sport}</div>
          </div>
          <div className="tournament-info">
            <h3>{tournament.name}</h3>
            <p>📅 {tournament.date}</p>
            <p>📍 {tournament.location}</p>
            <button className="btn btn-hero" style={{ width: "100%" }}>View Details</button>
          </div>
        </div>
      ))}
    </div>

    <button className="carousel-btn next" onClick={() => scrollRight(tournamentsRef)}>
      <ChevronRight size={20} />
    </button>
  </div>
</section>

{/* Featured Coaches Carousel */}
<section className="carousel-section">
  <h2>Featured Coaches</h2>
  <div className="carousel">
    <button className="carousel-btn prev" onClick={() => scrollLeft(coachesRef)}>
      <ChevronLeft size={20} />
    </button>

    <div className="horizontal-scroll" ref={coachesRef}>
      {coaches.map((coach, i) => (
        <div key={i} className="coach-card">
          <div className="coach-image">
            <img src={coach.image} alt={coach.name} />
            <div className="rating-badge">⭐ {coach.rating}</div>
          </div>
          <div className="coach-info">
            <h3 className="coach-name">{coach.name}</h3>
            <p className="coach-sport">{coach.sport}</p>
            <p className="coach-experience">{coach.experience} experience</p>
            <button className="btn btn-primary" style={{ width: "100%" }}>View Profile</button>
          </div>
        </div>
      ))}
    </div>

    <button className="carousel-btn next" onClick={() => scrollRight(coachesRef)}>
      <ChevronRight size={20} />
    </button>
  </div>
</section>



      {/* Why Choose Section */}
      <section className="why-choose">
        <div className="container">
          <h2>Why Choose PlayBit</h2>
          <div className="features-scroll">
            <div className="features-track">
              {[...whyChooseFeatures, ...whyChooseFeatures].map((f, i) => (
                <div key={i} className="feature-card">
                  <div className="feature-icon"><span>✨</span></div>
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="footer-cta">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of athletes already training with PlayBit's expert coaches</p>
          <button className="btn btn-secondary btn-xl">Get Started Now</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
