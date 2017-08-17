import classNames from 'classnames';
import tools from '../tools';
const { createSelector, createPath, createText, createRect, createCircle } = tools;
export default ({ onClear, onDrawChange, role = 'Broadcaster', className = '', width = 0, height = 0, items = [] }, target) => {
  const state = {
    downX: 0,
    downY: 0,
    selectItem: null,
    isDraw: true,
    isSelect: false,
    tools: 'path',
  };
  const group = target.group({
    class: classNames('whiteBoardLayer', className),
  });
  Snap.plugin((Snap, Element, Paper, glob) => {
    const elproto = Element.prototype;
    elproto.wBtoFront = function () {
      group.add(this);
    };
    elproto.toBack = function () {
      this.appendTo(this.paper);
    };
  });
  const wbItemWrap = createWbItemWrap({ onDrawChange, role }, target);

  const whiteBoardBG = target.rect(0, 0, 0, 0).attr({ class: 'whiteBoardBG', fill: '#ffff00', fillOpacity: 0 }).attr({
    width,
    height,
  });
  group.attr({
    __ID__: group.id,
  });

  group.add(whiteBoardBG, wbItemWrap.group);

  group.mousedown(function (e) {
    if (role !== 'Broadcaster') return;
    const { isDraw, isSelect, tools } = state;
    const { isActive } = this.data();
    state.downX = e.offsetX; state.downY = e.offsetY;
    let pathLayer;
    let drawPath;
    console.log('mousedown', isDraw, isSelect);
    if (!isDraw) {
      return;
    }
    if (isSelect) {
      return;
    }
    if (isActive) {
      return;
    }
    this.data('isActive', true);
    if (tools === 'path') {
      pathLayer = createPath({ x: e.offsetX, y: e.offsetY }, target);
      drawPath = pathLayer.group;
    }
    if (tools === 'text') {
      pathLayer = createText({
        text: '', x: e.offsetX, y: e.offsetY,
        onChange: (path, text) => {
          wbItemWrap.handleShow(path, () => pathLayer.handeFocus(this));
          if (typeof onDrawChange === 'function') {
            onDrawChange(path);
          }
        },
      }, target);
      drawPath = pathLayer.group;
    }
    if (tools === 'rect') {
      pathLayer = createRect({
        x: e.offsetX, y: e.offsetY,
        onChange: (path) => {
          // wbItemWrap.handleShow(path);
        },
      }, target);
      drawPath = pathLayer.group;
    }
    if (tools === 'circle') {
      pathLayer = createCircle({
        x: e.offsetX, y: e.offsetY,
        onChange: (path) => {
          // wbItemWrap.handleShow(path);
        },
      }, target);
      drawPath = pathLayer.group;
    }
    drawPath.click(function() {
      if (state.isDraw) {
        return;
      };
      if (this.attr('class') === 'textItem') {
        pathLayer.handeFocus(this);
      }
      state.isDraw = false;
      state.isSelect = true;
      wbItemWrap.handleShow(this, this.attr('class') === 'textItem' ? () => pathLayer.handeFocus(this) : null);
      state.selectItem = this;
      if (tools === 'text') {
        pathLayer.handeFocus(this);
      }
    });
    state.selectItem = drawPath;
    group.add(drawPath);
    onDrawChange(drawPath);
  });
  group.mousemove(function (e) {
    if (role !== 'Broadcaster') return;
    const { isDraw, tools } = state;
    const { isActive } = this.data();
    console.log('mousemove');
    if (!isDraw) {
      return;
    }
    if (!isActive) {
      return;
    }
    if (tools === 'path') {
      let { d } = state.selectItem.attr();
      state.selectItem.attr({ d: d += `,${e.offsetX},${e.offsetY}` });
    }
    if (tools === 'rect') {
      const getBox = state.selectItem.getBBox();
      const X = e.offsetX - state.downX;
      const Y = e.offsetY - state.downY;
      state.selectItem.attr({
        width: (X > 0 ? X : 0),
        height: (Y > 0 ? Y : 0),
      });
    }
    if (tools === 'circle') {
      const getBox = state.selectItem.getBBox();
      const X = e.offsetX - state.downX;
      const Y = e.offsetY - state.downY;
      const r = (X > 0 ? X : 0) > (Y > 0 ? Y : 0) ? (X > 0 ? X : 0) : (Y > 0 ? Y : 0);
      state.selectItem.attr({
        rx: (X > 0 ? X : 0),
        ry: (Y > 0 ? Y : 0),
      });
    }
    onDrawChange(state.selectItem);
  });
  group.mouseup(function (e) {
    if (role !== 'Broadcaster') return;
    const { isDraw } = state;
    const { isActive } = this.data();
    console.log('mouseup');
    if (isDraw) {
      // wbItemWrap.handleShow(state.selectItem);
      // state.isSelect = true;
    }
    this.data('isActive', false);
  });
  group.dblclick(function (e) {
    if (role !== 'Broadcaster') return;
    const { isSelect } = state;
    const { isActive } = this.data();
    console.log('dblclick');
    // if (isSelect) {
      wbItemWrap.handleHide();
      state.selectItem = null;
      state.isSelect = false;
    // }
  });
  return {
    group,
    getSelectItem: () => {
      return state.selectItem;
    },
    handleSetWH: ({ width, height }) => {
      whiteBoardBG.attr({ width, height });
    },
    handleSetIsDraw: (isDraw = false) => {
      state.isDraw = isDraw;
    },
    handleDelete: (path) => {
      if (path) {
        if (state.isSelect) {
          path.remove();
          state.selectItem = null;
          // state.isSelect = false;
          // state.isDraw = true;
          wbItemWrap.handleHide(path);
        }
      } else {
        group.clear();
        group.add(whiteBoardBG);
        state.selectItem = null;
        // state.isSelect = false;
        // state.isDraw = true;
        wbItemWrap.handleHide(path);
      }
      if (typeof onClear === 'function') {
        onClear(path);
      }
    },
    handleSelect: (isSelect = false) => {
      state.isDraw = !isSelect;
      // state.isSelect = isSelect;
    },
    handleSetTools: (tools = 'path') => {
      // tools: 'path',
      // tools: 'text',
      // tools: 'rect',
      // tools: 'circle',
      if (tools === 'select') {
        state.isDraw = false;
        state.isSelect = true;
      } else {
        state.isDraw = true;
        state.isSelect = false;
        state.tools = tools;
      }
    },
    handleDraw: (item, isInit) => {
      let path;
      if (item.class === 'pathItem') {
        path = createPath(item, target, isInit);
      }
      if (item.class === 'textItem') {
        item['onChange'] = (g, a, cb) => {
          wbItemWrap.handleShow(g, cb);
          if (typeof onDrawChange === 'function') {
            onDrawChange(g);
          }
        }
        path = createText(item, target, isInit);
        path.group.select('.textPape').attr(JSON.parse(item.textPathAttr || ''));
      }
      if (item.class === 'rectItem') {
        path = createRect(item, target, isInit);
      }
      if (item.class === 'circleItem') {
        path = createCircle(item, target, isInit);
      }
      path.group.click(function() {
        if (state.isDraw) {
          return;
        };
        state.isDraw = false;
        state.isSelect = true;
        wbItemWrap.handleShow(this, this.attr('class') === 'textItem' ? () => path.handeFocus(this) : null);
        state.selectItem = this;
        if (this.attr('class') === 'textItem') {
          path.handeFocus(this);
        }
      })
      group.add(path.group);
      state.selectItem = path.group;
      return path.group;
    },
  };
};


function createWbItemWrap({ role = 'Broadcaster', onDrawChange, className = '', width = 0, height = 0 }, target) {
  const state = {
    selectItem: '',
    hoverIn: false,
  };
  const group = target.group({
    fillOpacity: role === 'Broadcaster' ? 0.6 : 0,
    transform: 'matrix(1,0,0,1,-10000,-10000)',
    class: classNames('WBWrapItem', className),
  }).drag(
    function (dx, dy) {
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
  const setRectLT = target.rect(20, 20, 10, 10).attr({ class: 'square2', fill: 'red' })
    .hover(
      function() {
        state.hoverIn = true;
        this.attr({
          fill: '#ff00ff',
        });
      },
      function () {
        state.hoverIn = true;
        this.attr({
          fill: 'red',
        });
      },
    );
  const setRectRT = target.rect(20, 20, 10, 10).attr({ class: 'square2', fill: 'red' })
    .hover(
      function() {
        state.hoverIn = true;
        this.attr({
          fill: '#ff00ff',
        });
      },
      function () {
        state.hoverIn = true;
        this.attr({
          fill: 'red',
        });
      },
    )
  const setRectRB = target.rect(20, 20, 10, 10).attr({ class: 'square2', fill: 'red' })
    .hover(
      function() {
        state.hoverIn = true;
        this.attr({
          fill: '#ff00ff',
        });
      },
      function () {
        state.hoverIn = true;
        this.attr({
          fill: 'red',
        });
      },
    );
  const setRectTB = target.rect(20, 20, 10, 10).attr({ class: 'square2', fill: 'red' })
    .hover(
      function() {
        state.hoverIn = true;
        this.attr({
          fill: '#ff00ff',
        });
      },
      function () {
        state.hoverIn = true;
        this.attr({
          fill: 'red',
        });
      },
    );

  group.add(square, square2, setRectLT, setRectRT, setRectRB, setRectTB);

  return {
    group,
    handleShow: (path, callback) => {
      if (role !== 'Broadcaster') return;
      const { x, y, width, height } = path.getBBox();
      state.selectItem = path;
      group.attr({
        transform: '',
      }).click(() => {
        if (typeof callback === 'function') {
          callback();
        }
        group.unclick();
      })
      group
        .data('origTransform', path.transform().local)
        .attr({ x, y, width, height })
        .wBtoFront()
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

