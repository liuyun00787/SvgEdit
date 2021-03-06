'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../layer/index');

require('./Viewer.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var videojs = void 0;

var Viewer = function (_React$Component) {
		_inherits(Viewer, _React$Component);

		function Viewer(props) {
				_classCallCheck(this, Viewer);

				var _this = _possibleConstructorReturn(this, (Viewer.__proto__ || Object.getPrototypeOf(Viewer)).call(this, props));

				_this.init = function () {
						try {
								var role = _this.role;
								var pptConfig = _this.props.pptConfig;

								var svg = _this.svg = Snap(_this.svgWrap);
								var that = _this;
								var _svg$node = svg.node,
								    clientWidth = _svg$node.clientWidth,
								    clientHeight = _svg$node.clientHeight;
								// 初始video

								var globalPlayer = _this.initVideo();
								// ppt层
								if (pptConfig) {
										_this.PPTLayer = (0, _index.createPPTLayer)({
												role: role,
												attr: {
														width: clientWidth,
														height: clientHeight
												},
												ppt: pptConfig.ppt || [],
												current: pptConfig.current || 1,
												target: svg,
												globalPlayer: globalPlayer
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
								if (this.PPTLayer) {
										this.PPTLayer.handleSetWH({
												width: NWidth,
												height: NHeight
										});
								}
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
						if (this.PPTLayer) {
								var _PPTLayer = this.PPTLayer,
								    init = _PPTLayer.init,
								    goTo = _PPTLayer.goTo;

								if ('pptConfig' in nextProps) {
										var nextPPTConfig = nextProps.pptConfig,
										    nextPPT = nextProps.ppt;
										var _props2 = this.props,
										    prevPPTConfig = _props2.pptConfig,
										    prevPPT = _props2.ppt;
										// 初始化PPT

										if ('ppt' in nextPPTConfig) {
												if (JSON.stringify(nextPPTConfig.ppt) !== JSON.stringify(prevPPTConfig.ppt)) {
														init({ ppt: nextPPTConfig.ppt, current: nextPPTConfig.current || 1 });
												}
										}
										// 当前页数
										if ('current' in nextPPTConfig) {
												if (nextPPTConfig.current !== prevPPTConfig.current) {
														goTo(nextPPTConfig.current);
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

												var _PPTLayer$getState = this.PPTLayer.getState(),
												    page = _PPTLayer$getState.page;

												this.globalPlayer.el_.parentNode.style.opacity = 1;
												// TODO 临时写法
												this.PPTLayer.layer.select('.page-' + page).attr({ opacity: 0 });
										}
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
				}
		}, {
				key: 'shouldComponentUpdate',
				value: function shouldComponentUpdate(nextProps) {
						var _props3 = this.props,
						    width = _props3.width,
						    height = _props3.height,
						    className = _props3.className;
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

						var _props4 = this.props,
						    className = _props4.className,
						    _props4$width = _props4.width,
						    width = _props4$width === undefined ? 500 : _props4$width,
						    _props4$height = _props4.height,
						    height = _props4$height === undefined ? 500 : _props4$height;

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
		className: _propTypes2.default.string,
		width: _propTypes2.default.number,
		height: _propTypes2.default.number,
		items: _propTypes2.default.array,
		selectItem: _propTypes2.default.object,
		mouseInfo: _propTypes2.default.object,
		wBToolsInfo: _propTypes2.default.object,
		pptConfig: _propTypes2.default.object
};

exports.default = function (video) {
		videojs = video;
		return Viewer;
};