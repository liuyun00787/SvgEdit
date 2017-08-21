import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import { Broadcaster, Viewer } from '../../../../lib/index';

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
  renderB = () => {
    const { dispatch, socket } = this.props;
    const { drawItems, selectItem, mouseInfo, wBToolsInfo } = socket;
    return (
      <Broadcaster
        items={drawItems || []}
        width={this.state.width}
        height={this.state.height}
        selectItem={selectItem}
        mouseInfo={mouseInfo}
        wBToolsInfo={wBToolsInfo}
        onWbToolsClick={(tool, mouseInfo) => {
          dispatch({ type: 'socket/wbToolsChange', mouseInfo });
        }}
        onWbToolsDrag={(mouseInfo) => {
          dispatch({ type: 'socket/wbToolsChange', mouseInfo });
        }}
        onMouseChange={(mouse) => {
          dispatch({ type: 'socket/mouseMove', mouseInfo: mouse });
        }}
        onDrawChange={(item) => {
          dispatch({ type: 'socket/drawChange', drawItem: item });
        }}
        onDelete={(item) => {
          dispatch({ type: 'socket/deleteChange', item });
        }}
      />
    );
  };
  renderV = () => {
    const { socket } = this.props;
    const { drawItems, selectItem, mouseInfo, wBToolsInfo } = socket;
    return (
      <Viewer
        items={drawItems || []}
        width={this.state.width}
        height={this.state.height}
        selectItem={selectItem}
        mouseInfo={mouseInfo}
        wBToolsInfo={wBToolsInfo}
      />
    );
  };
  render() {
    const { socket } = this.props;
    return (
      <div ref={wrap => this.wrap = wrap} className={styles.__TEST__}>
        <div style={{ width: this.state.width, height: '100%', background: '#eee', float: 'left' }} className="">
          <h1 className={styles.title}>Broadcaster</h1>
          <div className="">
            {this.renderB()}
          </div>
        </div>
        <div style={{ width: this.state.width, height: '100%', float: 'right' }} className="">
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
