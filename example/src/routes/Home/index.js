import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import { Button } from 'antd';
import './antd.min.css';
import { Broadcaster, Viewer } from '../../../../src';
import * as Rematrix from 'rematrix';

class _TEST__ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      scale: {
        x: 1,
        y: 1,
      }
    };
  }

  componentDidMount() {
    const { dispatch, location, socket } = this.props;
    console.dir(this.Broadcaster)
    if (this.wrap) {
      setTimeout(() => {
        const width = this.wrap.offsetWidth/2;
        const height = this.wrap.offsetHeight - 36;
        this.setState({
          width,
          height,
        });
        this.page = true;
        this.handleScale({ width, height });
      }, 500);

    }
    window.addEventListener('resize', () => {
      if (this.wrap) {
        const width = this.wrap.offsetWidth/2;
        const height = this.wrap.offsetHeight - 36;
        this.setState({
          width,
          height,
        });
        this.handleScale({ width, height });
      }
    });
  }
  handlePrev = () => {
    const { dispatch } = this.props;
    let __PAGE__ = 1;
    if (this.Broadcaster) {
      const { PPTLayer, whiteBoardLayer } = this.Broadcaster;
      if (PPTLayer) {
        const { page } = PPTLayer.getState();
        __PAGE__ = page - 1 >= 1 ? page - 1 : 1;
        PPTLayer.goTo(__PAGE__)
      }
      if (whiteBoardLayer) {
        whiteBoardLayer.handleDelete();
      }
    }
    if (this.Viewer) {
      dispatch({ type: 'socket/goTo', current: __PAGE__ });
      const { PPTLayer, whiteBoardLayer } = this.Viewer;
      // if (PPTLayer) {
      //   PPTLayer.goTo(__PAGE__)
      // }
      if (whiteBoardLayer) {
        whiteBoardLayer.handleDelete();
      }
    }
  };
  handleNext = () => {
    const { dispatch } = this.props;
    let __PAGE__ = 1;
    if (this.Broadcaster) {
      const { PPTLayer, whiteBoardLayer } = this.Broadcaster;
      if (PPTLayer) {
        const { page, ppt } = PPTLayer.getState();
        __PAGE__ = page + 1 <= ppt.length ? page + 1 : page;
        PPTLayer.goTo(__PAGE__)
      }
      if (whiteBoardLayer) {
        whiteBoardLayer.handleDelete();
      }
    }
    if (this.Viewer) {
      dispatch({ type: 'socket/goTo', current: __PAGE__ });
      const { PPTLayer, whiteBoardLayer } = this.Viewer;
      // if (PPTLayer) {
      //   PPTLayer.goTo(__PAGE__)
      // }
      if (whiteBoardLayer) {
        whiteBoardLayer.handleDelete();
      }
    }
  };
  handleScale = ({ width = 1, height = 1 }) => {
    const dd = 16/9;
    const df = width/height;
    const scale = {};
    if (dd >= df) {
      scale.y = scale.x = (width)/960
    } else {
      scale.y = scale.x = (height)/540
    }
    this.setState({
      scale,
    })
  };
  renderB = (className) => {
    const { dispatch, socket, init } = this.props;
    const { drawItems, selectItem, mouseInfo, wBToolsInfo, pptConfig } = socket;
    const { scale, width, height } = this.state;
    const t = Rematrix.translate(width/2 - (960 * scale.x)/2, height/2 - (540 * scale.y)/2);
    const s = Rematrix.scale(scale.x, scale.y);
    const product = [t,s].reduce(Rematrix.multiply)
    const style = {
      width: 960,
      height: 540,
      transform: `matrix3d(${product.join(',')})`,
      // transform: `scale(${scale.x}, ${scale.y})`,
      transformOrigin: 'top left',
    };
    return (
      <div
        className={styles.box}
        style={style}
      >
        <Broadcaster
          className={className}
          items={drawItems || []}
          width={960}
          height={540}
          selectItem={selectItem}
          mouseInfo={mouseInfo}
          wBToolsInfo={wBToolsInfo}
          ref={e => this.Broadcaster = e}
          onWbToolsChange={(wBToolsInfo) => {
            dispatch({ type: 'socket/wbToolsChange', wBToolsInfo });
          }}
          onMouseChange={(mouse) => {
            dispatch({ type: 'socket/mouseMove', mouseInfo: mouse });
          }}
          onDrawChange={(item) => {
            dispatch({ type: 'socket/drawChange', item });
          }}
          onDeleteChange={(item) => {
            dispatch({ type: 'socket/deleteChange', item });
          }}
          pptConfig={{
            ...pptConfig,
            onPlayChange(paused) {
              dispatch({ type: 'socket/playChagne', paused });
            }
          }}
        />
      </div>
    );
  };
  renderV = () => {
    const { socket, init } = this.props;
    const { drawItems, selectItem, mouseInfo, wBToolsInfo, pptConfig } = socket;
    const { scale, width, height } = this.state;
    const t = Rematrix.translate(width/2 - (960 * scale.x)/2, height/2 - (540 * scale.y)/2);
    const s = Rematrix.scale(scale.x, scale.y);
    const product = [t,s].reduce(Rematrix.multiply)
    const style = {
      width: 960,
      height: 540,
      transform: `matrix3d(${product.join(',')})`,
      // transform: `scale(${scale.x}, ${scale.y})`,
      transformOrigin: 'top left',
    };
    return (
      <div
        className={styles.box}
        style={style}
      >
        <Viewer
          ref={e => this.Viewer = e}
          items={drawItems || []}
          width={960}
          height={540}
          selectItem={selectItem}
          mouseInfo={mouseInfo}
          wBToolsInfo={wBToolsInfo}
          pptConfig={pptConfig}
        />
      </div>
    );
  };
  render() {
    const { socket } = this.props;
    return (
      <div ref={wrap => this.wrap = wrap} className={styles.__TEST__}>
        <div style={{ position: 'relative', width: this.state.width, height: '100%', background: '#eee', float: 'left' }} className="">
          <h1 className={styles.title}>Broadcaster</h1>
          <div style={{ overflow: 'hidden' }} className={styles.pptWrapMMM}>
            {this.renderB('Broadcaster-1')}
          </div>
          <div className={styles.pptBtnPrev}><Button onClick={this.handlePrev} type="primary">上一页</Button></div>
          <div className={styles.pptBtnNext}><Button onClick={this.handleNext} type="primary">下一页</Button></div>
        </div>
        <div style={{ position: 'relative', width: this.state.width, height: '100%', float: 'left' }} className="">
          <h1 className={styles.title}>Viewer</h1>
          <div style={{ overflow: 'hidden' }} className={styles.pptWrapMMM}>
            {this.renderV()}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(_TEST__);
