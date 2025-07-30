let currentPlayer = 'X';
let players = {};
let gameActive = true;

const cells = Array.from(document.getElementsByClassName('cell'));
const messageDiv = document.getElementById('message');

document.getElementById('submit').addEventListener('click', () => {
  const p1 = document.getElementById('player-1').value.trim();
  const p2 = document.getElementById('player-2').value.trim();

  if (!p1 || !p2) {
    alert('Please enter names for both players.');
    return;
  }

  players = { X: p1, O: p2 };

  document.getElementById('input-section').style.display = 'none';
  document.getElementById('game-section').style.display = 'block';
  messageDiv.textContent = `${players[currentPlayer]}, you're up`;
});

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (!gameActive || cell.textContent !== '') return;

    cell.textContent = currentPlayer;

    if (checkWin()) {
      messageDiv.textContent = `${players[currentPlayer]}, congratulations you won!`;
      gameActive = false;
      return;
    }

    if (isDraw()) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageDiv.textContent = `${players[currentPlayer]}, you're up`;
  });
});

function checkWin() {
  const winCombos = [
    [1,2,3], [4,5,6], [7,8,9],
    [1,4,7], [2,5,8], [3,6,9],
    [1,5,9], [3,5,7]
  ];

  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return (
      document.getElementById(a.toString()).textContent === currentPlayer &&
      document.getElementById(b.toString()).textContent === currentPlayer &&
      document.getElementById(c.toString()).textContent === currentPlayer
    );
  });
}

function isDraw() {
  return cells.every(cell => cell.textContent !== '');
}
