document.addEventListener('DOMContentLoaded', function() {
            const inputSection = document.getElementById('input-section');
            const gameSection = document.getElementById('game-section');
            const messageDiv = document.getElementById('message');
            const board = document.getElementById('board');
            const submitBtn = document.getElementById('submit');
            
            let player1 = '';
            let player2 = '';
            let currentPlayer = 'X';
            let gameActive = true;
            let gameState = ['', '', '', '', '', '', '', '', ''];
            
            const winningConditions = [
                [0, 1, 2], // top row
                [3, 4, 5], // middle row
                [6, 7, 8], // bottom row
                [0, 3, 6], // left column
                [1, 4, 7], // middle column
                [2, 5, 8], // right column
                [0, 4, 8], // diagonal top-left to bottom-right
                [2, 4, 6]  // diagonal top-right to bottom-left
            ];
            
            submitBtn.addEventListener('click', startGame);
            
            function startGame() {
                player1 = document.getElementById('player-1').value || 'Player 1';
                player2 = document.getElementById('player-2').value || 'Player 2';
                
                inputSection.classList.add('hidden');
                gameSection.classList.remove('hidden');
                
                updateMessage();
                
                // Add event listeners to each cell
                document.querySelectorAll('.cell').forEach(cell => {
                    cell.addEventListener('click', cellClicked);
                });
            }
            
            function cellClicked(e) {
                const clickedCell = e.target;
                const clickedCellIndex = parseInt(clickedCell.id) - 1;
                
                // If cell is already filled or game is not active, ignore the click
                if (gameState[clickedCellIndex] !== '' || !gameActive) {
                    return;
                }
                
                // Update game state and UI
                gameState[clickedCellIndex] = currentPlayer;
                clickedCell.textContent = currentPlayer;
                
                // Check for win or draw
                checkResult();
            }
            
            function checkResult() {
                let roundWon = false;
                
                // Check all winning conditions
                for (let i = 0; i < winningConditions.length; i++) {
                    const [a, b, c] = winningConditions[i];
                    
                    if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
                        continue;
                    }
                    
                    if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                        roundWon = true;
                        break;
                    }
                }
                
                if (roundWon) {
                    const winner = currentPlayer === 'X' ? player1 : player2;
                    messageDiv.textContent = `${winner}, congratulations you won!`;
                    gameActive = false;
                    return;
                }
                
                // Check for draw
                if (!gameState.includes('')) {
                    messageDiv.textContent = "Game ended in a draw!";
                    gameActive = false;
                    return;
                }
                
                // Switch player
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateMessage();
            }
            
            function updateMessage() {
                const currentPlayerName = currentPlayer === 'X' ? player1 : player2;
                messageDiv.textContent = `${currentPlayerName}, you're up!`;
            }
        });
    </script>