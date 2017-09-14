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
	    target = _ref.target,
	    _ref$textInput = _ref.textInput,
	    textInput = _ref$textInput === undefined ? {} : _ref$textInput,
	    onDrawChange = _ref.onDrawChange,
	    handleShow = _ref.handleShow,
	    handleHide = _ref.handleHide;

	var after = ' | ';
	if (role !== 'Broadcaster') {
		after = '';
	}
	var path = target.paper.text(attr.x, attr.y, (attr.text || '') + ' ' + after).attr(_extends({}, attr, {
		fontSize: attr.fontSize ? attr.fontSize : 16,
		__TEXT__: attr.__TEXT__ ? attr.__TEXT__ : '',
		__TYPE__: attr.__TYPE__ ? attr.__TYPE__ : 'text'
	}));
	if (!attr.__ID__) {
		path.attr({
			__ID__: path.id,
			class: (0, _classnames2.default)('textItem', path.id)
		});
	} else {
		path.attr({
			id: attr.__ID__
		});
	}
	var setText = function setText() {
		var _path$attr = path.attr(),
		    _path$attr$__TEXT__ = _path$attr.__TEXT__,
		    __TEXT__ = _path$attr$__TEXT__ === undefined ? '' : _path$attr$__TEXT__;

		var text = __TEXT__.replace(after, '');
		if (typeof textInput.select === 'function') {
			textInput.select({
				text: text === after ? ' ' : text,
				cb: function cb() {
					var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

					var T = text + after;
					path.attr({ text: T, __TEXT__: T.replace(after, '') || ' ' });
					if (typeof onDrawChange === 'function') {
						onDrawChange(path);
					}
					if (typeof handleShow === 'function') {
						handleShow(path);
					}
				},
				blurCB: function blurCB() {
					var text = path.attr('__TEXT__');
					path.attr({ text: text });
					if (!(text || ' ').replace(/(^\s*)|(\s*$)/g, '') && typeof handleHide === 'function') {
						path.attr({ text: ' ', __TEXT__: ' ' });
						if (typeof onDrawChange === 'function') {
							onDrawChange(path);
						}
						handleHide();
						path.remove();
					}
				}
			});
		}
	};
	setTimeout(setText, 100);

	return {
		group: path,
		handeFocus: function handeFocus() {
			setTimeout(setText, 100);
		}
	};
};