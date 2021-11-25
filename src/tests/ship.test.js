import shipFactory from '../modules/ship';

describe('createShip', () => {
  it('create a ship with length 3', () => {
    expect(shipFactory(3).getLength()).toBe(3);
  });

  it('returns length = 5 if provided length > 5', () => {
    expect(shipFactory(6).getLength()).toBe(5);
  });

  it('returns length = 1 if provided length < 1', () => {
    expect(shipFactory(0).getLength()).toBe(1);
  });

  it('new created ship should be not sunk', () => {
    expect(shipFactory(3).isSunk()).toBe(false);
  });

  it('ship is not hit if position hitted is too big or small', () => {
    const ship = shipFactory(2);
    ship.hit(4);
    expect(ship.getLives()).toStrictEqual([]);

    ship.hit(0);
    expect(ship.getLives()).toStrictEqual([]);
  });

  it('ship is hit if position hitted is in range of ship length', () => {
    const ship = shipFactory(4);
    ship.hit(3);
    expect(ship.getLives()).toStrictEqual([, , 'x']);

    ship.hit(1);
    ship.hit(4);
    expect(ship.getLives()).toStrictEqual(['x', , 'x', 'x']);
  });
});
