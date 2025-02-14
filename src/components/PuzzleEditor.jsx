// client/src/components/PuzzleEditor.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './PuzzleEditor.css';

const DEFAULT_ROWS = 10;
const DEFAULT_COLS = 10;

const createEmptyGrid = (rows, cols) => {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push({ isActive: true, letter: '', number: null });
    }
    grid.push(row);
  }
  return grid;
};

const PuzzleEditor = ({ onSavePuzzle }) => {
  // Dimensions and grid state
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [cols, setCols] = useState(DEFAULT_COLS);
  const [grid, setGrid] = useState(createEmptyGrid(DEFAULT_ROWS, DEFAULT_COLS));
  const [clues, setClues] = useState({});
  const [selectedCell, setSelectedCell] = useState(null);
  const [error, setError] = useState(null);

  // Update grid dimensions
  const handleSetDimensions = () => {
    setGrid(createEmptyGrid(rows, cols));
    setSelectedCell(null);
  };

  // Toggle a cell's active state (block/unblock)
  const toggleCell = (r, c) => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => row.slice());
      newGrid[r][c].isActive = !newGrid[r][c].isActive;
      if (!newGrid[r][c].isActive) {
        newGrid[r][c].letter = '';
      }
      return newGrid;
    });
  };

  // Handle letter input in a cell
  const handleLetterChange = (r, c, value) => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => row.slice());
      newGrid[r][c].letter = value.toUpperCase().slice(0, 1);
      return newGrid;
    });
  };

  // When a cell is clicked, mark it as selected
  const handleCellClick = (r, c) => {
    setSelectedCell({ r, c });
  };

  // Generate clue numbers for the entire grid
  const generateNumbers = () => {
    let number = 1;
    const newGrid = grid.map((row, r) =>
      row.map((cell, c) => {
        if (!cell.isActive) {
          return { ...cell, number: null };
        }
        // A cell is numbered if its left or above cell is blocked or off-grid.
        const leftBlocked = c === 0 || !grid[r][c - 1].isActive;
        const aboveBlocked = r === 0 || !grid[r - 1][c].isActive;
        if (leftBlocked || aboveBlocked) {
          const cellNumber = number;
          number++;
          return { ...cell, number: cellNumber };
        } else {
          return { ...cell, number: null };
        }
      })
    );
    setGrid(newGrid);
  };

  // Compute contiguous letters for the across word of the selected cell
  const generateAcrossWord = () => {
    if (!selectedCell) return '';
    const { r, c } = selectedCell;
    if (!grid[r][c].isActive) return '';
    let start = c;
    while (start > 0 && grid[r][start - 1].isActive) {
      start--;
    }
    let word = '';
    let col = start;
    while (col < cols && grid[r][col].isActive) {
      word += grid[r][col].letter || '_';
      col++;
    }
    return word;
  };

  // Compute contiguous letters for the down word of the selected cell
  const generateDownWord = () => {
    if (!selectedCell) return '';
    const { r, c } = selectedCell;
    if (!grid[r][c].isActive) return '';
    let start = r;
    while (start > 0 && grid[start - 1][c].isActive) {
      start--;
    }
    let word = '';
    let row = start;
    while (row < rows && grid[row][c].isActive) {
      word += grid[row][c].letter || '_';
      row++;
    }
    return word;
  };

  // Update a specific clue
  const updateClue = (number, direction, text) => {
    setClues(prev => ({
      ...prev,
      [`${number}-${direction}`]: text
    }));
  };

  // Save the puzzle by sending grid and clues to the backend
  const handleSave = async () => {
    try {
      const payload = { grid, clues };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/puzzle`, // Use environment variable
        payload
      );
      onSavePuzzle(response.data);
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.msg || 'Error saving puzzle.');
    }
  };

  return (
    <div className="interactive-puzzle-editor">
      <h2>Interactive Puzzle Editor</h2>
      
      {/* Grid dimension controls */}
      <div className="dimension-controls">
        <label>
          Rows:
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            min="1"
          />
        </label>
        <label>
          Columns:
          <input
            type="number"
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            min="1"
          />
        </label>
        <button onClick={handleSetDimensions}>Set Grid Dimensions</button>
      </div>

      {/* Render the grid */}
      <div className="grid-container">
        {grid.map((row, r) => (
          <div key={r} className="grid-row">
            {row.map((cell, c) => (
              <div
                key={c}
                className={`grid-cell ${!cell.isActive ? 'blocked' : ''} ${selectedCell && selectedCell.r === r && selectedCell.c === c ? 'selected' : ''}`}
                onClick={() => handleCellClick(r, c)}
              >
                {cell.isActive ? (
                  <input
                    type="text"
                    value={cell.letter}
                    onChange={(e) => handleLetterChange(r, c, e.target.value)}
                    maxLength={1}
                  />
                ) : null}
                {cell.number && <span className="cell-number">{cell.number}</span>}
                <button
                  className="toggle-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCell(r, c);
                  }}
                >
                  {cell.isActive ? 'Block' : 'Unblock'}
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      <button onClick={generateNumbers} className="generate-button">
        Generate Clue Numbers
      </button>

      {/* Display word previews for the selected cell */}
      <div className="word-preview">
        <h3>Selected Cell Word Preview</h3>
        {selectedCell ? (
          <>
            <p>
              <strong>Across:</strong> {generateAcrossWord()}
            </p>
            <p>
              <strong>Down:</strong> {generateDownWord()}
            </p>
          </>
        ) : (
          <p>Click a cell to preview words.</p>
        )}
      </div>

      {/* Clue editor: Show input fields for each numbered cell */}
      <div className="clue-editor">
        <h3>Clue Editor</h3>
        {grid.map((row, r) =>
          row.map((cell, c) => {
            if (cell.number) {
              const num = cell.number;
              return (
                <div key={`clue-${r}-${c}`} className="clue-item">
                  <div>
                    <label>Across {num}:</label>
                    <input
                      type="text"
                      value={clues[`${num}-across`] || ''}
                      onChange={(e) => updateClue(num, 'across', e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Down {num}:</label>
                    <input
                      type="text"
                      value={clues[`${num}-down`] || ''}
                      onChange={(e) => updateClue(num, 'down', e.target.value)}
                    />
                  </div>
                </div>
              );
            }
            return null;
          })
        )}
      </div>

      <button onClick={handleSave} className="save-button">
        Save Puzzle
      </button>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default PuzzleEditor;
