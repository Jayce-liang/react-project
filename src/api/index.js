import jsonp from "jsonp"
//项目中所有请求从这里发出
import myAxios from "./myAxios.js";
import {BASE_URL,WEATHER_URL,CITY} from "../config/index"
//发起登录请求
export const reqLogin = (username, password) =>
  myAxios.post(`${BASE_URL}/login`, { username, password });


//发起商品列表请求
export const reqCategoryList = () =>
  myAxios.get(`${BASE_URL}/manage/category/list`,(err,data)=>{
    console.log(data);
  });

//weather

export const reqWeather= () =>
  jsonp(`http://www.weather.com.cn/data/sk/101010100.html?callback=__jp0`);
