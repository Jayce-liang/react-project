import axios from "axios";
import store from "../redux/store";
import { createDeleteUserInfoAction } from "../redux/actions/logout_action";
import qs from "querystring";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { message } from "antd";
import "antd/dist/antd.less";

nProgress.configure({ minimum: 0.7 });

//创建拦截器
const myAxios = axios.create({
  //设置超时
  timeout: 5000,
});

//请求拦截器
myAxios.interceptors.request.use((config) => {
  nProgress.start();
  //获取token
  const token = store.getState().userInfo.token;
  if (token) {
    config.headers.Authorization = token;
  }
  const { method } = config;
  if (method.toLowerCase === "post") {
    if (config.data instanceof Object) {
      //将请求的json数据转为urlencoding
      config.data = qs.stringify(config.data);
    }
  }
  return config;
});

//响应拦截器
myAxios.interceptors.response.use(
  (config) => {
    nProgress.done();
    return config.data;
  },
  (error) => {
    //antd提示错误
    nProgress.done();
    if (error.response && error.response.status === 401) {
      message.error("身份过期！请重新登陆！", 2);
      store.dispatch(createDeleteUserInfoAction());
      return;
    }
    message.error(error.message, 1);
    return new Promise(() => {}); //中断promise链
  }
);

export default myAxios;
