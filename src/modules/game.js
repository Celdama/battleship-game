import player from './player';

const game = (() => {
  let gameOver = false;

  const makePlayersGrid = ({ playerType }) => {
    const { initPlayers, renderHumanGameboardFilled, renderComputerGameboardFilled } = player;
    initPlayers(); // initialize players, create 5 ships by players, and place it on gameboard

    let gameboardForMakeGrid = null;
    let parentGrid = null;

    if (playerType === 'human') {
      gameboardForMakeGrid = renderHumanGameboardFilled();
      parentGrid = document.querySelector('.grody-human');
    } else {
      gameboardForMakeGrid = renderComputerGameboardFilled();
      parentGrid = document.querySelector('.grody-computer');
    }

    const dimensions = 10;
    const grid = new Array(dimensions);

    for (let i = 0; i < grid.length; i += 1) {
      grid[i] = new Array(dimensions);
      const row = document.createElement('tr');
      for (let j = 0; j < grid[i].length; j += 1) {
        const box = document.createElement('td');
        box.textContent = playerType === 'human' ? gameboardForMakeGrid[i][j] : '';
        box.setAttribute('id', `${i}${j}`);
        box.dataset.coordY = i;
        box.dataset.coordX = j;
        row.appendChild(box);
      }

      parentGrid.appendChild(row);
    }
  };

  const toggleClickableComputerBox = () => {
    const computerBox = document.querySelectorAll('.grody-computer td');
    computerBox.forEach((box) => {
      box.classList.toggle('disable');
    });
  };

  const checkIfGameIsOver = (isAllShipsSunk) => {
    if (isAllShipsSunk) {
      alert('game finished');
      gameOver = true;
    }
  };

  const sleep = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

  const asyncComputerTurn = async () => {
    const { computerTurn, checkIfAllHumanShipAreSunk } = player;

    await sleep(800);
    if (!gameOver) {
      const coordComputerShot = computerTurn();
      console.log(`look at this, this is a computer shot at coord ${coordComputerShot}`);

      const boxShottedByComputer = document.getElementById(`${coordComputerShot}`);
      if (boxShottedByComputer.textContent) {
        boxShottedByComputer.style.color = 'red';
      } else {
        boxShottedByComputer.classList.add('missed-shot');
      }

      checkIfGameIsOver(checkIfAllHumanShipAreSunk());
      toggleClickableComputerBox();
    }
  };

  const gameLoop = () => {
    makePlayersGrid({ playerType: 'human' });
    makePlayersGrid({ playerType: 'computer' });

    const computerBox = document.querySelectorAll('.grody-computer td');
    const { humanTurn, checkIfAllComputerShipAreSunk } = player;

    computerBox.forEach((box) => {
      box.addEventListener('click', (event) => {
        humanTurn({ event, boxReceiveShot: box });
        toggleClickableComputerBox();
        checkIfGameIsOver(checkIfAllComputerShipAreSunk());
        asyncComputerTurn();
      });
    });
  };

  return {
    gameLoop,
  };
})();

export default game;
