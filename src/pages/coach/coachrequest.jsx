import React, { useState } from "react";
import { MapPin, Calendar, CheckCircle2, XCircle, Filter } from "lucide-react";
import "../../styles/coach/requests.scss";
import CoachNav from './coachnav';

export default function CoachRequests() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Alex Martinez",
      sport: "Tennis",
      location: "Los Angeles, CA",
      date: "2025-10-20",
      level: "Intermediate",
      message: "Looking to improve my serve and backhand technique",
      status: "pending",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Emily Chen",
      sport: "Badminton",
      location: "Santa Monica, CA",
      date: "2025-10-21",
      level: "Beginner",
      message: "New to badminton, seeking fundamentals training",
      status: "pending",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    },
    {
      id: 3,
      name: "Marcus Thompson",
      sport: "Tennis",
      location: "Pasadena, CA",
      date: "2025-10-22",
      level: "Advanced",
      message: "Preparing for upcoming regional tournament",
      status: "pending",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    },
  ]);

  const [filterSport, setFilterSport] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const handleAccept = (id) => {
    setRequests(
      requests.map((r) =>
        r.id === id ? { ...r, status: "accepted" } : r
      )
    );
  };

  const handleReject = (id) => {
    setRequests(
      requests.map((r) =>
        r.id === id ? { ...r, status: "rejected" } : r
      )
    );
  };

  const filtered = requests
    .filter((r) => filterSport === "all" || r.sport === filterSport)
    .filter((r) => filterStatus === "all" || r.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      if (sortBy === "sport") return a.sport.localeCompare(b.sport);
      return 0;
    });

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const acceptedCount = requests.filter((r) => r.status === "accepted").length;

  return (
    <div>
    <CoachNav />
    <div className="requests-page">
      <div className="header">
        <h1>Student Requests</h1>
        <p>Review and manage athlete coaching requests</p>
      </div>

      {/* Stats */}
      <div className="stats">
        <div className="card amber">
          <p>Pending</p>
          <h2>{pendingCount}</h2>
        </div>
        <div className="card green">
          <p>Accepted</p>
          <h2>{acceptedCount}</h2>
        </div>
        <div className="card grey">
          <p>Total</p>
          <h2>{requests.length}</h2>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-section">
        <div className="filter-title">
          <Filter size={16} />
          <span>Filters</span>
        </div>
        <div className="filters">
          <select
            value={filterSport}
            onChange={(e) => setFilterSport(e.target.value)}
          >
            <option value="all">All Sports</option>
            <option value="Tennis">Tennis</option>
            <option value="Badminton">Badminton</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Date</option>
            <option value="sport">Sport</option>
          </select>
        </div>
      </div>

      {/* Request Cards */}
      <div className="request-list">
        {filtered.map((r) => (
          <div
            key={r.id}
            className={`request-card ${r.status}`}
          >
            <img src={r.image} alt={r.name} className="avatar" />
            <div className="info">
              <div className="top">
                <h3>{r.name}</h3>
                <div className="badges">
                  <span className="badge sport">{r.sport}</span>
                  <span className="badge level">{r.level}</span>
                  {r.status === "accepted" && (
                    <span className="badge accepted">Accepted</span>
                  )}
                  {r.status === "rejected" && (
                    <span className="badge rejected">Rejected</span>
                  )}
                </div>
              </div>

              <p className="message">{r.message}</p>

              <div className="meta">
                <span>
                  <MapPin size={14} /> {r.location}
                </span>
                <span>
                  <Calendar size={14} />{" "}
                  {new Date(r.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              {r.status === "pending" && (
                <div className="actions">
                  <button className="accept" onClick={() => handleAccept(r.id)}>
                    <CheckCircle2 size={16} /> Accept
                  </button>
                  <button className="reject" onClick={() => handleReject(r.id)}>
                    <XCircle size={16} /> Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="no-results">
            No requests found matching your filters.
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
