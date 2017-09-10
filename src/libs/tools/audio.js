import classNames from 'classnames';
import videojs from 'imports?this=>window,fix=>module.exports=0!../../../../node_modules/video.js/dist/video.js';
import '../../../../node_modules/video.js/dist/video-js.min.css';

export default ({ role = 'Broadcaster', attr = {}, target }) => {
	const path = target.paper.ellipse(attr.x, attr.y, 1, 1).attr({
		...attr,
		fill: attr.fill ? attr.fill : 'rgba(0,0,0,0)',
		__TYPE__: attr.__TYPE__ ? attr.__TYPE__ : 'circle',
	});
	if (!attr.__ID__) {
		path.attr({
			__ID__: path.id,
			class: classNames('circleItem', path.id),
		});
	} else {
		path.attr({
			id: attr.__ID__,
		});
	}
	const fobjectVideo = `<svg><foreignObject width="500" height="500" style="overflow: hidden">
													<div style="width: 500px; height: 500px;position: absolute; background: #000;">
														<video
													    id="my-player"
													    class="video-js"
													    controls
													    preload="auto"
													    poster="//vjs.zencdn.net/v/oceans.png"
													    data-setup='{}'>
													  <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>
													  <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source>
													  <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></source>
													  <p class="vjs-no-js">
													    To view this video please enable JavaScript, and consider upgrading to a
													    web browser that
													    <a href="http://videojs.com/html5-video-support/" target="_blank">
													      supports HTML5 video
													    </a>
													  </p>
													</video>
													</div>
													</foreignObject></svg>`;
	const video = target.parse(fobjectVideo);
	path.add(video);
	const player = videojs('my-player');
	return {
    group: path,
    handleChange: ({ width, height }) => {
      const getBox = path.getBBox();
      path.attr({
        width: getBox.width += width,
        height: getBox.height += height,
      });
      onChange();
    },
  };
};
