import React from "react";
import { Routes, Route } from "react-router-dom";

// 🏠 Pages
import Home from "../pages/Home";

// 🔐 Admin Auth Only
import AdminAuth from '../authentication/admin/auth.jsx';
import AdminDashboard from "../pages/admin/dashboard"; 

// 🧑‍🏫 Coach Pages
import CoachDashboard from "../pages/coach/coachdashboard"; 
import CoachProfile from "../pages/coach/coachprofile";
import CoachRequests from "../pages/coach/coachrequest";
import CoachGroups from "../pages/coach/group";
import PerformanceTracking from "../pages/coach/tracking";
import CoachTournaments from "../pages/coach/tournaments";
import SchedulePage from "../pages/coach/schedule";
import Stadium from "../pages/coach/stadium";

//Athlete Authentication
import AthleteAuth from "../authentication/athlete/auth";

// 🎓 Student Pages
import AthleteProfile from "../pages/athlete/athleteprofile";
import AthleteAnnouncements from "../pages/athlete/athleteannounc";
import AthleteDashboard from "../pages/athlete/athletedashboard"; 
import FindCoaches from "../pages/athlete/findcoaches"
import Stadiums from "../pages/athlete/stadium";
import Tournaments from "../pages/athlete/tournaments";
import AthleteGroups from "../pages/athlete/group";
import ProgressTracker from "../pages/athlete/progress";
// Coach Authentication
import CoachAuth from "../authentication/coach/auth";
import DocumentVerification from "../authentication/coach/verification";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* 🔐 Admin Authentication */}
      <Route path="/admin/auth" element={<AdminAuth />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* Coach Authentication */}
      <Route path="/coach/auth" element={<CoachAuth />} />
      <Route path="/coach/verification" element={<DocumentVerification />} />

      {/* Coach Routes */}
      <Route path="/coach/dashboard" element={<CoachDashboard />} />
      <Route path="/coach/requests" element={<CoachRequests />} />
      <Route path="/coach/tournaments" element={<CoachTournaments />} />
      <Route path="/coach/profile" element={<CoachProfile />} />
      <Route path="/coach/groups" element={<CoachGroups />} />
      <Route path="/coach/progress" element={<PerformanceTracking />} />
      <Route path="/coach/schedule" element={<SchedulePage />} />
      <Route path="/coach/stadium" element={<Stadium />} />

      {/* Athlete Routes */}
      <Route path="/athlete/auth" element={<AthleteAuth />} />
      <Route path="/athlete/profile" element={<AthleteProfile />} />
      <Route path="/athlete/dashboard" element={<AthleteDashboard />} />
      <Route path="/athlete/progress" element={<ProgressTracker />} />
      <Route path="/athlete/stadiums" element={<Stadiums />} />
      <Route path="/athlete/tournaments" element={<Tournaments />} />
      <Route path="/athlete/announcements" element={<AthleteAnnouncements />} />
      <Route path="/athlete/findcoaches" element={<FindCoaches />} />
      <Route path="/athlete/groups" element={<AthleteGroups />} />
    </Routes>
  );
}