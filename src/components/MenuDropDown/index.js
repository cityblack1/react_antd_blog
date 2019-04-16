import React, { PureComponent } from 'react';
import { Dropdown, Modal, Button, Menu } from 'antd';
import SideBar from '../SideBar/SideBar';
import styles from './menuDropDown.less';
const onClick = (key) => {
  console.log(key)
};

export default class MenuDropDown extends PureComponent {
  state = { visible: false };
  menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">
        侧边栏
      </Menu.Item>
      <Menu.Item key="2">
        关于我
      </Menu.Item>
      <Menu.Item key="3">
        晕猫
      </Menu.Item>
      <Menu.Item key="4">
        我的作品
      </Menu.Item>
    </Menu>
  );
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const { hidden } = this.props;
    return (
        <div className={styles.dropDown} hidden={!!hidden}>
          <Dropdown placement="topLeft" overlay={this.menu}>
            <Button type="primary" shape="circle" icon="bars" size="large"/>
          </Dropdown>
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
    );
  }
}
