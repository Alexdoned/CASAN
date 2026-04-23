import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/pages/Navbar";
import Home from "./Components/pages/Home";
import Events from "./Components/pages/Events";
import Form from "./Components/pages/Form";
import Payment from "./Components/pages/Payment";
import Leaders from "./Components/pages/Leaders";
import Admin from "./Components/pages/Admin";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="px-4 py-8 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/register" element={<Form />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/leaders" element={<Leaders />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
