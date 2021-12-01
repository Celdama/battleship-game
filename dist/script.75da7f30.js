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
  var listOfCoordAlreadyFill = [];

  var renderGameBoard = function renderGameBoard() {
    // first [] = y
    // second [] = x
    console.table(board);
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

  return {
    createShip: createShip,
    renderGameBoard: renderGameBoard,
    renderShipInGame: renderShipInGame,
    placeShipInGameBoard: placeShipInGameBoard
  };
};

var _default = gameboardFactory; // DONE: able to place ships at specific coordinates by calling ship factory
// should have receiveAttack()
// take a pair of coordinates
// determines whether or not the attach hit a ship
// and then send the hit() to the correct ship
// or record the coordinates of the missed shot
// keep track of missed attacks so they can display them properly
// should be able to report wheter or not all of their ships have been sunk

exports.default = _default;
},{"./ship":"modules/ship.js"}],"script.js":[function(require,module,exports) {
"use strict";

var _gameboard = _interopRequireDefault(require("./modules/gameboard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = (0, _gameboard.default)();
var createShip = game.createShip,
    placeShipInGameBoard = game.placeShipInGameBoard;
var ship1 = createShip({
  shipId: 1,
  length: 5
});
var ship2 = createShip({
  shipId: 2,
  length: 3
});
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
});
game.renderGameBoard(); // console.log(ship1.getLength());
// ship1.hit({ position: 1 });
// ship1.hit({ position: 2 });
// ship1.hit({ position: 3 });
// ship1.hit({ position: 4 });
// ship1.hit({ position: 5 });
// console.log(ship1.shipId);
// console.log(ship1.isSunk());
},{"./modules/gameboard":"modules/gameboard.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53729" + '/');

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