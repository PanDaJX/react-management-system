import React from "react";
import styles from "./index.module.scss";
import SideMenu from "../../components/sandbox/SideMenu";
import TopHeader from "../../components/sandbox/TopHeader";
import { Outlet } from "react-router-dom";
export default function index() {
  return (
    <div className={styles.SandBox}>
      <TopHeader />
      <SideMenu />
      <Outlet />
    </div>
  );
}
