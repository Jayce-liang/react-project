import { Component } from "react";
import EChartsReact from "echarts-for-react";
class Bar extends Component {
  render() {
    let option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220],
        },
      ],
    };
    return (
      <div>
        <EChartsReact
          option={option}
          style={{
            width: "80vw",
            height: "70vh",
            margin: "0 auto",
            padding: "20px",
            background: "white",
          }}
        ></EChartsReact>
      </div>
    );
  }
}
export default Bar;
