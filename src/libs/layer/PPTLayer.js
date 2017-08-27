import classNames from 'classnames';

export default ({ role = 'Broadcaster', attr = {}, target }) => {
  const group = target.group(attr);

  if (attr.__ID__) {
		group.attr({
			class: classNames('PPTLayer'),
		});
  } else {
	  group.attr({
		  class: classNames('PPTLayer'),
		  __ID__: group.id,
	  });
  }
  return {
	  layer: group,
  };
};
