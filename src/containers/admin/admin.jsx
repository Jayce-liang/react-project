import { Button } from "antd";
import "antd/dist/antd.less";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {createDeleteUserInfoAction} from "../../redux/actions/logout_action.js"
import {reqCategoryList} from "../../api"
class Admin extends Component {
  componentDidMount() {
    console.log("admin----", this);
  }
  logout=()=>{
    this.props.deleteUserInfo();
  }
  demo=async()=>{
    let result=await reqCategoryList();
    console.log(result);
  }
  //在render里若想实现跳转 最好用redirect
  render() {
    const { isLogin } = this.props.userInfo
    if (!isLogin) {
      this.props.history.replace("/login")
      return <Redirect to="/login" />
    }else return (
      <div>
        <h1>我是{this.props.userInfo.user.username}</h1>
        <Button type="primary" onClick={this.logout}>退出</Button>
        <Button type="primary" onClick={this.demo}>demo</Button>
      </div>
    )
  }
}
export default connect((state) => ({ userInfo: state.userInfo }), {
    deleteUserInfo:createDeleteUserInfoAction
})(Admin);
