import classNames from 'classnames';

export default (attrData = {}, target, isInit) => {
  let path;
  if (isInit) {
    path = target.paper.ellipse(1, 1, 1, 1).attr(attrData);
  } else {
    const { __ID__, onChange, className = '', x = 0, y = 0, strokeWidth = 5, stroke = '#f00', fill = 'rgba(0,0,0,0)' } = attrData;
    path = target.paper.ellipse(x, y, 1, 1);
    path.attr({
      __TYPE__: 'circle',
      __ID__: __ID__ || path.id,
      class: classNames('circleItem', __ID__ || path.id, className),
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
