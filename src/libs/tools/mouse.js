import classNames from 'classnames';

const mouseStyle = {
  hand: require('../../assets/hand.svg'),
  pen: require('../../assets/pen.svg'),
};

export default ({ className = '', type = 'pen', x = 0, y = 0, w = 25, h = 25 }, target) => {
  let src = '';
  switch (type) {
    case 'pen': {
      src = mouseStyle.pen;
      break;
    }
    case 'hand': {
      src = mouseStyle.hand;
      break;
    }
    default: {
      src = mouseStyle.pen;
    }
  }
  const mouse = target.image(src, x, y, w, h).attr({
    __TYPE__: type,
    class: classNames('mouse', className),
  });
  const mouseGroup = target.group({
    class: 'mouseGroup',
  });
  mouseGroup.add(mouse);
  return {
    mouseInfo: {
      __TYPE__: type,
      x: x - 1,
      y: y - h - 1,
      w,
      h,
    },
    mouseGroup,
    mouse,
    handleSetMouse: ({ className = '', type = 'pen', x = 0, y = 0, w = 25, h = 25 }, callback) => {
      const info = {
        __TYPE__: type,
        class: classNames('mouse', className),
        x: x - 1,
        y: y - h - 1,
        w,
        h,
      };
      mouse.attr(info);
      if (typeof callback === 'function') {
        callback(info);
      }
      return mouse;
    },
  };
};
