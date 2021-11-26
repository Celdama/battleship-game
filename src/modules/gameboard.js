import shipFactory from './ship';

const gameboardFactory = () => {
  const board = [
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

  const renderGameBoard = () => {
    // first [] = y
    // second [] = x
    console.table(board);
  };

  const renderShipInGame = () => console.log(coordOfEachShipInGameboard);

  const coordIsEmpty = (coordY, coordX, shipLength, isVertical) => {
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

  const placeShipInGameBoard = ({ coordY, coordX, vertical = false }, ship = undefined) => {
    if (ship === undefined) {
      return 'ship not provided';
    }

    if (coordY === undefined || coordX === undefined || vertical === undefined) {
      return `one or more option to set ship ${ship.shipId} position not provided`;
    }

    const { shipId, getLength } = ship;

    const shipCoordInGameboard = [];
    const shipLength = getLength();

    if (coordIsEmpty(coordY, coordX, shipLength, vertical)) {
      for (let i = 0; i < shipLength; i += 1) {
        if (!vertical) {
          board[coordY][coordX + i] = `${shipId}`;
          shipCoordInGameboard.push(`${coordY}-${coordX + i}`);
          listOfCoordAlreadyFill.push(`${coordY}-${coordX + i}`);
        } else {
          board[coordY + i][coordX] = `${shipId}`;
          shipCoordInGameboard.push(`${coordY + i}-${coordX}`);
          listOfCoordAlreadyFill.push(`${coordY + i}-${coordX}`);
        }
      }
      coordOfEachShipInGameboard[shipId] = shipCoordInGameboard;

      listOfShipInGameboard.push(ship);

      // for now, this return is only usefull for my test.
      return board;
    }
    return `impossible to place ship ${shipId} here, the place is already fill.`;
  };

  const createShip = ({ shipId, length }) => {
    const newShip = shipFactory({ shipId, length });

    return newShip;
  };

  return {
    createShip,
    renderGameBoard,
    renderShipInGame,
    placeShipInGameBoard,
  };
};

export default gameboardFactory;

// DONE: able to place ships at specific coordinates by calling ship factory
// should have receiveAttack()
// take a pair of coordinates
// determines whether or not the attach hit a ship
// and then send the hit() to the correct ship
// or record the coordinates of the missed shot
// keep track of missed attacks so they can display them properly
// should be able to report wheter or not all of their ships have been sunk
