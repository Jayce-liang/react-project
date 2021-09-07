import React, { Component } from "react";
import { Button, Card, List, message } from "antd";
import { connect } from "react-redux";
import { LeftOutlined } from "@ant-design/icons";
import { reqProductByID } from "../../api/index";
import "./css/detail.less";

class Detail extends Component {
  state = {
    categoryId: "",
    detail: "",
    price: "",
    imgs: [],
    name: "",
    desc: "",
  };
  componentDidMount() {
    const reduxProductList = this.props.productList;
    const { id } = this.props.match.params;
    if (reduxProductList) {
      const reasult = reduxProductList.find((item) => item._id === id);
      this.setState({ ...reasult });
    } else {
      this.getProductionById(id);
    }
  }
  getProductionById = async (id) => {
    const reasult = await reqProductByID(id);
    if(reasult.status === 0) this.setState({ ...reasult.data });
    else message.error("error",2);
  };
  render() {
    return (
      <>
        <Card
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
                商品分类:{this.state.categoryId}
              </span>
            </List.Item>
            <List.Item>
              <span className="prod_name">
                商品图片:
                {this.state.imgs.map((item) => (
                  <img key={item} src={"/upload/" + item} alt="商品图片" />
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
export default connect((state) => ({ productList: state.productList }))(Detail);
