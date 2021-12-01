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
