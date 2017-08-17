'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mouseStyle = {
  hand: require('../../assets/hand.svg'),
  pen: require('../../assets/pen.svg')
};

exports.default = function (_ref, target) {
  var _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className,
      _ref$type = _ref.type,
      type = _ref$type === undefined ? 'pen' : _ref$type,
      _ref$x = _ref.x,
      x = _ref$x === undefined ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 0 : _ref$y,
      _ref$w = _ref.w,
      w = _ref$w === undefined ? 25 : _ref$w,
      _ref$h = _ref.h,
      h = _ref$h === undefined ? 25 : _ref$h;

  var src = '';
  switch (type) {
    case 'pen':
      {
        src = mouseStyle.pen;
        break;
      }
    case 'hand':
      {
        src = mouseStyle.hand;
        break;
      }
    default:
      {
        src = mouseStyle.pen;
      }
  }
  var mouse = target.image(src, x, y, w, h).attr({
    __TYPE__: type,
    class: (0, _classnames2.default)('mouse', className)
  });
  var mouseGroup = target.group({
    class: 'mouseGroup'
  });
  mouseGroup.add(mouse);
  return {
    mouseInfo: {
      __TYPE__: type,
      x: x - 1,
      y: y - h - 1,
      w: w,
      h: h
    },
    mouseGroup: mouseGroup,
    mouse: mouse,
    handleSetMouse: function handleSetMouse(_ref2, callback) {
      var _ref2$className = _ref2.className,
          className = _ref2$className === undefined ? '' : _ref2$className,
          _ref2$type = _ref2.type,
          type = _ref2$type === undefined ? 'pen' : _ref2$type,
          _ref2$x = _ref2.x,
          x = _ref2$x === undefined ? 0 : _ref2$x,
          _ref2$y = _ref2.y,
          y = _ref2$y === undefined ? 0 : _ref2$y,
          _ref2$w = _ref2.w,
          w = _ref2$w === undefined ? 25 : _ref2$w,
          _ref2$h = _ref2.h,
          h = _ref2$h === undefined ? 25 : _ref2$h;

      var info = {
        __TYPE__: type,
        class: (0, _classnames2.default)('mouse', className),
        x: x - 1,
        y: y - h - 1,
        w: w,
        h: h
      };
      mouse.attr(info);
      if (typeof callback === 'function') {
        callback(info);
      }
      return mouse;
    }
  };
};