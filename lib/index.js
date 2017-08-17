'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mousetrap = require('mousetrap');

var _mousetrap2 = _interopRequireDefault(_mousetrap);

var _layer = require('./libs/layer');

var _layer2 = _interopRequireDefault(_layer);

var _snapSvg = require('../node_modules/imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js');

var _snapSvg2 = _interopRequireDefault(_snapSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createPPTLayer = _layer2.default.createPPTLayer,
    createWhiteBoardLayer = _layer2.default.createWhiteBoardLayer,
    createMouseLayer = _layer2.default.createMouseLayer,
    createWBToolsLayer = _layer2.default.createWBToolsLayer;

var SvgEdit = function (_React$Component) {
  _inherits(SvgEdit, _React$Component);

  function SvgEdit(props) {
    _classCallCheck(this, SvgEdit);

    var _this = _possibleConstructorReturn(this, (SvgEdit.__proto__ || Object.getPrototypeOf(SvgEdit)).call(this, props));

    _this.init = function () {
      try {
        var role = _this.props.role;

        var svg = _this.svg = (0, _snapSvg2.default)(_this.svgWrap);
        var that = _this;
        // 测试代码
        // svg.paper.text(50, 20, `version: ${__VERSION__} ====== ${role === 'Viewer' ? '学生端' : '教师端'}`);
        // if (role !== 'Viewer') {
        //   svg.paper.text(50, 50, '快捷键：');
        //   svg.paper.text(70, 80, '1. 按空格键 + 鼠标左键选择笔画拖拽');
        //   svg.paper.text(70, 110, '2. 按backspace键删除选中笔画/按shift+backspace键清除所有');
        // }
        // ppt层
        _this.PPTLayer = createPPTLayer({}, svg);
        // 白板层
        var whiteBoardLayer = _this.whiteBoardLayer = createWhiteBoardLayer({
          role: role,
          width: svg.node.clientWidth,
          height: svg.node.clientHeight,
          onDrawChange: function onDrawChange(items) {
            var onDrawChange = that.props.onDrawChange;

            if (typeof onDrawChange === 'function') {
              onDrawChange(items);
            }
          },

          onClear: function onClear(item) {
            var onClear = that.props.onClear;

            onClear(item);
          }
        }, svg);
        // 白板工具层
        _this.wBToolsLayer = createWBToolsLayer({
          role: role,
          x: 0,
          handleSelect: function handleSelect(tool) {
            var onWbToolsClick = that.props.onWbToolsClick;

            whiteBoardLayer.handleSetTools(tool);
            onWbToolsClick(tool);
          },
          onDrag: function onDrag(transform) {
            var onWbToolsDrag = that.props.onWbToolsDrag;

            onWbToolsDrag(transform);
          }
        }, svg);
        // 鼠标层
        _this.mouseLayer = createMouseLayer({
          role: role
        }, svg);
        if (role === 'Broadcaster') {
          _this.keyboard('bind');
        }
        window.addEventListener('resize', function () {
          var _svg$node = svg.node,
              clientWidth = _svg$node.clientWidth,
              clientHeight = _svg$node.clientHeight;

          whiteBoardLayer.handleSetWH({ width: clientWidth, height: clientHeight });
        });
        // 初始画笔items
        _this.initDraw();
      } catch (e) {
        console.log(e);
      }
    };

    _this.initDraw = function () {
      if (_this.whiteBoardLayer) {
        var _this$props$items = _this.props.items,
            items = _this$props$items === undefined ? [] : _this$props$items;
        var _this$whiteBoardLayer = _this.whiteBoardLayer,
            handleDraw = _this$whiteBoardLayer.handleDraw,
            handleDelete = _this$whiteBoardLayer.handleDelete;

        for (var i = 0; i < items.length; i += 1) {
          var newItem = handleDraw(items[i], true);
          _this.historyItems.push(newItem);
          _this.PrevItems.push(items[i]);
        }
      }
    };

    _this.keyboard = function (type) {
      var that = _this;
      var svg = _this.svg,
          whiteBoardLayer = _this.whiteBoardLayer;
      var whiteBoardGroup = _this.groupItems.whiteBoardGroup;

      if (type === 'bind') {
        // 绑定鼠标事件
        _this.svg.mousemove(function (e) {
          var onMouseChange = _this.props.onMouseChange;
          var handleSetPosition = _this.mouseLayer.handleSetPosition;

          handleSetPosition({ x: e.offsetX, y: e.offsetY }, onMouseChange);
        });
        //
        _mousetrap2.default.bind('backspace', function () {
          whiteBoardLayer.handleDelete(whiteBoardLayer.getSelectItem());
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

    _this.state = {};
    _this.historyItems = [];
    _this.PrevItems = [];
    _this.groupItems = {};
    _this.PrevItems = [];
    _this.selectItem = null;
    return _this;
  }

  _createClass(SvgEdit, [{
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
      var role = nextProps.role,
          _nextProps$items = nextProps.items,
          items = _nextProps$items === undefined ? [] : _nextProps$items,
          _nextProps$selectItem = nextProps.selectItem,
          selectItem = _nextProps$selectItem === undefined ? {} : _nextProps$selectItem;

      if (role === 'Broadcaster') {}
      if (role === 'Viewer') {
        if (this.mouseLayer) {
          var handleSetPosition = this.mouseLayer.handleSetPosition;

          if (JSON.stringify(nextProps.mouseInfo) !== JSON.stringify(this.props.mouseInfo)) {
            handleSetPosition({
              x: nextProps.mouseInfo.x,
              y: nextProps.mouseInfo.y
            });
          }
        }
        if (this.wBToolsLayer) {
          var _wBToolsLayer = this.wBToolsLayer,
              _handleSetPosition = _wBToolsLayer.handleSetPosition,
              handleToolsChange = _wBToolsLayer.handleToolsChange;

          if (JSON.stringify(nextProps.wBToolsInfo) !== JSON.stringify(this.props.wBToolsInfo)) {
            _handleSetPosition(nextProps.wBToolsInfo.transform, nextProps.wBToolsInfo.tool);
            if (nextProps.wBToolsInfo.tool !== this.props.wBToolsInfo.tool) {
              handleToolsChange(nextProps.wBToolsInfo.tool);
            }
          }
        }
        if (this.whiteBoardLayer) {
          var _whiteBoardLayer = this.whiteBoardLayer,
              handleDraw = _whiteBoardLayer.handleDraw,
              handleDelete = _whiteBoardLayer.handleDelete;

          if (!nextProps.items.length && this.PrevItems.length) {
            handleDelete();
          }
          if (items.length) {
            if (JSON.stringify(nextProps.items) !== JSON.stringify(this.PrevItems)) {
              var __ID__ = selectItem.__ID__;

              var index = this.PrevItems.findIndex(function (item) {
                return item.__ID__ === __ID__;
              });
              if (index === -1) {
                var newItem = handleDraw(selectItem);
                this.historyItems.push(newItem);
                this.PrevItems.push(selectItem);
              } else {
                this.historyItems[index].attr(selectItem);
                this.PrevItems[index] = selectItem;
                if (selectItem.class === 'textItem') {
                  var textPathAttr = JSON.parse(selectItem.textPathAttr);
                  this.historyItems[index].select('.textPape').attr({ textPathAttr: textPathAttr }).attr({ text: textPathAttr.__text__ });
                }
              }
            }
          }
        }
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.keyboard('unbuild');
      if (this.timeoutInit) {
        clearTimeout(this.timeoutInit);
      }
      window.removeEventListener('resize');
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

      var _props = this.props,
          role = _props.role,
          className = _props.className,
          _props$width = _props.width,
          width = _props$width === undefined ? 500 : _props$width,
          _props$height = _props.height,
          height = _props$height === undefined ? 500 : _props$height;

      var styles = {
        userSelect: 'none',
        position: 'relative'
      };
      if (role === 'Broadcaster') {
        styles.cursor = 'url(' + require('./assets/bitbug_favicon.ico') + '), default';
      }
      return _react2.default.createElement('svg', {
        style: styles,
        width: width,
        height: height,
        className: (0, _classnames2.default)('SvgEdit', role === 'Broadcaster' ? 'Broadcaster' : 'Viewer', className),
        ref: function ref(svg) {
          return _this3.svgWrap = svg;
        }
      });
    }
  }]);

  return SvgEdit;
}(_react2.default.Component);

SvgEdit.propTypes = {
  role: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  width: _react2.default.PropTypes.number,
  height: _react2.default.PropTypes.number,
  items: _react2.default.PropTypes.array,
  selectItem: _react2.default.PropTypes.object,
  mouseInfo: _react2.default.PropTypes.object,
  wBToolsInfo: _react2.default.PropTypes.object,
  onWbToolsClick: _react2.default.PropTypes.func,
  onWbToolsDrag: _react2.default.PropTypes.func,
  onMouseChange: _react2.default.PropTypes.func,
  onDrawChange: _react2.default.PropTypes.func,
  onClear: _react2.default.PropTypes.func
};

exports.default = SvgEdit;