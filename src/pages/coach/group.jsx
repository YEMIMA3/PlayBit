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

  const handleCreateGroup = () => {
    const group = {
      id: groups.length + 1,
      ...newGroup,
      members: [],
      announcements: [],
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
              <span className="info-item">{selectedGroup.schedule}</span>
              <span className="info-item">{selectedGroup.location}</span>
              <button 
                className="add-members-btn"
                onClick={() => setShowAddMembersModal(true)}
              >
                + Add Members
              </button>
            </div>

            {/* Tabs */}
            <div className="tabs">
              <input type="radio" name="tab" id="members" defaultChecked />
              <label htmlFor="members">Members</label>
              <input type="radio" name="tab" id="announcements" />
              <label htmlFor="announcements">Announcements</label>
              <input type="radio" name="tab" id="diet" />
              <label htmlFor="diet">Diet Plan</label>
              <input type="radio" name="tab" id="training" />
              <label htmlFor="training">Training</label>
              <input type="radio" name="tab" id="chat" />
              <label htmlFor="chat">Chat</label>

              {/* Members Tab */}
              <div className="tab-content" id="members-content">
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

              {/* Announcements Tab */}
              <div className="tab-content" id="announcements-content">
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

              {/* Diet Plan Tab */}
              <div className="tab-content" id="diet-content">
                <textarea 
                  rows={6} 
                  value={dietPlan}
                  onChange={(e) => setDietPlan(e.target.value)}
                  placeholder="Enter diet plan details..."
                ></textarea>
                <button onClick={() => alert('Diet plan saved!')}>Save Diet Plan</button>
              </div>

              {/* Training Tab */}
              <div className="tab-content" id="training-content">
                <textarea 
                  rows={6} 
                  value={trainingSchedule}
                  onChange={(e) => setTrainingSchedule(e.target.value)}
                  placeholder="Enter training schedule..."
                ></textarea>
                <button onClick={() => alert('Training schedule saved!')}>Save Training Schedule</button>
              </div>

              {/* Chat Tab */}
              <div className="tab-content" id="chat-content">
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
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}