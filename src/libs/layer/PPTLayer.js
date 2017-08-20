import classNames from 'classnames';

export default (role, { class: className }, target) => {
  const group = target.group({
    class: classNames('PPTLayer', className),
  });
  return {
	  layer: group,
  };
};
