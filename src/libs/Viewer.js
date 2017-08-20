import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import classNames from 'classnames';
import Snap from 'imports?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';
import { createPPTLayer, createWhiteBoardLayer, createMouseLayer, createWBToolsLayer } from './layer';

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
	  const { width, height, mouseInfo, items, wBToolsInfo } = this.props;
	  const { width: NWidth, height: NHeight, mouseInfo: NMouseInfo, items: NItems, wBToolsInfo: NWBToolsInfo, selectItem = {} } = nextProps;
	  if (NWidth !== width || NHeight !== height) {
		  if (this.whiteBoardLayer) {
			  this.whiteBoardLayer.handleSetWH({
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
              handleDraw(selectItem);
              this.PrevItems.push(selectItem);
            } else {
              const thatItem = handleSelectItem(selectItem.__ID__);
              thatItem.attr(selectItem);
              this.PrevItems[index] = selectItem;
              if (selectItem.__TYPE__ === 'text') {
                const textPathAttr = JSON.parse(selectItem.textPathAttr);
                thatItem.attr(selectItem)
										.select('.text')
										.attr({ textPathAttr })
										.attr({ text: textPathAttr.__text__ });
              }
            }
          }
        }
      }
    }
  }
  shouldComponentUpdate(nextProps) {
	  const { width, height, className } = this.props;
	  const { width: NWidth, height: NHeight, className: NClassName } = nextProps;
	  if (NWidth !== width || NHeight !== height || NClassName !== className) return true;
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
	    this.wBToolsLayer = createWBToolsLayer(role, {
		    x: 0,
		    y: 0,
	    }, svg, {});
	    // 鼠标层
	    this.mouseLayer = createMouseLayer(role, {
		    class: `mouse-${role}`,
	    }, svg);
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
        x: mouseInfo.x || 0,
        y: mouseInfo.y || 0,
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
  render() {
    const { className, width = 500, height = 500 } = this.props;
    const styles = {
      userSelect: 'none',
      position: 'relative',
    };
    return (
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
};

export default Viewer;
