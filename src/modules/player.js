import gameboardFactory from './gameboard';

const player = (() => {
  const humanPlayer = gameboardFactory();
  const AIPlayer = gameboardFactory();

  // const humanGameboard = humanPlayer.renderGameBoard();
  const createAndPlaceShipPlayer = (human) => {
    const ship1 = human.createShip({ shipId: 1, length: 5 });
    const ship2 = human.createShip({ shipId: 2, length: 4 });
    const ship3 = human.createShip({ shipId: 3, length: 3 });
    const ship4 = human.createShip({ shipId: 4, length: 3 });
    const ship5 = human.createShip({ shipId: 5, length: 1 });

    human.placeShipInGameBoard({ coordY: 3, coordX: 1, ship: ship1 });
    human.placeShipInGameBoard({
      coordY: 0, coordX: 9, ship: ship2, vertical: true,
    });
    human.placeShipInGameBoard({ coordY: 0, coordX: 0, ship: ship3 });
    human.placeShipInGameBoard({ coordY: 9, coordX: 3, ship: ship4 });
    human.placeShipInGameBoard({ coordY: 6, coordX: 7, ship: ship5 });
  };

  const createAndPlaceShipComputer = (computer) => {
    const ship1 = computer.createShip({ shipId: 1, length: 5 });
    const ship2 = computer.createShip({ shipId: 2, length: 4 });
    const ship3 = computer.createShip({ shipId: 3, length: 3 });
    const ship4 = computer.createShip({ shipId: 4, length: 3 });
    const ship5 = computer.createShip({ shipId: 5, length: 1 });

    computer.placeShipInGameBoard({ coordY: 6, coordX: 0, ship: ship1 });
    computer.placeShipInGameBoard({
      coordY: 0, coordX: 0, ship: ship2, vertical: true,
    });
    computer.placeShipInGameBoard({ coordY: 2, coordX: 4, ship: ship3 });
    computer.placeShipInGameBoard({ coordY: 4, coordX: 6, ship: ship4 });
    computer.placeShipInGameBoard({ coordY: 0, coordX: 5, ship: ship5 });
  };

  const renderHumanGameboardFilled = () => humanPlayer.renderGameBoard();

  const renderComputerGameboardFilled = () => AIPlayer.renderGameBoard();

  const makeRandomChoice = () => {
    const coordY = Math.floor(Math.random() * 10);
    const coordX = Math.floor(Math.random() * 10);

    return `${coordY}-${coordX}`;
  };

  const humanTurn = ({ event, boxReceiveShot }) => {
    const computerGameboard = renderComputerGameboardFilled();
    const { coordY, coordX } = event.target.dataset;
    const td = boxReceiveShot;

    if (playerAttack({ coordY, coordX })) {
      td.textContent = computerGameboard[coordY][coordX];
      if (checkIfAllComputerShipAreSunk()) {
        alert('you won dude');
      }
    } else {
      boxReceiveShot.classList.add('missed-shot');
    }
  };

  const computerTurn = (human) => {
    // missed shot for computer is listed in missedShot of human and vice versa
    const missedShot = human.renderListOfMissedShot();
    const hittedShot = human.renderListOfHittedShot();

    console.log(`hitted ${hittedShot}`);
    console.log(`missed ${missedShot}`);

    let shot = makeRandomChoice();

    while (missedShot.includes(shot) && hittedShot.includes(shot)) {
      shot = makeRandomChoice();
    }

    const coord = shot.split('-');
    const [coordY, coordX] = coord;

    human.receiveAttack({ coordY, coordX });
  };

  const checkIfAllComputerShipAreSunk = () => AIPlayer.allShipAreSunk();

  const playerAttack = ({ coordY, coordX }) => {
    const resultOfShot = AIPlayer.receiveAttack({ coordY, coordX });

    return !resultOfShot.includes('missed');
  };

  const initPlayers = () => {
    createAndPlaceShipPlayer(humanPlayer);
    createAndPlaceShipComputer(AIPlayer);
    // renderGameboardFilled();

    // console.log(humanPlayer.receiveAttack({ coordY: 0, coordX: 0 }));
    // console.log(humanPlayer.receiveAttack({ coordY: 0, coordX: 5 }));
    // console.log(AIPlayer.receiveAttack({ coordY: 0, coordX: 1 }));
    // console.log(humanPlayer.receiveAttack({ coordY: 0, coordX: 6 }));
    // console.log(humanPlayer.receiveAttack({ coordY: 0, coordX: 7 }));
    // computerTurn(humanPlayer);
    // computerTurn(humanPlayer);
    // computerTurn(humanPlayer);
  };

  return {
    initPlayers,
    renderHumanGameboardFilled,
    renderComputerGameboardFilled,
    playerAttack,
    humanTurn,
    checkIfAllComputerShipAreSunk,
  };
})();

export default player;
