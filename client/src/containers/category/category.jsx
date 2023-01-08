import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Card, Button, Table, message, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createSaveCategoryList } from "../../redux/actions/category_action";
import {
  reqCategoryList,
  reqAddCategory,
  reqUpdateCategory,
} from "../../api/index";
import { PAGE_SIZE } from "../../config/index";
class Category extends PureComponent {
  state = {
    categoryList: [],
    visible: false,
    operationType: "",
    isLoading: true,
    currentCategoryName: "",
    currentCategoryId: "",
  };
  formRef = React.createRef();

  componentDidMount() {
    this.getCategoryList();
  }

  //设置模态框
  setIsModalVisible = (
    visible,
    operationType,
    currentCategoryName,
    currentCategoryId
  ) => {
    this.setState(
      {
        currentCategoryName,
        currentCategoryId,
        visible,
        operationType,
      },
      () => {
        //重置表单
        this.formRef.current.resetFields();
      }
    );
  };

  showAddModal = () => {
    this.setIsModalVisible(true, "add", "", "");
  };

  showUpdateModal = (item) => {
    let currentCategoryName = item.name;
    let currentCategoryId = item._id;
    this.setIsModalVisible(
      true,
      "update",
      currentCategoryName,
      currentCategoryId
    );
  };

  toAdd = async (categoryName) => {
    let result = await reqAddCategory(categoryName);
    const { status, data, msg } = result;
    if (status === 0) {
      message.success("新增成功", 2);
      let categoryList = [...this.state.categoryList];
      categoryList.unshift(data);
      this.setState({
        visible: false,
        categoryList,
      });
      this.formRef.current.resetFields();
    } else message.error(msg, 2);
  };
  toUpdate = async (categoryObj) => {
    let result = await reqUpdateCategory(categoryObj);
    const { status, msg } = result;
    if (status === 0) {
      message.success("修改成功", 2);
      this.setState({
        visible: false,
        currentCategoryName: "",
        currentCategoryId: "",
      });
      this.getCategoryList();
      this.formRef.current.resetFields();
    } else message.error(msg, 2);
  };
  handleOk = async () => {
    // 验证是否为空
    try {
      //校验表单输入及获取输入的值data
      let categoryName = await this.formRef.current.validateFields(); //如果不传参默认校验的所有输入项
      if (this.state.operationType === "add") this.toAdd(categoryName);
      if (this.state.operationType === "update")
        this.toUpdate({
          categoryName: categoryName.categoryName,
          categoryId: this.state.currentCategoryId,
        });
    } catch {
      message.error("不能为空！", 2);
      return;
    }
    //不知道为什么下面then的value为空!!!   已解决，使用then方法时需要给validateFields传参
    // this.formRef.current
    //   .validateFields(["categoryValue"])
    //   .then((values) => {console.log(values);})
    //   .catch((errorInfo) => {return ;});
  };

  handleCancel = () => {
    this.formRef.current.resetFields();
    this.setIsModalVisible(false);
  };
  //获取category数据
  getCategoryList = async () => {
    let result = await reqCategoryList();
    let { status, data, msg } = result;
    if (status === 0) {
      this.setState({ categoryList: data.reverse(), isLoading: false });
      //将数据存入redux
      this.props.saveCategoryList(data);
    } else message.error(msg);
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
        render: (item) => {
          return (
            <Button
              type="primary"
              size="maddle"
              onClick={() => this.showUpdateModal(item)}
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
            <Button type="primary" onClick={this.showAddModal}>
              <PlusOutlined />
              添加分类
            </Button>
          }
        >
          <Table
            loading={this.state.isLoading}
            dataSource={dataSource}
            columns={columns}
            bordered
            rowKey="_id"
            pagination={{ pageSize: PAGE_SIZE, showQuickJumper: true }}
          />
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
            initialValues={{ categoryName: this.state.currentCategoryName }}
          >
            <Form.Item
              required
              name="categoryName"
              // initialValue={this.state.currentCategoryName}
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

export default connect((state) => ({}), {
  saveCategoryList: createSaveCategoryList,
})(Category);
