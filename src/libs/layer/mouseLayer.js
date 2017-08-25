import classNames from 'classnames';

const getSrc = (type) => {
	const mouseStyle = {
		hand: {
			href: require('../../assets/hand.svg'),
		},
		pen: {
			href: require('../../assets/pen.svg'),
		},
	};
	let href = '';
	switch (type) {
		case 'pen': {
			href = mouseStyle.pen.href;
			break;
		}
		case 'hand': {
			href = mouseStyle.hand.href;
			break;
		}
		default: {
			href = mouseStyle.pen.href;
		}
	}
	return href;
}

export default ({ role = 'Broadcaster', attr = {}, target }) => {
  const href = getSrc(attr.__TYPE__);
  const mouse = target.image(href, attr.x || 0, attr.y || 0, attr.w || 25, attr.h || 25).attr({
	  class: classNames('mouse'),
	  ...attr,
  });
  const group = target.group({
    class: classNames('mouseLayer', attr.class),
  }).add(mouse);
  return {
	  layer: group,
    handleSetPosition({ x = 0, y = 0, w = 25, h = 25 }, callback) {
      let info = {};
      if (role === 'Broadcaster') {
        info = { x: x - 1, y: y - h - 1, w, h };
      }
      if (role === 'Viewer') {
        info = { x, y, w, h };
      }
      mouse.attr(info);
	    if (role === 'Broadcaster' && typeof callback === 'function') {
		    callback(mouse.attr());
	    }
      return mouse;
    },
	  handleSetType(type = 'pen', callback) {
		  mouse.attr({
			  __TYPE__: type,
			  src: getSrc(type),
		  });
		  if (role === 'Broadcaster' && typeof callback === 'function') {
			  callback(mouse.attr());
		  }
	  },
  };
};
