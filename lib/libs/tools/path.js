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

	var path = target.paper.path().attr(_extends({}, attr, {
		d: attr.d ? attr.d : 'M' + attr.x + ',' + attr.y,
		fill: attr.fill ? attr.fill : 'rgba(0,0,0,0)',
		__TYPE__: attr.__TYPE__ ? attr.__TYPE__ : 'path'
	}));
	if (!attr.__ID__) {
		path.attr({
			__ID__: path.id,
			class: (0, _classnames2.default)('pathItem', path.id)
		});
	} else {
		path.attr({
			id: attr.__ID__
		});
	}
	return {
		group: path
	};
};