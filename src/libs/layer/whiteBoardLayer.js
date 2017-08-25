import classNames from 'classnames';
import { createPath, createText, createRect, createCircle, createImage } from '../tools';

Snap.plugin((Snap, Element) => {
  const elproto = Element.prototype;
  elproto.wBtoFront = function () {
    this.paper.select('.whiteBoardLayer').add(this);
  };
});

export default (role = 'Broadcaster', { className = '', width = 0, height = 0 }, target, { onDeleteChange, onDrawChange, textInput }) => {
  const state = {
    downX: 0,
    downY: 0,
    selectItem: null,
    isDraw: true,
    isSelect: false,
    tools: 'path',
	  config: {},
  };
  const group = target.group({
    class: classNames('whiteBoardLayer', className),
  });

  const wbItemWrap = createWbItemWrap({ onDrawChange, role }, target, { onDrawChange });

  const whiteBoardBG = target.rect(0, 0, 0, 0).attr({ class: 'whiteBoardBG', fill: '#ffff00', fillOpacity: 0 }).attr({
    width,
    height,
  });
  group.attr({
    __ID__: group.id,
  });

  group.add(whiteBoardBG, wbItemWrap.group);

  group.mousedown(function (e) {
    if (role !== 'Broadcaster') return;
    const { isDraw, isSelect, tools } = state;
    const { isActive } = this.data();
    state.downX = e.offsetX; state.downY = e.offsetY;
    let pathLayer;
    let drawPath;
    if (!isDraw) {
      return;
    }
    if (isSelect) {
      return;
    }
    if (isActive) {
      return;
    }
	  if (tools === 'color') {
		  return;
	  }
    this.data('isActive', true);
    if (tools === 'path') {
	    pathLayer = createPath({
		    attr: {
			    x: e.offsetX,
			    y: e.offsetY,
		    },
		    target,
	    });
      drawPath = pathLayer.group;
    }
    if (tools === 'text') {
      pathLayer = createText({
	      attr: {
		      x: e.offsetX,
		      y: e.offsetY,
	      },
	      target,
	      textInput,
	      onDrawChange,
	      handleShow: (path) => {
	      	console.log(state.tools);
	      	if (state.tools === 'select') {
			      wbItemWrap.handleShow(path)
		      }
	      }
      });
      drawPath = pathLayer.group;
    }
    if (tools === 'rect') {
	    pathLayer = createRect({
		    attr: {
			    x: e.offsetX,
			    y: e.offsetY,
	      },
		    target,
	    });
      drawPath = pathLayer.group;
    }
    if (tools === 'circle') {
      pathLayer = createCircle({
		    attr: {
			    x: e.offsetX,
			    y: e.offsetY,
		    },
	      target,
      });
      drawPath = pathLayer.group;
    }
    drawPath.click(function () {
      if (state.isDraw) {
        return;
      }
      if (this.attr('__TYPE__') === 'text') {
        pathLayer.handeFocus();
      }
	    wbItemWrap.handleShow(this);
      state.isDraw = false;
      state.isSelect = true;
      state.selectItem = this;
    });
    state.selectItem = drawPath;
	  if (drawPath.attr('__TYPE__') === 'text') {
	  	const dd = Object.assign({}, state.config);
		  dd.fill = dd.stroke;
		  switch (dd.strokeWidth) {
			  case 5: {
				  dd.fontSize = 16;
			  	break;
			  }
			  case 10: {
				  dd.fontSize = 18;
				  break;
			  }
			  case 15: {
				  dd.fontSize = 20;
				  break;
			  }
			  default: {
				  dd.fontSize = 16;
			  }
		  }
		  delete dd.strokeWidth;
		  delete dd.stroke;
		  drawPath.attr(dd);
	  } else {
		  drawPath.attr(state.config);
	  }
    group.add(drawPath);
    onDrawChange(drawPath);
  });
  group.mousemove(function (e) {
    if (role !== 'Broadcaster') return;
    const { isDraw, tools } = state;
    const { isActive } = this.data();
    if (!isDraw) {
      return;
    }
    if (!isActive) {
      return;
    }
	  if (tools === 'color') {
		  return;
	  }
    if (tools === 'path') {
      let { d } = state.selectItem.attr();
      state.selectItem.attr({ d: d += `,${e.offsetX},${e.offsetY}` });
    }
    if (tools === 'rect') {
      const getBox = state.selectItem.getBBox();
      const X = e.offsetX - state.downX;
      const Y = e.offsetY - state.downY;
      state.selectItem.attr({
        width: (X > 0 ? X : 0),
        height: (Y > 0 ? Y : 0),
      });
    }
    if (tools === 'circle') {
      const X = e.offsetX - state.downX;
      const Y = e.offsetY - state.downY;
      state.selectItem.attr({
        rx: (X > 0 ? X : 0),
        ry: (Y > 0 ? Y : 0),
      });
    }
    onDrawChange(state.selectItem);
  });
  group.mouseup(function () {
    if (role !== 'Broadcaster') return;
    const { isDraw, tools } = state;
    if (isDraw) {
      // wbItemWrap.handleShow(state.selectItem);
      // state.isSelect = true;
    }
	  if (tools === 'color') {
		  return;
	  }
    this.data('isActive', false);
  });
  group.dblclick(function () {
    if (role !== 'Broadcaster') return;
    wbItemWrap.handleHide();
    state.selectItem = null;
    state.isSelect = false;
	  this.data('isActive', false);
  });
  return {
	  layer: group,
	  handleSetConfig: (config) => {
		  state.config = config;
	  },
    handleSelectItem: (__ID__) => {
	    return group.select(`.${__ID__}`);
    },
    getSelectItem: () => {
      return state.selectItem;
    },
    getIsSelect: () => {
	    return state.isSelect;
    },
    handleSetWH: ({ width, height }) => {
      whiteBoardBG.attr({ width, height });
    },
    handleSetIsDraw: (isDraw = false) => {
      state.isDraw = isDraw;
    },
    handleDelete: (path, isArray) => {
      group.data('isActive', false);
      if (path) {
        if (isArray) {
          path.map((item) => {
            if (group.select(`.${item.__ID__}`)) {
              group.select(`.${item.__ID__}`).remove();
            }
          });
        } else if (state.isSelect) {
	          if (group.select(`.${path.__ID__}`)) {
		          group.select(`.${path.__ID__}`).remove();
	          }
          state.selectItem = null;
          wbItemWrap.handleHide(path);
        }
      } else {
        group.clear();
        group.add(whiteBoardBG);
        state.selectItem = null;
        wbItemWrap.handleHide(path);
      }
      if (typeof onDeleteChange === 'function') {
	      onDeleteChange(path);
      }
      state.isSelect = false;
    },
    handleSelect: (isSelect = false) => {
      state.isDraw = !isSelect;
    },
    handleSetTools: (tools = 'path', config) => {
      if (tools === 'select') {
	      state.tools = tools;
	      state.isDraw = false;
        state.isSelect = true;
      } else {
      	if (config) {
		      state.config = JSON.parse(config);
	      }
        state.isDraw = true;
        state.isSelect = false;
        state.tools = tools;
      }
    },
    handleDraw: (item) => {
      let path;
      if (item.__TYPE__ === 'path') {
	      path = createPath({
		      attr: item,
		      target,
	      });
      }
      if (item.__TYPE__ === 'text') {
        path = createText({
	        attr: item,
	        target,
	        textInput,
	        onDrawChange,
	        handleShow: (path) => {
	        	console.log(11111)
		        if (state.tools === 'select') {
			        wbItemWrap.handleShow(path);
		        }
	        },
        });
      }
      if (item.__TYPE__ === 'rect') {
	      path = createRect({ attr: item, target });
      }
	    if (item.__TYPE__ === 'circle') {
		    path = createCircle({ attr: item, target });
	    }
	    if (item.__TYPE__ === 'image') {
		    path = createImage({ attr: item, target });
	    }
      path.group.click(function () {
        if (state.isDraw) {
          return;
        }
        state.isDraw = false;
        state.isSelect = true;
        wbItemWrap.handleShow(this);
        state.selectItem = this;
        if (this.attr('__TYPE__') === 'text') {
          path.handeFocus();
        }
      });
      group.add(path.group);
      state.selectItem = path.group;
      return path.group;
    },
	  handleHideItem: wbItemWrap.handleHide,
  };
};


function createWbItemWrap({ role = 'Broadcaster', className = '', width = 0, height = 0 }, target, { onDrawChange }) {
  const state = {
    selectItem: '',
    hoverIn: false,
  };
  const group = target.group({
    fillOpacity: role === 'Broadcaster' ? 0.6 : 0,
    transform: 'matrix(1,0,0,1,-10000,-10000)',
    class: classNames('WBWrapItem', className),
  }).drag(
    function (dx, dy) {
      const { selectItem } = state;
      const transform = this.data('origTransform') + (this.data('origTransform') ? 'T' : 't') + [dx, dy];
      this.attr({
        transform,
      });
      const selectOrigTransform = selectItem.data('origTransform');
      selectItem.attr({
        transform: selectOrigTransform + (selectOrigTransform ? 'T' : 't') + [dx, dy],
      });
      if (typeof onDrawChange === 'function') {
        onDrawChange(selectItem);
      }
    },
    function () {
      const { selectItem } = state;
      this.data('origTransform', this.transform().local);
      selectItem.data('origTransform', selectItem.transform().local);
      if (typeof onDrawChange === 'function') {
        onDrawChange(selectItem);
      }
    },
  );
  const square = target.rect(0, 0, 0, 0).attr({ class: 'square', fill: 'coral' });
  const square2 = target.rect(0, 0, 0, 0).attr({ class: 'square2', fill: 'coral' });
  const setRectLT = target.rect(20, 20, 10, 10).attr({ class: 'square2', fill: 'red' })
    .hover(
      function () {
        state.hoverIn = true;
        this.attr({
          fill: '#ff00ff',
        });
      },
      function () {
        state.hoverIn = true;
        this.attr({
          fill: 'red',
        });
      },
    );
  const setRectRT = target.rect(20, 20, 10, 10).attr({ class: 'square2', fill: 'red' })
    .hover(
      function () {
        state.hoverIn = true;
        this.attr({
          fill: '#ff00ff',
        });
      },
      function () {
        state.hoverIn = true;
        this.attr({
          fill: 'red',
        });
      },
    );
  const setRectRB = target.rect(20, 20, 10, 10).attr({ class: 'square2', fill: 'red' })
    .hover(
      function () {
        state.hoverIn = true;
        this.attr({
          fill: '#ff00ff',
        });
      },
      function () {
        state.hoverIn = true;
        this.attr({
          fill: 'red',
        });
      },
    );
  const setRectTB = target.rect(20, 20, 10, 10).attr({ class: 'square2', fill: 'red' })
    .hover(
      function () {
        state.hoverIn = true;
        this.attr({
          fill: '#ff00ff',
        });
      },
      function () {
        state.hoverIn = true;
        this.attr({
          fill: 'red',
        });
      },
    );

  group.add(square, square2, setRectLT, setRectRT, setRectRB, setRectTB);

  return {
	  group,
    handleShow: (path, callback) => {
      const { x, y, width, height } = path.getBBox();
      state.selectItem = path;
      group.attr({
        transform: '',
      }).click(() => {
        if (typeof callback === 'function') {
          callback();
        }
        group.unclick();
      });
      group
        .data('origTransform', path.transform().local)
        .attr({ x, y, width, height })
        .wBtoFront();
      square2.attr({
        x: x - 10,
        y: y - 10,
        width: width + 20,
        height: height + 20,
      });
      setRectLT.attr({ x: x - 15, y: y - 15, transform: '' });
      setRectLT.data('origTransform', '');
      setRectRT.attr({ x: x + width + 5, y: y - 15, transform: '' });
      setRectRT.data('origTransform', '');
      setRectTB.attr({ x: x - 15, y: y + height + 5, transform: '' });
      setRectTB.data('origTransform', '');
      setRectRB.attr({ x: x + width + 5, y: y + height + 5, transform: '' });
      setRectRB.data('origTransform', '');
    },
    handleHide: () => {
      if (role !== 'Broadcaster') return;
      group.attr({
        transform: 'matrix(1,0,0,1,-10000,-10000)',
      });
    },
    handleClick: (cb) => {
      if (role !== 'Broadcaster') return;
      if (typeof cb === 'function') {
        cb();
      }
    },
  };
}

