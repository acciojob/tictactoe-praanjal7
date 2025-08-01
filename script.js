const submitBtn = document.getElementById("submit");
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const gameSection = document.getElementById("game-section");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let currentPlayer = "X";
let player1 = "";
let player2 = "";
let gameActive = true;

submitBtn.onclick = function () {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (player1 && player2) {
    document.getElementById("input-section").style.display = "none";
    gameSection.style.display = "block";
    message.textContent = `${player1}, you're up`;
  } else {
    alert("Please enter names for both players.");
  }
};

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (!gameActive || cell.textContent !== "") return;

    cell.textContent = currentPlayer;

    if (checkWinner()) {
      const winner = currentPlayer === "X" ? player1 : player2;
      message.textContent = `${winner}, congratulations you won!`;
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    const currentName = currentPlayer === "X" ? player1 : player2;
    message.textContent = `${currentName}, you're up`;
  });
});

function checkWinner() {
  const winPatterns = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
    [1, 5, 9], [3, 5, 7]             // Diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern.map(id => document.getElementById(id).textContent);
    return a && a === b && b === c;
  });
}
