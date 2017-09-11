'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _snapSvgMin = require('imports?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg-min.js');

var _snapSvgMin2 = _interopRequireDefault(_snapSvgMin);

var _videoMin = require('imports?this=>window,fix=>module.exports=0!video.js/dist/video.min.js');

var _videoMin2 = _interopRequireDefault(_videoMin);

var _index = require('../layer/index');

require('./Viewer.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import 'video.js/dist/video-js.min.css';


var Viewer = function (_React$Component) {
  _inherits(Viewer, _React$Component);

  function Viewer(props) {
    _classCallCheck(this, Viewer);

    var _this = _possibleConstructorReturn(this, (Viewer.__proto__ || Object.getPrototypeOf(Viewer)).call(this, props));

    _this.init = function () {
      try {
        var role = _this.role;
        var svg = _this.svg = (0, _snapSvgMin2.default)(_this.svgWrap);
        var that = _this;
        var _svg$node = svg.node,
            clientWidth = _svg$node.clientWidth,
            clientHeight = _svg$node.clientHeight;
        // 初始video

        var globalPlayer = _this.initVideo();
        // ppt层
        _this.PPTLayer = (0, _index.createPPTLayer)({ role: role,
          attr: {
            width: clientWidth,
            height: clientHeight
          },
          target: svg
        });
        // 白板层
        _this.whiteBoardLayer = (0, _index.createWhiteBoardLayer)({
          role: role,
          attr: {
            width: clientWidth,
            height: clientHeight
          },
          target: svg,
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
        // this.wBToolsLayer = createWBToolsLayer(role, {
        //  x: 0,
        //  y: 0,
        // }, svg, {});
        // 鼠标层
        _this.mouseLayer = (0, _index.createMouseLayer)({
          role: role,
          attr: {
            class: 'mouse-' + role
          },
          target: svg
        });
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

    _this.renderVideo = function () {
      return _react2.default.createElement(
        'div',
        { className: 'video-js svgVideo-component-wrap global-video-wrap' },
        _react2.default.createElement(
          'video',
          {
            ref: function ref(e) {
              return _this.videoDom = e;
            },
            id: _this.__ID__,
            className: 'video-js svgVideo-component global-video',
            controls: true,
            preload: 'auto',
            poster: '//vjs.zencdn.net/v/oceans.png',
            'data-setup': '{}'
          },
          _react2.default.createElement('source', { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' }),
          _react2.default.createElement('source', { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' }),
          _react2.default.createElement('source', { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' }),
          _react2.default.createElement(
            'p',
            { className: 'vjs-no-js' },
            'To view this video please enable JavaScript, and consider upgrading to a web browser that',
            _react2.default.createElement(
              'a',
              { href: 'http://videojs.com/html5-video-support/', target: '_blank' },
              'supports HTML5 video'
            )
          )
        )
      );
    };

    _this.initVideo = function () {
      try {
        if (_this.videoDom) {
          // console.log(this.videoDom, 1111);
          var options = {};
          var globalPlayer = _this.globalPlayer = (0, _videoMin2.default)(_this.videoDom, options, function onPlayerReady() {
            _videoMin2.default.log('Your player is ready!');

            // In this context, `this` is the player that was created by Video.js.
            // this.play();

            // How about an event listener?
            this.on('ended', function () {
              _videoMin2.default.log('Awww...over so soon?!');
            });
          });
          return globalPlayer;
        }
      } catch (e) {
        console.log(e);
      }
    };

    _this.role = 'Viewer';
    _this.state = {};
    _this.historyItems = [];
    _this.PrevItems = [];
    _this.groupItems = {};
    _this.PrevItems = [];
    _this.selectItem = null;
    _this.__ID__ = (0, _md2.default)(new Date() + Math.random() + 'Viewer');
    return _this;
  }

  _createClass(Viewer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          width = _props.width,
          height = _props.height,
          mouseInfo = _props.mouseInfo,
          items = _props.items,
          wBToolsInfo = _props.wBToolsInfo,
          _props$pptConfig = _props.pptConfig,
          pptConfig = _props$pptConfig === undefined ? {} : _props$pptConfig;
      var NWidth = nextProps.width,
          NHeight = nextProps.height,
          NMouseInfo = nextProps.mouseInfo,
          NItems = nextProps.items,
          NWBToolsInfo = nextProps.wBToolsInfo,
          _nextProps$selectItem = nextProps.selectItem,
          selectItem = _nextProps$selectItem === undefined ? {} : _nextProps$selectItem,
          _nextProps$pptConfig = nextProps.pptConfig,
          nextPptConfig = _nextProps$pptConfig === undefined ? {} : _nextProps$pptConfig;

      if (NWidth !== width || NHeight !== height) {
        if (this.whiteBoardLayer) {
          this.whiteBoardLayer.handleSetWH({
            width: NWidth,
            height: NHeight
          });
        }
        if (this.PPTLayer) {
          this.PPTLayer.handleSetWH({
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
                if (selectItem.__ID__) {
                  handleDraw(selectItem);
                  this.PrevItems.push(selectItem);
                }
              } else {
                var thatItem = handleSelectItem(selectItem.__ID__);
                this.PrevItems[index] = selectItem;
                thatItem.attr(selectItem);
                if (selectItem.__TYPE__ === 'text') {
                  thatItem.attr({ text: selectItem.__TEXT__ });
                }
              }
            }
          }
        }
      }
      if (this.globalPlayer) {
        if (pptConfig.paused !== nextPptConfig.paused) {
          if (nextPptConfig.paused) {
            this.globalPlayer.pause();
          } else {
            this.globalPlayer.play();
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

      if (NWidth !== width || NHeight !== height || NClassName !== className) {
        return true;
      }
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
      var _this2 = this;

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
      return _react2.default.createElement(
        'div',
        { ref: function ref(e) {
            return _this2.__SVG__ = _extends({}, _this2.__SVG__, e);
          }, className: (0, _classnames2.default)('SvgEditWrap'), style: { width: width, height: height } },
        _react2.default.createElement('svg', {
          style: styles,
          width: width,
          height: height,
          className: (0, _classnames2.default)('SvgEdit', 'Viewer', className),
          ref: function ref(e) {
            return _this2.svgWrap = e;
          }
        }),
        this.renderVideo()
      );
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
  wBToolsInfo: _react.PropTypes.object,
  pptConfig: _react.PropTypes.object
};

exports.default = Viewer;