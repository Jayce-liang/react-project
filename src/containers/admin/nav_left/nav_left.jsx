import React, { Component } from "react";
import { NavLink,withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {createSaveTitleAction} from "../../../redux/actions/saveTitle"
import { Menu } from "antd";
// import * as Icon from '@ant-design/icons';
import meauList from "../../../config/menuConfig.js";
import "../nav_left/css/index.less";
import logo from "../../../static/images/logo.png";

const { SubMenu } = Menu;

class Nav_left extends Component {
  componentDidMount(){
    console.log();
  }

  createMenu = (target) => {
    return target.map((item) => {
      // const icon = React.createElement(Icon[item.icon], {}, null);
      const icon=<item.icon />
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={icon} onClick={()=>this.props.saveTitle(item.title)}>
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
    });
  };
  render() {
    return (
      <div>
        <header className="navLeft_header">
          <img src={logo} alt="logo" />
        </header>
        <Menu className="menu"
          defaultSelectedKeys={this.props.location.pathname.split("/").reverse()[0] === "admin" ? "home":this.props.location.pathname.split("/").reverse()[0]}
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
  state=>({title:state.title}),{
    saveTitle:createSaveTitleAction
  }
)(withRouter(Nav_left))
