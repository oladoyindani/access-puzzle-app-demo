// client/src/components/Crossword.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Crossword.css';

const Crossword = () => {
  const [puzzle, setPuzzle] = useState(null);
  const [grid, setGrid] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/puzzle');
        if (res.data) {
          setPuzzle(res.data);
          setGrid(res.data.grid || []);
        } else {
          setError('No puzzle data found.');
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching puzzle');
      }
    };
    fetchPuzzle();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!puzzle) {
    return <div>Loading puzzle...</div>;
  }

  return (
    <div className="crossword-container">
      <div className="crossword-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="crossword-row">
            {row.map((cell, colIndex) =>
              cell.isActive ? (
                <input
                  key={colIndex}
                  className="crossword-cell"
                  value={cell.userInput || ''}
                  onChange={(e) => {/* handle input changes */}}
                  maxLength={1}
                />
              ) : (
                <div key={colIndex} className="crossword-cell blocked" />
              )
            )}
          </div>
        ))}
      </div>
      <div className="clues-section">
        <h3>Clues</h3>
        <ul>
          {puzzle.clues.map((clue, index) => (
            <li key={index}>
              <strong>{clue.number}</strong>: {clue.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Crossword;