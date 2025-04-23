let board = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;

function startGame() {
  board.fill(null);
  currentPlayer = "X";
  gameOver = false;
  renderBoard();
  updateTurn();
}

function renderBoard() {
  const boardDiv = document.getElementById("board");
  boardDiv.innerHTML = "";
  board.forEach((val, idx) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    if (val) {
      cell.textContent = val;
      cell.classList.add(val);
    }
    cell.addEventListener("click", () => makeMove(idx));
    boardDiv.appendChild(cell);
  });
}

function makeMove(i) {
  if (board[i] || gameOver) return;
  board[i] = currentPlayer;
  renderBoard();
  const winner = checkWinner();
  if (winner) {
    document.getElementById("turn").textContent = `🎉 Player ${currentPlayer} wins!`;
    highlightWinner(winner);
    gameOver = true;
  } else if (!board.includes(null)) {
    document.getElementById("turn").textContent = "🤝 It's a draw!";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateTurn();
  }
}

function updateTurn() {
  const turn = document.getElementById("turn");
  turn.textContent = currentPlayer === "X"
    ? "❌ Player X's turn"
    : "⭕ Player O's turn";
  turn.style.color = currentPlayer === "X" ? "#ff4c60" : "#4cdfff";
  turn.style.textShadow = `0 0 8px ${currentPlayer === "X" ? "#ff4c60" : "#4cdfff"}`;
}

function checkWinner() {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (let [a,b,c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return [a,b,c];
    }
  }
  return null;
}

function highlightWinner(indices) {
  const cells = document.querySelectorAll(".cell");
  indices.forEach(i => cells[i].classList.add("winning"));
}

startGame();
