let currentPlayer = 'x';
let players = {};
let gameActive = true;

document.getElementById('submit').addEventListener('click', () => {
  const p1 = document.getElementById('player1').value.trim();
  const p2 = document.getElementById('player2').value.trim();

  if (!p1 || !p2) {
    alert('Please enter both player names!');
    return;
  }

  players = { x: p1, o: p2 };
  document.getElementById('input-section').style.display = 'none';
  document.getElementById('game-section').style.display = 'block';

  document.querySelector('.message').textContent = `${players[currentPlayer]}, you're up`;
});

const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (!gameActive || cell.textContent !== '') return;

    cell.textContent = currentPlayer;

    if (checkWinner()) {
      document.querySelector('.message').textContent = `${players[currentPlayer]}, congratulations you won!`;
      gameActive = false;
      return;
    }

    if (isDraw()) {
      document.querySelector('.message').textContent = `It's a draw!`;
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    document.querySelector('.message').textContent = `${players[currentPlayer]}, you're up`;
  });
});

function checkWinner() {
  const winPatterns = [
    [1,2,3], [4,5,6], [7,8,9],
    [1,4,7], [2,5,8], [3,6,9],
    [1,5,9], [3,5,7]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      document.getElementById(String(a)).textContent === currentPlayer &&
      document.getElementById(String(b)).textContent === currentPlayer &&
      document.getElementById(String(c)).textContent === currentPlayer
    );
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}
