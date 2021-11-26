import gameboardFactory from './modules/gameboard';

const game = gameboardFactory();

const { createShip, placeShipInGameBoard } = game;

const ship1 = createShip({ shipId: 1, length: 5 });
const ship2 = createShip({ shipId: 2, length: 3 });
const ship3 = createShip({ shipId: 3, length: 1 });
const ship4 = createShip({ shipId: 4, length: 4 });
const ship5 = createShip({ shipId: 5, length: 5 });
const ship6 = createShip({ shipId: 6, length: 2 });
const ship7 = createShip({ shipId: 7, length: 4 });
const ship8 = createShip({ shipId: 8, length: 5 });
const ship9 = createShip({ shipId: 9, length: 4 });
const ship10 = createShip({ shipId: 10, length: 1 });

placeShipInGameBoard({ coordY: 4, coordX: 1 }, ship1);
placeShipInGameBoard({ coordY: 0, coordX: 5, vertical: true }, ship2);
placeShipInGameBoard({ coordY: 9, coordX: 0 }, ship3);
placeShipInGameBoard({ coordY: 0, coordX: 0, vertical: true }, ship4);
placeShipInGameBoard({ coordY: 5, coordX: 9, vertical: true }, ship5);
placeShipInGameBoard({ coordY: 6, coordX: 0 }, ship6);
placeShipInGameBoard({ coordY: 9, coordX: 2 }, ship7);
placeShipInGameBoard({ coordY: 3, coordX: 7, vertical: true }, ship8);
placeShipInGameBoard({ coordY: 2, coordX: 6, vertical: true }, ship9);
placeShipInGameBoard({ coordY: 0, coordX: 8 }, ship10);

game.renderGameBoard();

// console.log(ship1.getLength());
// ship1.hit({ position: 1 });
// ship1.hit({ position: 2 });
// ship1.hit({ position: 3 });
// ship1.hit({ position: 4 });
// ship1.hit({ position: 5 });
// console.log(ship1.shipId);
// console.log(ship1.isSunk());
