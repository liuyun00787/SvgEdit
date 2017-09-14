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

var _eventListener = require('event-listener');

var _eventListener2 = _interopRequireDefault(_eventListener);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../layer/index');

require('./Broadcaster.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var videojs = void 0;

var Broadcaster = function (_React$Component) {
	_inherits(Broadcaster, _React$Component);

	function Broadcaster(props) {
		_classCallCheck(this, Broadcaster);

		var _this = _possibleConstructorReturn(this, (Broadcaster.__proto__ || Object.getPrototypeOf(Broadcaster)).call(this, props));

		_this.init = function () {
			try {
				var that = _this;
				var role = _this.role;
				var pptConfig = _this.props.pptConfig;

				var svg = _this.svg = new Snap(_this.svgWrap);
				var _svg$node = svg.node,
				    clientWidth = _svg$node.clientWidth,
				    clientHeight = _svg$node.clientHeight;
				// 初始video

				var globalPlayer = _this.initVideo();
				// ppt层
				if (pptConfig) {
					_this.PPTLayer = (0, _index.createPPTLayer)({ role: role,
						attr: {
							width: clientWidth,
							height: clientHeight
						},
						ppt: pptConfig.ppt || [],
						current: pptConfig.current || 1,
						target: svg,
						globalPlayer: globalPlayer,
						onPlayChange: pptConfig.onPlayChange
					});
				}
				// 白板层
				_this.whiteBoardLayer = (0, _index.createWhiteBoardLayer)({
					role: role,
					attr: {
						width: clientWidth,
						height: clientHeight
					},
					target: svg,
					onDrawChange: function onDrawChange(item) {
						var onDrawChange = that.props.onDrawChange;

						if (typeof onDrawChange === 'function') {
							onDrawChange(item.attr());
						}
					},

					onDeleteChange: function onDeleteChange(item) {
						var onDeleteChange = that.props.onDeleteChange;

						if (typeof onDeleteChange === 'function') {
							onDeleteChange(item);
						}
					},
					textInput: _this.textInput
				});
				// 白板工具层
				_this.wBToolsLayer = (0, _index.createWBToolsLayer)({
					role: role,
					orientation: 'X',
					attr: {},
					target: svg,
					onColorChange: function onColorChange(config) {
						_this.whiteBoardLayer.handleSetConfig(config);
					},
					onSelect: function onSelect(info) {
						var onWbToolsChange = that.props.onWbToolsChange;
						var whiteBoardLayer = that.whiteBoardLayer;
						var __TYPE__ = info.__TYPE__,
						    __CONF__ = info.__CONF__;

						whiteBoardLayer.handleSetTools(__TYPE__, __CONF__);
						if (typeof onWbToolsChange === 'function') {
							onWbToolsChange(info);
						}
					},
					onDeleteChange: function onDeleteChange(clearAll) {
						var whiteBoardLayer = that.whiteBoardLayer;

						if (whiteBoardLayer) {
							if (clearAll) {
								whiteBoardLayer.handleDelete();
							} else if (whiteBoardLayer.getIsSelect()) {
								whiteBoardLayer.handleDelete(whiteBoardLayer.getSelectItem().attr());
							}
						}
					},
					onDrag: function onDrag(info) {
						var onWbToolsChange = that.props.onWbToolsChange;

						if (typeof onWbToolsChange === 'function') {
							onWbToolsChange(info);
						}
					},

					handleUpload: _this.uploadInput,
					onDrawChange: _this.props.onDrawChange,
					handleDraw: function handleDraw(_ref) {
						var attr = _ref.attr;

						if (that.whiteBoardLayer) {
							return that.whiteBoardLayer.handleDraw(_extends({}, attr, {
								__TYPE__: 'image'
							}));
						}
					},
					handleHideItem: function handleHideItem() {
						if (that.whiteBoardLayer) {
							that.whiteBoardLayer.handleHideItem();
						}
					}
				});
				// 鼠标层
				// this.mouseLayer = createMouseLayer({
				//  role,
				//  attr: {
				//    class: `mouse-${role}`,
				//  },
				//  target: svg,
				// });
				_this.keyboard('bind');
				// 初始画笔items
				_this.initDraw();
				_this.initMouse();
				_this.initWBtools();
			} catch (e) {
				console.log(e);
			}
		};

		_this.initPPT = function () {};

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
			if (type === 'bind') {
				// 绑定鼠标事件
				_this.svg.mousemove(function (e) {
					var onMouseChange = _this.props.onMouseChange;

					if (_this.mouseLayer) {
						var handleSetPosition = _this.mouseLayer.handleSetPosition;

						handleSetPosition({ x: e.offsetX, y: e.offsetY }, onMouseChange);
					}
				});
			}
			if (type === 'unbuild') {}
		};

		_this.inputText = function (e) {
			var inputListen = void 0;
			_this.textInput.target = e;
			_this.textInput.select = function (_ref2) {
				var _ref2$text = _ref2.text,
				    text = _ref2$text === undefined ? '' : _ref2$text,
				    cb = _ref2.cb,
				    blurCB = _ref2.blurCB;

				var callback = function callback(e) {
					if (typeof cb === 'function') {
						cb(e.target.value);
					}
				};
				if (inputListen) {
					inputListen.remove();
					inputListen = null;
				}
				inputListen = (0, _eventListener2.default)(e, 'input', callback);
				(0, _eventListener2.default)(e, 'blur', function () {
					if (typeof blurCB === 'function') {
						blurCB();
					}
					if (inputListen) {
						inputListen.remove();
						inputListen = null;
					}
				});
				e.value = text;
				e.setSelectionRange(text.length, -1);
				e.focus();
			};
		};

		_this.inputUpload = function (e) {
			var changeListen = void 0;
			_this.uploadInput.target = e;
			_this.uploadInput.select = function (_ref3) {
				var cb = _ref3.cb,
				    setUploading = _ref3.setUploading;

				if (changeListen) {
					changeListen.remove();
					changeListen = null;
				}
				changeListen = (0, _eventListener2.default)(e, 'change', function (e) {
					if (changeListen) {
						changeListen.remove();
						changeListen = null;
					}
					var files = e.target.files[0];
					if (files.size / 1024 > 1000) {
						e.target.value = '';
						alert('附件不能大于1M!');
						return;
					}
					var reader = new FileReader();
					reader.onload = function (file) {
						return function () {
							var _ = this;
							var image = new Image();
							image.onload = function () {
								e.target.value = '';
								if (typeof cb === 'function') {
									cb({
										attr: {
											href: _.result,
											width: image.width,
											height: image.height
										}
									});
								}
							};
							image.src = _.result;
						};
					}(files);
					if (files) {
						reader.readAsDataURL(files);
					}
				});
				e.click();
				if (typeof setUploading === 'function') {
					setUploading();
				}
			};
		};

		_this.renderUpLoad = function () {
			return _react2.default.createElement('input', {
				type: 'file',
				accept: '.svg,.png,.jpg,.jpeg',
				style: {
					position: 'absolute',
					top: 0,
					left: 0,
					overflow: 'hidden',
					zIndex: -9999,
					width: 0,
					height: 0,
					opacity: 0
				},
				ref: _this.inputUpload
			});
		};

		_this.renderText = function () {
			return _react2.default.createElement('input', {
				style: {
					position: 'absolute',
					top: 0,
					left: 0,
					overflow: 'hidden',
					zIndex: -9999,
					opacity: 0
				},
				ref: _this.inputText
			});
		};

		_this.renderVideo = function () {
			return _react2.default.createElement(
				'div',
				{ className: "video-js svgVideo-component-wrap global-video-wrap" },
				_react2.default.createElement(
					'video',
					{
						ref: function ref(e) {
							return _this.videoDom = e;
						},
						id: _this.__ID__,
						className: 'video-js svgVideo-component global-video',
						controls: true,
						preload: 'auto'
						// poster="https://ppt-cdn.class100.com/ppts/766/G5L8_2.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=E3CH0i8tAuHjDFytQmeHh2XB088%3D"
						, 'data-setup': '{}' },
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
			// return;
			try {
				if (_this.videoDom) {
					// console.log(this.videoDom, 1111);
					var options = {};
					var globalPlayer = _this.globalPlayer = videojs(_this.videoDom, options, function onPlayerReady() {
						videojs.log('Your player is ready!');

						// In this context, `this` is the player that was created by Video.js.
						// this.play();

						// How about an event listener?
						this.on('ended', function () {
							videojs.log('Awww...over so soon?!');
						});
					});
					return globalPlayer;
				}
			} catch (e) {
				console.log(e);
			}
		};

		_this.__ID__ = (0, _md2.default)(new Date() + Math.random() + 'Broadcaster');
		_this.role = 'Broadcaster';
		_this.state = {};
		_this.uploadInput = {};
		_this.textInput = {};
		_this.images = [];
		_this.historyItems = [];
		_this.PrevItems = [];
		_this.selectItem = null;
		return _this;
	}

	_createClass(Broadcaster, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.init();
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
				if (this.PPTLayer) {
					this.PPTLayer.handleSetWH({
						width: NWidth,
						height: NHeight
					});
				}
			}
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
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
				// cursor: 'crosshair',
				// cursor: `url(${require('../assets/bitbug_favicon.ico')}), default`,
			};
			return _react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)('SvgEditWrap'), style: { width: width, height: height } },
				_react2.default.createElement('svg', {
					ref: function ref(e) {
						return _this2.svgWrap = e;
					},
					style: styles,
					width: width,
					height: height,
					className: (0, _classnames2.default)('SvgEdit', 'Broadcaster', className)
				}),
				this.renderText(),
				this.renderUpLoad(),
				this.renderVideo()
			);
		}
	}]);

	return Broadcaster;
}(_react2.default.Component);

Broadcaster.propTypes = {
	className: _react.PropTypes.string,
	width: _react.PropTypes.number,
	height: _react.PropTypes.number,
	items: _react.PropTypes.array,
	selectItem: _react.PropTypes.object,
	mouseInfo: _react.PropTypes.object,
	wBToolsInfo: _react.PropTypes.object,
	onMouseChange: _react.PropTypes.func,
	onDrawChange: _react.PropTypes.func,
	onDeleteChange: _react.PropTypes.func,
	onWbToolsChange: _react.PropTypes.func,
	pptConfig: _react.PropTypes.object
};

exports.default = function (video) {
	videojs = video;
	return Broadcaster;
};