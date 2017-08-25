'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getSrc = function getSrc(type) {
	var mouseStyle = {
		hand: {
			href: require('../../assets/hand.svg')
		},
		pen: {
			href: require('../../assets/pen.svg')
		}
	};
	var href = '';
	switch (type) {
		case 'pen':
			{
				href = mouseStyle.pen.href;
				break;
			}
		case 'hand':
			{
				href = mouseStyle.hand.href;
				break;
			}
		default:
			{
				href = mouseStyle.pen.href;
			}
	}
	return href;
};

exports.default = function (_ref) {
	var _ref$role = _ref.role,
	    role = _ref$role === undefined ? 'Broadcaster' : _ref$role,
	    _ref$attr = _ref.attr,
	    attr = _ref$attr === undefined ? {} : _ref$attr,
	    target = _ref.target;

	var href = getSrc(attr.__TYPE__);
	var mouse = target.image(href, attr.x || 0, attr.y || 0, attr.w || 25, attr.h || 25).attr(_extends({
		class: (0, _classnames2.default)('mouse')
	}, attr));
	var group = target.group({
		class: (0, _classnames2.default)('mouseLayer', attr.class)
	}).add(mouse);
	return {
		layer: group,
		handleSetPosition: function handleSetPosition(_ref2, callback) {
			var _ref2$x = _ref2.x,
			    x = _ref2$x === undefined ? 0 : _ref2$x,
			    _ref2$y = _ref2.y,
			    y = _ref2$y === undefined ? 0 : _ref2$y,
			    _ref2$w = _ref2.w,
			    w = _ref2$w === undefined ? 25 : _ref2$w,
			    _ref2$h = _ref2.h,
			    h = _ref2$h === undefined ? 25 : _ref2$h;

			var info = {};
			if (role === 'Broadcaster') {
				info = { x: x - 1, y: y - h - 1, w: w, h: h };
			}
			if (role === 'Viewer') {
				info = { x: x, y: y, w: w, h: h };
			}
			mouse.attr(info);
			if (role === 'Broadcaster' && typeof callback === 'function') {
				callback(mouse.attr());
			}
			return mouse;
		},
		handleSetType: function handleSetType() {
			var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'pen';
			var callback = arguments[1];

			mouse.attr({
				__TYPE__: type,
				src: getSrc(type)
			});
			if (role === 'Broadcaster' && typeof callback === 'function') {
				callback(mouse.attr());
			}
		}
	};
};