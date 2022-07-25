/*
 * @author: 林俊贤
 * @Date: 2022-06-17 15:26:02
 * @LastEditors: 林俊贤
 * @LastEditTime: 2022-06-21 16:22:26
 * @Description:
 */
import React, { useState, useEffect } from "react";
import {
  Space,
  Table,
  Button,
  Tooltip,
  Tag,
  Popover,
  Switch,
  Modal,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Column } = Table;
const { confirm } = Modal;

export default function RightList() {
  const [dataSource, setDataSource] = useState([]);
  const getList = () => {
    axios.get("/menus?_embed=menuChildren").then((res) => {
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
    const api =
      item.grade === 1
        ? "/menus"
        : "/menuChildren";
    axios.delete(`${api}/${item.id}`).then(() => {
      getList();
    });
  };

  const handleChange = (checked, item) => {
    item.pagepermisson = checked ? 1 : 0;
    setDataSource([...dataSource]);
    const api =
      item.grade === 1
        ? "/menus"
        : "/menuChildren";
    axios.patch(`${api}/${item.id}`, {
      pagepermisson: item.pagepermisson,
    });
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
        <Column title="权限名称" dataIndex="title" key="title" />
        <Column
          title="权限路径"
          key="key"
          dataIndex="key"
          render={(key) => <Tag color="warning">{key}</Tag>}
        />

        <Column
          title="操作"
          key="action"
          render={(_, item) => (
            <Space size="middle">
              <Popover
                content={
                  <div>
                    <Switch
                      checked={item.pagepermisson}
                      onChange={(check) => {
                        handleChange(check, item);
                      }}
                    />
                  </div>
                }
                title="页面配置"
                trigger={
                  Object.hasOwnProperty.call(item, "pagepermisson")
                    ? "click"
                    : ""
                }
              >
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  disabled={!Object.hasOwnProperty.call(item, "pagepermisson")}
                />
              </Popover>
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
    </div>
  );
}
