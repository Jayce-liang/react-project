import { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "antd";
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import screenfull from "screenfull";
import { reqWeather } from "../../../api/index";
import { createDeleteUserInfoAction } from "../../../redux/actions/logout_action";
import "./css/header.less";

class Header extends Component {
  state = {
    isFull: false,
    date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  };

  componentDidMount() {
    screenfull.on("change", () => {
      let isFull = !this.state.isFull;
      this.setState({
        isFull,
      });
    });
    setInterval(() => {
      this.setState({
        date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      });
    }, 500);
    reqWeather();
  }

  fullScreen = () => {
    screenfull.toggle();
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
          <Button type="primary" size="middle" onClick={this.logout}>
            退出
          </Button>
        </div>

        <div className="header_bottom">
          <div className="header_bottom_left">柱状图</div>
          <div className="header_bottom_right">
            {this.state.date}
            <img
              src="http://www.weather.com.cn/m/i/weatherpic/29x20/d0.gif"
              alt="tianqi"
            />
            qing 26du
          </div>
        </div>
      </header>
    );
  }
}

export default connect((state) => ({ userInfo: state.userInfo }), {
  deletUserInfo: createDeleteUserInfoAction,
})(Header);
