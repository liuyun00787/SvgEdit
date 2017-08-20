'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _mousetrap = require('mousetrap');

var _mousetrap2 = _interopRequireDefault(_mousetrap);

var _snapSvg = require('imports?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js');

var _snapSvg2 = _interopRequireDefault(_snapSvg);

var _layer = require('./layer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Broadcaster = function (_React$Component) {
  _inherits(Broadcaster, _React$Component);

  function Broadcaster(props) {
    _classCallCheck(this, Broadcaster);

    var _this = _possibleConstructorReturn(this, (Broadcaster.__proto__ || Object.getPrototypeOf(Broadcaster)).call(this, props));

    _this.init = function () {
      try {
        var that = _this;
        var role = _this.role;
        var svg = _this.svg = (0, _snapSvg2.default)(_this.svgWrap);
        // ppt层
        _this.PPTLayer = (0, _layer.createPPTLayer)(role, {}, svg);
        // 白板层
        var _svg$node = svg.node,
            clientWidth = _svg$node.clientWidth,
            clientHeight = _svg$node.clientHeight;

        _this.whiteBoardLayer = (0, _layer.createWhiteBoardLayer)(role, {
          width: clientWidth,
          height: clientHeight
        }, svg, {
          onDrawChange: function onDrawChange(items) {
            var onDrawChange = that.props.onDrawChange;

            if (typeof onDrawChange === 'function') {
              onDrawChange(items);
            }
          },

          onDelete: function onDelete(item) {
            var onDelete = that.props.onDelete;

            if (typeof onDelete === 'function') {
              onDelete(item);
            }
          }
        });
        // 白板工具层
        _this.wBToolsLayer = (0, _layer.createWBToolsLayer)(role, {
          x: 0,
          y: 0
        }, svg, {
          onSelect: function onSelect(tool) {
            var onWbToolsClick = that.props.onWbToolsClick;
            var whiteBoardLayer = that.whiteBoardLayer;

            whiteBoardLayer.handleSetTools(tool);
            if (typeof onWbToolsClick === 'function') {
              onWbToolsClick(tool);
            }
          },
          onDelete: function onDelete() {
            var whiteBoardLayer = that.whiteBoardLayer;

            if (whiteBoardLayer) {
              if (whiteBoardLayer.getIsSelect()) {
                whiteBoardLayer.handleDelete(whiteBoardLayer.getSelectItem().attr());
              }
            }
          },
          onDrag: function onDrag(transform) {
            var onWbToolsDrag = that.props.onWbToolsDrag;

            if (typeof onWbToolsDrag === 'function') {
              onWbToolsDrag(transform);
            }
          }
        });
        // 鼠标层
        _this.mouseLayer = (0, _layer.createMouseLayer)(role, {
          class: 'mouse-' + role
        }, svg);
        _this.keyboard('bind');
        // 初始画笔items
        _this.initDraw();
        _this.initMouse();
        _this.initWBtools();
      } catch (e) {
        console.log(e);
      }
    };

    _this.initDraw = function () {
      if (_this.whiteBoardLayer) {
        var _this$props$items = _this.props.items,
            items = _this$props$items === undefined ? [] : _this$props$items;
        var handleDraw = _this.whiteBoardLayer.handleDraw;

        for (var i = 0; i < items.length; i += 1) {
          var newItem = handleDraw(items[i], true);
          _this.historyItems.push(newItem);
          _this.PrevItems.push(items[i]);
        }
      }
    };

    _this.initMouse = function () {
      if (_this.mouseLayer) {
        var _this$props$mouseInfo = _this.props.mouseInfo,
            mouseInfo = _this$props$mouseInfo === undefined ? {} : _this$props$mouseInfo;
        var handleSetPosition = _this.mouseLayer.handleSetPosition;

        handleSetPosition({
          x: mouseInfo.x || -1000,
          y: mouseInfo.y || -1000
        });
      }
    };

    _this.initWBtools = function () {
      if (_this.wBToolsLayer) {
        var _this$props$wBToolsIn = _this.props.wBToolsInfo,
            wBToolsInfo = _this$props$wBToolsIn === undefined ? {} : _this$props$wBToolsIn;
        var _this$wBToolsLayer = _this.wBToolsLayer,
            handleSetPosition = _this$wBToolsLayer.handleSetPosition,
            handleToolsChange = _this$wBToolsLayer.handleToolsChange;

        if (wBToolsInfo.transform) {
          handleSetPosition(wBToolsInfo.transform);
        }
        if (wBToolsInfo.tool) {
          handleToolsChange(wBToolsInfo.tool);
        }
      }
    };

    _this.keyboard = function (type) {
      var that = _this;
      var whiteBoardLayer = _this.whiteBoardLayer;
      var whiteBoardGroup = _this.groupItems.whiteBoardGroup;

      if (type === 'bind') {
        // 绑定鼠标事件
        _this.svg.mousemove(function (e) {
          var onMouseChange = _this.props.onMouseChange;
          var handleSetPosition = _this.mouseLayer.handleSetPosition;

          handleSetPosition({ x: e.offsetX, y: e.offsetY }, onMouseChange);
        });
        _mousetrap2.default.bind('backspace', function () {
          if (whiteBoardLayer.getIsSelect()) {
            whiteBoardLayer.handleDelete(whiteBoardLayer.getSelectItem().attr());
          }
        }, 'keydown');
        _mousetrap2.default.bind('shift+backspace', function () {
          whiteBoardLayer.handleDelete();
        }, 'keydown');
        _mousetrap2.default.bind('space', function () {
          whiteBoardLayer.handleSelect(true);
        }, 'keydown');
        _mousetrap2.default.bind('space', function () {
          whiteBoardLayer.handleSelect(false);
        }, 'keyup');
      }
      if (type === 'unbuild') {
        _mousetrap2.default.unbind('backspace');
        _mousetrap2.default.unbind('shift+backspace');
        _mousetrap2.default.unbind('space');
        window.removeEventListener('resize');
        whiteBoardGroup.unmousedown();
        whiteBoardGroup.unmousemove();
        whiteBoardGroup.unmouseup();
      }
    };

    _this.role = 'Broadcaster';
    _this.state = {};
    _this.historyItems = [];
    _this.groupItems = {};
    _this.PrevItems = [];
    _this.selectItem = null;
    return _this;
  }

  _createClass(Broadcaster, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.timeoutInit = setTimeout(function () {
        _this2.init();
      }, 100);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          width = _props.width,
          height = _props.height;
      var NWidth = nextProps.width,
          NHeight = nextProps.height;

      if (NWidth !== width || NHeight !== height) {
        if (this.whiteBoardLayer) {
          this.whiteBoardLayer.handleSetWH({
            width: NWidth,
            height: NHeight
          });
        }
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var _props2 = this.props,
          width = _props2.width,
          height = _props2.height,
          className = _props2.className;
      var NWidth = nextProps.width,
          NHeight = nextProps.height,
          NClassName = nextProps.className;

      if (NWidth !== width || NHeight !== height || NClassName !== className) return true;
      return false;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.keyboard('unbuild');
      if (this.timeoutInit) {
        this.timeoutInit = null;
        clearTimeout(this.timeoutInit);
      }
    }
    /**
     * 初始化
     * @returns {*}
     */

    /**
     * 快捷键
     * @param type 绑定事件 'bind' || 'unbild'
     */

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props3 = this.props,
          className = _props3.className,
          _props3$width = _props3.width,
          width = _props3$width === undefined ? 500 : _props3$width,
          _props3$height = _props3.height,
          height = _props3$height === undefined ? 500 : _props3$height;

      var styles = {
        userSelect: 'none',
        position: 'relative',
        cursor: 'url(' + require('../assets/bitbug_favicon.ico') + '), default'
      };
      return _react2.default.createElement('svg', {
        ref: function ref(e) {
          return _this3.svgWrap = e;
        },
        style: styles,
        width: width,
        height: height,
        className: (0, _classnames2.default)('SvgEdit', 'Broadcaster', className)
      });
    }
  }]);

  return Broadcaster;
}(_react2.default.Component);

Broadcaster.propTypes = {
  role: _react.PropTypes.string,
  className: _react.PropTypes.string,
  width: _react.PropTypes.number,
  height: _react.PropTypes.number,
  items: _react.PropTypes.array,
  selectItem: _react.PropTypes.object,
  mouseInfo: _react.PropTypes.object,
  wBToolsInfo: _react.PropTypes.object,
  onMouseChange: _react.PropTypes.func,
  onDrawChange: _react.PropTypes.func,
  onDelete: _react.PropTypes.func,
  onWbToolsClick: _react.PropTypes.func,
  onWbToolsDrag: _react.PropTypes.func
};

exports.default = Broadcaster;