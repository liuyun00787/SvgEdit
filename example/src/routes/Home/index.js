import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import { Button } from 'antd';
import './antd.min.css';
import { Broadcaster, Viewer } from '../../../../src';

class _TEST__ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
    };
  }

  componentDidMount() {
    const { dispatch, location, socket } = this.props;
    if (this.wrap) {
      setTimeout(() => {
        this.setState({
          width: this.wrap.offsetWidth/2,
          height: this.wrap.offsetHeight,
        });
        this.page = true;
        this.Broadcaster.PPTLayer.handleCreatePage({
          attr: {
            href: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3145122583,3697178348&fm=173&s=3189BD554C5246C80489FC6E0300807A&w=218&h=146&img.JPEG',
            width: this.wrap.offsetWidth/2, height: this.wrap.offsetHeight,
          },
        });
        this.Viewer.PPTLayer.handleCreatePage({
          attr: {
            href: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3145122583,3697178348&fm=173&s=3189BD554C5246C80489FC6E0300807A&w=218&h=146&img.JPEG',
            width: this.wrap.offsetWidth/2, height: this.wrap.offsetHeight,
          },
        });
      }, 500);

    }
    window.addEventListener('resize', () => {
      if (this.wrap) {
        this.setState({
          width: this.wrap.offsetWidth/2,
          height: this.wrap.offsetHeight,
        });
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
            href: '/images/videoBG.png',
            width, height,
          },
        });
        this.Viewer.PPTLayer.handleCreatePage({
          type: 'video',
          attr: {
            href: '/images/videoBG.png',
            width, height,
          },
        });

        this.page = false;
      } else {
        this.Broadcaster.PPTLayer.handleCreatePage({
          attr: {
            href: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3145122583,3697178348&fm=173&s=3189BD554C5246C80489FC6E0300807A&w=218&h=146&img.JPEG',
            width, height,
          },
        });
        this.Viewer.PPTLayer.handleCreatePage({
          attr: {
            href: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3145122583,3697178348&fm=173&s=3189BD554C5246C80489FC6E0300807A&w=218&h=146&img.JPEG',
            width, height,
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
            href: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3145122583,3697178348&fm=173&s=3189BD554C5246C80489FC6E0300807A&w=218&h=146&img.JPEG',
            width, height,
          },
        });
        this.Viewer.PPTLayer.handleCreatePage({
          attr: {
            href: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3145122583,3697178348&fm=173&s=3189BD554C5246C80489FC6E0300807A&w=218&h=146&img.JPEG',
            width, height,
          },
        });

        this.page = true;
      } else {
        this.Broadcaster.PPTLayer.handleCreatePage({
          type: 'video',
          attr: {
            href: '/images/videoBG.png',
            width, height,
          },
        });
        this.Viewer.PPTLayer.handleCreatePage({
          type: 'video',
          attr: {
            href: '/images/videoBG.png',
            width, height,
          },
        });
        this.page = false;
      }
    }
  };
  renderB = (className) => {
    const { dispatch, socket } = this.props;
    const { drawItems, selectItem, mouseInfo, wBToolsInfo, pptConfig } = socket;
    return (
      <Broadcaster
        className={className}
        items={drawItems || []}
        width={this.state.width}
        height={this.state.height}
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
    );
  };
  renderV = () => {
    const { socket } = this.props;
    const { drawItems, selectItem, mouseInfo, wBToolsInfo, pptConfig } = socket;
    return (
      <Viewer
        ref={e => this.Viewer = e}
        items={drawItems || []}
        width={this.state.width}
        height={this.state.height}
        selectItem={selectItem}
        mouseInfo={mouseInfo}
        wBToolsInfo={wBToolsInfo}
        pptConfig={pptConfig}
      />
    );
  };
  render() {
    const { socket } = this.props;
    return (
      <div ref={wrap => this.wrap = wrap} className={styles.__TEST__}>
        <div style={{ position: 'relative', width: this.state.width, height: '100%', background: '#eee', float: 'left' }} className="">
          <h1 className={styles.title}>Broadcaster</h1>
          <div className="">
            {this.renderB('Broadcaster-1')}
          </div>
          <div className={styles.pptBtnPrev}><Button onClick={this.handlePrev} type="primary">上一页</Button></div>
          <div className={styles.pptBtnNext}><Button onClick={this.handleNext} type="primary">下一页</Button></div>
        </div>
        <div style={{ width: this.state.width, height: '100%', float: 'left' }} className="">
          <h1 className={styles.title}>Viewer</h1>
          <div className="">
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
