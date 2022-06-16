import React from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "@views/login";
import SandBox from "@views/sandbox";
import Home from "@views/sandbox/components/Home";
import RightList from "@views/sandbox/components/RightManage/RightList";
import RoleList from "@views/sandbox/components/RightManage/RoleList";
import UserManageList from "@views/sandbox/components/UserManage/UserList";
import NoPermission from "@views/sandbox/components/NoPermission/NoPermission";

function AuthCheck() {
  return localStorage.getItem("token") ? (
    <SandBox />
  ) : (
    <Navigate replace to="/Login" />
  );
}

export default function IndexRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AuthCheck />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="user-manage/list" element={<UserManageList />}></Route>
          <Route path="auth-manage/role/list" element={<RoleList />}></Route>
          <Route path="auth-manage/auth/list" element={<RightList />}></Route>
          <Route path="*" element={<NoPermission />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
