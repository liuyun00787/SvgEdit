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
    if (this.wrap) {
      setTimeout(() => {
        const width = this.wrap.offsetWidth/2;
        const height = this.wrap.offsetHeight;
        this.setState({
          width,
          height,
        });
        this.page = true;
        this.Broadcaster.PPTLayer.handleCreatePage({
          attr: {
            href: 'https://ppt-cdn.class100.com/ppts/766/G5L8_1.png',
            width: 960, height: 540,
          },
        });
        this.Viewer.PPTLayer.handleCreatePage({
          attr: {
            href: 'https://ppt-cdn.class100.com/ppts/766/G5L8_1.png',
            width: 960, height: 540,
          },
        });
        this.handleScale({ width, height });
      }, 500);

    }
    window.addEventListener('resize', () => {
      if (this.wrap) {
        const width = this.wrap.offsetWidth/2;
        const height = this.wrap.offsetHeight;
        this.setState({
          width,
          height,
        });
        this.handleScale({ width, height });
      }
    });
  }
  handlePrev = () => {
    const { width, height } = this.state;
    if (this.Broadcaster) {
      console.log(this.Broadcaster );
      this.Broadcaster.whiteBoardLayer.handleDelete();
      if (this.page) {
        this.Broadcaster.PPTLayer.handleCreatePage({
          type: 'video',
          attr: {
            href: './images/videoBG.png',
            width: 960, height: 540,
          },
        });
        this.Viewer.PPTLayer.handleCreatePage({
          type: 'video',
          attr: {
            href: './images/videoBG.png',
            width: 960, height: 540,
          },
        });

        this.page = false;
      } else {
        this.Broadcaster.PPTLayer.handleCreatePage({
          attr: {
            href: 'https://ppt-cdn.class100.com/ppts/766/G5L8_1.png',
            width: 960, height: 540,
          },
        });
        this.Viewer.PPTLayer.handleCreatePage({
          attr: {
            href: 'https://ppt-cdn.class100.com/ppts/766/G5L8_1.png',
            width: 960, height: 540,
          },
        });
        this.page = true;
      }
    }
  };
  handleNext = () => {
    const { width, height } = this.state;
    if (this.Broadcaster) {
      console.log(this.Broadcaster);
      this.Broadcaster.whiteBoardLayer.handleDelete();
      if (!this.page) {
        this.Broadcaster.PPTLayer.handleCreatePage({
          attr: {
            href: 'https://ppt-cdn.class100.com/ppts/766/G5L8_1.png',
            width: 960, height: 540,
          },
        });
        this.Viewer.PPTLayer.handleCreatePage({
          attr: {
            href: 'https://ppt-cdn.class100.com/ppts/766/G5L8_1.png',
            width: 960, height: 540,
          },
        });

        this.page = true;
      } else {
        this.Broadcaster.PPTLayer.handleCreatePage({
          type: 'video',
          attr: {
            href: './images/videoBG.png',
            width: 960, height: 540,
          },
        });
        this.Viewer.PPTLayer.handleCreatePage({
          type: 'video',
          attr: {
            href: './images/videoBG.png',
            width: 960, height: 540,
          },
        });
        this.page = false;
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
    const { dispatch, socket } = this.props;
    const { drawItems, selectItem, mouseInfo, wBToolsInfo, pptConfig } = socket;
    const { scale, width, height } = this.state;
    const t = Rematrix.translate(960/2, 540/2);
    const s = Rematrix.scale(scale.x, scale.y);
    // console.log(t);
    const product = [t,s].reduce(Rematrix.multiply)
    const style = {
      width: 960,
      height: 540,
      // transform: `matrix3d(${product.join(',')})`,
      transform: `scale(${scale.x}, ${scale.y})`,
      transformOrigin: 'left top',
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
            onPlayChange(paused) {
              dispatch({ type: 'socket/playChagne', paused });
            }
          }}
        />
      </div>
    );
  };
  renderV = () => {
    const { socket } = this.props;
    const { drawItems, selectItem, mouseInfo, wBToolsInfo, pptConfig } = socket;
    const { scale, width, height } = this.state;
    const t = Rematrix.translate(width/2, height/2);
    const s = Rematrix.scale(scale.x, scale.y);
    // console.log(t);
    const product = [s].reduce(Rematrix.multiply)
    const style = {
      width: 960,
      height: 540,
      // transform: `matrix3d(${product.join(',')})`,
      transform: `scale(${scale.x}, ${scale.y})`,
      transformOrigin: 'left top',
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
