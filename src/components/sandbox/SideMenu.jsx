/*
 * @author: 林俊贤
 * @Date: 2022-06-17 15:26:02
 * @LastEditors: 林俊贤
 * @LastEditTime: 2022-06-20 17:59:39
 * @Description:
 */
import React from "react";

import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Icon, { BarsOutlined } from "@ant-design/icons";
export default function SideMenu(props) {
  const { collapsed } = props;
  const { Sider } = Layout;
  const navigate = useNavigate();
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
      // icon: icon ? <Icon component={icon} /> : null,
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
      <div
        className="logo"
        style={{ textAlign: "center", color: "#fff", fontSize: "24px" }}
      >
        xx发布管理系统
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={menuList}
        onClick={handleClick}
      />
    </Sider>
  );
}
