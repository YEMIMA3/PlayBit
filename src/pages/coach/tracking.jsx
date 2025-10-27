import React, { useState } from "react";
import "../../styles/coach/performance.scss";
import Button from "../../components/common/Button";
import CoachNav from './coachnav';

// Enhanced Avatar component
function Avatar({ src, name, className, size = "medium" }) {
  return (
    <div className={`avatar ${className} ${size}`}>
      {src ? (
        <img src={src} alt={name} />
      ) : (
        <span className="avatar-initials">
          {name.split(" ").map(n => n[0]).join("")}
        </span>
      )}
    </div>
  );
}

// Enhanced Badge component
function Badge({ children, variant = "default", className }) {
  return (
    <span className={`badge ${variant} ${className}`}>
      {children}
    </span>
  );
}

// Enhanced Star Rating Component
function StarRating({ rating, onRate, editable = false, size = "medium" }) {
  return (
    <div className={`star-rating ${size}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`star ${star <= rating ? "filled" : ""} ${editable ? "editable" : ""}`}
          onClick={() => editable && onRate(star)}
          disabled={!editable}
        >
          <span className="star-icon">★</span>
        </button>
      ))}
    </div>
  );
}

// Enhanced Performance Grade Component
function PerformanceGrade({ score, size = "medium" }) {
  const getGrade = (score) => {
    if (score >= 90) return { grade: "A+", color: "#10b981", bgColor: "#ecfdf5" };
    if (score >= 85) return { grade: "A", color: "#10b981", bgColor: "#ecfdf5" };
    if (score >= 80) return { grade: "A-", color: "#22c55e", bgColor: "#f0fdf4" };
    if (score >= 75) return { grade: "B+", color: "#84cc16", bgColor: "#f7fee7" };
    if (score >= 70) return { grade: "B", color: "#eab308", bgColor: "#fefce8" };
    if (score >= 65) return { grade: "B-", color: "#f59e0b", bgColor: "#fffbeb" };
    if (score >= 60) return { grade: "C+", color: "#f97316", bgColor: "#fff7ed" };
    if (score >= 55) return { grade: "C", color: "#ef4444", bgColor: "#fef2f2" };
    if (score >= 50) return { grade: "C-", color: "#dc2626", bgColor: "#fef2f2" };
    return { grade: "F", color: "#991b1b", bgColor: "#fef2f2" };
  };

  const { grade, color, bgColor } = getGrade(score);

  return (
    <div 
      className={`performance-grade ${size}`}
      style={{ 
        borderColor: color,
        backgroundColor: bgColor
      }}
    >
      <span className="grade-letter" style={{ color }}>{grade}</span>
      <span className="grade-score" style={{ color }}>{score}/100</span>
    </div>
  );
}

// Metric Card Component
function MetricCard({ icon, value, label, trend, className }) {
  return (
    <div className={`metric-card ${className}`}>
      <div className="metric-icon">{icon}</div>
      <div className="metric-content">
        <div className="metric-value">{value}</div>
        <div className="metric-label">{label}</div>
        {trend && (
          <div className={`metric-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
            {trend >= 0 ? '↗' : '↘'} {Math.abs(trend)}%
          </div>
        )}
      </div>
    </div>
  );
}

// Enhanced Chart components with modern design
function PerformanceChart({ data, onUpdateScore }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editScore, setEditScore] = useState("");

  const maxScore = Math.max(...data.map(d => d.score));
  const minScore = Math.min(...data.map(d => d.score));

  const handleScoreUpdate = (index, newScore) => {
    if (newScore >= 0 && newScore <= 100) {
      onUpdateScore(index, newScore);
      setEditingIndex(null);
    }
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title">
          <h3>Performance Trend</h3>
          <p>Track progress over time</p>
        </div>
        <div className="chart-stats">
          <div className="stat">
            <span className="stat-label">Peak</span>
            <span className="stat-value">{maxScore}%</span>
          </div>
          <div className="stat">
            <span className="stat-label">Avg</span>
            <span className="stat-value">
              {Math.round(data.reduce((a, b) => a + b.score, 0) / data.length)}%
            </span>
          </div>
        </div>
      </div>
      
      <div className="performance-chart">
        <div className="chart-grid">
          <div className="y-axis">
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
            <span>0</span>
          </div>
          <div className="chart-area">
            <div className="chart-line">
              {data.map((point, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <div 
                      className="chart-line-segment"
                      style={{
                        left: `${((index - 1) / (data.length - 1)) * 100}%`,
                        width: `${(1 / (data.length - 1)) * 100}%`,
                        height: `${Math.abs(data[index].score - data[index-1].score)}%`,
                        bottom: `${Math.min(data[index].score, data[index-1].score)}%`
                      }}
                    />
                  )}
                  <div
                    className={`chart-point ${editingIndex === index ? 'editing' : ''}`}
                    style={{ 
                      left: `${(index / (data.length - 1)) * 100}%`,
                      bottom: `${point.score}%`
                    }}
                    onClick={() => {
                      setEditingIndex(index);
                      setEditScore(point.score.toString());
                    }}
                  >
                    {editingIndex === index ? (
                      <div className="score-editor">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={editScore}
                          onChange={(e) => setEditScore(e.target.value)}
                          onBlur={() => handleScoreUpdate(index, parseInt(editScore))}
                          onKeyPress={(e) => e.key === 'Enter' && handleScoreUpdate(index, parseInt(editScore))}
                          autoFocus
                        />
                      </div>
                    ) : (
                      <div className="point-tooltip">
                        <span>Week {index + 1}</span>
                        <strong>{point.score}%</strong>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="x-axis">
            {data.map((point, index) => (
              <span key={index}>{point.week}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillRadarChart({ data, onUpdateSkill }) {
  const [editingSkill, setEditingSkill] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleSkillUpdate = (skillIndex, newValue) => {
    if (newValue >= 0 && newValue <= 100) {
      onUpdateSkill(skillIndex, newValue);
      setEditingSkill(null);
    }
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title">
          <h3>Skill Analysis</h3>
          <p>Detailed skill breakdown</p>
        </div>
      </div>
      <div className="radar-chart">
        <div className="radar-grid">
          {data.map((skill, index) => (
            <div key={skill.skill} className="skill-bar">
              <div className="skill-info">
                <span className="skill-label">{skill.skill}</span>
                {editingSkill === index ? (
                  <div className="skill-editor">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleSkillUpdate(index, parseInt(editValue))}
                      onKeyPress={(e) => e.key === 'Enter' && handleSkillUpdate(index, parseInt(editValue))}
                      autoFocus
                    />
                    <span>%</span>
                  </div>
                ) : (
                  <span 
                    className="skill-value"
                    onClick={() => {
                      setEditingSkill(index);
                      setEditValue(skill.value.toString());
                    }}
                  >
                    {skill.value}%
                  </span>
                )}
              </div>
              <div 
                className="skill-progress"
                onClick={() => {
                  setEditingSkill(index);
                  setEditValue(skill.value.toString());
                }}
              >
                <div 
                  className="skill-fill" 
                  style={{ width: `${skill.value}%` }}
                />
                <div className="skill-marker" style={{ left: `${skill.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PerformanceBreakdown({ data, onUpdateBreakdown }) {
  const [editingCategory, setEditingCategory] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleBreakdownUpdate = (category, newValue) => {
    if (newValue >= 0 && newValue <= 100) {
      onUpdateBreakdown(category, newValue);
      setEditingCategory(null);
    }
  };

  const categories = [
    { key: 'technical', label: 'Technical', icon: '⚙️', color: '#3b82f6' },
    { key: 'physical', label: 'Physical', icon: '💪', color: '#10b981' },
    { key: 'mental', label: 'Mental', icon: '🧠', color: '#f59e0b' },
    { key: 'tactical', label: 'Tactical', icon: '🎯', color: '#ef4444' }
  ];

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title">
          <h3>Performance Breakdown</h3>
          <p>Category-wise analysis</p>
        </div>
      </div>
      <div className="breakdown-chart">
        <div className="breakdown-grid">
          {categories.map(({ key, label, icon, color }) => (
            <div key={key} className="breakdown-item">
              <div className="breakdown-header">
                <span className="breakdown-icon">{icon}</span>
                <span className="breakdown-label">{label}</span>
              </div>
              <div className="breakdown-content">
                <div 
                  className="breakdown-bar"
                  onClick={() => {
                    setEditingCategory(key);
                    setEditValue(data[key].toString());
                  }}
                >
                  <div 
                    className="breakdown-fill" 
                    style={{ 
                      width: `${data[key]}%`,
                      backgroundColor: color
                    }}
                  />
                  <div 
                    className="breakdown-marker" 
                    style={{ 
                      left: `${data[key]}%`,
                      backgroundColor: color
                    }} 
                  />
                </div>
                {editingCategory === key ? (
                  <div className="breakdown-editor">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleBreakdownUpdate(key, parseInt(editValue))}
                      onKeyPress={(e) => e.key === 'Enter' && handleBreakdownUpdate(key, parseInt(editValue))}
                      autoFocus
                    />
                    <span>%</span>
                  </div>
                ) : (
                  <span 
                    className="breakdown-value"
                    onClick={() => {
                      setEditingCategory(key);
                      setEditValue(data[key].toString());
                    }}
                  >
                    {data[key]}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Enhanced Coach Rating Modal
function CoachRatingModal({ athlete, onClose, onSave }) {
  const [ratings, setRatings] = useState({
    technical: athlete.coachRatings?.technical || 0,
    physical: athlete.coachRatings?.physical || 0,
    mental: athlete.coachRatings?.mental || 0,
    tactical: athlete.coachRatings?.tactical || 0,
    attitude: athlete.coachRatings?.attitude || 0,
    coachComments: athlete.coachComments || ""
  });

  const handleSave = () => {
    const totalScore = (
      ratings.technical + ratings.physical + ratings.mental + ratings.tactical + ratings.attitude
    ) * 4;
    onSave({
      coachRatings: ratings,
      coachComments: ratings.coachComments,
      coachScore: totalScore
    });
    onClose();
  };

  const ratingCategories = [
    { key: 'technical', label: 'Technical Skills', description: 'Sport-specific techniques and form' },
    { key: 'physical', label: 'Physical Fitness', description: 'Strength, endurance, and conditioning' },
    { key: 'mental', label: 'Mental Toughness', description: 'Focus, resilience, and game mentality' },
    { key: 'tactical', label: 'Tactical Understanding', description: 'Game strategy and decision making' },
    { key: 'attitude', label: 'Attitude & Effort', description: 'Coachability and work ethic' }
  ];

  return (
    <div className="modal-overlay">
      <div className="coach-rating-modal">
        <div className="modal-header">
          <div className="modal-title">
            <h2>Performance Assessment</h2>
            <p>Rate {athlete.name}'s performance</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <span>×</span>
          </button>
        </div>
        
        <div className="rating-categories">
          {ratingCategories.map(({ key, label, description }) => (
            <div key={key} className="rating-category">
              <div className="category-info">
                <label>{label}</label>
                <span className="category-description">{description}</span>
              </div>
              <StarRating 
                rating={ratings[key]} 
                onRate={(rating) => setRatings({...ratings, [key]: rating})}
                editable={true}
                size="large"
              />
              <span className="rating-value">{ratings[key] * 20}%</span>
            </div>
          ))}
        </div>

        <div className="comments-section">
          <div className="section-header">
            <label>Coach Feedback</label>
            <span className="character-count">{ratings.coachComments.length}/500</span>
          </div>
          <textarea
            value={ratings.coachComments}
            onChange={(e) => setRatings({...ratings, coachComments: e.target.value.slice(0, 500)})}
            placeholder="Provide detailed feedback, strengths, areas for improvement, and recommendations..."
            rows="4"
            maxLength={500}
          />
        </div>

        <div className="modal-actions">
          <Button onClick={onClose} className="btn-secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} className="btn-primary">
            Save Assessment
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function PerformanceTracking() {
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [timeFilter, setTimeFilter] = useState("monthly");
  const [groupFilter, setGroupFilter] = useState("all");
  const [sportFilter, setSportFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("progress");
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [athletes, setAthletes] = useState([
    {
      id: 1,
      name: "Alex Martinez",
      sport: "Tennis",
      group: "Advanced Tennis Squad",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      currentScore: 85,
      trend: 5.2,
      trainingSessions: 24,
      attendance: 96,
      coachScore: 76,
      coachRatings: {
        technical: 4,
        physical: 3,
        mental: 4,
        tactical: 3,
        attitude: 5
      },
      coachComments: "Excellent attitude and technical skills. Shows great potential with consistent performance. Needs to work on tactical decision-making during high-pressure situations.",
      performanceData: [
        { week: "W1", score: 78 },
        { week: "W2", score: 80 },
        { week: "W3", score: 82 },
        { week: "W4", score: 85 },
        { week: "W5", score: 83 },
        { week: "W6", score: 87 },
        { week: "W7", score: 85 },
        { week: "W8", score: 88 }
      ],
      radarData: [
        { skill: "Serve", value: 88 },
        { skill: "Backhand", value: 82 },
        { skill: "Forehand", value: 90 },
        { skill: "Footwork", value: 85 },
        { skill: "Strategy", value: 80 },
        { skill: "Stamina", value: 83 },
      ],
      breakdownData: {
        technical: 85,
        physical: 82,
        mental: 88,
        tactical: 80
      }
    },
    {
      id: 2,
      name: "Emily Chen",
      sport: "Badminton",
      group: "Beginner Badminton",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      currentScore: 72,
      trend: 8.5,
      trainingSessions: 18,
      attendance: 92,
      coachScore: 68,
      coachRatings: {
        technical: 3,
        physical: 4,
        mental: 3,
        tactical: 2,
        attitude: 4
      },
      coachComments: "Great progress in physical fitness and movement. Shows excellent dedication to training. Continue working on tactical understanding and shot selection.",
      performanceData: [
        { week: "W1", score: 60 },
        { week: "W2", score: 65 },
        { week: "W3", score: 68 },
        { week: "W4", score: 72 },
        { week: "W5", score: 70 },
        { week: "W6", score: 75 },
        { week: "W7", score: 73 },
        { week: "W8", score: 76 }
      ],
      radarData: [
        { skill: "Smash", value: 70 },
        { skill: "Drop Shot", value: 68 },
        { skill: "Clear", value: 75 },
        { skill: "Footwork", value: 72 },
        { skill: "Net Play", value: 65 },
        { skill: "Stamina", value: 70 },
      ],
      breakdownData: {
        technical: 72,
        physical: 75,
        mental: 68,
        tactical: 65
      }
    },
    {
      id: 3,
      name: "Mike Johnson",
      sport: "Tennis",
      group: "Intermediate Tennis",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      currentScore: 78,
      trend: 3.2,
      trainingSessions: 20,
      attendance: 94,
      coachScore: 72,
      coachRatings: {
        technical: 3,
        physical: 4,
        mental: 3,
        tactical: 3,
        attitude: 4
      },
      coachComments: "Consistent performer with good physical conditioning. Reliable team player who shows up prepared.",
      performanceData: [
        { week: "W1", score: 72 },
        { week: "W2", score: 74 },
        { week: "W3", score: 76 },
        { week: "W4", score: 78 },
        { week: "W5", score: 77 },
        { week: "W6", score: 79 },
        { week: "W7", score: 78 },
        { week: "W8", score: 80 }
      ],
      radarData: [
        { skill: "Serve", value: 75 },
        { skill: "Backhand", value: 80 },
        { skill: "Forehand", value: 82 },
        { skill: "Footwork", value: 78 },
        { skill: "Strategy", value: 75 },
        { skill: "Stamina", value: 76 },
      ],
      breakdownData: {
        technical: 78,
        physical: 82,
        mental: 76,
        tactical: 75
      }
    }
  ]);

  // Get unique sports for filter
  const sports = [...new Set(athletes.map(athlete => athlete.sport))];

  const filteredAthletes = athletes.filter(athlete => {
    const groupMatch = groupFilter === "all" || athlete.group === groupFilter;
    const sportMatch = sportFilter === "all" || athlete.sport === sportFilter;
    return groupMatch && sportMatch;
  });

  const handleSaveCoachRating = (athleteId, ratingData) => {
    setAthletes(athletes.map(athlete => 
      athlete.id === athleteId 
        ? { 
            ...athlete, 
            coachRatings: ratingData.coachRatings,
            coachComments: ratingData.coachComments,
            coachScore: ratingData.coachScore,
            currentScore: Math.round((athlete.currentScore + ratingData.coachScore) / 2)
          }
        : athlete
    ));
  };

  const handleUpdatePerformanceScore = (athleteId, weekIndex, newScore) => {
    setAthletes(athletes.map(athlete => {
      if (athlete.id === athleteId) {
        const updatedPerformanceData = [...athlete.performanceData];
        updatedPerformanceData[weekIndex] = {
          ...updatedPerformanceData[weekIndex],
          score: newScore
        };
        
        const currentScore = newScore;
        const previousScore = weekIndex > 0 ? updatedPerformanceData[weekIndex - 1].score : newScore;
        const trend = ((currentScore - previousScore) / previousScore) * 100;
        
        return {
          ...athlete,
          performanceData: updatedPerformanceData,
          currentScore,
          trend: parseFloat(trend.toFixed(1))
        };
      }
      return athlete;
    }));
  };

  const handleUpdateSkillScore = (athleteId, skillIndex, newValue) => {
    setAthletes(athletes.map(athlete => {
      if (athlete.id === athleteId) {
        const updatedRadarData = [...athlete.radarData];
        updatedRadarData[skillIndex] = {
          ...updatedRadarData[skillIndex],
          value: newValue
        };
        return { ...athlete, radarData: updatedRadarData };
      }
      return athlete;
    }));
  };

  const handleUpdateBreakdown = (athleteId, category, newValue) => {
    setAthletes(athletes.map(athlete => {
      if (athlete.id === athleteId) {
        return {
          ...athlete,
          breakdownData: {
            ...athlete.breakdownData,
            [category]: newValue
          }
        };
      }
      return athlete;
    }));
  };

  if (selectedAthlete) {
    const athlete = athletes.find((a) => a.id === selectedAthlete);
    
    return (
      <div className="performance-page">
        <CoachNav />
        
        <div className="page-container">
          <div className="page-header">
            <button onClick={() => setSelectedAthlete(null)} className="back-btn">
              <span className="back-icon">←</span>
              Back to Athletes
            </button>
            <div className="header-actions">
              <Button 
                className="btn-primary"
                onClick={() => setShowRatingModal(true)}
              >
                <span className="btn-icon">⭐</span>
                Rate Performance
              </Button>
            </div>
          </div>

          <div className="athlete-profile">
            <div className="profile-header">
              <Avatar src={athlete.image} name={athlete.name} className="large" size="large" />
              <div className="profile-info">
                <h1>{athlete.name}</h1>
                <div className="profile-meta">
                  <Badge variant="sport">{athlete.sport}</Badge>
                  <Badge variant="group">{athlete.group}</Badge>
                  <div className="attendance-badge">
                    <span className="attendance-icon">📅</span>
                    {athlete.attendance}% Attendance
                  </div>
                </div>
              </div>
              <PerformanceGrade score={athlete.currentScore} size="large" />
            </div>

            <div className="metrics-grid">
              <MetricCard
                icon="📈"
                value={`${athlete.currentScore}/100`}
                label="Overall Score"
                trend={athlete.trend}
              />
              <MetricCard
                icon="⭐"
                value={`${athlete.coachScore}/100`}
                label="Coach Rating"
              />
              <MetricCard
                icon="💪"
                value={athlete.trainingSessions}
                label="Sessions"
              />
              <MetricCard
                icon="🎯"
                value={`${Math.round((athlete.breakdownData.technical + athlete.breakdownData.tactical) / 2)}%`}
                label="Skill Avg"
              />
            </div>

            {athlete.coachRatings && (
              <div className="coach-assessment">
                <div className="section-header">
                  <h2>Coach Assessment</h2>
                  <Badge variant="info">Last updated: Today</Badge>
                </div>
                
                <div className="ratings-grid">
                  {Object.entries(athlete.coachRatings).map(([key, value]) => (
                    <div key={key} className="rating-item">
                      <div className="rating-info">
                        <span className="rating-label">
                          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span className="rating-percentage">{value * 20}%</span>
                      </div>
                      <StarRating rating={value} size="small" />
                      <div className="rating-bar">
                        <div 
                          className="rating-fill" 
                          style={{ width: `${value * 20}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                {athlete.coachComments && (
                  <div className="coach-feedback">
                    <div className="feedback-header">
                      <h3>Coach Feedback</h3>
                      <span className="feedback-date">Provided on: Today</span>
                    </div>
                    <div className="feedback-content">
                      <p>{athlete.coachComments}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="analytics-section">
              <div className="section-header">
                <h2>Performance Analytics</h2>
                <div className="view-options">
                  <button 
                    className={`view-option ${activeTab === "progress" ? "active" : ""}`}
                    onClick={() => setActiveTab("progress")}
                  >
                    Progress
                  </button>
                  <button 
                    className={`view-option ${activeTab === "skills" ? "active" : ""}`}
                    onClick={() => setActiveTab("skills")}
                  >
                    Skills
                  </button>
                  <button 
                    className={`view-option ${activeTab === "comparison" ? "active" : ""}`}
                    onClick={() => setActiveTab("comparison")}
                  >
                    Breakdown
                  </button>
                </div>
              </div>

              <div className="analytics-content">
                {activeTab === "progress" && (
                  <PerformanceChart 
                    data={athlete.performanceData} 
                    onUpdateScore={(index, score) => handleUpdatePerformanceScore(athlete.id, index, score)}
                  />
                )}
                
                {activeTab === "skills" && (
                  <SkillRadarChart 
                    data={athlete.radarData}
                    onUpdateSkill={(index, value) => handleUpdateSkillScore(athlete.id, index, value)}
                  />
                )}
                
                {activeTab === "comparison" && (
                  <PerformanceBreakdown 
                    data={athlete.breakdownData}
                    onUpdateBreakdown={(category, value) => handleUpdateBreakdown(athlete.id, category, value)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {showRatingModal && (
          <CoachRatingModal
            athlete={athlete}
            onClose={() => setShowRatingModal(false)}
            onSave={(ratingData) => handleSaveCoachRating(athlete.id, ratingData)}
          />
        )}
      </div>
    );
  }

  return (
    <div>
      <CoachNav />
      <div className="performance-page">
        <div className="page-container">
          <div className="page-header">
            <div className="header-content">
              <h1>Performance Tracking</h1>
              <p>Monitor and analyze athlete progress with detailed metrics and insights</p>
            </div>
            <div className="header-stats">
              <div className="stat">
                <span className="stat-number">{athletes.length}</span>
                <span className="stat-label">Athletes</span>
              </div>
              <div className="stat">
                <span className="stat-number">
                  {Math.round(athletes.reduce((acc, athlete) => acc + athlete.currentScore, 0) / athletes.length)}
                </span>
                <span className="stat-label">Avg Score</span>
              </div>
            </div>
          </div>

          <div className="filters-section">
            <div className="filters-header">
              <h2>Athlete Overview</h2>
              <div className="filter-badges">
                <Badge variant="info">{filteredAthletes.length} athletes</Badge>
              </div>
            </div>
            <div className="filters-grid">
              <div className="filter-group">
                <label>Sport</label>
                <select value={sportFilter} onChange={(e) => setSportFilter(e.target.value)}>
                  <option value="all">All Sports</option>
                  {sports.map(sport => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label>Group</label>
                <select value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)}>
                  <option value="all">All Groups</option>
                  <option value="Advanced Tennis Squad">Advanced Tennis</option>
                  <option value="Beginner Badminton">Beginner Badminton</option>
                  <option value="Intermediate Tennis">Intermediate Tennis</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Time Period</label>
                <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>
            </div>
          </div>

          <div className="athletes-grid">
            {filteredAthletes.map((athlete) => (
              <div
                key={athlete.id}
                className="athlete-card"
                onClick={() => setSelectedAthlete(athlete.id)}
              >
                <div className="card-header">
                  <Avatar src={athlete.image} name={athlete.name} />
                  <div className="athlete-info">
                    <h3>{athlete.name}</h3>
                    <div className="athlete-meta">
                      <Badge variant="sport">{athlete.sport}</Badge>
                      <span className="group">{athlete.group}</span>
                    </div>
                  </div>
                  <PerformanceGrade score={athlete.currentScore} size="small" />
                </div>
                
                <div className="card-metrics">
                  <div className="metric">
                    <span className="metric-label">Coach Rating</span>
                    <div className="metric-value">
                      <StarRating rating={Math.round(athlete.coachScore / 20)} size="small" />
                      <span>{athlete.coachScore}/100</span>
                    </div>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Attendance</span>
                    <span className="metric-value attendance">{athlete.attendance}%</span>
                  </div>
                </div>

                <div className="progress-section">
                  <div className="progress-header">
                    <span>Performance</span>
                    <span>{athlete.currentScore}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${athlete.currentScore}%` }}
                    />
                  </div>
                </div>

                <div className={`trend-indicator ${athlete.trend >= 0 ? "positive" : "negative"}`}>
                  <span className="trend-icon">{athlete.trend >= 0 ? "↗" : "↘"}</span>
                  <span className="trend-value">{Math.abs(athlete.trend)}%</span>
                  <span className="trend-label">this month</span>
                </div>

                <Button className="view-details-btn">
                  View Performance
                  <span className="btn-arrow">→</span>
                </Button>
              </div>
            ))}
          </div>

          {filteredAthletes.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">👥</div>
              <h3>No athletes found</h3>
              <p>Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}