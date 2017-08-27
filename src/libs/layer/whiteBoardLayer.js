import classNames from 'classnames';
import { createItemWrap, createPath, createText, createRect, createCircle, createImage } from '../tools';

Snap.plugin((Snap, Element) => {
  const elproto = Element.prototype;
  elproto.wBtoFront = function () {
    this.paper.select('.whiteBoardLayer').add(this);
  };
});

export default ({ role = 'Broadcaster', attr = {}, target, onDeleteChange, onDrawChange, textInput }) => {
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
    class: classNames('whiteBoardLayer', attr.className),
  });

  const wbItemWrap = createItemWrap({ role, target, onDrawChange });

  const whiteBoardBG = target.rect(0, 0, 0, 0).attr({ class: 'whiteBoardBG', fill: '#ffff00', fillOpacity: 0 }).attr({
    width: attr.width || 0,
    height: attr.height || 0,
  });
  group.attr({
    __ID__: group.id,
  });

  group.add(whiteBoardBG, wbItemWrap.group);
  group.mousedown(function (e) {
	  if (target.select('.tools-setWrap')) {
		  target.select('.tools-setWrap').remove();
	  }
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
	      	if (state.tools === 'select') {
			      wbItemWrap.handleShow(path);
		      }
	      },
	      handleHide: () => {
		      wbItemWrap.handleHide();
	      },
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
		  switch (Math.abs(dd.strokeWidth)) {
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
			  case 20: {
				  dd.fontSize = 25;
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
      const X = e.offsetX - state.downX;
      const Y = e.offsetY - state.downY;
      state.selectItem.attr({
        width: (X > 0 ? X : 1),
        height: (Y > 0 ? Y : 1),
      });
    }
    if (tools === 'circle') {
      const X = e.offsetX - state.downX;
      const Y = e.offsetY - state.downY;
      state.selectItem.attr({
        rx: (X > 0 ? X : 1),
        ry: (Y > 0 ? Y : 1),
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

