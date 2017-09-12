import classNames from 'classnames';

export default ({ role = 'Broadcaster', attr = {}, target, onDrawChange }) => {
	const state = {
		selectItem: '',
		isDrag: true,
		hoverIn: false,
	};
	const group = target.group({
		fillOpacity: 0.6,
		transform: 'matrix(1,0,0,1,-10000,-10000)',
		class: classNames('WBWrapItem', attr.className),
	})
		.drag(
		function (dx, dy) {
			// if (!state.isDrag) return;
			// const dx = event.offsetX;
			// const dy = event.offsetY;
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
			// if (!state.isDrag) return;
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

	const mousedown = function(e) {
		state.hoverIn = true;
		state.isDrag = false;
		console.log(e);
		this.data('X', e.clientX);
		this.data('Y', e.clientY);
		this.attr({
			fill: '#ff00ff',
		});
	};
	const mouseup = function(e) {
		state.hoverIn = true;
		state.isDrag = true;
		this.data('X', 0);
		this.data('Y', 0);
		console.log(e);
		this.attr({
			fill: 'red',
		});
	};
	const mousemove = function(e) {
		const { clientX, clientY } = e;
		const { X, Y } = this.data;
		// if (!state.isDrag) {
		// 	group.attr({
		// 		transform: Snap.Matrix(X - clientX, Y - clientY)
		// 	})
		// }
	};

	const setRectLT = target.rect(20, 20, 10, 10).attr({ class: 'square2', fill: 'red' })
		.mousedown(mousedown)
		.mousemove(mousemove)
		.mouseup(mouseup);
	const setRectRT = target.rect(20, 20, 10, 10).attr({ class: 'square2', fill: 'red' })
		.mousedown(mousedown)
		.mousemove(mousemove)
		.mouseup(mouseup);
	const setRectRB = target.rect(20, 20, 10, 10).attr({ class: 'square2', fill: 'red' })
		.mousedown(mousedown)
		.mousemove(mousemove)
		.mouseup(mouseup);
	const setRectTB = target.rect(20, 20, 10, 10).attr({ class: 'square2', fill: 'red' })
		.mousedown(mousedown)
		.mousemove(mousemove)
		.mouseup(mouseup);

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
