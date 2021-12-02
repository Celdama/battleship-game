import gameboardFactory from '../modules/gameboard';

describe('create ship inside gameboard factory', () => {
  it('create a ship with length 3 and id 1', () => {
    const game = gameboardFactory();
    const { createShip } = game;

    expect(createShip({ shipId: 1, length: 3 }).getLength()).toBe(3);
    expect(createShip({ shipId: 1, length: 3 }).shipId).toBe(1);
  });
});

describe('check if gameboard coord is empty', () => {
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

  const game = gameboardFactory();
  const { createShip, placeShipInGameBoard } = game;
  let newBoard = [];

  it('add correctly ship in gameboard at the right coord', () => {
    const newShip = createShip({ shipId: 1, length: 5 });

    newBoard = placeShipInGameBoard({ coordY: 0, coordX: 0, ship: newShip });
    expect(placeShipInGameBoard({ coordY: 0, coordX: 0, ship: newShip })).not.toBe(board);
    expect(newBoard[0][0]).toBe('1');
    expect(newBoard[0][1]).toBe('1');
    expect(newBoard[0][2]).toBe('1');
    expect(newBoard[0][3]).toBe('1');
    expect(newBoard[0][4]).toBe('1');
    expect(newBoard[0][5]).toBe(null);
    expect(newBoard[1][0]).toBe(null);
  });

  it('not add ship in gameboard if one coord is already fill by another ship', () => {
    const anotherShip = createShip({ shipId: 2, length: 3 });

    newBoard = placeShipInGameBoard({ coordY: 0, coordX: 3, ship: anotherShip });
    expect(placeShipInGameBoard({ coordY: 0, coordX: 3, ship: anotherShip }))
      .toBe('impossible to place ship 2 here, the place is already fill.');
  });

  it('return an error message if ship is not provided', () => {
    expect(placeShipInGameBoard({ coordY: 0, coordX: 3 })).toBe('ship not provided');
  });

  it('return an error message if one or more coord is not provided', () => {
    const newShip = createShip({ shipId: 2, length: 3 });

    expect(placeShipInGameBoard({ coordY: 0, ship: newShip })).toBe('one or more option to set ship 2 position not provided');
    expect(placeShipInGameBoard({ ship: newShip })).toBe('one or more option to set ship 2 position not provided');
  });
});

describe('check if receive attack work', () => {
  const game = gameboardFactory();
  const { createShip, placeShipInGameBoard, receiveAttack } = game;
  let newBoard = [];
  const newShip = createShip({ shipId: 4, length: 4 });
  const anotherShip = createShip({ shipId: 10, length: 1 });

  newBoard = placeShipInGameBoard({
    coordY: 0, coordX: 0, ship: newShip, vertical: true,
  });

  newBoard = placeShipInGameBoard({ coordY: 0, coordX: 8, ship: anotherShip });

  it('attack on ship work', () => {
    expect(receiveAttack({ coordY: 0, coordX: 0 })).toBe('ship 4 was hit at position 1 of 4');
    expect(receiveAttack({ coordY: 1, coordX: 0 })).toBe('ship 4 was hit at position 2 of 4');
    expect(receiveAttack({ coordY: 2, coordX: 0 })).toBe('ship 4 was hit at position 3 of 4');
    expect(receiveAttack({ coordY: 3, coordX: 0 })).toBe('ship 4 was hit at position 4 of 4');
  });

  it('ship was sunk if all position are hit', () => {
    expect(newShip.isSunk()).toBe(true);
  });

  it('ship was not sunk if all position are not hit', () => {
    expect(anotherShip.isSunk()).toBe(false);
  });

  it('after position was hit, ship of 1 length was sunk', () => {
    expect(receiveAttack({ coordY: 0, coordX: 8 })).toBe('ship 10 was hit at position 1 of 1');
    expect(anotherShip.isSunk()).toBe(true);
  });

  it('shot missed if coord doesnt contains ship', () => {
    expect(receiveAttack({ coordY: 9, coordX: 4 })).toBe('shot missed at coord 9-4');
    expect(receiveAttack({ coordY: 9, coordX: 1 })).toBe('shot missed at coord 9-1');
    expect(receiveAttack({ coordY: 4, coordX: 6 })).toBe('shot missed at coord 4-6');
  });
});
