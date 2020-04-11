import axios from "axios";
import _ from "lodash";

const apiUrlBase = "https://corona.lmao.ninja";

export async function casesApi() {
  const url =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases.csv";
  const result = await axios.get(url);
  let { data } = result;
  return csvToJson(data);
}

function csvToJson(csv) {
  const content = csv.split("\n");
  const header = content[0].split(",");
  return _.tail(content).map(row => {
    return _.zipObject(header, row.split(","));
  });
}

export async function get(url) {
  return await axios
    .get(apiUrlBase + url)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}

export async function mapApi() {
  const url = "https://corona.lmao.ninja/countries";
  const result = await axios.get(url);
  const { data = [] } = result;
  return data;
}
