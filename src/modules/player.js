import gameboardFactory from '../factory/gameboard';

const player = (() => {
  const humanPlayer = gameboardFactory();
  const computerPlayer = gameboardFactory();

  const createShips = ({ profil }) => {
    const { createShip } = profil === 'human' ? humanPlayer : computerPlayer;

    const ship1 = createShip({ shipId: 1, length: 5 });
    const ship2 = createShip({ shipId: 2, length: 4 });
    const ship3 = createShip({ shipId: 3, length: 3 });
    const ship4 = createShip({ shipId: 4, length: 3 });
    const ship5 = createShip({ shipId: 5, length: 1 });
    const ship6 = createShip({ shipId: 6, length: 2 });

    return [ship1, ship2, ship3, ship4, ship5, ship6];
  };

  const getRandomShipCoord = (shipLength, vertical) => {
    let coordY = Math.floor(Math.random() * 10);
    let coordX = Math.floor(Math.random() * 10);

    const excesHorizontal = coordX + shipLength;
    const excesVertical = coordY + shipLength;

    if (vertical) {
      if (coordY + shipLength > 10) {
        coordY -= (excesVertical - 10);
      }
    }

    if (!vertical) {
      if (coordX + shipLength > 10) {
        coordX -= (excesHorizontal - 10);
      }
    }

    return `${coordY}-${coordX}`;
  };

  const setShipPlace = ({ profil, ship }) => {
    const { placeShipInGameboard } = profil === 'human' ? humanPlayer : computerPlayer;

    const shipLength = ship.getLength();
    const randomVertical = Math.round(Math.random());

    const randomCoord = getRandomShipCoord(shipLength, !!randomVertical);

    const coord = randomCoord.split('-');
    const coordY = Number(coord[0]);
    const coordX = Number(coord[1]);

    const resultPlacement = placeShipInGameboard({
      coordY, coordX, ship, vertical: !!randomVertical,
    });

    return resultPlacement;
  };

  const placeShips = ({ profil, ships }) => {
    const shipNotPlaced = [];

    ships.forEach((ship) => {
      const isShipPlaced = setShipPlace({ profil, ship });

      if (!isShipPlaced) {
        shipNotPlaced.push(ship);
      }
    });

    while (shipNotPlaced.length !== 0) {
      shipNotPlaced.forEach((ship) => {
        const result = setShipPlace({ profil, ship });
        const id = ship.shipId;
        if (result) {
          const index = shipNotPlaced.findIndex((item) => item.shipId === id);

          shipNotPlaced.splice(index, 1);
        }
      });
    }
  };

  const renderHumanGameboardFilled = () => humanPlayer.renderGameboard();

  const renderComputerGameboardFilled = () => computerPlayer.renderGameboard();

  const makeRandomChoiceForComputerShot = () => {
    const coordY = Math.floor(Math.random() * 10);
    const coordX = Math.floor(Math.random() * 10);

    return `${coordY}-${coordX}`;
  };

  const humanAttack = ({ coordY, coordX }) => {
    const { receiveAttack } = computerPlayer;
    const resultOfShot = receiveAttack({ coordY, coordX });

    return !resultOfShot.includes('missed');
  };

  const computerAttack = ({ coordY, coordX }) => {
    const { receiveAttack } = humanPlayer;
    const resultOfShot = receiveAttack({ coordY, coordX });

    return !resultOfShot.includes('missed');
  };

  const humanTurn = ({ event, boxReceiveShot }) => {
    const computerGameboard = renderComputerGameboardFilled();
    const { coordY, coordX } = event.target.dataset;
    const box = boxReceiveShot;

    if (humanAttack({ coordY, coordX })) {
      box.textContent = computerGameboard[coordY][coordX];
      box.classList.add('disable-click');

      return box.textContent;
    }
    box.classList.add('missed-shot');
    box.classList.add('disable-click');

    // return 'shot missed';
    return false;
  };

  const computerTurn = () => {
    const { renderListOfOpponentMissedShot, renderListOfOpponentHittedShot } = humanPlayer;
    const missedShot = renderListOfOpponentMissedShot();
    const hittedShot = renderListOfOpponentHittedShot();

    let shot = makeRandomChoiceForComputerShot();

    while (missedShot.includes(shot) || hittedShot.includes(shot)) {
      shot = makeRandomChoiceForComputerShot();
    }

    const coord = shot.split('-');
    const [coordY, coordX] = coord;

    computerAttack({ coordY, coordX });
    return `${coordY}${coordX}`;
  };

  const checkIfAllComputerShipAreSunk = () => computerPlayer.allShipAreSunk();
  const checkIfAllHumanShipAreSunk = () => humanPlayer.allShipAreSunk();

  const checkIfComputerShipArrSunk = (shipId) => {
    const { renderListOfShipInGameboard } = computerPlayer;
    const allComputerShip = renderListOfShipInGameboard();
    const id = Number(shipId);
    const hitedShip = allComputerShip.find((ship) => ship.shipId === id);

    return hitedShip.isSunk();
  };

  const initPlayer = (profil) => {
    placeShips({ profil, ships: createShips({ profil }) });
  };

  const initComputer = (profil) => {
    placeShips({ profil, ships: createShips({ profil }) });
    console.table(computerPlayer.renderGameboard());
  };

  return {
    initPlayer,
    initComputer,
    renderHumanGameboardFilled,
    renderComputerGameboardFilled,
    checkIfComputerShipArrSunk,
    computerTurn,
    humanTurn,
    checkIfAllComputerShipAreSunk,
    checkIfAllHumanShipAreSunk,
  };
})();

export default player;
