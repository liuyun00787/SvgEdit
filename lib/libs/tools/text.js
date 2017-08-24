'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var attrData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var target = arguments[1];
  var isInit = arguments[2];
  var __ID__ = attrData.__ID__,
      _attrData$text = attrData.text,
      text = _attrData$text === undefined ? '' : _attrData$text,
      _attrData$fontSize = attrData.fontSize,
      fontSize = _attrData$fontSize === undefined ? 16 : _attrData$fontSize,
      textPathAttr = attrData.textPathAttr,
      __text__ = attrData.__text__,
      onChange = attrData.onChange,
      _attrData$className = attrData.className,
      className = _attrData$className === undefined ? '' : _attrData$className,
      _attrData$x = attrData.x,
      x = _attrData$x === undefined ? 0 : _attrData$x,
      _attrData$y = attrData.y,
      y = _attrData$y === undefined ? 0 : _attrData$y,
      _attrData$fill = attrData.fill,
      fill = _attrData$fill === undefined ? '#f00' : _attrData$fill;

  var input = document.createElement('input');
  var group = target.group({
    class: (0, _classnames2.default)('textItemWrap', className)
  });
  group.attr({
    textPathAttr: textPathAttr,
    __TYPE__: 'text',
    class: (0, _classnames2.default)('textItem', __ID__ || group.id),
    __ID__: __ID__ || group.id
  });
  var textAttr = {};
  if (textPathAttr) {
    textAttr = JSON.parse(textPathAttr) || {};
  }
  var textPath = target.paper.text(x, y, (text || __text__ || '') + ' |');
  textPath.attr({
    class: (0, _classnames2.default)('text'),
    fill: fill,
    'font-size': fontSize,
    __ID__: textPath.id
  });
  if (isInit) {
    textPath.attr({
      text: textAttr.__text__
    });
  }
  group.add(textPath);
  group.attr({
    textPathAttr: JSON.stringify(textPath.attr())
  });
  input.value = textAttr.__text__ || '';
  input.id = 'input-' + group.id;
  input.className = 'input-itemText';
  input.style.opacity = '0';
  input.style.position = 'fixed';
  input.style.top = 0;
  input.style.left = 0;
  input.style.zIndex = -1;
  document.body.appendChild(input);
  setTimeout(function () {
    input.focus();
  }, 500);
  input.oninput = function (e) {
    input.focus();
    textPath.attr({
      text: (e.target.value || '') + ' |',
      __text__: (e.target.value || '') + ' |'
    });
    group.attr({
      textPathAttr: JSON.stringify(textPath.attr())
    });
    if (typeof onChange === 'function') {
      onChange(group, (e.target.value || '') + ' |', function () {
        return input.focus();
      });
    }
  };
  input.onblur = function (e) {
    textPath.attr({
      text: e.target.value || '',
      __text__: e.target.value || ''
    });
    group.attr({
      textPathAttr: JSON.stringify(textPath.attr())
    });
    if (typeof onChange === 'function') {
      onChange(group, e.target.value || '', function () {
        return input.focus();
      });
    }
  };

  return {
    group: group,
    handeFocus: function handeFocus() {
      setTimeout(function () {
        // document.getElementsByClassName('input-itemText').blur();
        input.focus();
      }, 500);
    }
  };
};