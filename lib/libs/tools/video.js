'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _snapSvg = require('imports?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js');

var _snapSvg2 = _interopRequireDefault(_snapSvg);

var _video = require('imports?this=>window,fix=>module.exports=0!video.js/dist/video.js');

var _video2 = _interopRequireDefault(_video);

require('../video.js/video-js.min.css');

require('./assets/video.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var _ref$role = _ref.role,
	    role = _ref$role === undefined ? 'Broadcaster' : _ref$role,
	    _ref$attr = _ref.attr,
	    attr = _ref$attr === undefined ? {} : _ref$attr,
	    target = _ref.target;

	var group = target.group(attr);
	var videoWrapDom = void 0;
	var videoDom = void 0;
	var bg = target.rect(0, 0, 0, 0).attr({ class: 'whiteBoardBG', fill: '#000', fillOpacity: 0.5 }).attr({
		width: attr.width || 0,
		height: attr.height || 0
	});
	var id = (0, _md2.default)(new Date() + Math.random() + 'video');
	var video = _snapSvg2.default.fragment('\n\t\t\t<foreignObject className="bg"} width="' + attr.width + '" height="' + attr.height + '">\n\t\t\t\t<div id="' + id + '-wrpa" class="videoSVGBOX-wrap" style="width: ' + attr.width + 'px; height: ' + attr.height + 'px;">\n\t\t\t\t\t<video\n\t\t\t\t    id="' + id + '"\n\t\t\t\t    class="video-js videoSVGBOX"\n\t\t\t\t    controls\n\t\t\t\t    preload="auto"\n\t\t\t\t    poster="//vjs.zencdn.net/v/oceans.png"\n\t\t\t\t    data-setup=\'{}\'>\n\t\t\t\t\t  <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />\n\t\t\t\t\t  <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm" />\n\t\t\t\t\t  <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg" />\n\t\t\t\t\t  <p class="vjs-no-js">\n\t\t\t\t\t    To view this video please enable JavaScript, and consider upgrading to a\n\t\t\t\t\t    web browser that\n\t\t\t\t\t    <a href="http://videojs.com/html5-video-support/" target="_blank">\n\t\t\t\t\t      supports HTML5 video\n\t\t\t\t\t    </a>\n\t\t\t\t\t  </p>\n\t\t\t\t</video>\n\t\t\t</div>\n\t\t</foreignObject>');
	group.add(bg, video);
	videoWrapDom = document.getElementById(id + '-wrpa');
	videoDom = document.getElementById(id);
	return {
		group: group,
		runVideo: function runVideo() {
			try {
				if (videoDom) {
					var options = {};
					(0, _video2.default)(videoDom, options, function onPlayerReady() {
						_video2.default.log('Your player is ready!');
						// In this context, `this` is the player that was created by Video.js.
						// this.play();
						// How about an event listener?
						this.on('ended', function () {
							_video2.default.log('Awww...over so soon?!');
						});
					});
				}
			} catch (e) {
				console.log(e);
			}
		},

		handleSetWH: function handleSetWH(_ref2) {
			var width = _ref2.width,
			    height = _ref2.height;

			console.log(video.select('.bg'));
			bg.attr({ width: width, height: height });
			if (videoWrapDom) {
				videoWrapDom.style.width = width + 'px';
				videoWrapDom.style.height = height + 'px';
			}
			if (videoDom) {
				// videoDom.style.width = `${width}px`;
				// videoDom.style.height = `${height}px`;
				if (document.getElementsByClassName('videoSVGBOX')) {
					// document.getElementsByClassName('.videoSVGBOX').style.width = '100%';
				}
			}
		}
	};
};