// client/src/components/PuzzleEditor.jsx
import React, { useState } from 'react';
import axios from 'axios';

const PuzzleEditor = ({ existingPuzzle, onPuzzleSaved }) => {
  const [grid, setGrid] = useState(existingPuzzle ? JSON.stringify(existingPuzzle.grid, null, 2) : '');
  const [clues, setClues] = useState(existingPuzzle ? JSON.stringify(existingPuzzle.clues, null, 2) : '');
  const [active, setActive] = useState(existingPuzzle ? existingPuzzle.active : false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let gridData, cluesData;
    try {
      gridData = JSON.parse(grid);
      cluesData = JSON.parse(clues);
    } catch (parseErr) {
      setError("Invalid JSON in grid or clues.");
      return;
    }
    try {
      let response;
      if (existingPuzzle) {
        response = await axios.put(`http://localhost:5000/api/puzzle/${existingPuzzle._id}`, {
          grid: gridData,
          clues: cluesData,
          active,
        });
      } else {
        response = await axios.post('http://localhost:5000/api/puzzle', {
          grid: gridData,
          clues: cluesData,
          active,
        });
      }
      onPuzzleSaved(response.data);
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.msg || "Error saving puzzle");
    }
  };

  return (
    <div>
      <h2>{existingPuzzle ? "Edit Puzzle" : "Create Puzzle"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Grid (JSON):</label>
          <textarea value={grid} onChange={(e) => setGrid(e.target.value)} rows="10" cols="50" />
        </div>
        <div>
          <label>Clues (JSON):</label>
          <textarea value={clues} onChange={(e) => setClues(e.target.value)} rows="10" cols="50" />
        </div>
        <div>
          <label>
            Active: 
            <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
          </label>
        </div>
        <button type="submit">Save Puzzle</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default PuzzleEditor;