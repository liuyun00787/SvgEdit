'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tools = require('../tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Snap.plugin(function (Snap, Element) {
  var elproto = Element.prototype;
  elproto.wBtoFront = function () {
    this.paper.select('.whiteBoardLayer').add(this);
  };
});

exports.default = function (_ref) {
  var _ref$role = _ref.role,
      role = _ref$role === undefined ? 'Broadcaster' : _ref$role,
      _ref$attr = _ref.attr,
      attr = _ref$attr === undefined ? {} : _ref$attr,
      target = _ref.target,
      onDeleteChange = _ref.onDeleteChange,
      onDrawChange = _ref.onDrawChange,
      textInput = _ref.textInput;

  var state = {
    downX: 0,
    downY: 0,
    selectItem: null,
    isDraw: true,
    isSelect: false,
    tools: 'path',
    config: {}
  };
  var group = target.group({
    class: (0, _classnames2.default)('whiteBoardLayer', attr.className)
  });

  var wbItemWrap = (0, _tools.createItemWrap)({ role: role, target: target, onDrawChange: onDrawChange });

  var whiteBoardBG = target.rect(0, 0, 0, 0).attr({ class: 'whiteBoardBG', fill: '#ffff00', fillOpacity: 0 }).attr({
    width: attr.width || 0,
    height: attr.height || 0
  });
  group.attr({
    __ID__: group.id
  });

  group.add(whiteBoardBG, wbItemWrap.group);
  group.mousedown(function (e) {
    if (target.select('.tools-setWrap')) {
      target.select('.tools-setWrap').remove();
    }
    if (role !== 'Broadcaster') return;
    var isDraw = state.isDraw,
        isSelect = state.isSelect,
        tools = state.tools;

    var _data = this.data(),
        isActive = _data.isActive;

    state.downX = e.offsetX;state.downY = e.offsetY;
    var pathLayer = void 0;
    var drawPath = void 0;
    if (!isDraw) {
      return;
    }
    if (isSelect) {
      return;
    }
    if (isActive) {
      return;
    }
    if (tools === 'color') {
      return;
    }
    this.data('isActive', true);
    if (tools === 'path') {
      pathLayer = (0, _tools.createPath)({
        attr: {
          x: e.offsetX,
          y: e.offsetY
        },
        target: target
      });
      drawPath = pathLayer.group;
    }
    if (tools === 'text') {
      pathLayer = (0, _tools.createText)({
        attr: {
          x: e.offsetX,
          y: e.offsetY
        },
        target: target,
        textInput: textInput,
        onDrawChange: onDrawChange,
        handleShow: function handleShow(path) {
          if (state.tools === 'select') {
            wbItemWrap.handleShow(path);
          }
        },
        handleHide: function handleHide() {
          wbItemWrap.handleHide();
        }
      });
      drawPath = pathLayer.group;
    }
    if (tools === 'rect') {
      pathLayer = (0, _tools.createRect)({
        attr: {
          x: e.offsetX,
          y: e.offsetY
        },
        target: target
      });
      drawPath = pathLayer.group;
    }
    if (tools === 'circle') {
      pathLayer = (0, _tools.createCircle)({
        attr: {
          x: e.offsetX,
          y: e.offsetY
        },
        target: target
      });
      drawPath = pathLayer.group;
    }
    drawPath.click(function () {
      if (state.isDraw) {
        return;
      }
      if (this.attr('__TYPE__') === 'text') {
        pathLayer.handeFocus();
      }
      wbItemWrap.handleShow(this);
      state.isDraw = false;
      state.isSelect = true;
      state.selectItem = this;
    });
    state.selectItem = drawPath;
    if (drawPath.attr('__TYPE__') === 'text') {
      var dd = Object.assign({}, state.config);
      dd.fill = dd.stroke;
      switch (Math.abs(dd.strokeWidth)) {
        case 5:
          {
            dd.fontSize = 16;
            break;
          }
        case 10:
          {
            dd.fontSize = 18;
            break;
          }
        case 15:
          {
            dd.fontSize = 20;
            break;
          }
        case 20:
          {
            dd.fontSize = 25;
            break;
          }
        default:
          {
            dd.fontSize = 16;
          }
      }
      delete dd.strokeWidth;
      delete dd.stroke;
      drawPath.attr(dd);
    } else {
      drawPath.attr(state.config);
    }
    group.add(drawPath);
    onDrawChange(drawPath);
  });
  group.mousemove(function (e) {
    if (role !== 'Broadcaster') return;
    var isDraw = state.isDraw,
        tools = state.tools;

    var _data2 = this.data(),
        isActive = _data2.isActive;

    if (!isDraw) {
      return;
    }
    if (!isActive) {
      return;
    }
    if (tools === 'color') {
      return;
    }
    if (tools === 'path') {
      var _state$selectItem$att = state.selectItem.attr(),
          d = _state$selectItem$att.d;

      state.selectItem.attr({ d: d += ',' + e.offsetX + ',' + e.offsetY });
    }
    if (tools === 'rect') {
      var X = e.offsetX - state.downX;
      var Y = e.offsetY - state.downY;
      state.selectItem.attr({
        width: X > 0 ? X : 1,
        height: Y > 0 ? Y : 1
      });
    }
    if (tools === 'circle') {
      var _X = e.offsetX - state.downX;
      var _Y = e.offsetY - state.downY;
      state.selectItem.attr({
        rx: _X > 0 ? _X : 1,
        ry: _Y > 0 ? _Y : 1
      });
    }
    onDrawChange(state.selectItem);
  });
  group.mouseup(function () {
    if (role !== 'Broadcaster') return;
    var isDraw = state.isDraw,
        tools = state.tools;

    if (isDraw) {
      // wbItemWrap.handleShow(state.selectItem);
      // state.isSelect = true;
    }
    if (tools === 'color') {
      return;
    }
    this.data('isActive', false);
  });
  group.dblclick(function () {
    if (role !== 'Broadcaster') return;
    wbItemWrap.handleHide();
    state.selectItem = null;
    state.isSelect = false;
    this.data('isActive', false);
  });
  return {
    layer: group,
    handleSetConfig: function handleSetConfig(config) {
      state.config = config;
    },
    handleSelectItem: function handleSelectItem(__ID__) {
      return group.select('.' + __ID__);
    },
    getSelectItem: function getSelectItem() {
      return state.selectItem;
    },
    getIsSelect: function getIsSelect() {
      return state.isSelect;
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
    handleDelete: function handleDelete(path, isArray) {
      group.data('isActive', false);
      if (path) {
        if (isArray) {
          path.map(function (item) {
            if (group.select('.' + item.__ID__)) {
              group.select('.' + item.__ID__).remove();
            }
          });
        } else if (state.isSelect) {
          if (group.select('.' + path.__ID__)) {
            group.select('.' + path.__ID__).remove();
          }
          state.selectItem = null;
          wbItemWrap.handleHide(path);
        }
      } else {
        group.clear();
        group.add(whiteBoardBG);
        state.selectItem = null;
        wbItemWrap.handleHide(path);
      }
      if (typeof onDeleteChange === 'function') {
        onDeleteChange(path);
      }
      state.isSelect = false;
    },
    handleSelect: function handleSelect() {
      var isSelect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      state.isDraw = !isSelect;
    },
    handleSetTools: function handleSetTools() {
      var tools = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'path';
      var config = arguments[1];

      if (tools === 'select') {
        state.tools = tools;
        state.isDraw = false;
        state.isSelect = true;
      } else {
        if (config) {
          state.config = JSON.parse(config);
        }
        state.isDraw = true;
        state.isSelect = false;
        state.tools = tools;
      }
    },
    handleDraw: function handleDraw(item) {
      var path = void 0;
      if (item.__TYPE__ === 'path') {
        path = (0, _tools.createPath)({
          attr: item,
          target: target
        });
      }
      if (item.__TYPE__ === 'text') {
        path = (0, _tools.createText)({
          attr: item,
          target: target,
          textInput: textInput,
          onDrawChange: onDrawChange,
          handleShow: function handleShow(path) {
            console.log(11111);
            if (state.tools === 'select') {
              wbItemWrap.handleShow(path);
            }
          }
        });
      }
      if (item.__TYPE__ === 'rect') {
        path = (0, _tools.createRect)({ attr: item, target: target });
      }
      if (item.__TYPE__ === 'circle') {
        path = (0, _tools.createCircle)({ attr: item, target: target });
      }
      if (item.__TYPE__ === 'image') {
        path = (0, _tools.createImage)({ attr: item, target: target });
      }
      path.group.click(function () {
        if (state.isDraw) {
          return;
        }
        state.isDraw = false;
        state.isSelect = true;
        wbItemWrap.handleShow(this);
        state.selectItem = this;
        if (this.attr('__TYPE__') === 'text') {
          path.handeFocus();
        }
      });
      group.add(path.group);
      state.selectItem = path.group;
      return path.group;
    },
    handleHideItem: wbItemWrap.handleHide
  };
};