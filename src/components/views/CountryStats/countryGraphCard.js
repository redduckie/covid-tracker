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
        stroke: "red",
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
            style={{
              margin: 5
            }}
            headStyle={{
              backgroundColor: "lightgrey",
              border: 1
            }}
            bodyStyle={{ backgroundColor: "rgba(255, 0, 0, 0.2)", border: 1 }}
          >
            <LineChartComponent {...ActiveConfirmedProps} />
          </Card>
          <Card
            title={`${title} deaths`}
            bordered={true}
            style={{ marginLeft: 5, marginTop: 10 }}
            headStyle={{
              color: "red",
              backgroundColor: "lightgrey",
              border: 1
            }}
            bodyStyle={{ backgroundColor: "rgba(255, 0, 0, 0.2)", border: 1 }}
          >
            <LineChartComponent {...deathsProps} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CountryGraphCard;
