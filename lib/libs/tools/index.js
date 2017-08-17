'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mouse = require('./mouse');

var _mouse2 = _interopRequireDefault(_mouse);

var _selector = require('./selector');

var _selector2 = _interopRequireDefault(_selector);

var _path = require('./path');

var _path2 = _interopRequireDefault(_path);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _circle = require('./circle');

var _circle2 = _interopRequireDefault(_circle);

var _rect = require('./rect');

var _rect2 = _interopRequireDefault(_rect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createMouse: _mouse2.default,
  createSelector: _selector2.default,
  createPath: _path2.default,
  createText: _text2.default,
  createCircle: _circle2.default,
  createRect: _rect2.default
};