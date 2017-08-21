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

export default (role = 'Broadcaster', { class: className, x = 0, y = 0 }, target, { onDrag, onSelect, onDelete }) => {
  const state = {
    isDrag: false,
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
      const { width:Tw, height: tH, x, y } = this.attr();
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
        onDrag(origTransform);
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
    class: classNames('mouse', 'wbTool', 'path', className),
  }).click(select);
  const text = target.group(
    target.rect(45, 0, 45, 45).attr({ class: 'whiteBoardBG', fill, fillOpacity: 1 }),
    target.image(mouseStyle.text, 55, 10, 25, 25),
  ).attr({
    __TYPE__: 'text',
    class: classNames('mouse', 'wbTool', 'text', className),
  }).click(select);
  const rect = target.group(
    target.rect(90, 0, 45, 45).attr({ class: 'whiteBoardBG', fill, fillOpacity: 1 }),
    target.image(mouseStyle.rect, 100, 10, 25, 25),
  ).attr({
    __TYPE__: 'rect',
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
  const color = target.group(
    target.rect(225, 0, 45, 45).attr({ class: 'whiteBoardBG', fill, fillOpacity: 1 }),
    target.image(mouseStyle.color, 235, 10, 25, 25),
  ).attr({
    __TYPE__: 'color',
    class: classNames('mouse', 'wbTool', 'color', className),
  }).click(function() {

  });
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
		if (typeof onDelete === 'function') {
			onDelete();
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
  group.add(bg, pen, text, rect, circle, selectI, color, clear, drag);
  return {
	  layer: group,
    handleReset() {
	    origTransform = '';
	    if (role !== 'Broadcaster') return;
	    group.attr({
		    transform: '',
      })
	    group.selectAll('.wbTool .whiteBoardBG').attr({
		    fill,
	    });
	    this.select('.whiteBoardBG .path').attr({
		    fill: selectFill,
	    });
	    const { __TYPE__ } = this.attr();
	    onSelect && onSelect('path');
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
        })
      }
    },
  };
  function select() {
    if (role !== 'Broadcaster') return;
    group.selectAll('.wbTool .whiteBoardBG').attr({
      fill,
    });
    this.select('.whiteBoardBG').attr({
      fill: selectFill,
    });
    const attr = this.attr();
    if (typeof onSelect === 'function') {
	    onSelect(attr.__TYPE__, attr);
    }
  }
};
