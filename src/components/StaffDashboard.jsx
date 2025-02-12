// client/src/components/StaffDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './StaffDashboard.css';

const StaffDashboard = ({ authData }) => {
  const staffName = authData?.user?.name || 'Staff Member';

  return (
    <div className="staff-dashboard">
      <h1>Staff Dashboard</h1>
      <p>Welcome, {staffName}!</p>
      <nav>
        <ul>
          <li>
            <Link to="/admin/puzzle-editor">Puzzle Editor</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/how-to-play">How To Play</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default StaffDashboard;
