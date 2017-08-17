'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mouseLayer = require('./mouseLayer');

var _mouseLayer2 = _interopRequireDefault(_mouseLayer);

var _PPTLayer = require('./PPTLayer');

var _PPTLayer2 = _interopRequireDefault(_PPTLayer);

var _whiteBoardLayer = require('./whiteBoardLayer');

var _whiteBoardLayer2 = _interopRequireDefault(_whiteBoardLayer);

var _wBToolsLayer = require('./wBToolsLayer');

var _wBToolsLayer2 = _interopRequireDefault(_wBToolsLayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createMouseLayer: _mouseLayer2.default,
  createPPTLayer: _PPTLayer2.default,
  createWBToolsLayer: _wBToolsLayer2.default,
  createWhiteBoardLayer: _whiteBoardLayer2.default
};