// client/src/components/GameScreen.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Timer from './Timer';
import Crossword from './Crossword';
import './GameScreen.css';

const GameScreen = () => {
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  // Toggle pause/resume
  const handlePauseToggle = () => {
    setIsPaused((prev) => !prev);
  };

  // Quit the game with a confirmation prompt
  const handleQuit = () => {
    const confirmQuit = window.confirm(
      "Are you sure you want to quit the game?"
    );
    if (confirmQuit) {
      // Optionally, perform any cleanup before quitting
      navigate('/player/dashboard');
    }
  };

  return (
    <div className="game-screen">
      <div className="game-controls">
        <button onClick={handlePauseToggle}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button onClick={handleQuit}>Quit</button>
      </div>

      {!isPaused ? (
        <div className="game-content">
          <Timer isPaused={isPaused} />
          <Crossword />
        </div>
      ) : (
        <div className="pause-screen">
          <h2>Game Paused</h2>
          <p>The game is paused. Press "Resume" to continue.</p>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
