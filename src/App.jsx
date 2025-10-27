import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/approutes";
import Footer from "./components/common/Footer";
import CoachAuth from './pages/coach/auth/CoachAuth';
import DocumentVerification from './pages/coach/auth/DocumentVerification';

function App() {
  return (
    
    <BrowserRouter>
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
