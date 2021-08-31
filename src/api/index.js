//项目中所有请求从这里发出

import myAxios from "./myAxios.js";
import qs from "querystring";

//发起登录请求
export const reqLogin = (username, password) =>
  myAxios.post(
    "http://localhost:3000/login",
    { username, password }
  );
