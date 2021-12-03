import player from './player';

const game = (() => {
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
    const { humanTurn } = player;
    const tds = document.querySelectorAll('.grody-computer td');
    tds.forEach((td) => {
      td.addEventListener('click', (e) => {
        humanTurn({ event: e, boxReceiveShot: td });
      });
    });
  };

  return {
    makePlayersGrid,
    allowHumanToShotComputerShip,

  };
})();

export default game;
