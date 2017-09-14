import React, { PropTypes } from 'react';
import md5 from 'md5';
import listen from 'event-listener';
import classNames from 'classnames';
import { createPPTLayer, createWhiteBoardLayer, createMouseLayer, createWBToolsLayer } from '../layer/index';
import './Broadcaster.css';
let videojs;

class Broadcaster extends React.Component {
  constructor(props) {
    super(props);
	  this.__ID__ = md5(`${new Date() + Math.random()}Broadcaster`);
	  this.role = 'Broadcaster';
    this.state = {};
	  this.uploadInput = {};
	  this.textInput = {};
	  this.images = [];
    this.historyItems = [];
    this.PrevItems = [];
    this.selectItem = null;
  }
  componentDidMount() {
	  this.init();
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
		  if (this.PPTLayer) {
			  this.PPTLayer.handleSetWH({
				  width: NWidth,
				  height: NHeight,
			  });
		  }
	  }
  }
  shouldComponentUpdate(nextProps, nextState) {
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
	    const { pptConfig = {} } = this.props;
	    const svg = this.svg = new Snap(this.svgWrap);
	    const { clientWidth, clientHeight } = svg.node;
			// 初始video
	    const globalPlayer = this.initVideo();
	    // ppt层
      this.PPTLayer = createPPTLayer({ role,
	      attr: {
		      width: clientWidth,
		      height: clientHeight,
	      },
	      ppt: pptConfig.ppt || [],
	      current: pptConfig.current || 1,
	      target: svg,
	      globalPlayer,
	      onPlayChange: pptConfig.onPlayChange,
      });

			// 白板层
      this.whiteBoardLayer = createWhiteBoardLayer({
	      role,
	      attr: {
	        width: clientWidth,
	        height: clientHeight,
	      },
	      target: svg,
	      onDrawChange(item) {
		      const { onDrawChange } = that.props;
		      if (typeof onDrawChange === 'function') {
			      onDrawChange(item.attr());
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
		    orientation: 'X',
		    attr: {},
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
		    onDrawChange: this.props.onDrawChange,
		    handleDraw({ attr }) {
			    if (that.whiteBoardLayer) {
				    return that.whiteBoardLayer.handleDraw({
					    ...attr,
					    __TYPE__: 'image',
				    });
			    }
	      },
		    handleHideItem() {
			    if (that.whiteBoardLayer) {
				    that.whiteBoardLayer.handleHideItem();
			    }
		    },
	    });
			// 鼠标层
			// this.mouseLayer = createMouseLayer({
	     //  role,
	     //  attr: {
		   //    class: `mouse-${role}`,
	     //  },
	     //  target: svg,
			// });
	    this.keyboard('bind');
			// 初始画笔items
      this.initDraw();
      this.initMouse();
      this.initWBtools();

    } catch (e) {
      console.log(e);
    }
  };
  initPPT = () => {};
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
  inputText = (e) => {
	  let inputListen;
	  this.textInput.target = e;
	  this.textInput.select = ({ text = '', cb, blurCB }) => {
		  const callback = function(e) {
			  if (typeof cb === 'function') {
				  cb(e.target.value);
			  }
		  };
		  if (inputListen) {
			  inputListen.remove();
			  inputListen = null;
		  }
		  inputListen = listen(e, 'input', callback);
		  listen(e, 'blur', () => {
			  if (typeof blurCB === 'function') {
				  blurCB();
			  }
			  if (inputListen) {
				  inputListen.remove();
				  inputListen = null;
			  }
		  });
		  e.value = text;
		  e.setSelectionRange(text.length, -1);
		  e.focus();
	  };
  };
  inputUpload = (e) => {
	  let changeListen;
	  this.uploadInput.target = e;
	  this.uploadInput.select = ({ cb, setUploading }) => {
		  if (changeListen) {
			  changeListen.remove();
			  changeListen = null;
		  }
		  changeListen = listen(e, 'change', (e) => {
			  if (changeListen) {
				  changeListen.remove();
				  changeListen = null;
			  }
			  const files = e.target.files[0];
			  if (files.size / 1024 > 1000) {
				  e.target.value = '';
				  alert('附件不能大于1M!');
				  return;
			  }
			  const reader = new FileReader();
			  reader.onload = (function(file) {
				  return function() {
					  const _ = this;
					  const image = new Image();
					  image.onload = function(){
						  e.target.value = '';
						  if (typeof cb === 'function') {
							  cb({
								  attr: {
									  href: _.result,
									  width: image.width,
									  height: image.height,
								  },
							  });
						  }
					  };
					  image.src = _.result;
				  };
			  })(files);
			  if (files) {
				  reader.readAsDataURL(files);
			  }
		  });
		  e.click();
		  if (typeof setUploading === 'function') {
			  setUploading();
		  }
	  };
  };
  renderUpLoad = () => {
  	return (
		  <input
			  type='file'
			  accept='.svg,.png,.jpg,.jpeg'
			  style={{
				  position: 'absolute',
				  top: 0,
				  left: 0,
				  overflow: 'hidden',
				  zIndex: -9999,
				  width: 0,
				  height: 0,
				  opacity: 0,
			  }}
			  ref={this.inputUpload}
		  />
	  );
  };
  renderText = () => {
  	return (
		  <input
			  style={{
					position: 'absolute',
					top: 0,
					left: 0,
					overflow: 'hidden',
					zIndex: -9999,
					opacity: 0,
			  }}
			  ref={this.inputText}
		  />
	  );
  };
  renderVideo = () => {
  	return (
  		<div className={"video-js svgVideo-component-wrap global-video-wrap"}>
		    <video
			    ref={e => this.videoDom = e}
				  id={this.__ID__}
				  className="video-js svgVideo-component global-video"
				  controls
				  preload="auto"
				  // poster="https://ppt-cdn.class100.com/ppts/766/G5L8_2.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=E3CH0i8tAuHjDFytQmeHh2XB088%3D"
				  data-setup='{}'>
			    {/*<source src="https://ppt-cdn.class100.com/ppts/766/G5L8_3.mp4" type="video/mp4" />*/}
			    <p className="vjs-no-js">
					  To view this video please enable JavaScript, and consider upgrading to a
					  web browser that
					  <a href="http://videojs.com/html5-video-support/" target="_blank">
						  supports HTML5 video
					  </a>
				  </p>
		    </video>
		  </div>
	  );
  };
  initVideo = () => {
  	// return;
  	try {
		  if (this.videoDom) {
			  // console.log(this.videoDom, 1111);
			  const options = {};
			  const globalPlayer = this.globalPlayer = videojs(this.videoDom, options, function onPlayerReady() {
				  videojs.log('Your player is ready!');

				  // In this context, `this` is the player that was created by Video.js.
				  // this.play();

				  // How about an event listener?
				  this.on('ended', function() {
					  videojs.log('Awww...over so soon?!');
				  });
			  });
			  return globalPlayer;
		  }
	  } catch (e) {
			console.log(e);
	  }
  };
  render() {
    const { className, width = 500, height = 500 } = this.props;
    const styles = {
      userSelect: 'none',
      position: 'relative',
	    // cursor: 'crosshair',
	    // cursor: `url(${require('../assets/bitbug_favicon.ico')}), default`,
    };
    return (
    	<div className={classNames('SvgEditWrap')} style={{ width, height }}>
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
		    { this.renderText() }
		    { this.renderUpLoad() }
		    { this.renderVideo() }
	    </div>
    );
  }
}

Broadcaster.propTypes = {
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
	pptConfig:  PropTypes.object
};

export default (video) => {
	videojs = video;
	return Broadcaster;
};