import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

const ROWS = 9;
const COLS = 9;

const createEmptyGrid = () => {
  const grid = [];
  for (let i = 0; i < ROWS; i++) {
    const row = [];
    for (let j = 0; j < COLS; j++) {
      row.push({
        row: i,
        col: j,
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0,
      });
    }
    grid.push(row);
  }
  return grid;
};



function App() {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const newGrid = createEmptyGrid();
    setGrid(newGrid);
  }, []
  );



  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="cell"
            >
              
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
