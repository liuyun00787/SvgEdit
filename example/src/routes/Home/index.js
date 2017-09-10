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
          <div className={styles.pptBtnPrev}><Button type="primary">上一页</Button></div>
          <div className={styles.pptBtnNext}><Button type="primary">下一页</Button></div>
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
