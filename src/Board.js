import React, { useState } from "react";
import cloneDeep from "lodash/cloneDeep"
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.05 }) {
  // creates initial board and sets Board state to it
  const initialBoard = createBoard(nrows, ncols);
  const [board, setBoard] = useState(initialBoard);

  /** create a board 'nrows' high and 'ncols' wide, with each cell randomly lit/unlit */
  function createBoard(nrows, ncols) {
    // create array-of-arrays of true/false values
    return Array.from({ length: nrows }, () => 
      Array.from({ length: ncols }, () => Math.random() < chanceLightStartsOn)
    );

  }

  function hasWon(board) {
    // check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make a (deep) copy of the oldBoard
      const boardCopy = cloneDeep(oldBoard);

      // in the copy, flip target cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      return boardCopy;
    });
  }

  // if board isn't rendered then display "Loading"
  if (!board || board.length === 0) {
    return (
      <div className="Board">
        <h1>Loading...</h1>
      </div>
    )
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon(board)) {
    return (
      <div className="Board">
        <h1 className="Board-win-message">Congratulations! You Won!</h1>
      </div>
    )
  }

  // make table board
  return (
    <div className="Board">
      <h1>Lights Out</h1>
      <table className="Board-main">
        <tbody>
          {board.map((row, y) => (
            <tr key={y}>
              {row.map((cell, x) => (
                <Cell 
                  key={`${y}-${x}`}
                  isLit={cell}
                  flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Board;
