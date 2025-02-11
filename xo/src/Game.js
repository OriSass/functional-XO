import React, { useState } from 'react';
import Board from './Board';
import './index.css';

function Game(){
    const [history, setHistory] = useState([
        {squares: Array(9).fill(null)}
    ]);
    const [xIsNext, setXIsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);

    function handleClick(i){
        const updatedHistory = history.slice(0, stepNumber + 1);
        const current = updatedHistory[updatedHistory.length - 1];
        const updatedSquares = current.squares.slice();
        if(calculateWinner(updatedSquares) || updatedSquares[i]){
            return;
        }
        updatedSquares[i] = xIsNext ? 'X' : 'O';
        setHistory(updatedHistory.concat([{squares: updatedSquares}]));
        setXIsNext(!xIsNext);
        setStepNumber(updatedHistory.length);
    }
    function jumpTo(step){
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    } 
    function render() {
        const current = history[stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
            `Go to move #` + move :
            `Go to game start`;
            return (
                <li key={move}>
                    <button onClick={() =>
                    jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (xIsNext ? 'X' : 'O');
        }
        return (
          <div className="game">
            <div className="game-board">
              <Board
              squares={current.squares}
              onClick={(i) => handleClick(i)} />
            </div>
            <div className="game-info">
              <div>{status}</div>
              <ol>{moves}</ol>
            </div>
          </div>
        );
    }
    function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }
    return render();
}

export default Game;