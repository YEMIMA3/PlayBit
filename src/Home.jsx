import React, { useState } from "react";
import "./styles/home.scss";
import "./styles/buttons.scss"; // Button styles

const featuredSports = [
  { name: "Soccer", icon: "⚽", image: "https://source.unsplash.com/400x400/?soccer" },
  { name: "Basketball", icon: "🏀", image: "https://source.unsplash.com/400x400/?basketball" },
  { name: "Tennis", icon: "🎾", image: "https://source.unsplash.com/400x400/?tennis" },
  { name: "Swimming", icon: "🏊", image: "https://source.unsplash.com/400x400/?swimming" },
  { name: "Baseball", icon: "⚾", image: "https://source.unsplash.com/400x400/?baseball" },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__content">
          <h1>Find the Right Coach, Train Smarter</h1>
          <p>
            Connect with professional coaches across multiple sports and take your
            skills to the next level
          </p>

          {/* Search Bar */}
          <div className="hero__search">
            <input
              type="text"
              placeholder="Search by sport, coach name, or location..."
              className="hero__input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-search">Search</button>
          </div>

          {/* CTA Buttons */}
          <div className="hero__cta">
            <button className="btn btn-primary">Find a Coach</button>
            <button className="btn btn-outline">Join as Coach</button>
          </div>
        </div>
      </section>

      {/* Featured Sports Section */}
      <section className="featured-sports-section">
        <h2 style={{ fontSize: "30px", scrollSnapAlign: "start", color: "#333", marginBottom: "3rem" }}>
          Featured Sports
        </h2>
        <div className="sports-grid">
          {featuredSports.map((sport, index) => (
            <div key={index} className="sport-card">
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

      {/* Why Choose Section */}
      <section className="why-choose">
        <h2>Why Choose Sports Connect</h2>
        <div className="features">
          <div className="feature-card">
            <h3>Expert Coaches</h3>
            <p>Connect with certified and experienced coaches across 50+ sports</p>
          </div>
          <div className="feature-card">
            <h3>Personalized Training</h3>
            <p>Get customized training plans and diet recommendations</p>
          </div>
          <div className="feature-card">
            <h3>Track Progress</h3>
            <p>Monitor your performance with detailed analytics and graphs</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
