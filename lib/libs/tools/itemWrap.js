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
		fillOpacity: 0.6,
		transform: 'matrix(1,0,0,1,-10000,-10000)',
		class: (0, _classnames2.default)('WBWrapItem', attr.className)
	}).drag(function (dx, dy) {
		// if (!state.isDrag) return;
		// const dx = event.offsetX;
		// const dy = event.offsetY;
		var selectItem = state.selectItem;

		var transform = this.data('origTransform') + (this.data('origTransform') ? 'T' : 't') + [dx, dy];
		this.attr({
			transform: transform
		});
		var selectOrigTransform = selectItem.data('origTransform');
		selectItem.attr({
			transform: selectOrigTransform + (selectOrigTransform ? 'T' : 't') + [dx, dy]
		});
		if (typeof onDrawChange === 'function') {
			onDrawChange(selectItem);
		}
	}, function () {
		// if (!state.isDrag) return;
		var selectItem = state.selectItem;

		this.data('origTransform', this.transform().local);
		selectItem.data('origTransform', selectItem.transform().local);
		if (typeof onDrawChange === 'function') {
			onDrawChange(selectItem);
		}
	});
	var square = target.rect(0, 0, 0, 0).attr({ class: 'square', fill: 'coral' });
	var square2 = target.rect(0, 0, 0, 0).attr({ class: 'square2', fill: 'coral' });

	var mousedown = function mousedown(e) {
		state.hoverIn = true;
		state.isDrag = false;
		console.log(e);
		this.data('X', e.clientX);
		this.data('Y', e.clientY);
		this.attr({
			fill: '#ff00ff'
		});
	};
	var mouseup = function mouseup(e) {
		state.hoverIn = true;
		state.isDrag = true;
		this.data('X', 0);
		this.data('Y', 0);
		console.log(e);
		this.attr({
			fill: 'red'
		});
	};
	var mousemove = function mousemove(e) {
		var clientX = e.clientX,
		    clientY = e.clientY;
		var _data = this.data,
		    X = _data.X,
		    Y = _data.Y;
		// if (!state.isDrag) {
		// 	group.attr({
		// 		transform: Snap.Matrix(X - clientX, Y - clientY)
		// 	})
		// }
	};

	var setRectLT = target.rect(20, 20, 10, 10).attr({ class: 'square2', fill: 'red' }).mousedown(mousedown).mousemove(mousemove).mouseup(mouseup);
	var setRectRT = target.rect(20, 20, 10, 10).attr({ class: 'square2', fill: 'red' }).mousedown(mousedown).mousemove(mousemove).mouseup(mouseup);
	var setRectRB = target.rect(20, 20, 10, 10).attr({ class: 'square2', fill: 'red' }).mousedown(mousedown).mousemove(mousemove).mouseup(mouseup);
	var setRectTB = target.rect(20, 20, 10, 10).attr({ class: 'square2', fill: 'red' }).mousedown(mousedown).mousemove(mousemove).mouseup(mouseup);

	group.add(square, square2, setRectLT, setRectRT, setRectRB, setRectTB);

	return {
		group: group,
		handleShow: function handleShow(path, callback) {
			var _path$getBBox = path.getBBox(),
			    x = _path$getBBox.x,
			    y = _path$getBBox.y,
			    width = _path$getBBox.width,
			    height = _path$getBBox.height;

			state.selectItem = path;
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
			setRectLT.attr({ x: x - 15, y: y - 15, transform: '' });
			setRectLT.data('origTransform', '');
			setRectRT.attr({ x: x + width + 5, y: y - 15, transform: '' });
			setRectRT.data('origTransform', '');
			setRectTB.attr({ x: x - 15, y: y + height + 5, transform: '' });
			setRectTB.data('origTransform', '');
			setRectRB.attr({ x: x + width + 5, y: y + height + 5, transform: '' });
			setRectRB.data('origTransform', '');
		},
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