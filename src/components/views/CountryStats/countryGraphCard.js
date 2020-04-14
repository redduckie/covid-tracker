import React from "react";
import { Card, Row, Col } from "antd";

import LineChartComponent from "../../inputs/Charts/LineChartComponent";

const CountryGraphCard = ({ data, title }) => {
  const ActiveConfirmedProps = {
    title,
    data,
    xAxis: "reportDate",
    yAxis: [
      {
        dataKey: "confirmed",
        Id: "left",
        orientation: "left",
        type: "monotone",
        stroke: "#387908",
        dot: false
      },
      {
        dataKey: "active",
        Id: "left",
        orientation: "left",
        type: "monotone",
        stroke: "#ff7300",
        dot: false
      }
    ]
  };

  const deathsProps = {
    title,
    data,
    xAxis: "reportDate",
    yAxis: [
      {
        dataKey: "deaths",
        Id: "left",
        orientation: "left",
        type: "monotone",
        stroke: "#387908",
        dot: false
      }
    ]
  };

  return (
    <div className="site-card-wrapper">
      <Row>
        <Col>
          <Card
            title={`${title} Active and confirmed cases`}
            bordered={true}
            style={{ marginLeft: 20 }}
          >
            <LineChartComponent {...ActiveConfirmedProps} />
          </Card>
          <Card
            title={`${title} deaths`}
            bordered={true}
            style={{ marginLeft: 20 }}
          >
            <LineChartComponent {...deathsProps} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CountryGraphCard;
