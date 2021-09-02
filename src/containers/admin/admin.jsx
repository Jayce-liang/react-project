import {Layout } from "antd";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { createDeleteUserInfoAction } from "../../redux/actions/logout_action.js";
// import { reqCategoryList } from "../../api";
import NavLeft from "./nav_left/nav_left.jsx";
import Home from "../../components/home/home.jsx";
import Category from "../category/category";
import Bar from "../bar/bar";
import Line from "../line/line";
import Pie from "../pie/pie";
import Product from "../product/product";
import User from "../user/user";
import Role from "../role/role";
import Header from "./header/header";
import "../admin/css/admin.less";

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  logout = () => {
    this.props.deleteUserInfo();
  };
  //在render里若想实现跳转 最好用redirect
  render() {
    const { isLogin } = this.props.userInfo;
    if (!isLogin) {
      // this.props.history.replace("/login");
      return <Redirect to="/login" />;
    } else
      return (
        <Layout className="admin">
          <Sider className="sider">
            <NavLeft/>
          </Sider>
          <Layout>
            <Header></Header>
            <Content className="content">
              <Switch>
                <Route path="/admin/home" component={Home} />
                <Route path="/admin/prod_about/category" component={Category} />
                <Route path="/admin/prod_about/product" component={Product} />
                <Route path="/admin/role" component={Role} />
                <Route path="/admin/user" component={User} />
                <Route path="/admin/charts/pie" component={Pie} />
                <Route path="/admin/charts/line" component={Line} />
                <Route path="/admin/charts/bar" component={Bar} />
                <Redirect to="/admin/home"/>
              </Switch>
            </Content>
            <Footer className="footer">React + AntD</Footer>
          </Layout>
        </Layout>
      );
  }
}
export default connect((state) => ({ userInfo: state.userInfo }), {
  deleteUserInfo: createDeleteUserInfoAction,
})(Admin);
