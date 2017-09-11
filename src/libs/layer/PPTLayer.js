import classNames from 'classnames';
import { createItemWrap, createPath, createText, createRect, createCircle, createImage } from '../tools';
// import { createVideo } from '../tools';

export default ({ role = 'Broadcaster', attr = {}, target, globalPlayer, onPlayChange}) => {
  const group = target.group(attr);
	const bg = target.rect(0, 0, 0, 0).attr({ class: 'pptBG', fill: '#ffff00', fillOpacity: 0 }).attr({
		width: attr.width || 0,
		height: attr.height || 0,
	});
	group.add(bg);
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
	const handleCreatePage = ({ type = 'image', attr = {} }) => {
  	console.log(type);
		const groupPage = target.group({});
		group.clear();
		let page;
		if (globalPlayer) {
			globalPlayer.pause();
			onPlayChange(globalPlayer.paused());
		}
		if (type === 'image') {
			page = createImage({ attr, target });
		}
		if (type === 'video') {
			page = createImage({ attr, target });
			console.log(page.group);
			page.group.click(function(e) {
				console.log(1111)
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
		}
		groupPage.add(page.group)
		group.add(bg, groupPage);
		return groupPage;
	};
  return {
	  layer: group,
	  handleSetWH({ width, height }) {
		  bg.attr({ width, height });
		  // video.handleSetWH({ width, height });
	  },
	  handleCreatePage,
  };
};
