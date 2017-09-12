'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tools = require('../tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Snap.plugin(function (Snap, Element) {
	var elproto = Element.prototype;
	elproto.PageToFront = function () {
		this.paper.select('.PPTLayer').add(this);
	};
});

exports.default = function (_ref) {
	var _ref$role = _ref.role,
	    role = _ref$role === undefined ? 'Broadcaster' : _ref$role,
	    _ref$ppt = _ref.ppt,
	    ppt = _ref$ppt === undefined ? [] : _ref$ppt,
	    _ref$current = _ref.current,
	    current = _ref$current === undefined ? 1 : _ref$current,
	    _ref$attr = _ref.attr,
	    attr = _ref$attr === undefined ? {} : _ref$attr,
	    target = _ref.target,
	    globalPlayer = _ref.globalPlayer,
	    onPlayChange = _ref.onPlayChange;

	var state = {
		ppt: ppt || [],
		page: current
	};
	var setState = function setState() {
		var nState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var callback = arguments[1];

		state = _extends({}, state, nState);
		if (typeof callback === 'function') {
			callback();
		}
	};
	var group = target.group(attr).attr({ class: (0, _classnames2.default)('PPTLayer') });
	var init = function init() {
		var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

		setState({ ppt: list }, function () {
			list.map(function (item, index) {
				handleCreatePage({ type: item.type, item: item });
			});
		});
	};
	var handleCreatePage = function handleCreatePage(_ref2) {
		var _ref2$type = _ref2.type,
		    type = _ref2$type === undefined ? 'image' : _ref2$type,
		    _ref2$item = _ref2.item,
		    item = _ref2$item === undefined ? {} : _ref2$item;

		var groupPage = target.group({ opacity: 0 }).attr({
			class: (0, _classnames2.default)('page', 'page-' + item.page),
			__PAGETYPE__: type
		});
		var content = item.content || [];
		var info = content[0] || {};
		var attr = {
			href: info.url,
			width: 960,
			height: 540,
			class: 'page-content'
		};
		// group.clear();
		var page = void 0;
		if (globalPlayer) {
			globalPlayer.pause();
			onPlayChange(globalPlayer.paused());
		}
		if (type === 'image') {
			page = (0, _tools.createImage)({ attr: attr, target: target });
			groupPage.add(page.group);
			group.add(groupPage);
			return groupPage;
		}
		if (type === 'video') {
			// attr.href = require('../../assets/videoPlayBG.png');
			page = (0, _tools.createImage)({ attr: attr, target: target });
			page.group.click(function (e) {
				if (globalPlayer) {
					groupPage.attr({ opacity: 0 });
					if (globalPlayer.paused()) {
						globalPlayer.play();
					} else {
						globalPlayer.pause();
					}
					if (typeof onPlayChange === 'function') {
						onPlayChange(globalPlayer.paused());
					}
				}
			});
			groupPage.add(page.group);
			group.add(groupPage);
			return groupPage;
		}
		if (type === 'question') {
			attr.href = require('../../assets/questionBg.png');
			page = (0, _tools.createImage)({ attr: attr, target: target });
			groupPage.add(page.group);
			group.add(groupPage);
			return groupPage;
		}
	};
	var goTo = function goTo(page) {
		if (group.select('.page-' + state.page) && group.select('.page-' + state.page).PageToFront) {
			setState({ page: page }, function () {
				if (globalPlayer) {
					globalPlayer.pause();
					if (typeof onPlayChange === 'function') {
						onPlayChange(true);
					}
				}
				// group.selectAll('.page-content').attr({ opacity: 1 });
				group.selectAll('.page').attr({ opacity: 0 });
				group.select('.page-' + state.page).attr({ opacity: 1 }).PageToFront();
			});
		}
	};
	init(ppt);
	if (group.select('.page-' + state.page)) {
		group.select('.page-' + state.page).attr({ x: 0, y: 0, opacity: 1 }).PageToFront();
	}
	return {
		layer: group,
		init: init,
		handleCreatePage: handleCreatePage,
		getState: function getState() {
			return state;
		},

		setState: setState,
		goTo: goTo
	};
};