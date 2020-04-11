import React, { useState } from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import _ from "lodash";
import ComboboxInput from "./ComboboxInput";

const CustomTableFilter = (filterType, data) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [columnData, setColumnData] = useState([]);

  const getComboData = key => {
    const columnData = _.sortBy(
      _.map(_.uniqBy(data, key), d => {
        return {
          text: d[key],
          value: d[key]
        };
      })
    );
    setColumnData(columnData);
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <ComboboxInput
          mode="default"
          onFocus={() => getComboData(dataIndex)}
          onChange={(name, value) => {
            setSelectedKeys(value ? [value] : []);
          }}
          name="TestTextBox"
          value={selectedKeys[0]}
          options={columnData}
          style={{ width: 200 }}
        />

        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) => record[dataIndex].indexOf(value[0]) === 0,
    onFilterDropdownVisibleChange: visible => {
      // if (visible) {
      //   setTimeout(() => /*this.searchInput.select()*/);
      // }
    },
    render: text => text
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText("");
  };
  const checkedFilter = dataIndex => ({
    filters: _.map(_.sortBy(_.uniqBy(data, dataIndex)), filter => {
      return {
        text: filter[dataIndex],
        value: filter[dataIndex]
      };
    }),
    onFilter: (value, record) =>
      record[dataIndex].indexOf(value) === 0 ||
      record[dataIndex].indexOf("All") === 0
  });

  return true && filterType === "custom" ? getColumnSearchProps : checkedFilter;
};
export default CustomTableFilter;
