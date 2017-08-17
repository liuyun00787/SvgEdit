import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

import SvgEdit from '../../../lib/index.js';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <SvgEdit
        className={styles.demo}
        role="Broadcaster"
        width={500}
        height={500}
      />
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
