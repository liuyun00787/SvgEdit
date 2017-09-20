'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TOOLS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var TOOLS = exports.TOOLS = {
	hand: '__HAND__',
	path: '__PATH__',
	text: '__TEXT__',
	rect: '__RECT__',
	circle: '__CIRCLE__'
};

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
		isDraw: false,
		isSelect: false,
		tools: 'select',
		tool: {
			type: 'select',
			config: {}
		},
		config: {}
	};
	var layer = target.group({
		class: (0, _classnames2.default)('whiteBoardLayer', attr.className)
	});
	var wbItemWrap = (0, _tools.createItemWrap)({ role: role, target: target, onDrawChange: onDrawChange });
	var whiteBoardBG = target.rect(0, 0, 0, 0).attr({ class: 'whiteBoardBG', fill: '#ffff00', fillOpacity: 0 }).attr({
		width: attr.width || 0,
		height: attr.height || 0
	});

	// 白板舞台
	var wbCanvas = function () {
		var group = target.group();
		group.attr({
			__ID__: group.id
		});
		group.add(wbItemWrap.group);
		whiteBoardBG.remove();
		layer.mousedown(function (e) {
			if (target.select('.tools-setWrap')) {
				target.select('.tools-setWrap').remove();
			}
			if (role !== 'Broadcaster') return;
			var _state = state,
			    isDraw = _state.isDraw,
			    isSelect = _state.isSelect,
			    tools = _state.tools;

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
					role: role,
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
					role: role,
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
					role: role,
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
					role: role,
					attr: {
						x: e.offsetX,
						y: e.offsetY
					},
					target: target
				});
				drawPath = pathLayer.group;
			}
			drawPath.click(function () {
				if (role !== 'Broadcaster') return;
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
				onDrawChange(this);
			});
			state.selectItem = drawPath;
			if (drawPath.attr('__TYPE__') === 'text') {
				var dd = Object.assign({}, state.config);
				dd.fill = dd.stroke;
				switch (Math.abs(dd.strokeWidth)) {
					case 5:
						{
							dd.fontSize = 20;
							break;
						}
					case 10:
						{
							dd.fontSize = 36;
							break;
						}
					case 15:
						{
							dd.fontSize = 48;
							break;
						}
					case 20:
						{
							dd.fontSize = 72;
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
			if (typeof onDrawChange === 'function') {
				if (drawPath) {
					onDrawChange(drawPath);
				}
			}
			// wbItemWrap.handleShow(drawPath);
		});
		layer.mousemove(function (e) {
			if (role !== 'Broadcaster') return;
			var _state2 = state,
			    isDraw = _state2.isDraw,
			    tools = _state2.tools;

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
					x: X < 0 ? Math.abs(state.downX + X) : state.downX,
					y: Y < 0 ? Math.abs(state.downY + Y) : state.downY,
					width: Math.abs(X),
					height: Math.abs(Y)
				});
			}
			if (tools === 'circle') {
				console.log(tools, 111);
				var _X = e.offsetX - state.downX;
				var _Y = e.offsetY - state.downY;
				state.selectItem.attr({
					cx: state.downX + _X / 2,
					cy: state.downY + _Y / 2,
					rx: Math.abs(_X / 2),
					ry: Math.abs(_Y / 2)
				});
			}
			if (typeof onDrawChange === 'function') {
				onDrawChange(state.selectItem);
			}
			// wbItemWrap.handleShow(state.selectItem);
		});
		layer.mouseup(function () {
			if (role !== 'Broadcaster') return;
			var _state3 = state,
			    isDraw = _state3.isDraw,
			    tools = _state3.tools;

			if (isDraw) {
				// wbItemWrap.handleShow(state.selectItem);
				// state.isSelect = true;
			}
			if (tools === 'color') {
				return;
			}
			if (typeof onDrawChange === 'function') {
				if (state.selectItem) {
					onDrawChange(state.selectItem);
				}
			}
			// wbItemWrap.handleShow(state.selectItem);
			this.data('isActive', false);
		});
		layer.dblclick(function () {
			if (role !== 'Broadcaster') return;
			wbItemWrap.handleHide();
			state.selectItem = null;
			state.isSelect = false;
			this.data('isActive', false);
		});
		return group;
	}();

	layer.add(wbCanvas);

	return {
		layer: layer,
		// 设置宽高
		handleSetWH: function handleSetWH(_ref2) {
			var width = _ref2.width,
			    height = _ref2.height;

			whiteBoardBG.attr({ width: width, height: height });
		},
		getState: function getState() {
			return state;
		},
		setState: function setState() {
			var nState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var callback = arguments[1];

			state = _extends({}, state, nState);
			if (typeof callback === 'function') {
				callback();
			}
		},

		// 设置功具
		setToolConf: function setToolConf(_ref3, callback) {
			var _ref3$type = _ref3.type,
			    type = _ref3$type === undefined ? 'hand' : _ref3$type,
			    _ref3$config = _ref3.config,
			    config = _ref3$config === undefined ? {} : _ref3$config;

			var tool = {
				type: type,
				config: config
			};
			switch (type) {
				case 'hand':
					{
						tool.type = TOOLS.hand;
						break;
					}
				case 'path':
					{
						tool.type = TOOLS.path;
						break;
					}
				case 'text':
					{
						tool.type = TOOLS.text;
						break;
					}
				case 'rect':
					{
						tool.type = TOOLS.rect;
						break;
					}
				case 'circle':
					{
						tool.type = TOOLS.circle;
						break;
					}
				default:
					{
						tool.type = TOOLS.hand;
					}
			}
			state = _extends({}, state, {
				tool: tool
			});
			if (typeof callback === 'function') {
				callback();
			}
		},

		// 设置可用
		setDisable: function setDisable(has) {
			console.log(has);
		},

		// 选择笔画
		selectItem: function selectItem(id) {
			console.log(id);
		},

		// 画一笔
		draw: function draw(item) {
			console.log(item);
		},

		// 清除一笔
		clear: function clear(id) {
			console.log(id);
		},


		handleSetConfig: function handleSetConfig(config) {
			state.config = config;
		},
		handleSelectItem: function handleSelectItem(__ID__) {
			return wbCanvas.select('.' + __ID__);
		},
		getSelectItem: function getSelectItem() {
			return state.selectItem;
		},
		getIsSelect: function getIsSelect() {
			return state.isSelect;
		},
		handleSetIsDraw: function handleSetIsDraw() {
			var isDraw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			state.isDraw = isDraw;
		},
		handleDelete: function handleDelete(path, isArray) {
			wbCanvas.data('isActive', false);
			if (path) {
				if (isArray) {
					path.map(function (item) {
						if (wbCanvas.select('.' + item.__ID__)) {
							wbCanvas.select('.' + item.__ID__).remove();
						}
					});
				} else if (state.isSelect) {
					if (wbCanvas.select('.' + path.__ID__)) {
						wbCanvas.select('.' + path.__ID__).remove();
					}
					state.selectItem = null;
					wbItemWrap.handleHide(path);
				}
			} else {
				wbCanvas.clear();
				if (state.tools !== 'select') {
					wbCanvas.add(whiteBoardBG);
				}
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
				whiteBoardBG.remove();
			} else {
				wbCanvas.add(whiteBoardBG);
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
					role: role,
					attr: item,
					target: target
				});
			}
			if (item.__TYPE__ === 'text') {
				path = (0, _tools.createText)({
					role: role,
					attr: item,
					target: target,
					textInput: textInput,
					onDrawChange: onDrawChange,
					handleShow: function handleShow(path) {
						if (state.tools === 'select') {
							wbItemWrap.handleShow(path);
						}
					}
				});
			}
			if (item.__TYPE__ === 'rect') {
				path = (0, _tools.createRect)({ role: role, attr: item, target: target });
			}
			if (item.__TYPE__ === 'circle') {
				path = (0, _tools.createCircle)({ role: role, attr: item, target: target });
			}
			if (item.__TYPE__ === 'image') {
				path = (0, _tools.createImage)({ role: role, attr: item, target: target });
			}
			path.group.click(function () {
				if (role !== 'Broadcaster') return;
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
			wbCanvas.add(path.group);
			state.selectItem = path.group;
			return path.group;
		},
		handleHideItem: wbItemWrap.handleHide
	};
};