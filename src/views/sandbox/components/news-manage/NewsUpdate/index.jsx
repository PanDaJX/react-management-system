/*
 * @author: 林俊贤
 * @Date: 2022-07-21 10:46:43
 * @LastEditors: 林俊贤
 * @LastEditTime: 2022-08-16 16:40:03
 * @Description:
 */
import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.scss";
import axios from "axios";
import NewsEditor from "@/components/NewsManage/NewsEditor";
import { useNavigate, useParams } from "react-router-dom";

import {
  PageHeader,
  Steps,
  Button,
  Form,
  Select,
  Input,
  message,
  notification,
} from "antd";
const { Step } = Steps;
const { Option } = Select;
function NewsUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [step, setStep] = useState(0);
  const clickPreBtn = () => {
    setStep(step - 1);
  };
  const clickNextBtn = async () => {
    try {
      switch (step) {
        case 0:
          const res = await newsForm.current.validateFields();
          setFormInfo(res);
          setStep(step + 1);
          break;
        case 1:
          const content = formContent.trim();
          if (!content || content === "<p></p>") {
            message.error("新闻内容不能为空");
            throw new Error("新闻内容不能为空");
          }
          setStep(step + 1);
          break;
        default:
          setStep(step + 1);
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/categories");
      setCategoryList(res.data);
    };
    fetchData();
  }, []);

  const newsForm = useRef(null);
  const LAYOUT = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const [formInfo, setFormInfo] = useState({});
  const [formContent, setFormContent] = useState("");
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `news?id=${id}&_expand=category&_expand=role`
      );
      const { content, title, categoryId } = res.data[0];
      newsForm.current.setFieldsValue({ title, categoryId });
      setFormInfo({ title, categoryId });
      setFormContent(content);
    };
    getData();
  }, [id]);

  const handleSave = async (auditState) => {
    try {
      await axios.patch(`/news/${id}`, {
        ...formInfo,
        content: formContent,
        auditState: auditState,
      });
      notification.info({
        message: `通知`,
        description: `新闻已保存成功，请到${
          auditState === 0 ? "草稿箱" : "审核列表"
        }查看！`,
        placement: "bottomRight",
      });
      navigate(auditState === 0 ? "/news-manage/draft" : "/audit-manage/list");
    } catch (error) {}
  };

  return (
    <div>
      <PageHeader title="撰写新闻" subTitle="" onBack={() => navigate(-1)} />
      <Steps current={step}>
        <Step title="基本信息" description="新闻标题，新闻分类" />
        <Step title="新闻内容" description="新闻主题内容" />
        <Step title="新闻提交" description="保存草稿或者提交审核" />
      </Steps>

      <div className={styles.StepWrap}>
        <div className={step === 0 ? styles.Active : styles.Hidden}>
          <Form {...LAYOUT} ref={newsForm}>
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: "请输入新闻标题！",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="新闻分类"
              name="categoryId"
              rules={[
                {
                  required: true,
                  message: "请选择新闻分类！",
                },
              ]}
            >
              <Select>
                {categoryList.map((item) => (
                  <Option value={item.id} key={item.id}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </div>

        <div className={step === 1 ? styles.Active : styles.Hidden}>
          <NewsEditor
            content={formContent}
            getContent={(htmlText) => {
              setFormContent(htmlText);
            }}
          ></NewsEditor>
        </div>

        <div className={step === 2 ? styles.Active : styles.Hidden}></div>
      </div>

      <div className={styles.StepBtnWrap}>
        {step < 2 && (
          <Button type="primary" onClick={clickNextBtn}>
            下一步
          </Button>
        )}
        {step > 0 && <Button onClick={clickPreBtn}>上一步</Button>}
        {step === 2 && (
          <Button type="primary" onClick={() => handleSave(0)}>
            保存至草稿箱
          </Button>
        )}
        {step === 2 && (
          <Button type="danger" onClick={() => handleSave(1)}>
            提交审核
          </Button>
        )}
      </div>
    </div>
  );
}

export default NewsUpdate;
