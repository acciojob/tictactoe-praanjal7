const submitBtn = document.getElementById("submit");
const board = document.getElementById("board");
const message = document.querySelector(".message");
const gameSection = document.getElementById("game-section");
const inputSection = document.getElementById("input-section");

let player1 = "";
let player2 = "";
let currentPlayer = "X";
let gameActive = true;

const winningCombos = [
  [1,2,3], [4,5,6], [7,8,9],
  [1,4,7], [2,5,8], [3,6,9],
  [1,5,9], [3,5,7]
];

submitBtn.onclick = () => {
  player1 = document.getElementById("player1").value.trim();
  player2 = document.getElementById("player2").value.trim();

  if (!player1 || !player2) {
    alert("Please enter both player names");
    return;
  }

  inputSection.style.display = "none";
  gameSection.style.display = "block";
  showMessage(`${player1}, you're up`);

  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
    cell.addEventListener("click", handleClick);
  });

  currentPlayer = "X";
  gameActive = true;
};

function handleClick(event) {
  const cell = event.target;

  if (!gameActive || cell.textContent !== "") return;

  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    const winner = currentPlayer === "X" ? player1 : player2;
    showMessage(`${winner}, you won!`);
    gameActive = false;
    return;
  }

  if (isDraw()) {
    showMessage("It's a draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  const nextPlayer = currentPlayer === "X" ? player1 : player2;
  showMessage(`${nextPlayer}, you're up`);
}

function checkWin(symbol) {
  return winningCombos.some(combo => {
    return combo.every(index => {
      const cell = document.getElementById(index.toString());
      return cell.textContent === symbol;
    });
  });
}

function isDraw() {
  return [...document.querySelectorAll(".cell")].every(cell => cell.textContent !== "");
}

function showMessage(text) {
  message.textContent = text;
}
