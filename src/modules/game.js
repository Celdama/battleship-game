import player from './player';

const game = (() => {
  const makePlayersGrid = ({ playerType }) => {
    player.initPlayers();
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
    makePlayersGrid,
    allowHumanToShotComputerShip,

  };
})();

export default game;
