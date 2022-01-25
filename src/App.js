import "./App.css";
import { useState } from "react";

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);
  const [showStatus, setShowStatus] = useState(false);

  function selectSquare(square) {
    if (winner || squares[square]) {
      return;
    }

    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;
    setSquares(squaresCopy);
  }

  function restart() {
    document.getElementsByClassName("popup-box")[0].style.display = "none";
    setSquares(Array(9).fill(null));
    window.location.reload();
  }

  function renderSquare(i) {
    return (
      <button
        className="square bg-transparent border-2 border-solid border-slate-600 float-left text-6xl font-medium leading-9 p-0 text-center w-20 h-20 :focus-outline-none :focus-bg-violet-200"
        onClick={() => selectSquare(i)}
      >
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div className="status mb-2.5 relative"> {status}</div>
      <div className="bg-teal-500 px-16 py-10 h-72">
        <div className="board-row after:clear-both after:content-none after:table">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row after:clear-both after:content-none after:table">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row after:clear-both after:content-none after:table">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="mx-16">
        <button
          className="restart pt-6 pl-14 text-teal-500 text-center font-bold"
          onClick={restart}
        >
          RESTART GAME
        </button>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game font-serif text-sm m-5 h-64 pt-60">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? (
    <div className="text-slate-700">X</div>
  ) : (
    <div className="text-white">0</div>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner ? (
    <div className="popup-box">
      <div className="box text-center">
        <div className="text-8xl text-gray-800 font-bold">{winner}</div>
        <div className="text-6xl text-gray-800">Winner!</div>
      </div>
    </div>
  ) : squares.every(Boolean) ? (
    <div className="popup-box">
      <div className="box text-center">
        <div className="text-8xl">
          <span className="text-slate-700">X</span>
          <span className="text-white">O</span>
        </div>
        <div className="text-4xl text-slate-700 font-bold">DRAW!</div>
      </div>
    </div>
  ) : (
    <div className="flex flex-row justify-center text-center play-changes">
      <span className="text-slate-700 font-bold pr-1"> {nextValue} </span> Turn
    </div>
  );
}
function isClosedBox() {}
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

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
