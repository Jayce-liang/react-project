import { PureComponent } from "react";
import EChartsReact from "echarts-for-react";

class Pie extends PureComponent {
  render() {
    const option = {
      legend: {
        top: "bottom",
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          restore: { show: true },
        },
      },
      series: [
        {
          name: "面积模式",
          type: "pie",
          radius: [50, 250],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8,
          },
          data: [
            { value: 235, name: "手机" },
            { value: 274, name: "电脑" },
            { value: 310, name: "家居" },
            { value: 335, name: "男装、女装" },
            { value: 400, name: "美妆、个护清洁" },
          ],
        },
      ],
    };
    return (
      <div>
        <EChartsReact
          option={option}
          style={{
            width: "100%",
            height: "79vh",
            margin: "0 auto",
            background: "white",
          }}
        ></EChartsReact>
      </div>
    );
  }
}
export default Pie;
