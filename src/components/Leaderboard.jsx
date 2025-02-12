// client/src/components/Leaderboard.jsx
import React, { useState, useEffect } from 'react';
//import axios from 'axios';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/leaderboard');
        setLeaders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {leaders.map((user, index) => (
          <li key={user._id}>
            {index + 1}. {user.name} - {user.score} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
