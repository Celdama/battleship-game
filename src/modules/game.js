import gameboardFactory from './gameboard';

const game = (() => {
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

  const renderGameboardFilled = () => {
    humanPlayer.renderGameBoard();
    AIPlayer.renderGameBoard();
  };

  const initGame = () => {
    createAndPlaceShipPlayer(humanPlayer);
    createAndPlaceShipComputer(AIPlayer);
    renderGameboardFilled();

    console.log(humanPlayer.receiveAttack({ coordY: 0, coordX: 0 }));
    console.log(AIPlayer.receiveAttack({ coordY: 0, coordX: 1 }));

    // const ship1 = humanPlayer.createShip({ shipId: 1, length: 5 });
    // // console.log(ship1);
    // humanPlayer.placeShipInGameBoard({ coordY: 3, coordX: 1, ship: ship1 });
  };

  return {
    initGame,
  };
})();

export default game;