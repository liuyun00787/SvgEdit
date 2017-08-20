'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRect = exports.createCircle = exports.createText = exports.createPath = undefined;

var _path = require('./path');

var _path2 = _interopRequireDefault(_path);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _circle = require('./circle');

var _circle2 = _interopRequireDefault(_circle);

var _rect = require('./rect');

var _rect2 = _interopRequireDefault(_rect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createPath = exports.createPath = _path2.default;
var createText = exports.createText = _text2.default;
var createCircle = exports.createCircle = _circle2.default;
var createRect = exports.createRect = _rect2.default;