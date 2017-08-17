import classNames from 'classnames';

const mouseStyle = {
  hand: {
    src: require('../../assets/hand.svg'),
  },
  pen: {
    src: require('../../assets/pen.svg'),
  },
};

export default ({ role = 'Broadcaster', className = '', type = 'pen', x = 0, y = 0, w = 25, h = 25 }, target) => {
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
  const mouse = target.image(src, x, y, w, h).attr({
    __TYPE__: type,
    class: classNames('mouse', className),
  });
  const mouseLayer = target.group({
    class: 'mouseGroup',
  }).add(mouse);
  return {
    mouseInfo: {
      __TYPE__: type,
      x: x - 1,
      y: y - h - 1,
      w,
      h,
    },
    mouseLayer,
    mouse,
    handleSetPosition({ className = '', type = 'pen', x = 0, y = 0, w = 25, h = 25 }, callback) {
      let info = {};
      if (role === 'Broadcaster') {
        info = {
          __TYPE__: type,
          class: classNames('mouse', className),
          x: x - 1,
          y: y - h - 1,
          w,
          h,
        };
        if (typeof callback === 'function') {
          callback(info);
        }
      } else {
        info = {
          __TYPE__: type,
          class: classNames('mouse', className),
          x,
          y,
          w,
          h,
        };
      }
      mouse.attr(info);
      return mouse;
    },
  };
};
