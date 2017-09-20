import classNames from 'classnames';
import { createItemWrap, createPath, createText, createRect, createCircle, createImage } from '../tools';

Snap.plugin((Snap, Element) => {
  const elproto = Element.prototype;
  elproto.wBtoFront = function () {
    this.paper.select('.whiteBoardLayer').add(this);
  };
});

export const TOOLS = {
	hand: '__HAND__',
	path: '__PATH__',
	text: '__TEXT__',
	rect: '__RECT__',
	circle: '__CIRCLE__',
};

export default ({ role = 'Broadcaster', attr = {}, target, onDeleteChange, onDrawChange, textInput }) => {
  let state = {
    downX: 0,
    downY: 0,
    selectItem: null,
    isDraw: false,
    isSelect: false,
    tools: 'select',
	  tool: {
    	type: 'select',
		  config: {

		  },
	  },
	  config: {},
  };
	const layer = target.group({
		class: classNames('whiteBoardLayer', attr.className),
	});
	const wbItemWrap = createItemWrap({ role, target, onDrawChange });
	const whiteBoardBG = target.rect(0, 0, 0, 0).attr({ class: 'whiteBoardBG', fill: '#ffff00', fillOpacity: 0 }).attr({
		width: attr.width || 0,
		height: attr.height || 0,
	});

	// 白板舞台
	const wbCanvas = (function() {
		const group = target.group();
		group.attr({
			__ID__: group.id,
		});
		group.add(wbItemWrap.group);
		whiteBoardBG.remove();
		layer.mousedown(function (e) {
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
					role,
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
					role,
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
					role,
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
					role,
					attr: {
						x: e.offsetX,
						y: e.offsetY,
					},
					target,
				});
				drawPath = pathLayer.group;
			}
			drawPath.click(function () {
				if (role !== 'Broadcaster') return;
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
				onDrawChange(this);
			});
			state.selectItem = drawPath;
			if (drawPath.attr('__TYPE__') === 'text') {
				const dd = Object.assign({}, state.config);
				dd.fill = dd.stroke;
				switch (Math.abs(dd.strokeWidth)) {
					case 5: {
						dd.fontSize = 20;
						break;
					}
					case 10: {
						dd.fontSize = 36;
						break;
					}
					case 15: {
						dd.fontSize = 48;
						break;
					}
					case 20: {
						dd.fontSize = 72;
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
			if ( typeof onDrawChange === 'function' ) {
				if (drawPath) {
					onDrawChange(drawPath);
				}
			}
			// wbItemWrap.handleShow(drawPath);
		});
		layer.mousemove(function (e) {
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
					x: X < 0 ? Math.abs(state.downX + X) : state.downX,
					y: Y < 0 ? Math.abs(state.downY + Y) : state.downY,
					width: Math.abs(X),
					height: Math.abs(Y),
				});
			}
			if (tools === 'circle') {
				console.log(tools, 111);
				const X = e.offsetX - state.downX;
				const Y = e.offsetY - state.downY;
				state.selectItem.attr({
					cx: state.downX + X/2,
					cy: state.downY + Y/2,
					rx: Math.abs(X / 2),
					ry: Math.abs(Y / 2),
				});
			}
			if (typeof onDrawChange === 'function') {
				onDrawChange(state.selectItem);
			}
			// wbItemWrap.handleShow(state.selectItem);
		});
		layer.mouseup(function () {
			if (role !== 'Broadcaster') return;
			const { isDraw, tools } = state;
			if (isDraw) {
				// wbItemWrap.handleShow(state.selectItem);
				// state.isSelect = true;
			}
			if (tools === 'color') {
				return;
			}
			if (typeof onDrawChange === 'function') {
				if (state.selectItem) {
					onDrawChange(state.selectItem);
				}
			}
			// wbItemWrap.handleShow(state.selectItem);
			this.data('isActive', false);
		});
		layer.dblclick(function () {
			if (role !== 'Broadcaster') return;
			wbItemWrap.handleHide();
			state.selectItem = null;
			state.isSelect = false;
			this.data('isActive', false);
		});
		return group;
	})();

	layer.add(wbCanvas);

  return {
	  layer,
	  // 设置宽高
	  handleSetWH: ({ width, height }) => {
		  whiteBoardBG.attr({ width, height });
	  },
	  getState() {
	  	return state;
	  },
	  setState(nState = {}, callback) {
		  state = { ...state, ...nState };
		  if (typeof callback === 'function') {
			  callback();
		  }
	  },
	  // 设置功具
	  setToolConf({ type = 'hand', config = {} }, callback) {
		  const tool = {
		  	type,
			  config,
		  };
			switch (type) {
				case 'hand': {
					tool.type = TOOLS.hand;
					break;
				}
				case 'path': {
					tool.type = TOOLS.path;
					break;
				}
				case 'text': {
					tool.type = TOOLS.text;
					break;
				}
				case 'rect': {
					tool.type = TOOLS.rect;
					break;
				}
				case 'circle': {
					tool.type = TOOLS.circle;
					break;
				}
				default: {
					tool.type = TOOLS.hand;
				}
			}
			state = {
				...state,
				tool: tool,
			};
		  if (typeof callback === 'function') {
			  callback();
		  }
	  },
	  // 设置可用
	  setDisable(has) {
			console.log(has);
	  },
	  // 选择笔画
	  selectItem(id) {
		  console.log(id);
	  },
	  // 画一笔
	  draw(item) {
	  	console.log(item);
	  },
	  // 清除一笔
	  clear(id) {
			console.log(id);
	  },


	  handleSetConfig: (config) => {
		  state.config = config;
	  },
    handleSelectItem: (__ID__) => {
	    return wbCanvas.select(`.${__ID__}`);
    },
    getSelectItem: () => {
      return state.selectItem;
    },
    getIsSelect: () => {
	    return state.isSelect;
    },
    handleSetIsDraw: (isDraw = false) => {
      state.isDraw = isDraw;
    },
    handleDelete: (path, isArray) => {
	    wbCanvas.data('isActive', false);
      if (path) {
        if (isArray) {
          path.map((item) => {
            if (wbCanvas.select(`.${item.__ID__}`)) {
	            wbCanvas.select(`.${item.__ID__}`).remove();
            }
          });
        } else if (state.isSelect) {
	          if (wbCanvas.select(`.${path.__ID__}`)) {
		          wbCanvas.select(`.${path.__ID__}`).remove();
	          }
          state.selectItem = null;
          wbItemWrap.handleHide(path);
        }
      } else {
	      wbCanvas.clear();
        if (state.tools !== 'select') {
	        wbCanvas.add(whiteBoardBG);
        }
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
	      whiteBoardBG.remove();
      } else {
	      wbCanvas.add(whiteBoardBG);
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
		      role,
		      attr: item,
		      target,
	      });
      }
      if (item.__TYPE__ === 'text') {
        path = createText({
	        role,
	        attr: item,
	        target,
	        textInput,
	        onDrawChange,
	        handleShow: (path) => {
		        if (state.tools === 'select') {
			        wbItemWrap.handleShow(path);
		        }
	        },
        });
      }
      if (item.__TYPE__ === 'rect') {
	      path = createRect({ role, attr: item, target });
      }
	    if (item.__TYPE__ === 'circle') {
		    path = createCircle({ role, attr: item, target });
	    }
	    if (item.__TYPE__ === 'image') {
		    path = createImage({ role, attr: item, target });
	    }
      path.group.click(function () {
	      if (role !== 'Broadcaster') return;
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
	    wbCanvas.add(path.group);
      state.selectItem = path.group;
      return path.group;
    },
	  handleHideItem: wbItemWrap.handleHide,
  };
};

