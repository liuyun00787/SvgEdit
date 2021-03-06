import classNames from 'classnames';

export default ({ role = 'Broadcaster', attr = {}, target, textInput = {}, onDrawChange, handleShow, handleHide }) => {
	let after = ' | ';
	if (role !== 'Broadcaster') {
		after = '';
	}
	const path = target.paper.text(attr.x, attr.y, `${attr.text || ('__TEXT__' in attr && attr.__TEXT__ !== '' ? attr.__TEXT__ : ' ' )  || '' } ${ role === 'Broadcaster' ? after : ' '}`).attr({
		...attr,
		fontSize: attr.fontSize ? attr.fontSize : 16,
		__TEXT__: attr.__TEXT__ ? attr.__TEXT__ : ' ',
		__TYPE__: attr.__TYPE__ ? attr.__TYPE__ : 'text',
	});
	if (!attr.__ID__) {
		path.attr({
			__ID__: path.id,
			class: classNames('textItem', path.id),
		});
	} else {
		path.attr({
			id: attr.__ID__,
		});
	}
	const setText = () => {
		const { __TEXT__ = '' } = path.attr();
		const text = __TEXT__.replace(after, '');
		if (typeof textInput.select === 'function') {
			textInput.select({
				text: text === after ? ' ': text,
				cb(text = '') {
					const T = text + after;
					path.attr({ text: T, __TEXT__: T.replace(after, '') || ' ' });
					if (typeof onDrawChange === 'function') {
						onDrawChange(path);
					}
					if (typeof handleShow === 'function') {
						handleShow(path);
					}
				},
				blurCB() {
					const text = path.attr('__TEXT__');
					path.attr({ text });
					if (!(text || ' ').replace(/(^\s*)|(\s*$)/g, '') && typeof handleHide === 'function') {
						path.attr({ text: ' ', __TEXT__: ' ' });
						if (typeof onDrawChange === 'function') {
							// onDrawChange(path);
						}
						handleHide();
						path.remove();
					}
				}
			});
		}
	};
	if (role === 'Broadcaster') {
		// setText();
		setTimeout(setText, 100);
	}
  return {
    group: path,
    handeFocus() {
    	if (role === 'Broadcaster') {
		    // setText();
		    setTimeout(setText, 100);
	    }
    },
  };
};
