import { Statistic, Card, Row, Col } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

import React, { useState, useEffect,memo } from "react";
import { Chart, Coord, Tooltip, Geom, Interaction, getTheme } from "bizcharts";
import DataSet from "@antv/data-set";
import * as turf from "@turf/turf";

function keepMapRatio(mapData, c) {
  if (mapData && turf) {
    // 获取数据外接矩形，计算宽高比
    const bbox = turf.bbox(mapData);
    const width = bbox[2] - bbox[0];
    const height = bbox[3] - bbox[1];
    const ratio = height / width;

    const cWidth = c.width;
    const cHeight = c.height;
    const cRatio = cHeight / cWidth;

    let scale = {};

    if (cRatio >= ratio) {
      const halfDisRatio = (cRatio - ratio) / 2 / cRatio;
      scale = {
        x: {
          range: [0, 1],
        },
        y: {
          range: [halfDisRatio, 1 - halfDisRatio],
        },
      };
    } else {
      const halfDisRatio = ((1 / cRatio - 1 / ratio) / 2) * cRatio;
      scale = {
        y: {
          range: [0, 1],
        },
        x: {
          range: [halfDisRatio, 1 - halfDisRatio],
        },
      };
    }
    const curScaleXRange = c.getScaleByField("x").range;
    const curScaleYRange = c.getScaleByField("y").range;
    if (
      curScaleXRange[0] !== scale.x.range[0] ||
      curScaleXRange[1] !== scale.x.range[1] ||
      curScaleYRange[0] !== scale.y.range[0] ||
      curScaleYRange[1] !== scale.y.range[1]
    ) {
      setTimeout(() => {
        c.scale(scale);
        c.render(true);
      }, 1);
    }
  }
}

function Home() {
  const [mapData, setMapData] = useState(undefined);
  useEffect(() => {
    const dataUrl =
      "https://gw.alipayobjects.com/os/bmw-prod/d4652bc5-e971-4bca-a48c-5d8ad10b3d91.json";

    fetch(dataUrl)
      .then((res) => res.json())
      .then((d) => {
        const feas = d.features
          .filter((feat) => feat.properties.name)
          .map((v) => {
            return {
              ...v,
              properties: {
                ...v.properties,
                size: Math.floor(Math.random() * 300),
              },
            };
          });
        const res = { ...d, features: feas };
        setMapData(res);
      });
  }, []);

  let bgView;

  if (mapData) {
    const ds = new DataSet();
    const dv = ds
      .createView("back")
      .source(mapData, {
        type: "GeoJSON",
      })
      .transform({
        type: "geo.projection",
        projection: "geoMercator",
        as: ["x", "y", "centroidX", "centroidY"],
      });
    bgView = new DataSet.View().source(dv.rows);
  }

  const scale = {
    x: { sync: true },
    y: { sync: true },
  };

  return (
    <>
      <div className="site-statistic-demo-card">
        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <Statistic
                title="销售额日同比"
                value={56.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="销售额周同比"
                value={9.3}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </div>

      <div
        style={{
          width: "100%",
          height: "60vh",
          margin: "0 auto",
          background: "white",
        }}
      >
        {
          <Chart
            // 清空默认的坐标轴legend组件
            pure
            height={550}
            scale={scale}
            // 不支持dataSet数据格式了
            data={bgView ? bgView.rows : bgView}
            autoFit
            placeholder={<div>Loading</div>}
            padding="auto"
            onAfterRender={(e, c) => {
              keepMapRatio(mapData, c, "rerender");
            }}
          >
            <Coord reflect="y" />
            <Tooltip title="name" />
            <Geom
              type="polygon"
              position="x*y"
              color={["centroidY", "#777090-#493398"]}
              tooltip={[
                "name*properties",
                (t, p) => {
                  return {
                    //自定义 tooltip 上显示的 title 显示内容等。
                    name: "sale",
                    title: t,
                    value: p.size,
                  };
                },
              ]}
              state={{
                selected: {
                  style: (t) => {
                    const res =
                      getTheme().geometries.polygon.polygon.selected.style;
                    return {
                      ...res,
                      fill: "purple",
                      stroke: "#ccc",
                      lineWidth: 1,
                    };
                  },
                },
              }}
            />
            <Interaction type="element-single-selected" />
          </Chart>
        }
      </div>
    </>
  );
}

export default memo(Home);
