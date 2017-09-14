import classNames from 'classnames';
import { createItemWrap, createPath, createText, createRect, createCircle, createImage } from '../tools';

Snap.plugin((Snap, Element) => {
	const elproto = Element.prototype;
	elproto.PageToFront = function () {
		this.paper.select('.PPTLayer').add(this);
	};
});

export default ({ role = 'Broadcaster', ppt = [], current = 1, attr = {}, target, globalPlayer, onPlayChange}) => {
  let state = {
	  ppt: ppt || [],
  	page: current,
  };
  const setState = (nState = {}, callback) => {
	  state = {...state, ...nState};
	  if (typeof callback === 'function') {
		  callback();
	  }
  };
	const group = target.group(attr).attr({ class: classNames('PPTLayer') });
	const init = ({ list = [], current = 1 }) => {
		setState({ ppt: list }, () => {
			list.map((item, index) => {
				handleCreatePage({ type: item.type, item });
			});
			goTo(current);
		});
	};
	const handleCreatePage = ({ type = 'image', item = {} }) => {
		const groupPage = target.group({ opacity: 0 }).attr({
			class: classNames('page', `page-${item.page}`),
			__PAGETYPE__: type,
		}).data('info', item);
		const content = item.content || [];
		const info = content[0] || {};
		let attr = {
			href: info.url,
			width: 960,
			height: 540,
			class: 'page-content',
		};
		// group.clear();
		let page;
		if (globalPlayer) {
			globalPlayer.pause();
			if (typeof onPlayChange === 'function') {
				onPlayChange(globalPlayer.paused());
			}
		}
		if (type === 'image') {
			page = createImage({ attr, target });
			groupPage.add(page.group)
			group.add(groupPage);
			return groupPage;
		}
		if (type === 'video') {
			// attr.href = require('../../assets/videoPlayBG.png');
			page = createImage({ attr, target });
			page.group.click(function(e) {
				if (globalPlayer) {
					groupPage.attr({ opacity: 0 });
					if (globalPlayer.paused()) {
						globalPlayer.el_.parentNode.style.opacity = 1;
						globalPlayer.play();
					} else {
						globalPlayer.pause();
					}
					if (typeof onPlayChange === 'function') {
						onPlayChange(globalPlayer.paused());
					}
				}
			});
			groupPage.add(page.group)
			group.add(groupPage);
			return groupPage;
		}
		if (type === 'question') {
			attr.href = require('../../assets/questionBg.png');
			page = createImage({ attr, target });
			groupPage.add(page.group)
			group.add(groupPage);
			return groupPage;
		}
	};
	const goTo = (page) => {
		setState({ page }, () => {
			group.selectAll('.page').attr({ opacity: 0 });
			group.select(`.page-${state.page}`).attr({ opacity: 1 }).PageToFront();
			if (globalPlayer) {
				globalPlayer.pause();
				if (typeof onPlayChange === 'function') {
					onPlayChange(true);
				}
				if (group.select(`.page-${state.page}`).attr('__PAGETYPE__') === 'video') {
					const { content = [] } = group.select(`.page-${state.page}`).data('info') || {};
					const { video, url } = content[0] || {};
					globalPlayer.el_.parentNode.style.opacity = 1;
					if (url) {
						globalPlayer.poster(url);
					}
					globalPlayer.src(video || url);
				} else {
					globalPlayer.el_.parentNode.style.opacity = 0;
				}
			}
		})
	};
	init({ list: ppt, current });
	return {
	  layer: group,
	  init,
	  handleCreatePage,
		getState() {
	  	return state;
		},
		setState,
		goTo,
  };
};
