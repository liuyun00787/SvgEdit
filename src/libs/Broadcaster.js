import React, { PropTypes } from 'react';
import is from 'is_js';
import classNames from 'classnames';
import Snap from 'imports?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';
import { createPPTLayer, createWhiteBoardLayer, createMouseLayer, createWBToolsLayer } from './layer';

class Broadcaster extends React.Component {
  constructor(props) {
    super(props);
	  this.role = 'Broadcaster';
    this.state = {};
    this.historyItems = [];
    this.PrevItems = [];
    this.selectItem = null;
  }
  componentDidMount() {
    this.timeoutInit = setTimeout(() => {
      this.init();
    }, 100);
  }
  componentWillReceiveProps(nextProps) {
	  const { width, height } = this.props;
	  const { width: NWidth, height: NHeight } = nextProps;
	  if (NWidth !== width || NHeight !== height) {
		  if (this.whiteBoardLayer) {
			  this.whiteBoardLayer.handleSetWH({
				  width: NWidth,
				  height: NHeight,
			  });
		  }
	  }
  }
  shouldComponentUpdate(nextProps) {
	  const { width, height, className } = this.props;
	  const { width: NWidth, height: NHeight, className: NClassName } = nextProps;
    if (NWidth !== width || NHeight !== height || NClassName !== className) {
	    return true;
    }
    return false;
  }
  componentWillUnmount() {
    this.keyboard('unbuild');
    if (this.timeoutInit) {
	    this.timeoutInit = null;
      clearTimeout(this.timeoutInit);
    }
  }
	/**
	 * 初始化
	 * @returns {*}
	 */
  init = () => {
    try {
	    const that = this;
	    const role = this.role;
      const svg = this.svg = new Snap(this.svgWrap);
			// ppt层
      this.PPTLayer = createPPTLayer(role, {}, svg);
			// 白板层
	    const { clientWidth, clientHeight } = svg.node;
      this.whiteBoardLayer = createWhiteBoardLayer(role, {
        width: clientWidth,
        height: clientHeight,
      }, svg, {
	      onDrawChange(items) {
		      const { onDrawChange } = that.props;
		      if (typeof onDrawChange === 'function') {
			      onDrawChange(items.attr());
		      }
	      },
	      onDeleteChange: (item) => {
		      const { onDeleteChange } = that.props;
		      if (typeof onDeleteChange === 'function') {
			      onDeleteChange(item);
		      }
	      },
      });
			// 白板工具层
      this.wBToolsLayer = createWBToolsLayer(role, {
        x: 0,
	      y: 0,
      }, svg, {
      	onColorChange: (config) => {
      		console.log(config, 11111);
      		this.whiteBoardLayer.handleSetConfig(config);
	      },
	      onSelect: (info) => {
		      const { onWbToolsChange } = that.props;
		      const { whiteBoardLayer } = that;
		      const { __TYPE__, __CONF__ } = info;
		      whiteBoardLayer.handleSetTools(__TYPE__, __CONF__);
		      if (typeof onWbToolsChange === 'function') {
			      onWbToolsChange(info);
		      }
	      },
	      onDeleteChange: () => {
		      const { whiteBoardLayer } = that;
		      if (whiteBoardLayer) {
			      if (whiteBoardLayer.getIsSelect()) {
				      whiteBoardLayer.handleDelete(whiteBoardLayer.getSelectItem().attr());
			      }
		      }
	      },
	      onDrag(info) {
		      const { onWbToolsChange } = that.props;
		      if (typeof onWbToolsChange === 'function') {
			      onWbToolsChange(info);
		      }
	      },
      });
			// 鼠标层
      this.mouseLayer = createMouseLayer(role, {
	      class: `mouse-${role}`,
      }, svg);
	    this.keyboard('bind');
			// 初始画笔items
      this.initDraw();
      this.initMouse();
      this.initWBtools();
    } catch (e) {
      console.log(e);
    }
  };
  initDraw = () => {
    if (this.whiteBoardLayer) {
      const { items = [] } = this.props;
      const { handleDraw } = this.whiteBoardLayer;
      for (let i = 0; i < items.length; i += 1) {
        const newItem = handleDraw(items[i], true);
        this.historyItems.push(newItem);
        this.PrevItems.push(items[i]);
      }
    }
  };
  initMouse = () => {
    if (this.mouseLayer) {
      const { mouseInfo = {} } = this.props;
      const { handleSetPosition } = this.mouseLayer;
      handleSetPosition({
        x: mouseInfo.x || -1000,
        y: mouseInfo.y || -1000,
      });
    }
  };
  initWBtools = () => {
    if (this.wBToolsLayer) {
      const { wBToolsInfo = {} } = this.props;
      const { handleSetPosition, handleToolsChange } = this.wBToolsLayer;
      if (wBToolsInfo.transform) {
        handleSetPosition(wBToolsInfo.transform);
      }
      if (wBToolsInfo.tool) {
        handleToolsChange(wBToolsInfo.tool);
      }
    }
  };
	/**
	 * 快捷键
	 * @param type 绑定事件 'bind' || 'unbild'
	 */
  keyboard = (type) => {
    if (type === 'bind') {
			// 绑定鼠标事件
      this.svg.mousemove((e) => {
        const { onMouseChange } = this.props;
        if (this.mouseLayer) {
	        const { handleSetPosition } = this.mouseLayer;
	        handleSetPosition({ x: e.offsetX, y: e.offsetY }, onMouseChange);
        }
      });
    }
    if (type === 'unbuild') {

    }
  };
  render() {
    const { className, width = 500, height = 500 } = this.props;
    const styles = {
      userSelect: 'none',
      position: 'relative',
	    cursor: `url(${require('../assets/bitbug_favicon.ico')}), default`,
    };
    return (
      <svg
        ref={e => this.svgWrap = e}
        style={styles}
        width={width}
        height={height}
        className={classNames(
					'SvgEdit',
					'Broadcaster',
					className,
				)}
      />
    );
  }
}

Broadcaster.propTypes = {
  role: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  items: PropTypes.array,
  selectItem: PropTypes.object,
  mouseInfo: PropTypes.object,
  wBToolsInfo: PropTypes.object,
  onMouseChange: PropTypes.func,
  onDrawChange: PropTypes.func,
  onDeleteChange: PropTypes.func,
  onWbToolsChange: PropTypes.func,
};

export default Broadcaster;
