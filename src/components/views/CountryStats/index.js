import React, { useState, useEffect } from "react";
import { get } from "../../../apis/api";
import _ from "lodash";
import TableInput from "../../inputs/TableInput";
import { Tabs, Row, Col } from "antd";
import { countryColumns, countrySummary } from "./tableProps";

const { TabPane } = Tabs;
const CountryStats = props => {
  const [countryCases, setCountryCases] = useState([]);

  useEffect(() => {
    updateCases();
  }, []);

  function updateCases() {
    get("/countries").then(res => {
      const data = _.map(res, r => {
        return {
          country: r.country,
          active: r.active,
          total: r.cases,
          new: r.todayCases,
          recovered: r.recovered,
          deaths: r.deaths,
          newDeath: r.todayDeaths,
          tests: r.tests,
          flag: r.countryInfo.flag
        };
      });
      setCountryCases(data);
    });
  }
  ///TODO: add a nother card on the right side and a link to
  //grid and when clicked on additional country info with
  //graphs will show. in a card.
  return (
    <div>
      <Row>
        {/* <Tabs defaultActiveKey="1" onChange={() => updateCases()}>
          <TabPane tab="Countries" key="1"> */}
        <Col xs={24} sm={24} md={24} lg={14} xl={12} xxl={12}>
          {countryCases.length > 0 && (
            <TableInput
              columns={countryColumns}
              data={countryCases}
              summary={countrySummary}
              pagination={false}
              size="small"
            />
          )}
          {/* </TabPane>
        </Tabs> */}
        </Col>
      </Row>
    </div>
  );
};

export default CountryStats;
