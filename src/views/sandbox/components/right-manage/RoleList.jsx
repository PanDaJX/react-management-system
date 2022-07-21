import React, { useState, useEffect } from "react";
import { Space, Table, Button, Tooltip, Modal, Tree } from "antd";
import {
  DeleteOutlined,
  UnorderedListOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
const { Column } = Table;
const { confirm } = Modal;

export default function RoleList() {
  const [dataSource, setDataSource] = useState([]);
  const getList = async () => {
    const res = await axios.get("http://localhost:1113/roles");
    const { data } = res;
    data.forEach((item) => {
      item.menuChildren = item?.menuChildren?.length ? item.menuChildren : null;
    });
    setDataSource(data);
  };
  useEffect(() => {
    getList();
  }, []);
  const onClickDelete = (item) => {
    console.log(item);
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
    axios.delete(`http://localhost:1113/roles/${item.id}`).then(() => {
      getList();
    });
  };
  const [currentRole, setCurrentRole] = useState([]);
  const [currenPlayer, setCurrentPlayer] = useState({});
  const handleSelectRole = (item) => {
    setCurrentRole(item.rights);
    setCurrentPlayer(item);
    console.log("handleSelectRole", item);
    setIsModalVisible(true);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roleList, setRoleList] = useState([]);

  function getItem(key, label, children, icon, type) {
    return {
      key,
      children: children?.length
        ? children
            .filter((child) => child.pagepermisson === 1)
            .map((child) => {
              return { key: child.key, label: child.title };
            })
        : null,
      label,
      icon,
      type,
    };
  }
  useEffect(() => {
    axios.get("http://localhost:1113/menus?_embed=menuChildren").then((res) => {
      const { data } = res;
      let list = [];
      data.forEach((item) => {
        const { key, menuChildren, title, icon } = item;
        list.push(getItem(key, title, menuChildren, icon));
      });
      setRoleList(list);
    });
  }, []);
  const handleOk = async () => {
    await axios.patch(`http://localhost:1113/roles/${currenPlayer.id}`, {
      rights: currentRole.checked,
    });
    getList();
    handleCancel();
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleCheck = (checkedKeys) => {
    setCurrentRole(checkedKeys);
  };
  return (
    <div>
      <Table
        dataSource={dataSource}
        pagination={{ pageSize: 5, total: dataSource.length }}
        childrenColumnName={"menuChildren"}
      >
        <Column
          title="ID"
          dataIndex="id"
          key="id"
          render={(id) => <b>{id}</b>}
        />
        <Column title="角色名称" dataIndex="roleName" key="roleName" />

        <Column
          title="操作"
          key="action"
          render={(_, item) => (
            <Space size="middle">
              <Tooltip title="权限配置">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<UnorderedListOutlined />}
                  onClick={() => handleSelectRole(item)}
                />
              </Tooltip>
              <Tooltip title="删除">
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => onClickDelete(item)}
                />
              </Tooltip>
            </Space>
          )}
        />
      </Table>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree
          checkable
          treeData={roleList}
          fieldNames={{ title: "label" }}
          autoExpandParent
          checkStrictly
          checkedKeys={currentRole}
          onCheck={handleCheck}
        />
      </Modal>
    </div>
  );
}
