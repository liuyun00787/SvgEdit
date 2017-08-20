import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

import SvgEdit from '../../../lib/index.js';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 500,
      height: 500,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        width: 600,
        height: 600,
      });
    }, 2000);
  }
  render () {
    return (
      <div className={styles.normal}>
        <SvgEdit
          className={styles.demo}
          role="Broadcaster"
          width={this.state.width}
          height={this.state.height}
        />
      </div>
    );
  }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
