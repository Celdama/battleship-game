// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"modules/ship.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var SHIP_MAX_LENGTH = 5;
var SHIP_MIN_LENGTH = 1;

var setShipLength = function setShipLength(length) {
  if (length > SHIP_MAX_LENGTH) return SHIP_MAX_LENGTH;
  if (length < SHIP_MIN_LENGTH) return SHIP_MIN_LENGTH;
  return length;
};

var isBetweenRange = function isBetweenRange(position) {
  return SHIP_MIN_LENGTH <= position && position <= SHIP_MAX_LENGTH;
};

var shipFactory = function shipFactory(_ref) {
  var shipId = _ref.shipId,
      length = _ref.length;
  var lives = [];
  var shipLength = setShipLength(length);

  var getLength = function getLength() {
    return shipLength;
  };

  var getLives = function getLives() {
    return [].concat(lives);
  };

  var isSunk = function isSunk() {
    return lives.join('').length === shipLength;
  };

  function hit(_ref2) {
    var position = _ref2.position;
    var self = this;

    if (isBetweenRange(position) && position <= shipLength) {
      lives[position - 1] = 'x';
    }

    return self;
  }

  return {
    shipId: shipId,
    getLength: getLength,
    getLives: getLives,
    isSunk: isSunk,
    hit: hit
  };
};

var _default = shipFactory;
exports.default = _default;
},{}],"modules/gameboard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ship = _interopRequireDefault(require("./ship"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gameboardFactory = function gameboardFactory() {
  var board = [[null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null]];
  var coordOfEachShipInGameboard = {};
  var listOfShipInGameboard = [];
  var listOfCoordAlreadyFill = []; // missed shot of opponent

  var listOfMissedShot = [];
  var listOfHittedShot = []; // first [] = y
  // second [] = x

  var renderGameBoard = function renderGameBoard() {
    console.table(board);
    return board;
  };

  var renderListOfMissedShot = function renderListOfMissedShot() {
    return listOfMissedShot;
  };

  var renderListOfHittedShot = function renderListOfHittedShot() {
    return listOfHittedShot;
  };

  var renderListOfShipInGameBoard = function renderListOfShipInGameBoard() {
    return listOfShipInGameboard;
  };

  var renderShipInGame = function renderShipInGame() {
    return console.log(coordOfEachShipInGameboard);
  };

  var coordIsEmpty = function coordIsEmpty(coordY, coordX, shipLength, isVertical) {
    if (isVertical) {
      for (var i = 0; i < shipLength; i += 1) {
        if (listOfCoordAlreadyFill.includes("".concat(coordY + i, "-").concat(coordX))) {
          return false;
        }
      }
    } else {
      for (var _i = 0; _i < shipLength; _i += 1) {
        if (listOfCoordAlreadyFill.includes("".concat(coordY, "-").concat(coordX + _i))) {
          return false;
        }
      }
    }

    return true;
  };

  var placeShipInGameBoard = function placeShipInGameBoard(_ref) {
    var coordY = _ref.coordY,
        coordX = _ref.coordX,
        ship = _ref.ship,
        _ref$vertical = _ref.vertical,
        vertical = _ref$vertical === void 0 ? false : _ref$vertical;

    if (ship === undefined) {
      return 'ship not provided';
    }

    if (coordY === undefined || coordX === undefined) {
      return "one or more option to set ship ".concat(ship.shipId, " position not provided");
    }

    var shipId = ship.shipId,
        getLength = ship.getLength;
    var shipCoordInGameboard = [];
    var shipLength = getLength();

    if (coordIsEmpty(coordY, coordX, shipLength, vertical)) {
      for (var i = 0; i < shipLength; i += 1) {
        if (!vertical) {
          board[coordY][coordX + i] = "".concat(shipId);
          shipCoordInGameboard.push("".concat(coordY, "-").concat(coordX + i));
          listOfCoordAlreadyFill.push("".concat(coordY, "-").concat(coordX + i));
        } else {
          board[coordY + i][coordX] = "".concat(shipId);
          shipCoordInGameboard.push("".concat(coordY + i, "-").concat(coordX));
          listOfCoordAlreadyFill.push("".concat(coordY + i, "-").concat(coordX));
        }
      }

      coordOfEachShipInGameboard[shipId] = shipCoordInGameboard;
      listOfShipInGameboard.push(ship); // for now, this return is only usefull for my test.

      return board;
    }

    return "impossible to place ship ".concat(shipId, " here, the place is already fill.");
  };

  var createShip = function createShip(_ref2) {
    var shipId = _ref2.shipId,
        length = _ref2.length;
    var newShip = (0, _ship.default)({
      shipId: shipId,
      length: length
    });
    return newShip;
  };

  var allShipAreSunk = function allShipAreSunk() {
    return listOfShipInGameboard.every(function (ship) {
      return ship.isSunk();
    });
  };

  var receiveAttack = function receiveAttack(_ref3) {
    var coordY = _ref3.coordY,
        coordX = _ref3.coordX;

    // determines whether or not the attach hit a ship
    if (board[coordY][coordX]) {
      // and then sends the hits function to the correct ship
      var coordId = Number(board[coordY][coordX]);
      var shipHitted = listOfShipInGameboard.find(function (ship) {
        return ship.shipId === coordId;
      }); // determine where the ship was hit

      var positionHit = coordOfEachShipInGameboard[coordId].indexOf("".concat(coordY, "-").concat(coordX)); // add one because ship start to 1

      shipHitted.hit({
        position: positionHit + 1
      });
      var coordOfHittedShot = "".concat([coordY], "-").concat([coordX]);
      listOfHittedShot.push(coordOfHittedShot);
      console.log(allShipAreSunk());
      return "ship ".concat(shipHitted.shipId, " was hit at position ").concat(positionHit + 1, " of ").concat(shipHitted.getLength());
    } // or record the coord of the missed shot


    var coordMissedShot = "".concat([coordY], "-").concat([coordX]);
    listOfMissedShot.push(coordMissedShot);
    return "shot missed at coord ".concat([coordY], "-").concat([coordX]);
  };

  return {
    createShip: createShip,
    renderGameBoard: renderGameBoard,
    renderShipInGame: renderShipInGame,
    placeShipInGameBoard: placeShipInGameBoard,
    receiveAttack: receiveAttack,
    renderListOfShipInGameBoard: renderListOfShipInGameBoard,
    renderListOfMissedShot: renderListOfMissedShot,
    renderListOfHittedShot: renderListOfHittedShot
  };
};

var _default = gameboardFactory;
exports.default = _default;
},{"./ship":"modules/ship.js"}],"modules/game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gameboard = _interopRequireDefault(require("./gameboard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var game = function () {
  var humanPlayer = (0, _gameboard.default)();
  var AIPlayer = (0, _gameboard.default)(); // const humanGameboard = humanPlayer.renderGameBoard();

  var createAndPlaceShipPlayer = function createAndPlaceShipPlayer(human) {
    var ship1 = human.createShip({
      shipId: 1,
      length: 5
    });
    var ship2 = human.createShip({
      shipId: 2,
      length: 4
    });
    var ship3 = human.createShip({
      shipId: 3,
      length: 3
    });
    var ship4 = human.createShip({
      shipId: 4,
      length: 3
    });
    var ship5 = human.createShip({
      shipId: 5,
      length: 1
    });
    human.placeShipInGameBoard({
      coordY: 3,
      coordX: 1,
      ship: ship1
    });
    human.placeShipInGameBoard({
      coordY: 0,
      coordX: 9,
      ship: ship2,
      vertical: true
    });
    human.placeShipInGameBoard({
      coordY: 0,
      coordX: 0,
      ship: ship3
    });
    human.placeShipInGameBoard({
      coordY: 9,
      coordX: 3,
      ship: ship4
    });
    human.placeShipInGameBoard({
      coordY: 6,
      coordX: 7,
      ship: ship5
    });
  };

  var createAndPlaceShipComputer = function createAndPlaceShipComputer(computer) {
    var ship1 = computer.createShip({
      shipId: 1,
      length: 5
    });
    var ship2 = computer.createShip({
      shipId: 2,
      length: 4
    });
    var ship3 = computer.createShip({
      shipId: 3,
      length: 3
    });
    var ship4 = computer.createShip({
      shipId: 4,
      length: 3
    });
    var ship5 = computer.createShip({
      shipId: 5,
      length: 1
    });
    computer.placeShipInGameBoard({
      coordY: 6,
      coordX: 0,
      ship: ship1
    });
    computer.placeShipInGameBoard({
      coordY: 0,
      coordX: 0,
      ship: ship2,
      vertical: true
    });
    computer.placeShipInGameBoard({
      coordY: 2,
      coordX: 4,
      ship: ship3
    });
    computer.placeShipInGameBoard({
      coordY: 4,
      coordX: 6,
      ship: ship4
    });
    computer.placeShipInGameBoard({
      coordY: 0,
      coordX: 5,
      ship: ship5
    });
  };

  var renderGameboardFilled = function renderGameboardFilled() {
    humanPlayer.renderGameBoard();
    AIPlayer.renderGameBoard();
  };

  var makeRandomChoice = function makeRandomChoice() {
    var coordY = Math.floor(Math.random() * 10);
    var coordX = Math.floor(Math.random() * 10);
    return "".concat(coordY, "-").concat(coordX);
  };

  var computerTurn = function computerTurn(human) {
    // missed shot for computer is listed in missedShot of human and vice versa
    var missedShot = human.renderListOfMissedShot();
    var hittedShot = human.renderListOfHittedShot();
    console.log("hitted ".concat(hittedShot));
    console.log("missed ".concat(missedShot));
    var shot = makeRandomChoice();

    while (missedShot.includes(shot) && hittedShot.includes(shot)) {
      shot = makeRandomChoice();
    }

    var coord = shot.split('-');

    var _coord = _slicedToArray(coord, 2),
        coordY = _coord[0],
        coordX = _coord[1];

    human.receiveAttack({
      coordY: coordY,
      coordX: coordX
    });
  };

  var initGame = function initGame() {
    createAndPlaceShipPlayer(humanPlayer);
    createAndPlaceShipComputer(AIPlayer);
    renderGameboardFilled();
    console.log(humanPlayer.receiveAttack({
      coordY: 0,
      coordX: 0
    }));
    console.log(humanPlayer.receiveAttack({
      coordY: 0,
      coordX: 5
    }));
    console.log(AIPlayer.receiveAttack({
      coordY: 0,
      coordX: 1
    }));
    console.log(humanPlayer.receiveAttack({
      coordY: 0,
      coordX: 6
    }));
    console.log(humanPlayer.receiveAttack({
      coordY: 0,
      coordX: 7
    }));
    computerTurn(humanPlayer);
    computerTurn(humanPlayer);
    computerTurn(humanPlayer);
  };

  return {
    initGame: initGame
  };
}();

var _default = game;
exports.default = _default;
},{"./gameboard":"modules/gameboard.js"}],"script.js":[function(require,module,exports) {
"use strict";

var _gameboard = _interopRequireDefault(require("./modules/gameboard"));

var _game = _interopRequireDefault(require("./modules/game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_game.default.initGame(); // const game = gameboardFactory();


var gameboard = (0, _gameboard.default)();
var createShip = gameboard.createShip,
    placeShipInGameBoard = gameboard.placeShipInGameBoard;
var ship1 = createShip({
  shipId: 1,
  length: 5
});
var ship2 = createShip({
  shipId: 2,
  length: 5
});
var player1 = (0, _gameboard.default)();
var playerAI = (0, _gameboard.default)();
player1.placeShipInGameBoard({
  coordY: 4,
  coordX: 1,
  ship: ship1
});
playerAI.placeShipInGameBoard({
  coordY: 0,
  coordX: 5,
  ship: ship2,
  vertical: true
}); // player1.renderGameBoard();
// playerAI.renderGameBoard();
// console.log(player1.receiveAttack({ coordY: 4, coordX: 3 }));
// console.log(playerAI.receiveAttack({ coordY: 1, coordX: 5 }));

var ship3 = createShip({
  shipId: 3,
  length: 1
});
var ship4 = createShip({
  shipId: 4,
  length: 4
});
var ship5 = createShip({
  shipId: 5,
  length: 5
});
var ship6 = createShip({
  shipId: 6,
  length: 2
});
var ship7 = createShip({
  shipId: 7,
  length: 4
});
var ship8 = createShip({
  shipId: 8,
  length: 5
});
var ship9 = createShip({
  shipId: 9,
  length: 4
});
var ship10 = createShip({
  shipId: 10,
  length: 1
});
placeShipInGameBoard({
  coordY: 4,
  coordX: 1,
  ship: ship1
});
placeShipInGameBoard({
  coordY: 0,
  coordX: 5,
  ship: ship2,
  vertical: true
});
placeShipInGameBoard({
  coordY: 9,
  coordX: 0,
  ship: ship3
});
placeShipInGameBoard({
  coordY: 0,
  coordX: 0,
  ship: ship4,
  vertical: true
});
placeShipInGameBoard({
  coordY: 5,
  coordX: 9,
  ship: ship5,
  vertical: true
});
placeShipInGameBoard({
  coordY: 6,
  coordX: 0,
  ship: ship6
});
placeShipInGameBoard({
  coordY: 9,
  coordX: 2,
  ship: ship7
});
placeShipInGameBoard({
  coordY: 3,
  coordX: 7,
  ship: ship8,
  vertical: true
});
placeShipInGameBoard({
  coordY: 2,
  coordX: 6,
  ship: ship9,
  vertical: true
});
placeShipInGameBoard({
  coordY: 0,
  coordX: 8,
  ship: ship10
}); // game.renderGameBoard();
// game.receiveAttack({ coordY: 0, coordX: 0 });
// game.receiveAttack({ coordY: 1, coordX: 0 });
// game.receiveAttack({ coordY: 2, coordX: 0 });
// game.receiveAttack({ coordY: 3, coordX: 0 });
// game.receiveAttack({ coordY: 7, coordX: 9 });
// game.receiveAttack({ coordY: 0, coordX: 9 });
// game.receiveAttack({ coordY: 8, coordX: 0 });
// game.receiveAttack({ coordY: 7, coordX: 3 });
// game.receiveAttack({ coordY: 0, coordX: 8 });
// console.log(ship1.getLength());
// ship1.hit({ position: 1 });
// ship1.hit({ position: 2 });
// ship1.hit({ position: 3 });
// ship1.hit({ position: 4 });
// ship1.hit({ position: 5 });
// console.log(ship1.shipId);
// console.log(ship1.isSunk());
},{"./modules/gameboard":"modules/gameboard.js","./modules/game":"modules/game.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52279" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map