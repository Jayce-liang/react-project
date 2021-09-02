import React, { Component } from "react";
import { Card, Button, Table, message, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { reqCategoryList } from "../../api/index";
import { PAGE_SIZE } from "../../config/index";

class Category extends Component {
  state = {
    categoryList: [],
    visible: false,
    operationType: "",
  };
  formRef = React.createRef();
  componentDidMount() {
    this.getCategoryList();
  }
  onFinish = () => {
    console.log(this.formRef);
  };
  //设置模态框
  setIsModalVisible = (visible, operationType) => {
    this.setState({
      visible,
      operationType,
    });
  };
  showAddModal = () => {
    this.setIsModalVisible(true, "add");
  };
  showUpdateModal = () => {
    this.setIsModalVisible(true, "update");
  };
  handleOk = () => {
    this.onFinish();
    this.setIsModalVisible(false);
  };

  handleCancel = () => {
    this.setIsModalVisible(false);
  };
  //获取category数据
  getCategoryList = async () => {
    let result = await reqCategoryList();
    let { status, data, msg } = result;
    if (status === 0) this.setState({ categoryList: data });
    else message.error(msg);
  };

  render() {
    const dataSource = this.state.categoryList;

    const columns = [
      {
        title: "分类名",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "操作",
        width: "25%",
        align: "center",
        render: () => {
          return (
            <Button type="primary" size="maddle" onClick={this.showUpdateModal}>
              修改分类
            </Button>
          );
        },
      },
    ];
    return (
      <>
        <Card
          style={{ width: "100%", height: "100%" }}
          title="Category card"
          extra={
            <Button type="primary" size="large" onClick={this.showAddModal}>
              <PlusOutlined />
              添加
            </Button>
          }
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            rowKey="_id"
            pagination={{ pageSize: PAGE_SIZE }}
          />
          ;
        </Card>
        <Modal
          title={this.state.operationType === "add" ? "新增分类" : "更新分类"}
          visible={this.state.visible}
          okText="确定"
          cancelText="取消"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form ref={this.formRef}
            onFinish={this.onFinish}
            name="normal_login"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "不能为空" }]}
            >
              <Input placeholder="请输入分类名" />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default Category;
