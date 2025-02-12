// client/src/components/PlayerDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './PlayerDashboard.css'; // Optional styling

const PlayerDashboard = ({ authData }) => {
  const playerName =
    authData && authData.user && authData.user.name
      ? authData.user.name
      : 'Player';

  return (
    <div className="player-dashboard">
      <h1>Player Dashboard</h1>
      <p>Welcome, {playerName}!</p>
      <nav>
        <ul>
          <li>
            <Link to="/game">Play Game</Link>
          </li>
          <li>
            <Link to="/how-to-play">How To Play</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          {/* You can add more links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default PlayerDashboard;
