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
    path = target.paper.ellipse(1, 1, 1, 1).attr(attrData);
  } else {
    var __ID__ = attrData.__ID__,
        _onChange = attrData.onChange,
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

    path = target.paper.ellipse(x, y, 1, 1);
    path.attr({
      __ID__: __ID__ || path.id,
      class: (0, _classnames2.default)('circleItem', className),
      stroke: stroke,
      strokeWidth: strokeWidth,
      fill: fill
    });
  }
  if (attrData.__ID__) {
    path.id = attrData.__ID__;
  }
  return {
    group: path,
    handleChange: function handleChange(_ref) {
      var width = _ref.width,
          height = _ref.height;

      var getBox = path.getBBox();
      path.attr({
        width: getBox.width += width,
        height: getBox.height += height
      });
      onChange();
    }
  };
};