import React from 'react';
import { connect } from 'dva';
import styles from './__TEST__.less';
import { Broadcaster, Viewer } from 'svgreact';

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
          width: this.wrap.offsetWidth,
          height: this.wrap.offsetHeight,
        });
      }, 500);
    }
    window.addEventListener('resize', () => {
      if (this.wrap) {
        this.setState({
          width: this.wrap.offsetWidth,
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
        onWbToolsChange={(wBToolsInfo) => {
          dispatch({ type: 'socket/wbToolsChange', wBToolsInfo });
        }}
        onMouseChange={(mouseInfo) => {
          dispatch({ type: 'socket/mouseMove', mouseInfo });
        }}
        onDrawChange={(item) => {
          dispatch({ type: 'socket/drawChange', item });
        }}
        onDeleteChange={(item) => {
          dispatch({ type: 'socket/deleteChange', item });
        }}
      />
    );
  };
  renderV = () => {
    const { socket } = this.props;
    const { drawItems, selectItem, mouseInfo, wBToolsInfo } = socket;
    console.log(drawItems);
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
    const { socket, location } = this.props;
    const { fetching } = socket;
    const { role } = location.query;
    return (
      <div ref={wrap => this.wrap = wrap} className={styles.__TEST__}>
        {
          role === 'Broadcaster' ? (
            <div style={{ width: this.state.width, background: '#eee' }} className="">
              <h1 className={styles.title}>Broadcaster</h1>
              <div className="">
                {fetching ? null : (
                  this.renderB()
                )}
              </div>
            </div>
          ) : null
        }
        {
          role === 'Viewer' ? (
            <div style={{ width: this.state.width, float: 'right' }} className="">
              <h1 className={styles.title}>Viewer</h1>
              <div className="">
                {fetching ? null : (
                  this.renderV()
                )}
              </div>
            </div>
          ) : null
        }
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(_TEST__);
