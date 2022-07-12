/*
 * @author: 林俊贤
 * @Date: 2022-06-17 15:26:02
 * @LastEditors: 林俊贤
 * @LastEditTime: 2022-06-22 21:29:59
 * @Description:
 */
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:1113/routes")
      .then((res) => res.json())
      .then((res) => {
        console.log("fetch", res);
        localStorage.setItem("token", new Date().valueOf());
        localStorage.setItem("route", JSON.stringify(res));
        navigate({ path: "/home" });
      });
  }, []);
  return <div>login</div>;
}
