import player from './player';

const game = (() => {
  let gameOver = false;
  const isHumanTurn = true;

  const makePlayersGrid = ({ playerType }) => {
    // eslint-disable-next-line max-len
    player.initPlayers(); // initialize players, create 5 ships by players, and place it on gameboard
    const { renderHumanGameboardFilled, renderComputerGameboardFilled } = player;

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

  const allowHumanToShotComputerShip = () => {
    const tds = document.querySelectorAll('.grody-computer td');
    tds.forEach((td) => {
      td.addEventListener('click', (e) => {
        const result = player.humanTurn({ event: e, boxReceiveShot: td });
        console.log(result);
      });
    });
  };

  const toggleClickableComputerBox = () => {
    const tds = document.querySelectorAll('.grody-computer td');
    tds.forEach((td) => {
      td.classList.toggle('disable');
    });
  };

  const checkIfGameIsOver = (isAllShipsSunk) => {
    // const allShipAreSunk = player.checkIfAllComputerShipAreSunk();
    if (isAllShipsSunk) {
      alert('game finished');
      gameOver = true;
    }
  };

  const gameLoop = () => {
    const tds = document.querySelectorAll('.grody-computer td');
    const {
      humanTurn, computerTurn,
      checkIfAllComputerShipAreSunk, checkIfAllHumanShipAreSunk,
    } = player;

    tds.forEach((td) => {
      td.addEventListener('click', (e) => {
        humanTurn({ event: e, boxReceiveShot: td });
        toggleClickableComputerBox();
        checkIfGameIsOver(checkIfAllComputerShipAreSunk());
        setTimeout(() => {
          if (!gameOver) {
            const resultComputerShot = computerTurn();

            const boxShottedByComputer = document.getElementById(`${resultComputerShot}`);

            if (boxShottedByComputer.textContent) {
              boxShottedByComputer.style.color = 'red';
            } else {
              boxShottedByComputer.classList.add('missed-shot');
            }
            toggleClickableComputerBox();
            // and send here the player board

            checkIfGameIsOver(checkIfAllHumanShipAreSunk());
          }
        }, 400);
      });
    });
  };

  return {
    makePlayersGrid,
    allowHumanToShotComputerShip,
    gameLoop,
  };
})();

export default game;
