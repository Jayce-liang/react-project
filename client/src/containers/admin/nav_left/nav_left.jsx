import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createSaveTitleAction } from "../../../redux/actions/saveTitle";
import { Menu } from "antd";
// import * as Icon from '@ant-design/icons';
import meauList from "../../../config/menuConfig.js";
import "../nav_left/css/index.less";
import logo from "../../../static/images/logo.png";

const { SubMenu } = Menu;
class Nav_left extends Component {
  //判断是否有权限
  hasAuth = (item) => {
    //username:当前用户；menus：当前用户所能访问的菜单
    const { username, menus } = this.props;
    if (username === "admin") {
      //允许admin访问所有菜单
      return true;
    } else if (!item.children) {
      //如果没有子菜单
      return menus.find((menusItem) => menusItem === item.key);
    } else if (item.children) {
      //如果有子菜单;数组的some方法返回一个Boolean
      return item.children.some(
        (childrenItem) => menus.indexOf(childrenItem.key) !== -1
      );
    }
  };

  createMenu = (target) => {
    return target.map((item) => {
      // const icon = React.createElement(Icon[item.icon], {}, null);
      const icon = <item.icon />;
      //遍历菜单元素之前，判断当前用户是否有权限访问
      if (this.hasAuth(item)) {
        if (!item.children) {
          return (
            <Menu.Item
              key={item.key}
              icon={icon}
              onClick={() => this.props.saveTitle(item.title)}
            >
              <NavLink to={item.path}>{item.title}</NavLink>
            </Menu.Item>
          );
        } else {
          return (
            <SubMenu key={item.key} title={item.title} icon={icon}>
              {this.createMenu(item.children)}
            </SubMenu>
          );
        }
      } else return null;
    });
  };

  selectTitle = () => {
    const pathname = this.props.location.pathname;
    if (pathname.split("/").reverse()[0] === "admin") return "home";
    if (pathname.indexOf("product") !== -1) {
      const reg = /product$/;
      if (pathname.indexOf("product/detail") !== -1) return "product";
      if (pathname.indexOf("product/add_update") !== -1) return "product";
      if (reg.test(pathname)) return "product";
    } else return pathname.split("/").reverse()[0];
  };

  render() {
    return (
      <div>
        <header className="navLeft_header">
          <img src={logo} alt="logo" />
        </header>
        <Menu
          className="menu"
          defaultSelectedKeys={this.selectTitle}
          defaultOpenKeys={this.props.location.pathname.split("/").splice(2)}
          mode="inline"
          theme="dark"
        >
          {this.createMenu(meauList)}
        </Menu>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    title: state.title,
    menus: state.userInfo.user.role.menus,
    username: state.userInfo.user.username,
  }),
  {
    saveTitle: createSaveTitleAction,
  }
)(withRouter(Nav_left));
