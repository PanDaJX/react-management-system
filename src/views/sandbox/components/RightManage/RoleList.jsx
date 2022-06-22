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
  const getList = () => {
    axios.get("http://localhost:1113/roles").then((res) => {
      const { data } = res;
      data.forEach((item) => {
        item.menuChildren = item?.menuChildren?.length
          ? item.menuChildren
          : null;
      });
      setDataSource(data);
    });
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

  const handleSelectRole = (item) => {
    setIsModalVisible(true);
    setCurrentRole(item);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState({});
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
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
                  onClick={() => {
                    handleSelectRole(item);
                  }}
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
          // onExpand={onExpand}
          // expandedKeys={expandedKeys}
          // autoExpandParent={autoExpandParent}
          // onCheck={onCheck}
          // checkedKeys={checkedKeys}
          // onSelect={onSelect}
          // selectedKeys={selectedKeys}
          treeData={currentRole}
        />
      </Modal>
    </div>
  );
}
