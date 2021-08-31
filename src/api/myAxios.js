import axios from "axios";
import { loadConfig } from "browserslist";
import qs from "querystring";

import { message } from "antd";
import "antd/dist/antd.less";
//创建拦截器

const myAxios = axios.create({
  //设置超时
  timeout: 5000,
});

//请求拦截器
myAxios.interceptors.request.use((config) => {
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
    return config.data;
  },
  (error) => {
    //antd提示错误
    message.error(error.message, 1);
    return new Promise(() => {}); //中断promise链
  }
);

export default myAxios;
