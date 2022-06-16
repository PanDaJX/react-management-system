import React from "react";

import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

export default function SideMenu(props) {
  const { collapsed } = props;
  const { Sider } = Layout;
  const navigate = useNavigate();
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("首页", "/home"),
    getItem("用户管理", "/user-manage", null, [
      getItem("用户列表", "/user-manage/list"),
    ]),
    getItem("权限管理", "/auth-manage", null, [
      getItem("角色列表", "/auth-manage/role/list"),
      getItem("权限列表", "/auth-manage/auth/list"),
    ]),
    // getItem("新闻管理", "/home", [
    //   getItem("角色列表", "g1"),
    //   getItem("权限列表", "g1"),
    // ]),
    // getItem("审核管理", "/home", [
    //   getItem("角色列表", "g1"),
    //   getItem("权限列表", "g1"),
    // ]),
    // getItem("发布管理", "/home", [
    //   getItem("角色列表", "g1"),
    //   getItem("权限列表", "g1"),
    // ]),
  ];
  const handleClick = ({ item, key, keyPath, domEvent }) => {
    navigate(key);
  };
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div
        className="logo"
        style={{ textAlign: "center", color: "#fff", fontSize: "24px" }}
      >
        新闻发布管理系统
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
        onClick={handleClick}
      />
    </Sider>
  );
}
