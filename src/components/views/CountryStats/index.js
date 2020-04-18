import React, { useState, useEffect } from "react";
import {
  getCaseTable,
  getCountryHistorical
} from "../../../apis/api";
import _ from "lodash";
import TableInput from "../../inputs/TableInput";
import { Row, Col, Button } from "antd";
import { countryColumns } from "./tableProps";
import CountryGraphCard from "./countryGraphCard";
import moment from "moment";

const CountryStats = props => {
  const [allCases, setAllCases] = useState([]);
  const [countryTimeLine, setCountryTimeLine] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [yesterday, setYesterday] = useState(false);
  useEffect((props) => {
    updateCases(yesterday);
  }, []);

  async function updateCases(yesterday) {
    const cases = await getCaseTable(yesterday)
    const data = _.map(cases, r => {
      return {
        country: r.country,
        active: r.active,
        total: r.cases,
        new: r.todayCases,
        recovered: r.recovered,
        deaths: r.deaths,
        newDeath: r.todayDeaths,
        tests: r.tests,
        flag: r.countryInfo.flag,
        iso2: r.countryInfo.iso2,
        iso3: r.countryInfo.iso3
      };
    });
    setAllCases(data);
  }

  const getTimeLineData = async country => {
    const historicalData = await getCountryHistorical(country);

    const data = _(historicalData).map(h => ({
      cases: h.Cases,
      status: h.Status,
      date: h.Date,
      confirmed: h.Status === "confirmed" ? h.Cases : null,
      deaths: h.Status == "deaths" ? h.Cases : null,
      recovered: h.Status == "recovered" ? h.Cases : null
    })).orderBy('date').groupBy('date').map((casesData, date) => ({
      reportDate: moment(date).format("MMM DD"),
      confirmed: _.sumBy(casesData, 'confirmed'),
      deaths: _.sumBy(casesData, 'deaths'),
      deathPercent: (_.sumBy(casesData, "deaths") / _.sumBy(casesData, "confirmed") * 100),
      recovered: _.sumBy(casesData, 'recovered'),
      active: _.sumBy(casesData, 'confirmed') - _.sumBy(casesData, 'recovered') - _.sumBy(casesData, 'deaths')
    })).value();
    setCountryTimeLine(data);
  };

  const rowClick = e => {
    const selectedCountry = allCases.find(f => f.country === e.target.text).iso2;
    setSelectedCountry(e.target.text);
    getTimeLineData(selectedCountry);
  };

  return (
    <div>
      <Row>
        <Col xs={5} lg={1}><Button name="today" type={yesterday ? "default" : "primary"} onClick={(e) => { setYesterday(false); updateCases(false); }}>Today</Button></Col>
        <Col xs={5} lg={1}><Button name="yesterday" type={yesterday ? "primary" : "default"} onClick={(e) => { setYesterday(true); updateCases(true); }}>Yesterday</Button></Col>
      </Row>
      <Row>
        <Col  lg={15} xl={15} xxl={15}>
          {allCases.length > 0 && (
            <TableInput
              height={"100vh"}
              columns={countryColumns(rowClick)}
              rowKey={"country"}
              data={allCases}
              size="small"
              scroll={{ y: "calc(100vh - 300px)" }}
              pagination={{ pageSize: 250 }}
            />
          )}
        </Col>
        {selectedCountry !== "" && countryTimeLine.length > 0 && (
          <Col xs={24} sm={24} md={24} lg={9} xl={9} xxl={9}>
            <CountryGraphCard title={selectedCountry} data={countryTimeLine} />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default CountryStats;
