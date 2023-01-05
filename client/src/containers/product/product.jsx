import { Component } from "react";
import { Card, Button, message, Select, Input, Tooltip, Table } from "antd";
import { PlusSquareOutlined, SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { creatProductAction } from "../../redux/actions/product_action";
import {
  reqProductList,
  reqUpdateProdStatus,
  reqSearchProduct,
} from "../../api/index";
import { PAGE_SIZE } from "../../config/index";
const { Option } = Select;
class Product extends Component {
  state = {
    total: "", //数据总数
    current: 1, //当前在哪一页
    productList: [], //数据
    keyword: "", //搜索关键字
    searchType: "productName", //搜索类型
    isLoading: true,
  };
  componentDidMount() {
    this.getProductList();
  }
  getProductList = async (pageNum = 1) => {
    let reasult;
    if (this.isSearch) {
      const { searchType, keyword } = this.state;
      reasult = await reqSearchProduct(pageNum, PAGE_SIZE, searchType, keyword);
    } else {
      reasult = await reqProductList(pageNum, PAGE_SIZE);
    }

    let { status, data } = reasult;
    if (status === 0) {
      this.setState({
        total: data.total,
        productList: data.list,
        current: data.pageNum,
        isLoading: false,
      });
      this.props.saveProduct(data.list);
    } else message.error("请求数据失败", 2);
  };

  updateProdStatus = async (item) => {
    let { _id, status } = item;
    if (status === 1) status = 2;
    else status = 1;
    const reasult = await reqUpdateProdStatus(_id, status);
    if (reasult.status === 0) {
      message.success("更新状态成功", 2);
      let productList = [...this.state.productList];
      productList = productList.map((item) => {
        if (item._id === _id) {
          item.status = status;
        }
        return item;
      });
      this.setState({
        productList,
      });
    } else message.error("更新状态失败", 2);
  };

  search = async () => {
    this.isSearch = true;
    this.getProductList();
  };

  render() {
    const dataSource = this.state.productList;

    const columns = [
      {
        title: "商品名称",
        width: "20%",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "商品描述",
        dataIndex: "desc",
        key: "desc",
      },
      {
        title: "价格",
        width: "10%",
        align: "center",
        dataIndex: "price",
        key: "price",
        render: (price) => "￥" + price,
      },
      {
        title: "状态",
        width: "10%",
        align: "center",
        // dataIndex: "status",
        key: "status",
        render: (item) => (
          <>
            <Button
              type={item.status === 1 ? "danger" : "primary"}
              onClick={() => this.updateProdStatus(item)}
            >
              {item.status === 1 ? "停售" : "上架"}
            </Button>
            <br />
            <Button
              type="text"
              disabled
              style={
                item.status === 1 ? { color: "#41b883" } : { color: "#ff4e20" }
              }
            >
              {item.status === 1 ? "在售" : "已下架"}
            </Button>
          </>
        ),
      },
      {
        title: "操作",
        width: "10%",
        align: "center",
        // dataIndex: "opera",
        key: "opera",
        render: (item) => (
          <>
            <Button
              type="link"
              onClick={() =>
                this.props.history.push(
                  `/admin/prod_about/product/detail/${item._id}`
                )
              }
            >
              详情
            </Button>
            <br />
            <Button
              type="link"
              onClick={() =>
                this.props.history.push(
                  `/admin/prod_about/product/add_update/${item._id}`
                )
              }
            >
              修改
            </Button>
          </>
        ),
      },
    ];
    return (
      <>
        <Card
          title={
            <>
              <Select
                defaultValue="productName"
                onChange={(value) => this.setState({ searchType: value })}
              >
                <Option value="productName">按名称搜索</Option>
                <Option value="productDesc">按描述搜索</Option>
              </Select>
              <Input
                placeholder="Basic usage"
                allowClear
                style={{ width: 250, margin: "0 20px" }}
                onChange={(event) =>
                  this.setState({ keyword: event.target.value })
                }
              />
              <Tooltip title="search">
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={this.search}
                >
                  Search
                </Button>
              </Tooltip>
            </>
          }
          extra={
            <Button
              type="primary"
              onClick={() =>
                this.props.history.push("/admin/prod_about/product/add_update/")
              }
            >
              <PlusSquareOutlined />
              添加商品
            </Button>
          }
          style={{ width: "100%" }}
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey="_id"
            sticky
            loading={this.state.isLoading}
            pagination={{
              total: this.state.total,
              pageSize: PAGE_SIZE,
              current: this.state.current,
              onChange: this.getProductList,
            }}
          />
        </Card>
      </>
    );
  }
}
export default connect((state) => ({}), { saveProduct: creatProductAction })(
  Product
);
