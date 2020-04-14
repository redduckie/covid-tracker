import axios from "axios";
import _ from "lodash";
import moment from "moment";
const csv = require("csvtojson");

const apiUrlBase = "https://corona.lmao.ninja";


//this one for the countries table. up to date and working perfectly
export async function get(url) {
  return await axios
    .get(apiUrlBase + url)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}

async function convertToJson(csvString) {
  const jsonData = await csv({
    noheader: false,
    output: "json"
  })
    .fromString(csvString)
    .then(csvRow => {
      return _.map(csvRow, r => {
        return {
          key: r.Country_Region + r.reportDate,
          country: r.Country_Region,
          confirmed: parseInt(r.Confirmed),
          deaths: parseInt(r.Deaths),
          recovered: parseInt(r.Recovered),
          active: parseInt(r.Active),
          deltaConfirmed: parseInt(r.Delta_Confirmed),
          deltaRecovered: parseInt(r.deltaRecovered),
          reportDate: moment(r.Report_Date_String).format("MMMM DD"),
          iso3: r.iso3
        };
      });
    });
  return jsonData;
}

// -- effed up on us data this one from JH for timeline data
export async function countryTimeLineApiJH() {
  const url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_time.csv`;
  const result = await axios.get(url).then(
    response => {
      return convertToJson(response.data);
    },
    err => {
      return err;
    }
  );
  return result;
}

////// covid19-3 data rapid
export async function getCaseTable() {
  const url = "https://covid-193.p.rapidapi.com/statistics";
  return await axios.get(url, {
    headers:{"x-rapidapi-key":"3832241aa1msh5ad3681e8bb076fp132d80jsn9504533d3dac"}
  }).then(
    response=> {return response.data.response}
  )
}

export async function getCountryHistorical(country) {
  const url = `https://covid-193.p.rapidapi.com/history?country=${country}`;
  return await axios.get(url, {
    headers:{"x-rapidapi-key":"3832241aa1msh5ad3681e8bb076fp132d80jsn9504533d3dac"}
  }).then(
    response=> {return response.data.response}
  )
}