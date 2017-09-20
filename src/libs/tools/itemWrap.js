import classNames from 'classnames';

export default ({ role = 'Broadcaster', attr = {}, target, onDrawChange }) => {
	const state = {
		selectItem: '',
		isDrag: true,
		hoverIn: false,
	};
	const group = target.group({
		transform: 'matrix(1,0,0,1,-10000,-10000)',
		class: classNames('WBWrapItem', attr.className),
	});


	const square2 = target.rect(0, 0, 0, 0).attr({ class: 'square2', fillOpacity: .4, fill: 'coral' })
		.drag(
			function (dx, dy) {
				const { selectItem } = state;
				const selectOrigTransform = selectItem.data('origTransform');
				const groupOrigTransform = group.data('origTransform');
				group.attr({
					transform: groupOrigTransform + (groupOrigTransform ? 'T' : 't') + [dx, dy],
				});
				selectItem.attr({
					transform: selectOrigTransform + (selectOrigTransform ? 'T' : 't') + [dx, dy],
				});
				if (typeof onDrawChange === 'function') {
					onDrawChange(selectItem);
				}
			},
			function () {
				const { selectItem } = state;
				selectItem.data('origTransform', selectItem.transform().local);
				group.data('origTransform', group.transform().local);
				if (typeof onDrawChange === 'function') {
					onDrawChange(selectItem);
				}
			},
		);

	const dragChange = function (dx, dy) {
		const { selectItem } = state;
		const { dragType } = this.attr();
		const { __TYPE__ } = selectItem.attr();
		if (__TYPE__ === 'image') {
			const { __width__, __height__, __x__, __y__ } = selectItem.data();
			if (dragType === 'TL') {
				const width = parseInt(__width__) - dx;
				const height = parseInt(__height__) - dy;
				selectItem.attr({
					x: width < 0 ? (parseInt(__x__) + parseInt(__width__)) : (parseInt(__x__)  + dx),
					y: height < 0 ? (parseInt(__y__) + parseInt(__height__)) : (parseInt(__y__)  + dy),
					width: Math.abs(width),
					height: Math.abs(height),
				});
			}
			if (dragType === 'TR') {
				const width = parseInt(__width__) + dx;
				const height = parseInt(__height__) - dy;
				selectItem.attr({
					x: width < 0 ? (parseInt(__x__) + width) : __x__,
					y: height < 0 ? (parseInt(__y__) + parseInt(__height__)) : (parseInt(__y__)  + dy),
					width: Math.abs(width),
					height: Math.abs(height),
				});
			}
			if (dragType === 'BR') {
				const width = parseInt(__width__) + dx;
				const height = parseInt(__height__) + dy;
				selectItem.attr({
					x: width < 0 ? (parseInt(__x__) + width) : __x__,
					y: height < 0 ? (parseInt(__y__) + height) : __y__,
					width: Math.abs(width),
					height: Math.abs(height),
				});
			}
			if (dragType === 'BL') {
				const width = parseInt(__width__) - dx;
				const height = parseInt(__height__) + dy;
				selectItem.attr({
					x: width < 0 ? (parseInt(__x__) + parseInt(__width__)) : (parseInt(__x__)  + dx),
					y: height < 0 ? (parseInt(__y__) + height) : parseInt(__y__),
					width: Math.abs(width),
					height: Math.abs(height),
				});
			}
		}
		if (__TYPE__ === 'rect') {
			const { __width__, __height__, __x__, __y__ } = selectItem.data();
			if (dragType === 'TL') {
				const width = parseInt(__width__) - dx;
				const height = parseInt(__height__) - dy;
				selectItem.attr({
					x: width < 0 ? (parseInt(__x__) + parseInt(__width__)) : (parseInt(__x__)  + dx),
					y: height < 0 ? (parseInt(__y__) + parseInt(__height__)) : (parseInt(__y__)  + dy),
					width: Math.abs(width),
					height: Math.abs(height),
				});
			}
			if (dragType === 'TR') {
				const width = parseInt(__width__) + dx;
				const height = parseInt(__height__) - dy;
				selectItem.attr({
					x: width < 0 ? (parseInt(__x__) + width) : __x__,
					y: height < 0 ? (parseInt(__y__) + parseInt(__height__)) : (parseInt(__y__)  + dy),
					width: Math.abs(width),
					height: Math.abs(height),
				});
			}
			if (dragType === 'BR') {
				const width = parseInt(__width__) + dx;
				const height = parseInt(__height__) + dy;
				selectItem.attr({
					x: width < 0 ? (parseInt(__x__) + width) : __x__,
					y: height < 0 ? (parseInt(__y__) + height) : __y__,
					width: Math.abs(width),
					height: Math.abs(height),
				});
			}
			if (dragType === 'BL') {
				const width = parseInt(__width__) - dx;
				const height = parseInt(__height__) + dy;
				selectItem.attr({
					x: width < 0 ? (parseInt(__x__) + parseInt(__width__)) : (parseInt(__x__)  + dx),
					y: height < 0 ? (parseInt(__y__) + height) : parseInt(__y__),
					width: Math.abs(width),
					height: Math.abs(height),
				});
			}
		}
		if (__TYPE__ === 'circle') {
			const { __rx__, __ry__, __cx__, __cy__ } = selectItem.data();
			if (dragType === 'TL') {
				const rx = Math.abs(__rx__) - dx/2;
				const ry = Math.abs(__ry__) - dy/2;
				selectItem.attr({
					cx: (parseInt(__cx__) + dx/2),
					cy: (parseInt(__cy__) + dy/2),
					rx:  Math.abs(rx),
					ry: Math.abs(ry),
				});
			}
			if (dragType === 'TR') {
				const rx = Math.abs(__rx__) + dx/2;
				const ry = Math.abs(__ry__) - dy/2;
				selectItem.attr({
					cx: (parseInt(__cx__) + dx/2),
					cy: (parseInt(__cy__) + dy/2),
					rx:  Math.abs(rx),
					ry: Math.abs(ry),
				});
			}
			if (dragType === 'BR') {
				const rx = Math.abs(__rx__) + dx/2;
				const ry = Math.abs(__ry__) + dy/2;
				console.log(rx);
				selectItem.attr({
					cx: (parseInt(__cx__) + dx/2),
					cy: (parseInt(__cy__) + dy/2),
					rx:  Math.abs(rx),
					ry: Math.abs(ry),
				});
			}
			if (dragType === 'BL') {
				const rx = Math.abs(__rx__) - dx/2;
				const ry = Math.abs(__ry__) + dy/2;
				selectItem.attr({
					cx: (parseInt(__cx__) + dx/2),
					cy: (parseInt(__cy__) + dy/2),
					rx:  Math.abs(rx),
					ry: Math.abs(ry),
				});
			}
		}
		handleShow(selectItem);
		if (typeof onDrawChange === 'function') {
			onDrawChange(selectItem);
		}
	};
	const dragStart = function () {
		const { selectItem } = state;
		const { dragType } = this.attr();
		const { __TYPE__ } = selectItem.attr();
		if (__TYPE__ === 'image') {
			selectItem.data('__width__', selectItem.attr('width'));
			selectItem.data('__height__', selectItem.attr('height'));
			selectItem.data('__x__', selectItem.attr('x'));
			selectItem.data('__y__', selectItem.attr('y'));
		}
		if (__TYPE__ === 'rect') {
			selectItem.data('__width__', selectItem.attr('width'));
			selectItem.data('__height__', selectItem.attr('height'));
			selectItem.data('__x__', selectItem.attr('x'));
			selectItem.data('__y__', selectItem.attr('y'));
		}
		if (__TYPE__ === 'circle') {
			selectItem.data('__rx__', selectItem.attr('rx'));
			selectItem.data('__ry__', selectItem.attr('ry'));
			selectItem.data('__cx__', selectItem.attr('cx'));
			selectItem.data('__cy__', selectItem.attr('cy'));
			selectItem.data('__x__', selectItem.attr('x'));
			selectItem.data('__y__', selectItem.attr('y'));
		}
		if (typeof onDrawChange === 'function') {
			onDrawChange(selectItem);
		}
	};

	const setRectLT = target.rect(20, 20, 10, 10).attr({ dragType: 'TL', class: 'square2', fill: 'red' })
		.drag(dragChange, dragStart);
	const setRectRT = target.rect(20, 20, 10, 10).attr({ dragType: 'TR', class: 'square2', fill: 'red' })
		.drag(dragChange, dragStart);
	const setRectRB = target.rect(20, 20, 10, 10).attr({ dragType: 'BR', class: 'square2', fill: 'red' })
		.drag(dragChange, dragStart);
	const setRectTB = target.rect(20, 20, 10, 10).attr({ dragType: 'BL', class: 'square2', fill: 'red' })
		.drag(dragChange, dragStart);

	const handleShow = (path, callback) => {
		const { x, y, width, height } = path.getBBox();
		state.selectItem = path;
		const { __TYPE__ } = path.attr();
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
		if (__TYPE__ === 'rect' || __TYPE__ === 'circle' || __TYPE__ === 'image') {
			setRectLT.attr({ x: x - 10, y: y - 10, transform: '' });
			setRectLT.data('origTransform', '');
			setRectRT.attr({ x: x + width, y: y - 10, transform: '' });
			setRectRT.data('origTransform', '');
			setRectTB.attr({ x: x - 10, y: y + height, transform: '' });
			setRectTB.data('origTransform', '');
			setRectRB.attr({ x: x + width, y: y + height, transform: '' });
			setRectRB.data('origTransform', '');
			group.add(square2, setRectLT, setRectRT, setRectRB, setRectTB);
		} else {
			setRectLT.remove();
			setRectRT.remove();
			setRectTB.remove();
			setRectRB.remove();
		}
	};
	group.add(square2, setRectLT, setRectRT, setRectRB, setRectTB);

	return {
		group,
		handleShow,
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
