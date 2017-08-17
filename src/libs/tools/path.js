import classNames from 'classnames';

export default (attrData = {}, target, isInit) => {
  let path;
  if (isInit) {
    path = target.paper.path(attrData);
  } else {
    const { __ID__, className = '', x = 0, y = 0, strokeWidth = 5, stroke = '#f00', fill = 'rgba(0,0,0,0)' } = attrData;
    path = target.paper.path({
      class: classNames('pathItem', className),
      d: `M${x},${y}`,
      stroke,
      strokeWidth,
      fill,
    });
  }
  if (attrData.__ID__) {
    path.id = attrData.__ID__;
  }
  path.attr({
    __ID__: attrData.__ID__ || path.id,
  })
  return {
    group: path,
  };
};
