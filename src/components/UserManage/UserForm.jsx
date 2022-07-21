/*
 * @author: 林俊贤
 * @Date: 2022-07-15 14:08:31
 * @LastEditors: 林俊贤
 * @LastEditTime: 2022-07-21 10:18:01
 * @Description:
 */
import React, { forwardRef, useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
const { Option } = Select;
const UserForm = forwardRef((props, ref) => {
  const { regionsList, rolesList, currentUser } = props;
  useEffect(() => {
    setDisabled(currentUser.roleId === 1);
  }, [currentUser]);

  const [disabled, setDisabled] = useState(false);
  const handleChange = (value) => {
    setDisabled(value === 1);
    value === 1 && ref.current.setFieldsValue({ region: "" });
  };
  const { region, roleId } = JSON.parse(localStorage.getItem("token"));
  const handleRegionDisabled = (item) => {
    if (roleId === 1) return false;
    if (currentUser?.id) {
      return true;
    } else {
      return item.value !== region;
    }
  };

  const handleRoleDisabled = (item) => {
    if (roleId === 1) return false;
    if (currentUser?.id) {
      return true;
    } else {
      return item.id !== 3;
    }
  };

  return (
    <Form ref={ref} name="userForm" layout="vertical">
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            required: true,
            message: "请输入用户名",
          },
        ]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: "请输入密码",
          },
        ]}
      >
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      <Form.Item
        label="区域"
        name="region"
        rules={[
          {
            required: !disabled,
            message: "请选择区域",
          },
        ]}
      >
        <Select disabled={disabled}>
          {regionsList.map((item) => (
            <Option
              key={item.value}
              value={item.value}
              disabled={handleRegionDisabled(item)}
            >
              {item.title}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="角色"
        name="roleId"
        rules={[
          {
            required: true,
            message: "请选择角色",
          },
        ]}
      >
        <Select onChange={handleChange}>
          {rolesList.map((item) => (
            <Option
              key={item.id}
              value={item.id}
              disabled={handleRoleDisabled(item)}
            >
              {item.roleName}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
});

export default UserForm;
