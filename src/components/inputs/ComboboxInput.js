import React, { useState } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import _ from "lodash";

const { Option } = Select;
const ComboboxInput = props => {
  const [value, setValue] = useState(props.value);

  const componentChange = value => {
    props.onChange(props.name, value);
    setValue(value);
  };

  const children = [];

  _.forEach(props.options, o => {
    children.push(
      <Option key={_.uniqueId()} value={o.value}>
        {o.text}
      </Option>
    );
  });

  return (
    <Select
      name={props.name}
      mode={props.mode}
      key={props.key}
      onChange={componentChange}
      placeholder={props.placeholder}
      value={value}
      style={props.style}
      onFocus={props.onFocus}
    >
      {children}
    </Select>
  );
};
ComboboxInput.propTypes = {
  key: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array
};

export default ComboboxInput;
