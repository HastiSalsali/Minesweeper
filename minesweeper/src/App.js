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
        isBomb: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0,
      });
    }
    grid.push(row);
  }
  return grid;
};

const placeMines = (grid) => {
  const numMines = ROWS * 2; 
  let row = 0;
  let col = 0;
  for (let i = 0; i < numMines; i++) {
    row = Math.floor(Math.random() * ROWS);
    col = Math.floor(Math.random() * COLS);
    if (grid[row][col].isBomb) {
      i--;
    } else {
      grid[row][col].isBomb = true;
    }
  }
  return grid;
}





function App() {
  function restartGame() {
    const newGrid = placeMines(createEmptyGrid());
    setGrid(newGrid);
  }
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    restartGame()
  }, []
  );



  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={
                cell.isRevealed
                  ? cell.isBomb
                    ? "cell bomb"
                    : "cell empty"
                  : "cell"
              }
              onClick={() => {
                if (!cell.isRevealed && !cell.isFlagged) {
                  const newGrid = [...grid];
                  newGrid[rowIndex][colIndex].isRevealed = true;
                  setGrid(newGrid);
                }
              }}
            >

            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
