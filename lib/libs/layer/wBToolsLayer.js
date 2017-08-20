'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mouseStyle = {
  hand: require('../../assets/icon-hand.svg'),
  pen: require('../../assets/icon-pen.svg'),
  text: require('../../assets/icon-T.svg'),
  rect: require('../../assets/icon-rect.svg'),
  circle: require('../../assets/icon-circle.svg'),
  select: require('../../assets/icon-select.svg'),
  drag: require('../../assets/icon-drag.svg'),
  color: require('../../assets/icon-color.svg'),
  clear: require('../../assets/icon-clear.svg')
};

exports.default = function () {
  var role = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Broadcaster';
  var _ref = arguments[1];
  var className = _ref.class,
      _ref$x = _ref.x,
      x = _ref$x === undefined ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 0 : _ref$y;
  var target = arguments[2];
  var _ref2 = arguments[3];
  var onDrag = _ref2.onDrag,
      onSelect = _ref2.onSelect,
      onDelete = _ref2.onDelete;

  var state = {
    isDrag: false
  };
  var origTransform = void 0;
  var group = target.group({
    class: (0, _classnames2.default)('wBToolsLayer', className),
    width: 355,
    height: 50,
    transform: 'matrix(1,0,0,1,' + x + ',' + y + ')'
  });
  if (role === 'Broadcaster') {
    group.drag(function (dx, dy) {
      if (!state.isDrag) return;

      var _attr = this.attr(),
          Tw = _attr.width,
          tH = _attr.height,
          x = _attr.x,
          y = _attr.y;

      var _target$attr = target.attr(),
          width = _target$attr.width,
          height = _target$attr.height;

      var _dx = dx;
      var _dy = dy;
      var transform = origTransform + (origTransform ? 'T' : 't') + [_dx, _dy];
      this.attr({
        transform: transform
      });
      if (typeof onDrag === 'function') {
        var t = this.transform().local;
        onDrag(t);
      }
    }, function () {
      if (!state.isDrag) return;
      origTransform = this.transform().local;
      if (typeof onDrag === 'function') {
        onDrag(origTransform);
      }
    });
  }
  group.attr({
    __ID__: group.id
  });
  var bg = target.rect(0, 0, 315, 45).attr({ class: 'toolsBG' });
  var fill = '#00ffff';
  var selectFill = '#f00';
  var pen = target.group(target.rect(0, 0, 45, 45).attr({ class: 'whiteBoardBG', fill: selectFill, fillOpacity: 1 }), target.image(mouseStyle.pen, 10, 10, 25, 25)).attr({
    __TYPE__: 'path',
    class: (0, _classnames2.default)('mouse', 'wbTool', 'path', className)
  }).click(select);
  var text = target.group(target.rect(45, 0, 45, 45).attr({ class: 'whiteBoardBG', fill: fill, fillOpacity: 1 }), target.image(mouseStyle.text, 55, 10, 25, 25)).attr({
    __TYPE__: 'text',
    class: (0, _classnames2.default)('mouse', 'wbTool', 'text', className)
  }).click(select);
  var rect = target.group(target.rect(90, 0, 45, 45).attr({ class: 'whiteBoardBG', fill: fill, fillOpacity: 1 }), target.image(mouseStyle.rect, 100, 10, 25, 25)).attr({
    __TYPE__: 'rect',
    class: (0, _classnames2.default)('mouse', 'wbTool', 'rect', className)
  }).click(select);
  var circle = target.group(target.rect(135, 0, 45, 45).attr({ class: 'whiteBoardBG', fill: fill, fillOpacity: 1 }), target.image(mouseStyle.circle, 145, 10, 25, 25)).attr({
    __TYPE__: 'circle',
    class: (0, _classnames2.default)('mouse', 'wbTool', 'circle', className)
  }).click(select);
  var selectI = target.group(target.rect(180, 0, 45, 45).attr({ class: 'whiteBoardBG', fill: fill, fillOpacity: 1 }), target.image(mouseStyle.select, 190, 10, 25, 25)).attr({
    __TYPE__: 'select',
    class: (0, _classnames2.default)('mouse', 'wbTool', 'select', className)
  }).click(select);
  var color = target.group(target.rect(225, 0, 45, 45).attr({ class: 'whiteBoardBG', fill: fill, fillOpacity: 1 }), target.image(mouseStyle.color, 235, 10, 25, 25)).attr({
    __TYPE__: 'color',
    class: (0, _classnames2.default)('mouse', 'wbTool', 'color', className)
  }).click(function () {});
  var clear = target.group(target.rect(270, 0, 45, 45).attr({ class: 'whiteBoardBG', fill: fill, fillOpacity: 1 }), target.image(mouseStyle.clear, 280, 10, 25, 25)).attr({
    __TYPE__: 'clear',
    class: (0, _classnames2.default)('mouse', 'wbTool', 'clear', className)
  }).mousedown(function () {
    this.select('.whiteBoardBG').attr({
      fill: selectFill
    });
    if (typeof onDelete === 'function') {
      onDelete();
    }
  }).mouseup(function () {
    this.select('.whiteBoardBG').attr({
      fill: fill
    });
  });
  var drag = target.group(target.rect(315, 0, 45, 45).attr({ class: 'whiteBoardBG', fill: fill, fillOpacity: 1 }), target.image(mouseStyle.drag, 325, 10, 25, 25)).mousedown(function () {
    state.isDrag = true;
    this.select('.whiteBoardBG').attr({
      fill: selectFill
    });
  }).mouseup(function () {
    state.isDrag = false;
    this.select('.whiteBoardBG').attr({
      fill: fill
    });
  });
  group.add(bg, pen, text, rect, circle, selectI, color, clear, drag);
  return {
    layer: group,
    handleReset: function handleReset() {
      origTransform = '';
      if (role !== 'Broadcaster') return;
      group.attr({
        transform: ''
      });
      group.selectAll('.wbTool .whiteBoardBG').attr({
        fill: fill
      });
      this.select('.whiteBoardBG .path').attr({
        fill: selectFill
      });

      var _attr2 = this.attr(),
          __TYPE__ = _attr2.__TYPE__;

      onSelect && onSelect('path');
    },
    handleSetPosition: function handleSetPosition(transform) {
      group.attr({
        transform: transform
      });
    },
    handleToolsChange: function handleToolsChange(tool) {
      if (role === 'Broadcaster') return;
      group.selectAll('.wbTool  .whiteBoardBG').attr({
        fill: fill
      });
      if (group.select('.' + tool)) {
        group.select('.' + tool + ' .whiteBoardBG').attr({
          fill: selectFill
        });
      }
    }
  };
  function select() {
    if (role !== 'Broadcaster') return;
    group.selectAll('.wbTool .whiteBoardBG').attr({
      fill: fill
    });
    this.select('.whiteBoardBG').attr({
      fill: selectFill
    });

    var _attr3 = this.attr(),
        __TYPE__ = _attr3.__TYPE__;

    onSelect && onSelect(__TYPE__);
  }
};