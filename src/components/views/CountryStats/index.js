import React, { useState, useEffect } from "react";
import { get, countryTimeLineApi } from "../../../apis/api";
import _ from "lodash";
import TableInput from "../../inputs/TableInput";
import { Row, Col } from "antd";
import { countryColumns, countrySummary } from "./tableProps";
import CountryGraphCard from "./countryGraphCard";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

const CountryStats = props => {
  const [allCases, setAllCases] = useState([]);
  const [countryTimeLine, setCountryTimeLine] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
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
          flag: r.countryInfo.flag,
          iso2: r.countryInfo.iso2
        };
      });
      setAllCases(data);
    });
  }

  const countryTimeLineConfirmed = (country) => {
    // const data = countryTimeLineApi(countryIso2, "confirmed").then(res=> {
    //   console.log(res);
    // });
    const alldata = [];
    const confirmed = countryTimeLineApi(country, "confirmed").then(res => {
      _.map(res, d => {
        {
          alldata.push({ cases: d.Cases, status: d.Status, date: d.Date })
        }
      });
    });
    console.log(alldata);
  }

  const rowClick = (e) => {
    const selectedCountry = e.target.text;
    const countryIso2 = allCases.find(f => f.country === selectedCountry).iso2
    setSelectedCountry(selectedCountry);

    countryTimeLineConfirmed(countryIso2)
  }

  return (
    <div>
      <Row>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          {allCases.length > 0 && (
            <TableInput
              columns={countryColumns(rowClick)}
              rowKey={"country"}
              data={allCases}
              summary={countrySummary}
              pagination={false}
              size="small"
            />
          )}
        </Col>
        {selectedCountry != "" &&
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xl={12}>
            <CountryGraphCard title={selectedCountry} />
          </Col>}
      </Row>
    </div>
  );
};

export default CountryStats;
