import player from './player';

const game = (() => {
  const HUMAN_PROFIL = 'human';
  const AI_PROFIL = 'computer';
  let gameOver = false;

  const makePlayersGrid = ({ playerType }) => {
    const {
      initPlayer, initComputer, renderPlayersGameboardFilled,
    } = player;

    let gameboardForMakeGrid = null;
    let parentGrid = null;

    if (playerType === HUMAN_PROFIL) {
      initPlayer(playerType);
      gameboardForMakeGrid = renderPlayersGameboardFilled(playerType);
      parentGrid = document.querySelector('.grody-human');
    } else {
      initComputer(playerType);
      gameboardForMakeGrid = renderPlayersGameboardFilled(playerType);
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
    const { computerTurn, checkIfAllPlayerShipAreSunk } = player;

    await sleep(800);
    if (!gameOver) {
      const coordComputerShot = computerTurn();

      const boxShottedByComputer = document.getElementById(`${coordComputerShot}`);
      if (boxShottedByComputer.textContent) {
        boxShottedByComputer.style.color = 'red';
      } else {
        boxShottedByComputer.classList.add('missed-shot');
      }
      console.log(`look at this, this is a computer shot at coord ${coordComputerShot}`);

      checkIfGameIsOver(checkIfAllPlayerShipAreSunk(HUMAN_PROFIL));
      toggleClickableComputerBox();
    }
  };

  const changeBgColorIfShipWasSunk = ({ shipIsSunk, allBox, shipId }) => {
    const searchText = shipId;
    if (shipIsSunk) {
      allBox.forEach((box) => {
        const shipBox = box;
        if (box.textContent.includes(searchText)) {
          shipBox.style.backgroundColor = 'red';
        }
      });
    }
  };

  const gameLoop = () => {
    makePlayersGrid({ playerType: 'human' });
    makePlayersGrid({ playerType: 'computer' });

    const computerBox = document.querySelectorAll('.grody-computer td');
    const { humanTurn, checkIfAllPlayerShipAreSunk, checkIfComputerShipIsSunk } = player;

    computerBox.forEach((box) => {
      box.addEventListener('click', (event) => {
        const hitedShipId = humanTurn({ event, boxReceiveShot: box });
        if (hitedShipId) {
          const shipShotedWasSunk = checkIfComputerShipIsSunk(hitedShipId);
          changeBgColorIfShipWasSunk({
            shipIsSunk: shipShotedWasSunk, allBox: computerBox, shipId: hitedShipId,
          });
        }
        toggleClickableComputerBox();
        checkIfGameIsOver(checkIfAllPlayerShipAreSunk(AI_PROFIL));
        asyncComputerTurn();
      });
    });
  };

  return {
    gameLoop,
  };
})();

export default game;
