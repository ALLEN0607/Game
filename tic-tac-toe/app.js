/**
 * Tic Tac Toe Game
 * Originally developed by Ania Kubow - https://github.com/kubowania/tic-tac-toe
 *
 * This project is licensed under the MIT License - see the LICENSE file for details
 */

document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div');
  const playerDisplay = document.querySelector('#player');
  let currentPlayer = 'playerX';

  squares.forEach(square => {
      square.addEventListener('click', clickOutcome);
  });

  function clickOutcome(e) {
    const squareArray = Array.from(squares);
    const index = squareArray.indexOf(e.target);
    playerDisplay.innerHTML = currentPlayer;

    if (!squares[index].classList.contains('playerX') && !squares[index].classList.contains('playerO')) {
        squares[index].textContent = currentPlayer === 'playerX' ? 'X' : 'O';
        if (currentPlayer === 'playerX') {
            squares[index].classList.add('playerX');
            currentPlayer = 'playerO';
        } else {
            squares[index].classList.add('playerO');
            currentPlayer = 'playerX';
        }
          if (checkForWin()) {
              alert(`Game over! ${currentPlayer === 'playerO' ? 'Player X' : 'Player O'} wins!`);
              squares.forEach(square => square.removeEventListener('click', clickOutcome));
          } else if (Array.from(squares).every(square => square.classList.contains('playerX') || square.classList.contains('playerO'))) {
              alert("It's a draw!");
              squares.forEach(square => square.removeEventListener('click', clickOutcome));
          }
      }
  }

  function checkForWin() {
      const winCombinations = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8],
          [0, 3, 6], [1, 4, 7], [2, 5, 8],
          [0, 4, 8], [2, 4, 6]
      ];

      return winCombinations.some(combination => {
          return combination.every(index => {
              return squares[index].classList.contains(currentPlayer);
          });
      });
  }
});
