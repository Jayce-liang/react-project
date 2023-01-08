import React, { PureComponent } from "react";
import { Button, Card, Form, Input, message, Modal, Select, Table } from "antd";
import {
  PlusCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import {
  reqAddUser,
  reqUserList,
  reqUpdateUser,
  reqDelUser,
} from "../../api/index";
const { Option } = Select;
class User extends PureComponent {
  formRef = React.createRef();

  state = {
    isShow: false,
    userList: [], //用户列表
    roleList: [], //角色列表
    operaType: "add", //操作类型
    userInfo: {}, //修改用户时需要回显的用户信息
    _id: "", //更新用户信息所需id
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
      let values = await this.formRef.current.validateFields();
      let result;
      if (this.state.operaType === "add") result = await reqAddUser(values);
      else {
        values._id = this.state._id; //获取_id
        result = await reqUpdateUser(values);
      }
      const { msg, status } = result;
      if (status === 0) {
        this.getUserList();
        this.formRef.current.resetFields();
        this.setState({ isShow: false });
      } else {
        message.error(msg, 2);
        return;
      }
    } catch {
      message.error("表单输入有误！", 2);
    }
  };
  handleUpdateModal = (item) => {
    this.setState(
      {
        isShow: true,
        operaType: "update",
        userInfo: { ...item },
        _id: item._id,
      },
      () => {
        //重置表单
        this.formRef.current.resetFields();
      }
    );
  };

  deleteUser = (userId) => {
    return () => {
      Modal.confirm({
        visible: true,
        title: "确认删除吗",
        icon: <ExclamationCircleOutlined />,
        okText: "确认",
        cancelText: "取消",
        onOk: async () => {
          const { status, msg } = await reqDelUser(userId);
          if (status === 0) {
            message.info("删除成功", 2);
            this.getUserList();
          } else {
            message.error(msg, 2);
          }
        },
      });
    };
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
        render: (item) => {
          return (
            <>
              <Button type="link" onClick={() => this.handleUpdateModal(item)}>
                修改
              </Button>
              <Button type="link" onClick={this.deleteUser(item._id)}>
                删除
              </Button>
            </>
          );
        },
        width: "25%",
        align: "center",
      },
    ];
    const { email, username, password, phone, role_id } = this.state.userInfo;
    return (
      <>
        <Card
          title={
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() => {
                //显示模态框
                this.setState(
                  { isShow: true, operaType: "add", userInfo: {} },
                  () => {
                    //重置表单
                    this.formRef.current.resetFields();
                  }
                );
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
        {/* 添加或修改用户模态框 */}
        <Modal
          maskClosable={false}
          title={this.state.operaType === "add" ? `添加用户` : "修改"}
          visible={this.state.isShow}
          okText="确认"
          cancelText="取消"
          onOk={this.handleAddOkModal}
          onCancel={() => {
            this.setState({ isShow: false });
          }}
        >
          <Form ref={this.formRef} labelCol={{ md: 4 }} wrapperCol={{ md: 16 }}>
            <Form.Item
              label="用户名"
              name="username"
              initialValue={username}
              rules={[
                { required: true, whitespace: true, message: "请输入用户名" },
              ]}
            >
              <Input autoComplete="off" placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              initialValue={password}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "密码最小为4位",
                  min: 4,
                },
              ]}
            >
              <Input
                type={"password"}
                autoComplete="off"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item label="邮箱" name="email" initialValue={email}>
              <Input autoComplete="off" placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item label="电话" name="phone" initialValue={phone}>
              <Input autoComplete="off" placeholder="请输入电话" />
            </Form.Item>
            <Form.Item
              label="角色"
              name="role_id"
              rules={[{ required: true, message: "请选择一个角色" }]}
              initialValue={role_id}
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
      </>
    );
  }
}
export default User;
