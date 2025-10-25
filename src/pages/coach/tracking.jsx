import React, { useState } from "react";
import "../../styles/coach/performance.scss";
import Button from "../../components/common/Button";
import CoachNav from './coachnav';

// Avatar component
function Avatar({ src, name, className }) {
  return (
    <div className={`avatar ${className}`}>
      {src ? <img src={src} alt={name} /> : <span>{name.split(" ").map(n => n[0]).join("")}</span>}
    </div>
  );
}

// Badge component
function Badge({ children, className }) {
  return <span className={`badge ${className}`}>{children}</span>;
}

// Chart components (you can replace with actual chart libraries)
function PerformanceChart({ data }) {
  return (
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
              <div
                key={index}
                className="chart-point"
                style={{ 
                  left: `${(index / (data.length - 1)) * 100}%`,
                  bottom: `${point.score}%`
                }}
              />
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
  );
}

function SkillRadarChart({ data }) {
  return (
    <div className="radar-chart">
      <div className="radar-grid">
        {data.map((skill, index) => (
          <div key={skill.skill} className="skill-bar">
            <span className="skill-label">{skill.skill}</span>
            <div className="skill-progress">
              <div 
                className="skill-fill" 
                style={{ width: `${skill.value}%` }}
              />
              <span className="skill-value">{skill.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PerformanceBreakdown({ data }) {
  return (
    <div className="breakdown-chart">
      <div className="breakdown-grid">
        <div className="breakdown-item">
          <span className="breakdown-label">Technical</span>
          <div className="breakdown-bar">
            <div style={{ width: `${data.technical}%` }} />
          </div>
          <span className="breakdown-value">{data.technical}%</span>
        </div>
        <div className="breakdown-item">
          <span className="breakdown-label">Physical</span>
          <div className="breakdown-bar">
            <div style={{ width: `${data.physical}%` }} />
          </div>
          <span className="breakdown-value">{data.physical}%</span>
        </div>
        <div className="breakdown-item">
          <span className="breakdown-label">Mental</span>
          <div className="breakdown-bar">
            <div style={{ width: `${data.mental}%` }} />
          </div>
          <span className="breakdown-value">{data.mental}%</span>
        </div>
        <div className="breakdown-item">
          <span className="breakdown-label">Tactical</span>
          <div className="breakdown-bar">
            <div style={{ width: `${data.tactical}%` }} />
          </div>
          <span className="breakdown-value">{data.tactical}%</span>
        </div>
      </div>
    </div>
  );
}

export default function PerformanceTracking() {
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [timeFilter, setTimeFilter] = useState("monthly");
  const [groupFilter, setGroupFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("progress");

  const athletes = [
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
      performanceData: [
        { week: "Week 1", score: 78 },
        { week: "Week 2", score: 80 },
        { week: "Week 3", score: 82 },
        { week: "Week 4", score: 85 },
        { week: "Week 5", score: 83 },
        { week: "Week 6", score: 87 },
        { week: "Week 7", score: 85 },
        { week: "Week 8", score: 88 }
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
      performanceData: [
        { week: "Week 1", score: 60 },
        { week: "Week 2", score: 65 },
        { week: "Week 3", score: 68 },
        { week: "Week 4", score: 72 },
        { week: "Week 5", score: 70 },
        { week: "Week 6", score: 75 },
        { week: "Week 7", score: 73 },
        { week: "Week 8", score: 76 }
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
  ];

  const filteredAthletes = athletes.filter(
    (a) => groupFilter === "all" || a.group === groupFilter
  );

  if (selectedAthlete) {
    const athlete = athletes.find((a) => a.id === selectedAthlete);
    
    return (
      <div className="performance-page">
        <Button onClick={() => setSelectedAthlete(null)} className="back-btn">
          ← Back to Athletes
        </Button>

        <div className="athlete-header">
          <Avatar src={athlete.image} name={athlete.name} className="large" />
          <div className="athlete-info">
            <h1>{athlete.name}</h1>
            <div className="badges">
              <Badge className="sport">{athlete.sport}</Badge>
              <Badge className="group">{athlete.group}</Badge>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Current Score</p>
            <h2 className="stat-value">{athlete.currentScore}/100</h2>
            <p className={`stat-trend ${athlete.trend >= 0 ? "positive" : "negative"}`}>
              ↗ {Math.abs(athlete.trend)}% from last month
            </p>
          </div>
          
          <div className="stat-card">
            <p className="stat-label">Training Sessions</p>
            <h2 className="stat-value">{athlete.trainingSessions}</h2>
            <p className="stat-subtext">This month</p>
          </div>
          
          <div className="stat-card">
            <p className="stat-label">Attendance</p>
            <h2 className="stat-value">{athlete.attendance}%</h2>
            <p className="stat-subtext">Excellent attendance</p>
          </div>
        </div>

        <div className="charts-section">
          <div className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === "progress" ? "active" : ""}`}
              onClick={() => setActiveTab("progress")}
            >
              Progress Over Time
            </button>
            <button 
              className={`tab-btn ${activeTab === "skills" ? "active" : ""}`}
              onClick={() => setActiveTab("skills")}
            >
              Skill Analysis
            </button>
            <button 
              className={`tab-btn ${activeTab === "comparison" ? "active" : ""}`}
              onClick={() => setActiveTab("comparison")}
            >
              Performance Breakdown
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "progress" && (
              <div className="chart-container">
                <h3>Performance Trend</h3>
                <PerformanceChart data={athlete.performanceData} />
              </div>
            )}
            
            {activeTab === "skills" && (
              <div className="chart-container">
                <h3>Skill Analysis</h3>
                <SkillRadarChart data={athlete.radarData} />
              </div>
            )}
            
            {activeTab === "comparison" && (
              <div className="chart-container">
                <h3>Performance Breakdown</h3>
                <PerformanceBreakdown data={athlete.breakdownData} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
    <CoachNav />
    <div className="performance-page">
      <div className="page-header">
        <h1>Performance Tracking</h1>
        <p>Monitor and analyze athlete progress and metrics</p>
      </div>

      <div className="filters-card">
        <div className="filter-group">
          <label>Group</label>
          <select value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)}>
            <option value="all">All Groups</option>
            <option value="Advanced Tennis Squad">Advanced Tennis Squad</option>
            <option value="Beginner Badminton">Beginner Badminton</option>
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

      <div className="athletes-grid">
        {filteredAthletes.map((athlete) => (
          <div
            key={athlete.id}
            className="athlete-card"
            onClick={() => setSelectedAthlete(athlete.id)}
          >
            <div className="card-header">
              <Avatar src={athlete.image} name={athlete.name} />
              <div className="athlete-meta">
                <h3>{athlete.name}</h3>
                <Badge className="sport">{athlete.sport}</Badge>
              </div>
            </div>
            
            <div className="progress-section">
              <div className="score-progress">
                <span>Performance Score</span>
                <span>{athlete.currentScore}/100</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${athlete.currentScore}%` }}
                />
              </div>
            </div>
            
            <div className={`trend ${athlete.trend >= 0 ? "positive" : "negative"}`}>
              {athlete.trend >= 0 ? "↗" : "↘"} {Math.abs(athlete.trend)}%
            </div>
            
            <Button className="view-details-btn">View Details</Button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}