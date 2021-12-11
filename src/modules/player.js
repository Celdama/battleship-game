import gameboardFactory from '../factory/gameboard';

const player = (() => {
  const HUMAN_PROFIL = 'human';
  const AI_PROFIL = 'computer';
  const humanPlayer = gameboardFactory();
  const computerPlayer = gameboardFactory();

  const createShips = ({ profil }) => {
    const { createShip } =
      profil === HUMAN_PROFIL ? humanPlayer : computerPlayer;

    const ship1 = createShip({ name: 'carrier', shipId: 1, length: 5 });
    const ship2 = createShip({ name: 'battleship', shipId: 2, length: 4 });
    const ship3 = createShip({ name: 'destroyer', shipId: 3, length: 3 });
    const ship4 = createShip({ name: 'submarine', shipId: 4, length: 3 });
    const ship5 = createShip({ name: 'rescued boat', shipId: 5, length: 1 });
    const ship6 = createShip({ name: 'patrol boat', shipId: 6, length: 2 });

    return [ship1, ship2, ship3, ship4, ship5, ship6];
  };

  const getRandomShipCoord = (shipLength, vertical) => {
    let coordY = Math.floor(Math.random() * 10);
    let coordX = Math.floor(Math.random() * 10);

    const excesHorizontal = coordX + shipLength;
    const excesVertical = coordY + shipLength;

    if (vertical) {
      if (coordY + shipLength > 10) {
        coordY -= excesVertical - 10;
      }
    }

    if (!vertical) {
      if (coordX + shipLength > 10) {
        coordX -= excesHorizontal - 10;
      }
    }

    return `${coordY}-${coordX}`;
  };

  const setShipPlace = ({ profil, ship }) => {
    const { placeShipInGameboard } =
      profil === HUMAN_PROFIL ? humanPlayer : computerPlayer;

    const shipLength = ship.getLength();
    const randomVertical = Math.round(Math.random());

    const randomCoord = getRandomShipCoord(shipLength, !!randomVertical);

    const coord = randomCoord.split('-');
    const coordY = Number(coord[0]);
    const coordX = Number(coord[1]);

    const resultPlacement = placeShipInGameboard({
      coordY,
      coordX,
      ship,
      vertical: !!randomVertical,
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

  const renderPlayersGameboardFilled = (profil) => {
    const { renderGameboard } =
      profil === HUMAN_PROFIL ? humanPlayer : computerPlayer;

    return renderGameboard();
  };

  const humanTurn = ({ event, boxReceiveShot }) => {
    const computerGameboard = renderPlayersGameboardFilled(AI_PROFIL);
    const { coordY, coordX } = event.target.dataset;
    const box = boxReceiveShot;
    const circle = document.createElement('div');

    if (humanAttack({ coordY, coordX })) {
      const boxTextContent = computerGameboard[coordY][coordX];
      circle.classList.add('target-circle');
      box.classList.add(`ship-${boxTextContent}`);
      box.appendChild(circle);
      box.classList.add('disable-click');

      return boxTextContent;
    }

    circle.classList.add('missed-circle');
    box.appendChild(circle);
    box.classList.add('disable-click');

    return false;
  };

  const getNameOfHittedShip = (id, profil) => {
    const { renderListOfShipInGameboard } =
      profil === HUMAN_PROFIL ? humanPlayer : computerPlayer;

    const listOfShips = renderListOfShipInGameboard();

    const hittedShip = listOfShips.find((ship) => ship.shipId === Number(id));

    return hittedShip.name;
  };

  const computerTurn = () => {
    const { renderListOfOpponentMissedShot, renderListOfOpponentHittedShot } =
      humanPlayer;
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

  const checkIfAllPlayerShipAreSunk = (profil) => {
    const { allShipAreSunk } =
      profil === HUMAN_PROFIL ? humanPlayer : computerPlayer;

    return allShipAreSunk();
  };

  const checkIfComputerShipIsSunk = (shipId) => {
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
    renderPlayersGameboardFilled,
    checkIfComputerShipIsSunk,
    computerTurn,
    humanTurn,
    checkIfAllPlayerShipAreSunk,
    getNameOfHittedShip,
  };
})();

export default player;
