import { Layout} from "antd";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { createDeleteUserInfoAction } from "../../redux/actions/logout_action.js";
import NavLeft from "./nav_left/nav_left.jsx";
import Home from "../../components/home/home.jsx";
import Category from "../category/category";
import Bar from "../bar/bar";
import Line from "../line/line";
import Pie from "../pie/pie";
import Product from "../product/product";
import Detail from "../product/detail";
import AddUpdate from "../product/add_update";
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
            <Content className="content" style={{ margin: "10px 16px 0"}}>
              <Switch>
                <Route path="/admin/home" component={Home} />
                <Route path="/admin/prod_about/category" component={Category} />
                <Route path="/admin/prod_about/product" component={Product}  exact/>
                <Route path="/admin/prod_about/product/detail" component={Detail} exact/>
                <Route path="/admin/prod_about/product/add_update" component={AddUpdate} exact/>
                <Route path="/admin/prod_about/product/detail/:id" component={Detail}/>
                <Route path="/admin/prod_about/product/add_update/:id" component={AddUpdate}/>
                <Route path="/admin/role" component={Role} />
                <Route path="/admin/user" component={User} />
                <Route path="/admin/charts/pie" component={Pie} />
                <Route path="/admin/charts/line" component={Line} />
                <Route path="/admin/charts/bar" component={Bar} />
                <Redirect to="/admin/home" />
              </Switch>
            </Content>
            <Footer className="footer" style={{maxHeight:80}}>React - Ant Design ©2021 Creat By Jayce</Footer>
          </Layout>
        </Layout>
      );
  }
}
export default connect((state) => ({ userInfo: state.userInfo }), {
  deleteUserInfo: createDeleteUserInfoAction,
})(Admin);
