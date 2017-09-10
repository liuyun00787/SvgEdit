'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _video = require('imports?this=>window,fix=>module.exports=0!../../../../node_modules/video.js/dist/video.js');

var _video2 = _interopRequireDefault(_video);

require('../../../../node_modules/video.js/dist/video-js.min.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var _ref$role = _ref.role,
	    role = _ref$role === undefined ? 'Broadcaster' : _ref$role,
	    _ref$attr = _ref.attr,
	    attr = _ref$attr === undefined ? {} : _ref$attr,
	    target = _ref.target;

	var path = target.paper.ellipse(attr.x, attr.y, 1, 1).attr(_extends({}, attr, {
		fill: attr.fill ? attr.fill : 'rgba(0,0,0,0)',
		__TYPE__: attr.__TYPE__ ? attr.__TYPE__ : 'circle'
	}));
	if (!attr.__ID__) {
		path.attr({
			__ID__: path.id,
			class: (0, _classnames2.default)('circleItem', path.id)
		});
	} else {
		path.attr({
			id: attr.__ID__
		});
	}
	var fobjectVideo = '<svg><foreignObject width="500" height="500" style="overflow: hidden">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div style="width: 500px; height: 500px;position: absolute; background: #000;">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<video\n\t\t\t\t\t\t\t\t\t\t\t\t\t    id="my-player"\n\t\t\t\t\t\t\t\t\t\t\t\t\t    class="video-js"\n\t\t\t\t\t\t\t\t\t\t\t\t\t    controls\n\t\t\t\t\t\t\t\t\t\t\t\t\t    preload="auto"\n\t\t\t\t\t\t\t\t\t\t\t\t\t    poster="//vjs.zencdn.net/v/oceans.png"\n\t\t\t\t\t\t\t\t\t\t\t\t\t    data-setup=\'{}\'>\n\t\t\t\t\t\t\t\t\t\t\t\t\t  <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>\n\t\t\t\t\t\t\t\t\t\t\t\t\t  <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source>\n\t\t\t\t\t\t\t\t\t\t\t\t\t  <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></source>\n\t\t\t\t\t\t\t\t\t\t\t\t\t  <p class="vjs-no-js">\n\t\t\t\t\t\t\t\t\t\t\t\t\t    To view this video please enable JavaScript, and consider upgrading to a\n\t\t\t\t\t\t\t\t\t\t\t\t\t    web browser that\n\t\t\t\t\t\t\t\t\t\t\t\t\t    <a href="http://videojs.com/html5-video-support/" target="_blank">\n\t\t\t\t\t\t\t\t\t\t\t\t\t      supports HTML5 video\n\t\t\t\t\t\t\t\t\t\t\t\t\t    </a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t  </p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</video>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</foreignObject></svg>';
	var video = target.parse(fobjectVideo);
	path.add(video);
	var player = (0, _video2.default)('my-player');
	return {
		group: path,
		handleChange: function handleChange(_ref2) {
			var width = _ref2.width,
			    height = _ref2.height;

			var getBox = path.getBBox();
			path.attr({
				width: getBox.width += width,
				height: getBox.height += height
			});
			onChange();
		}
	};
};