import axios from "axios";
import _ from "lodash";
import moment from "moment";
const csv = require("csvtojson");

////// covid19-3 data rapid
// export async function getCaseTable() {
//   const url = "https://covid-193.p.rapidapi.com/statistics";
//   return await axios.get(url, {
//     headers:{"x-rapidapi-key":"3832241aa1msh5ad3681e8bb076fp132d80jsn9504533d3dac"}
//   }).then(
//     response=> {return response.data.response}
//   )
// }

// export async function getCountryHistorical(country) {
//   const url = `https://covid-193.p.rapidapi.com/history?country=${country}`;
//   return await axios.get(url, {
//     headers:{"x-rapidapi-key":"3832241aa1msh5ad3681e8bb076fp132d80jsn9504533d3dac"}
//   }).then(
//     response=> {return response.data.response}
//   )
// }


//used for the table
export async function getCaseTable(yesterday) {
  return await axios.get(`https://corona.lmao.ninja/v2/countries?sort=cases&yesterday=${yesterday.toString()}`)
    .then(res => res.data)
}

export async function getCountriesIso2() {
  return await axios.get("https://api.covid19api.com/countries").then(res => res.data);
}
//used for the charts next to table
export async function getCountryHistorical(countryIso2) {
  
    const recovered = await axios.get(`https://api.covid19api.com/total/country/${countryIso2}/status/recovered`).then(res=> res.data);
    const confirmed = await axios.get(`https://api.covid19api.com/total/country/${countryIso2}/status/confirmed`).then(res=> res.data);
    const deaths = await axios.get(`https://api.covid19api.com/total/country/${countryIso2}/status/deaths`).then(res=>res.data);
    return [...recovered, ...confirmed, ...deaths];
}