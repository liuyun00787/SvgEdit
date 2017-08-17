import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Mousetrap from 'mousetrap';
import layer from './libs/layer';
import Snap from '../node_modules/imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';

const {
  createPPTLayer,
  createWhiteBoardLayer,
  createMouseLayer,
  createWBToolsLayer,
} = layer;

class SvgEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.historyItems = [];
    this.PrevItems = [];
    this.groupItems = {};
    this.PrevItems = [];
    this.selectItem = null;
  }
  componentDidMount() {
    this.timeoutInit = setTimeout(() => {
      this.init();
    }, 100);
  }
  componentWillReceiveProps(nextProps) {
    const { role, items = [], selectItem = {} } = nextProps;
    if (role === 'Broadcaster') {

    }
    if (role === 'Viewer') {
      if (this.mouseLayer) {
        const { handleSetPosition } = this.mouseLayer;
        if (JSON.stringify(nextProps.mouseInfo) !== JSON.stringify(this.props.mouseInfo)) {
          handleSetPosition({
            x: nextProps.mouseInfo.x,
            y: nextProps.mouseInfo.y,
          });
        }
      }
      if (this.wBToolsLayer) {
        const { handleSetPosition, handleToolsChange } = this.wBToolsLayer;
        if (JSON.stringify(nextProps.wBToolsInfo) !== JSON.stringify(this.props.wBToolsInfo)) {
          handleSetPosition(nextProps.wBToolsInfo.transform, nextProps.wBToolsInfo.tool);
          if (nextProps.wBToolsInfo.tool !== this.props.wBToolsInfo.tool) {
            handleToolsChange(nextProps.wBToolsInfo.tool);
          }
        }
      }
      if (this.whiteBoardLayer) {
        const { handleDraw, handleDelete } = this.whiteBoardLayer;
        if (!nextProps.items.length && this.PrevItems.length) {
          handleDelete();
        }
        if (items.length) {
          if (JSON.stringify(nextProps.items) !== JSON.stringify(this.PrevItems)) {
            const { __ID__ } = selectItem;
            const index = this.PrevItems.findIndex(item => item.__ID__ === __ID__);
            if (index === -1) {
              const newItem = handleDraw(selectItem);
              this.historyItems.push(newItem);
              this.PrevItems.push(selectItem);
            } else {
              this.historyItems[index].attr(selectItem);
              this.PrevItems[index] = selectItem;
              if(selectItem.class === 'textItem') {
                const textPathAttr = JSON.parse(selectItem.textPathAttr)
                this.historyItems[index]
                  .select('.textPape')
                  .attr({ textPathAttr })
                  .attr({ text:  textPathAttr.__text__ })
              }
            }
          }
        }
      }
    }
  }
  shouldComponentUpdate() {
    return false;
  }
  componentWillUnmount() {
    this.keyboard('unbuild');
    if (this.timeoutInit) {
      clearTimeout(this.timeoutInit);
    }
    window.removeEventListener('resize');
  }
  /**
   * 初始化
   * @returns {*}
   */
  init = () => {
    try {
      const { role } = this.props;
      const svg = this.svg = Snap(this.svgWrap);
      const that = this;
      // 测试代码
      // svg.paper.text(50, 20, `version: ${__VERSION__} ====== ${role === 'Viewer' ? '学生端' : '教师端'}`);
      // if (role !== 'Viewer') {
      //   svg.paper.text(50, 50, '快捷键：');
      //   svg.paper.text(70, 80, '1. 按空格键 + 鼠标左键选择笔画拖拽');
      //   svg.paper.text(70, 110, '2. 按backspace键删除选中笔画/按shift+backspace键清除所有');
      // }
      // ppt层
      this.PPTLayer = createPPTLayer({}, svg);
      // 白板层
      const whiteBoardLayer = this.whiteBoardLayer = createWhiteBoardLayer({
        role,
        width: svg.node.clientWidth,
        height: svg.node.clientHeight,
        onDrawChange(items) {
          const { onDrawChange } = that.props;
          if (typeof onDrawChange === 'function') {
            onDrawChange(items);
          }
        },
        onClear: (item) => {
          const { onClear } = that.props;
          onClear(item);
        },
      }, svg);
      // 白板工具层
      this.wBToolsLayer = createWBToolsLayer({
        role,
        x: 0,
        handleSelect: (tool) => {
          const { onWbToolsClick } = that.props;
          whiteBoardLayer.handleSetTools(tool);
          onWbToolsClick(tool);
        },
        onDrag(transform) {
          const { onWbToolsDrag } = that.props;
          onWbToolsDrag(transform);
        },
      }, svg);
      // 鼠标层
      this.mouseLayer = createMouseLayer({
        role,
      }, svg);
      if (role === 'Broadcaster') {
        this.keyboard('bind');
      }
      window.addEventListener('resize', () => {
        const { clientWidth, clientHeight } = svg.node;
        whiteBoardLayer.handleSetWH({ width: clientWidth, height: clientHeight });
      });
      // 初始画笔items
      this.initDraw();
    } catch (e) {
      console.log(e);
    }
  };
  initDraw = () => {
    if (this.whiteBoardLayer) {
      const { items = [] } = this.props;
      const { handleDraw, handleDelete } = this.whiteBoardLayer;
      for ( let i = 0; i < items.length; i += 1 ) {
        const newItem = handleDraw(items[i], true);
        this.historyItems.push(newItem);
        this.PrevItems.push(items[i]);
      }
    }
  }
  /**
   * 快捷键
   * @param type 绑定事件 'bind' || 'unbild'
   */
  keyboard = (type) => {
    const that = this;
    const { svg, whiteBoardLayer } = this;
    const { whiteBoardGroup } = this.groupItems;
    if (type === 'bind') {
      // 绑定鼠标事件
      this.svg.mousemove((e) => {
        const { onMouseChange } = this.props;
        const { handleSetPosition } = this.mouseLayer;
        handleSetPosition({ x: e.offsetX, y: e.offsetY }, onMouseChange);
      });
      //
      Mousetrap.bind('backspace', () => {
        whiteBoardLayer.handleDelete(whiteBoardLayer.getSelectItem());
      }, 'keydown');
      Mousetrap.bind('shift+backspace', () => {
        whiteBoardLayer.handleDelete();
      }, 'keydown');
      Mousetrap.bind('space', () => {
        whiteBoardLayer.handleSelect(true);
      }, 'keydown');
      Mousetrap.bind('space', () => {
        whiteBoardLayer.handleSelect(false);
      }, 'keyup');
    }
    if (type === 'unbuild') {
      Mousetrap.unbind('backspace');
      Mousetrap.unbind('shift+backspace');
      Mousetrap.unbind('space');
      window.removeEventListener('resize');
      whiteBoardGroup.unmousedown();
      whiteBoardGroup.unmousemove();
      whiteBoardGroup.unmouseup();
    }
  };
  render() {
    const { role, className, width = 500, height = 500 } = this.props;
    const styles = {
      userSelect: 'none',
      position: 'relative',
    };
    if (role === 'Broadcaster') {
      styles.cursor = `url(${require('./assets/bitbug_favicon.ico')}), default`;
    }
    return (
      <svg
        style={styles}
        width={width}
        height={height}
        className={classNames(
          'SvgEdit',
          role === 'Broadcaster' ? 'Broadcaster' : 'Viewer',
          className,
        )}
        ref={svg => this.svgWrap = svg}
      />
    );
  }
}

SvgEdit.propTypes = {
  role: React.PropTypes.string,
  className: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  items: React.PropTypes.array,
  selectItem: React.PropTypes.object,
  mouseInfo: React.PropTypes.object,
  wBToolsInfo: React.PropTypes.object,
  onWbToolsClick: React.PropTypes.func,
  onWbToolsDrag: React.PropTypes.func,
  onMouseChange: React.PropTypes.func,
  onDrawChange: React.PropTypes.func,
  onClear: React.PropTypes.func,
};

export default SvgEdit;
