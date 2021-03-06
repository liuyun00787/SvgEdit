'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tools = [{
	name: 'path',
	icon: require('../../assets/icon/brush.svg')
}, {
	name: 'text',
	icon: require('../../assets/icon/text.svg')
}, {
	name: 'rect',
	icon: require('../../assets/icon/rec.svg')
}, {
	name: 'circle',
	icon: require('../../assets/icon/circle.svg')
}, {
	name: 'color',
	icon: require('../../assets/icon/palette.svg')
},
// {
// 	name: 'images',
// 	icon: require('../../assets/icon-images.svg'),
// },
{
	name: 'clear',
	icon: require('../../assets/icon/clean.svg')
}, {
	name: 'select',
	_default_: true,
	icon: require('../../assets/icon/choose.svg')
}];
var sizes = [5, 10, 15, 20];
var colors = ['#000', '#194D33', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#FFEB3B', '#FF5722', '#795548'];

exports.default = function (_ref) {
	var _ref$orientation = _ref.orientation,
	    orientation = _ref$orientation === undefined ? 'X' : _ref$orientation,
	    _ref$role = _ref.role,
	    role = _ref$role === undefined ? 'Broadcaster' : _ref$role,
	    _ref$attr = _ref.attr,
	    attr = _ref$attr === undefined ? {} : _ref$attr,
	    target = _ref.target,
	    onColorChange = _ref.onColorChange,
	    onDrag = _ref.onDrag,
	    onSelect = _ref.onSelect,
	    onDrawChange = _ref.onDrawChange,
	    onDeleteChange = _ref.onDeleteChange,
	    handleUpload = _ref.handleUpload,
	    handleDraw = _ref.handleDraw,
	    handleHideItem = _ref.handleHideItem;

	var state = {
		isDrag: false,
		config: {
			strokeWidth: 5,
			stroke: '#00f'
		}
	};
	var fill = '#000';
	var selectFill = '#000';
	var className = attr.class;
	var origTransform = void 0;
	var toolsWidth = tools.length * 45;
	var group = target.group({
		class: (0, _classnames2.default)('wBToolsLayer', attr.class),
		width: toolsWidth,
		transform: 'matrix(1,0,0,1,' + (attr.x || 0) + ',' + (attr.y || 0) + ')'
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
				onDrag(group.attr());
			}
		}, function () {
			if (!state.isDrag) return;
			origTransform = this.transform().local;
			if (typeof onDrag === 'function') {
				onDrag(group.attr());
			}
		});
	}
	var renderTools = function renderTools() {
		var tools = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'X';

		return tools.map(function (item, index) {
			var X = index * 45;
			return target.group(target.rect(type === 'X' ? X : 0, type === 'Y' ? X : 0, 45, 45).attr({ class: 'WBToolsBG', stroke: '#fff', strokeWidth: 1, fill: fill, fillOpacity: 1 }), target.image(item.icon, type === 'X' ? X + 10 : 10, type === 'Y' ? X + 10 : 10, 25, 25)).attr({
				opacity: .2,
				class: 'wbTool ' + item.name,
				__TYPE__: item.name,
				__CONF__: JSON.stringify(state.config)
			}).mouseover(function () {}).mouseout(function () {}).click(function () {
				var _this = this;

				var _attr2 = this.attr(),
				    __TYPE__ = _attr2.__TYPE__;

				if (typeof handleHideItem === 'function') {
					handleHideItem();
				}
				if (__TYPE__ === 'color') {
					return;
				}
				if (__TYPE__ === 'clear') {
					return;
				}
				if (__TYPE__ === 'images') {
					var that = this;
					if (!this.uploading) {
						this.uploading = true;
						handleUpload.select({
							cb: function cb(_ref2) {
								var attr = _ref2.attr;

								if (typeof handleDraw === 'function') {
									var path = handleDraw({ attr: attr });
									onDrawChange(path.attr());
								}
							},
							setUploading: function setUploading() {
								that.uploading = false;
							}
						});
					}

					this.select('.WBToolsBG').attr({
						fill: selectFill
					});
					setTimeout(function () {
						_this.select('.WBToolsBG').attr({
							fill: fill
						});
					}, 100);
					return;
				}
				if (__TYPE__ === 'drag') {
					return;
				}
				group.selectAll('.WBToolsBG').attr({
					fill: fill
				});
				group.selectAll('.wbTool').attr({
					opacity: .2
				});
				this.attr({ opacity: .8 });
				this.select('.WBToolsBG').attr({
					fill: selectFill
				});
				this.attr({
					__CONF__: JSON.stringify(state.config)
				});
				var attr = this.attr();
				if (typeof onSelect === 'function') {
					onSelect(attr);
				}
			}).mousedown(function () {
				var _attr3 = this.attr(),
				    __TYPE__ = _attr3.__TYPE__;

				seting.remove();
				if (__TYPE__ === 'drag') {
					state.isDrag = true;
					this.attr({
						opacity: .8
					});
				}
				if (__TYPE__ === 'color') {
					this.attr({
						opacity: .8
					});
					group.add(seting);
					return;
				}
				if (__TYPE__ === 'clear') {
					this.attr({
						opacity: .8
					});
					return;
				}
			}).mouseup(function () {
				var _attr4 = this.attr(),
				    __TYPE__ = _attr4.__TYPE__;

				if (__TYPE__ === 'drag') {
					state.isDrag = false;
					this.attr({
						opacity: .2
					});
					this.select('.WBToolsBG').attr({
						fill: fill
					});
					return;
				}
				if (__TYPE__ === 'color') {
					this.attr({
						opacity: .2
					});
					return;
				}
				if (__TYPE__ === 'clear') {
					if (typeof onDeleteChange === 'function') {
						onDeleteChange(false);
					}
					this.attr({
						opacity: .2
					});
					this.select('.WBToolsBG').attr({
						fill: fill
					});
					return;
				}
			}).dblclick(function () {
				var _attr5 = this.attr(),
				    __TYPE__ = _attr5.__TYPE__;

				if (__TYPE__ === 'clear') {
					// 双击删全部
					if (typeof onDeleteChange === 'function') {
						onDeleteChange(true);
					}
				}
			});
		});
	};
	group.attr({
		__ID__: group.id
	});
	group.add(renderTools(tools, orientation));
	var setingBG = target.rect(0, 0, 1000000, 1000000).attr({ class: 'tools-setingBG', fill: '#000', fillOpacity: 0 });
	var seting = target.group(target.rect(180, 50, 130, 160, 4, 4).attr({ class: 'tools-seting', stroke: '#fff', strokeWidth: 1, fill: '#000', fillOpacity: .3 })).attr({
		class: 'tools-setWrap'
	});
	createColor(colors);
	createSize(sizes);
	setingBG.click(function () {
		this.remove();
		group.selectAll('.color').attr({
			opacity: .2
		});
		seting.remove();
	});
	function createSize(sizes) {
		for (var i = 0; i < sizes.length; i += 1) {
			var sizeItem = target.group(target.circle(200 + i * 30, 70, i * 2 + 5).attr({
				class: 'seting size-item',
				stroke: '#000',
				fill: '#000'
			}), target.circle(200 + i * 30, 70, i * 2 + 3).attr({
				class: 'size-item-on',
				fill: 'rgba(0,0,0,0)'
			})).attr({
				__SIZE__: sizes[i]
			}).click(function () {
				var attr = this.attr();
				seting.selectAll('.size-item-on').attr({
					fill: 'rgba(0,0,0,0)'
				});
				this.select('.size-item-on').attr({
					fill: '#fff'
				});
				state.config = _extends({}, state.config, {
					strokeWidth: attr.__SIZE__
				});
				onColorChange(state.config);
			});
			seting.add(sizeItem);
		}
	}
	function createColor(colors) {
		var index = 0;
		var X = 0;
		var Y = 0;
		for (var i = 0; i < colors.length; i += 1) {
			if (i % 4 === 0) {
				index += 1;
			}
			X = 200 + (i + 1) % 4 * 30;
			Y = 100 + (index - 1) * 40;
			seting.add(target.group(target.circle(X, Y, 10).attr({
				class: 'color-item',
				fill: colors[i]
			}), target.circle(X, Y, 8).attr({
				class: 'color-item-on',
				fill: 'rgba(0,0,0,0)'
			})).attr({
				__COLOR__: colors[i]
			}).click(function () {
				var attr = this.attr();
				seting.selectAll('.color-item-on').attr({
					fill: 'rgba(0,0,0,0)'
				});
				this.select('.color-item-on').attr({
					fill: '#fff'
				});
				state.config = _extends({}, state.config, {
					stroke: attr.__COLOR__
				});
				onColorChange(state.config);
			}));
		}
	}
	// group.selectAll('.wbTool  .whiteBoardBG').attr({
	// 	fill,
	// });
	if (group.select('.select')) {
		group.selectAll('.wbTool').attr({
			opacity: .2
		});
		group.select('.select').attr({
			opacity: .8
		});
	}
	setingBG.remove();
	seting.remove();

	return {
		layer: group,
		handleReset: function handleReset() {
			origTransform = '';
			group.attr({
				transform: ''
			});
			group.selectAll('.wbTool .whiteBoardBG').attr({
				fill: fill
			});
			this.select('.whiteBoardBG .path').attr({
				fill: selectFill
			});
			var attr = group.attr();
			if (typeof onSelect === 'function') {
				onSelect(attr);
			}
		},
		handleSetPosition: function handleSetPosition(_ref3) {
			var transform = _ref3.transform,
			    _ref3$x = _ref3.x,
			    x = _ref3$x === undefined ? 0 : _ref3$x,
			    _ref3$y = _ref3.y,
			    y = _ref3$y === undefined ? 0 : _ref3$y;

			group.attr({
				transform: transform || 'matrix(1,0,0,1,' + x + ',' + y + ')'
			});
		},
		handleToolsChange: function handleToolsChange(tool) {
			if (role === 'Broadcaster') return;
			group.selectAll('.wbTool  .WBToolsBG').attr({
				fill: fill
			});
			if (group.select('.' + tool)) {
				group.select('.' + tool + ' .WBToolsBG').attr({
					fill: selectFill
				});
			}
		},
		hanldeHideSeting: function hanldeHideSeting() {
			seting.remove();
			setingBG.remove();
		}
	};
};