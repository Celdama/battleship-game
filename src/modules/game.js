import player from './player';

const game = (() => {
  const HUMAN_PROFIL = 'human';
  const AI_PROFIL = 'computer';
  let gameOver = false;
  const displayHittedMessage = document.querySelector('.hitted-message');

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
    const { computerTurn, checkIfAllPlayerShipAreSunk, getNameOfHittedShip } = player;

    await sleep(2000);
    if (!gameOver) {
      const coordComputerShot = computerTurn();

      const boxShottedByComputer = document.getElementById(`${coordComputerShot}`);
      console.log(`look at this, this is a computer shot at coord ${coordComputerShot}`);

      if (boxShottedByComputer.textContent) {
        const id = boxShottedByComputer.textContent;
        const hittedShipName = getNameOfHittedShip(id, HUMAN_PROFIL);
        displayHittedMessage.textContent = `Computer have hit your ${hittedShipName}`;
        boxShottedByComputer.style.color = 'red';
      } else {
        displayHittedMessage.textContent = 'The enemy fires a shot into your waters .... and misses.';
        const circle = document.createElement('div');
        circle.classList.add('missed-circle');
        boxShottedByComputer.appendChild(circle);
        // boxShottedByComputer.classList.add('missed-shot');
      }

      checkIfGameIsOver(checkIfAllPlayerShipAreSunk(HUMAN_PROFIL));
      toggleClickableComputerBox();
    }
  };

  const changeBgColorIfShipWasSunk = ({ shipIsSunk, shipId, shipName }) => {
    if (shipIsSunk) {
      const boxSunks = document.querySelectorAll(`.ship-${shipId}`);
      boxSunks.forEach((box) => {
        box.classList.add('ship-sunk');
      });
      displayHittedMessage.textContent = `Congrats your sunk ${shipName}`;
    }
  };

  const gameLoop = () => {
    makePlayersGrid({ playerType: 'human' });
    makePlayersGrid({ playerType: 'computer' });

    const computerBox = document.querySelectorAll('.grody-computer td');
    const {
      humanTurn, checkIfAllPlayerShipAreSunk, checkIfComputerShipIsSunk, getNameOfHittedShip,
    } = player;

    computerBox.forEach((box) => {
      box.addEventListener('click', (event) => {
        displayHittedMessage.textContent = '';
        const hitedShipId = humanTurn({ event, boxReceiveShot: box });
        if (hitedShipId) {
          const hittedShipName = getNameOfHittedShip(hitedShipId, AI_PROFIL);
          displayHittedMessage.textContent = `you have hit the ${hittedShipName}`;
          const shipShotedWasSunk = checkIfComputerShipIsSunk(hitedShipId);
          changeBgColorIfShipWasSunk({
            shipIsSunk: shipShotedWasSunk,
            shipId: hitedShipId,
            shipName: hittedShipName,
          });
        } else {
          displayHittedMessage.textContent = 'You fires a shot into enemy waters .... and misses.';
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
