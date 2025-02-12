// client/src/components/Timer.jsx
import React, { useState, useEffect } from 'react';

const Timer = ({ isPaused }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // If paused, do not set up an interval.
    if (isPaused) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Clear the interval when the component unmounts or isPaused changes.
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="timer">
      <h3>Time Elapsed: {seconds} seconds</h3>
    </div>
  );
};

export default Timer;
