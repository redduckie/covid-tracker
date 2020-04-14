import React from "react";
import _ from "lodash";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts";

const LineChartComponent = ({ title, data, xAxis, yAxis }) => {
  return (
    <ResponsiveContainer aspect={1.6}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxis} />
        {_.map(yAxis, y => {
          return [
            <Line
              type={y.type}
              dataKey={y.dataKey}
              stroke={y.stroke}
              yAxisId={y.Id}
              dot={y.dot}
            />,
            <YAxis yAxisId={y.Id} orientation={y.orientation} />
          ];
        })}
        <Tooltip
          formatter={value => new Intl.NumberFormat("en").format(value)}
        />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
