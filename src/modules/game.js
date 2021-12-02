import player from './player';

const game = (() => {
  const makePlayerGrid = () => {
    player.initPlayers();

    const gameboardForMakeGrid = player.renderHumanGameboardFilled();
    const parentGrid = document.querySelector('.grody-human');

    console.table(gameboardForMakeGrid);

    const dimensions = 10;
    const grid = new Array(dimensions);

    let i; let j; let row; let box;

    for (i = 0; i < grid.length; i++) {
      grid[i] = new Array(dimensions);
      // grid[i].fill('~');
      row = document.createElement('tr');
      for (j = 0; j < grid[i].length; j++) {
        box = document.createElement('td');
        box.innerText = gameboardForMakeGrid[i][j];
        box.setAttribute('id', `${i}${j}`);
        box.dataset.coordY = i;
        box.dataset.coordX = j;
        row.appendChild(box);
      }
      parentGrid.appendChild(row);
    }
  };

  const makeComputerGrid = () => {
    player.initPlayers();

    const gameboardForMakeGrid = player.renderComputerGameboardFilled();
    const parentGrid = document.querySelector('.grody-computer');

    console.table(gameboardForMakeGrid);

    const dimensions = 10;
    const grid = new Array(dimensions);

    let i; let j; let row; let box;

    for (i = 0; i < grid.length; i++) {
      grid[i] = new Array(dimensions);
      // grid[i].fill('~');
      row = document.createElement('tr');
      for (j = 0; j < grid[i].length; j++) {
        box = document.createElement('td');
        box.textContent = '';
        box.setAttribute('id', `${i}${j}`);
        box.dataset.coordY = i;
        box.dataset.coordX = j;
        row.appendChild(box);
      }
      parentGrid.appendChild(row);
    }
  };

  const allowPlayerToShotComputerShip = () => {
    const computerGameboard = player.renderComputerGameboardFilled();

    const tds = document.querySelectorAll('.grody-computer td');
    tds.forEach((td) => {
      td.addEventListener('click', (e) => {
        const { coordY } = e.target.dataset;
        const { coordX } = e.target.dataset;

        if (player.playerTurn({ coordY, coordX })) {
          td.textContent = computerGameboard[coordY][coordX];
          if (player.checkIfAllComputerShipAreSunk()) {
            alert('you won dude');
          }
        } else {
          td.classList.add('missed-shot');
        }
      });
    });
  };

  return {
    makePlayerGrid,
    makeComputerGrid,
    allowPlayerToShotComputerShip,
  };
})();

export default game;
