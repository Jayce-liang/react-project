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


// 商品
   


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

//根据id获取商品列表
export const reqProductByID = (productId) =>
  myAxios.get(`${BASE_URL}/manage/product/info`, {
    params: { productId },
  });

//删除图片
export const reqDeleteImage = (name) =>
  myAxios.post(`${BASE_URL}/manage/img/delete`, { name });

//添加商品
export const reqAddProduct = (productObj) =>
  myAxios.post(`${BASE_URL}/manage/product/add`, { ...productObj });

//更新商品
export const reqUpdateProduct = (productObj) =>
  myAxios.post(`${BASE_URL}/manage/product/update`, { ...productObj });



// 角色

//获取角色列表
export const reqRoleList = (pageNum, pageSize) =>
  myAxios.get(`${BASE_URL}/manage/role/list`, {
    params: { pageNum, pageSize },
  });

//添加角色
export const reqAddRole = ({ roleName }) =>
  myAxios.post(`${BASE_URL}/manage/role/add`, { roleName });

//给角色授权
export const reqAuthRole = (authObj) =>
  myAxios.post(`${BASE_URL}/manage/role/update`, {
    ...authObj,
    auth_time: Date.now(),
  });

// 用户


//请求获取所有用户列表（同时返回了roleList）

export const reqUserList = () => myAxios.get(`${BASE_URL}/manage/user/list`);

//请求添加用户
export const reqAddUser = (userObj) =>
  myAxios.post(`${BASE_URL}/manage/user/add`, { ...userObj });

//请求更新用户
export const reqUpdateUser = (userObj) =>
  myAxios.post(`${BASE_URL}/manage/user/update`, { ...userObj });

//请求删除用户
export const reqDelUser = (userId) =>
  myAxios.post(`${BASE_URL}/manage/user/delete`, { userId });
