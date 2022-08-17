/*
 * @author: 林俊贤
 * @Date: 2022-07-21 10:47:01
 * @LastEditors: 林俊贤
 * @LastEditTime: 2022-08-16 17:14:07
 * @Description:
 */
import React, { useState, useEffect } from "react";
import { Space, Table, Button, Tooltip, notification, Modal } from "antd";
import {
  DeleteOutlined,
  FormOutlined,
  ExclamationCircleOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Column } = Table;
const { confirm } = Modal;

export default function NewsDraft() {
  const navigate = useNavigate();

  const { username } = JSON.parse(localStorage.getItem("token"));
  const [dataSource, setDataSource] = useState([]);
  const getList = () => {
    axios
      .get(`/news?author=${username}&auditState=0&_expand=category`)
      .then((res) => {
        const { data } = res;
        setDataSource(data);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  const onClickDelete = (item) => {
    confirm({
      title: `删除`,
      icon: <ExclamationCircleOutlined />,
      content: `是否删除${item.title}?`,
      onOk() {
        handleDelete(item);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleDelete = (item) => {
    axios.delete(`/news/${item.id}`).then(() => {
      getList();
    });
  };

  const onClickEdit = (item) => {
    navigate(`/news-manage/update/${item.id}`);
  };
  const onClickReview = async (item) => {
    try {
      await axios.patch(`/news/${item.id}`, {
        auditState: 1,
      });
      navigate(`/audit-manage/list`);
      notification.info({
        message: `通知`,
        description: `新闻已提交审核，请到审核列表查看！`,
        placement: "bottomRight",
      });
    } catch (error) {}
  };

  const goDetail = (item) => {
    navigate(`/news-manage/preview/${item.id}`);
  };

  return (
    <div>
      <Table
        dataSource={dataSource}
        pagination={{ pageSize: 10, total: dataSource.length }}
        rowKey={(item) => item.id}
      >
        <Column
          title="ID"
          dataIndex="id"
          key="id"
          render={(id) => <b>{id}</b>}
        />
        <Column
          title="新闻标题"
          dataIndex="title"
          key="title"
          render={(key, item) => <a onClick={() => goDetail(item)}>{key}</a>}
        />
        <Column title="作者" dataIndex="author" key="author" />
        <Column
          title="新闻分类"
          dataIndex="category"
          key="category"
          render={(key) => key?.title || ""}
        />

        <Column
          title="操作"
          key="action"
          render={(_, item) => (
            <Space size="middle">
              <Tooltip title="删除">
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => onClickDelete(item)}
                />
              </Tooltip>
              <Tooltip title="编辑">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<FormOutlined />}
                  onClick={() => onClickEdit(item)}
                />
              </Tooltip>
              <Tooltip title="审核">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<FileDoneOutlined />}
                  onClick={() => onClickReview(item)}
                />
              </Tooltip>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
