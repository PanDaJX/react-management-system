/*
 * @author: 林俊贤
 * @Date: 2022-06-17 15:26:02
 * @LastEditors: 林俊贤
 * @LastEditTime: 2022-07-21 15:03:42
 * @Description:
 */
import React, { useMemo, useEffect, useState } from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";

import Login from "@views/login";
import SandBox from "@views/sandbox";
import NoPermission from "@views/sandbox/components/no-permission/NoPermission";

import Home from "@views/sandbox/components/home";

import RightList from "@views/sandbox/components/right-manage/RightList";
import RoleList from "@views/sandbox/components/right-manage/RoleList";

import UserManageList from "@views/sandbox/components/user-manage/UserList";

import NewsAdd from "@views/sandbox/components/news-manage/NewsAdd";
import NewsDraft from "@views/sandbox/components/news-manage/NewsDraft";
import NewsCategory from "@views/sandbox/components/news-manage/NewsCategory";

import Audit from "@views/sandbox/components/audit-manage/Audit";
import AuditList from "@views/sandbox/components/audit-manage/AuditList";

import Unpublished from "@views/sandbox/components/publish-manage/Unpublished";
import Published from "@views/sandbox/components/publish-manage/Published";
import Sunset from "@views/sandbox/components/publish-manage/Sunset";

function AuthCheck() {
  return localStorage.getItem("token") ? (
    <SandBox />
  ) : (
    <Navigate replace to="/Login" />
  );
}

export default function IndexRouter() {
  const RouterMap = useMemo(() => {
    return {
      "/home": <Home />,

      "/user-manage/list": <UserManageList />,

      "/auth-manage/role/list": <RoleList />,
      "/auth-manage/auth/list": <RightList />,

      "/news-manage/add": <NewsAdd />,
      "/news-manage/draft": <NewsDraft />,
      "/news-manage/category": <NewsCategory />,

      "/audit-manage/audit": <Audit />,
      "/audit-manage/list": <AuditList />,

      "/publish-manage/unpublished": <Unpublished />,
      "/publish-manage/published": <Published />,
      "/publish-manage/sunset": <Sunset />,
    };
  }, []);
  const [originRouter, setOriginRouter] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const [{ data: menus }, { data: menuChildren }] = await Promise.all([
        axios.get("http://localhost:1113/menus"),
        axios.get("http://localhost:1113/menuChildren"),
      ]);
      setOriginRouter([...menus, ...menuChildren]);
    };
    fetchData();
  }, []);

  const localRouter = useMemo(
    () => originRouter.filter((item) => !!RouterMap[item.key]),
    [originRouter, RouterMap]
  );

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AuthCheck />}>
          <Route index element={<Home />} />
          {localRouter.map((route) => (
            <Route
              path={route.key}
              key={route.key}
              element={RouterMap[route.key]}
            />
          ))}
    
          <Route path="*" element={<NoPermission />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
