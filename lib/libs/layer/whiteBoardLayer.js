'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tools = require('../tools');

var _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createSelector = _tools2.default.createSelector,
    createPath = _tools2.default.createPath,
    createText = _tools2.default.createText,
    createRect = _tools2.default.createRect,
    createCircle = _tools2.default.createCircle;

exports.default = function (_ref, target) {
  var onClear = _ref.onClear,
      onDrawChange = _ref.onDrawChange,
      _ref$role = _ref.role,
      role = _ref$role === undefined ? 'Broadcaster' : _ref$role,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? 0 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? 0 : _ref$height,
      _ref$items = _ref.items,
      items = _ref$items === undefined ? [] : _ref$items;

  var state = {
    downX: 0,
    downY: 0,
    selectItem: null,
    isDraw: true,
    isSelect: false,
    tools: 'path'
  };
  var group = target.group({
    class: (0, _classnames2.default)('whiteBoardLayer', className)
  });
  Snap.plugin(function (Snap, Element, Paper, glob) {
    var elproto = Element.prototype;
    elproto.wBtoFront = function () {
      group.add(this);
    };
    elproto.toBack = function () {
      this.appendTo(this.paper);
    };
  });
  var wbItemWrap = createWbItemWrap({ onDrawChange: onDrawChange, role: role }, target);

  var whiteBoardBG = target.rect(0, 0, 0, 0).attr({ class: 'whiteBoardBG', fill: '#ffff00', fillOpacity: 0 }).attr({
    width: width,
    height: height
  });
  group.attr({
    __ID__: group.id
  });

  group.add(whiteBoardBG, wbItemWrap.group);

  group.mousedown(function (e) {
    var _this = this;

    if (role !== 'Broadcaster') return;
    var isDraw = state.isDraw,
        isSelect = state.isSelect,
        tools = state.tools;

    var _data = this.data(),
        isActive = _data.isActive;

    state.downX = e.offsetX;state.downY = e.offsetY;
    var pathLayer = void 0;
    var drawPath = void 0;
    console.log('mousedown', isDraw, isSelect);
    if (!isDraw) {
      return;
    }
    if (isSelect) {
      return;
    }
    if (isActive) {
      return;
    }
    this.data('isActive', true);
    if (tools === 'path') {
      pathLayer = createPath({ x: e.offsetX, y: e.offsetY }, target);
      drawPath = pathLayer.group;
    }
    if (tools === 'text') {
      pathLayer = createText({
        text: '', x: e.offsetX, y: e.offsetY,
        onChange: function onChange(path, text) {
          wbItemWrap.handleShow(path, function () {
            return pathLayer.handeFocus(_this);
          });
          if (typeof onDrawChange === 'function') {
            onDrawChange(path);
          }
        }
      }, target);
      drawPath = pathLayer.group;
    }
    if (tools === 'rect') {
      pathLayer = createRect({
        x: e.offsetX, y: e.offsetY,
        onChange: function onChange(path) {
          // wbItemWrap.handleShow(path);
        }
      }, target);
      drawPath = pathLayer.group;
    }
    if (tools === 'circle') {
      pathLayer = createCircle({
        x: e.offsetX, y: e.offsetY,
        onChange: function onChange(path) {
          // wbItemWrap.handleShow(path);
        }
      }, target);
      drawPath = pathLayer.group;
    }
    drawPath.click(function () {
      var _this2 = this;

      if (state.isDraw) {
        return;
      };
      if (this.attr('class') === 'textItem') {
        pathLayer.handeFocus(this);
      }
      state.isDraw = false;
      state.isSelect = true;
      wbItemWrap.handleShow(this, this.attr('class') === 'textItem' ? function () {
        return pathLayer.handeFocus(_this2);
      } : null);
      state.selectItem = this;
      if (tools === 'text') {
        pathLayer.handeFocus(this);
      }
    });
    state.selectItem = drawPath;
    group.add(drawPath);
    onDrawChange(drawPath);
  });
  group.mousemove(function (e) {
    if (role !== 'Broadcaster') return;
    var isDraw = state.isDraw,
        tools = state.tools;

    var _data2 = this.data(),
        isActive = _data2.isActive;

    console.log('mousemove');
    if (!isDraw) {
      return;
    }
    if (!isActive) {
      return;
    }
    if (tools === 'path') {
      var _state$selectItem$att = state.selectItem.attr(),
          d = _state$selectItem$att.d;

      state.selectItem.attr({ d: d += ',' + e.offsetX + ',' + e.offsetY });
    }
    if (tools === 'rect') {
      var getBox = state.selectItem.getBBox();
      var X = e.offsetX - state.downX;
      var Y = e.offsetY - state.downY;
      state.selectItem.attr({
        width: X > 0 ? X : 0,
        height: Y > 0 ? Y : 0
      });
    }
    if (tools === 'circle') {
      var _getBox = state.selectItem.getBBox();
      var _X = e.offsetX - state.downX;
      var _Y = e.offsetY - state.downY;
      var r = (_X > 0 ? _X : 0) > (_Y > 0 ? _Y : 0) ? _X > 0 ? _X : 0 : _Y > 0 ? _Y : 0;
      state.selectItem.attr({
        rx: _X > 0 ? _X : 0,
        ry: _Y > 0 ? _Y : 0
      });
    }
    onDrawChange(state.selectItem);
  });
  group.mouseup(function (e) {
    if (role !== 'Broadcaster') return;
    var isDraw = state.isDraw;

    var _data3 = this.data(),
        isActive = _data3.isActive;

    console.log('mouseup');
    if (isDraw) {
      // wbItemWrap.handleShow(state.selectItem);
      // state.isSelect = true;
    }
    this.data('isActive', false);
  });
  group.dblclick(function (e) {
    if (role !== 'Broadcaster') return;
    var isSelect = state.isSelect;

    var _data4 = this.data(),
        isActive = _data4.isActive;

    console.log('dblclick');
    // if (isSelect) {
    wbItemWrap.handleHide();
    state.selectItem = null;
    state.isSelect = false;
    // }
  });
  return {
    group: group,
    getSelectItem: function getSelectItem() {
      return state.selectItem;
    },
    handleSetWH: function handleSetWH(_ref2) {
      var width = _ref2.width,
          height = _ref2.height;

      whiteBoardBG.attr({ width: width, height: height });
    },
    handleSetIsDraw: function handleSetIsDraw() {
      var isDraw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      state.isDraw = isDraw;
    },
    handleDelete: function handleDelete(path) {
      if (path) {
        if (state.isSelect) {
          path.remove();
          state.selectItem = null;
          // state.isSelect = false;
          // state.isDraw = true;
          wbItemWrap.handleHide(path);
        }
      } else {
        group.clear();
        group.add(whiteBoardBG);
        state.selectItem = null;
        // state.isSelect = false;
        // state.isDraw = true;
        wbItemWrap.handleHide(path);
      }
      if (typeof onClear === 'function') {
        onClear(path);
      }
    },
    handleSelect: function handleSelect() {
      var isSelect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      state.isDraw = !isSelect;
      // state.isSelect = isSelect;
    },
    handleSetTools: function handleSetTools() {
      var tools = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'path';

      // tools: 'path',
      // tools: 'text',
      // tools: 'rect',
      // tools: 'circle',
      if (tools === 'select') {
        state.isDraw = false;
        state.isSelect = true;
      } else {
        state.isDraw = true;
        state.isSelect = false;
        state.tools = tools;
      }
    },
    handleDraw: function handleDraw(item, isInit) {
      var path = void 0;
      if (item.class === 'pathItem') {
        path = createPath(item, target, isInit);
      }
      if (item.class === 'textItem') {
        item['onChange'] = function (g, a, cb) {
          wbItemWrap.handleShow(g, cb);
          if (typeof onDrawChange === 'function') {
            onDrawChange(g);
          }
        };
        path = createText(item, target, isInit);
        path.group.select('.textPape').attr(JSON.parse(item.textPathAttr || ''));
      }
      if (item.class === 'rectItem') {
        path = createRect(item, target, isInit);
      }
      if (item.class === 'circleItem') {
        path = createCircle(item, target, isInit);
      }
      path.group.click(function () {
        var _this3 = this;

        if (state.isDraw) {
          return;
        };
        state.isDraw = false;
        state.isSelect = true;
        wbItemWrap.handleShow(this, this.attr('class') === 'textItem' ? function () {
          return path.handeFocus(_this3);
        } : null);
        state.selectItem = this;
        if (this.attr('class') === 'textItem') {
          path.handeFocus(this);
        }
      });
      group.add(path.group);
      state.selectItem = path.group;
      return path.group;
    }
  };
};

function createWbItemWrap(_ref3, target) {
  var _ref3$role = _ref3.role,
      role = _ref3$role === undefined ? 'Broadcaster' : _ref3$role,
      onDrawChange = _ref3.onDrawChange,
      _ref3$className = _ref3.className,
      className = _ref3$className === undefined ? '' : _ref3$className,
      _ref3$width = _ref3.width,
      width = _ref3$width === undefined ? 0 : _ref3$width,
      _ref3$height = _ref3.height,
      height = _ref3$height === undefined ? 0 : _ref3$height;

  var state = {
    selectItem: '',
    hoverIn: false
  };
  var group = target.group({
    fillOpacity: role === 'Broadcaster' ? 0.6 : 0,
    transform: 'matrix(1,0,0,1,-10000,-10000)',
    class: (0, _classnames2.default)('WBWrapItem', className)
  }).drag(function (dx, dy) {
    var selectItem = state.selectItem;

    var transform = this.data('origTransform') + (this.data('origTransform') ? 'T' : 't') + [dx, dy];
    this.attr({
      transform: transform
    });
    var selectOrigTransform = selectItem.data('origTransform');
    selectItem.attr({
      transform: selectOrigTransform + (selectOrigTransform ? 'T' : 't') + [dx, dy]
    });
    if (typeof onDrawChange === 'function') {
      onDrawChange(selectItem);
    }
  }, function () {
    var selectItem = state.selectItem;

    this.data('origTransform', this.transform().local);
    selectItem.data('origTransform', selectItem.transform().local);
    if (typeof onDrawChange === 'function') {
      onDrawChange(selectItem);
    }
  });
  var square = target.rect(0, 0, 0, 0).attr({ class: 'square', fill: 'coral' });
  var square2 = target.rect(0, 0, 0, 0).attr({ class: 'square2', fill: 'coral' });
  var setRectLT = target.rect(20, 20, 10, 10).attr({ class: 'square2', fill: 'red' }).hover(function () {
    state.hoverIn = true;
    this.attr({
      fill: '#ff00ff'
    });
  }, function () {
    state.hoverIn = true;
    this.attr({
      fill: 'red'
    });
  });
  var setRectRT = target.rect(20, 20, 10, 10).attr({ class: 'square2', fill: 'red' }).hover(function () {
    state.hoverIn = true;
    this.attr({
      fill: '#ff00ff'
    });
  }, function () {
    state.hoverIn = true;
    this.attr({
      fill: 'red'
    });
  });
  var setRectRB = target.rect(20, 20, 10, 10).attr({ class: 'square2', fill: 'red' }).hover(function () {
    state.hoverIn = true;
    this.attr({
      fill: '#ff00ff'
    });
  }, function () {
    state.hoverIn = true;
    this.attr({
      fill: 'red'
    });
  });
  var setRectTB = target.rect(20, 20, 10, 10).attr({ class: 'square2', fill: 'red' }).hover(function () {
    state.hoverIn = true;
    this.attr({
      fill: '#ff00ff'
    });
  }, function () {
    state.hoverIn = true;
    this.attr({
      fill: 'red'
    });
  });

  group.add(square, square2, setRectLT, setRectRT, setRectRB, setRectTB);

  return {
    group: group,
    handleShow: function handleShow(path, callback) {
      if (role !== 'Broadcaster') return;

      var _path$getBBox = path.getBBox(),
          x = _path$getBBox.x,
          y = _path$getBBox.y,
          width = _path$getBBox.width,
          height = _path$getBBox.height;

      state.selectItem = path;
      group.attr({
        transform: ''
      }).click(function () {
        if (typeof callback === 'function') {
          callback();
        }
        group.unclick();
      });
      group.data('origTransform', path.transform().local).attr({ x: x, y: y, width: width, height: height }).wBtoFront();
      square2.attr({
        x: x - 10,
        y: y - 10,
        width: width + 20,
        height: height + 20
      });
      setRectLT.attr({ x: x - 15, y: y - 15, transform: '' });
      setRectLT.data('origTransform', '');
      setRectRT.attr({ x: x + width + 5, y: y - 15, transform: '' });
      setRectRT.data('origTransform', '');
      setRectTB.attr({ x: x - 15, y: y + height + 5, transform: '' });
      setRectTB.data('origTransform', '');
      setRectRB.attr({ x: x + width + 5, y: y + height + 5, transform: '' });
      setRectRB.data('origTransform', '');
    },
    handleHide: function handleHide() {
      if (role !== 'Broadcaster') return;
      group.attr({
        transform: 'matrix(1,0,0,1,-10000,-10000)'
      });
    },
    handleClick: function handleClick(cb) {
      if (role !== 'Broadcaster') return;
      if (typeof cb === 'function') {
        cb();
      }
    }
  };
}