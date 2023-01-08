import { PureComponent } from "react";
import { connect } from "react-redux";
import {Redirect} from "react-router-dom"
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { reqLogin } from "../../api";
import { createSaveUserInfoAction } from "../../redux/actions/login_action";
import "./css/login.less";
import logo from "../../static/images/logo.png";

class Login extends PureComponent {
  componentDidMount() {}
  onFinish = async (userInput) => {
    //登录请求

    // reqLogin(userInput.username, userInput.password)
    //   .then((value) => console.log(value))
    //   .catch((reason) => console.log(reason,"hahha"));

    let result = await reqLogin(userInput.username, userInput.password);
    if (result.status === 0) {
      //将数据交给redux管理
      this.props.saveUserInfo(result.data);
      //跳转到admin页面
      this.props.history.replace("/admin");
    } else {
      message.warning(result.msg, 1);
    }
  };

  //自定义式校验规制
  pswValidator = (rule, value) => {
    if (!value) {
      return Promise.reject(new Error("密码必须输入"));
    } else if (value.length > 12) {
      return Promise.reject(new Error("密码最大为12位数字"));
    } else if (value.length < 4) {
      return Promise.reject(new Error("密码最小为4位数字"));
    } else if (!/^\w+$/.test(value)) {
      return Promise.reject(new Error("密码必须为 字母数字下划线 组成啊"));
    } else {
      return Promise.resolve();
    }
  };

  render() {
    //如果之前已经登录过了，跳转到admin界面
    if (this.props.isLogin) {
      return <Redirect to="/admin" />;
    }
    return (
      <div className="login">
        <header>
          <img src={logo} alt="logo" />
          <h1>shop</h1>
        </header>
        <main>
          <h1>用户登录</h1>
          <Form
            onFinish={this.onFinish}
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="username"
              //声明式校验规则
              rules={[
                { required: true, message: "请输入用户名" },
                { max: 12, message: "用户名最大为12字段" },
                { min: 4, message: "用户名最小为4个字段" },
                {
                  pattern: /^\w+$/,
                  message: "用户名必须为 字母数字下划线 组成",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名:admin"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ validator: this.pswValidator }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码:admin"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </main>
      </div>
    );
  }
}

export default connect((state) => ({isLogin:state.userInfo.isLogin}), {
  saveUserInfo: createSaveUserInfoAction,
})(Login);
