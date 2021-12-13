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
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _game = require("./modules/game");
var _gameDefault = parcelHelpers.interopDefault(_game);
if (module.hot) module.hot.accept(()=>{
    window.location.reload();
});
const { gameLoop  } = _gameDefault.default;
gameLoop();

},{"./modules/game":"aTo76","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"aTo76":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _player = require("./player");
var _playerDefault = parcelHelpers.interopDefault(_player);
const game = (()=>{
    const HUMAN_PROFIL = 'human';
    const AI_PROFIL = 'computer';
    let gameOver = false;
    const displayHittedMessage = document.querySelector('.hitted-message');
    const makePlayersGrid = ({ playerType  })=>{
        const { initPlayer , initComputer , renderPlayersGameboardFilled ,  } = _playerDefault.default;
        let gameboardForMakeGrid = null;
        let parentGrid = null;
        if (playerType === HUMAN_PROFIL) {
            initPlayer(playerType);
            gameboardForMakeGrid = renderPlayersGameboardFilled(playerType);
            parentGrid = document.querySelector('.grody-human');
        } else {
            initComputer(playerType);
            gameboardForMakeGrid = renderPlayersGameboardFilled(playerType);
            parentGrid = document.querySelector('.grody-computer');
        }
        const dimensions = 10;
        const grid = new Array(dimensions);
        for(let i = 0; i < grid.length; i += 1){
            grid[i] = new Array(dimensions);
            const row = document.createElement('tr');
            for(let j = 0; j < grid[i].length; j += 1){
                const box = document.createElement('td');
                box.textContent = playerType === 'human' ? gameboardForMakeGrid[i][j] : '';
                box.setAttribute('id', `${i}${j}`);
                box.dataset.coordY = i;
                box.dataset.coordX = j;
                row.appendChild(box);
            }
            parentGrid.appendChild(row);
        }
    };
    const toggleClickableComputerBox = ()=>{
        const computerBox = document.querySelectorAll('.grody-computer td');
        computerBox.forEach((box)=>{
            box.classList.toggle('disable');
        });
    };
    const checkIfGameIsOver = (isAllShipsSunk)=>{
        if (isAllShipsSunk) {
            alert('game finished');
            gameOver = true;
        }
    };
    const sleep = (ms)=>new Promise((resolve)=>{
            setTimeout(resolve, ms);
        })
    ;
    const asyncComputerTurn = async ()=>{
        const { computerTurn , checkIfAllPlayerShipAreSunk , getNameOfHittedShip  } = _playerDefault.default;
        await sleep(2000);
        if (!gameOver) {
            const coordComputerShot = computerTurn();
            const boxShottedByComputer = document.getElementById(`${coordComputerShot}`);
            console.log(`look at this, this is a computer shot at coord ${coordComputerShot}`);
            if (boxShottedByComputer.textContent) {
                const id = boxShottedByComputer.textContent;
                const hittedShipName = getNameOfHittedShip(id, HUMAN_PROFIL);
                displayHittedMessage.textContent = `Computer have hit your ${hittedShipName}`;
                boxShottedByComputer.style.color = 'red';
            } else {
                displayHittedMessage.textContent = 'The enemy fires a shot into your waters .... and misses.';
                const circle = document.createElement('div');
                circle.classList.add('missed-circle');
                boxShottedByComputer.appendChild(circle);
            // boxShottedByComputer.classList.add('missed-shot');
            }
            toggleClickableComputerBox();
        }
        checkIfGameIsOver(checkIfAllPlayerShipAreSunk(HUMAN_PROFIL));
    };
    const NotifyIfShipWasSunk = ({ shipIsSunk , shipId , shipName  })=>{
        if (shipIsSunk) {
            const boxSunks = document.querySelectorAll(`.ship-${shipId}`);
            boxSunks.forEach((box)=>{
                box.classList.add('ship-sunk');
            });
            displayHittedMessage.textContent = `Congrats your sunk ${shipName}`;
            const shipyardSunk = document.querySelector(`#computer-ship-${shipId}`);
            shipyardSunk.style.color = 'red';
            shipyardSunk.style.textDecoration = 'line-through';
        }
    };
    const gameLoop = ()=>{
        makePlayersGrid({
            playerType: 'human'
        });
        makePlayersGrid({
            playerType: 'computer'
        });
        const computerBox = document.querySelectorAll('.grody-computer td');
        const { humanTurn , checkIfAllPlayerShipAreSunk , checkIfComputerShipIsSunk , getNameOfHittedShip ,  } = _playerDefault.default;
        computerBox.forEach((box)=>{
            box.addEventListener('click', (event)=>{
                displayHittedMessage.textContent = '';
                const hitedShipId = humanTurn({
                    event,
                    boxReceiveShot: box
                });
                if (hitedShipId) {
                    const hittedShipName = getNameOfHittedShip(hitedShipId, AI_PROFIL);
                    displayHittedMessage.textContent = `you have hit the ${hittedShipName}`;
                    const shipShotedWasSunk = checkIfComputerShipIsSunk(hitedShipId);
                    NotifyIfShipWasSunk({
                        shipIsSunk: shipShotedWasSunk,
                        shipId: hitedShipId,
                        shipName: hittedShipName
                    });
                } else displayHittedMessage.textContent = 'You fires a shot into enemy waters .... and misses.';
                toggleClickableComputerBox();
                checkIfGameIsOver(checkIfAllPlayerShipAreSunk(AI_PROFIL));
                asyncComputerTurn();
            });
        });
    };
    return {
        gameLoop
    };
})();
exports.default = game;

},{"./player":"35AWQ","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"35AWQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _gameboard = require("../factory/gameboard");
var _gameboardDefault = parcelHelpers.interopDefault(_gameboard);
const player = (()=>{
    const HUMAN_PROFIL = 'human';
    const AI_PROFIL = 'computer';
    const humanPlayer = _gameboardDefault.default();
    const computerPlayer = _gameboardDefault.default();
    const createShips = ({ profil  })=>{
        const { createShip  } = profil === HUMAN_PROFIL ? humanPlayer : computerPlayer;
        const ship1 = createShip({
            name: 'carrier',
            shipId: 1,
            length: 5
        });
        const ship2 = createShip({
            name: 'battleship',
            shipId: 2,
            length: 4
        });
        const ship3 = createShip({
            name: 'destroyer',
            shipId: 3,
            length: 3
        });
        const ship4 = createShip({
            name: 'submarine',
            shipId: 4,
            length: 3
        });
        const ship5 = createShip({
            name: 'rescued boat',
            shipId: 5,
            length: 1
        });
        const ship6 = createShip({
            name: 'patrol boat',
            shipId: 6,
            length: 2
        });
        return [
            ship1,
            ship2,
            ship3,
            ship4,
            ship5,
            ship6
        ];
    };
    const getRandomShipCoord = (shipLength, vertical)=>{
        let coordY = Math.floor(Math.random() * 10);
        let coordX = Math.floor(Math.random() * 10);
        const excesHorizontal = coordX + shipLength;
        const excesVertical = coordY + shipLength;
        if (vertical) {
            if (coordY + shipLength > 10) coordY -= excesVertical - 10;
        }
        if (!vertical) {
            if (coordX + shipLength > 10) coordX -= excesHorizontal - 10;
        }
        return `${coordY}-${coordX}`;
    };
    const setShipPlace = ({ profil , ship  })=>{
        const { placeShipInGameboard  } = profil === HUMAN_PROFIL ? humanPlayer : computerPlayer;
        const shipLength = ship.getLength();
        const randomVertical = Math.round(Math.random());
        const randomCoord = getRandomShipCoord(shipLength, !!randomVertical);
        const coord = randomCoord.split('-');
        const coordY = Number(coord[0]);
        const coordX = Number(coord[1]);
        const resultPlacement = placeShipInGameboard({
            coordY,
            coordX,
            ship,
            vertical: !!randomVertical
        });
        return resultPlacement;
    };
    const placeShips = ({ profil , ships  })=>{
        const shipNotPlaced = [];
        ships.forEach((ship)=>{
            const isShipPlaced = setShipPlace({
                profil,
                ship
            });
            if (!isShipPlaced) shipNotPlaced.push(ship);
        });
        while(shipNotPlaced.length !== 0)shipNotPlaced.forEach((ship)=>{
            const result = setShipPlace({
                profil,
                ship
            });
            const id = ship.shipId;
            if (result) {
                const index = shipNotPlaced.findIndex((item)=>item.shipId === id
                );
                shipNotPlaced.splice(index, 1);
            }
        });
    };
    const makeRandomChoiceForComputerShot = ()=>{
        const coordY = Math.floor(Math.random() * 10);
        const coordX = Math.floor(Math.random() * 10);
        return `${coordY}-${coordX}`;
    };
    const humanAttack = ({ coordY , coordX  })=>{
        const { receiveAttack  } = computerPlayer;
        const resultOfShot = receiveAttack({
            coordY,
            coordX
        });
        return !resultOfShot.includes('missed');
    };
    const computerAttack = ({ coordY , coordX  })=>{
        const { receiveAttack  } = humanPlayer;
        const resultOfShot = receiveAttack({
            coordY,
            coordX
        });
        return !resultOfShot.includes('missed');
    };
    const renderPlayersGameboardFilled = (profil)=>{
        const { renderGameboard  } = profil === HUMAN_PROFIL ? humanPlayer : computerPlayer;
        return renderGameboard();
    };
    const humanTurn = ({ event , boxReceiveShot  })=>{
        const computerGameboard = renderPlayersGameboardFilled(AI_PROFIL);
        const { coordY , coordX  } = event.target.dataset;
        const box = boxReceiveShot;
        const circle = document.createElement('div');
        if (humanAttack({
            coordY,
            coordX
        })) {
            const boxTextContent = computerGameboard[coordY][coordX];
            circle.classList.add('target-circle');
            box.classList.add(`ship-${boxTextContent}`);
            box.appendChild(circle);
            box.classList.add('disable-click');
            return boxTextContent;
        }
        circle.classList.add('missed-circle');
        box.appendChild(circle);
        box.classList.add('disable-click');
        return false;
    };
    const getNameOfHittedShip = (id, profil)=>{
        const { renderListOfShipInGameboard  } = profil === HUMAN_PROFIL ? humanPlayer : computerPlayer;
        const listOfShips = renderListOfShipInGameboard();
        const hittedShip = listOfShips.find((ship)=>ship.shipId === Number(id)
        );
        return hittedShip.name;
    };
    const computerTurn = ()=>{
        const { renderListOfOpponentMissedShot , renderListOfOpponentHittedShot  } = humanPlayer;
        const missedShot = renderListOfOpponentMissedShot();
        const hittedShot = renderListOfOpponentHittedShot();
        let shot = makeRandomChoiceForComputerShot();
        while(missedShot.includes(shot) || hittedShot.includes(shot))shot = makeRandomChoiceForComputerShot();
        const coord = shot.split('-');
        const [coordY, coordX] = coord;
        computerAttack({
            coordY,
            coordX
        });
        return `${coordY}${coordX}`;
    };
    const checkIfAllPlayerShipAreSunk = (profil)=>{
        const { allShipAreSunk  } = profil === HUMAN_PROFIL ? humanPlayer : computerPlayer;
        return allShipAreSunk();
    };
    const checkIfComputerShipIsSunk = (shipId)=>{
        const { renderListOfShipInGameboard  } = computerPlayer;
        const allComputerShip = renderListOfShipInGameboard();
        const id = Number(shipId);
        const hitedShip = allComputerShip.find((ship)=>ship.shipId === id
        );
        return hitedShip.isSunk();
    };
    const initPlayer = (profil)=>{
        placeShips({
            profil,
            ships: createShips({
                profil
            })
        });
    };
    const initComputer = (profil)=>{
        placeShips({
            profil,
            ships: createShips({
                profil
            })
        });
        console.table(computerPlayer.renderGameboard());
    };
    return {
        initPlayer,
        initComputer,
        renderPlayersGameboardFilled,
        checkIfComputerShipIsSunk,
        computerTurn,
        humanTurn,
        checkIfAllPlayerShipAreSunk,
        getNameOfHittedShip
    };
})();
exports.default = player;

},{"../factory/gameboard":"5KOy8","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"5KOy8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _ship = require("./ship");
var _shipDefault = parcelHelpers.interopDefault(_ship);
const gameboardFactory = ()=>{
    const gameboard = [
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
        ], 
    ];
    const coordOfEachShipInGameboard = {
    };
    const listOfShipInGameboard = [];
    const listOfCoordAlreadyFill = [];
    const listOfOpponentMissedShot = [];
    const listOfOpponentHittedShot = [];
    const renderGameboard = ()=>gameboard
    ;
    const renderListOfOpponentMissedShot = ()=>listOfOpponentMissedShot
    ;
    const renderListOfOpponentHittedShot = ()=>listOfOpponentHittedShot
    ;
    const renderListOfShipInGameboard = ()=>listOfShipInGameboard
    ;
    const renderShipInGame = ()=>console.log(coordOfEachShipInGameboard)
    ;
    const isCoordEmpty = ({ coordY , coordX , shipLength , vertical ,  })=>{
        if (vertical) for(let i = 0; i < shipLength; i += 1){
            if (listOfCoordAlreadyFill.includes(`${coordY + i}-${coordX}`)) return false;
        }
        else for(let i1 = 0; i1 < shipLength; i1 += 1){
            if (listOfCoordAlreadyFill.includes(`${coordY}-${coordX + i1}`)) return false;
        }
        return true;
    };
    const placeShipInGameboard = ({ coordY , coordX , ship , vertical =false ,  })=>{
        if (ship === undefined) return 'ship not provided';
        if (coordY === undefined || coordX === undefined) return `one or more option to set ship ${ship.shipId} position not provided`;
        const { shipId , getLength  } = ship;
        const shipCoordInGameboard = [];
        const shipLength = getLength();
        if (isCoordEmpty({
            coordY,
            coordX,
            shipLength,
            vertical
        })) {
            for(let i = 0; i < shipLength; i += 1)if (!vertical) {
                gameboard[coordY][coordX + i] = `${shipId}`;
                shipCoordInGameboard.push(`${coordY}-${coordX + i}`);
                listOfCoordAlreadyFill.push(`${coordY}-${coordX + i}`);
            } else {
                gameboard[coordY + i][coordX] = `${shipId}`;
                shipCoordInGameboard.push(`${coordY + i}-${coordX}`);
                listOfCoordAlreadyFill.push(`${coordY + i}-${coordX}`);
            }
            coordOfEachShipInGameboard[shipId] = shipCoordInGameboard;
            listOfShipInGameboard.push(ship);
            // for now, this return is only usefull for my test.
            return true;
        }
        return false;
    };
    const createShip = ({ name , shipId , length  })=>{
        const newShip = _shipDefault.default({
            name,
            shipId,
            length
        });
        return newShip;
    };
    const allShipAreSunk = ()=>listOfShipInGameboard.every((ship)=>ship.isSunk()
        )
    ;
    const receiveAttack = ({ coordY , coordX  })=>{
        if (gameboard[coordY][coordX]) {
            const coordId = Number(gameboard[coordY][coordX]);
            const shipHitted = listOfShipInGameboard.find((ship)=>ship.shipId === coordId
            );
            const positionHit = coordOfEachShipInGameboard[coordId].indexOf(`${coordY}-${coordX}`);
            shipHitted.hit({
                position: positionHit + 1
            });
            const coordOfHittedShot = `${[
                coordY
            ]}-${[
                coordX
            ]}`;
            listOfOpponentHittedShot.push(coordOfHittedShot);
            return `ship ${shipHitted.shipId} was hit at position ${positionHit + 1} of ${shipHitted.getLength()}`;
        }
        const coordMissedShot = `${[
            coordY
        ]}-${[
            coordX
        ]}`;
        listOfOpponentMissedShot.push(coordMissedShot);
        return `shot missed at coord ${[
            coordY
        ]}-${[
            coordX
        ]}`;
    };
    return {
        createShip,
        renderListOfShipInGameboard,
        renderGameboard,
        renderShipInGame,
        placeShipInGameboard,
        receiveAttack,
        renderListOfOpponentMissedShot,
        renderListOfOpponentHittedShot,
        allShipAreSunk
    };
};
exports.default = gameboardFactory;

},{"./ship":"hAtlY","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"hAtlY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const SHIP_MAX_LENGTH = 5;
const SHIP_MIN_LENGTH = 1;
const setShipLength = (length)=>{
    if (length > SHIP_MAX_LENGTH) return SHIP_MAX_LENGTH;
    if (length < SHIP_MIN_LENGTH) return SHIP_MIN_LENGTH;
    return length;
};
const isBetweenRange = (position)=>SHIP_MIN_LENGTH <= position && position <= SHIP_MAX_LENGTH
;
const shipFactory = ({ name , shipId , length  })=>{
    const lives = [];
    const shipLength = setShipLength(length);
    const getLength = ()=>shipLength
    ;
    const getLives = ()=>[
            ...lives
        ]
    ;
    const isSunk = ()=>lives.join('').length === shipLength
    ;
    function hit({ position  }) {
        const self = this;
        if (isBetweenRange(position) && position <= shipLength) lives[position - 1] = 'x';
        return self;
    }
    return {
        name,
        shipId,
        getLength,
        getLives,
        isSunk,
        hit
    };
};
exports.default = shipFactory;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ciiiV":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["79gfX","i8ewE"], "i8ewE", "parcelRequiree49a")

//# sourceMappingURL=index.c05ff127.js.map
