'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var _ref$role = _ref.role,
	    role = _ref$role === undefined ? 'Broadcaster' : _ref$role,
	    _ref$attr = _ref.attr,
	    attr = _ref$attr === undefined ? {} : _ref$attr,
	    target = _ref.target;

	var path = target.paper.image(attr.href, 0, 0, 10, 10).attr(_extends({}, attr, {
		__TYPE__: attr.__TYPE__ ? attr.__TYPE__ : 'image'
	}));
	if (!attr.__ID__) {
		path.attr({
			__ID__: path.id,
			class: (0, _classnames2.default)('imageItem', path.id)
		});
	} else {
		path.attr({
			id: attr.__ID__
		});
	}
	return {
		group: path,
		handleChange: function handleChange(_ref2) {
			var _ref2$attr = _ref2.attr,
			    attr = _ref2$attr === undefined ? {} : _ref2$attr,
			    callback = _ref2.callback;

			path.attr(attr);
			if (typeof onChange === 'function') {
				callback(path.attr());
			}
		}
	};
};