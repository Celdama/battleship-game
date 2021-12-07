import shipFactory from './ship';

const gameboardFactory = () => {
  const gameboard = [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ];

  const coordOfEachShipInGameboard = {};
  const listOfShipInGameboard = [];
  const listOfCoordAlreadyFill = [];
  const listOfOpponentMissedShot = [];
  const listOfOpponentHittedShot = [];

  const renderGameboard = () => gameboard;

  const renderListOfOpponentMissedShot = () => listOfOpponentMissedShot;

  const renderListOfOpponentHittedShot = () => listOfOpponentHittedShot;

  const renderListOfShipInGameboard = () => listOfShipInGameboard;

  const renderShipInGame = () => console.log(coordOfEachShipInGameboard);

  const isCoordEmpty = ({
    coordY, coordX, shipLength, isVertical,
  }) => {
    if (isVertical) {
      for (let i = 0; i < shipLength; i += 1) {
        if (listOfCoordAlreadyFill.includes(`${coordY + i}-${coordX}`)) {
          return false;
        }
      }
    } else {
      for (let i = 0; i < shipLength; i += 1) {
        if (listOfCoordAlreadyFill.includes(`${coordY}-${coordX + i}`)) {
          return false;
        }
      }
    }

    return true;
  };

  const placeShipInGameboard = ({
    coordY, coordX, ship, vertical = false,
  }) => {
    if (ship === undefined) {
      return 'ship not provided';
    }

    if (coordY === undefined || coordX === undefined) {
      return `one or more option to set ship ${ship.shipId} position not provided`;
    }

    const { shipId, getLength } = ship;

    const shipCoordInGameboard = [];
    const shipLength = getLength();

    if (isCoordEmpty({
      coordY, coordX, shipLength, vertical,
    })) {
      for (let i = 0; i < shipLength; i += 1) {
        if (!vertical) {
          gameboard[coordY][coordX + i] = `${shipId}`;
          shipCoordInGameboard.push(`${coordY}-${coordX + i}`);
          listOfCoordAlreadyFill.push(`${coordY}-${coordX + i}`);
        } else {
          gameboard[coordY + i][coordX] = `${shipId}`;
          shipCoordInGameboard.push(`${coordY + i}-${coordX}`);
          listOfCoordAlreadyFill.push(`${coordY + i}-${coordX}`);
        }
      }
      coordOfEachShipInGameboard[shipId] = shipCoordInGameboard;

      listOfShipInGameboard.push(ship);

      // for now, this return is only usefull for my test.
      return gameboard;
    }
    return `impossible to place ship ${shipId} here, the place is already fill.`;
  };

  const createShip = ({ shipId, length }) => {
    const newShip = shipFactory({ shipId, length });

    return newShip;
  };

  const allShipAreSunk = () => listOfShipInGameboard.every((ship) => ship.isSunk());

  const receiveAttack = ({ coordY, coordX }) => {
    if (gameboard[coordY][coordX]) {
      const coordId = Number(gameboard[coordY][coordX]);

      const shipHitted = listOfShipInGameboard.find((ship) => ship.shipId === coordId);

      const positionHit = coordOfEachShipInGameboard[coordId].indexOf(`${coordY}-${coordX}`);

      shipHitted.hit({ position: positionHit + 1 });

      const coordOfHittedShot = `${[coordY]}-${[coordX]}`;
      listOfOpponentHittedShot.push(coordOfHittedShot);

      return `ship ${shipHitted.shipId} was hit at position ${positionHit + 1} of ${shipHitted.getLength()}`;
    }

    const coordMissedShot = `${[coordY]}-${[coordX]}`;
    listOfOpponentMissedShot.push(coordMissedShot);

    return `shot missed at coord ${[coordY]}-${[coordX]}`;
  };

  return {
    createShip,
    renderGameboard,
    renderShipInGame,
    placeShipInGameboard,
    receiveAttack,
    renderListOfOpponentMissedShot,
    renderListOfOpponentHittedShot,
    allShipAreSunk,
  };
};

export default gameboardFactory;
