const SHIP_MAX_LENGTH = 5;
const SHIP_MIN_LENGTH = 1;

const setShipLength = (length) => {
  if (length > SHIP_MAX_LENGTH) return SHIP_MAX_LENGTH;
  if (length < SHIP_MIN_LENGTH) return SHIP_MIN_LENGTH;
  return length;
};

const isBetweenRange = (position) => SHIP_MIN_LENGTH <= position && position <= SHIP_MAX_LENGTH;

const shipFactory = ({ length }) => {
  const lives = [];
  const shipLength = setShipLength(length);

  const getLength = () => shipLength;

  const getLives = () => [...lives];

  const isSunk = () => lives.join('').length === shipLength;

  function hit({ position }) {
    const self = this;
    if (isBetweenRange(position) && position <= shipLength) {
      lives[position - 1] = 'x';
    }

    return self;
  }

  return {
    getLength,
    getLives,
    isSunk,
    hit,

  };
};

export default shipFactory;
