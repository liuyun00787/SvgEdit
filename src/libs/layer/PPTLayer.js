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
	const init = (list = []) => {
		setState({ ppt: list }, () => {
			list.map((item, index) => {
				handleCreatePage({ type: item.type, item });
			});
		});
	};
	const handleCreatePage = ({ type = 'image', item = {} }) => {
		const groupPage = target.group({}).attr({
			class: classNames('page', `page-${item.page}`),
			__PAGETYPE__: type,
		});
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
			onPlayChange(globalPlayer.paused());
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
					if (globalPlayer.paused()) {
						group.attr({ opacity: 0 });
						globalPlayer.play();
					} else {
						group.attr({ opacity: 1 });
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
		if (group.select(`.page-${state.page}`) && group.select(`.page-${state.page}`).PageToFront) {
			setState({ page }, () => {
				if (globalPlayer) {
					group.attr({ opacity: 1 });
					globalPlayer.pause();
					if (typeof onPlayChange === 'function') {
						onPlayChange(true);
					}
				}
				group.select(`.page-${state.page}`).PageToFront();
			})
		}
	};
	init(ppt);
	if (group.select(`.page-${state.page}`)) {
		group.select(`.page-${state.page}`).attr({ x: 0, y: 0 }).PageToFront();
	}
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
