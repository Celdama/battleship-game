import shipFactory from './ship';

const gameboardFactory = () => {
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

  const renderGameBoard = () => {
    // first [] = y
    // second [] = x
    console.table(board);
  };

  const setShipPlace = ({
    length, coordY, coordX, vertical = false,
  }) => {
    const ship = shipFactory({ length });

    for (let i = 0; i < ship.getLength(); i += 1) {
      if (!vertical) {
        board[coordY][coordX + i] = 'A';
      } else {
        board[coordY + i][coordX] = 'A';
      }
    }
    return ship;
  };

  return {
    setShipPlace,
    renderGameBoard,
  };
};

export default gameboardFactory;

// able to place ships at specific coordinates by calling ship factory
// should have receiveAttack()
// take a pair of coordinates
// determines whether or not the attach hit a ship
// and then send the hit() to the correct ship
// or record the coordinates of the missed shot
// keep track of missed attacks so they can display them properly
// should be able to report wheter or not all of their ships have been sunk
