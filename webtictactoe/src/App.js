import React, { useState } from "react";
import "./App.css";

// Define color theme
const COLORS = {
  primary: "#4CAF50",    // Green
  secondary: "#FFC107",  // Amber/Yellow
  accent: "#2196F3",     // Blue
  boardBg: "#fff",       // Light background for board
  x: "#4CAF50",
  o: "#2196F3",
  draw: "#FFC107"
};

// Utility function to calculate winner or draw
// PUBLIC_INTERFACE
function calculateWinner(squares) {
  /** Check if either player has won on this 3x3 board. Returns 'X', 'O', 'draw', or null. */
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diagonals
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
  if (squares.every(Boolean)) return "draw";
  return null;
}

// PUBLIC_INTERFACE
function App() {
  /** Main container for WebTicTacToe with responsive centered layout, game logic, and score display. */

  // --- State ---
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState(""); // "X wins", "O wins", "Draw", etc.
  const [score, setScore] = useState({ X: 0, O: 0, draws: 0 });

  // --- Derived state ---
  const winner = calculateWinner(board);

  // --- Effects: Update status and score when game ends ---
  React.useEffect(() => {
    if (winner) {
      if (winner === "draw") {
        setStatus("Draw!");
        setScore((s) => ({ ...s, draws: s.draws + 1 }));
      } else {
        setStatus(`Player ${winner} wins!`);
        setScore((s) => ({ ...s, [winner]: s[winner] + 1 }));
      }
    } else {
      setStatus(`Your turn: ${xIsNext ? "X" : "O"}`);
    }
    // eslint-disable-next-line
  }, [winner]);

  // --- Handlers ---
  function handleCellClick(idx) {
    if (board[idx] || winner) return;
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext((prev) => !prev);
  }

  function handleReset() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setStatus("");
  }

  // --- Rendering functions ---
  function renderCell(idx) {
    const value = board[idx];
    let cellColor = "";
    if (value === "X") cellColor = COLORS.x;
    if (value === "O") cellColor = COLORS.o;
    return (
      <button
        key={idx}
        className="ttt-cell"
        style={{
          color: cellColor,
          borderColor: COLORS.accent,
          background: COLORS.boardBg,
        }}
        aria-label={`Tic Tac Toe cell ${idx + 1}`}
        onClick={() => handleCellClick(idx)}
        disabled={Boolean(board[idx]) || Boolean(winner)}
      >
        {value}
      </button>
    );
  }

  // --- Main Layout ---
  return (
    <div className="app" style={{ minHeight: "100vh", background: "#f9f9f9" }}>
      {/* Navbar */}
      <nav
        className="navbar"
        style={{
          background: COLORS.primary,
          borderBottom: `3px solid ${COLORS.accent}`,
          color: "#fff"
        }}
      >
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
            <div className="logo" style={{ color: "#fff" }}>
              <span className="logo-symbol" style={{ color: COLORS.secondary, fontWeight: 700, marginRight: 8 }}>
                ●
              </span>
              WebTicTacToe
            </div>
            <span style={{ color: COLORS.accent, fontWeight: 500 }}>KAVIA AI</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main
        style={{
          minHeight: "calc(100vh - 80px)",
          paddingTop: 110,
          paddingBottom: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Game title */}
        <div
          className="subtitle"
          style={{
            color: COLORS.accent,
            fontWeight: 600,
            fontSize: "1.25rem",
            marginBottom: 8,
            letterSpacing: 1,
            textAlign: "center",
          }}
        >
          Let's play Tic Tac Toe!
        </div>
        <h1
          className="title"
          style={{
            color: COLORS.primary,
            fontSize: "2.8rem",
            lineHeight: 1.1,
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 18,
          }}
        >
          WebTicTacToe Game
        </h1>
        <div
          className="description"
          style={{
            fontSize: "1.1rem",
            color: "#555",
            margin: "0 auto 24px auto",
            textAlign: "center",
            maxWidth: 470,
          }}
        >
          Challenge a friend or yourself! First to 3 in a row wins. Scores are tracked.
        </div>
        
        {/* Scoreboard */}
        <div 
          className="ttt-scores"
          style={{
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 1px 6px 0 rgba(60,60,60,0.06)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 28,
            fontSize: "1.08rem",
            padding: "10px 32px",
            margin: "0 auto 22px auto",
            fontWeight: 500,
            color: "#222",
            border: `1.5px solid ${COLORS.accent}`,
            maxWidth: 340
          }}
        >
          <span style={{ color: COLORS.x }}>X: {score.X}</span>
          <span style={{ color: COLORS.o }}>O: {score.O}</span>
          <span style={{ color: COLORS.draw }}>Draws: {score.draws}</span>
        </div>

        {/* Game status and Board */}
        <div
          role="region"
          aria-label="Game Board Section"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            marginBottom: 24,
          }}
        >
          <div 
            className="ttt-status"
            style={{
              fontWeight: 600,
              fontSize: "1.1rem",
              color:
                winner === "X"
                  ? COLORS.x
                  : winner === "O"
                  ? COLORS.o
                  : winner === "draw"
                  ? COLORS.draw
                  : "#555",
              minHeight: 26,
              marginBottom: 8
            }}
          >
            {status}
          </div>

          {/* The game board */}
          <div
            className="ttt-board"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 70px)",
              gridTemplateRows: "repeat(3, 70px)",
              gap: 0,
              background: COLORS.boardBg,
              borderRadius: 12,
              overflow: "hidden",
              border: `2.5px solid ${COLORS.primary}`,
              boxShadow: "0 1px 12px 0 rgba(76,175,80,0.07)",
              margin: "0 auto",
              transition: "box-shadow 0.2s"
            }}
          >
            {Array(9)
              .fill(null)
              .map((_, idx) => renderCell(idx))}
          </div>
        </div>

        {/* Reset Button */}
        <button
          className="btn btn-large"
          style={{
            background: COLORS.secondary,
            color: "#fff",
            fontWeight: 600,
            margin: "0 auto",
            borderRadius: 6,
            border: "none",
            minWidth: 110,
            fontSize: "1.08rem",
            boxShadow: "0 1px 6px 0 rgba(60,60,60,0.05)"
          }}
          onClick={handleReset}
        >
          {winner ? "Play Again" : "Reset"}
        </button>
      </main>

      {/* Responsive Styles */}
      <style>
        {`
          @media (max-width: 560px) {
            .ttt-board { grid-template-columns: repeat(3, 48vw); grid-template-rows: repeat(3, 48vw); min-width: 100vw; }
            .ttt-cell { font-size: 2.1rem !important; padding: 0 !important; }
            .ttt-scores { max-width: 97vw; font-size: 0.99rem; padding: 6px 8px; }
          }
          .ttt-board {
            user-select: none;
            margin: 0 auto 8px auto;
            width: max-content;
          }
          .ttt-cell {
            width: 70px;
            height: 70px;
            font-size: 2.4rem;
            font-weight: 700;
            border: 1.7px solid #2196F3;
            outline: none;
            background: #fff;
            text-align: center;
            vertical-align: center;
            cursor: pointer;
            transition: background 0.16s, border-color 0.14s, color 0.16s;
            padding: 0;
          }
          .ttt-cell:disabled {
            background: #f1f1f1;
            color: #b6b6b6 !important;
            cursor: not-allowed;
          }
        `}
      </style>
    </div>
  );
}

export default App;