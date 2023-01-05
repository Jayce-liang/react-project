/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MongoDB
 Source Server Version : 40406
 Source Host           : localhost:27017
 Source Schema         : admin_db

 Target Server Type    : MongoDB
 Target Server Version : 40406
 File Encoding         : 65001

 Date: 30/06/2021 17:26:49
*/


// ----------------------------
// Collection structure for categorys
// ----------------------------
db.getCollection("categorys").drop();
db.createCollection("categorys");

// ----------------------------
// Documents of categorys
// ----------------------------
db.getCollection("categorys").insert([ {
    _id: ObjectId("60d43efd410d483f08d2ad8b"),
    parentId: "0",
    name: "家电",
    __v: NumberInt("0")
} ]);
db.getCollection("categorys").insert([ {
    _id: ObjectId("60d43f1c410d483f08d2ad8c"),
    parentId: "0",
    name: "手机、运营商、数码",
    __v: NumberInt("0")
} ]);
db.getCollection("categorys").insert([ {
    _id: ObjectId("60d43f28410d483f08d2ad8d"),
    parentId: "0",
    name: "电脑、办公",
    __v: NumberInt("0")
} ]);
db.getCollection("categorys").insert([ {
    _id: ObjectId("60d43f58410d483f08d2ad8e"),
    parentId: "0",
    name: "家居、家具、家装、厨具",
    __v: NumberInt("0")
} ]);
db.getCollection("categorys").insert([ {
    _id: ObjectId("60d43f79410d483f08d2ad8f"),
    parentId: "0",
    name: "男装、女装、童装、内衣",
    __v: NumberInt("0")
} ]);
db.getCollection("categorys").insert([ {
    _id: ObjectId("60d440df410d483f08d2ad90"),
    parentId: "0",
    name: "美妆、个护清洁、宠物",
    __v: NumberInt("0")
} ]);
db.getCollection("categorys").insert([ {
    _id: ObjectId("60d440f4410d483f08d2ad91"),
    parentId: "0",
    name: "女鞋、箱包、钟表、珠宝",
    __v: NumberInt("0")
} ]);
db.getCollection("categorys").insert([ {
    _id: ObjectId("60d440fe410d483f08d2ad92"),
    parentId: "0",
    name: "男鞋、运动、户外",
    __v: NumberInt("0")
} ]);
db.getCollection("categorys").insert([ {
    _id: ObjectId("60d4410a410d483f08d2ad93"),
    parentId: "0",
    name: "房产、汽车、汽车用品",
    __v: NumberInt("0")
} ]);
db.getCollection("categorys").insert([ {
    _id: ObjectId("60d44119410d483f08d2ad94"),
    parentId: "0",
    name: "母婴、玩具乐器",
    __v: NumberInt("0")
} ]);
db.getCollection("categorys").insert([ {
    _id: ObjectId("60d4412a410d483f08d2ad95"),
    parentId: "0",
    name: "食品、酒类、生鲜、特产",
    __v: NumberInt("0")
} ]);
db.getCollection("categorys").insert([ {
    _id: ObjectId("60d4413f410d483f08d2ad96"),
    parentId: "0",
    name: "艺术、礼品鲜花、农资绿植",
    __v: NumberInt("0")
} ]);
db.getCollection("categorys").insert([ {
    _id: ObjectId("60d4414e410d483f08d2ad97"),
    parentId: "0",
    name: "医药保健、计生情趣",
    __v: NumberInt("0")
} ]);
db.getCollection("categorys").insert([ {
    _id: ObjectId("60d4415b410d483f08d2ad98"),
    parentId: "0",
    name: "图书、文娱、教育、电子书",
    __v: NumberInt("0")
} ]);
db.getCollection("categorys").insert([ {
    _id: ObjectId("60d4416e410d483f08d2ad99"),
    parentId: "0",
    name: "机票、酒店、旅游、生活",
    __v: NumberInt("0")
} ]);
db.getCollection("categorys").insert([ {
    _id: ObjectId("60d4417e410d483f08d2ad9a"),
    parentId: "0",
    name: "理财、众筹、白条、保险",
    __v: NumberInt("0")
} ]);
db.getCollection("categorys").insert([ {
    _id: ObjectId("60d44184410d483f08d2ad9b"),
    parentId: "0",
    name: "工业品",
    __v: NumberInt("0")
} ]);
db.getCollection("categorys").insert([ {
    _id: ObjectId("60d44193410d483f08d2ad9c"),
    parentId: "0",
    name: "安装、维修、清洗、二手",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for products
// ----------------------------
db.getCollection("products").drop();
db.createCollection("products");

// ----------------------------
// Documents of products
// ----------------------------
db.getCollection("products").insert([ {
    _id: ObjectId("60d5810f5dfbfa1d900b2f50"),
    status: NumberInt("2"),
    imgs: [
        "image-1573704320547.jpg"
    ],
    categoryId: "60d43f1c410d483f08d2ad8c",
    name: "小米手机",
    price: NumberInt("2888"),
    desc: "为发烧而生",
    detail: "<p>机身颜色:星河银</p>\n<p>机身长度（mm）:160.8</p>\n<p>机身重量（g）:196克（含电池） 备注：实际重量依配置、制造工艺、测量方法的不同可能有所差异。</p>\n<p>机身材质工艺:其他</p>\n<p>机身宽度（mm）:76.1</p>\n<p>机身材质分类:金属边框；玻璃后盖</p>\n<p>机身厚度（mm）:8.4</p>\n<p>运营商标志或内容:无</p>\n",
    __v: NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("60d581e05dfbfa1d900b2f51"),
    status: NumberInt("1"),
    imgs: [
        "image-1573704320547.jpg"
    ],
    categoryId: "60d43f1c410d483f08d2ad8c",
    name: "华为手机",
    price: NumberInt("3888"),
    desc: "谁不买，就是不爱国",
    detail: "<p>机身颜色:星河银</p>\n<p>机身长度（mm）:160.8</p>\n<p>机身重量（g）:196克（含电池） 备注：实际重量依配置、制造工艺、测量方法的不同可能有所差异。</p>\n<p>机身材质工艺:其他</p>\n<p>机身宽度（mm）:76.1</p>\n<p>机身材质分类:金属边框；玻璃后盖</p>\n<p>机身厚度（mm）:8.4</p>\n<p>运营商标志或内容:无</p>\n",
    __v: NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("60d582055dfbfa1d900b2f52"),
    status: NumberInt("1"),
    imgs: [
        "image-1573704320547.jpg"
    ],
    categoryId: "60d43f1c410d483f08d2ad8c",
    name: "oppo手机",
    price: NumberInt("2886"),
    desc: "性能很好的啊",
    detail: "<p>机身颜色:星河银</p>\n<p>机身长度（mm）:160.8</p>\n<p>机身重量（g）:196克（含电池） 备注：实际重量依配置、制造工艺、测量方法的不同可能有所差异。</p>\n<p>机身材质工艺:其他</p>\n<p>机身宽度（mm）:76.1</p>\n<p>机身材质分类:金属边框；玻璃后盖</p>\n<p>机身厚度（mm）:8.4</p>\n<p>运营商标志或内容:无</p>\n",
    __v: NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("60d582255dfbfa1d900b2f53"),
    status: NumberInt("1"),
    imgs: [
        "image-1573704320547.jpg"
    ],
    categoryId: "60d43f28410d483f08d2ad8d",
    name: "苹果手机",
    price: NumberInt("8888"),
    desc: "苹果手机就是香啊",
    detail: "<p>机身颜色:星河银</p>\n<p>机身长度（mm）:160.8</p>\n<p>机身重量（g）:196克（含电池） 备注：实际重量依配置、制造工艺、测量方法的不同可能有所差异。</p>\n<p>机身材质工艺:其他</p>\n<p>机身宽度（mm）:76.1</p>\n<p>机身材质分类:金属边框；玻璃后盖</p>\n<p>机身厚度（mm）:8.4</p>\n<p>运营商标志或内容:无</p>\n",
    __v: NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("60d582315dfbfa1d900b2f54"),
    status: NumberInt("1"),
    imgs: [
        "image-1573704320547.jpg"
    ],
    categoryId: "60d43f28410d483f08d2ad8d",
    name: "测试1",
    price: NumberInt("1"),
    desc: "1元手机",
    detail: "<p>机身颜色:星河银</p>\n<p>机身长度（mm）:160.8</p>\n<p>机身重量（g）:196克（含电池） 备注：实际重量依配置、制造工艺、测量方法的不同可能有所差异。</p>\n<p>机身材质工艺:其他</p>\n<p>机身宽度（mm）:76.1</p>\n<p>机身材质分类:金属边框；玻璃后盖</p>\n<p>机身厚度（mm）:8.4</p>\n<p>运营商标志或内容:无</p>\n",
    __v: NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("60d582375dfbfa1d900b2f55"),
    status: NumberInt("2"),
    imgs: [
        "image-1573704320547.jpg"
    ],
    categoryId: "60d43f28410d483f08d2ad8d",
    name: "测试2",
    price: NumberInt("1"),
    desc: "2元手机",
    detail: "<p>机身颜色:星河银</p>\n<p>机身长度（mm）:160.8</p>\n<p>机身重量（g）:196克（含电池） 备注：实际重量依配置、制造工艺、测量方法的不同可能有所差异。</p>\n<p>机身材质工艺:其他</p>\n<p>机身宽度（mm）:76.1</p>\n<p>机身材质分类:金属边框；玻璃后盖</p>\n<p>机身厚度（mm）:8.4</p>\n<p>运营商标志或内容:无</p>\n",
    __v: NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("60d5823d5dfbfa1d900b2f56"),
    status: NumberInt("2"),
    imgs: [
        "image-1573704320547.jpg"
    ],
    categoryId: "60d43f28410d483f08d2ad8d",
    name: "测试3",
    price: NumberInt("1"),
    desc: "3元手机",
    detail: "<p>机身颜色:星河银</p>\n<p>机身长度（mm）:160.8</p>\n<p>机身重量（g）:196克（含电池） 备注：实际重量依配置、制造工艺、测量方法的不同可能有所差异。</p>\n<p>机身材质工艺:其他</p>\n<p>机身宽度（mm）:76.1</p>\n<p>机身材质分类:金属边框；玻璃后盖</p>\n<p>机身厚度（mm）:8.4</p>\n<p>运营商标志或内容:无</p>\n",
    __v: NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("60d582435dfbfa1d900b2f57"),
    status: NumberInt("1"),
    imgs: [
        "image-1573704320547.jpg"
    ],
    categoryId: "60d43f28410d483f08d2ad8d",
    name: "测试4",
    price: NumberInt("1"),
    desc: "4元手机",
    detail: "<p>机身颜色:星河银</p>\n<p>机身长度（mm）:160.8</p>\n<p>机身重量（g）:196克（含电池） 备注：实际重量依配置、制造工艺、测量方法的不同可能有所差异。</p>\n<p>机身材质工艺:其他</p>\n<p>机身宽度（mm）:76.1</p>\n<p>机身材质分类:金属边框；玻璃后盖</p>\n<p>机身厚度（mm）:8.4</p>\n<p>运营商标志或内容:无</p>\n",
    __v: NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("60d5824c5dfbfa1d900b2f58"),
    status: NumberInt("1"),
    imgs: [
        "image-1573704320547.jpg"
    ],
    categoryId: "60d43f28410d483f08d2ad8d",
    name: "测试5",
    price: NumberInt("1"),
    desc: "5元手机",
    detail: "<p>机身颜色:星河银</p>\n<p>机身长度（mm）:160.8</p>\n<p>机身重量（g）:196克（含电池） 备注：实际重量依配置、制造工艺、测量方法的不同可能有所差异。</p>\n<p>机身材质工艺:其他</p>\n<p>机身宽度（mm）:76.1</p>\n<p>机身材质分类:金属边框；玻璃后盖</p>\n<p>机身厚度（mm）:8.4</p>\n<p>运营商标志或内容:无</p>\n",
    __v: NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("60d582545dfbfa1d900b2f59"),
    status: NumberInt("1"),
    imgs: [
        "image-1573704320547.jpg"
    ],
    categoryId: "60d43f28410d483f08d2ad8d",
    name: "测试6",
    price: NumberInt("1"),
    desc: "6元手机",
    detail: "<p>机身颜色:星河银</p>\n<p>机身长度（mm）:160.8</p>\n<p>机身重量（g）:196克（含电池） 备注：实际重量依配置、制造工艺、测量方法的不同可能有所差异。</p>\n<p>机身材质工艺:其他</p>\n<p>机身宽度（mm）:76.1</p>\n<p>机身材质分类:金属边框；玻璃后盖</p>\n<p>机身厚度（mm）:8.4</p>\n<p>运营商标志或内容:无</p>\n",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for roles
// ----------------------------
db.getCollection("roles").drop();
db.createCollection("roles");

// ----------------------------
// Documents of roles
// ----------------------------
db.getCollection("roles").insert([ {
    _id: ObjectId("60dc0e2a82cf3b00549fb0ba"),
    menus: [
        "products",
        "category",
        "product"
    ],
    name: "商品管理员",
    "create_time": 1625034282420,
    __v: NumberInt("0"),
    "auth_name": "admin",
    "auth_time": 1625034380040
} ]);
db.getCollection("roles").insert([ {
    _id: ObjectId("60dc0e7782cf3b00549fb0bb"),
    menus: [
        "charts",
        "bar",
        "line",
        "pie"
    ],
    name: "图表管理员",
    "create_time": 1625034359699,
    __v: NumberInt("0"),
    "auth_name": "admin",
    "auth_time": 1625034372997
} ]);
db.getCollection("roles").insert([ {
    _id: ObjectId("60dc0ea482cf3b00549fb0bc"),
    menus: [
        "home",
        "category",
        "user",
        "bar",
        "pie"
    ],
    name: "特殊管理员",
    "create_time": 1625034404776,
    __v: NumberInt("0"),
    "auth_name": "admin",
    "auth_time": 1625034418733
} ]);
db.getCollection("roles").insert([ {
    _id: ObjectId("60dc10c582cf3b00549fb0bd"),
    menus: [
        "home"
    ],
    name: "首页管理员",
    "create_time": 1625034949872,
    __v: NumberInt("0"),
    "auth_name": "admin",
    "auth_time": 1625034954330
} ]);

// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");

// ----------------------------
// Documents of users
// ----------------------------
db.getCollection("users").insert([ {
    _id: ObjectId("60d1342029ac623e1cbba92a"),
    username: "admin",
    password: "21232f297a57a5a743894a0e4a801fc3",
    "create_time": 1624323104488,
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("60dc34244d994523200f911e"),
    username: "shouye",
    password: "e10adc3949ba59abbe56e057f20f883e",
    email: "shouye",
    phone: "shouye",
    "role_id": "60dc10c582cf3b00549fb0bd",
    "create_time": 1625044004292,
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("60dc34374d994523200f911f"),
    username: "teshu",
    password: "e10adc3949ba59abbe56e057f20f883e",
    email: "teshu",
    phone: "teshu",
    "role_id": "60dc0ea482cf3b00549fb0bc",
    "create_time": 1625044023748,
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("60dc38984d994523200f9120"),
    username: "shangping",
    password: "e10adc3949ba59abbe56e057f20f883e",
    email: "shangping",
    phone: "shangping",
    "role_id": "60dc0e2a82cf3b00549fb0ba",
    "create_time": 1625045144256,
    __v: NumberInt("0")
} ]);
