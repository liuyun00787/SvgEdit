'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tools = require('../tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var _ref$role = _ref.role,
	    role = _ref$role === undefined ? 'Broadcaster' : _ref$role,
	    _ref$attr = _ref.attr,
	    attr = _ref$attr === undefined ? {} : _ref$attr,
	    target = _ref.target,
	    globalPlayer = _ref.globalPlayer,
	    onPlayChange = _ref.onPlayChange;

	var group = target.group(attr);
	var PPTBG = target.rect(0, 0, 0, 0).attr({ class: 'whiteBoardBG', fill: '#ffff00', fillOpacity: 0 }).attr({
		width: attr.width || 0,
		height: attr.height || 0
	});
	group.add(PPTBG);
	PPTBG.click(function (e) {
		if (globalPlayer) {
			console.log(globalPlayer.paused());
			if (globalPlayer.paused()) {
				globalPlayer.play();
			} else {
				globalPlayer.pause();
			}
			if (typeof onPlayChange === 'function') {
				onPlayChange(globalPlayer.paused());
			}
		}
		console.log(e.offsetX, e.offsetY);
	});
	if (attr.__ID__) {
		group.attr({
			class: (0, _classnames2.default)('PPTLayer')
		});
	} else {
		group.attr({
			class: (0, _classnames2.default)('PPTLayer'),
			__ID__: group.id
		});
	}
	// const video = createVideo({ role, attr: { width: attr.width, height: attr.height }, target });
	// group.add(video.group);
	// video.runVideo();
	return {
		layer: group,
		handleSetWH: function handleSetWH(_ref2) {
			var width = _ref2.width,
			    height = _ref2.height;

			PPTBG.attr({ width: width, height: height });
			// video.handleSetWH({ width, height });
		}
	};
};