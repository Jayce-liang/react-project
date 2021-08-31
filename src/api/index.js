//项目中所有请求从这里发出
import myAxios from "./myAxios.js";

//发起登录请求
export const reqLogin = (username, password) =>
  myAxios.post(`/login`, { username, password });
