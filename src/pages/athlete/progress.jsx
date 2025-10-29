import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Activity, Target, Award } from 'lucide-react';
import '../../styles/athlete/progress.scss';
import AthleteNav from './AthleteNav';

const weeklyProgress = [
  { week: 'Week 1', fitness: 65, skill: 60, endurance: 70, strength: 55 },
  { week: 'Week 2', fitness: 72, skill: 65, endurance: 75, strength: 60 },
  { week: 'Week 3', fitness: 68, skill: 70, endurance: 73, strength: 58 },
  { week: 'Week 4', fitness: 78, skill: 75, endurance: 80, strength: 65 },
  { week: 'Week 5', fitness: 82, skill: 78, endurance: 85, strength: 70 },
  { week: 'Week 6', fitness: 85, skill: 82, endurance: 88, strength: 75 },
];

const monthlyProgress = [
  { month: 'June', score: 65 },
  { month: 'July', score: 72 },
  { month: 'August', score: 78 },
  { month: 'September', score: 82 },
  { month: 'October', score: 85 },
];

const skillRadarData = [
  { skill: 'Shooting', value: 85, fullMark: 100 },
  { skill: 'Dribbling', value: 78, fullMark: 100 },
  { skill: 'Defense', value: 72, fullMark: 100 },
  { skill: 'Passing', value: 88, fullMark: 100 },
  { skill: 'Stamina', value: 82, fullMark: 100 },
  { skill: 'Speed', value: 75, fullMark: 100 },
];

const dietCompliance = [
  { day: 'Mon', compliance: 95 },
  { day: 'Tue', compliance: 88 },
  { day: 'Wed', compliance: 92 },
  { day: 'Thu', compliance: 85 },
  { day: 'Fri', compliance: 90 },
  { day: 'Sat', compliance: 78 },
  { day: 'Sun', compliance: 82 },
];

const performanceMetrics = [
  { label: 'Overall Performance', current: 85, previous: 78, change: '+9%' },
  { label: 'Fitness Score', current: 85, previous: 82, change: '+4%' },
  { label: 'Skill Level', current: 82, previous: 78, change: '+5%' },
  { label: 'Diet Compliance', current: 87, previous: 85, change: '+2%' },
];

export default function ProgressTracker() {
  const [activeTab, setActiveTab] = useState('weekly');

  return (
    <div className="athlete-profile-container">
      <AthleteNav />
      <div className="progress-tracker-page">
        <div className="container">
          {/* Header */}
          <div className="header">
            <h1>Progress Tracker</h1>
            <p>Track your performance and improvement over time</p>
          </div>

          {/* Performance Metrics */}
          <div className="metrics-grid">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="metric-card fade-in">
                <div className="metric-card-header">
                  <h3>{metric.label}</h3>
                  {index === 0 ? (
                    <Award />
                  ) : index === 1 ? (
                    <Activity />
                  ) : index === 2 ? (
                    <Target />
                  ) : (
                    <TrendingUp />
                  )}
                </div>
                <div className="metric-card-content">
                  <div className="metric-value">
                    <span className="value">{metric.current}%</span>
                    <span className={`badge ${metric.change.startsWith('+') ? 'positive' : 'negative'}`}>
                      {metric.change}
                    </span>
                  </div>
                  <p>From {metric.previous}% last period</p>
                </div>
              </div>
            ))}
          </div>

          <div className="tabs-container">
            <div className="tabs-list">
              <button
                className={`tab-trigger ${activeTab === 'weekly' ? 'active' : ''}`}
                onClick={() => setActiveTab('weekly')}
              >
                Weekly Progress
              </button>
              <button
                className={`tab-trigger ${activeTab === 'monthly' ? 'active' : ''}`}
                onClick={() => setActiveTab('monthly')}
              >
                Monthly Trends
              </button>
              <button
                className={`tab-trigger ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                Skill Analysis
              </button>
              <button
                className={`tab-trigger ${activeTab === 'diet' ? 'active' : ''}`}
                onClick={() => setActiveTab('diet')}
              >
                Diet Tracking
              </button>
            </div>

            {/* Weekly Progress */}
            {activeTab === 'weekly' && (
              <div className="tab-content">
                <div className="chart-card">
                  <div className="chart-card-header">
                    <h2>Weekly Performance Metrics</h2>
                  </div>
                  <div className="chart-card-content">
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={weeklyProgress}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="fitness" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="skill" stroke="#10b981" strokeWidth={2} />
                        <Line type="monotone" dataKey="endurance" stroke="#f59e0b" strokeWidth={2} />
                        <Line type="monotone" dataKey="strength" stroke="#8b5cf6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="content-grid">
                  <div className="breakdown-card">
                    <div className="breakdown-card-header">
                      <h2>Weekly Breakdown</h2>
                    </div>
                    <div className="breakdown-content">
                      {weeklyProgress.slice(-1)[0] && (
                        <>
                          <div className="progress-item">
                            <div className="progress-header">
                              <span>Fitness</span>
                              <span>{weeklyProgress.slice(-1)[0].fitness}%</span>
                            </div>
                            <div className="progress-bar">
                              <div
                                className="progress-fill blue"
                                style={{ width: `${weeklyProgress.slice(-1)[0].fitness}%` }}
                              />
                            </div>
                          </div>

                          <div className="progress-item">
                            <div className="progress-header">
                              <span>Skill</span>
                              <span>{weeklyProgress.slice(-1)[0].skill}%</span>
                            </div>
                            <div className="progress-bar">
                              <div
                                className="progress-fill green"
                                style={{ width: `${weeklyProgress.slice(-1)[0].skill}%` }}
                              />
                            </div>
                          </div>

                          <div className="progress-item">
                            <div className="progress-header">
                              <span>Endurance</span>
                              <span>{weeklyProgress.slice(-1)[0].endurance}%</span>
                            </div>
                            <div className="progress-bar">
                              <div
                                className="progress-fill amber"
                                style={{ width: `${weeklyProgress.slice(-1)[0].endurance}%` }}
                              />
                            </div>
                          </div>

                          <div className="progress-item">
                            <div className="progress-header">
                              <span>Strength</span>
                              <span>{weeklyProgress.slice(-1)[0].strength}%</span>
                            </div>
                            <div className="progress-bar">
                              <div
                                className="progress-fill purple"
                                style={{ width: `${weeklyProgress.slice(-1)[0].strength}%` }}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="notes-card">
                    <div className="notes-card-header">
                      <h2>Coach Notes</h2>
                    </div>
                    <div className="notes-content">
                      <div className="note-item blue">
                        <h3>Week 6 - Excellent Progress!</h3>
                        <p>
                          Great improvement in endurance and strength. Keep focusing on defensive drills.
                        </p>
                        <p>- Coach Michael</p>
                      </div>

                      <div className="note-item green">
                        <h3>Week 5 - Strong Performance</h3>
                        <p>
                          Skill level is improving consistently. Continue with current training schedule.
                        </p>
                        <p>- Coach Michael</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Monthly Trends */}
            {activeTab === 'monthly' && (
              <div className="tab-content">
                <div className="chart-card">
                  <div className="chart-card-header">
                    <h2>Monthly Performance Trend</h2>
                  </div>
                  <div className="chart-card-content">
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={monthlyProgress}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* Skill Analysis */}
            {activeTab === 'skills' && (
              <div className="tab-content">
                <div className="chart-card">
                  <div className="chart-card-header">
                    <h2>Skill Breakdown Analysis</h2>
                  </div>
                  <div className="chart-card-content">
                    <ResponsiveContainer width="100%" height={500}>
                      <RadarChart data={skillRadarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="skill" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar name="Current Level" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>

                    <div className="skills-grid">
                      {skillRadarData.map((skill, index) => (
                        <div key={index} className="skill-item">
                          <p>{skill.skill}</p>
                          <div className="skill-value">
                            <span>{skill.value}</span>
                            <span>/ 100</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Diet Tracking */}
            {activeTab === 'diet' && (
              <div className="tab-content">
                <div className="chart-card">
                  <div className="chart-card-header">
                    <h2>Weekly Diet Compliance</h2>
                  </div>
                  <div className="chart-card-content">
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={dietCompliance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="compliance" fill="#10b981" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>

                    <div className="compliance-note">
                      <p>Average Compliance: 87%</p>
                      <p>
                        Great job! Try to maintain consistency over the weekends for better results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}