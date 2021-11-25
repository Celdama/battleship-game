const SHIP_MAX_LENGTH = 5;
const SHIP_MIN_LENGTH = 1;

const setShipLength = (length) => {
  if (length > SHIP_MAX_LENGTH) return SHIP_MAX_LENGTH;
  if (length < SHIP_MIN_LENGTH) return SHIP_MIN_LENGTH;
  return length;
};

const isBetweenRange = (position) => SHIP_MIN_LENGTH <= position && position <= SHIP_MAX_LENGTH;

const shipFactory = (length) => {
  const lives = [];
  const shipLength = setShipLength(length);

  const getLength = () => shipLength;

  const getLives = () => [...lives];

  const hit = (position) => {
    if (isBetweenRange(position) && position <= shipLength) {
      lives[position - 1] = 'x';
    }
  };

  const isSunk = () => lives.join('').length === shipLength;

  return {
    getLength,
    getLives,
    hit,
    isSunk,
  };
};

console.log(isBetweenRange(4));

const ship = shipFactory(3);

console.log(ship.getLength());
// ship.hit(4);
// ship.hit(5);
// ship.hit(1);
// ship.hit(2);

console.log(ship.getLives());

console.log(ship.isSunk());

export default shipFactory;
