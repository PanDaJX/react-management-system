/*
 * @author: 林俊贤
 * @Date: 2022-08-16 14:17:10
 * @LastEditors: 林俊贤
 * @LastEditTime: 2022-08-16 16:09:10
 * @Description:
 */
import React, { useEffect, useState } from "react";
import { Button, Descriptions, PageHeader } from "antd";
import axios from "axios";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
function NewsPreview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [newsDetail, setNewsDetail] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `news?id=${id}&_expand=category&_expand=role`
      );
      setNewsDetail(res.data[0]);
    };
    getData();
  }, [id]);

  const AuditStateMap = {
    0: "未审核",
    1: "审核中",
    2: "已通过",
    3: "未通过",
  };
  const PublishStateMap = {
    0: "未发布",
    1: "待发布",
    2: "已上线",
    3: "已下线",
  };

  return (
    <div>
      {newsDetail ? (
        <PageHeader
          ghost={false}
          onBack={() => navigate(-1)}
          title={newsDetail?.title}
          subTitle={newsDetail?.category.title}
        >
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="创建者">
              {newsDetail?.author}
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {moment(newsDetail?.createTime).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="发布时间">
              {newsDetail?.publishTime
                ? moment(newsDetail?.publishTime).format("YYYY-MM-DD HH:mm:ss")
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="区域">
              {newsDetail?.region}
            </Descriptions.Item>
            <Descriptions.Item label="审核状态">
              {AuditStateMap[newsDetail?.auditState] || ""}
            </Descriptions.Item>
            <Descriptions.Item label="发布状态">
              {PublishStateMap[newsDetail?.publishState] || ""}
            </Descriptions.Item>
            <Descriptions.Item label="访问数量">
              {newsDetail?.view}
            </Descriptions.Item>
            <Descriptions.Item label="点赞数量">
              {newsDetail?.star}
            </Descriptions.Item>
            <Descriptions.Item label="评论数量">
              {newsDetail?.comment || 0}
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
      ) : (
        "数据库暂无此数据"
      )}
      <div
        dangerouslySetInnerHTML={{ __html: newsDetail?.content }}
        style={{ border: "1px solid gray", padding: "24px" }}
      ></div>
    </div>
  );
}

export default NewsPreview;
