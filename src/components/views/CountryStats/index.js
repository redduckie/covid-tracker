import React, { useState, useEffect } from "react";
import {
  getCaseTable,
  getCountryHistorical,
  getCountriesIso2
} from "../../../apis/api";
import _ from "lodash";
import TableInput from "../../inputs/TableInput";
import { Row, Col } from "antd";
import { countryColumns } from "./tableProps";
import CountryGraphCard from "./countryGraphCard";
import moment from "moment";

const CountryStats = props => {
  const [allCases, setAllCases] = useState([]);
  const [countryTimeLine, setCountryTimeLine] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    updateCases();
  }, []);

  async function updateCases() {
    const cases = await getCaseTable()
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

    const d = _.orderBy(_.map(historicalData, h=> ({
      cases: h.Cases,
      status: h.Status,
      date: h.Date,
      confirmed: h.Status === "confirmed" ? h.Cases : null,
      deaths: h.Status == "deaths" ? h.Cases : null,
      recovered: h.Recovered == "recovered"? h.Cases : null  
    })),'date');
    // const data = await getCountryHistorical(country);
    // const filtered = _.map(_.orderBy(data), d => ({
    //   date: d.time,
    //   reportDate: moment(d.time).format("MMM DD"),
    //   confirmed: d.cases.total,
    //   deaths: d.deaths.total,
    //   recovered: d.cases.recovered,
    //   active: d.cases.active
    // }));
    // setCountryTimeLine(_.orderBy(filtered, ["date"], ["asc"]));
  };

  const rowClick = e => {
    const selectedCountry = allCases.find(f => f.country === e.target.text).iso2;
    setSelectedCountry(selectedCountry);
    getTimeLineData(selectedCountry);
  };

  return (
    <div>
      <Row>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
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
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <CountryGraphCard title={selectedCountry} data={countryTimeLine} />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default CountryStats;
