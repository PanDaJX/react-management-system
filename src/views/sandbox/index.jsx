/*
 * @author: 林俊贤
 * @Date: 2022-06-17 15:26:02
 * @LastEditors: 林俊贤
 * @LastEditTime: 2022-07-25 15:56:59
 * @Description:
 */
import styles from "./index.module.scss";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideMenu from "../../components/sandbox/SideMenu";
import TopHeader from "../../components/sandbox/TopHeader";
import { Layout } from "antd";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const { Content } = Layout;

export default function Index() {
  const [collapsed, setCollapsed] = useState(false);

  const { pathname } = useLocation();
  useLayoutEffect(() => {
    NProgress.start();
  }, [pathname]);
  useEffect(() => {
    NProgress.done();
  }, [pathname]);

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
