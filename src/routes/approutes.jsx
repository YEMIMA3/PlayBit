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
import SchedulePage from "../pages/coach/schedule";
import Stadium from "../pages/coach/stadium";

// // 🎓 Student Pages
// import StudentDashboard from "../pages/student/Dashboard";
// import StudentProfile from "../pages/student/Profile";
// import EnrollRequests from "../pages/student/EnrollRequests";
// import StudentGroups from "../pages/student/Groups";
// import StudentProgress from "../pages/student/Progress";
// import StudentTournaments from "../pages/student/Tournaments";

import CoachAuth from "../authentication/coach/auth";
import DocumentVerification from "../authentication/coach/verification";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Auth */}
      <Route path="/coach/auth" element={<CoachAuth />} />
      <Route path="/coach/verification" element={<DocumentVerification />} />

      {/* Coach */}
      <Route path="/coach/dashboard" element={<CoachDashboard />} />
      <Route path="/coach/requests" element={<CoachRequests />} />
      <Route path="/coach/tournaments" element={<CoachTournaments />} />
      <Route path="/coach/profile" element={<CoachProfile />} />
      <Route path="/coach/groups" element={<CoachGroups />} />
      <Route path="/coach/progress" element={<PerformanceTracking />} />
      <Route path="/coach/schedule" element={<SchedulePage />} />
      <Route path="/coach/stadium" element={<Stadium />} />

      {/* Student */}
      {/* <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/profile" element={<StudentProfile />} />
      <Route path="/student/enroll-requests" element={<EnrollRequests />} />
      <Route path="/student/groups" element={<StudentGroups />} />
      <Route path="/student/progress" element={<StudentProgress />} />
      <Route path="/student/tournaments" element={<StudentTournaments />} /> */}
    </Routes>
  );
}
