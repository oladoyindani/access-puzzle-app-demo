// client/src/components/HowToPlay.jsx
import React from 'react';

const HowToPlay = () => {
  return (
    <div className="how-to-play">
      <h2>How to Play</h2>
      <video width="600" controls>
        <source src="/path/to/how-to-play-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HowToPlay;
