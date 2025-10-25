import React, { useState } from "react";
import { 
  Camera, 
  Upload, 
  Award, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar,
  Plus,
  X,
  FileText,
  Shield,
  Star,
  TrendingUp,
  Users
} from "lucide-react";
import "../../styles/coach/profile.scss";
import CoachNav from './coachnav';

export default function CoachProfile() {
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@coachplatform.com",
    phone: "+1 (555) 123-4567",
    location: "Los Angeles, CA",
    sports: ["Tennis", "Badminton"],
    experience: "12 years",
    bio: "Passionate tennis coach with over a decade of experience in developing young talent. Specialized in tournament preparation and mental conditioning. Committed to helping athletes reach their full potential through personalized training programs.",
    certifications: ["USPTA Certified", "Sports Psychology", "CPR Certified"],
    hourlyRate: "$85",
    availability: "Mon-Fri: 3 PM - 8 PM, Sat: 9 AM - 2 PM",
    achievements: [
      "Coached 5 state champions",
      "100+ students trained",
      "92% success rate"
    ]
  });

  const [newSport, setNewSport] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [activeTab, setActiveTab] = useState("basic");
  const [isEditing, setIsEditing] = useState(false);

  const stats = [
    { label: "Students Trained", value: "150+", icon: Users },
    { label: "Success Rate", value: "92%", icon: TrendingUp },
    { label: "Coach Rating", value: "4.9", icon: Star },
    { label: "Years Experience", value: "12", icon: Calendar }
  ];

  const addSport = () => {
    if (newSport.trim()) {
      setProfile({
        ...profile,
        sports: [...profile.sports, newSport.trim()],
      });
      setNewSport("");
    }
  };

  const removeSport = (sport) => {
    setProfile({
      ...profile,
      sports: profile.sports.filter((s) => s !== sport),
    });
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      setProfile({
        ...profile,
        certifications: [...profile.certifications, newCertification.trim()],
      });
      setNewCertification("");
    }
  };

  const removeCertification = (cert) => {
    setProfile({
      ...profile,
      certifications: profile.certifications.filter((c) => c !== cert),
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Simulate API call
    setTimeout(() => {
      alert("Profile updated successfully!");
    }, 500);
  };

  const handleCancel = () => {
    setIsEditing(false);
    alert("Changes discarded.");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simulate image upload
      alert(`Profile picture updated: ${file.name}`);
    }
  };

  return (
    <div>
    <CoachNav />
    <div className="coach-profile">
      {/* Header Section */}
      <div className="profile-header">
        <div className="header-content">
          <h1>Coach Profile</h1>
          <p>Manage your professional information and credentials</p>
        </div>
        <div className="header-actions">
          {!isEditing ? (
            <button 
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="profile-layout">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="avatar-section">
            <div className="avatar-container">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
                alt="Coach Avatar"
                className="avatar"
              />
              {isEditing && (
                <label className="upload-overlay">
                  <Camera size={20} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                  />
                </label>
              )}
            </div>
            <h2>{profile.name}</h2>
            <p className="coach-title">Professional Coach</p>
            <div className="rating">
              <Star fill="currentColor" size={16} />
              <span>4.9 Rating</span>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-section">
            <h3>Coach Stats</h3>
            <div className="stats-grid">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="stat-item">
                    <Icon size={18} className="stat-icon" />
                    <div>
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Info */}
          <div className="quick-info">
            <h3>Quick Info</h3>
            <div className="info-item">
              <MapPin size={16} />
              <span>{profile.location}</span>
            </div>
            <div className="info-item">
              <Mail size={16} />
              <span>{profile.email}</span>
            </div>
            <div className="info-item">
              <Phone size={16} />
              <span>{profile.phone}</span>
            </div>
            <div className="info-item">
              <Calendar size={16} />
              <span>{profile.experience}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-main">
          {/* Navigation Tabs */}
          <div className="profile-tabs">
            <button 
              className={`tab ${activeTab === "basic" ? "active" : ""}`}
              onClick={() => setActiveTab("basic")}
            >
              Basic Information
            </button>
            <button 
              className={`tab ${activeTab === "sports" ? "active" : ""}`}
              onClick={() => setActiveTab("sports")}
            >
              Sports & Certifications
            </button>
            <button 
              className={`tab ${activeTab === "professional" ? "active" : ""}`}
              onClick={() => setActiveTab("professional")}
            >
              Professional Details
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Basic Information Tab */}
            {activeTab === "basic" && (
              <div className="form-section">
                <div className="section-header">
                  <h3>Personal Information</h3>
                  <p>Update your basic profile details</p>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Biography</label>
                  <textarea
                    rows="4"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Tell athletes about your coaching philosophy, experience, and specialties..."
                  />
                </div>
              </div>
            )}

            {/* Sports & Certifications Tab */}
            {activeTab === "sports" && (
              <div className="form-section">
                <div className="section-header">
                  <h3>Sports & Certifications</h3>
                  <p>Manage your coached sports and professional credentials</p>
                </div>

                {/* Sports Section */}
                <div className="form-group">
                  <label>Sports Coached</label>
                  <div className="tags-container">
                    {profile.sports.map((sport) => (
                      <span className="tag sport-tag" key={sport}>
                        🎾 {sport}
                        {isEditing && (
                          <button 
                            onClick={() => removeSport(sport)} 
                            className="remove-tag"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="add-input">
                      <input
                        type="text"
                        placeholder="Add a sport you coach..."
                        value={newSport}
                        onChange={(e) => setNewSport(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addSport()}
                      />
                      <button onClick={addSport} className="add-btn">
                        <Plus size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Certifications Section */}
                <div className="form-group">
                  <label>Professional Certifications</label>
                  <div className="tags-container">
                    {profile.certifications.map((cert) => (
                      <span className="tag cert-tag" key={cert}>
                        <Award size={14} />
                        {cert}
                        {isEditing && (
                          <button 
                            onClick={() => removeCertification(cert)} 
                            className="remove-tag"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="add-input">
                      <input
                        type="text"
                        placeholder="Add a certification..."
                        value={newCertification}
                        onChange={(e) => setNewCertification(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addCertification()}
                      />
                      <button onClick={addCertification} className="add-btn">
                        <Plus size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Document Upload */}
                {isEditing && (
                  <div className="form-group">
                    <label>Upload Certification Documents</label>
                    <div className="upload-section">
                      <div className="upload-area">
                        <Upload size={24} />
                        <div className="upload-text">
                          <p>Click to upload or drag & drop</p>
                          <small>PDF, JPG, PNG up to 10MB</small>
                        </div>
                        <input type="file" className="file-input" multiple />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Professional Details Tab */}
            {activeTab === "professional" && (
              <div className="form-section">
                <div className="section-header">
                  <h3>Professional Details</h3>
                  <p>Set your coaching rates and availability</p>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Hourly Rate</label>
                    <input
                      type="text"
                      value={profile.hourlyRate}
                      onChange={(e) => setProfile({ ...profile, hourlyRate: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Experience</label>
                    <input
                      type="text"
                      value={profile.experience}
                      onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Availability</label>
                  <textarea
                    rows="3"
                    value={profile.availability}
                    onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Describe your typical availability for sessions..."
                  />
                </div>

                <div className="form-group">
                  <label>Key Achievements</label>
                  <div className="achievements-list">
                    {profile.achievements.map((achievement, index) => (
                      <div key={index} className="achievement-item">
                        <Shield size={16} />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Edit Mode Actions */}
          {isEditing && (
            <div className="action-buttons">
              <button className="cancel-btn" onClick={handleCancel}>
                Discard Changes
              </button>
              <button className="save-btn" onClick={handleSave}>
                <FileText size={16} />
                Save All Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}