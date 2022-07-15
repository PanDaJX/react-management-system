/*
 * @author: 林俊贤
 * @Date: 2022-06-17 15:26:02
 * @LastEditors: 林俊贤
 * @LastEditTime: 2022-07-15 16:09:37
 * @Description:
 */
import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Switch, Space, Tooltip, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import UserForm from "@components/UserManage/UserForm";

const { confirm } = Modal;

export default function UserManageList() {
  useEffect(() => {
    getUsersList();
    getRolesList();
    getRegionsList();
  }, []);

  const [dataSource, setDataSource] = useState([]);
  const getUsersList = async () => {
    const res = await axios.get("http://localhost:1113/users");
    setDataSource(res?.data);
  };

  const [rolesList, setRolesList] = useState([]);
  const getRolesList = async () => {
    const res = await axios.get("http://localhost:1113/roles");
    const { data } = res;
    data.forEach((item) => {
      item.menuChildren = item?.menuChildren?.length ? item.menuChildren : null;
    });
    setRolesList(data);
  };

  const [regionsList, setRegionsList] = useState([]);
  const getRegionsList = async () => {
    const res = await axios.get("http://localhost:1113/regions");
    setRegionsList(res?.data);
  };
  const [filteredInfo, setFilteredInfo] = useState({});
  const handleChangeTable = (pagination, filters, sorter) => {
    console.log("filters", filters);
    setFilteredInfo(filters);
  };
  const columns = [
    {
      title: "区域",
      dataIndex: "region",
      key: "region",
      render: (region) => region || "全球",
      filters: [
        { text: "全球", value: "" },
        ...regionsList.map((e) => {
          return { text: e.title, value: e.value };
        }),
      ],
      filteredValue: filteredInfo.region || null,
      onFilter: (value, record) => record.region == value,
    },
    {
      title: "角色名称",
      dataIndex: "roleId",
      key: "roleId",
      render: (id) => rolesList.filter((e) => e?.id === id)[0]?.roleName || "-",
    },
    {
      title: "用户名称",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "用户状态",
      dataIndex: "roleState",
      key: "roleState",
      render: (status, item) => (
        <Switch
          disabled={item?.default}
          checked={status}
          onChange={() => handleChangeRoleState(item)}
        />
      ),
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (_, item) => (
        <Space size="middle">
          <Tooltip title="用户配置">
            <Button
              disabled={item?.default}
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => handleClickEditUsers(item)}
            />
          </Tooltip>
          <Tooltip title="删除">
            <Button
              disabled={item?.default}
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => onClickDelete(item)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleChangeRoleState = async (item) => {
    const res = await axios.patch(`http://localhost:1113/users/${item.id}`, {
      ...item,
      roleState: !item.roleState,
    });
    const { data } = res;
    setDataSource(dataSource.map((e) => (e?.id === item?.id ? data : e)));
  };

  const onClickDelete = (item) => {
    confirm({
      title: `删除`,
      icon: <ExclamationCircleOutlined />,
      content: `是否删除${item.title}?`,
      onOk() {
        console.log("OK");
        handleDelete(item);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const handleDelete = (item) => {
    axios.delete(`http://localhost:1113/users/${item.id}`).then(() => {
      getUsersList();
    });
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("添加用户");
  const [currentUser, setCurrentUser] = useState({});
  const handleClickAddUsers = () => {
    setModalVisible(true);
    setModalTitle("添加用户");
    setCurrentUser({});
  };
  const handleClickEditUsers = async (item) => {
    await setModalVisible(true);
    setModalTitle("编辑用户");
    setCurrentUser(item);
    userForm.current.setFieldsValue({ ...item });
  };

  const handleOk = async () => {
    const value = await userForm.current.validateFields();
    if (!value) return;
    if (!currentUser?.id) {
      const res = await axios.post(`http://localhost:1113/users`, value);
      const { data } = res;
      setDataSource([...dataSource, data]);
    } else {
      const res = await axios.patch(
        `http://localhost:1113/users/${currentUser?.id}`,
        value
      );
      const { data } = res;
      setDataSource(
        dataSource.map((e) => (e?.id === currentUser?.id ? data : e))
      );
    }
    handleCancel();
  };
  const handleCancel = () => {
    setModalVisible(false);
    setCurrentUser({});
    userForm.current.resetFields();
  };

  const userForm = useRef(null);

  return (
    <section>
      <Button
        type="primary"
        style={{ marginBottom: "24px" }}
        onClick={handleClickAddUsers}
      >
        添加用户
      </Button>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 10, total: dataSource.length }}
        rowKey={(row) => row.id}
        onChange={handleChangeTable}
      ></Table>
      <Modal
        title={modalTitle}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <UserForm
          ref={userForm}
          regionsList={regionsList}
          rolesList={rolesList}
          currentUser={currentUser}
        />
      </Modal>
    </section>
  );
}
