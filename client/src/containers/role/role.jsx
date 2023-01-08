import React, { PureComponent } from "react";
import dayjs from "dayjs";
import { Card, Button, Table, Form, Input, Modal, message, Tree } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { reqRoleList, reqAddRole, reqAuthRole } from "../../api/index";
import { PAGE_SIZE } from "../../config/index";
import menuList from "../../config/menuConfig";
class Role extends PureComponent {
  addFormRef = React.createRef();
  state = {
    isShowAdd: false, //是否展示 添加角色 模态框
    isShowAuth: false, //是否展示 设置权限 模态框
    roleList: [], //role 数组
    total: 0, //数据库中 role 角色 的总数
    current: 1, //当前分页
    _id: "", //当前操作角色的id
    checkedKeys: [],
    //权限模态框 Tree 源数据
    treeData: [
      {
        title: "平台权限",
        key: "top",
        children: [...menuList],
      },
    ],
  };

  componentDidMount() {
    this.getRoleList(this.state.current);
  }

  //获取 role 数据
  getRoleList = async (current) => {
    const result = await reqRoleList(current, PAGE_SIZE);
    const { data, status } = result;
    const { total, list } = data;
    if (status === 0) {
      this.setState({ total, current, roleList: list });
    } else message.error("error", 2);
  };

  //========================添加角色相关函数============================
  //添加角色模态框 点击确认 时的处理函数
  handleAddOkModal = async () => {
    try {
      const roleName = await this.addFormRef.current.validateFields();
      //请求新增role
      const result = await reqAddRole(roleName);
      const { status } = result;
      //添加成功则重新获取 roleList
      if (status === 0) this.getRoleList(this.state.current, PAGE_SIZE);
      else {
        message.error("添加失败", 2);
        return;
      }
      //重置表单
      this.addFormRef.current.resetFields();
      this.setState({ isShowAdd: false });
    } catch {
      message.error("不能为空！", 2);
      return;
    }
  };

  //添加角色模态框 点击取消 时的处理函数
  handleAddCancelModal = () => {
    //重置表单
    this.addFormRef.current.resetFields();
    //取消模态框
    this.setState({ isShowAdd: false });
  };

  //========================设置权限相关函数============================
  //展示授权弹窗
  showAuth = (_id) => {
    const { roleList } = this.state;
    const result = roleList.find((item) => {
      return item._id === _id;
    });
    if (result) {
      this.setState({ checkedKeys: result.menus, isShowAuth: true, _id });
    } else {
      message.error("获取权限失败", 2);
      return;
    }
  };
  handleAuthOkModal = async () => {
    const { _id, checkedKeys } = this.state;
    const anth_name = this.props.username;
    const result = await reqAuthRole({ _id, menus: checkedKeys, anth_name });
    const { status } = result;
    if (status === 0) {
      message.success("授权成功", 2);
      this.getRoleList(this.state.current);
    } else {
      message.error("授权失败", 2);
      return;
    }
    this.setState({ isShowAuth: false });
  };
  handleAuthCancelModal = () => {
    this.setState({ isShowAuth: false });
  };

  //========================tree============================
  onCheck = (checkedKeysValue) => {
    this.setState({ checkedKeys: checkedKeysValue });
  };

  render() {
    const dataSource = this.state.roleList;
    const columns = [
      {
        title: "角色名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        key: "create_time",
        render: (item) => {
          return dayjs(item).format("YYYY-MM-DD HH:mm:ss");
        },
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
        key: "auth_time",
        render: (item) => {
          if (item) {
            return dayjs(item).format("YYYY-MM-DD HH:mm:ss");
          }
          return item;
        },
      },
      {
        title: "授权人",
        dataIndex: "auth_name",
        key: "auth_name",
      },
      {
        title: "操作",
        key: "operator",
        render: (item) => (
          <Button type="link" onClick={() => this.showAuth(item._id)}>
            分配权限
          </Button>
        ),
        width: "25%",
        align: "center",
      },
    ];

    const treeData = this.state.treeData;
    return (
      <>
        <Card
          title={
            <Button
              type="primary"
              onClick={() => this.setState({ isShowAdd: true })}
            >
              <UserAddOutlined style={{ fontSize: "18px" }} />
              新增角色
            </Button>
          }
        >
          <Table
            bordered={true}
            rowKey={"_id"}
            dataSource={dataSource}
            columns={columns}
            pagination={{
              current: this.state.current,
              pageSize: PAGE_SIZE,
              total: this.state.total,
              onChange: this.getRoleList,
            }}
          />
          {/* 添加角色模态框 */}
          <Modal
            title={`添加角色`}
            visible={this.state.isShowAdd}
            onOk={this.handleAddOkModal}
            onCancel={this.handleAddCancelModal}
            okText="确认"
            cancelText="取消"
          >
            <Form ref={this.addFormRef}>
              <Form.Item
                name="roleName"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入角色名称",
                  },
                ]}
              >
                <Input placeholder="请输入角色名称" autoComplete="off" />
              </Form.Item>
            </Form>
          </Modal>

          {/* 设置权限模态框 */}
          <Modal
            title={`设置权限`}
            visible={this.state.isShowAuth}
            onOk={this.handleAuthOkModal}
            onCancel={this.handleAuthCancelModal}
            okText="确认"
            cancelText="取消"
          >
            {/* ==============================tree======================== */}
            <Tree
              checkable
              onCheck={this.onCheck}
              checkedKeys={this.state.checkedKeys}
              treeData={treeData}
              defaultExpandAll
            />
          </Modal>
        </Card>
      </>
    );
  }
}
export default connect((state) => ({ username: state.userInfo.user.username }))(
  Role
);
