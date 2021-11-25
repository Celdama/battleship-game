import shipFactory from '../modules/ship';

describe('createShip', () => {
  it('create a ship with length 3', () => {
    expect(shipFactory({ length: 3 }).getLength()).toBe(3);
  });

  it('returns length = 5 if provided length > 5', () => {
    expect(shipFactory({ length: 6 }).getLength()).toBe(5);
  });

  it('returns length = 1 if provided length < 1', () => {
    expect(shipFactory({ length: 0 }).getLength()).toBe(1);
  });

  it('new created ship should be not sunk', () => {
    expect(shipFactory({ length: 3 }).isSunk()).toBe(false);
  });

  it('ship is not hit if position hitted is too big or too small', () => {
    const ship = shipFactory({ length: 2 });

    expect(
      ship
        .hit({ position: 10 })
        .getLives()
        .join(''),
    ).toBe('');

    expect(
      ship
        .hit({ position: 0 })
        .getLives()
        .join(''),
    ).toBe('');
  });

  it('ship is hit if position hitted is in range of ship length', () => {
    const ship = shipFactory({ length: 4 });

    expect(
      ship
        .hit({ position: 3 })
        .getLives()
        .join(''),
    ).toBe('x');

    expect(
      ship
        .hit({ position: 1 })
        .getLives()
        .join(''),
    ).toBe('xx');
  });

  it('ship is sunk if the ship was destroyed', () => {
    expect(
      shipFactory({ length: 1 })
        .hit({ position: 1 })
        .isSunk(),
    ).toBe(true);
  });

  it('a ship with 1 or more lives is not sunk', () => {
    const ship = shipFactory({ length: 5 });

    expect(ship.isSunk()).toBe(false);
    expect(ship.hit({ position: 1 }).isSunk()).toBe(false);
    expect(ship.hit({ position: 2 }).isSunk()).toBe(false);
    expect(ship.hit({ position: 3 }).isSunk()).toBe(false);
    expect(ship.hit({ position: 4 }).isSunk()).toBe(false);
    expect(ship.hit({ position: 5 }).isSunk()).toBe(true);
  });

  it('return an empty array if the ship is unhit', () => {
    const ship = shipFactory({ length: 3 });

    expect(ship.getLives().join('')).toBe('');
  });

  it('return an array full of x equal with ship length if it was sunk', () => {
    const ship = shipFactory({ length: 3 });

    expect(
      ship
        .hit({ position: 2 })
        .getLives()
        .join(''),
    ).toBe('x');

    expect(
      ship
        .hit({ position: 1 })
        .getLives()
        .join(''),
    ).toBe('xx');

    expect(
      ship
        .hit({ position: 3 })
        .getLives()
        .join(''),
    ).toBe('xxx');

    expect(ship.isSunk()).toBe(true);

    expect(ship.getLives().join('').length).toBe(ship.getLength());
  });
});
