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

function restartGame(setGrid) {
  const newGrid = placeMines(createEmptyGrid());
  //next line is used for debugging purposes:
  // to reveal the location of the bombs
  //newGrid.forEach(row => row.forEach(cell => { if (cell.isBomb) cell.isRevealed = true; }));
  setGrid(newGrid);
}

const placeMines = (grid) => {
  const numMines = ROWS; // adjust the number of mines as needed
  let row = 0;
  let col = 0;
  for (let i = 0; i < numMines; i++) {
    row = Math.floor(Math.random() * ROWS);
    col = Math.floor(Math.random() * COLS);
    if (grid[row][col].isBomb) {
      i--;
    } else {
      grid[row][col].isBomb = true;
      for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
          if (r >= 0 && r < ROWS && c >= 0 && c < COLS && !grid[r][c].isBomb) {
            grid[r][c].adjacentMines++;
          }
        }
      }
    }
  }
  return grid;
}

function setClassName(cell) {
  return (
    cell.isFlagged
      ? "cell flagged"
      : cell.isRevealed
        ? cell.isBomb
          ? "cell bomb"
          : "cell empty"
        : "cell");
}

function handleCellClick(cell, rowIndex, colIndex, grid, setGrid) {
  if (!cell.isRevealed && !cell.isFlagged) {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex].isRevealed = true;
    if (cell.isBomb) {
      newGrid.forEach(row => {
        row.forEach(c => {
          c.isRevealed = true;
        });
      });
      alert('Game Over!');
      setGrid(newGrid);
      return;
    }
    if (cell.adjacentMines == 0 && !cell.isBomb) {
      for (let r = rowIndex - 1; r <= rowIndex + 1; r++) {
        for (let c = colIndex - 1; c <= colIndex + 1; c++) {
          if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
            if (grid[r][c].adjacentMines) {
              newGrid[r][c].isRevealed = true;
            }
            else {
              handleCellClick(grid[r][c], r, c, newGrid, setGrid);
            }
          }
        }
      }
    }
    setGrid(newGrid);
    if (checkWin(newGrid)) {
      alert('You Win!');
    }
  }
}

function handleRightClick(e, cell, rowIndex, colIndex, grid, setGrid) {
  e.preventDefault();
  if (cell.isRevealed) return;

  const newGrid = [...grid];
  newGrid[rowIndex][colIndex].isFlagged = !newGrid[rowIndex][colIndex].isFlagged;
  setGrid(newGrid);
}

function checkWin(grid) {
  for (let row of grid) {
    for (let cell of row) {
      if (!cell.isRevealed && !cell.isBomb) {
        return false; // There are still unrevealed non-bomb cells
      }
    }
  }
  return true;
}

function App() {
  const [grid, setGrid] = useState([]);
  useEffect(() => {
    restartGame(setGrid)
  }, []
  );
  return (
  <div className="game-container">
    <h1>Minesweeper</h1>
    <button className="restart-button" onClick={() => restartGame(setGrid)}>
      Press to Restart
    </button>
    <div className="grid-container">
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={setClassName(cell)}
                onClick={() => handleCellClick(cell, rowIndex, colIndex, grid, setGrid)}
                onContextMenu={(e) => handleRightClick(e, cell, rowIndex, colIndex, grid, setGrid)}
              >
                {cell.isRevealed && !cell.isBomb && cell.adjacentMines > 0
                    ? cell.adjacentMines
                    : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default App;