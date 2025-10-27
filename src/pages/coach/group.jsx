import React, { useState } from "react";
import "../../styles/coach/groups.scss";
import CoachNav from './coachnav';

export default function CoachGroups() {
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

  const [availableAthletes] = useState([
    { id: 1, name: "James Wilson", email: "james@email.com", avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=60&h=60&fit=crop" },
    { id: 2, name: "Emma Davis", email: "emma@email.com", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop" },
    { id: 3, name: "Michael Brown", email: "michael@email.com", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop" },
    { id: 4, name: "Sarah Johnson", email: "sarah@email.com", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop" }
  ]);

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [selectedAthletes, setSelectedAthletes] = useState([]);
  const [newGroup, setNewGroup] = useState({
    name: "",
    sport: "Tennis",
    level: "Beginner",
    schedule: "",
    location: "",
  });

  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [dietPlan, setDietPlan] = useState("Breakfast: High protein smoothie, oatmeal\nLunch: Grilled chicken, brown rice, vegetables\nSnack: Fruits and nuts\nDinner: Fish, quinoa, salad");
  const [trainingSchedule, setTrainingSchedule] = useState("Monday: Serve practice (1hr), Match play (1hr)\nWednesday: Footwork drills (45min), Backhand practice (1hr)\nFriday: Fitness training (30min), Tournament prep (1.5hr)");
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "Alex Martinez", message: "Coach, what time is tomorrow's practice?", time: "10:30 AM", isCoach: false },
    { id: 2, sender: "You", message: "6:00 PM at Court A. Don't be late!", time: "10:32 AM", isCoach: true }
  ]);

  const [newAttendance, setNewAttendance] = useState({
    date: new Date().toISOString().split('T')[0],
    session: ""
  });

  const [activeTab, setActiveTab] = useState("members");
  const [editingGroupInfo, setEditingGroupInfo] = useState(false);
  const [editedGroupInfo, setEditedGroupInfo] = useState({
    schedule: "",
    location: ""
  });

  const handleCreateGroup = () => {
    if (!newGroup.name.trim()) {
      alert("Please enter a group name");
      return;
    }

    const group = {
      id: groups.length + 1,
      ...newGroup,
      members: [],
      announcements: [],
      attendance: [],
      avgPerformance: 0,
      image: "https://images.unsplash.com/photo-1761039807688-f5b154a8827a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    };
    setGroups([...groups, group]);
    setNewGroup({ name: "", sport: "Tennis", level: "Beginner", schedule: "", location: "" });
    setShowCreateModal(false);
    alert("Group created successfully!");
  };

  const handleAddMembers = () => {
    if (selectedAthletes.length === 0) return;
    
    const updatedGroups = groups.map(group => {
      if (group.id === selectedGroup.id) {
        const newMembers = selectedAthletes.map(athleteId => {
          const athlete = availableAthletes.find(a => a.id === athleteId);
          return {
            ...athlete,
            joined: new Date().toISOString().split('T')[0]
          };
        });
        
        return {
          ...group,
          members: [...group.members, ...newMembers]
        };
      }
      return group;
    });
    
    setGroups(updatedGroups);
    setSelectedAthletes([]);
    setShowAddMembersModal(false);
    alert(`${selectedAthletes.length} members added successfully!`);
  };

  const handleRemoveMember = (memberId) => {
    const updatedGroups = groups.map(group => {
      if (group.id === selectedGroup.id) {
        return {
          ...group,
          members: group.members.filter(member => member.id !== memberId)
        };
      }
      return group;
    });
    
    setGroups(updatedGroups);
    alert("Member removed successfully!");
  };

  const handlePostAnnouncement = () => {
    if (!newAnnouncement.trim()) return;
    
    const updatedGroups = groups.map(group => {
      if (group.id === selectedGroup.id) {
        const announcement = {
          id: group.announcements.length + 1,
          text: newAnnouncement,
          date: new Date().toISOString().split('T')[0]
        };
        return {
          ...group,
          announcements: [announcement, ...group.announcements]
        };
      }
      return group;
    });
    
    setGroups(updatedGroups);
    setNewAnnouncement("");
    alert("Announcement posted successfully!");
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = {
      id: chatMessages.length + 1,
      sender: "You",
      message: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCoach: true
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setChatMessage("");
  };

  const toggleAthleteSelection = (athleteId) => {
    setSelectedAthletes(prev => 
      prev.includes(athleteId) 
        ? prev.filter(id => id !== athleteId)
        : [...prev, athleteId]
    );
  };

  const isAthleteInGroup = (athleteId) => {
    return selectedGroup?.members.some(member => member.id === athleteId);
  };

  const handleTakeAttendance = () => {
    if (!newAttendance.session.trim()) {
      alert("Please enter a session name");
      return;
    }

    const attendanceRecord = {
      date: newAttendance.date,
      session: newAttendance.session,
      records: selectedGroup.members.map(member => ({
        memberId: member.id,
        status: "present"
      }))
    };

    const updatedGroups = groups.map(group => {
      if (group.id === selectedGroup.id) {
        return {
          ...group,
          attendance: [attendanceRecord, ...group.attendance]
        };
      }
      return group;
    });

    setGroups(updatedGroups);
    setNewAttendance({ date: new Date().toISOString().split('T')[0], session: "" });
    alert("Attendance session created! You can now mark attendance.");
  };

  const updateAttendanceStatus = (attendanceIndex, memberId, status) => {
    const updatedGroups = groups.map(group => {
      if (group.id === selectedGroup.id) {
        const updatedAttendance = [...group.attendance];
        const recordIndex = updatedAttendance[attendanceIndex].records.findIndex(
          record => record.memberId === memberId
        );
        
        if (recordIndex !== -1) {
          updatedAttendance[attendanceIndex].records[recordIndex].status = status;
        }
        
        return {
          ...group,
          attendance: updatedAttendance
        };
      }
      return group;
    });

    setGroups(updatedGroups);
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

  const handleSaveGroupInfo = () => {
    if (!editedGroupInfo.schedule.trim() || !editedGroupInfo.location.trim()) {
      alert("Please fill in both schedule and location");
      return;
    }

    const updatedGroups = groups.map(group => {
      if (group.id === selectedGroup.id) {
        return {
          ...group,
          schedule: editedGroupInfo.schedule,
          location: editedGroupInfo.location
        };
      }
      return group;
    });

    setGroups(updatedGroups);
    setEditingGroupInfo(false);
    setSelectedGroup(updatedGroups.find(g => g.id === selectedGroup.id));
    alert("Group information updated successfully!");
  };

  const startEditingGroupInfo = () => {
    setEditedGroupInfo({
      schedule: selectedGroup.schedule,
      location: selectedGroup.location
    });
    setEditingGroupInfo(true);
  };

  const cancelEditingGroupInfo = () => {
    setEditingGroupInfo(false);
    setEditedGroupInfo({
      schedule: "",
      location: ""
    });
  };

  return (
    <div>
      <CoachNav />
      <div className="groups-page">
        <div className="header">
          <div>
            <h1>Groups Management</h1>
            <p>Create and manage your training groups</p>
          </div>
          <button className="create-btn" onClick={() => setShowCreateModal(true)}>
            + Create Group
          </button>
        </div>

        {/* Create Group Modal */}
        {showCreateModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>Create New Group</h2>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Group Name"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                />
                <select
                  value={newGroup.sport}
                  onChange={(e) => setNewGroup({ ...newGroup, sport: e.target.value })}
                >
                  <option value="Tennis">Tennis</option>
                  <option value="Badminton">Badminton</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Soccer">Soccer</option>
                </select>
                <select
                  value={newGroup.level}
                  onChange={(e) => setNewGroup({ ...newGroup, level: e.target.value })}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Elite</option>
                </select>
                <input
                  type="text"
                  placeholder="Schedule"
                  value={newGroup.schedule}
                  onChange={(e) => setNewGroup({ ...newGroup, schedule: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newGroup.location}
                  onChange={(e) => setNewGroup({ ...newGroup, location: e.target.value })}
                />
              </div>
              <div className="modal-actions">
                <button className="save-btn" onClick={handleCreateGroup}>
                  Create Group
                </button>
                <button className="cancel-btn" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Members Modal */}
        {showAddMembersModal && (
          <div className="modal-backdrop">
            <div className="modal large">
              <h2>Add Members to {selectedGroup?.name}</h2>
              <button className="close-btn" onClick={() => setShowAddMembersModal(false)}>
                ×
              </button>
              
              <div className="members-selection">
                <h3>Available Athletes</h3>
                <div className="athletes-list">
                  {availableAthletes.map(athlete => (
                    <div 
                      key={athlete.id} 
                      className={`athlete-item ${selectedAthletes.includes(athlete.id) ? 'selected' : ''} ${isAthleteInGroup(athlete.id) ? 'in-group' : ''}`}
                      onClick={() => !isAthleteInGroup(athlete.id) && toggleAthleteSelection(athlete.id)}
                    >
                      <img src={athlete.avatar} alt={athlete.name} className="avatar" />
                      <div className="athlete-info">
                        <h4>{athlete.name}</h4>
                        <p>{athlete.email}</p>
                      </div>
                      {isAthleteInGroup(athlete.id) ? (
                        <span className="status-badge">Already in group</span>
                      ) : (
                        <input 
                          type="checkbox" 
                          checked={selectedAthletes.includes(athlete.id)}
                          onChange={() => toggleAthleteSelection(athlete.id)}
                          className="checkbox"
                        />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="modal-actions">
                  <button 
                    className="save-btn" 
                    onClick={handleAddMembers}
                    disabled={selectedAthletes.length === 0}
                  >
                    Add {selectedAthletes.length} Members
                  </button>
                  <button className="cancel-btn" onClick={() => setShowAddMembersModal(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                
                {editingGroupInfo ? (
                  <div className="edit-group-info">
                    <input
                      type="text"
                      placeholder="Schedule"
                      value={editedGroupInfo.schedule}
                      onChange={(e) => setEditedGroupInfo({...editedGroupInfo, schedule: e.target.value})}
                      className="edit-input"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={editedGroupInfo.location}
                      onChange={(e) => setEditedGroupInfo({...editedGroupInfo, location: e.target.value})}
                      className="edit-input"
                    />
                    <button className="save-small-btn" onClick={handleSaveGroupInfo}>
                      Save
                    </button>
                    <button className="cancel-small-btn" onClick={cancelEditingGroupInfo}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="info-item">{selectedGroup.schedule}</span>
                    <span className="info-item">{selectedGroup.location}</span>
                    <button 
                      className="edit-info-btn"
                      onClick={startEditingGroupInfo}
                    >
                      Edit Schedule/Location
                    </button>
                  </>
                )}
                
                <button 
                  className="add-members-btn"
                  onClick={() => setShowAddMembersModal(true)}
                >
                  + Add Members
                </button>
              </div>

              {/* Tabs */}
              <div className="tabs-container">
                <div className="tabs-header">
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
                    Attendance
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
                    Chat
                  </button>
                </div>

                <div className="tab-content">
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
                              <button 
                                className="remove-btn"
                                onClick={() => handleRemoveMember(member.id)}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                          {selectedGroup.members.length === 0 && (
                            <p className="no-members">No members yet. Add some members to get started.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Announcements Tab */}
                  {activeTab === "announcements" && (
                    <div className="tab-panel active">
                      <div className="announcement-editor">
                        <textarea 
                          placeholder="Type new announcement..." 
                          rows={3}
                          value={newAnnouncement}
                          onChange={(e) => setNewAnnouncement(e.target.value)}
                        ></textarea>
                        <button onClick={handlePostAnnouncement}>Post Announcement</button>
                      </div>
                      <div className="announcement-list">
                        {selectedGroup.announcements.length === 0 ? (
                          <p className="no-announcements">No announcements yet</p>
                        ) : (
                          selectedGroup.announcements.map((a) => (
                            <div key={a.id} className="announcement-item">
                              <p>{a.text}</p>
                              <span>{a.date}</span>
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
                        {/* Create New Attendance Session */}
                        <div className="new-attendance">
                          <h3>Take Attendance</h3>
                          <div className="attendance-form">
                            <input
                              type="date"
                              value={newAttendance.date}
                              onChange={(e) => setNewAttendance({ ...newAttendance, date: e.target.value })}
                            />
                            <input
                              type="text"
                              placeholder="Session name (e.g., Morning Practice)"
                              value={newAttendance.session}
                              onChange={(e) => setNewAttendance({ ...newAttendance, session: e.target.value })}
                            />
                            <button onClick={handleTakeAttendance}>Create Attendance Session</button>
                          </div>
                        </div>

                        {/* Attendance Records */}
                        <div className="attendance-records">
                          <h3>Attendance History</h3>
                          {selectedGroup.attendance?.length === 0 ? (
                            <p className="no-attendance">No attendance records yet</p>
                          ) : (
                            selectedGroup.attendance?.map((session, sessionIndex) => (
                              <div key={sessionIndex} className="attendance-session">
                                <div className="session-header">
                                  <h4>{session.session}</h4>
                                  <span className="session-date">{session.date}</span>
                                </div>
                                <div className="attendance-grid">
                                  {selectedGroup.members.map(member => {
                                    const record = session.records.find(r => r.memberId === member.id);
                                    const status = record?.status || "absent";
                                    
                                    return (
                                      <div key={member.id} className="attendance-member">
                                        <img src={member.avatar} alt={member.name} className="avatar" />
                                        <span className="member-name">{member.name}</span>
                                        <div className="attendance-buttons">
                                          <button
                                            className={`status-btn present ${status === "present" ? "active" : ""}`}
                                            onClick={() => updateAttendanceStatus(sessionIndex, member.id, "present")}
                                          >
                                            Present
                                          </button>
                                          <button
                                            className={`status-btn absent ${status === "absent" ? "active" : ""}`}
                                            onClick={() => updateAttendanceStatus(sessionIndex, member.id, "absent")}
                                          >
                                            Absent
                                          </button>
                                          <button
                                            className={`status-btn late ${status === "late" ? "active" : ""}`}
                                            onClick={() => updateAttendanceStatus(sessionIndex, member.id, "late")}
                                          >
                                            Late
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                        {/* Attendance Summary */}
                        <div className="attendance-summary">
                          <h3>Attendance Summary</h3>
                          <div className="summary-grid">
                            {selectedGroup.members.map(member => {
                              const summary = getMemberAttendanceSummary(member.id);
                              const attendanceRate = summary.total > 0 
                                ? Math.round((summary.present / summary.total) * 100) 
                                : 0;
                              
                              return (
                                <div key={member.id} className="member-summary">
                                  <img src={member.avatar} alt={member.name} className="avatar" />
                                  <div className="summary-info">
                                    <h4>{member.name}</h4>
                                    <div className="stats">
                                      <span>Present: {summary.present}</span>
                                      <span>Absent: {summary.absent}</span>
                                      <span>Late: {summary.late}</span>
                                      <span>Total: {summary.total}</span>
                                    </div>
                                    <div className="attendance-rate">
                                      <div className="rate-bar">
                                        <div 
                                          className="rate-fill" 
                                          style={{ width: `${attendanceRate}%` }}
                                        ></div>
                                      </div>
                                      <span>{attendanceRate}%</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Diet Plan Tab */}
                  {activeTab === "diet" && (
                    <div className="tab-panel active">
                      <textarea 
                        rows={6} 
                        value={dietPlan}
                        onChange={(e) => setDietPlan(e.target.value)}
                        placeholder="Enter diet plan details..."
                      ></textarea>
                      <button className="save-btn"onClick={() => alert('Diet plan saved!')}>Save Diet Plan</button>
                    </div>
                  )}

                  {/* Training Tab */}
                  {activeTab === "training" && (
                    <div className="tab-panel active">
                      <textarea 
                        rows={6} 
                        value={trainingSchedule}
                        onChange={(e) => setTrainingSchedule(e.target.value)}
                        placeholder="Enter training schedule..."
                      ></textarea>
                      <button className="save-btn" onClick={() => alert('Training schedule saved!')}>Save Training Schedule</button>
                    </div>
                  )}

                  {/* Chat Tab */}
                  {activeTab === "chat" && (
                    <div className="tab-panel active">
                      <div className="chat-box">
                        {chatMessages.map((msg) => (
                          <div key={msg.id} className={`chat-message ${msg.isCoach ? 'coach' : 'athlete'}`}>
                            <div className="message-content">
                              <p>{msg.message}</p>
                              <span className="message-time">{msg.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="chat-input">
                        <input 
                          type="text" 
                          placeholder="Type a message..." 
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button onClick={handleSendMessage}>Send</button>
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
  );
}