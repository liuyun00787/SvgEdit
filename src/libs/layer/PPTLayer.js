import classNames from 'classnames';

export default ({ role = 'Broadcaster', attr = {}, target }) => {
  const group = target.group(attr);
	const PPTBG = target.rect(0, 0, 0, 0).attr({ class: 'whiteBoardBG', fill: '#ffff00', fillOpacity: 0 }).attr({
		width: attr.width || 0,
		height: attr.height || 0,
	});
	group.add(PPTBG);
	PPTBG.click(function(e) {
		console.log(e.offsetX, e.offsetY)
	})
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
	  handleSetWH: ({ width, height }) => {
		  PPTBG.attr({ width, height });
	  },
  };
};
