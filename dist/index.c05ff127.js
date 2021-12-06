// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"79gfX":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "91f24895c05ff127";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"i8ewE":[function(require,module,exports) {
"use strict";
var _gameboard = _interopRequireDefault(require("./modules/gameboard"));
var _player = _interopRequireDefault(require("./modules/player"));
var _game = _interopRequireDefault(require("./modules/game"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
_game["default"].makePlayersGrid({
    playerType: 'human'
});
_game["default"].makePlayersGrid({
    playerType: 'computer'
}); // game.allowHumanToShotComputerShip();
_game["default"].gameLoop(); // player.initPlayers();
// const game = gameboardFactory();
var gameboard = (0, _gameboard["default"])();
var createShip = gameboard.createShip, placeShipInGameBoard = gameboard.placeShipInGameBoard;
var ship1 = createShip({
    shipId: 1,
    length: 5
});
var ship2 = createShip({
    shipId: 2,
    length: 5
});
var player1 = (0, _gameboard["default"])();
var playerAI = (0, _gameboard["default"])();
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

},{"./modules/gameboard":"9zGfS","./modules/player":"35AWQ","./modules/game":"aTo76"}],"9zGfS":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
var _ship = _interopRequireDefault(require("./ship"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
var gameboardFactory = function gameboardFactory() {
    var board = [
        [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ]
    ];
    var coordOfEachShipInGameboard = {
    };
    var listOfShipInGameboard = [];
    var listOfCoordAlreadyFill = []; // missed shot of opponent
    var listOfMissedShot = [];
    var listOfHittedShot = []; // first [] = y
    // second [] = x
    var renderGameBoard = function renderGameBoard() {
        return board;
    }; // console.table(board);
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
        if (isVertical) for(var i = 0; i < shipLength; i += 1){
            if (listOfCoordAlreadyFill.includes("".concat(coordY + i, "-").concat(coordX))) return false;
        }
        else for(var _i = 0; _i < shipLength; _i += 1){
            if (listOfCoordAlreadyFill.includes("".concat(coordY, "-").concat(coordX + _i))) return false;
        }
        return true;
    };
    var placeShipInGameBoard = function placeShipInGameBoard(_ref) {
        var coordY = _ref.coordY, coordX = _ref.coordX, ship = _ref.ship, _ref$vertical = _ref.vertical, vertical = _ref$vertical === void 0 ? false : _ref$vertical;
        if (ship === undefined) return 'ship not provided';
        if (coordY === undefined || coordX === undefined) return "one or more option to set ship ".concat(ship.shipId, " position not provided");
        var shipId = ship.shipId, getLength = ship.getLength;
        var shipCoordInGameboard = [];
        var shipLength = getLength();
        if (coordIsEmpty(coordY, coordX, shipLength, vertical)) {
            for(var i = 0; i < shipLength; i += 1)if (!vertical) {
                board[coordY][coordX + i] = "".concat(shipId);
                shipCoordInGameboard.push("".concat(coordY, "-").concat(coordX + i));
                listOfCoordAlreadyFill.push("".concat(coordY, "-").concat(coordX + i));
            } else {
                board[coordY + i][coordX] = "".concat(shipId);
                shipCoordInGameboard.push("".concat(coordY + i, "-").concat(coordX));
                listOfCoordAlreadyFill.push("".concat(coordY + i, "-").concat(coordX));
            }
            coordOfEachShipInGameboard[shipId] = shipCoordInGameboard;
            listOfShipInGameboard.push(ship); // for now, this return is only usefull for my test.
            return board;
        }
        return "impossible to place ship ".concat(shipId, " here, the place is already fill.");
    };
    var createShip = function createShip(_ref2) {
        var shipId = _ref2.shipId, length = _ref2.length;
        var newShip = (0, _ship["default"])({
            shipId: shipId,
            length: length
        });
        return newShip;
    };
    var allShipAreSunk = function allShipAreSunk() {
        return listOfShipInGameboard.every(function(ship) {
            return ship.isSunk();
        });
    };
    var receiveAttack = function receiveAttack(_ref3) {
        var coordY = _ref3.coordY, coordX = _ref3.coordX;
        // determines whether or not the attach hit a ship
        if (board[coordY][coordX]) {
            // and then sends the hits function to the correct ship
            var coordId = Number(board[coordY][coordX]);
            var shipHitted = listOfShipInGameboard.find(function(ship) {
                return ship.shipId === coordId;
            }); // determine where the ship was hit
            var positionHit = coordOfEachShipInGameboard[coordId].indexOf("".concat(coordY, "-").concat(coordX)); // add one because ship start to 1
            shipHitted.hit({
                position: positionHit + 1
            });
            var coordOfHittedShot = "".concat([
                coordY
            ], "-").concat([
                coordX
            ]);
            listOfHittedShot.push(coordOfHittedShot); // console.log(allShipAreSunk());
            return "ship ".concat(shipHitted.shipId, " was hit at position ").concat(positionHit + 1, " of ").concat(shipHitted.getLength());
        } // or record the coord of the missed shot
        var coordMissedShot = "".concat([
            coordY
        ], "-").concat([
            coordX
        ]);
        listOfMissedShot.push(coordMissedShot);
        return "shot missed at coord ".concat([
            coordY
        ], "-").concat([
            coordX
        ]);
    };
    return {
        createShip: createShip,
        renderGameBoard: renderGameBoard,
        renderShipInGame: renderShipInGame,
        placeShipInGameBoard: placeShipInGameBoard,
        receiveAttack: receiveAttack,
        renderListOfShipInGameBoard: renderListOfShipInGameBoard,
        renderListOfMissedShot: renderListOfMissedShot,
        renderListOfHittedShot: renderListOfHittedShot,
        allShipAreSunk: allShipAreSunk
    };
};
var _default = gameboardFactory;
exports["default"] = _default;

},{"./ship":"jXCsi"}],"jXCsi":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
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
    var shipId = _ref.shipId, length = _ref.length;
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
        if (isBetweenRange(position) && position <= shipLength) lives[position - 1] = 'x';
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
exports["default"] = _default;

},{}],"35AWQ":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
var _gameboard = _interopRequireDefault(require("./gameboard"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
var player = function() {
    var humanPlayer = (0, _gameboard["default"])();
    var AIPlayer = (0, _gameboard["default"])(); // const humanGameboard = humanPlayer.renderGameBoard();
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
    var renderHumanGameboardFilled = function renderHumanGameboardFilled() {
        return humanPlayer.renderGameBoard();
    };
    var renderComputerGameboardFilled = function renderComputerGameboardFilled() {
        return AIPlayer.renderGameBoard();
    };
    var makeRandomChoice = function makeRandomChoice() {
        var coordY = Math.floor(Math.random() * 10);
        var coordX = Math.floor(Math.random() * 10);
        return "".concat(coordY, "-").concat(coordX);
    };
    var humanTurn = function humanTurn(_ref) {
        var event = _ref.event, boxReceiveShot = _ref.boxReceiveShot;
        var computerGameboard = renderComputerGameboardFilled();
        var _event$target$dataset = event.target.dataset, coordY = _event$target$dataset.coordY, coordX = _event$target$dataset.coordX;
        var td = boxReceiveShot;
        if (playerAttack({
            coordY: coordY,
            coordX: coordX
        })) {
            td.textContent = computerGameboard[coordY][coordX]; // if (checkIfAllComputerShipAreSunk()) {
            //   alert('you won dude');
            // }
            return 'shot ok';
        }
        boxReceiveShot.classList.add('missed-shot');
        return 'shot missed';
    };
    var computerTurn = function computerTurn(human) {
        // missed shot for computer is listed in missedShot of human and vice versa
        var missedShot = human.renderListOfMissedShot();
        var hittedShot = human.renderListOfHittedShot();
        console.log("hitted ".concat(hittedShot));
        console.log("missed ".concat(missedShot));
        var shot = makeRandomChoice();
        while(missedShot.includes(shot) && hittedShot.includes(shot))shot = makeRandomChoice();
        var coord = shot.split('-');
        var _coord = _slicedToArray(coord, 2), coordY = _coord[0], coordX = _coord[1];
        human.receiveAttack({
            coordY: coordY,
            coordX: coordX
        });
    };
    var checkIfAllComputerShipAreSunk = function checkIfAllComputerShipAreSunk() {
        return AIPlayer.allShipAreSunk();
    };
    var playerAttack = function playerAttack(_ref2) {
        var coordY = _ref2.coordY, coordX = _ref2.coordX;
        var resultOfShot = AIPlayer.receiveAttack({
            coordY: coordY,
            coordX: coordX
        });
        return !resultOfShot.includes('missed');
    };
    var initPlayers = function initPlayers() {
        createAndPlaceShipPlayer(humanPlayer);
        createAndPlaceShipComputer(AIPlayer); // renderGameboardFilled();
    // console.log(humanPlayer.receiveAttack({ coordY: 0, coordX: 0 }));
    // console.log(humanPlayer.receiveAttack({ coordY: 0, coordX: 5 }));
    // console.log(AIPlayer.receiveAttack({ coordY: 0, coordX: 1 }));
    // console.log(humanPlayer.receiveAttack({ coordY: 0, coordX: 6 }));
    // console.log(humanPlayer.receiveAttack({ coordY: 0, coordX: 7 }));
    // computerTurn(humanPlayer);
    // computerTurn(humanPlayer);
    // computerTurn(humanPlayer);
    };
    return {
        initPlayers: initPlayers,
        renderHumanGameboardFilled: renderHumanGameboardFilled,
        renderComputerGameboardFilled: renderComputerGameboardFilled,
        playerAttack: playerAttack,
        humanTurn: humanTurn,
        checkIfAllComputerShipAreSunk: checkIfAllComputerShipAreSunk
    };
}();
var _default = player;
exports["default"] = _default;

},{"./gameboard":"9zGfS"}],"aTo76":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
var _player = _interopRequireDefault(require("./player"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
var game = function() {
    var gameOver = false;
    var isHumanTurn = true;
    var makePlayersGrid = function makePlayersGrid(_ref) {
        var playerType = _ref.playerType;
        // eslint-disable-next-line max-len
        _player["default"].initPlayers(); // initialize players, create 5 ships by players, and place it on gameboard
        var renderHumanGameboardFilled = _player["default"].renderHumanGameboardFilled, renderComputerGameboardFilled = _player["default"].renderComputerGameboardFilled;
        var gameboardForMakeGrid = null;
        var parentGrid = null;
        if (playerType === 'human') {
            gameboardForMakeGrid = renderHumanGameboardFilled();
            parentGrid = document.querySelector('.grody-human');
        } else {
            gameboardForMakeGrid = renderComputerGameboardFilled();
            parentGrid = document.querySelector('.grody-computer');
        }
        var dimensions = 10;
        var grid = new Array(dimensions);
        for(var i = 0; i < grid.length; i += 1){
            grid[i] = new Array(dimensions);
            var row = document.createElement('tr');
            for(var j = 0; j < grid[i].length; j += 1){
                var box = document.createElement('td');
                box.textContent = playerType === 'human' ? gameboardForMakeGrid[i][j] : '';
                box.setAttribute('id', "".concat(i).concat(j));
                box.dataset.coordY = i;
                box.dataset.coordX = j;
                row.appendChild(box);
            }
            parentGrid.appendChild(row);
        }
    };
    var allowHumanToShotComputerShip = function allowHumanToShotComputerShip() {
        var tds = document.querySelectorAll('.grody-computer td');
        tds.forEach(function(td) {
            td.addEventListener('click', function(e) {
                var result = _player["default"].humanTurn({
                    event: e,
                    boxReceiveShot: td
                });
                console.log(result);
            });
        });
    };
    var toggleClickableComputerBox = function toggleClickableComputerBox() {
        var tds = document.querySelectorAll('.grody-computer td');
        tds.forEach(function(td) {
            td.classList.toggle('disable');
        });
    };
    var checkIfGameIsOver = function checkIfGameIsOver() {
        var allShipAreSunk = _player["default"].checkIfAllComputerShipAreSunk();
        if (allShipAreSunk) {
            alert('game finished');
            gameOver = true;
        }
    };
    var gameLoop = function gameLoop() {
        var tds = document.querySelectorAll('.grody-computer td');
        var humanTurn = _player["default"].humanTurn;
        tds.forEach(function(td) {
            td.addEventListener('click', function(e) {
                var result = humanTurn({
                    event: e,
                    boxReceiveShot: td
                });
                console.log(result);
                toggleClickableComputerBox(); // send to checkIfGameIsOver the computer board
                checkIfGameIsOver();
                setTimeout(function() {
                    if (!gameOver) {
                        console.log('computer turn');
                        toggleClickableComputerBox(); // and send here the player board
                        checkIfGameIsOver();
                    }
                }, 200);
            });
        });
    };
    return {
        makePlayersGrid: makePlayersGrid,
        allowHumanToShotComputerShip: allowHumanToShotComputerShip,
        gameLoop: gameLoop
    };
}();
var _default = game;
exports["default"] = _default;

},{"./player":"35AWQ"}]},["79gfX","i8ewE"], "i8ewE", "parcelRequiree49a")

//# sourceMappingURL=index.c05ff127.js.map
