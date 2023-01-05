import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Modal, Divider } from "antd";
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  ExclamationCircleOutlined,
  createFromIconfontCN,
} from "@ant-design/icons";
import dayjs from "dayjs";
import screenfull from "screenfull";
import { createDeleteUserInfoAction } from "../../../redux/actions/logout_action";
import "./css/header.less";
import menuList from "../../../config/menuConfig";

class Header extends Component {
  state = {
    isFull: false,
    date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    title: "",
  };

  componentDidMount() {
    screenfull.on("change", () => {
      let isFull = !this.state.isFull;
      this.setState({
        isFull,
      });
    });
    this.timer = setInterval(() => {
      this.setState({
        date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      });
    }, 500);
    //每次挂载后保存title
    this.getTitle();
  }

  componentWillUnmount() {
    //取消定时器
    clearInterval(this.timer);
  }
  fullScreen = () => {
    screenfull.toggle();
  };
  getTitle = () => {
    let pathKey = this.props.location.pathname.split("/").reverse()[0];
    if (this.props.location.pathname.indexOf("product") !== -1)
      pathKey = "product";
    let title = "";
    menuList.forEach((item) => {
      if (item.children instanceof Array) {
        let temp = item.children.find((citem) => {
          return citem.key === pathKey;
        });
        if (temp) title = temp.title;
      } else {
        if (pathKey === item.key) title = item.title;
      }
    });

    this.setState({
      title,
    });
  };
  logout = () => {
    Modal.confirm({
      title: "确定退出？",
      icon: <ExclamationCircleOutlined />,
      content: "退出后需重新登陆！",
      okText: "确认",
      cancelText: "取消",
      onCancel: () => {},
      onOk: () => {
        this.props.deletUserInfo();
      },
    });
  };

  render() {
    const IconFont = createFromIconfontCN({
      scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
    });
    return (
      <header>
        <div className="header_top">
          <Button size="small" onClick={this.fullScreen}>
            {this.state.isFull ? (
              <FullscreenExitOutlined style={{ fontSize: "16px" }} />
            ) : (
              <FullscreenOutlined style={{ fontSize: "16px" }} />
            )}
          </Button>
          <span className="username">
            欢迎,{this.props.userInfo.user.username}
          </span>
          <Button
            type="primary"
            size="middle"
            onClick={this.logout}
            style={{
              fontSize: "16px",
              textAlign: "center",
              backgroundColor: "#ff461f",
            }}
          >
            <IconFont type="icon-tuichu" />
            退出
          </Button>
        </div>
        <Divider className="divider"></Divider>
        <div className="header_bottom">
          <div className="header_bottom_left">
            {this.props.title || this.state.title}
          </div>
          <div className="header_bottom_right">
            {this.state.date}
            <img src="" alt="tianqi" />晴
          </div>
        </div>
      </header>
    );
  }
}

export default connect(
  (state) => ({ userInfo: state.userInfo, title: state.title }),
  {
    deletUserInfo: createDeleteUserInfoAction,
  }
)(withRouter(Header));
