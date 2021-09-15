import React, { Component } from "react";
import { Button, Card, Form, Input, message, Modal, Select, Table } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { reqAddUser,reqUserList } from "../../api/index";
const { Option } = Select;
class User extends Component {
  addFormRef = React.createRef();

  state = {
    isShowAdd: false,
    userList: [], //用户列表
    roleList: [], //角色列表
  };

  componentDidMount() {
    this.getUserList();
  }

  getUserList = async () => {
    const result = await reqUserList();
    const { status, data } = result;
    if (status === 0) {
      this.setState({ userList: data.users, roleList: data.roles });
    } else {
      message.error("请求失败", 2);
      return;
    }
  };

  handleAddOkModal = async () => {
    try {
      let values = await this.addFormRef.current.validateFields();
      let result = await reqAddUser(values);
      const { msg, status } = result;
      if (status === 0) {
        this.getUserList();
        this.addFormRef.current.resetFields();
        this.setState({ isShowAdd: false });
      } else {
        message.error(msg, 2);
        return;
      }
    } catch {
      message.error("表单输入有误！", 2);
    }
  };

  render() {
    const columns = [
      {
        title: "用户名",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "邮箱",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "电话",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "注册时间",
        dataIndex: "create_time",
        key: "create_time",
        render: (item) => {
          if (item) {
            return dayjs(item).format("YYYY-MM-DD HH:mm:ss");
          }
          return item;
        },
      },
      {
        title: "所属角色",
        dataIndex: "role_id",
        key: "role_id",
        render: (id) => {
          let result = this.state.roleList.find((item) => item._id === id);
          if (result) return result.name;
        },
      },
      {
        title: "操作",
        key: "operator",
        render: () => {
          return (
            <>
              <Button type="link">修改</Button>
              <Button type="link">删除</Button>
            </>
          );
        },
        width: "25%",
        align: "center",
      },
    ];

    return (
      <>
        <Card
          title={
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() => {
                //显示模态框
                this.setState({ isShowAdd: true });
              }}
            >
              添加用户
            </Button>
          }
        >
          <Table
            bordered={true}
            rowKey={"_id"}
            dataSource={this.state.userList}
            columns={columns}
          />
        </Card>
        {/* 添加用户的模态框 */}
        <Modal
          title={`添加用户`}
          visible={this.state.isShowAdd}
          okText="确认"
          cancelText="取消"
          onOk={this.handleAddOkModal}
          onCancel={() => {
            this.setState({ isShowAdd: false });
          }}
        >
          <Form
            ref={this.addFormRef}
            labelCol={{ md: 4 }}
            wrapperCol={{ md: 16 }}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                { required: true, whitespace: true, message: "请输入用户名" },
              ]}
            >
              <Input autoComplete="off" placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[
                { required: true, whitespace: true, message: "密码最小为4位",min:4},
              ]}
            >
              <Input
                type={"password"}
                autoComplete="off"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item label="邮箱" name="email">
              <Input autoComplete="off" placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item label="电话" name="phone">
              <Input autoComplete="off" placeholder="请输入电话" />
            </Form.Item>
            <Form.Item
              label="角色"
              name="role_id"
              rules={[{ required: true, message: "请选择一个角色" }]}
            >
              <Select placeholder={"请选择一个角色"}>
                {this.state.roleList.map((item) => {
                  return (
                    <Option key={item._id} value={item._id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        {/* 修改用户的模态框 */}
        <Modal
          title={`修改用户`}
          visible={false}
          okText="确认"
          cancelText="取消"
        >
          <Form>修改用户</Form>
        </Modal>
      </>
    );
  }
}
export default User;
