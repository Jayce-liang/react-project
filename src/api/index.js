//项目中所有请求从这里发出
import myAxios from "./myAxios.js";
import { BASE_URL } from "../config/index";
//发起登录请求
export const reqLogin = (username, password) =>
  myAxios.post(`${BASE_URL}/login`, { username, password });

//发起商品列表请求
export const reqCategoryList = () =>
  myAxios.get(`${BASE_URL}/manage/category/list`);

//weather
// export const reqWeather = () =>
//   axios.get(`${A_MAP_URL}/v3/weather/weatherInfo`, {
//     params: {
//       key: A_MAP_KEY,
//       city: CITY_CODE,
//       output: "JSON",
//       extensions: "base",
//     },
//   });
// jsonp(`${A_MAP_URL}/v3/weather/weatherInfo`,(data)=>{
//   let result=JSON.stringify(data)
// console.log(result);
// });

//发起新增分类请求
export const reqAddCategory = ({ categoryName }) =>
  myAxios.post(`${BASE_URL}/manage/category/add`, { categoryName });

//发起更新分类请求
export const reqUpdateCategory = ({ categoryName, categoryId }) =>
  myAxios.post(`${BASE_URL}/manage/category/update`, {
    categoryName,
    categoryId,
  });

//发起商品数据
export const reqProductList = (pageNum, pageSize) =>
  myAxios.get(`${BASE_URL}/manage/product/list`, {
    params: { pageNum, pageSize },
  });

//请求更新商品状态
export const reqUpdateProdStatus = (productId, status) =>
  myAxios.post(`${BASE_URL}/manage/product/updateStatus`, {
    productId,
    status,
  });

//搜索
export const reqSearchProduct = (pageNum, pageSize, searchType, keyword) =>
  myAxios.get(`${BASE_URL}/manage/product/search`, {
    params: { pageNum, pageSize, [searchType]: keyword },
  });
