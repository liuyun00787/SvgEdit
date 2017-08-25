import classNames from 'classnames';

export default ({ role = 'Broadcaster', attr = {}, target }) => {
	const path = target.paper.rect(attr.x, attr.y, 1, 1).attr({
		...attr,
		fill: attr.fill ? attr.fill : 'rgba(0,0,0,0)',
		__TYPE__: attr.__TYPE__ ? attr.__TYPE__ : 'rect',
	});
	if (!attr.__ID__) {
		path.attr({
			__ID__: path.id,
			class: classNames('rectItem', path.id),
		});
	} else {
		path.attr({
			id: attr.__ID__,
		});
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
