'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Viewer = exports.Broadcaster = undefined;

require('imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg-min.js');

var _videoMin = require('imports-loader?this=>window,fix=>module.exports=0!video.js/dist/video.min.js');

var _videoMin2 = _interopRequireDefault(_videoMin);

require('../node_modules/video.js/dist/video-js.min.css');

var _index = require('./libs/Broadcaster/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./libs/Viewer/index');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Broadcaster = exports.Broadcaster = (0, _index2.default)(_videoMin2.default);
// import 'video.js/dist/video-js.min.css';
var Viewer = exports.Viewer = (0, _index4.default)(_videoMin2.default);