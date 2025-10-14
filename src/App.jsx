import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./Home"

function App() {
  return (
    <div>
      <Header />
      {/* Other sections like Navbar, Hero, etc. */}
      <Home />
      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}

export default App;
