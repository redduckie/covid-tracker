import React from "react";
import _ from "lodash";
import { Card, Row, Col } from "antd";
// import {
//   G2,
//   Chart,
//   Geom,
//   Axis,
//   Tooltip,
//   Coord,
//   Label,
//   Legend,
//   View,
//   Guide,
//   Shape,
//   Facet,
//   Util
// } from "bizcharts";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
  Legend
} from "recharts";

const CountryGraphCard = ({ title, data, xAxis, yAxis }) => {
  return (
    <div className="site-card-wrapper">
      <Row>
        <Col>
          <Card title={title} bordered={true} style={{ marginLeft: 20 }}>
            <LineChart
              width={700}
              height={400}
              data={data}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="reportDate" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              {/* <CartesianGrid stroke="#f5f5f5" /> */}
              <Line
                type="monotone"
                dataKey="confirmed"
                stroke="#ff7300"
                yAxisId="left"
              />
              <Line
                type="monotone"
                dataKey="deaths"
                stroke="#387908"
                yAxisId="right"
              />
            </LineChart>
            {/* <Chart height={400} data={data} forceFit>
                            <Axis name={xAxis} />
                            {_.map(yAxis, y => {
                                return <>
                                    <Axis name={y.name} />
                                    <Geom type="line" color={yAxis.color} position={`${xAxis}*${y.name}`} size={2} />
                                    <Geom
                                        type="point"
                                        position={`${xAxis}*${y.name}`}
                                        size={4}
                                        shape={"circle"}
                                        style={{
                                            stroke: "#fff",
                                            lineWidth: 1
                                        }}
                                    /></>
                            })}
                            <Tooltip
                                crosshairs={{
                                    type: "y"
                                }}
                            />
                        </Chart> */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CountryGraphCard;
