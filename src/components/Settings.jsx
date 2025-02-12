// client/src/components/Settings.jsx
import React, { useState } from 'react';

const Settings = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [gridColor, setGridColor] = useState('#ffffff');
  const [soundSetting, setSoundSetting] = useState('default');

  const handleSave = () => {
    // Here you might update user profile settings or store locally.
    alert('Settings saved!');
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <div>
        <label>Background Image URL:</label>
        <input 
          type="text" 
          value={backgroundImage} 
          onChange={(e) => setBackgroundImage(e.target.value)} 
        />
      </div>
      <div>
        <label>Grid Color:</label>
        <input 
          type="color" 
          value={gridColor} 
          onChange={(e) => setGridColor(e.target.value)} 
        />
      </div>
      <div>
        <label>Sound Setting:</label>
        <select value={soundSetting} onChange={(e) => setSoundSetting(e.target.value)}>
          <option value="default">Default</option>
          <option value="custom">Custom</option>
        </select>
      </div>
      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
};

export default Settings;
