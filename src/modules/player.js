import gameboardFactory from '../factory/gameboard';

const player = (() => {
  const humanPlayer = gameboardFactory();
  const computerPlayer = gameboardFactory();

  const createAndPlaceShipPlayer = () => {
    const { createShip, placeShipInGameboard } = humanPlayer;
    const ship1 = createShip({ shipId: 1, length: 5 });
    const ship2 = createShip({ shipId: 2, length: 4 });
    const ship3 = createShip({ shipId: 3, length: 3 });
    const ship4 = createShip({ shipId: 4, length: 3 });
    const ship5 = createShip({ shipId: 5, length: 1 });

    placeShipInGameboard({ coordY: 3, coordX: 1, ship: ship1 });
    placeShipInGameboard({
      coordY: 0, coordX: 9, ship: ship2, vertical: true,
    });
    placeShipInGameboard({ coordY: 0, coordX: 0, ship: ship3 });
    placeShipInGameboard({ coordY: 9, coordX: 3, ship: ship4 });
    placeShipInGameboard({ coordY: 6, coordX: 7, ship: ship5 });
  };

  const randomPlace = (shipLength, vertical) => {
    let coordY = Math.floor(Math.random() * 10);
    let coordX = Math.floor(Math.random() * 10);

    const suppHorizontal = coordX + shipLength;
    const suppVertical = coordY + shipLength;

    if (vertical) {
      if (coordY + shipLength > 10) {
        coordY -= (suppVertical - 10);
      }
    }

    if (!vertical) {
      if (coordX + shipLength > 10) {
        coordX -= (suppHorizontal - 10);
      }
    }

    return `${coordY}-${coordX}`;
  };

  const setShipPlace = (ship) => {
    const shipLength = ship.getLength();
    const randomVertical = Math.round(Math.random());

    const randomCoord = randomPlace(shipLength, !!randomVertical);

    const coord = randomCoord.split('-');
    const [coordY, coordX] = coord;

    const resultPlacement = computerPlayer.placeShipInGameboard({
      coordY: Number(coordY), coordX: Number(coordX), ship, vertical: !!randomVertical,
    });

    return resultPlacement;
  };

  const placeComputerShips = (ships) => {
    ships.forEach((ship) => {
      const isShipPlaced = setShipPlace(ship);

      if (!isShipPlaced) {
        setShipPlace(ship);
      }
    });

    console.table(computerPlayer.renderGameboard());
  };

  const createAndPlaceShipComputer = () => {
    const { createShip } = computerPlayer;
    const ship1 = createShip({ shipId: 1, length: 5 });
    const ship2 = createShip({ shipId: 2, length: 4 });
    const ship3 = createShip({ shipId: 3, length: 3 });
    const ship4 = createShip({ shipId: 4, length: 3 });
    const ship5 = createShip({ shipId: 5, length: 1 });
    const listOfShip = [ship1, ship2, ship3, ship4, ship5];

    return listOfShip;
  };

  const renderHumanGameboardFilled = () => humanPlayer.renderGameboard();

  const renderComputerGameboardFilled = () => computerPlayer.renderGameboard();

  const makeRandomChoice = () => {
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
  };

  const computerTurn = () => {
    const { renderListOfOpponentMissedShot, renderListOfOpponentHittedShot } = humanPlayer;
    const missedShot = renderListOfOpponentMissedShot();
    const hittedShot = renderListOfOpponentHittedShot();

    let shot = makeRandomChoice();

    while (missedShot.includes(shot) || hittedShot.includes(shot)) {
      shot = makeRandomChoice();
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
    const shipShoted = allComputerShip.find((ship) => ship.shipId === id);

    return shipShoted.isSunk();
  };

  const initPlayer = () => {
    createAndPlaceShipPlayer();
    // createAndPlaceShipComputer();
  };

  const initComputer = () => {
    const allComputersShips = createAndPlaceShipComputer();
    placeComputerShips(allComputersShips);
  };

  return {
    initPlayer,
    initComputer,
    // renderComputerGameBoard,
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
