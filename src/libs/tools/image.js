import classNames from 'classnames';

export default ({ role = 'Broadcaster', attr = {}, target }) => {
	const path = target.paper.image(attr.href, 0, 0, 10, 10).attr(attr);
	if (!attr.__ID__) {
		path.attr({
			__ID__: path.id,
			class: classNames('imageItem', path.id),
		});
	}
  return {
    group: path,
    handleChange: ({ attr = {}, callback }) => {
	    path.attr(attr);
      if (typeof onChange === 'function') {
	      callback(path.attr());
      }
    },
  };
};
