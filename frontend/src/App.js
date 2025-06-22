import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Wellness from './pages/Wellness';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Features from './pages/Features';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Profile from './pages/Profile';
import DiagnosisHistory from './pages/DiagnosisHistory';
import Vitals from './pages/Vitals';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/features" element={<Features />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/diagnosis-history" element={<DiagnosisHistory />} />
          <Route path="/vitals" element={<Vitals />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
