import styles from "./index.module.scss";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../../components/sandbox/SideMenu";
import TopHeader from "../../components/sandbox/TopHeader";
import { Layout } from "antd";
const { Content } = Layout;

export default function Index() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={styles.SandBox}>
      <SideMenu collapsed={collapsed} />
      <Layout className={styles.SiteLayout}>
        <TopHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          className={styles.SiteLayoutBackground}
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
