import classNames from 'classnames';

const mouseStyle = {
  hand: require('../../assets/icon-hand.svg'),
  pen: require('../../assets/icon-pen.svg'),
  text: require('../../assets/icon-T.svg'),
  rect: require('../../assets/icon-rect.svg'),
  circle: require('../../assets/icon-circle.svg'),
  select: require('../../assets/icon-select.svg'),
  drag: require('../../assets/icon-drag.svg'),
	color: require('../../assets/icon-color.svg'),
	clear: require('../../assets/icon-clear.svg'),
};

export default (role = 'Broadcaster', { class: className, x = 0, y = 0 }, target, { onColorChange, onDrag, onSelect, onDeleteChange }) => {
  const state = {
    isDrag: false,
	  config: {
		  strokeWidth: 5,
		  stroke: '#00f',
	  },
  };
	let origTransform;
  const group = target.group({
    class: classNames('wBToolsLayer', className),
    width: 355,
    height: 50,
    transform: `matrix(1,0,0,1,${x},${y})`,
  });
  if (role === 'Broadcaster') {
    group.drag(function (dx, dy) {
      if (!state.isDrag) return;
      const { width: Tw, height: tH, x, y } = this.attr();
      const { width, height } = target.attr();
	    let _dx = dx;
	    let _dy = dy;
      const transform = origTransform + (origTransform ? 'T' : 't') + [_dx, _dy];
      this.attr({
        transform,
      });
      if (typeof onDrag === 'function') {
        const t = this.transform().local;
        onDrag(group.attr());
      }
    }, function () {
      if (!state.isDrag) return;
      origTransform = this.transform().local;
      if (typeof onDrag === 'function') {
        onDrag(group.attr());
      }
    });
  }
  group.attr({
    __ID__: group.id,
  });
  const bg = target.rect(0, 0, 315, 45).attr({ class: 'toolsBG' });
  const fill = '#00ffff';
  const selectFill = '#f00';
  const pen = target.group(
    target.rect(0, 0, 45, 45).attr({ class: 'whiteBoardBG', fill: selectFill, fillOpacity: 1 }),
    target.image(mouseStyle.pen, 10, 10, 25, 25),
  ).attr({
    __TYPE__: 'path',
	  __CONF__: JSON.stringify(state.config),
    class: classNames('mouse', 'wbTool', 'path', className),
  }).click(select);
  const text = target.group(
    target.rect(45, 0, 45, 45).attr({ class: 'whiteBoardBG', fill, fillOpacity: 1 }),
    target.image(mouseStyle.text, 55, 10, 25, 25),
  ).attr({
    __TYPE__: 'text',
	  __CONF__: JSON.stringify(state.config),
    class: classNames('mouse', 'wbTool', 'text', className),
  }).click(select);
  const rect = target.group(
    target.rect(90, 0, 45, 45).attr({ class: 'whiteBoardBG', fill, fillOpacity: 1 }),
    target.image(mouseStyle.rect, 100, 10, 25, 25),
  ).attr({
    __TYPE__: 'rect',
	  __CONF__: JSON.stringify(state.config),
    class: classNames('mouse', 'wbTool', 'rect', className),
  }).click(select);
  const circle = target.group(
    target.rect(135, 0, 45, 45).attr({ class: 'whiteBoardBG', fill, fillOpacity: 1 }),
    target.image(mouseStyle.circle, 145, 10, 25, 25),
  ).attr({
    __TYPE__: 'circle',
    class: classNames('mouse', 'wbTool', 'circle', className),
  }).click(select);
  const selectI = target.group(
    target.rect(180, 0, 45, 45).attr({ class: 'whiteBoardBG', fill, fillOpacity: 1 }),
    target.image(mouseStyle.select, 190, 10, 25, 25),
  ).attr({
    __TYPE__: 'select',
    class: classNames('mouse', 'wbTool', 'select', className),
  }).click(select);
	const seting = target.group(
		target.rect(225, 50, 130, 160).attr({ class: 'seting', fill: '#fff', fillOpacity: 1 }),
	);
	createColor(['#000', '#0f0', '#f00', '#00f']);
	createSize([5, 10, 15]);
	function createSize(sizes) {
		for (let i = 0; i < sizes.length; i += 1) {
			const color = target.circle((245 + (i * 30)), 70, (i * 2) + 5)
				.attr({ class: 'seting', __SIZE__: sizes[i], fill: '#000', fillOpacity: 1 })
				.click(function() {
					const attr = this.attr();
					state.config = {
						...state.config,
						strokeWidth: attr.__SIZE__,
					};
					pen.attr({ __CONF__: state.config });
					onColorChange(state.config);
				})
			seting.add(color);
		}
	}
	function createColor(colors) {
		for (let i = 0; i < colors.length; i += 1) {
			const color = target.circle((245 + (i * 30)), 100, 10)
				.attr({ class: 'seting', __COLOR__: colors[i], fill: colors[i], fillOpacity: 1 })
				.click(function() {
					const attr = this.attr();
					state.config = {
						...state.config,
						stroke: attr.__COLOR__,
					};
					pen.attr({ __CONF__: state.config });
					onColorChange(state.config);
				})
			seting.add(color);
		}
	}
  const color = target.group(
    target.rect(225, 0, 45, 45).attr({ class: 'whiteBoardBG', fill, fillOpacity: 1 }),
    target.image(mouseStyle.color, 235, 10, 25, 25),
  ).attr({
    __TYPE__: 'color',
    class: classNames('mouse', 'wbTool', 'color', className),
  }).click(select);
	const clear = target.group(
		target.rect(270, 0, 45, 45).attr({ class: 'whiteBoardBG', fill, fillOpacity: 1 }),
		target.image(mouseStyle.clear, 280, 10, 25, 25),
	).attr({
		__TYPE__: 'clear',
		class: classNames('mouse', 'wbTool', 'clear', className),
	}).mousedown(function() {
		this.select('.whiteBoardBG').attr({
			fill: selectFill,
		});
		if (typeof onDeleteChange === 'function') {
			onDeleteChange();
		}
	}).mouseup(function () {
		this.select('.whiteBoardBG').attr({
			fill,
		});
	});
  const drag = target.group(
    target.rect(315, 0, 45, 45).attr({ class: 'whiteBoardBG', fill, fillOpacity: 1 }),
    target.image(mouseStyle.drag, 325, 10, 25, 25),
  ).mousedown(function() {
      state.isDrag = true;
      this.select('.whiteBoardBG').attr({
        fill: selectFill,
      });
    }).mouseup(function () {
      state.isDrag = false;
      this.select('.whiteBoardBG').attr({
        fill,
      });
    });
  group.add(bg, pen, text, rect, circle, selectI, color, clear, drag, seting);
	seting.remove();
	function select() {
		group.selectAll('.wbTool .whiteBoardBG').attr({
			fill,
		});
		this.select('.whiteBoardBG').attr({
			fill: selectFill,
		});
		this.attr({
			__CONF__: JSON.stringify(state.config),
		});
		const attr = this.attr();
		if (typeof onSelect === 'function') {
			onSelect(attr);
		}
		if (attr.__TYPE__ === 'color') {
			group.add(seting);
		} else {
			seting.remove();
			seting.data('show', false);
		}
	}
  return {
	  layer: group,
    handleReset() {
	    origTransform = '';
	    group.attr({
		    transform: '',
      })
	    group.selectAll('.wbTool .whiteBoardBG').attr({
		    fill,
	    });
	    this.select('.whiteBoardBG .path').attr({
		    fill: selectFill,
	    });
	    const attr = group.attr();
	    if (typeof onSelect === 'function') {
		    onSelect(attr);
	    }
    },
    handleSetPosition(transform) {
      group.attr({
        transform,
      });
    },
    handleToolsChange(tool) {
      if (role === 'Broadcaster') return;
      group.selectAll('.wbTool  .whiteBoardBG').attr({
        fill,
      });
      if (group.select(`.${tool}`)) {
        group.select(`.${tool} .whiteBoardBG`).attr({
          fill: selectFill,
        });
      }
    },
  };
};
