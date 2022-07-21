/*
 * @author: 林俊贤
 * @Date: 2022-06-17 15:26:02
 * @LastEditors: 林俊贤
 * @LastEditTime: 2022-07-20 16:27:30
 * @Description:
 */
import styles from "@views/sandbox/index.module.scss";
import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Dropdown, Menu, Avatar } from "antd";
import { useNavigate } from "react-router-dom";

export default function TopHeader(props) {
  const { collapsed, setCollapsed } = props;
  const { Header } = Layout;

  const {
    username,
    role: { roleName },
  } = JSON.parse(localStorage.getItem("token"));

  const navigate = useNavigate();
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: roleName,
        },

        {
          key: "2",
          danger: true,
          label: "退出",
          onClick: () => {
            localStorage.removeItem("token");
            navigate("/login");
          },
        },
      ]}
    />
  );

  return (
    <Header
      className={styles.TopHeader}
      style={{
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
        <span>
          欢迎 <i style={{ color: "#1890ff" }}>{username}</i> 回来
        </span>
        &nbsp;
        <Dropdown overlay={menu}>
          <Avatar size={32} icon={<UserOutlined />} className={styles.Avatar} />
        </Dropdown>
      </div>
    </Header>
  );
}
