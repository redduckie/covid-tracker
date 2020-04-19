import React, { useState, useEffect, useMemo } from "react";

import _ from "lodash";
import TableInput from "../../inputs/TableInput";
import { Row, Col, Button } from "antd";
import { countryColumns } from "./tableProps";
import CountryGraphCard from "./countryGraphCard";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getCountryCasesData, getHistoricalCasesData } from '../../../actions/cases-data-actions'

const CountryStats = props => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [yesterday, setYesterday] = useState(false);

  const { countryCases,historicalCases } = useSelector(state => ({
    ...state.casesReducer
  }));
  const dispatch = useDispatch();

  useEffect(()=>{
    return dispatch(getCountryCasesData(false));
  },[])

  const rowClick = e => {
    const selectedCountry = countryCases.find(f => f.country === e.target.text).iso2;
    setSelectedCountry(e.target.text);
    dispatch(getHistoricalCasesData(selectedCountry));
  };

  return (
    <div>
      <Row>
        <Col xs={5} lg={1}><Button name="today" type={yesterday ? "default" : "primary"} onClick={(e) => { setYesterday(false); dispatch(getCountryCasesData(false)) }}>Today</Button></Col>
        <Col xs={5} lg={1}><Button name="yesterday" type={yesterday ? "primary" : "default"} onClick={(e) => { setYesterday(true); dispatch(getCountryCasesData(true)); }}>Yesterday</Button></Col>
      </Row>
      <Row>
        <Col  lg={15} xl={15} xxl={15}>
          {countryCases && (
            <TableInput
              height={"100vh"}
              columns={countryColumns(rowClick)}
              rowKey={"country"}
              data={countryCases}
              size="small"
              scroll={{ y: "calc(100vh - 300px)" }}
              pagination={{ pageSize: 250 }}
            />
          )}
        </Col>
        {selectedCountry !== "" && historicalCases && (
          <Col xs={24} sm={24} md={24} lg={9} xl={9} xxl={9}>
            <CountryGraphCard title={selectedCountry} data={historicalCases} />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default CountryStats;
