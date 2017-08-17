import classNames from 'classnames';

export default ({ className = '' }, target) => {
  const group = target.group({
    class: classNames('PPTLayer', className),
  });
  return {
    whiteBoardLayer: group,
  };
};
