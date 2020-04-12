import axios from "axios";
import _ from "lodash";
const request = require('request')
const csv = require('csvtojson')

const apiUrlBase = "https://corona.lmao.ninja";


///use this one for the map since it has most map values and little behind.. maybe only an hour or two
export async function casesWithStatesJH() {
  const resultData = [];
  const url =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases.csv";
  const result = await axios.get(url);
  let { data } = result;
  // return resultData.push(csvToJson.getJsonFormat(data));
}

//this one for the countries table. up to date and working perfectly
export async function get(url) {
  return await axios
    .get(apiUrlBase + url)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}

async function convertToJson(csvString){
  const jsonData = await csv({
    noheader: false,
    output: "json"
  })
    .fromString(csvString)
    .then((csvRow) => {
      return csvRow;
    });
    return jsonData
}

//this one from JH for timeline data
export async function countryTimeLineApiJH() {
  const url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_time.csv`
  const result = await axios.get(url).then(response => {
    return convertToJson(response.data.toString());
  }, err => {
    return err;
  });
  return result;
}