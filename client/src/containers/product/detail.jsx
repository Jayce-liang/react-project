import React, { Component } from "react";
import { Button, Card, List, message } from "antd";
import { connect } from "react-redux";
import { LeftOutlined } from "@ant-design/icons";
import { reqProductByID, reqCategoryList } from "../../api/index";
import "./css/detail.less";

class Detail extends Component {
  state = {
    categoryId: "",
    categoryName: "",
    detail: "",
    price: "",
    imgs: [],
    name: "",
    desc: "",
    isLoading: true,
  };
  componentDidMount() {
    const reduxProductList = this.props.productList;
    const reduxCategoryList = this.props.categoryList;
    const { id } = this.props.match.params;

    if (reduxProductList) {
      const reasult = reduxProductList.find((item) => item._id === id);
      this.setState({ ...reasult }, () => {
        if (reduxCategoryList) {
          const reasult = reduxCategoryList.find(
            (item) => item._id === this.state.categoryId
          );
          this.setState({
            categoryName: reasult.name,
            isLoading: false,
          });
        } else this.getCategoryName();
      });
    } else {
      this.getProductionById(id);
      this.getCategoryName();
    }
  }
  getProductionById = async (id) => {
    const reasult = await reqProductByID(id);
    if (reasult.status === 0)
      this.setState({ ...reasult.data, isLoading: false });
    else message.error("error", 2);
  };

  getCategoryName = async () => {
    const reasult = await reqCategoryList();
    if (reasult.status === 0) {
      let result = reasult.data.find((item) => {
        return item._id === this.state.categoryId;
      });
      this.setState({
        categoryName: result.name,
        isLoading: false,
      });
    } else message.error("error", 2);
  };
  render() {
    return (
      <>
        <Card
          loading={this.state.isLoading}
          title={
            <>
              <Button
                className="goBackButton"
                type="primary"
                size="small"
                onClick={() => this.props.history.goBack()}
              >
                <LeftOutlined />
              </Button>
              <span className="title">商品详情</span>
            </>
          }
        >
          <List bordered>
            <List.Item>
              <span className="prod_name">商品名称:{this.state.name}</span>
            </List.Item>
            <List.Item>
              <span className="prod_name">商品描述:{this.state.desc}</span>
            </List.Item>
            <List.Item>
              <span className="prod_name">商品价格:{this.state.price}</span>
            </List.Item>
            <List.Item>
              <span className="prod_name">
                商品分类:{this.state.categoryName}
              </span>
            </List.Item>
            <List.Item>
              <span className="prod_name">
                商品图片:
                {this.state.imgs.map((item) => (
                  <img style={{width:200}} key={item} src={"/upload/" + item} alt="商品图片" />
                ))}
              </span>
            </List.Item>
            <List.Item>
              <span className="prod_name">商品详细:</span>
              <div
                className="productDetail"
                dangerouslySetInnerHTML={{ __html: this.state.detail }}
              ></div>
            </List.Item>
          </List>
        </Card>
      </>
    );
  }
}
export default connect(
  (state) => ({
    productList: state.productList,
    categoryList: state.categoryList,
  }),
  {}
)(Detail);
