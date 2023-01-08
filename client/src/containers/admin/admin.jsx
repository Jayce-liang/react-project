import { Layout } from "antd";
import { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { createDeleteUserInfoAction } from "../../redux/actions/logout_action.js";
import NavLeft from "./nav_left/nav_left.jsx";
import Home from "../../components/home/home.jsx";
import Category from "../category/category";
import Bar from "../../components/bar/bar";
import Line from "../../components/line/line";
import Pie from "../../components/pie/pie";
import Product from "../product/product";
import Detail from "../product/detail";
import AddUpdate from "../product/add_update";
import User from "../user/user";
import Role from "../role/role";
import Header from "./header/header";
import NotFound from "../../components/404";
import "../admin/css/admin.less";

const { Footer, Sider, Content } = Layout;

class Admin extends PureComponent {
  logout = () => {
    this.props.deleteUserInfo();
  };

  hasAuth = () => {
    const { username } = this.props.userInfo.user;
    const { menus } = this.props.userInfo.user.role;
    if (username === "admin") {
      return 1;
    }
    // console.log(menus);
    const routerList = this.props.location.pathname.split("/").slice(2);
    // console.log("---------", routerList);
    const result = routerList.every((element) => {
      return menus.indexOf(element) !== -1;
    });
    return result;
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
          <Sider
            className="sider"
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
            }}
          >
            <NavLeft />
          </Sider>
          <Layout style={{ marginLeft: 200, minHeight: "100vh" }}>
            <Header></Header>
            <Content className="content" style={{ margin: "10px 16px 0" }}>
              {this.hasAuth() ? (
                <Switch>
                  <Route path="/admin" component={Home} exact />
                  <Route path="/admin/home" component={Home} exact />
                  <Route
                    path="/admin/prod_about/category"
                    component={Category}
                    exact
                  />
                  <Route
                    path="/admin/prod_about/product"
                    component={Product}
                    exact
                  />
                  <Route
                    path="/admin/prod_about/product/detail"
                    component={Detail}
                    exact
                  />
                  <Route
                    path="/admin/prod_about/product/add_update"
                    component={AddUpdate}
                    exact
                  />
                  <Route
                    path="/admin/prod_about/product/detail/:id"
                    component={Detail}
                    exact
                  />
                  <Route
                    path="/admin/prod_about/product/add_update/:id"
                    component={AddUpdate}
                    exact
                  />
                  <Route path="/admin/role" component={Role} exact />
                  <Route path="/admin/user" component={User} exact />
                  <Route path="/admin/charts/pie" component={Pie} exact />
                  <Route path="/admin/charts/line" component={Line} exact />
                  <Route path="/admin/charts/bar" component={Bar} exact />
                  <Route path="*" component={NotFound} exact />
                  {/* <Redirect to="/admin/404-notFound" /> */}
                </Switch>
              ) : (
                <>
                  <Route path="*" component={NotFound} />
                  {/* <Redirect to="/admin/404-notFound" /> */}
                </>
              )}
            </Content>
            <Footer className="footer" style={{ maxHeight: 80 }}>
              React - Ant Design ©2021 Creat By Jayce
            </Footer>
          </Layout>
        </Layout>
      );
  }
}
export default connect((state) => ({ userInfo: state.userInfo }), {
  deleteUserInfo: createDeleteUserInfoAction,
})(Admin);
