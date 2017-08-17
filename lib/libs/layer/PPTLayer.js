'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref, target) {
  var _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className;

  var group = target.group({
    class: (0, _classnames2.default)('PPTLayer', className)
  });
  return {
    whiteBoardLayer: group
  };
};