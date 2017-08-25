import React, { PropTypes } from 'react';
import is from 'is_js';
import classNames from 'classnames';
import Snap from 'imports?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';
import { createPPTLayer, createWhiteBoardLayer, createMouseLayer, createWBToolsLayer } from './layer';

class Broadcaster extends React.Component {
  constructor(props) {
    super(props);
	  this.role = 'Broadcaster';
    this.state = {
    	images: [],
	    text: '',
    };
	  this.uploadInput = {};
	  this.textInput = {};
	  this.images = [];
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
  shouldComponentUpdate(nextProps, nextState) {
	  const { width, height, className } = this.props;
	  const { width: NWidth, height: NHeight, className: NClassName } = nextProps;
	  if (nextState.images.length !== this.images.length) {
		  if (this.whiteBoardLayer) {
		  	const newImages = nextState.images[nextState.images.length - 1] || {};
			  this.whiteBoardLayer.handleDraw({
				  ...newImages,
				  __TYPE__: 'image',
			  });
		  }
		  this.images = [].concat(nextState.images);
	  }
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
	      textInput: this.textInput,
      });
			// 白板工具层
	    this.wBToolsLayer = createWBToolsLayer({
		    role,
		    attr: { x: 0, y: 0 },
		    target: svg,
		    onColorChange: (config) => {
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
		    onDeleteChange: (clearAll) => {
			    const { whiteBoardLayer } = that;
			    if (whiteBoardLayer) {
				    if (clearAll) {
					    whiteBoardLayer.handleDelete();
				    } else if (whiteBoardLayer.getIsSelect()) {
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
		    handleUpload: this.uploadInput,
	    });
			// 鼠标层
      this.mouseLayer = createMouseLayer({
	      role,
	      attr: {
		      class: `mouse-${role}`,
	      },
	      target: svg,
      });
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
  	const that = this;
    const { className, width = 500, height = 500 } = this.props;
    const styles = {
      userSelect: 'none',
      position: 'relative',
	    cursor: `url(${require('../assets/bitbug_favicon.ico')}), default`,
    };
    return (
    	<div
		    className={classNames(
			    'SvgEditWrap',
		    )}
		    style={{
			    width,
			    height,
		    }}
	    >
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
		    <input
			    type='file'
			    accept='.svg,.png,.jpg,.jpeg'
			    style={{
				    position: 'absolute',
				    overflow: 'hidden',
				    zIndex: -9999,
				    width: 0,
				    height: 0,
				    opacity: 0,
			    }}
			    onChange={(e) => {
				    const files = e.target.files[0];
				    const reader = new FileReader();
				    reader.onload = (function(file) {
					    return function(e) {
						    const _ = this;
						    const image = new Image();
						    image.onload = function(){
							    const { images } = that.state;
							    images.push({
								    href: _.result,
								    width: image.width,
								    height: image.height,
							    });
							    that.setState({
								    images: images,
							    });
						    };
						    image.src = _.result;
					    };
				    })(files);
				    reader.readAsDataURL(files);
			    }}
			    ref={e => {
				    this.uploadInput.select = () => {
					    e.click();
				    };
				    this.uploadInput.target = e;
			    }}
		    />
		    <input
			    style={{
				    position: 'absolute',
				    overflow: 'hidden',
				    zIndex: -9999,
				    width: 0,
				    height: 0,
				    opacity: 0,
			    }}
			    ref={e => {
				    this.textInput.select = ({ text = '', cb, blurCB }) => {
					    const callback = (e) => {
					    	if (typeof cb === 'function') {
							    cb(e.target.value);
						    }
					    };
					    e.addEventListener('blur', () => {
						    if (typeof blurCB === 'function') {
							    blurCB();
						    }
						    e.removeEventListener('input', callback);
					    });
					    e.addEventListener('input', callback);
					    e.value = text;
					    e.focus();
				    };
				    this.textInput.target = e;
			    }}
		    />
	    </div>
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
