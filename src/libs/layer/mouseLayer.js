import classNames from 'classnames';

const mouseStyle = {
  hand: {
    src: require('../../assets/hand.svg'),
  },
  pen: {
    src: require('../../assets/pen.svg'),
  },
};

function getSrc(type) {
	let src = '';
	switch (type) {
		case 'pen': {
			src = mouseStyle.pen.src;
			break;
		}
		case 'hand': {
			src = mouseStyle.hand.src;
			break;
		}
		default: {
			src = mouseStyle.pen.src;
		}
	}
	return src;
}

export default (role = 'Broadcaster', { class: className, __TYPE__ = 'pen', x = 0, y = 0, w = 25, h = 25 }, target) => {
  const src = getSrc(__TYPE__);
  const mouse = target.image(src, x, y, w, h).attr({
    __TYPE__,
    class: classNames('mouse', className),
  });
  const group = target.group({
    class: 'mouseLayer',
  }).add(mouse);
  return {
	  layer: group,
    handleSetPosition({ x = 0, y = 0, w = 25, h = 25 }, callback) {
      let info = {};
      if (role === 'Broadcaster') {
        info = {
          x: x - 1,
          y: y - h - 1,
          w,
          h,
        };
      }
      if (role === 'Viewer') {
        info = {
          x,
          y,
          w,
          h,
        };
      }
      mouse.attr(info);
	    if (role === 'Broadcaster' && typeof callback === 'function') {
		    callback(mouse.attr());
	    }
      return mouse;
    },
	  handleSetType(type = 'pen', callback) {
		  const src = getSrc(type);
		  mouse.attr({
			  __TYPE__: type,
			  src,
		  });
		  if (role === 'Broadcaster' && typeof callback === 'function') {
			  callback(mouse.attr());
		  }
	  },
  };
};
