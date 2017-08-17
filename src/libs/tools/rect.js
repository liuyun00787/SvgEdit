import classNames from 'classnames';

export default (attrData = {}, target, isInit) => {
  let path;
  if (isInit) {
    path = target.paper.rect(1, 1, 1, 1).attr(attrData);
  } else {
    const { __ID__, onChange, className = '', x = 0, y = 0, stroke = '#f00', strokeWidth = 5, fill = 'rgba(0,0,0,0)' } = attrData;
    path = target.paper.rect(x, y, 1, 1);
    path.attr({
      __ID__: __ID__ || path.id,
      class: classNames('rectItem', className),
      stroke,
      strokeWidth,
      fill,
    });
  }
  if (attrData.__ID__) {
    path.id = attrData.__ID__;
  }
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
