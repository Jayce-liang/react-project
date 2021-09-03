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

  handleOk = async () => {
    // 验证是否为空
    try{
      let reasult =await this.formRef.current.validateFields(["categoryValue"]);
      console.log(reasult);
    }catch{
      message.error("不能为空！",2);
      return;
    }
    //不知道为什么下面then的value为空!!!   已解决，使用then方法时需要给validateFields传参
    // this.formRef.current
    //   .validateFields(["categoryValue"])
    //   .then((values) => {console.log(values);})
    //   .catch((errorInfo) => {return ;});

    this.formRef.current.resetFields();
    this.setIsModalVisible(false);
  };

  handleCancel = () => {
    this.formRef.current.resetFields();
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
            <Button
              htmlType="submit"
              size="maddle"
              onClick={this.showUpdateModal}
            >
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
          maskClosable={false}
          title={this.state.operationType === "add" ? "新增分类" : "更新分类"}
          visible={this.state.visible}
          okText="确定"
          cancelText="取消"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
            ref={this.formRef}
            name="categoryForm"
            initialValues={{ remember: true }}
          >
            <Form.Item
              required
              name="categoryValue"
              rules={[
                { required: true, whitespace: true, message: "不能为空" },
              ]}
            >
              <Input placeholder="请输入分类名" autoFocus={true} />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default Category;
