/*
 * @author: 林俊贤
 * @Date: 2022-06-17 15:26:02
 * @LastEditors: 林俊贤
 * @LastEditTime: 2022-06-21 10:28:05
 * @Description:
 */
import styles from "@views/sandbox/index.module.scss";

import React, { useEffect, useState } from "react";

import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
export default function SideMenu(props) {
  const { collapsed } = props;
  const { Sider } = Layout;
  const navigate = useNavigate();
  const location = useLocation();
  const selectKeys = [location.pathname];
  const openKeys = ["/" + location.pathname.split("/")[1]];
  const [menuList, setMenuList] = useState([]);

  function getItem(key, label, children, icon, type) {
    return {
      key,
      children: children?.length
        ? children
            .filter((child) => child.pagepermisson === 1)
            .map((child) => {
              return { key: child.key, label: child.title };
            })
        : null,
      label,
      icon,
      type,
    };
  }
  useEffect(() => {
    axios.get("http://localhost:1111/menus?_embed=menuChildren").then((res) => {
      const { data } = res;
      let list = [];
      data.forEach((item) => {
        const { key, menuChildren, title, icon } = item;
        list.push(getItem(key, title, menuChildren, icon));
      });
      setMenuList(list);
    });
  }, []);

  const handleClick = ({ item, key, keyPath, domEvent }) => {
    navigate(key);
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className={styles.SideMenuWrap}>
        <div
          className="logo"
          style={{ textAlign: "center", color: "#fff", fontSize: "24px" }}
        >
          xx发布管理系统
        </div>
        <div className={styles.MenuList}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={selectKeys}
            defaultOpenKeys={openKeys}
            // selectedKeys={selectKeys}
            // openKeys={openKeys}
            items={menuList}
            onClick={handleClick}
          />
        </div>
      </div>
    </Sider>
  );
}
