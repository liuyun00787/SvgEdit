import classNames from 'classnames';

const tools = [
	{
		name: 'select',
		icon: require('../../assets/icon-select.svg'),
	},
	{
		name: 'path',
		icon: require('../../assets/icon-pen.svg'),
	},
	{
		name: 'text',
		icon: require('../../assets/icon-T.svg'),
	},
	{
		name: 'rect',
		icon: require('../../assets/icon-rect.svg'),
	},
	{
		name: 'circle',
		icon: require('../../assets/icon-circle.svg'),
	},
	{
		name: 'color',
		icon: require('../../assets/icon-color.svg'),
	},
	{
		name: 'images',
		icon: require('../../assets/icon-images.svg'),
	},
	{
		name: 'clear',
		icon: require('../../assets/icon-clear.svg'),
	},
	{
		name: 'drag',
		icon: require('../../assets/icon-drag.svg'),
	},
];

export default ({ orientation = 'X', role = 'Broadcaster', attr = {}, target, onColorChange, onDrag, onSelect, onDrawChange, onDeleteChange, handleUpload, handleDraw, handleHideItem }) => {
	const state = {
    isDrag: false,
	  config: {
		  strokeWidth: 5,
		  stroke: '#00f',
	  },
  };
  const className = attr.class;
	let origTransform;
  const group = target.group({
    class: classNames('wBToolsLayer', attr.class),
    width: 355,
    height: 50,
    transform: `matrix(1,0,0,1,${attr.x || 0},${attr.y || 0})`,
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
	const renderTools = (tools = [], type = 'X') => {
		const fill = '#000';
		const selectFill = '#fff';
		return tools.map((item, index) => {
			const X = index * 45;
			return target.group(
				target.rect(type === 'X' ? X : 0, type === 'Y' ? X : 0, 45, 45).attr({ class: 'WBToolsBG', fill, fillOpacity: .4 }),
				target.image(item.icon, type === 'X' ? X + 10 : 10, type === 'Y' ? X + 10 : 10, 25, 25),
			)
				.attr({
					class: `wbTool ${item.name}`,
					__TYPE__: item.name,
					__CONF__: JSON.stringify(state.config),
				})
				.mouseover(function() {

				})
				.mouseout(function() {

				})
				.click(function() {
					const { __TYPE__ } = this.attr();
					if (typeof handleHideItem === 'function') {
						handleHideItem();
					}
					if (__TYPE__ === 'color') {
						return;
					}
					if (__TYPE__ === 'clear') {
						return;
					}
					if (__TYPE__ === 'images') {
						const that = this;
						if (!this.uploading) {
							this.uploading = true;
							handleUpload.select({
								cb({ attr }) {
									if (typeof handleDraw === 'function') {
										const path = handleDraw({ attr });
										onDrawChange(path.attr());
									}
								},
								setUploading() {
									that.uploading = false;
								}
							});
						}

						this.select('.WBToolsBG').attr({
							fill: selectFill,
						});
						setTimeout(() => {
							this.select('.WBToolsBG').attr({
								fill,
							});
						}, 100);
						return;
					}
					if (__TYPE__ === 'drag') {
						return;
					}
					group.selectAll('.WBToolsBG').attr({
						fill,
					});
					this.select('.WBToolsBG').attr({
						fill: selectFill,
					});
					this.attr({
						__CONF__: JSON.stringify(state.config),
					});
					const attr = this.attr();
					if (typeof onSelect === 'function') {
						onSelect(attr);
					}
				})
				.mousedown(function() {
					const { __TYPE__ } = this.attr();
					seting.remove();
					if (__TYPE__ === 'drag') {
						state.isDrag = true;
						this.select('.WBToolsBG').attr({
							fill: selectFill,
						});
					}
					if (__TYPE__ === 'color') {
						group.add(seting);
					}
					if (__TYPE__ === 'clear') {
						this.select('.WBToolsBG').attr({
							fill: selectFill,
						});
						return;
					}
			  })
				.mouseup(function () {
					const { __TYPE__ } = this.attr();
				  if (__TYPE__ === 'drag') {
					  state.isDrag = false;
					  this.select('.WBToolsBG').attr({
						  fill,
					  });
				  }
					if (__TYPE__ === 'clear') {
						if (typeof onDeleteChange === 'function') {
							onDeleteChange(false);
						}
						this.select('.WBToolsBG').attr({
							fill,
						});
						return;
					}
				})
				.dblclick(function() {
					const { __TYPE__ } = this.attr();
					if (__TYPE__ === 'clear') {
						// 双击删全部
						if (typeof onDeleteChange === 'function') {
							onDeleteChange(true);
						}
					}
				});
		});
	};
  group.attr({
    __ID__: group.id,
  });
	group.add(renderTools(tools, orientation));

	const seting = target.group(
		target.rect(225, 50, 130, 160).attr({ class: 'tools-seting', fill: '#fff', fillOpacity: 1 }),
	)
		.attr({
			class: 'tools-setWrap',
		});
	createColor(['#000', '#0f0', '#f00', '#00f', '#000', '#0f0', '#f00', '#00f']);
	createSize([5, 10, 15, 20]);
	function createSize(sizes) {
		for (let i = 0; i < sizes.length; i += 1) {
			const sizeItem = target.group(
				target.circle((245 + (i * 30)), 70, (i * 2) + 5)
				.attr({
					class: 'seting size-item',
					stroke: '#000',
					fill: '#000',
				}),
				target.circle((245 + (i * 30)), 70, (i * 2) + 3)
					.attr({
						class: 'size-item-on',
						fill: 'rgba(0,0,0,0)',
					}),
			)
				.attr({
					__SIZE__: sizes[i],
				})
				.click(function() {
					const attr = this.attr();
					seting.selectAll('.size-item-on').attr({
						fill: 'rgba(0,0,0,0)',
					});
					this.select('.size-item-on').attr({
						fill: '#fff',
					});
					state.config = {
						...state.config,
						strokeWidth: attr.__SIZE__,
					};
					onColorChange(state.config);
				})
			seting.add(sizeItem);
		}
	}
	function createColor(colors) {
		let index = 0;
		let X = 0;
		let Y = 0;
		for (let i = 0; i < colors.length; i += 1) {
			if (i % 4 === 0) {
				index += 1;
			}
			X = 245 + ((i + 1) % 4 * 30);
			Y = 100 + ((index - 1) * 40);
			seting.add(target.group(
				target.circle(X, Y, 10)
				.attr({
					class: 'color-item',
					fill: colors[i],
				}),
				target.circle(X, Y, 8)
					.attr({
						class: 'color-item-on',
						fill: 'rgba(0,0,0,0)',
					}),
			)
				.attr({
					__COLOR__: colors[i],
				})
				.click(function() {
					const attr = this.attr();
					seting.selectAll('.color-item-on').attr({
						fill: 'rgba(0,0,0,0)',
					});
					this.select('.color-item-on').attr({
						fill: '#fff',
					});
					state.config = {
						...state.config,
						stroke: attr.__COLOR__,
					};
					onColorChange(state.config);
				}));
		}
	}

	seting.remove();

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
	  hanldeHideSeting() {
		  seting.remove();
	  },
  };
};
