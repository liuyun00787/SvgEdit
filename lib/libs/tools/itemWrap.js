'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var _ref$role = _ref.role,
	    role = _ref$role === undefined ? 'Broadcaster' : _ref$role,
	    _ref$attr = _ref.attr,
	    attr = _ref$attr === undefined ? {} : _ref$attr,
	    target = _ref.target,
	    onDrawChange = _ref.onDrawChange;

	var state = {
		selectItem: '',
		isDrag: true,
		hoverIn: false
	};
	var group = target.group({
		transform: 'matrix(1,0,0,1,-10000,-10000)',
		class: (0, _classnames2.default)('WBWrapItem', attr.className)
	});

	var square2 = target.rect(0, 0, 0, 0).attr({ class: 'square2', fillOpacity: .4, fill: 'coral' }).drag(function (dx, dy) {
		var selectItem = state.selectItem;

		var selectOrigTransform = selectItem.data('origTransform');
		var groupOrigTransform = group.data('origTransform');
		group.attr({
			transform: groupOrigTransform + (groupOrigTransform ? 'T' : 't') + [dx, dy]
		});
		selectItem.attr({
			transform: selectOrigTransform + (selectOrigTransform ? 'T' : 't') + [dx, dy]
		});
		if (typeof onDrawChange === 'function') {
			onDrawChange(selectItem);
		}
	}, function () {
		var selectItem = state.selectItem;

		selectItem.data('origTransform', selectItem.transform().local);
		group.data('origTransform', group.transform().local);
		if (typeof onDrawChange === 'function') {
			onDrawChange(selectItem);
		}
	});

	var dragChange = function dragChange(dx, dy) {
		var selectItem = state.selectItem;

		var _attr = this.attr(),
		    dragType = _attr.dragType;

		var _selectItem$attr = selectItem.attr(),
		    __TYPE__ = _selectItem$attr.__TYPE__;

		if (__TYPE__ === 'image') {
			var _selectItem$data = selectItem.data(),
			    __width__ = _selectItem$data.__width__,
			    __height__ = _selectItem$data.__height__,
			    __x__ = _selectItem$data.__x__,
			    __y__ = _selectItem$data.__y__;

			if (dragType === 'TL') {
				var width = parseInt(__width__) - dx;
				var height = parseInt(__height__) - dy;
				selectItem.attr({
					x: width < 0 ? parseInt(__x__) + parseInt(__width__) : parseInt(__x__) + dx,
					y: height < 0 ? parseInt(__y__) + parseInt(__height__) : parseInt(__y__) + dy,
					width: Math.abs(width),
					height: Math.abs(height)
				});
			}
			if (dragType === 'TR') {
				var _width = parseInt(__width__) + dx;
				var _height = parseInt(__height__) - dy;
				selectItem.attr({
					x: _width < 0 ? parseInt(__x__) + _width : __x__,
					y: _height < 0 ? parseInt(__y__) + parseInt(__height__) : parseInt(__y__) + dy,
					width: Math.abs(_width),
					height: Math.abs(_height)
				});
			}
			if (dragType === 'BR') {
				var _width2 = parseInt(__width__) + dx;
				var _height2 = parseInt(__height__) + dy;
				selectItem.attr({
					x: _width2 < 0 ? parseInt(__x__) + _width2 : __x__,
					y: _height2 < 0 ? parseInt(__y__) + _height2 : __y__,
					width: Math.abs(_width2),
					height: Math.abs(_height2)
				});
			}
			if (dragType === 'BL') {
				var _width3 = parseInt(__width__) - dx;
				var _height3 = parseInt(__height__) + dy;
				selectItem.attr({
					x: _width3 < 0 ? parseInt(__x__) + parseInt(__width__) : parseInt(__x__) + dx,
					y: _height3 < 0 ? parseInt(__y__) + _height3 : parseInt(__y__),
					width: Math.abs(_width3),
					height: Math.abs(_height3)
				});
			}
		}
		if (__TYPE__ === 'rect') {
			var _selectItem$data2 = selectItem.data(),
			    _width__ = _selectItem$data2.__width__,
			    _height__ = _selectItem$data2.__height__,
			    _x__ = _selectItem$data2.__x__,
			    _y__ = _selectItem$data2.__y__;

			if (dragType === 'TL') {
				var _width4 = parseInt(_width__) - dx;
				var _height4 = parseInt(_height__) - dy;
				selectItem.attr({
					x: _width4 < 0 ? parseInt(_x__) + parseInt(_width__) : parseInt(_x__) + dx,
					y: _height4 < 0 ? parseInt(_y__) + parseInt(_height__) : parseInt(_y__) + dy,
					width: Math.abs(_width4),
					height: Math.abs(_height4)
				});
			}
			if (dragType === 'TR') {
				var _width5 = parseInt(_width__) + dx;
				var _height5 = parseInt(_height__) - dy;
				selectItem.attr({
					x: _width5 < 0 ? parseInt(_x__) + _width5 : _x__,
					y: _height5 < 0 ? parseInt(_y__) + parseInt(_height__) : parseInt(_y__) + dy,
					width: Math.abs(_width5),
					height: Math.abs(_height5)
				});
			}
			if (dragType === 'BR') {
				var _width6 = parseInt(_width__) + dx;
				var _height6 = parseInt(_height__) + dy;
				selectItem.attr({
					x: _width6 < 0 ? parseInt(_x__) + _width6 : _x__,
					y: _height6 < 0 ? parseInt(_y__) + _height6 : _y__,
					width: Math.abs(_width6),
					height: Math.abs(_height6)
				});
			}
			if (dragType === 'BL') {
				var _width7 = parseInt(_width__) - dx;
				var _height7 = parseInt(_height__) + dy;
				selectItem.attr({
					x: _width7 < 0 ? parseInt(_x__) + parseInt(_width__) : parseInt(_x__) + dx,
					y: _height7 < 0 ? parseInt(_y__) + _height7 : parseInt(_y__),
					width: Math.abs(_width7),
					height: Math.abs(_height7)
				});
			}
		}
		if (__TYPE__ === 'circle') {
			var _selectItem$data3 = selectItem.data(),
			    __rx__ = _selectItem$data3.__rx__,
			    __ry__ = _selectItem$data3.__ry__,
			    __cx__ = _selectItem$data3.__cx__,
			    __cy__ = _selectItem$data3.__cy__;

			if (dragType === 'TL') {
				var rx = Math.abs(__rx__) - dx / 2;
				var ry = Math.abs(__ry__) - dy / 2;
				selectItem.attr({
					cx: parseInt(__cx__) + dx / 2,
					cy: parseInt(__cy__) + dy / 2,
					rx: Math.abs(rx),
					ry: Math.abs(ry)
				});
			}
			if (dragType === 'TR') {
				var _rx = Math.abs(__rx__) + dx / 2;
				var _ry = Math.abs(__ry__) - dy / 2;
				selectItem.attr({
					cx: parseInt(__cx__) + dx / 2,
					cy: parseInt(__cy__) + dy / 2,
					rx: Math.abs(_rx),
					ry: Math.abs(_ry)
				});
			}
			if (dragType === 'BR') {
				var _rx2 = Math.abs(__rx__) + dx / 2;
				var _ry2 = Math.abs(__ry__) + dy / 2;
				console.log(_rx2);
				selectItem.attr({
					cx: parseInt(__cx__) + dx / 2,
					cy: parseInt(__cy__) + dy / 2,
					rx: Math.abs(_rx2),
					ry: Math.abs(_ry2)
				});
			}
			if (dragType === 'BL') {
				var _rx3 = Math.abs(__rx__) - dx / 2;
				var _ry3 = Math.abs(__ry__) + dy / 2;
				selectItem.attr({
					cx: parseInt(__cx__) + dx / 2,
					cy: parseInt(__cy__) + dy / 2,
					rx: Math.abs(_rx3),
					ry: Math.abs(_ry3)
				});
			}
		}
		handleShow(selectItem);
		if (typeof onDrawChange === 'function') {
			onDrawChange(selectItem);
		}
	};
	var dragStart = function dragStart() {
		var selectItem = state.selectItem;

		var _attr2 = this.attr(),
		    dragType = _attr2.dragType;

		var _selectItem$attr2 = selectItem.attr(),
		    __TYPE__ = _selectItem$attr2.__TYPE__;

		if (__TYPE__ === 'image') {
			selectItem.data('__width__', selectItem.attr('width'));
			selectItem.data('__height__', selectItem.attr('height'));
			selectItem.data('__x__', selectItem.attr('x'));
			selectItem.data('__y__', selectItem.attr('y'));
		}
		if (__TYPE__ === 'rect') {
			selectItem.data('__width__', selectItem.attr('width'));
			selectItem.data('__height__', selectItem.attr('height'));
			selectItem.data('__x__', selectItem.attr('x'));
			selectItem.data('__y__', selectItem.attr('y'));
		}
		if (__TYPE__ === 'circle') {
			selectItem.data('__rx__', selectItem.attr('rx'));
			selectItem.data('__ry__', selectItem.attr('ry'));
			selectItem.data('__cx__', selectItem.attr('cx'));
			selectItem.data('__cy__', selectItem.attr('cy'));
			selectItem.data('__x__', selectItem.attr('x'));
			selectItem.data('__y__', selectItem.attr('y'));
		}
		if (typeof onDrawChange === 'function') {
			onDrawChange(selectItem);
		}
	};

	var setRectLT = target.rect(20, 20, 10, 10).attr({ dragType: 'TL', class: 'square2', fill: 'red' }).drag(dragChange, dragStart);
	var setRectRT = target.rect(20, 20, 10, 10).attr({ dragType: 'TR', class: 'square2', fill: 'red' }).drag(dragChange, dragStart);
	var setRectRB = target.rect(20, 20, 10, 10).attr({ dragType: 'BR', class: 'square2', fill: 'red' }).drag(dragChange, dragStart);
	var setRectTB = target.rect(20, 20, 10, 10).attr({ dragType: 'BL', class: 'square2', fill: 'red' }).drag(dragChange, dragStart);

	var handleShow = function handleShow(path, callback) {
		var _path$getBBox = path.getBBox(),
		    x = _path$getBBox.x,
		    y = _path$getBBox.y,
		    width = _path$getBBox.width,
		    height = _path$getBBox.height;

		state.selectItem = path;

		var _path$attr = path.attr(),
		    __TYPE__ = _path$attr.__TYPE__;

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
		if (__TYPE__ === 'rect' || __TYPE__ === 'circle' || __TYPE__ === 'image') {
			setRectLT.attr({ x: x - 10, y: y - 10, transform: '' });
			setRectLT.data('origTransform', '');
			setRectRT.attr({ x: x + width, y: y - 10, transform: '' });
			setRectRT.data('origTransform', '');
			setRectTB.attr({ x: x - 10, y: y + height, transform: '' });
			setRectTB.data('origTransform', '');
			setRectRB.attr({ x: x + width, y: y + height, transform: '' });
			setRectRB.data('origTransform', '');
			group.add(square2, setRectLT, setRectRT, setRectRB, setRectTB);
		} else {
			setRectLT.remove();
			setRectRT.remove();
			setRectTB.remove();
			setRectRB.remove();
		}
	};
	group.add(square2, setRectLT, setRectRT, setRectRB, setRectTB);

	return {
		group: group,
		handleShow: handleShow,
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
};