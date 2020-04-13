import React, { useState, useEffect } from "react";
import {
  get,
  countryTimeLineApi,
  countryTimeLineApiJH
} from "../../../apis/api";
import _ from "lodash";
import TableInput from "../../inputs/TableInput";
import { Row, Col } from "antd";
import { countryColumns, countrySummary } from "./tableProps";
import CountryGraphCard from "./countryGraphCard";

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
          iso2: r.countryInfo.iso2,
          iso3: r.countryInfo.iso3
        };
      });
      setAllCases(data);
    });
  }
  /* const ans = _(data)
var selectedVehicles = _.filter(response.vehicleTypes, 'selected');
Now that you have the selectedVehicles array, you can use your original code for grouping by the makeCode.

selectedVehicles = _.groupBy(selectedVehicles, function(item) {
  return item.makeCode;
});
This returns an object, so we will need to iterate through those keys, and perform our second groupBy

_.forEach(selectedVehicles, function(value, key) {
  selectedVehicles[key] = _.groupBy(selectedVehicles[key], function(item) {
    return item.modelCode;
  });
});
From this you will have an object of the form. I'll leave it to you to get the count from each array.

{ 'Make-A': { 'Model-a': [ ... ] },
  'Make-B': { 'Model-c': [ ... ] },
  'Make-C': { 'Model-b': [ ..., ... ] } }

  .map((platform, id) => ({
    platformId: id,
    payout: _.sumBy(platform, 'payout'),
    numOfPeople: _.sumBy(platform, 'numOfPeople')
  }))
  .value()

  */

  const getTimeLineData = async country => {
    const data = await countryTimeLineApiJH();

    const test = _(data)
      .filter(f => f.iso3 === country)
      .map(d => ({
        confirmed: _.sumBy(d, "confirmed")
      }));

    const b = test.value();

    const filtered = _(data)
      .filter(f => f.iso3 === country)
      .groupBy("reportDate")
      .map((data, date) => ({
        reportDate: date,
        confirmed: _.sumBy(data, "confirmed"),
        deaths: _.sumBy(data, "deaths")
      }))
      .value();
    // filtered = _.groupBy(filtered, f => f.country);
    // _.forEach(filtered, (value, key) => {
    //   filtered[key] = _.groupBy(filtered[key], f => f.reportDate);
    // });
    // const aa = filtered;

    setCountryTimeLine(filtered);
  };

  const rowClick = e => {
    const selectedCountry = e.target.text;
    const countryIso3 = allCases.find(f => f.country === selectedCountry).iso3;
    setSelectedCountry(selectedCountry);

    getTimeLineData(countryIso3);
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
              summary={countrySummary}
              size="small"
              scroll={{ y: "calc(100vh - 300px)" }}
              pagination={{ pageSize: 250 }}
            />
          )}
        </Col>
        {selectedCountry !== "" && countryTimeLine.length > 0 && (
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <CountryGraphCard
              title={selectedCountry}
              data={countryTimeLine}
              xAxis={"reportDate"}
              yAxis={[
                { name: "confirmed", color: "green" },
                { name: "deaths", color: "red" },
                { name: "recovered", color: "blue" }
              ]}
            />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default CountryStats;
