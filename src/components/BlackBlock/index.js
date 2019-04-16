import React, { PureComponent } from 'react';
import styles from './index.less';
import { Layout } from 'antd';

export default class BlackBlock extends PureComponent {
  render() {
    return (
      <Layout className={styles.blackBlock}>
        1
        {this.props.children}
      </Layout>
    );
  }
}
