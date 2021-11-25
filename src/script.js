import gameboardFactory from './modules/gameboard';

const game = gameboardFactory();

const ship = game.setShipPlace({
  length: 5, coordY: 4, coordX: 1,
});
const newShip = game.setShipPlace({
  length: 3, coordY: 0, coordX: 5, vertical: true,
});
const anotherShip = game.setShipPlace({ length: 1, coordY: 9, coordX: 0 });
const anotherVerticalShip = game.setShipPlace({
  length: 4, coordY: 0, coordX: 0, vertical: true,
});
const lastVerticalShip = game.setShipPlace({
  length: 5, coordY: 5, coordX: 9, vertical: true,
});

game.renderGameBoard();
