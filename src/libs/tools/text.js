import classNames from 'classnames';

export default (attrData = {}, target, isInit) => {
  const { __ID__, text = '', fontSize = 16, textPathAttr, __text__, onChange, className = '', x = 0, y = 0, stroke = '#f00', fill = '#f00' } = attrData;
  const input = document.createElement('input');
  const group = target.group({
    class: classNames('textItemWrap', className),
  });
  group.attr({
    textPathAttr,
    class: classNames('textItem'),
    __ID__: __ID__ || group.id,
  });
  let textAttr = {};
  if (textPathAttr) {
    textAttr = JSON.parse(textPathAttr) || {};
  }
  const textPath = target.paper.text(x, y, `${ text || __text__ || '' } |`);
  textPath.attr({
    class: classNames('textPape'),
    fill,
    'font-size': fontSize,
    __ID__: textPath.id,
  });
  if (isInit) {
    textPath.attr({
      text: textAttr.__text__,
    });
  }
  group.add(textPath);
  group.attr({
    textPathAttr: JSON.stringify(textPath.attr()),
  });
  input.value = textAttr.__text__ || '';
  input.id = `input-${group.id}`;
  input.className = 'input-itemText';
  input.style.opacity = '0';
  input.style.position = 'fixed';
  input.style.top = 0;
  input.style.left = 0;
  input.style.zIndex = -1;
  document.body.appendChild(input);
  setTimeout(() => {
    input.focus();
  }, 500);
  input.oninput = (e) => {
    input.focus();
    textPath.attr({
      text: `${e.target.value || ''} |`,
      __text__: `${e.target.value || ''} |`,
    });
    group.attr({
      textPathAttr: JSON.stringify(textPath.attr()),
    })
    if (typeof onChange === 'function') {
      onChange(group, `${e.target.value || ''} |`, () => input.focus());
    }
  };
  input.onblur = (e) => {
    textPath.attr({
      text: e.target.value  || '',
      __text__: e.target.value  || '',
    });
    group.attr({
      textPathAttr: JSON.stringify(textPath.attr()),
    })
    if (typeof onChange === 'function') {
      onChange(group, e.target.value || '', () => input.focus());
    }
  };

  return {
    group,
    handeFocus: () => {
      setTimeout(() => {
        // document.getElementsByClassName('input-itemText').blur();
        input.focus();
      }, 500);
    },
  };
};
