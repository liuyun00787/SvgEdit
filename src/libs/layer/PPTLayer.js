import classNames from 'classnames';
import { createVideo } from '../tools';

export default ({ role = 'Broadcaster', attr = {}, target, globalPlayer, onPlayChange}) => {
  const group = target.group(attr);
	const PPTBG = target.rect(0, 0, 0, 0).attr({ class: 'whiteBoardBG', fill: '#ffff00', fillOpacity: 0 }).attr({
		width: attr.width || 0,
		height: attr.height || 0,
	});
	group.add(PPTBG);
	PPTBG.click(function(e) {
		if (globalPlayer) {
			console.log(globalPlayer.paused())
			if (globalPlayer.paused()) {
				globalPlayer.play();
			} else {
				globalPlayer.pause();
			}
			if (typeof onPlayChange === 'function') {
				onPlayChange(globalPlayer.paused());
			}
		}
		console.log(e.offsetX, e.offsetY)
	})
  if (attr.__ID__) {
		group.attr({
			class: classNames('PPTLayer'),
		});
  } else {
	  group.attr({
		  class: classNames('PPTLayer'),
		  __ID__: group.id,
	  });
  }
	// const video = createVideo({ role, attr: { width: attr.width, height: attr.height }, target });
	// group.add(video.group);
	// video.runVideo();
  return {
	  layer: group,
	  handleSetWH: ({ width, height }) => {
		  PPTBG.attr({ width, height });
		  // video.handleSetWH({ width, height });
	  },
  };
};
