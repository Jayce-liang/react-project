import { Component } from "react";
import { Card, Button, message, Select, Input, Tooltip, Table } from "antd";
import { PlusSquareOutlined, SearchOutlined } from "@ant-design/icons";
const { Option } = Select;
class Product extends Component {
  render() {
    const dataSource = [
      {
        key: "1",
        name: "华为",
        age: 32,
        desc: "买不起",
        price: "99999999",
        status: "在售",
      },
      {
        key: "2",
        name: "小米",
        desc: "系统bug多",
        price: "2999",
        status: "在售",
      },
    ];

    const columns = [
      {
        title: "商品名称",
        width:"20%",
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
        width:"5%",
        align: "center",
        dataIndex: "price",
        key: "price",
        render: (price) => "￥" + price,
      },
      {
        title: "状态",
        width:"10%",
        align: "center",
        dataIndex: "status",
        key: "status",
        render: (status) => (
          <>
            <Button type="primary" style={{ backgroundColor: "#ff4e20" }}>
              下架
            </Button>
            <br />
            <Button type="text" style={{ color: "#21a675" }}>
              {status}
            </Button>
          </>
        ),
      },
      {
        title: "操作",
        width:"10%",
        align: "center",
        dataIndex: "opera",
        key: "opera",
        render: () => (
          <>
            <Button type="link">详情</Button>
            <br />
            <Button type="link">修改</Button>
          </>
        ),
      },
    ];
    return (
      <>
        <Card
          title={
            <>
              <Select defaultValue="name">
                <Option value="name">按名称搜索</Option>
                <Option value="desc">按描述搜索</Option>
              </Select>
              <Input
                placeholder="Basic usage"
                allowClear
                style={{ width: 250, margin: "0 20px" }}
              />
              <Tooltip title="search">
                <Button type="primary" loading icon={<SearchOutlined />}>
                  Search
                </Button>
              </Tooltip>
            </>
          }
          extra={
            <Button type="primary">
              <PlusSquareOutlined />
              添加商品
            </Button>
          }
          style={{ width: "100%" }}
        >
          <Table dataSource={dataSource} columns={columns} />
        </Card>
      </>
    );
  }
}
export default Product;
