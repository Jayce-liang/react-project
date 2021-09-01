//项目中所有请求从这里发出
import myAxios from "./myAxios.js";
import {BASE_URL} from "../config/index"
//发起登录请求
export const reqLogin = (username, password) =>
  myAxios.post(`${BASE_URL}/login`, { username, password });


//发起商品列表请求
export const reqCategoryList = () =>
  myAxios.get(`${BASE_URL}/manage/category/list`);

