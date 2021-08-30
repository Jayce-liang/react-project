import { Component } from "react";
import {connect} from "react-redux"
import {createDemo1Action,createDemo2Action} from "../../redux/actions/testAction"
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "antd/dist/antd.less";
import "./css/login.less";
import logo from "./images/logo.png";
class Login extends Component {
  componentDidMount(){
    console.log("Login----",this.props);
  }
  onFinish = () => {
    //获取用户输入
    alert(1)
    //   校验数据
    // axios
  };
  //自定义式校验规制
  pswValidator=(rule,value)=>{
    if(!value){
        return Promise.reject(new Error("密码必须输入"));
    }else if(value.length>12){
        return Promise.reject(new Error("密码最大为12位数字"));
    }else if(value.length<4){
        return Promise.reject(new Error("密码最小为4位数字"));
    }else if(!(/^\w+$/).test(value)){
        return Promise.reject(new Error("密码必须为 字母数字下划线 组成啊"));
    }else{
        return Promise.resolve();
    }
  }

  render() {
    return (
      <div className="login">
        <header>
          <img src={logo} alt="logo" />
          <h1>React Project</h1>
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
              rules={[{ required: true, message: "请输入用户名" },
              { max: 12, message: "用户名最大为12字段" },
              { min: 4, message: "用户名最小为4个字段" },
              { pattern:/^\w+$/, message: "用户名必须为 字母数字下划线 组成" }
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{validator:this.pswValidator}]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
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

export default connect(
  state=>({test:state.test}),
  {
    demo1:createDemo1Action,
    demo2:createDemo2Action
  }
)(Login)