import React from "react";
import { Routes, Route } from "react-router-dom";

// 🏠 Pages
import Home from "../pages/Home";

// 🧑‍🏫 Coach Pages
import CoachDashboard from "../pages/coach/coachdashboard"; 
import CoachProfile from "../pages/coach/coachprofile";
import CoachRequests from "../pages/coach/coachrequest";
import CoachGroups from "../pages/coach/group";
import PerformanceTracking from "../pages/coach/tracking";
import CoachTournaments from "../pages/coach/tournaments";

// 🔐 Coach Auth Pages
import CoachAuth from "../pages/coach/auth/CoachAuth";
import DocumentVerification from "../pages/coach/auth/DocumentVerification";

// 🎓 Athlete Pages & Layout
import AthleteLayout from "../components/athlete/AthleteLayout";
import AthleteProfile from "../pages/athlete/AthleteProfile";
import AthleteAnnouncements from "../pages/athlete/AthleteAnnouncements";

// 🔐 Admin Pages
import AdminAuth from '../pages/admin/auth/AdminAuth';
import AdminLayout from '../components/admin/AdminLayout';
import AdminTournaments from '../components/admin/AdminTournaments';
import AdminCoaches from '../components/admin/AdminCoaches';
import AdminStudents from '../components/admin/AdminStudents';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* 🔐 Coach Authentication */}
      <Route path="/coach/auth" element={<CoachAuth />} />
      <Route path="/coach/auth/verify" element={<DocumentVerification />} />

      {/* Coach Dashboard & Management */}
      <Route path="/coach/dashboard" element={<CoachDashboard />} />
      <Route path="/coach/requests" element={<CoachRequests />} />
      <Route path="/coach/tournaments" element={<CoachTournaments />} />
      <Route path="/coach/profile" element={<CoachProfile />} />
      <Route path="/coach/groups" element={<CoachGroups />} />
      <Route path="/coach/progress" element={<PerformanceTracking />} />

      {/* 🔐 Admin Routes */}
      <Route path="/admin/auth" element={<AdminAuth />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<div>Admin Dashboard - Coming Soon</div>} />
        <Route path="tournaments" element={<AdminTournaments />} />
        <Route path="coaches" element={<AdminCoaches />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="coach-verification" element={<div>Coach Verification - Coming Soon</div>} />
        <Route path="analytics" element={<div>Analytics - Coming Soon</div>} />
        <Route path="security" element={<div>Security - Coming Soon</div>} />
        {/* Default admin route */}
        <Route index element={<AdminTournaments />} />
      </Route>

      {/* 🎓 Athlete Routes with Layout */}
      <Route path="/athlete" element={<AthleteLayout />}>
        <Route index element={<AthleteProfile />} /> {/* Default route */}
        <Route path="profile" element={<AthleteProfile />} />
        <Route path="announcements" element={<AthleteAnnouncements />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}