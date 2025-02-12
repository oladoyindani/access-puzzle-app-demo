// client/src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import LoginPage from './components/LoginPage';
import StaffLoginPage from './components/StaffLoginPage';
import StaffDashboard from './components/StaffDashboard';
import PlayerDashboard from './components/PlayerDashboard';
import PuzzleEditor from './components/PuzzleEditor';
import GameScreen from './components/GameScreen'; // New component for the game
import Leaderboard from './components/Leaderboard';
import Settings from './components/Settings';
import HowToPlay from './components/HowToPlay';

const App = () => {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    if (authData && authData.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authData.token}`;
    }
  }, [authData]);

  if (!authData) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={setAuthData} />} />
        <Route path="/staff-login" element={<StaffLoginPage onLogin={setAuthData} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  if (authData.user.role === 'staff') {
    return (
      <div className="app-container">
        <Routes>
          <Route path="/admin/dashboard" element={<StaffDashboard authData={authData} />} />
          <Route path="/admin/puzzle-editor" element={<PuzzleEditor />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Routes>
        <Route path="/player/dashboard" element={<PlayerDashboard authData={authData} />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="*" element={<Navigate to="/player/dashboard" />} />
      </Routes>
    </div>
  );
};

export default App;
