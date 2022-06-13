import styles from "@views/sandbox/index.module.scss";
import React from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Dropdown, Menu, Avatar } from "antd";

export default function TopHeader(props) {
  const { collapsed, setCollapsed } = props;
  const { Header } = Layout;

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: "超级管理员",
        },

        {
          key: "2",
          danger: true,
          label: "退出",
        },
      ]}
    />
  );

  return (
    <Header
      className={styles.TopHeader}
      style={{
        padding: 0,
        background: " #fff",
      }}
    >
      <div className={styles.TopLeft}>
        {collapsed ? (
          <MenuUnfoldOutlined
            className={styles.trigger}
            onClick={() => setCollapsed(!collapsed)}
          />
        ) : (
          <MenuFoldOutlined
            className={styles.trigger}
            onClick={() => setCollapsed(!collapsed)}
          />
        )}
        Home Page
      </div>
      <div className={styles.TopRight}>
        <span>欢迎Admin回来</span>&nbsp;
        <Dropdown overlay={menu}>
          <Avatar size={32} icon={<UserOutlined />} className={styles.Avatar} />
        </Dropdown>
      </div>
    </Header>
  );
}
