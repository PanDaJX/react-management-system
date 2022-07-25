/*
 * @author: 林俊贤
 * @Date: 2022-06-17 15:26:02
 * @LastEditors: 林俊贤
 * @LastEditTime: 2022-07-25 14:22:35
 * @Description:
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Index() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    fetch(
      `/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`
    )
      .then((res) => res.json())
      .then((res) => {
        if (!res.length) throw new Error("用户不存在");
        localStorage.setItem("token", JSON.stringify(res[0]));
        localStorage.setItem("route", JSON.stringify(res[0].role.rights));
        navigate("/home");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesLoaded = (container) => {};

  return (
    <section className={styles.LoginWrap}>
      <Particles
        style={{
          width: "100vw",
          height: "100vh",
        }}
        id="particles"
        init={particlesInit}
        loaded={particlesLoaded}
        height={"100vh"}
        options={{
          background: {
            color: {
              value: "#000000",
            },
            position: "50% 50%",
            repeat: "no-repeat",
            size: "cover",
          },
          fullScreen: {
            zIndex: 1,
          },
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onDiv: {
                selectors: "#repulse-div",
                mode: "repulse",
              },
              onHover: {
                enable: true,
                mode: "connect",
                parallax: {
                  force: 60,
                },
              },
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
                divs: {
                  distance: 200,
                  duration: 0.4,
                  mix: false,
                  selectors: [],
                },
              },
              grab: {
                distance: 400,
              },
              repulse: {
                divs: {
                  distance: 200,
                  duration: 0.4,
                  factor: 100,
                  speed: 1,
                  maxSpeed: 50,
                  easing: "ease-out-quad",
                  selectors: [],
                },
              },
            },
          },
          particles: {
            color: {
              value: "random",
            },
            links: {
              color: {
                value: "#ffffff",
              },
              distance: 150,
              opacity: 0.4,
            },
            move: {
              attract: {
                rotate: {
                  x: 600,
                  y: 1200,
                },
              },
              enable: true,
              outModes: {
                bottom: "out",
                left: "out",
                right: "out",
                top: "out",
              },
              speed: 6,
            },
            number: {
              density: {
                enable: true,
              },
              limit: 500,
              value: 300,
            },
            opacity: {
              value: 0.5,
              animation: {
                speed: 1,
                minimumValue: 0.1,
              },
            },
            size: {
              random: {
                enable: true,
              },
              value: {
                min: 1,
                max: 5,
              },
              animation: {
                speed: 40,
                minimumValue: 0.1,
              },
            },
          },
        }}
      />
      <div className={styles.LoginForm}>
        <h2 className={styles.FormTitle}>xx新闻发布管理系统</h2>
        <Form
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
