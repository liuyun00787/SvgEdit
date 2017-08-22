'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _snapSvg = require('imports?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js');

var _snapSvg2 = _interopRequireDefault(_snapSvg);

var _layer = require('./layer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Viewer = function (_React$Component) {
  _inherits(Viewer, _React$Component);

  function Viewer(props) {
    _classCallCheck(this, Viewer);

    var _this = _possibleConstructorReturn(this, (Viewer.__proto__ || Object.getPrototypeOf(Viewer)).call(this, props));

    _this.init = function () {
      try {
        var role = _this.role;
        var svg = _this.svg = (0, _snapSvg2.default)(_this.svgWrap);
        var that = _this;
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

          onClear: function onClear(item) {
            var onClear = that.props.onClear;

            if (typeof onClear === 'function') {
              onClear(item);
            }
          }
        });
        // 白板工具层
        _this.wBToolsLayer = (0, _layer.createWBToolsLayer)(role, {
          x: 0,
          y: 0
        }, svg, {});
        // 鼠标层
        _this.mouseLayer = (0, _layer.createMouseLayer)(role, {
          class: 'mouse-' + role
        }, svg);
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

    _this.role = 'Viewer';
    _this.state = {};
    _this.historyItems = [];
    _this.PrevItems = [];
    _this.groupItems = {};
    _this.PrevItems = [];
    _this.selectItem = null;
    return _this;
  }

  _createClass(Viewer, [{
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
          height = _props.height,
          mouseInfo = _props.mouseInfo,
          items = _props.items,
          wBToolsInfo = _props.wBToolsInfo;
      var NWidth = nextProps.width,
          NHeight = nextProps.height,
          NMouseInfo = nextProps.mouseInfo,
          NItems = nextProps.items,
          NWBToolsInfo = nextProps.wBToolsInfo,
          _nextProps$selectItem = nextProps.selectItem,
          selectItem = _nextProps$selectItem === undefined ? {} : _nextProps$selectItem;

      console.log(NItems, 111111);
      if (NWidth !== width || NHeight !== height) {
        if (this.whiteBoardLayer) {
          this.whiteBoardLayer.handleSetWH({
            width: NWidth,
            height: NHeight
          });
        }
      }
      if (this.mouseLayer) {
        var handleSetPosition = this.mouseLayer.handleSetPosition;

        if (JSON.stringify(NMouseInfo) !== JSON.stringify(mouseInfo)) {
          handleSetPosition({
            x: NMouseInfo.x,
            y: NMouseInfo.y
          });
        }
      }
      if (this.wBToolsLayer) {
        var _wBToolsLayer = this.wBToolsLayer,
            _handleSetPosition = _wBToolsLayer.handleSetPosition,
            handleToolsChange = _wBToolsLayer.handleToolsChange;

        if (JSON.stringify(NWBToolsInfo) !== JSON.stringify(wBToolsInfo)) {
          _handleSetPosition(NWBToolsInfo.transform, NWBToolsInfo.tool);
          if (NWBToolsInfo.tool !== wBToolsInfo.tool) {
            handleToolsChange(NWBToolsInfo.tool);
          }
        }
      }
      if (this.whiteBoardLayer) {
        var _whiteBoardLayer = this.whiteBoardLayer,
            handleDraw = _whiteBoardLayer.handleDraw,
            handleDelete = _whiteBoardLayer.handleDelete,
            handleSelectItem = _whiteBoardLayer.handleSelectItem;

        if (!NItems.length && this.PrevItems.length) {
          handleDelete();
          this.PrevItems = [];
          return;
        }
        if (NItems.length) {
          if (JSON.stringify(NItems) !== JSON.stringify(this.PrevItems)) {
            if (NItems.length < this.PrevItems.length) {
              var deleteList = this.PrevItems.filter(function (t) {
                return NItems.findIndex(function (i) {
                  return i.__ID__ === t.__ID__;
                }) === -1;
              }) || [];
              if (deleteList.length) {
                handleDelete(deleteList, true);
              }
              this.PrevItems = [].concat(NItems);
            } else {
              var __ID__ = selectItem.__ID__;

              var index = this.PrevItems.findIndex(function (item) {
                return item.__ID__ === __ID__;
              });
              if (index === -1) {
                handleDraw(selectItem);
                this.PrevItems.push(selectItem);
              } else {
                var thatItem = handleSelectItem(selectItem.__ID__);
                thatItem.attr(selectItem);
                this.PrevItems[index] = selectItem;
                if (selectItem.__TYPE__ === 'text') {
                  var textPathAttr = JSON.parse(selectItem.textPathAttr);
                  thatItem.attr(selectItem).select('.text').attr({ textPathAttr: textPathAttr }).attr({ text: textPathAttr.__text__ });
                }
              }
            }
          }
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
        clearTimeout(this.timeoutInit);
      }
    }
    /**
     * 初始化
     * @returns {*}
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
        position: 'relative'
      };
      return _react2.default.createElement('svg', {
        style: styles,
        width: width,
        height: height,
        className: (0, _classnames2.default)('SvgEdit', 'Viewer', className),
        ref: function ref(e) {
          return _this3.svgWrap = e;
        }
      });
    }
  }]);

  return Viewer;
}(_react2.default.Component);

Viewer.propTypes = {
  className: _react.PropTypes.string,
  width: _react.PropTypes.number,
  height: _react.PropTypes.number,
  items: _react.PropTypes.array,
  selectItem: _react.PropTypes.object,
  mouseInfo: _react.PropTypes.object,
  wBToolsInfo: _react.PropTypes.object
};

exports.default = Viewer;