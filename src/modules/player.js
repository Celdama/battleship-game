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

  const createAndPlaceShipComputer = () => {
    const { createShip, placeShipInGameboard } = computerPlayer;
    const ship1 = createShip({ shipId: 1, length: 5 });
    const ship2 = createShip({ shipId: 2, length: 4 });
    const ship3 = createShip({ shipId: 3, length: 3 });
    const ship4 = createShip({ shipId: 4, length: 3 });
    const ship5 = createShip({ shipId: 5, length: 1 });

    placeShipInGameboard({ coordY: 6, coordX: 0, ship: ship1 });
    placeShipInGameboard({
      coordY: 0, coordX: 0, ship: ship2, vertical: true,
    });
    placeShipInGameboard({ coordY: 2, coordX: 4, ship: ship3 });
    placeShipInGameboard({ coordY: 4, coordX: 6, ship: ship4 });
    placeShipInGameboard({ coordY: 0, coordX: 5, ship: ship5 });
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

      return 'shot ok';
    }
    box.classList.add('missed-shot');
    box.classList.add('disable-click');

    return 'shot missed';
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

  const initPlayers = () => {
    createAndPlaceShipPlayer();
    createAndPlaceShipComputer();
  };

  return {
    initPlayers,
    renderHumanGameboardFilled,
    renderComputerGameboardFilled,
    computerTurn,
    humanTurn,
    checkIfAllComputerShipAreSunk,
    checkIfAllHumanShipAreSunk,
  };
})();

export default player;
