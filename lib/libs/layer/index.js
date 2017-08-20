'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWhiteBoardLayer = exports.createWBToolsLayer = exports.createPPTLayer = exports.createMouseLayer = undefined;

var _mouseLayer = require('./mouseLayer');

var _mouseLayer2 = _interopRequireDefault(_mouseLayer);

var _PPTLayer = require('./PPTLayer');

var _PPTLayer2 = _interopRequireDefault(_PPTLayer);

var _whiteBoardLayer = require('./whiteBoardLayer');

var _whiteBoardLayer2 = _interopRequireDefault(_whiteBoardLayer);

var _wBToolsLayer = require('./wBToolsLayer');

var _wBToolsLayer2 = _interopRequireDefault(_wBToolsLayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createMouseLayer = exports.createMouseLayer = _mouseLayer2.default;
var createPPTLayer = exports.createPPTLayer = _PPTLayer2.default;
var createWBToolsLayer = exports.createWBToolsLayer = _wBToolsLayer2.default;
var createWhiteBoardLayer = exports.createWhiteBoardLayer = _whiteBoardLayer2.default;