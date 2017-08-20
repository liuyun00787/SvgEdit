'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var attrData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var target = arguments[1];
  var isInit = arguments[2];

  var path = void 0;
  if (isInit) {
    path = target.paper.path(attrData);
  } else {
    var __ID__ = attrData.__ID__,
        _attrData$className = attrData.className,
        className = _attrData$className === undefined ? '' : _attrData$className,
        _attrData$x = attrData.x,
        x = _attrData$x === undefined ? 0 : _attrData$x,
        _attrData$y = attrData.y,
        y = _attrData$y === undefined ? 0 : _attrData$y,
        _attrData$strokeWidth = attrData.strokeWidth,
        strokeWidth = _attrData$strokeWidth === undefined ? 5 : _attrData$strokeWidth,
        _attrData$stroke = attrData.stroke,
        stroke = _attrData$stroke === undefined ? '#f00' : _attrData$stroke,
        _attrData$fill = attrData.fill,
        fill = _attrData$fill === undefined ? 'rgba(0,0,0,0)' : _attrData$fill;

    path = target.paper.path({
      d: 'M' + x + ',' + y,
      stroke: stroke,
      strokeWidth: strokeWidth,
      fill: fill
    });
    path.attr({
      __TYPE__: 'path',
      class: (0, _classnames2.default)('pathItem', __ID__ || path.id, className)
    });
  }
  if (attrData.__ID__) {
    path.id = attrData.__ID__;
  }
  path.attr({
    __ID__: attrData.__ID__ || path.id
  });
  return {
    group: path
  };
};