'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tools = require('../tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { createVideo } from '../tools';

exports.default = function (_ref) {
	var _ref$role = _ref.role,
	    role = _ref$role === undefined ? 'Broadcaster' : _ref$role,
	    _ref$attr = _ref.attr,
	    attr = _ref$attr === undefined ? {} : _ref$attr,
	    target = _ref.target,
	    globalPlayer = _ref.globalPlayer,
	    onPlayChange = _ref.onPlayChange;

	var group = target.group(attr);
	var bg = target.rect(0, 0, 0, 0).attr({ class: 'pptBG', fill: '#ffff00', fillOpacity: 0 }).attr({
		width: attr.width || 0,
		height: attr.height || 0
	});
	group.add(bg);
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
	var handleCreatePage = function handleCreatePage(_ref2) {
		var _ref2$type = _ref2.type,
		    type = _ref2$type === undefined ? 'image' : _ref2$type,
		    _ref2$attr = _ref2.attr,
		    attr = _ref2$attr === undefined ? {} : _ref2$attr;

		console.log(type);
		var groupPage = target.group({});
		group.clear();
		var page = void 0;
		if (globalPlayer) {
			globalPlayer.pause();
			onPlayChange(globalPlayer.paused());
		}
		if (type === 'image') {
			page = (0, _tools.createImage)({ attr: attr, target: target });
		}
		if (type === 'video') {
			page = (0, _tools.createImage)({ attr: attr, target: target });
			console.log(page.group);
			page.group.click(function (e) {
				console.log(1111);
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
		}
		groupPage.add(page.group);
		group.add(bg, groupPage);
		return groupPage;
	};
	return {
		layer: group,
		handleSetWH: function handleSetWH(_ref3) {
			var width = _ref3.width,
			    height = _ref3.height;

			bg.attr({ width: width, height: height });
			// video.handleSetWH({ width, height });
		},

		handleCreatePage: handleCreatePage
	};
};