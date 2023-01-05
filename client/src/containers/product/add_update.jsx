import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Form, Input, Button, Select, message } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import PicturesWall from "./pictureWall";
import EditorConvertToHTML from "./rich_text";
import {
  reqCategoryList,
  reqAddProduct,
  reqProductByID,
  reqUpdateProduct,
} from "../../api/index";
import "./css/detail.less";
const { Option } = Select;
class AddUpdate extends Component {
  state = {
    categoryList: [],
    operaType: "add",
    categoryId: "",
    name: "",
    desc: "",
    detail: "",
    price: "",
    imgs: [],
    _id: "",
  };
  formRef = React.createRef();
  componentDidMount() {
    const { categoryList, productList } = this.props;
    if (categoryList) this.setState({ categoryList });
    else this.getCategoryList();
    //判断操作类型,如果路径中有 id 则为修改操作
    const id = this.props.match.params.id;
    if (id) {
      this.setState({
        operaType: "update",
      });
      if (productList) {
        const result = productList.find((item) => item._id === id);
        if (result) {
          this.picturesWall.setFileList(result.imgs);
          this.richText.setRichText(result.detail);
          this.setState({ ...result }, () => {
            //重置表单
            this.formRef.current.resetFields();
          });
        }
      } else {
        this.getProductList(id);
      }
    }
  }
  getProductList = async (id) => {
    let result = await reqProductByID(id);
    const { data, status } = result;
    if (status === 0) {
      this.picturesWall.setFileList(data.imgs);
      this.richText.setRichText(data.detail);
      this.setState({ ...data }, () => {
        //重置表单
        this.formRef.current.resetFields();
      });
    } else message.error("失败", 2);
  };
  getCategoryList = async () => {
    const result = await reqCategoryList();
    const { data, status } = result;
    if (status === 0) this.setState({ categoryList: data });
    else message.error("请求分类失败", 2);
  };
  onFinish = async (value) => {
    const imgs = this.picturesWall.getFileNameArry();
    const detail = this.richText.getRichText();
    let result;
    if (this.state.operaType === "add") {
      result = await reqAddProduct({ ...value, detail, imgs });
    }else result = await reqUpdateProduct({ ...value, detail, imgs,_id:this.state._id});

    const { status } = result;
    if (status === 0) {
      message.success("成功！", 2);
      this.props.history.replace("/admin/prod_about/product");
    } else message.error("失败！", 2);
  };
  render() {
    //表单布局
    const layout = {
      labelCol: { md: 2 },
      wrapperCol: {
        md: 10,
      },
    };
    const { name, desc, price, categoryId } = this.state;
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
              <span className="title">
                {this.state.operaType === "update" ? "修改商品" : "添加商品"}
              </span>
            </>
          }
        >
          <Form {...layout} onFinish={this.onFinish} ref={this.formRef}>
            <Form.Item
              initialValue={name || ""}
              name="name"
              label="商品名称"
              rules={[{ required: true, message: "请输入商品名称" }]}
            >
              <Input placeholder="请输入商品名称" />
            </Form.Item>

            <Form.Item
              name="desc"
              label="商品描述"
              wrapperCol={{ md: 15 }}
              initialValue={desc || ""}
              rules={[{ required: true, message: "请输入商品的描述" }]}
            >
              <Input placeholder="请输入商品的描述" />
            </Form.Item>

            <Form.Item
              name="price"
              label="商品价格"
              initialValue={price || ""}
              rules={[{ required: true, message: "请输入商品价格" }]}
              wrapperCol={{ md: 10 }}
            >
              <Input
                type="number"
                placeholder="请输入的价格"
                prefix="￥"
                addonAfter="元"
              />
            </Form.Item>

            <Form.Item
              name="categoryId"
              label="商品分类"
              initialValue={categoryId || ""}
              rules={[{ required: true, message: "请输入商品分类" }]}
            >
              <Select placeholder="请输入商品分类">
                {this.state.categoryList.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="商品图片">
              <PicturesWall
                ref={(picturesWall) => (this.picturesWall = picturesWall)}
              />
            </Form.Item>
            <Form.Item label="商品详情" wrapperCol={{ md: 15 }}>
              <EditorConvertToHTML
                ref={(richText) => (this.richText = richText)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </>
    );
  }
}

export default connect((state) => ({
  categoryList: state.categoryList,
  productList: state.productList,
}))(AddUpdate);
