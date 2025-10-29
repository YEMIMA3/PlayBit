import React, { useState, useRef, useEffect } from "react";
import "../../styles/athlete/group.scss";
import AthleteNav from './athleteNav';

export default function AthleteGroups() {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Advanced Tennis Squad",
      sport: "Tennis",
      members: [
        { id: 1, name: "Alex Martinez", email: "alex@email.com", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop", joined: "2025-01-15" },
        { id: 2, name: "Marcus Thompson", email: "marcus@email.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop", joined: "2025-02-20" },
        { id: 3, name: "Sophie Williams", email: "sophie@email.com", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop", joined: "2025-01-10" }
      ],
      level: "Advanced",
      schedule: "Mon, Wed, Fri - 6:00 PM",
      location: "Court A",
      image: "https://images.unsplash.com/photo-1706536069138-0d9ee537aff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      announcements: [
        { id: 1, text: "Tournament preparation starts next week", date: "2025-10-23" },
        { id: 2, text: "Bring your own water bottles", date: "2025-10-20" },
      ],
      avgPerformance: 85,
      dietPlan: "Breakfast: High protein smoothie, oatmeal\nLunch: Grilled chicken, brown rice, vegetables\nSnack: Fruits and nuts\nDinner: Fish, quinoa, salad",
      trainingSchedule: "Monday: Serve practice (1hr), Match play (1hr)\nWednesday: Footwork drills (45min), Backhand practice (1hr)\nFriday: Fitness training (30min), Tournament prep (1.5hr)",
      attendance: [
        {
          date: "2025-10-25",
          session: "Evening Practice",
          records: [
            { memberId: 1, status: "present" },
            { memberId: 2, status: "absent" },
            { memberId: 3, status: "present" }
          ]
        },
        {
          date: "2025-10-23",
          session: "Morning Training",
          records: [
            { memberId: 1, status: "present" },
            { memberId: 2, status: "present" },
            { memberId: 3, status: "late" }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Beginner Badminton",
      sport: "Badminton",
      members: [
        { id: 1, name: "Emily Chen", email: "emily@email.com", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop", joined: "2025-03-01" },
        { id: 2, name: "David Lee", email: "david@email.com", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop", joined: "2025-03-15" }
      ],
      level: "Beginner",
      schedule: "Tue, Thu - 5:00 PM",
      location: "Indoor Arena",
      image: "https://images.unsplash.com/photo-1722087642932-9b070e9a066e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      announcements: [{ id: 1, text: "Focus on footwork drills this week", date: "2025-10-22" }],
      avgPerformance: 72,
      dietPlan: "Breakfast: Oatmeal with fruits\nLunch: Chicken salad\nSnack: Protein bar\nDinner: Pasta with vegetables",
      trainingSchedule: "Tuesday: Basic footwork (1hr)\nThursday: Racket skills (1hr)",
      attendance: [
        {
          date: "2025-10-24",
          session: "Basic Skills",
          records: [
            { memberId: 1, status: "present" },
            { memberId: 2, status: "present" }
          ]
        }
      ]
    },
  ]);

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "Alex Martinez", message: "Coach, what time is tomorrow's practice?", time: "10:30 AM", isCoach: false },
    { id: 2, sender: "Coach Michael", message: "6:00 PM at Court A. Don't be late!", time: "10:32 AM", isCoach: true },
    { id: 3, sender: "Sophie Williams", message: "I'll bring the extra balls", time: "10:35 AM", isCoach: false },
    { id: 4, sender: "You", message: "Got it, see you all there!", time: "10:40 AM", isCoach: false }
  ]);

  const chatBoxRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = {
      id: chatMessages.length + 1,
      sender: "You",
      message: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCoach: false
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setChatMessage("");
  };

  const getMemberAttendanceSummary = (memberId) => {
    const group = groups.find(g => g.id === selectedGroup.id);
    if (!group?.attendance) return { present: 0, absent: 0, late: 0, total: 0 };
    
    const allRecords = group.attendance.flatMap(session => 
      session.records.filter(record => record.memberId === memberId)
    );
    
    return {
      present: allRecords.filter(r => r.status === "present").length,
      absent: allRecords.filter(r => r.status === "absent").length,
      late: allRecords.filter(r => r.status === "late").length,
      total: allRecords.length
    };
  };

  const getCurrentUserAttendance = () => {
    const currentUserId = 1;
    return getMemberAttendanceSummary(currentUserId);
  };

  return (
    <div className="athlete-profile-container">
      <AthleteNav />
      <div className="athlete-groups-page">
        <div className="container">
          <div className="header">
            <div>
              <h1>My Groups</h1>
              <p>View your training groups and interact with teammates</p>
            </div>
          </div>

          {/* Groups Grid */}
          <div className="groups-grid">
            {groups.map((group) => (
              <div key={group.id} className="group-card" onClick={() => setSelectedGroup(group)}>
                <div className="image-wrapper">
                  <img src={group.image} alt={group.name} />
                  <div className="overlay">
                    <h3>{group.name}</h3>
                    <span className="badge">{group.sport}</span>
                    <span className="badge">{group.level}</span>
                  </div>
                </div>
                <div className="group-info">
                  <div className="stats">
                    <p>{group.members.length} members</p>
                    <p>Avg: {group.avgPerformance}%</p>
                  </div>
                  <p className="schedule">{group.schedule}</p>
                  <p className="location">{group.location}</p>
                  
                  {/* Members Preview */}
                  <div className="members-preview">
                    {group.members.slice(0, 3).map(member => (
                      <img key={member.id} src={member.avatar} alt={member.name} className="member-avatar" />
                    ))}
                    {group.members.length > 3 && (
                      <div className="more-members">+{group.members.length - 3}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Group Modal */}
          {selectedGroup && (
            <div className="modal-backdrop">
              <div className="modal large">
                <div className="modal-header">
                  <h2>{selectedGroup.name}</h2>
                  <button className="close-btn" onClick={() => setSelectedGroup(null)}>
                    ×
                  </button>
                </div>

                {/* Group Info Bar */}
                <div className="group-info-bar">
                  <span className="info-item">{selectedGroup.sport}</span>
                  <span className="info-item">{selectedGroup.level}</span>
                  <span className="info-item">{selectedGroup.members.length} members</span>
                  <span className="info-item">{selectedGroup.schedule}</span>
                  <span className="info-item">{selectedGroup.location}</span>
                </div>

                {/* Tabs */}
                <div className="tabs-container">
                  <div className="tabs-header">
                    <button 
                      className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
                      onClick={() => setActiveTab("overview")}
                    >
                      Overview
                    </button>
                    <button 
                      className={`tab-button ${activeTab === "members" ? "active" : ""}`}
                      onClick={() => setActiveTab("members")}
                    >
                      Members
                    </button>
                    <button 
                      className={`tab-button ${activeTab === "announcements" ? "active" : ""}`}
                      onClick={() => setActiveTab("announcements")}
                    >
                      Announcements
                    </button>
                    <button 
                      className={`tab-button ${activeTab === "attendance" ? "active" : ""}`}
                      onClick={() => setActiveTab("attendance")}
                    >
                      My Attendance
                    </button>
                    <button 
                      className={`tab-button ${activeTab === "diet" ? "active" : ""}`}
                      onClick={() => setActiveTab("diet")}
                    >
                      Diet Plan
                    </button>
                    <button 
                      className={`tab-button ${activeTab === "training" ? "active" : ""}`}
                      onClick={() => setActiveTab("training")}
                    >
                      Training
                    </button>
                    <button 
                      className={`tab-button ${activeTab === "chat" ? "active" : ""}`}
                      onClick={() => setActiveTab("chat")}
                    >
                      Group Chat
                    </button>
                  </div>

                  <div className="tab-content">
                    {/* Overview Tab */}
                    {activeTab === "overview" && (
                      <div className="tab-panel active">
                        <div className="overview-section">
                          <div className="overview-grid">
                            <div className="overview-card">
                              <h3>Group Performance</h3>
                              <div className="performance-score">
                                <span className="score">{selectedGroup.avgPerformance}%</span>
                                <p>Average Group Performance</p>
                              </div>
                            </div>
                            
                            <div className="overview-card">
                              <h3>My Attendance</h3>
                              <div className="attendance-score">
                                {(() => {
                                  const attendance = getCurrentUserAttendance();
                                  const rate = attendance.total > 0 
                                    ? Math.round((attendance.present / attendance.total) * 100) 
                                    : 0;
                                  return (
                                    <>
                                      <span className="score">{rate}%</span>
                                      <p>Present: {attendance.present}/{attendance.total}</p>
                                    </>
                                  );
                                })()}
                              </div>
                            </div>
                            
                            <div className="overview-card">
                              <h3>Next Session</h3>
                              <div className="next-session">
                                <p className="session-time">{selectedGroup.schedule}</p>
                                <p className="session-location">{selectedGroup.location}</p>
                              </div>
                            </div>
                            
                            <div className="overview-card">
                              <h3>Latest Announcement</h3>
                              <div className="latest-announcement">
                                {selectedGroup.announcements.length > 0 ? (
                                  <>
                                    <p>{selectedGroup.announcements[0].text}</p>
                                    <span className="announcement-date">{selectedGroup.announcements[0].date}</span>
                                  </>
                                ) : (
                                  <p>No announcements yet</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Members Tab */}
                    {activeTab === "members" && (
                      <div className="tab-panel active">
                        <div className="members-section">
                          <h3>Group Members ({selectedGroup.members.length})</h3>
                          <div className="members-list">
                            {selectedGroup.members.map((member) => (
                              <div key={member.id} className="member-card">
                                <img src={member.avatar} alt={member.name} className="avatar" />
                                <div className="member-info">
                                  <h4>{member.name}</h4>
                                  <p>{member.email}</p>
                                  <span className="join-date">Joined: {member.joined}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Announcements Tab */}
                    {activeTab === "announcements" && (
                      <div className="tab-panel active">
                        <div className="announcement-list">
                          {selectedGroup.announcements.length === 0 ? (
                            <p className="no-announcements">No announcements yet</p>
                          ) : (
                            selectedGroup.announcements.map((a) => (
                              <div key={a.id} className="announcement-item">
                                <div className="announcement-content">
                                  <p>{a.text}</p>
                                  <span className="announcement-date">{a.date}</span>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}

                    {/* Attendance Tab */}
                    {activeTab === "attendance" && (
                      <div className="tab-panel active">
                        <div className="attendance-section">
                          <div className="my-attendance-summary">
                            <h3>My Attendance Record</h3>
                            {(() => {
                              const attendance = getCurrentUserAttendance();
                              const rate = attendance.total > 0 
                                ? Math.round((attendance.present / attendance.total) * 100) 
                                : 0;
                              
                              return (
                                <div className="attendance-stats">
                                  <div className="stat-item">
                                    <span className="stat-value">{attendance.present}</span>
                                    <span className="stat-label">Present</span>
                                  </div>
                                  <div className="stat-item">
                                    <span className="stat-value">{attendance.absent}</span>
                                    <span className="stat-label">Absent</span>
                                  </div>
                                  <div className="stat-item">
                                    <span className="stat-value">{attendance.late}</span>
                                    <span className="stat-label">Late</span>
                                  </div>
                                  <div className="stat-item">
                                    <span className="stat-value">{attendance.total}</span>
                                    <span className="stat-label">Total Sessions</span>
                                  </div>
                                  <div className="stat-item">
                                    <span className="stat-value">{rate}%</span>
                                    <span className="stat-label">Attendance Rate</span>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>

                          <div className="attendance-history">
                            <h3>Attendance History</h3>
                            {selectedGroup.attendance?.length === 0 ? (
                              <p className="no-attendance">No attendance records yet</p>
                            ) : (
                              <div className="attendance-sessions">
                                {selectedGroup.attendance?.map((session, sessionIndex) => {
                                  const currentUserRecord = session.records.find(record => record.memberId === 1);
                                  const status = currentUserRecord?.status || "absent";
                                  
                                  return (
                                    <div key={sessionIndex} className="attendance-session">
                                      <div className="session-info">
                                        <h4>{session.session}</h4>
                                        <span className="session-date">{session.date}</span>
                                      </div>
                                      <div className={`attendance-status ${status}`}>
                                        <span className="status-text">
                                          {status === "present" ? "Present" : 
                                           status === "absent" ? "Absent" : "Late"}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Diet Plan Tab */}
                    {activeTab === "diet" && (
                      <div className="tab-panel active">
                        <div className="readonly-content">
                          <h3>Recommended Diet Plan</h3>
                          <div className="diet-plan-content">
                            {selectedGroup.dietPlan.split('\n').map((line, index) => (
                              <p key={index}>{line}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Training Tab */}
                    {activeTab === "training" && (
                      <div className="tab-panel active">
                        <div className="readonly-content">
                          <h3>Training Schedule</h3>
                          <div className="training-schedule-content">
                            {selectedGroup.trainingSchedule.split('\n').map((line, index) => (
                              <p key={index}>{line}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Enhanced Chat Tab */}
                    {activeTab === "chat" && (
                      <div className="tab-panel active">
                        <div className="chat-section">
                          {/* Online Members Indicator */}
                          <div className="chat-online-indicator">
                            <div className="online-dot"></div>
                            <span>{selectedGroup.members.length} members online</span>
                          </div>
                          
                          {/* Chat Messages */}
                          <div className="chat-box" ref={chatBoxRef}>
                            {chatMessages.length === 0 ? (
                              <div className="no-messages">
                                <div className="no-messages-icon">💬</div>
                                <p>No messages yet</p>
                                <span>Start the conversation!</span>
                              </div>
                            ) : (
                              chatMessages.map((msg) => (
                                <div key={msg.id} className={`chat-message ${msg.isCoach ? 'coach' : msg.sender === 'You' ? 'you' : 'teammate'}`}>
                                  <div className="message-avatar">
                                    <img 
                                      src={msg.sender === 'You' 
                                        ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop"
                                        : msg.isCoach 
                                        ? "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop"
                                        : selectedGroup.members.find(m => m.name === msg.sender)?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                                      } 
                                      alt={msg.sender}
                                    />
                                    {msg.isCoach && <span className="coach-badge">Coach</span>}
                                  </div>
                                  <div className="message-content-wrapper">
                                    <div className="message-header">
                                      <strong>{msg.sender}</strong>
                                      <span className="message-time">{msg.time}</span>
                                    </div>
                                    <div className="message-content">
                                      <p>{msg.message}</p>
                                    </div>
                                    {msg.sender === 'You' && (
                                      <div className="message-status">
                                        <span className="delivered">✓ Delivered</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                          
                          {/* Enhanced Chat Input */}
                          <div className="chat-input">
                            <div className="input-wrapper">
                              <input 
                                type="text" 
                                placeholder="Type a message to the group..." 
                                value={chatMessage}
                                onChange={(e) => setChatMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                maxLength={500}
                              />
                              <div className="input-actions">
                                <span className="char-count">{chatMessage.length}/500</span>
                                <button 
                                  onClick={handleSendMessage}
                                  disabled={!chatMessage.trim()}
                                  className="send-button"
                                >
                                  <span>Send</span>
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div className="quick-actions">
                              <button className="quick-action-btn" onClick={() => setChatMessage("I'll be there! 🎾")}>
                                I'll be there!
                              </button>
                              <button className="quick-action-btn" onClick={() => setChatMessage("Running late ⏰")}>
                                Running late
                              </button>
                              <button className="quick-action-btn" onClick={() => setChatMessage("Great session! 👍")}>
                                Great session!
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}