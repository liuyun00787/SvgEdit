import classNames from 'classnames';

export default ({ role = 'Broadcaster', attr = {}, target }) => {
	const path = target.paper.path().attr({
		...attr,
		d: attr.d ? attr.d : `M${attr.x},${attr.y}`,
		fill: attr.fill ? attr.fill : 'rgba(0,0,0,0)',
		__TYPE__: attr.__TYPE__ ? attr.__TYPE__ : 'path',
	});
	if (!attr.__ID__) {
		path.attr({
			__ID__: path.id,
			class: classNames('pathItem', path.id),
		});
	} else {
		path.attr({
			id: attr.__ID__,
		});
	}
  return {
    group: path,
  };
};
