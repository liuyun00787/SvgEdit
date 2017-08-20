'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mouseStyle = {
  hand: {
    src: require('../../assets/hand.svg')
  },
  pen: {
    src: require('../../assets/pen.svg')
  }
};

function getSrc(type) {
  var src = '';
  switch (type) {
    case 'pen':
      {
        src = mouseStyle.pen.src;
        break;
      }
    case 'hand':
      {
        src = mouseStyle.hand.src;
        break;
      }
    default:
      {
        src = mouseStyle.pen.src;
      }
  }
  return src;
}

exports.default = function () {
  var role = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Broadcaster';
  var _ref = arguments[1];

  var className = _ref.class,
      _ref$__TYPE__ = _ref.__TYPE__,
      __TYPE__ = _ref$__TYPE__ === undefined ? 'pen' : _ref$__TYPE__,
      _ref$x = _ref.x,
      x = _ref$x === undefined ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 0 : _ref$y,
      _ref$w = _ref.w,
      w = _ref$w === undefined ? 25 : _ref$w,
      _ref$h = _ref.h,
      h = _ref$h === undefined ? 25 : _ref$h;

  var target = arguments[2];

  var src = getSrc(__TYPE__);
  var mouse = target.image(src, x, y, w, h).attr({
    __TYPE__: __TYPE__,
    class: (0, _classnames2.default)('mouse', className)
  });
  var group = target.group({
    class: 'mouseLayer'
  }).add(mouse);
  return {
    layer: group,
    handleSetPosition: function handleSetPosition(_ref2, callback) {
      var _ref2$x = _ref2.x,
          x = _ref2$x === undefined ? 0 : _ref2$x,
          _ref2$y = _ref2.y,
          y = _ref2$y === undefined ? 0 : _ref2$y,
          _ref2$w = _ref2.w,
          w = _ref2$w === undefined ? 25 : _ref2$w,
          _ref2$h = _ref2.h,
          h = _ref2$h === undefined ? 25 : _ref2$h;

      var info = {};
      if (role === 'Broadcaster') {
        info = {
          x: x - 1,
          y: y - h - 1,
          w: w,
          h: h
        };
      }
      if (role === 'Viewer') {
        info = {
          x: x,
          y: y,
          w: w,
          h: h
        };
      }
      mouse.attr(info);
      if (role === 'Broadcaster' && typeof callback === 'function') {
        callback(mouse.attr());
      }
      return mouse;
    },
    handleSetType: function handleSetType() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'pen';
      var callback = arguments[1];

      var src = getSrc(type);
      mouse.attr({
        __TYPE__: type,
        src: src
      });
      if (role === 'Broadcaster' && typeof callback === 'function') {
        callback(mouse.attr());
      }
    }
  };
};