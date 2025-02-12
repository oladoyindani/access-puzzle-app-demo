// client/src/components/SoundPlayer.jsx
import React, { useEffect } from 'react';
import { Howl } from 'howler';

const SoundPlayer = ({ src, play }) => {
  useEffect(() => {
    if (play) {
      const sound = new Howl({
        src: [src],
      });
      sound.play();
    }
  }, [src, play]);

  return null;
};

export default SoundPlayer;
