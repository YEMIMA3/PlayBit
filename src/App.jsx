import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

const NotFound = () => (
  <div style={{ 
    textAlign: 'center', 
    padding: '100px 20px 50px',
    minHeight: 'calc(100vh - 200px)'
  }}>
    <h1 style={{ fontSize: '3rem', color: '#333' }}>404</h1>
    <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Page Not Found</p>
    <p style={{ color: '#666', marginBottom: '30px' }}>
      The page you're looking for doesn't exist.
    </p>
    <a 
      href="/" 
      style={{ 
        color: '#007bff', 
        textDecoration: 'none',
        padding: '10px 20px',
        border: '2px solid #007bff',
        borderRadius: '6px',
        display: 'inline-block'
      }}
    >
      Go back home
    </a>
  </div>
);

export default App;