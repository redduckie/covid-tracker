import React from "react";
import { Table } from "antd";
import _ from "lodash";
import CustomTableFilter from "./CustomTableFilter";

const TableInput = ({ data, columns, summary, pagination, size, scroll }) => {
  const columnsMod = () => {
    const filters = _.map(columns, col => {
      const filter = CustomTableFilter(col["filterType"], data)(
        col["dataIndex"]
      );

      return col["filterType"] ? { ...col, ...filter } : col;
    });
    return filters;
  };

  return (
    <Table
      size={size}
      columns={columnsMod()}
      dataSource={data}
      scroll={{ ...scroll, x: true }}
      summary={summary}
      pagination={pagination}
      // scroll={{ x: 1500, y: 300 }}
    />
  );
};

export default TableInput;
