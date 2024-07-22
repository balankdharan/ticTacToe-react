import { useState } from "react";
import "./board.css";
import circle from "../../assets/circle.png";
import cross from "../../assets/cross.png";
import toast from "react-hot-toast";
const Board = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);

  const calculateWinner = (squares) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const checkDraw = (squares) => {
    return squares.every((square) => square !== null);
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const currentWinner = calculateWinner(newBoard);
    if (currentWinner) {
      setWinner(currentWinner);
      toast("Hurray!", {
        icon: "🤩",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else if (checkDraw(newBoard)) {
      setDraw(true);
      toast("Draw", {
        icon: "🙅‍♀️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  const handleReset = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setWinner(null);
    setDraw(false);
  };

  const renderBox = (index) => {
    const value = board[index];
    return (
      <div className="boxes" onClick={() => handleClick(index)} key={index}>
        {value === "X" && (
          <img src={cross} alt="cross" style={{ width: "40px" }} />
        )}
        {value === "O" && (
          <img src={circle} alt="circle" style={{ width: "40px" }} />
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <h1 className="title">
        Tic Tac Toe <span>Game</span>
      </h1>
      {winner && (
        <div className="winner">
          <div>Congratulations 👏</div>
          <div>
            <span style={{ color: "white" }}>
              You Won :
              {winner === "X" ? (
                <img
                  src={cross}
                  alt="cross"
                  style={{ width: "10px", padding: "0px 10px" }}
                />
              ) : (
                <img
                  src={circle}
                  alt="circle"
                  style={{ width: "10px", padding: "0px 10px" }}
                />
              )}{" "}
            </span>{" "}
          </div>
        </div>
      )}
      {draw && !winner && (
        <div className="winner">
          <div>Game Over 🕹️</div>
          <div style={{ color: "white" }}>No one wins</div>
        </div>
      )}
      <div className="board">
        <div className="row1">
          {renderBox(0)}
          {renderBox(1)}
          {renderBox(2)}
        </div>
        <div className="row2">
          {renderBox(3)}
          {renderBox(4)}
          {renderBox(5)}
        </div>
        <div className="row3">
          {renderBox(6)}
          {renderBox(7)}
          {renderBox(8)}
        </div>
      </div>
      <button className="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default Board;
