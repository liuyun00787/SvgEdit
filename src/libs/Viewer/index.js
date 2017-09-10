import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import classNames from 'classnames';
import Snap from 'imports?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';
import videojs from 'imports?this=>window,fix=>module.exports=0!video.js/dist/video.js';
import '../video.js/video-js.min.css';
import { createPPTLayer, createWhiteBoardLayer, createMouseLayer, createWBToolsLayer } from '../layer/index';
import './style.css';

class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.role = 'Viewer';
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
	  const { width, height, mouseInfo, items, wBToolsInfo, pptConfig = {} } = this.props;
	  const { width: NWidth, height: NHeight, mouseInfo: NMouseInfo, items: NItems, wBToolsInfo: NWBToolsInfo, selectItem = {}, pptConfig: nextPptConfig = {} } = nextProps;
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
    if (this.mouseLayer) {
      const { handleSetPosition } = this.mouseLayer;
      if (JSON.stringify(NMouseInfo) !== JSON.stringify(mouseInfo)) {
        handleSetPosition({
          x: NMouseInfo.x,
          y: NMouseInfo.y,
        });
      }
    }
    if (this.wBToolsLayer) {
      const { handleSetPosition, handleToolsChange } = this.wBToolsLayer;
      if (JSON.stringify(NWBToolsInfo) !== JSON.stringify(wBToolsInfo)) {
        handleSetPosition(NWBToolsInfo.transform, NWBToolsInfo.tool);
        if (NWBToolsInfo.tool !== wBToolsInfo.tool) {
          handleToolsChange(NWBToolsInfo.tool);
        }
      }
    }
    if (this.whiteBoardLayer) {
      const { handleDraw, handleDelete, handleSelectItem } = this.whiteBoardLayer;
      if (!NItems.length && this.PrevItems.length) {
        handleDelete();
        this.PrevItems = [];
        return;
      }
      if (NItems.length) {
        if (JSON.stringify(NItems) !== JSON.stringify(this.PrevItems)) {
	        if (NItems.length < this.PrevItems.length) {
            const deleteList = this.PrevItems.filter((t) => {
              return NItems.findIndex(i => i.__ID__ === t.__ID__) === -1;
            }) || [];
            if (deleteList.length) {
              handleDelete(deleteList, true);
            }
            this.PrevItems = [].concat(NItems);
          } else {
            const { __ID__ } = selectItem;
            const index = this.PrevItems.findIndex(item => item.__ID__ === __ID__);
            if (index === -1) {
            	if (selectItem.__ID__) {
		            handleDraw(selectItem);
		            this.PrevItems.push(selectItem);
	            }
            } else {
              const thatItem = handleSelectItem(selectItem.__ID__);
              this.PrevItems[index] = selectItem;
	            thatItem.attr(selectItem);
	            if (selectItem.__TYPE__ === 'text') {
	              thatItem.attr({ text: selectItem.__TEXT__ });
              }
            }
          }
        }
      }
    }
    if (this.globalPlayer) {
			if (pptConfig.paused !== nextPptConfig.paused) {
				if (nextPptConfig.paused) {
					this.globalPlayer.pause();
				} else {
					this.globalPlayer.play();
				}
			}
    }
  }
  shouldComponentUpdate(nextProps) {
	  const { width, height, className } = this.props;
	  const { width: NWidth, height: NHeight, className: NClassName } = nextProps;
	  if (NWidth !== width || NHeight !== height || NClassName !== className){
		  return true;
	  }
	  return false;
  }
  componentWillUnmount() {
    this.keyboard('unbuild');
    if (this.timeoutInit) {
      clearTimeout(this.timeoutInit);
    }
  }
	/**
	 * 初始化
	 * @returns {*}
	 */
  init = () => {
    try {
      const role = this.role;
      const svg = this.svg = Snap(this.svgWrap);
      const that = this;
	    const { clientWidth, clientHeight } = svg.node;
	    // 初始video
	    const globalPlayer = this.initVideo();
	    // ppt层
      this.PPTLayer = createPPTLayer({ role,
	      attr: {
		      width: clientWidth,
		      height: clientHeight,
	      },
	      target: svg,
      });
			// 白板层
	    this.whiteBoardLayer = createWhiteBoardLayer({
		    role,
		    attr: {
			    width: clientWidth,
			    height: clientHeight,
		    },
		    target: svg,
		    onDrawChange(items) {
			    const { onDrawChange } = that.props;
			    if (typeof onDrawChange === 'function') {
				    onDrawChange(items);
			    }
		    },
		    onClear: (item) => {
			    const { onClear } = that.props;
			    if (typeof onClear === 'function') {
				    onClear(item);
			    }
		    },
	    });
			// 白板工具层
			// this.wBToolsLayer = createWBToolsLayer(role, {
		   //  x: 0,
		   //  y: 0,
			// }, svg, {});
	    // 鼠标层
	    this.mouseLayer = createMouseLayer({
		    role,
		    attr: {
			    class: `mouse-${role}`,
		    },
		    target: svg,
	    });
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
	renderVideo = () => {
		return (
			<div className={"video-js svgVideo-component-wrap global-video-wrap"}>
				<video
					ref={e => this.videoDom = e}
					id="globalVideo-Viewer"
					className="video-js svgVideo-component global-video"
					controls
					preload="auto"
					poster="//vjs.zencdn.net/v/oceans.png"
					data-setup='{}'>
					<source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
					<source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm" />
					<source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg" />
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
		if (this.videoDom) {
			// console.log(this.videoDom, 1111);
			const options = {};
			const globalPlayer = this.globalPlayer = videojs(this.videoDom, options, function onPlayerReady() {
				videojs.log('Your player is ready!');

				// In this context, `this` is the player that was created by Video.js.
				this.play();

				// How about an event listener?
				this.on('ended', function() {
					videojs.log('Awww...over so soon?!');
				});
			});
			return globalPlayer;
		}
	};
  render() {
    const { className, width = 500, height = 500 } = this.props;
    const styles = {
      userSelect: 'none',
      position: 'relative',
    };
    return (
	    <div className={classNames('SvgEditWrap')} style={{ width, height }}>
	      <svg
	        style={styles}
	        width={width}
	        height={height}
	        className={classNames(
						'SvgEdit',
						'Viewer',
						className,
					)}
	        ref={e => this.svgWrap = e}
	      />
		    { this.renderVideo() }
	    </div>
    );
  }
}

Viewer.propTypes = {
	className: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
	items: PropTypes.array,
	selectItem: PropTypes.object,
	mouseInfo: PropTypes.object,
	wBToolsInfo: PropTypes.object,
	pptConfig: PropTypes.object,
};

export default Viewer;
