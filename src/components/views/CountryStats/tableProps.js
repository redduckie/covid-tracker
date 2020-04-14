import React from "react";
import _ from "lodash";
import { Typography } from "antd";

const { Text } = Typography;
export const countryColumns = onClick => [
  {
    title: "Country",
    dataIndex: "country",
    filterType: "custom",
    // width: "40%",
    render: (text, record) => {
      return (
        <span>
          {/* <img
            style={{ maxWidth: "40%", maxHeight: "30%" }}
            src={record.flag}
            alt="flag"
          />{" "} */}
          <a onClick={e => onClick(e)}>{text}</a>
        </span>
      );
    }
   },
  {
    title: "Confirmed Cases",
    dataIndex: "total",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.total - b.total
  },
  {
    title: "New",
    dataIndex: "new",
    sorter: (a, b) => a.new - b.new
  },
  {
    title: "Active Cases",
    dataIndex: "active",
    sorter: (a, b) => a.active - b.active
    // render: (text, row) => (
    //   <div>{row["total"] - row["deaths"] - row["recovered"]}</div>
    // )
  },
  {
    title: "Deaths",
    dataIndex: "deaths",
    backGroundColor: "red",
    color: "white",
    sorter: (a, b) => a.deaths - b.deaths,
    render: (text, record) => {
      return {
        props: {
          style: { backgroundColor: "red", color: "white" }
        },
        children: <div>{text}</div>
      };
    }
  },
  {
    title: "New Deaths",
    dataIndex: "newDeath",
    sorter: (a, b) => a.newDeath - b.newDeath
  },
  {
    title: "Recovered",
    dataIndex: "recovered",
    sorter: (a, b) => a.recovered - b.recovered
  },
  {
    title: "Total Tests",
    dataIndex: "tests",
    sorter: (a, b) => a.tests - b.tests
  }
];

// export const countrySummary = pageData => {
//   let totalConfirmed = 0;
//   let totalActive = 0;
//   let totalRecovered = 0;
//   let totalDeaths = 0;

//   _.map(pageData, ({ total, active, recovered, deaths, country }) => {
//     if (country !== "All") {
//       totalConfirmed += total ? total : 0;
//       totalActive += active ? active : 0;
//       totalDeaths += deaths ? deaths : 0;
//       totalRecovered += recovered ? recovered : 0;
//     }
//   });
//   return (
//     <>
//       <tr>
//         <th>Total</th>
//         <td>
//           <Text>
//             <b>{totalConfirmed}</b>
//           </Text>
//         </td>
//         <td />
//         <td>
//           <Text>
//             <b>{totalActive}</b>
//           </Text>
//         </td>
//         <td>
//           <Text>
//             <b>{totalDeaths}</b>
//           </Text>
//         </td>
//         <td />
//         <td>
//           <Text>
//             <b>{totalRecovered}</b>
//           </Text>
//         </td>
//       </tr>
//     </>
//   );
// };
