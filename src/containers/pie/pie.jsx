import { Component } from "react";
import EChartsReact from "echarts-for-react";

class Pie extends Component {
  render() {
    const option = {
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          data: [
            { value: 235, name: "手机、运营商、数码" },
            { value: 274, name: "电脑、办公" },
            { value: 310, name: "家居、家具、家装、厨具" },
            { value: 335, name: "男装、女装、童装、内衣" },
            { value: 400, name: "美妆、个护清洁、宠物" },
          ],
          roseType: "angle",
          itemStyle: {
            normal: {
              shadowBlur: 200,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    return (
      <div>
        <EChartsReact
          option={option}
          style={{
            width: "70vw",
            height: "70vh",
            margin: "0 auto",
            background: "white",
          }}
        ></EChartsReact>
      </div>
    );
  }
}
export default Pie;
