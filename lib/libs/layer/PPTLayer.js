'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (role, _ref, target) {
  var className = _ref.class;

  var group = target.group({
    class: (0, _classnames2.default)('PPTLayer', className)
  });
  return {
    layer: group
  };
};