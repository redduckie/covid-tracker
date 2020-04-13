import React from "react";
import _ from "lodash";
import { Card, Row, Col } from "antd";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts";

const CountryGraphCard = ({ title, data, xAxis, yAxis }) => {
  return (
    <div className="site-card-wrapper">
      <Row>
        <Col>
          <Card
            title={`${title} Confirmed cases and deaths`}
            bordered={true}
            style={{ marginLeft: 20 }}
          >
            <ResponsiveContainer aspect={1.6}>
              <LineChart
                data={data}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="reportDate" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={value => new Intl.NumberFormat("en").format(value)}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="confirmed"
                  stroke="#387908"
                  yAxisId="left"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="deaths"
                  stroke="#ff7300"
                  yAxisId="right"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
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
